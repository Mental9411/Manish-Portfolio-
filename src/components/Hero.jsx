import Arrow from './Arrow.jsx';

export default function Hero() {
  return (
    <section className="hero page-section" id="home">
      <div className="hero-content">
        <div className="hero-kicker">COLLECTION ’26</div>
        <h1>Manish</h1>
        <p className="hero-role"><em>React.js Developer</em> &amp; Cybersecurity Trainee</p>
        <p className="hero-description">A Computer Science student based in Jalandhar, India.<br className="desktop-break" /> Building responsive web experiences and learning to make them safer.</p>
        <div className="hero-actions">
          <a className="button button-light" href="#work">See Works <Arrow /></a>
          <a className="button button-outline" href="#contact">Reach out <Arrow diagonal /></a>
        </div>
      </div>
    </section>
  );
}
