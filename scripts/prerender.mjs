import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const [{ default: App }, { posts }, seo, { default: BlogArticle }, legalPages] = await Promise.all([
    vite.ssrLoadModule('/src/App.jsx'),
    vite.ssrLoadModule('/src/components/Blog.jsx'),
    vite.ssrLoadModule('/src/seo.js'),
    vite.ssrLoadModule('/src/components/BlogArticle.jsx'),
    vite.ssrLoadModule('/src/components/LegalPages.jsx'),
  ]);
  const ssrRoutes = { BlogArticle, ...legalPages };
  const displayName = seo.FULL_NAME;
  const homeTitle = `${displayName} | ${seo.ROLE}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: seo.FULL_NAME,
    url: seo.SITE_URL,
    jobTitle: 'React.js Developer',
    description: 'React.js developer and cybersecurity trainee building thoughtful, responsive web experiences.',
    knowsAbout: ['React.js', 'JavaScript', 'Web Development', 'Cybersecurity'],
    sameAs: [seo.GITHUB_URL, seo.LINKEDIN_URL],
  };

  const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const headFor = ({ title, description, url }) => `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${seo.OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="${escapeHtml(displayName)}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${seo.OG_IMAGE}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}</script>`;

  const writePage = async (relativePath, appHtml, pageMeta) => {
    const output = template
      .replace('<!--APP_HTML-->', appHtml)
      .replace('<!--SEO_HEAD-->', headFor(pageMeta));
    const target = path.join(dist, relativePath);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, output);
  };

  await writePage('index.html', renderToString(React.createElement(App, { initialHash: '' })), {
    title: homeTitle,
    description: seo.DESCRIPTION,
    url: `${seo.SITE_URL}/`,
  });

  for (const page of [
    {
      path: 'privacy-policy/index.html',
      route: '/privacy-policy/',
      title: `Privacy Policy | ${displayName}`,
      description: `Privacy information for ${displayName}’s portfolio site and optional analytics.`,
    },
    {
      path: 'terms/index.html',
      route: '/terms/',
      title: `Terms & Conditions | ${displayName}`,
      description: `Plain-English terms for using ${displayName}’s personal portfolio website.`,
    },
  ]) {
    await writePage(page.path, renderToString(React.createElement(App, { initialHash: '', initialPath: page.route, ssrRoutes })), {
      title: page.title,
      description: page.description,
      url: `${seo.SITE_URL}${page.route}`,
    });
  }

  for (const post of posts) {
    const title = `${post.title} | ${displayName}`;
    const appHtml = renderToString(React.createElement(App, { initialHash: `#/blog/${post.slug}`, ssrRoutes }));
    await writePage(`blog/${post.slug}/index.html`, appHtml, {
      title,
      description: post.excerpt,
      url: `${seo.SITE_URL}/blog/${post.slug}/`,
    });
  }

  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = [
    `${seo.SITE_URL}/`,
    `${seo.SITE_URL}/privacy-policy/`,
    `${seo.SITE_URL}/terms/`,
    ...posts.map((post) => `${seo.SITE_URL}/blog/${post.slug}/`),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
  await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${seo.SITE_URL}/sitemap.xml\n`);
  await writeFile(path.join(dist, 'llms.txt'), `# ${seo.FULL_NAME}\n\n${seo.DESCRIPTION}\n\n## Main sections\n- [About](${seo.SITE_URL}/#home)\n- [Selected work](${seo.SITE_URL}/#work)\n- [Journey](${seo.SITE_URL}/#journey)\n- [Skills](${seo.SITE_URL}/#explorations)\n- [Contact](${seo.SITE_URL}/#contact)\n- [Privacy policy](${seo.SITE_URL}/privacy-policy/)\n- [Terms](${seo.SITE_URL}/terms/)\n\n## Featured work and experience\n- [React.js development](${seo.SITE_URL}/#work-01)\n- [Ethical hacking](${seo.SITE_URL}/#work-02)\n- [Video and content creation](${seo.SITE_URL}/#work-03)\n\n## Writing\n${posts.map((post) => `- [${post.title}](${seo.SITE_URL}/blog/${post.slug}/)`).join('\n')}\n`);
  await writePage('404.html', renderToString(React.createElement(App, { initialHash: '', initialPath: '/404.html', ssrRoutes })), {
    title: `Page not found | ${displayName}`,
    description: 'This portfolio page could not be found.',
    url: `${seo.SITE_URL}/404.html`,
  });
  const notFoundPath = path.join(dist, '404.html');
  const notFoundHtml = await readFile(notFoundPath, 'utf8');
  await writeFile(notFoundPath, notFoundHtml.replace('</head>', '    <meta name="robots" content="noindex, follow" />\n  </head>'));
  console.log(`Prerendered homepage, ${posts.length} blog pages, privacy and terms pages, and custom 404; generated crawl files.`);
} finally {
  await vite.close();
}
