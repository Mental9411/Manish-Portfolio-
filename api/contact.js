import { createHash } from 'node:crypto';

const BODY_LIMIT = 8_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;
const DEFAULT_ORIGIN = 'https://manish-portfolio-six-hazel.vercel.app';

function reply(res, status, payload) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(status).json(payload);
}

function logFailure(reason) {
  // Fixed labels only: never write names, emails, messages, or IPs to application logs.
  console.warn('contact_submission_failed', { reason });
}

function siteOrigin() {
  return new URL(process.env.SITE_ORIGIN || DEFAULT_ORIGIN).origin;
}

async function readBody(req) {
  if (Number(req.headers['content-length']) > BODY_LIMIT) throw new Error('too_large');
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (Buffer.byteLength(raw) > BODY_LIMIT) throw new Error('too_large');
  }
  try { return JSON.parse(raw); } catch { throw new Error('invalid_json'); }
}

async function limitRequest(ip) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('rate_limit_unconfigured');
  const salt = process.env.RATE_LIMIT_SALT;
  if (!salt || salt.length < 32) throw new Error('rate_limit_unconfigured');
  const hashedIp = createHash('sha256').update(`${salt}:${ip}`).digest('hex');
  const key = `portfolio:contact:${hashedIp}`;
  const response = await fetch(`${url.replace(/\/$/u, '')}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([
      ['INCR', key],
      ['EXPIRE', key, 3600, 'NX'],
    ]),
    signal: AbortSignal.timeout(3500),
  });
  if (!response.ok) throw new Error('rate_limit_unavailable');
  const result = await response.json();
  const count = Number(result?.[0]?.result);
  if (!Number.isSafeInteger(count) || count < 1) throw new Error('rate_limit_unavailable');
  return count <= 3;
}

async function verifyTurnstile(token, ip, origin, originForSite) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error('captcha_unconfigured');
  const data = new URLSearchParams({ secret, response: token });
  if (ip) data.set('remoteip', ip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data,
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) return false;
  const result = await response.json();
  const expectedHost = process.env.NODE_ENV !== 'production' && origin
    ? new URL(origin).hostname
    : new URL(originForSite).hostname;
  return result.success === true && result.hostname === expectedHost;
}

export default async function handler(req, res) {
  let ownOrigin;
  try { ownOrigin = siteOrigin(); }
  catch {
    logFailure('origin_configuration');
    return reply(res, 503, { error: 'The form is temporarily unavailable. Please email me directly.' });
  }
  const origin = req.headers.origin;
  const localOrigin = process.env.NODE_ENV !== 'production' && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/u.test(origin || '');
  if (origin !== ownOrigin && !localOrigin) {
    logFailure('origin_rejected');
    return reply(res, 403, { error: 'This request could not be accepted.' });
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Origin', origin);
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return reply(res, 405, { error: 'Use POST to send a message.' });
  }

  let body;
  try { body = await readBody(req); }
  catch (error) {
    const tooLarge = error.message === 'too_large';
    logFailure(tooLarge ? 'body_too_large' : 'invalid_body');
    return reply(res, tooLarge ? 413 : 400, { error: 'Please check the form and try again.' });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const honeypot = typeof body.website === 'string' ? body.website.trim() : '';
  if (honeypot) {
    logFailure('honeypot');
    return reply(res, 200, { success: true });
  }
  if (name.length < 2 || name.length > 80 || /[\u0000-\u001f\u007f]/u.test(name) || email.length > 254 || !EMAIL_RE.test(email) || message.length < 10 || message.length > 2000) {
    logFailure('validation');
    return reply(res, 400, { error: 'Please check the form fields and try again.' });
  }

  const ip = req.headers['x-real-ip']?.trim() || req.headers['x-forwarded-for']?.split(',').at(-1)?.trim();
  if (!ip) {
    logFailure('ip_unavailable');
    return reply(res, 503, { error: 'The form is temporarily unavailable. Please email me directly.' });
  }
  try {
    if (!(await limitRequest(ip))) {
      logFailure('rate_limited');
      return reply(res, 429, { error: 'Please wait a little before sending another message.' });
    }
  } catch (error) {
    logFailure(error.message === 'rate_limit_unconfigured' ? 'rate_limit_unconfigured' : 'rate_limit_unavailable');
    return reply(res, 503, { error: 'The form is temporarily unavailable. Please email me directly.' });
  }

  const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken : '';
  if (!turnstileToken) {
    logFailure('captcha_missing');
    return reply(res, 400, { error: 'Please complete the verification and try again.' });
  }
  try {
    if (!(await verifyTurnstile(turnstileToken, ip, origin, ownOrigin))) {
      logFailure('captcha_rejected');
      return reply(res, 400, { error: 'Verification expired. Please try again.' });
    }
  } catch (error) {
    logFailure(error.message === 'captcha_unconfigured' ? 'captcha_unconfigured' : 'captcha_unavailable');
    return reply(res, 503, { error: 'Verification is temporarily unavailable. Please try again later.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    logFailure('mail_unconfigured');
    return reply(res, 503, { error: 'The form is being set up. Please email me directly for now.' });
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: 'Portfolio contact request', text: `Name: ${name}\nEmail: ${email}\n\n${message}` }),
      signal: AbortSignal.timeout(7000),
    });
    if (!response.ok) {
      logFailure('mail_provider_rejected');
      return reply(res, 502, { error: 'Your message could not be sent right now. Please try again later.' });
    }
    return reply(res, 200, { success: true });
  } catch {
    logFailure('mail_provider_unavailable');
    return reply(res, 502, { error: 'Your message could not be sent right now. Please try again later.' });
  }
}
