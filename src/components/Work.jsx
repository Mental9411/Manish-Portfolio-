import Arrow from './Arrow.jsx';

const workItems = [
  {
    id: '01',
    label: 'FRONTEND DEVELOPMENT',
    title: 'React.js development',
    subtitle: 'Freelance',
    description: 'Responsive applications built with reusable components, Hooks, Context API, and RESTful integrations.',
    className: 'work-react',
    mark: 'R',
    tags: ['React', 'Components', 'REST API'],
  },
  {
    id: '02',
    label: 'CYBERSECURITY',
    title: 'Ethical hacking',
    subtitle: 'Techcadd Company · Internship',
    description: 'Six months of hands-on training in authorized penetration testing, vulnerability reporting, and remediation.',
    className: 'work-security',
    mark: '⌑',
    tags: ['VAPT', 'OWASP Top 10', 'Reporting'],
  },
  {
    id: '03',
    label: 'VIDEO & CONTENT',
    title: 'Video & content creation',
    subtitle: 'Freelance',
    description: 'Social and marketing content shaped through editing, color grading, motion graphics, and sound.',
    className: 'work-media',
    mark: '▶',
    tags: ['Premiere Pro', 'After Effects', 'CapCut'],
  },
];

function WorkCard({ item }) {
  return (
    <article className="work-card js-reveal">
      <div className={`work-art ${item.className}`} aria-hidden="true">
        <span className="art-grain" />
        <span className="art-mark">{item.mark}</span>
        <span className="art-index">MANISH / {item.id}</span>
        <span className="art-label">{item.label}</span>
      </div>
      <div className="work-card-meta"><span>{item.label}</span><span>{item.id} / 03</span></div>
      <div className="work-card-title"><div><h3>{item.title}</h3><p>{item.subtitle}</p></div><span className="work-arrow"><Arrow diagonal /></span></div>
      <p className="work-description">{item.description}</p>
      <ul className="work-tags">{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    </article>
  );
}

export default function Work() {
  return (
    <section className="work-section page-section" id="work">
      <div className="section-intro work-intro">
        <div><h2>Selected <em>work.</em></h2><p>A selection of my work and hands-on experience across development, security, and content.</p></div>
        <a className="view-link" href="#journey">View résumé <Arrow /></a>
      </div>
      <div className="work-grid">{workItems.map((item) => <WorkCard item={item} key={item.id} />)}</div>
    </section>
  );
}
