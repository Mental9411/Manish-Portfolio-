import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Journey from './components/Journey.jsx';
import Blog from './components/Blog.jsx';
import BlogArticle from './components/BlogArticle.jsx';
import Explorations from './components/Explorations.jsx';
import Stats from './components/Stats.jsx';
import Contact from './components/Contact.jsx';
import MotionLayer from './components/MotionLayer.jsx';
import './styles.css';

function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const updateRoute = () => setHash(window.location.hash);
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  const articleMatch = hash.match(/^#\/blog\/([^/]+)$/);

  useEffect(() => {
    if (articleMatch) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [hash]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionLayer>
        <Navigation />
        {articleMatch ? (
          <BlogArticle slug={decodeURIComponent(articleMatch[1])} />
        ) : (
          <>
            <main id="main-content">
              <Hero />
              <Work />
              <Journey />
              <Blog />
              <Explorations />
              <Stats />
            </main>
            <Contact />
          </>
        )}
      </MotionLayer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
