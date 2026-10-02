import React, { useEffect, useState } from 'react';
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

function routeHash() {
  if (typeof window === 'undefined') return '';
  const articlePath = window.location.pathname.match(/^\/blog\/([a-z0-9-]+)\/?$/i);
  return articlePath ? `#/blog/${articlePath[1]}` : window.location.hash;
}

export default function App({ initialHash = routeHash() }) {
  const [hash, setHash] = useState(initialHash);

  useEffect(() => {
    const updateRoute = () => setHash(routeHash());
    window.addEventListener('hashchange', updateRoute);
    window.addEventListener('popstate', updateRoute);
    return () => {
      window.removeEventListener('hashchange', updateRoute);
      window.removeEventListener('popstate', updateRoute);
    };
  }, []);

  const articleMatch = hash.match(/^#\/blog\/([a-z0-9-]+)$/i);

  useEffect(() => {
    if (!articleMatch) return;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  }, [hash]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionLayer>
        <Navigation />
        {articleMatch ? <BlogArticle slug={decodeURIComponent(articleMatch[1])} /> : (
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
