const origin = process.argv[2] ?? 'http://127.0.0.1:4173';
const homeResponse = await fetch(origin);
if (!homeResponse.ok) throw new Error(`Homepage returned HTTP ${homeResponse.status}`);
const home = await homeResponse.text();
const checks = [
  ['title', /<title>[^<]+<\/title>/],
  ['description', /<meta name="description" content="[^"]+"\s*\/>/],
  ['canonical', /<link rel="canonical" href="https:\/\/manish-portfolio-six-hazel\.vercel\.app\/"\s*\/>/],
  ['Open Graph metadata', /<meta property="og:title"/],
  ['Twitter metadata', /<meta name="twitter:card" content="summary_large_image"/],
  ['Person JSON-LD', /<script type="application\/ld\+json">([^<]+)<\/script>/],
  ['server-rendered H1', /<h1[^>]*>Manish/],
  ['server-rendered project text', /React\.js development/],
  ['journey pure black selector', /journey-section/],
  ['no removed collection label', !/COLLECTION ’26|COLLECTION '26/.test(home)],
];
for (const [label, pattern] of checks) {
  const passed = pattern instanceof RegExp ? pattern.test(home) : pattern;
  if (!passed) throw new Error(`Missing ${label} in raw homepage HTML`);
}
const jsonLd = home.match(checks[5][1])[1];
JSON.parse(jsonLd);
if ((home.match(/<h1\b/g) ?? []).length !== 1) throw new Error('Homepage must contain exactly one H1');

for (const slug of ['components-and-change', 'curiosity-and-scope', 'editing-and-rhythm']) {
  const response = await fetch(`${origin}/blog/${slug}/`);
  if (!response.ok) throw new Error(`Blog page ${slug} returned HTTP ${response.status}`);
  const html = await response.text();
  if (!/<title>[^<]+<\/title>/.test(html) || !/<link rel="canonical"/.test(html) || !/<h1/.test(html)) {
    throw new Error(`Blog page ${slug} is missing unique metadata or rendered content`);
  }
}

for (const [route, heading] of [['privacy-policy/', 'Privacy'], ['terms/', 'Terms']]) {
  const response = await fetch(`${origin}/${route}`);
  if (!response.ok) throw new Error(`${route} returned HTTP ${response.status}`);
  const html = await response.text();
  if (!/<title>[^<]+<\/title>/.test(html) || !/<link rel="canonical"/.test(html) || !new RegExp(`<h1[^>]*>[\\s\\S]*?${heading}`).test(html)) {
    throw new Error(`${route} is missing unique metadata or server-rendered content`);
  }
}

const notFoundResponse = await fetch(`${origin}/404.html`);
if (!notFoundResponse.ok || !/This page isn’t here/.test(await notFoundResponse.text())) throw new Error('Custom 404 page is missing');

for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt']) {
  const response = await fetch(`${origin}/${file}`);
  if (!response.ok) throw new Error(`${file} returned HTTP ${response.status}`);
}
const robots = await (await fetch(`${origin}/robots.txt`)).text();
if (!/Sitemap:\s*https:\/\/manish-portfolio-six-hazel\.vercel\.app\/sitemap\.xml/.test(robots)) throw new Error('robots.txt does not point at the sitemap');
const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
for (const route of ['/privacy-policy/', '/terms/']) if (!sitemap.includes(route)) throw new Error(`sitemap.xml is missing ${route}`);
for (const icon of ['favicon.ico', 'favicon-32x32.png', 'apple-touch-icon.png', 'site.webmanifest']) {
  const response = await fetch(`${origin}/${icon}`);
  if (!response.ok) throw new Error(`${icon} returned HTTP ${response.status}`);
}

const localPages = ['/', '/privacy-policy/', '/terms/', '/blog/components-and-change/', '/blog/curiosity-and-scope/', '/blog/editing-and-rhythm/'];
const htmlPages = await Promise.all(localPages.map(async (route) => [route, await (await fetch(`${origin}${route}`)).text()]));
const missingLocalLinks = new Set();
for (const [, html] of htmlPages) {
  for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const pathname = new URL(href, origin).pathname;
    const response = await fetch(`${origin}${pathname}`);
    if (!response.ok) missingLocalLinks.add(`${pathname} (${response.status})`);
  }
}
if (missingLocalLinks.size) throw new Error(`Broken internal links: ${[...missingLocalLinks].join(', ')}`);

console.log(`GET ${origin}/ → ${homeResponse.status}`);
for (const [label, pattern] of checks.slice(0, 6)) console.log(`${label}: ${home.match(pattern)?.[0]}`);
console.log(`H1: ${home.match(/<h1[^>]*>[\s\S]*?<\/h1>/)?.[0]}`);
console.log(`Project text: ${home.match(/.{0,60}React\.js development.{0,90}/)?.[0]}`);
console.log('JSON-LD parses; homepage, 3 articles, privacy, terms, and custom 404 are rendered with page metadata.');
console.log('robots.txt, sitemap.xml, llms.txt, and favicon set: HTTP 200');
console.log('Internal links across all prerendered pages: no broken paths.');
