import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-analytics-consent';

function readChoice() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'rejected' ? value : 'unset';
  } catch {
    return 'unset';
  }
}

function saveChoice(value) {
  try { window.localStorage.setItem(STORAGE_KEY, value); } catch { /* Consent remains in memory when storage is unavailable. */ }
  window.dispatchEvent(new CustomEvent('privacy-consent-change', { detail: value }));
}

export function CookieSettingsButton({ className = '' }) {
  return <button className={className} type="button" onClick={() => window.dispatchEvent(new Event('privacy-consent-open'))}>Cookie settings</button>;
}

export function PrivacyControls() {
  return <div className="privacy-controls"><button type="button" onClick={() => saveChoice('accepted')}>Accept analytics</button><button type="button" onClick={() => saveChoice('rejected')}>Reject analytics</button><CookieSettingsButton /></div>;
}

export function CookieConsent() {
  const [choice, setChoice] = useState('unset');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setChoice(readChoice());
    const update = (event) => {
      setChoice(event.detail);
      setOpen(false);
    };
    const show = () => setOpen(true);
    window.addEventListener('privacy-consent-change', update);
    window.addEventListener('privacy-consent-open', show);
    return () => {
      window.removeEventListener('privacy-consent-change', update);
      window.removeEventListener('privacy-consent-open', show);
    };
  }, []);

  if (choice !== 'unset' && !open) return null;
  return (
    <aside className="consent-panel" aria-label="Analytics choice">
      <div className="consent-copy"><strong>Your privacy matters.</strong><p>Optional, anonymous visit analytics stay off unless you allow them. Your choice is saved on this device and can be changed later.</p><a href="/privacy-policy/">Read the privacy policy</a></div>
      <div className="consent-actions"><button type="button" onClick={() => saveChoice('accepted')}>Accept</button><button type="button" onClick={() => saveChoice('rejected')}>Reject</button></div>
    </aside>
  );
}

export function ConsentAnalytics() {
  const [accepted, setAccepted] = useState(false);
  const [Analytics, setAnalytics] = useState(null);

  useEffect(() => {
    setAccepted(readChoice() === 'accepted');
    const update = (event) => setAccepted(event.detail === 'accepted');
    window.addEventListener('privacy-consent-change', update);
    return () => window.removeEventListener('privacy-consent-change', update);
  }, []);

  useEffect(() => {
    if (!accepted || Analytics) return;
    let active = true;
    import('@vercel/analytics/react').then(({ Analytics: Component }) => {
      if (active) setAnalytics(() => Component);
    }).catch(() => {});
    return () => { active = false; };
  }, [accepted, Analytics]);

  return accepted && Analytics ? <Analytics /> : null;
}
