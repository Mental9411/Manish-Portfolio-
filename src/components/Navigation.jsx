import { useState } from 'react';
import Arrow from './Arrow.jsx';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav className={`nav-pill${isOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        <a className="nav-mark" href="/#home" aria-label="Manish, home" onClick={closeMenu}>M</a>
        <button
          className="nav-toggle"
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation-links"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <div className="nav-links" id="primary-navigation-links">
          <a className="nav-link nav-home" href="/#home" onClick={closeMenu}>Home</a>
          <a className="nav-link" href="/#work" onClick={closeMenu}>Work</a>
          <a className="nav-link" href="/#journey" onClick={closeMenu}>Journey</a>
          <a className="nav-link" href="/#blog" onClick={closeMenu}>Blog</a>
          <a className="nav-link nav-sayhi" href="/#contact" onClick={closeMenu}>Say hi <Arrow diagonal /></a>
        </div>
      </nav>
    </header>
  );
}
