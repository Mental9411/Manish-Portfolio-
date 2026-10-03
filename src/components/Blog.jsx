import Arrow from './Arrow.jsx';

export const posts = [
  {
    slug: 'components-and-change',
    category: 'FRONTEND · REACT',
    title: 'A component should make change easier.',
    excerpt: 'Reusable UI is useful when it makes a screen easier to understand and maintain.',
    content: 'I think about a component as a small boundary around a piece of interface and its behavior. React Hooks help keep local behavior close to the UI, while Context API can share state where it is needed. When an interface also uses REST data, clear loading and empty states make the experience feel as considered as the successful one.',
    symbol: '〈/〉',
  },
  {
    slug: 'curiosity-and-scope',
    category: 'SECURITY · LEARNING',
    title: 'Curiosity needs a clear scope.',
    excerpt: 'Responsible security work starts with knowing what is authorized.',
    content: 'Ethical hacking training taught me to approach assessment with boundaries. Understand the authorized scope, document what you observe, report vulnerabilities clearly, and include remediation recommendations. A careful report helps turn a finding into something a team can act on.',
    symbol: 'VAPT',
  },
  {
    slug: 'editing-and-rhythm',
    category: 'VIDEO · CREATIVE PRACTICE',
    title: 'Editing is rhythm before effects.',
    excerpt: 'A thoughtful cut brings pacing, image, motion, and sound together.',
    content: 'When I edit, the first question is whether each moment supports the message. Color grading and motion graphics can add emphasis, but they work best when the pacing and audio already feel right. Premiere Pro, After Effects, and CapCut each fit a different part of that process.',
    symbol: '▶',
  },
];

export const getBlogPost = (slug) => posts.find((entry) => entry.slug === slug);

export default function Blog() {
  return (
    <section className="blog-section page-section" id="blog">
      <div className="section-intro blog-intro">
        <div><h2>Recent <em>thoughts.</em></h2><p>Short notes on the things I’m learning and the details I notice along the way.</p></div>
        <span className="blog-side-note">SELECT A NOTE TO READ <Arrow /></span>
      </div>
      <div className="blog-grid">
        {posts.map((post, index) => (
          <a className="blog-card js-reveal" href={`#/blog/${post.slug}`} key={post.title}>
              <span className="blog-card-art" aria-hidden="true"><i>{post.symbol}</i><b>0{index + 1}</b></span>
              <span className="blog-card-category">{post.category}</span>
              <span className="blog-card-title">{post.title}</span>
              <span className="blog-card-excerpt">{post.excerpt}</span>
              <span className="blog-read">Read note <Arrow diagonal /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
