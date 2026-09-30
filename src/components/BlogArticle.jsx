import Arrow from './Arrow.jsx';
import { posts } from './Blog.jsx';

export default function BlogArticle({ slug }) {
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <main className="blog-article page-section">
        <a className="article-back" href="/#blog"><Arrow /> Back to blog</a>
        <h1>Note not found.</h1>
      </main>
    );
  }

  return (
    <main className="blog-article page-section">
      <a className="article-back" href="/#blog"><Arrow /> Back to blog</a>
      <article className="article-body">
        <div className="article-art" aria-hidden="true">{post.symbol}</div>
        <p className="article-category">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>
        <div className="article-divider" />
        <p className="article-content">{post.content}</p>
        <a className="article-back article-back-bottom" href="/#blog">Back to all notes <Arrow diagonal /></a>
      </article>
    </main>
  );
}
