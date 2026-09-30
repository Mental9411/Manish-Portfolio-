import Arrow from './Arrow.jsx';

export default function Navigation() {
  return (
    <header className="site-header">
      <nav className="nav-pill" aria-label="Main navigation">
        <a className="nav-mark" href="/#home" aria-label="Manish, home">M</a>
        <a className="nav-link nav-home" href="/#home">Home</a>
        <a className="nav-link" href="/#work">Work</a>
        <a className="nav-link" href="/#journey">Journey</a>
        <a className="nav-link" href="/#blog">Blog</a>
        <a className="nav-link nav-sayhi" href="/#contact">Say hi <Arrow diagonal /></a>
      </nav>
    </header>
  );
}
