import Arrow from './Arrow.jsx';

export default function Contact() {
  return (
    <footer className="contact-section page-section" id="contact">
      <h2 className="sr-only">Contact</h2>
      <a className="contact-email js-reveal" href="mailto:manishbassanpul9411@gmail.com">manishbassanpul9411@gmail.com <Arrow diagonal /></a>
      <div className="contact-bottom">
        <div className="contact-availability"><span className="availability-dot" /> Available for opportunities</div>
        <div className="contact-socials"><a href="https://www.linkedin.com/in/manish-mental-59445b258" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /></a><a href="https://github.com/Mental9411" target="_blank" rel="noopener noreferrer">GitHub <Arrow diagonal /></a></div>
        <span className="copyright">© 2026 Manish</span>
        <div className="legal-links"><a href="/privacy-policy/">Privacy</a><a href="/terms/">Terms</a><button type="button" onClick={() => window.dispatchEvent(new Event('privacy-consent-open'))}>Cookie settings</button></div>
      </div>
    </footer>
  );
}
