import React, { Suspense, lazy, useEffect, useState } from 'react';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Journey from './components/Journey.jsx';
import Blog from './components/Blog.jsx';
import { getBlogPost } from './components/Blog.jsx';
import Explorations from './components/Explorations.jsx';
import Stats from './components/Stats.jsx';
import Contact from './components/Contact.jsx';
import MotionLayer from './components/MotionLayer.jsx';
import { CookieConsent, ConsentAnalytics } from './components/PrivacyConsent.jsx';
import { DESCRIPTION, FULL_NAME, OG_IMAGE, ROLE, SITE_URL } from './seo.js';

const BlogArticleRoute = lazy(() => import('./components/BlogArticle.jsx'));
const PrivacyRoute = lazy(() => import('./components/LegalPages.jsx').then((module) => ({ default: module.PrivacyPolicy })));
const TermsRoute = lazy(() => import('./components/LegalPages.jsx').then((module) => ({ default: module.Terms })));
const NotFoundRoute = lazy(() => import('./components/LegalPages.jsx').then((module) => ({ default: module.NotFound })));

function routeHash() {
  if (typeof window === 'undefined') return '';
  const articlePath = window.location.pathname.match(/^\/blog\/([a-z0-9-]+)\/?$/i);
  return articlePath ? `#/blog/${articlePath[1]}` : window.location.hash;
}

function setMeta(name, value, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(property ? 'property' : 'name', name);
    document.head.appendChild(element);
  }
  element.content = value;
}

function updateMetadata(path, hash) {
  const match = hash.match(/^#\/blog\/([a-z0-9-]+)$/i);
  const post = match ? getBlogPost(decodeURIComponent(match[1])) : null;
  let title = `${FULL_NAME} | ${ROLE}`;
  let description = DESCRIPTION;
  let canonical = `${SITE_URL}/`;
  let pageType = 'website';

  if (post) {
    title = `${post.title} | ${FULL_NAME}`;
    description = post.excerpt;
    canonical = `${SITE_URL}/blog/${post.slug}/`;
    pageType = 'article';
  } else if (path === '/privacy-policy/') {
    title = `Privacy Policy | ${FULL_NAME}`;
    description = `Privacy information for ${FULL_NAME}’s portfolio site and optional analytics.`;
    canonical = `${SITE_URL}/privacy-policy/`;
  } else if (path === '/terms/') {
    title = `Terms & Conditions | ${FULL_NAME}`;
    description = `Plain-English terms for using ${FULL_NAME}’s personal portfolio website.`;
    canonical = `${SITE_URL}/terms/`;
  } else if (!['/', '/index.html', '/blog/'].includes(path) && !match) {
    title = `Page not found | ${FULL_NAME}`;
    description = 'This portfolio page could not be found.';
    canonical = `${SITE_URL}/404.html`;
  }

  document.title = title;
  setMeta('description', description);
  setMeta('og:type', pageType, true);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', canonical, true);
  setMeta('og:image', OG_IMAGE, true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', OG_IMAGE);
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonical;
  const robots = document.head.querySelector('meta[name="robots"]');
  if (canonical.endsWith('/404.html')) setMeta('robots', 'noindex, follow');
  else if (robots) robots.remove();
}

export default function App({ initialHash = routeHash(), initialPath = typeof window === 'undefined' ? '/' : window.location.pathname, ssrRoutes = {} }) {
  const [hash, setHash] = useState(initialHash);
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const updateRoute = () => {
      setHash(routeHash());
      setPath(window.location.pathname);
    };
    window.addEventListener('hashchange', updateRoute);
    window.addEventListener('popstate', updateRoute);
    return () => {
      window.removeEventListener('hashchange', updateRoute);
      window.removeEventListener('popstate', updateRoute);
    };
  }, []);

  const articleMatch = hash.match(/^#\/blog\/([a-z0-9-]+)$/i);
  const isPrivacy = path === '/privacy-policy/';
  const isTerms = path === '/terms/';
  const isKnownHome = ['/', '/index.html'].includes(path);
  const isKnownArticle = /^\/blog\/[a-z0-9-]+\/?$/i.test(path) || Boolean(articleMatch);
  const notFound = !isPrivacy && !isTerms && !isKnownHome && !isKnownArticle;
  const ArticlePage = ssrRoutes.BlogArticle || BlogArticleRoute;
  const PrivacyPage = ssrRoutes.PrivacyPolicy || PrivacyRoute;
  const TermsPage = ssrRoutes.Terms || TermsRoute;
  const NotFoundPage = ssrRoutes.NotFound || NotFoundRoute;

  useEffect(() => {
    updateMetadata(path, hash);
  }, [path, hash]);

  useEffect(() => {
    if (!articleMatch) return;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  }, [hash]);

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <MotionLayer>
      <Navigation />
      {notFound ? <Suspense fallback={null}><NotFoundPage /></Suspense> : isPrivacy ? <Suspense fallback={null}><PrivacyPage /></Suspense> : isTerms ? <Suspense fallback={null}><TermsPage /></Suspense> : articleMatch ? <Suspense fallback={null}><ArticlePage slug={decodeURIComponent(articleMatch[1])} /></Suspense> : (
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
    <CookieConsent />
    <ConsentAnalytics />
  </>;
}
