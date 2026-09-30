import Arrow from './Arrow.jsx';

const milestones = [
  {
    year: '2022 — 2026',
    category: 'EDUCATION',
    number: '01',
    title: 'Starting with the fundamentals.',
    qualification: 'B.Tech · Computer Science & Engineering',
    place: 'CT Group of Institutions',
    story: 'My degree has grounded me in computing and given me room to explore front-end development and cybersecurity. Before that, I completed Senior Secondary Science through PSEB in 2021.',
    symbol: 'CSE',
    tone: 'violet',
  },
  {
    year: 'TRAINING · FREELANCE',
    category: 'WEB DEVELOPMENT',
    number: '02',
    title: 'Learning by building.',
    qualification: 'React.js Developer · Freelance',
    place: 'Web Development in React.js · GTB Computer Education',
    story: 'React training led into hands-on freelance work with responsive interfaces, reusable components, Hooks, Context API, and REST integrations.',
    symbol: '〈/〉',
    tone: 'cyan',
  },
  {
    year: '6 MONTHS',
    category: 'CYBERSECURITY',
    number: '03',
    title: 'Testing with responsibility.',
    qualification: 'Ethical Hacker Intern · Techcadd Company',
    place: 'Ethical Hacking · Techcadd Trainings',
    story: 'The internship focused on authorized penetration-testing methods, identifying vulnerabilities, reporting findings, and recommending remediation.',
    symbol: 'VAPT',
    tone: 'violet',
  },
  {
    year: 'FREELANCE',
    category: 'CONTENT & MEDIA',
    number: '04',
    title: 'Making ideas move.',
    qualification: 'Video Editor / Content Creator',
    place: 'Social, marketing, and personal-brand content',
    story: 'Editing work has let me explore pacing, color grading, motion graphics, and audio synchronization with Premiere Pro, After Effects, and CapCut.',
    symbol: '▶',
    tone: 'cyan',
  },
];

function Milestone({ item, reverse }) {
  return (
    <article className={`journey-step js-reveal ${reverse ? 'is-reverse' : ''} tone-${item.tone}`}>
      <div className="journey-medallion" aria-hidden="true"><span>{item.symbol}</span><i /></div>
      <div className="journey-copy">
        <div className="journey-meta"><span>{item.year}</span><span>{item.category}</span></div>
        <div className="journey-title"><span className="journey-number">{item.number}</span><h3>{item.title}</h3></div>
        <div className="journey-qualification"><strong>{item.qualification}</strong><span>{item.place}</span></div>
        <p>{item.story}</p>
      </div>
    </article>
  );
}

export default function Journey() {
  return (
    <section className="journey-section" id="journey">
      <div className="journey-inner">
        <div className="journey-heading">
          <div><span className="journey-eyebrow">A PERSONAL TIMELINE</span><h2>The steps that<br /><em>brought me here.</em></h2></div>
          <p>Each chapter brought a different kind of problem. I’ve kept a little of every one with me.</p>
        </div>
        <div className="journey-timeline">
          <svg className="journey-route" viewBox="0 0 1000 940" preserveAspectRatio="none" aria-hidden="true">
            <path d="M180 116 C395 164 590 236 820 345 S610 525 180 580 S595 760 820 815" />
          </svg>
          <div className="journey-steps">{milestones.map((item, index) => <Milestone item={item} reverse={index % 2 === 1} key={item.number} />)}</div>
        </div>
        <a className="journey-download" href="/Manish_Resume.pdf" download>Download full résumé <Arrow diagonal /></a>
      </div>
    </section>
  );
}
