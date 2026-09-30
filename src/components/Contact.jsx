import Arrow from './Arrow.jsx';

export default function Contact() {
  return (
    <footer className="contact-section page-section" id="contact">
      <a className="contact-email js-reveal" href="mailto:manishbassanpul9411@gmail.com">manishbassanpul9411@gmail.com <Arrow diagonal /></a>
      <div className="contact-bottom">
        <div className="contact-availability"><span className="availability-dot" /> Available for opportunities</div>
        <div className="contact-socials"><a href="https://www.linkedin.com/in/manish-mental-59445b258" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a><a href="https://github.com/Mental9411" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a></div>
        <span className="copyright">© 2026 Manish</span>
      </div>
    </footer>
  );
}
