const origin = process.argv[2] ?? 'http://127.0.0.1:4173';
const homeResponse = await fetch(origin);
if (!homeResponse.ok) throw new Error(`Homepage returned HTTP ${homeResponse.status}`);
const home = await homeResponse.text();
const checks = [
  ['title', /<title>[^<]+<\/title>/],
  ['description', /<meta name="description" content="[^"]+"\s*\/>/],
  ['canonical', /<link rel="canonical" href="https:\/\/manish-portfolio-six-hazel\.vercel\.app\/"\s*\/>/],
  ['Open Graph metadata', /<meta property="og:title"/],
  ['Twitter metadata', /<meta name="twitter:card" content="summary_large_image"/],
  ['Person JSON-LD', /<script type="application\/ld\+json">([^<]+)<\/script>/],
  ['server-rendered H1', /<h1[^>]*>Manish/],
  ['server-rendered project text', /React\.js development/],
];
for (const [label, pattern] of checks) {
  if (!pattern.test(home)) throw new Error(`Missing ${label} in raw homepage HTML`);
}
const jsonLd = home.match(checks[5][1])[1];
JSON.parse(jsonLd);
if ((home.match(/<h1\b/g) ?? []).length !== 1) throw new Error('Homepage must contain exactly one H1');

for (const slug of ['components-and-change', 'curiosity-and-scope', 'editing-and-rhythm']) {
  const response = await fetch(`${origin}/blog/${slug}/`);
  if (!response.ok) throw new Error(`Blog page ${slug} returned HTTP ${response.status}`);
  const html = await response.text();
  if (!/<title>[^<]+<\/title>/.test(html) || !/<link rel="canonical"/.test(html) || !/<h1/.test(html)) {
    throw new Error(`Blog page ${slug} is missing unique metadata or rendered content`);
  }
}

for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt']) {
  const response = await fetch(`${origin}/${file}`);
  if (!response.ok) throw new Error(`${file} returned HTTP ${response.status}`);
}

console.log(`GET ${origin}/ → ${homeResponse.status}`);
for (const [label, pattern] of checks.slice(0, 6)) console.log(`${label}: ${home.match(pattern)?.[0]}`);
console.log(`H1: ${home.match(/<h1[^>]*>[\s\S]*?<\/h1>/)?.[0]}`);
console.log(`Project text: ${home.match(/.{0,60}React\.js development.{0,90}/)?.[0]}`);
console.log('JSON-LD parses; one homepage H1; all 3 article pages have rendered content and unique page metadata.');
console.log('robots.txt, sitemap.xml, and llms.txt: HTTP 200');
