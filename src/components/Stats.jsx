const facts = [
  { number: '06', unit: 'months', label: 'Ethical hacking internship' },
  { number: '04', unit: 'years', label: 'B.Tech · 2022—2026' },
  { number: '03', unit: 'fields', label: 'Web · Security · Media' },
];

export default function Stats() {
  return (
    <section className="stats-section page-section" id="stats" aria-label="Experience at a glance">
      {facts.map((fact) => <div className="stat-item js-reveal" key={fact.label}><div className="stat-number">{fact.number}</div><span className="stat-unit">{fact.unit}</span><span className="stat-label">{fact.label}</span></div>)}
      <div className="stats-marquee" aria-hidden="true"><span>BUILDING FOR THE WEB · MAKING IT SAFER · CREATING WITH PURPOSE ·&nbsp;</span><span>BUILDING FOR THE WEB · MAKING IT SAFER · CREATING WITH PURPOSE ·&nbsp;</span></div>
    </section>
  );
}
