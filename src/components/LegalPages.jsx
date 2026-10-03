import { CookieSettingsButton, PrivacyControls } from './PrivacyConsent.jsx';

function LegalFooter() {
  return <footer className="legal-footer"><a href="/">Home</a><a href="/privacy-policy/">Privacy</a><a href="/terms/">Terms</a><CookieSettingsButton /></footer>;
}

export function PrivacyPolicy() {
  return <main className="legal-page page-section" id="main-content">
    <p className="eyebrow">PLAIN-LANGUAGE NOTICE</p>
    <h1>Privacy <em>policy.</em></h1>
    <p className="legal-updated">Last updated: 3 October 2026</p>
    <p>This is Manish’s personal portfolio. This page explains what information is used when you browse the site or email him.</p>
    <h2>Information you choose to send</h2>
    <p>If you choose to email Manish using the mail link, the information you include is sent to his email account. Please avoid including sensitive information.</p>
    <h2>Optional analytics</h2>
    <p>Vercel Web Analytics is loaded only if you choose Accept. It provides aggregated, anonymous visit statistics. If you reject, it stays off. Your choice is stored in this browser’s local storage; it is a preference, not a tracking cookie. You can change it below or from Cookie settings in the footer.</p>
    <PrivacyControls />
    <h2>Hosting and email</h2>
    <p>Vercel hosts the website. Emails you send remain in the recipient’s email account according to that account’s retention practices.</p>
    <h2>Your choices and contact</h2>
    <p>You can decline analytics and still use the site. For privacy questions, email <a href="mailto:manishbassanpul9411@gmail.com">manishbassanpul9411@gmail.com</a>.</p>
    <p>This is an informational notice for a personal website, not legal advice. The site owner should review it against the final services, data region, retention settings, and applicable obligations before launch.</p>
    <LegalFooter />
  </main>;
}

export function Terms() {
  return <main className="legal-page page-section" id="main-content">
    <p className="eyebrow">SITE INFORMATION</p>
    <h1>Terms &amp; <em>conditions.</em></h1>
    <p className="legal-updated">Last updated: 3 October 2026</p>
    <p>Welcome to Manish’s personal portfolio. By using this site, you agree to these simple terms.</p>
    <h2>Portfolio content</h2>
    <p>Text, designs, and other original materials on this site are provided for personal and professional portfolio purposes. Please ask before reproducing them. Third-party names and marks belong to their respective owners.</p>
    <h2>Accuracy and availability</h2>
    <p>Experience, skills, and education are presented as portfolio information and may change over time. The site and its links are provided as available; external sites are operated by others and have their own terms and privacy notices.</p>
    <h2>Responsible use</h2>
    <p>Do not attempt to disrupt the website or use security-related material here to test systems without their owner’s permission. Any security learning described on this site is subject to authorized scope.</p>
    <h2>Contact</h2>
    <p>Questions about these terms? <a href="mailto:manishbassanpul9411@gmail.com">Email Manish</a>.</p>
    <LegalFooter />
  </main>;
}

export function NotFound() {
  return <main className="error-page page-section" id="main-content"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>This page isn’t here.</h1><p>The address may have changed, or the page may have been removed.</p><a className="button button-light" href="/">Back to home <span aria-hidden="true">↗</span></a><LegalFooter /></main>;
}
