const practice = [
  {
    number: '01',
    title: 'Web development',
    className: 'practice-web',
    summary: 'Responsive interfaces, reusable UI, and APIs.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'JSX', 'Context API', 'REST APIs'],
  },
  {
    number: '02',
    title: 'Cybersecurity',
    className: 'practice-security',
    summary: 'Security fundamentals and authorized assessment.',
    skills: ['VAPT', 'OWASP Top 10', 'Reconnaissance', 'Network security', 'Mobile & Wi-Fi'],
  },
  {
    number: '03',
    title: 'Content & media',
    className: 'practice-media',
    summary: 'Visual storytelling through edit, color, and motion.',
    skills: ['Premiere Pro', 'After Effects', 'CapCut', 'Photography', 'Motion graphics'],
  },
];

export default function Explorations() {
  return (
    <section className="explorations-section page-section" id="explorations">
      <div className="exploration-heading">
        <div><h2>What I’m <em>learning.</em></h2><p>A growing toolkit across the things I enjoy building and exploring.</p></div>
        <div className="orbit-stamp" aria-hidden="true"><span>M</span><i>WEB · SECURITY · MEDIA</i></div>
      </div>
      <div className="practice-grid">
        {practice.map((item) => (
          <article className={`practice-card js-reveal ${item.className}`} key={item.number}>
            <div className="practice-meta"><span>{item.number} / 03</span><span>MANISH · 2026</span></div>
            <div className="practice-art" aria-hidden="true"><span className="practice-glyph">{item.number === '01' ? '〈/〉' : item.number === '02' ? '⌑' : '✳'}</span><span className="practice-ring" /></div>
            <h3>{item.title}</h3><p>{item.summary}</p>
            <ul>{item.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
