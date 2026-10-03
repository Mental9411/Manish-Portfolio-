import { useState } from 'react';

const practice = [
  {
    number: '01',
    title: 'Web development',
    className: 'practice-web',
    summary: 'Responsive interfaces, reusable UI, and APIs.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'JSX', 'Context API', 'REST APIs'],
    details: 'Built responsive React interfaces with reusable components, Hooks, and Context API. Connected interfaces to REST endpoints and adjusted layouts for different screen sizes.',
    practice: 'Reusable component structure, client-side state, REST API integration, responsive styling, and CSS-in-JS.',
    tools: ['HTML', 'CSS', 'JavaScript', 'React.js', 'JSX', 'React Hooks', 'Context API', 'REST APIs', 'Responsive design', 'Component architecture', 'CSS-in-JS'],
  },
  {
    number: '02',
    title: 'Cybersecurity',
    className: 'practice-security',
    summary: 'Security fundamentals and authorized assessment.',
    skills: ['VAPT', 'OWASP Top 10', 'Reconnaissance', 'Network security', 'Mobile & Wi-Fi'],
    details: 'Completed a six-month ethical hacking internship focused on learning assessment methods within an authorized scope and communicating findings responsibly.',
    practice: 'Footprinting and reconnaissance, client-side attack concepts, network fundamentals, mobile and Wi-Fi security, and writing reports with remediation recommendations.',
    tools: ['Ethical hacking', 'VAPT concepts', 'OWASP Top 10', 'Footprinting', 'Reconnaissance', 'Client-side attacks', 'Social engineering awareness', 'Malware awareness', 'Mobile security', 'Wi-Fi security', 'Steganography', 'Password security', 'Network security', 'Penetration-testing reports'],
  },
  {
    number: '03',
    title: 'Content & media',
    className: 'practice-media',
    summary: 'Visual storytelling through edit, color, and motion.',
    skills: ['Premiere Pro', 'After Effects', 'CapCut', 'Photography', 'Motion graphics'],
    details: 'Created freelance video and visual content for social media, marketing, and personal branding, focusing on clear pacing and a consistent visual finish.',
    practice: 'Cutting footage, color grading, motion graphics, image editing, photography, and synchronizing audio with picture.',
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut', 'Image editing', 'Photography', 'Motion graphics', 'Audio synchronization'],
  },
];

function PracticeCard({ item, index, isOpen, onToggle }) {
  const panelId = `practice-details-${item.number}`;
  const triggerId = `practice-trigger-${item.number}`;

  return (
    <article className={`practice-card js-reveal ${item.className}${isOpen ? ' is-expanded' : ''}`}>
      <button className="practice-card-trigger" id={triggerId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle}>
        <span className="practice-meta"><span>{item.number} / 03</span><span>MANISH · 2026</span></span>
        <span className="practice-art" aria-hidden="true"><span className="practice-glyph">{index === 0 ? '〈/〉' : index === 1 ? '⌑' : '✳'}</span><span className="practice-ring" /></span>
        <span className="practice-title-row"><span className="practice-title">{item.title}</span><span className="practice-expand-mark" aria-hidden="true">{isOpen ? '−' : '+'}</span></span>
        <span className="practice-summary">{item.summary}</span>
        <span className="practice-skills" aria-label="Highlights">{item.skills.map((skill) => <span className="practice-skill" key={skill}>{skill}</span>)}</span>
      </button>
      <div className={`practice-details${isOpen ? ' is-open' : ''}`} id={panelId} role="region" aria-labelledby={triggerId} aria-hidden={!isOpen} inert={!isOpen}>
        <div className="practice-details-inner">
          <p className="practice-details-description">{item.details}</p>
          <h4>Built &amp; practised</h4>
          <p className="practice-details-copy">{item.practice}</p>
          <h4>Skills &amp; tools</h4>
          <ul className="practice-tools">{item.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
          <button className="practice-collapse" type="button" onClick={onToggle}>Close details <span aria-hidden="true">−</span></button>
        </div>
      </div>
    </article>
  );
}

export default function Explorations() {
  const [openNumber, setOpenNumber] = useState(null);

  return (
    <section className="explorations-section page-section" id="explorations">
      <h2 className="sr-only">Skills</h2>
      <div className="exploration-heading">
        <div><h2>What I’m <em>learning.</em></h2><p>A growing toolkit across the things I enjoy building and exploring.</p></div>
        <div className="orbit-stamp" aria-hidden="true"><span>M</span><i>WEB · SECURITY · MEDIA</i></div>
      </div>
      <div className="practice-grid">
        {practice.map((item, index) => (
          <PracticeCard
            item={item}
            index={index}
            isOpen={openNumber === item.number}
            onToggle={() => setOpenNumber((current) => current === item.number ? null : item.number)}
            key={item.number}
          />
        ))}
      </div>
    </section>
  );
}
