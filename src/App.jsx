import React, { useEffect, useMemo, useState } from 'react';

const roadmap = [
  { quarter: 'Q1', date: 'January–March 2027', half: 'h1', state: 'Program planning', title: 'Applied AI & secure software', host: 'Five company-campus programs across global regions', target: '5 programs · hands-on delivery', image: '/assets/techbridge-workshop-hero.png' },
  { quarter: 'Q2', date: 'April–June 2027', half: 'h1', state: 'Host matching', title: 'Cloud & data systems', host: 'Five short-format workshops for working professionals', target: '5 programs · guided projects', image: '/assets/techbridge-hardware-lab.png' },
  { quarter: 'Q3', date: 'July–September 2027', half: 'h2', state: 'Curriculum development', title: 'Robotics & edge AI', host: 'Five practical programs delivered with industry practitioners', target: '5 programs · regional reach', image: '/assets/techbridge-student-presentation.png' },
  { quarter: 'Q4', date: 'October–December 2027', half: 'h2', state: 'Partner conversations', title: 'Responsible AI & software quality', host: 'Five company-hosted programs closing the annual cycle', target: '5 programs · completion certificates', image: '/assets/techbridge-workshop-hero.png' },
];

const galleryItems = [
  { title: 'Practitioner-led workshop', src: '/assets/techbridge-workshop-hero.png', className: 'gallery-wide' },
  { title: 'Hands-on technical lab', src: '/assets/techbridge-hardware-lab.png' },
  { title: 'Guided project review', src: '/assets/techbridge-student-presentation.png' },
  { title: 'Live tool walkthrough', src: '/assets/techbridge-workshop-hero.png' },
  { title: 'Project completion', src: '/assets/techbridge-student-presentation.png' },
  { title: 'Industry and IEEE collaboration', src: '/assets/techbridge-student-presentation.png', className: 'gallery-wide' },
  { title: 'Build environment setup', src: '/assets/techbridge-hardware-lab.png' },
  { title: 'Professional learning cohort', src: '/assets/techbridge-workshop-hero.png' },
];

const outcomes = [
  { result: 'Build, not just watch', copy: 'Every participant works directly with tools and platforms, completing a guided project on their own laptop.', tag: 'Applied learning', number: '01' },
  { result: 'Skills for work now', copy: 'Focused content in AI, cybersecurity, cloud, robotics and other emerging technologies connects directly to industry practice.', tag: 'Industry relevance', number: '02' },
  { result: 'Completion recognized', copy: 'Participants who successfully complete the workshop project receive a certificate of completion.', tag: 'Clear outcome', number: '03' },
];

const deliveryNetwork = [
  ['Industry practitioners', 'Lead focused labs grounded in real tools, systems and delivery experience.', 'IP'],
  ['IEEE CS volunteers', 'Shape local programs, coordinate communities and support participant success.', 'IV'],
  ['Corporate hosts', 'Bring practical learning into the environments where professionals already work.', 'CH'],
  ['Regional coordinators', 'Connect city programs to global regions and a consistent delivery standard.', 'RC'],
  ['Technical mentors', 'Help participants move through setup, implementation and project review.', 'TM'],
  ['Program operations', 'Coordinate the quarterly cadence, partner experience and completion pathway.', 'PO'],
];

const involvement = [
  ['Host a program', 'Bring a four-to-six-hour TechBRIDGE workshop to your company or corporate campus.', 'Discuss hosting'],
  ['Lead a workshop', 'Share current industry practice through a guided, project-based technical session.', 'Become a practitioner'],
  ['Volunteer locally', 'Support delivery, mentoring and participant experience in your region.', 'Volunteer with us'],
  ['Join as a company', 'Engage your engineering teams and help shape relevant professional learning.', 'Start a partnership'],
  ['Attend a program', 'Build practical skills, complete the project and earn recognition of completion.', 'Register interest'],
];

const supportOptions = ['Corporate hosting', 'Practitioner speakers', 'Workshop curriculum', 'Technical platform', 'Mentor support', 'Completion certificates'];

function ArrowIcon({ direction = 'right' }) {
  const rotate = direction === 'down' ? 'rotate(90 12 12)' : undefined;
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="arrow-icon"><g transform={rotate} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M5 12h13" /><path d="m14 7 5 5-5 5" /></g></svg>;
}

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="#top" aria-label="TechBRIDGE home"><span>Tech</span><strong>BRIDGE</strong></a>;
}

function SocietyMark({ footer = false }) {
  return (
    <a className={`society-mark ${footer ? 'society-mark-footer' : ''}`} href="https://www.computer.org/" target="_blank" rel="noreferrer" aria-label="Visit the IEEE Computer Society website">
      <img src="/assets/IEEE-CS_LogoTM-orange.png" alt="IEEE Computer Society" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [['About', '#about'], ['Alignment', '#alignment'], ['2027 plan', '#events'], ['Experience', '#gallery'], ['Delivery', '#team']];
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-group"><Brand /><span className="brand-divider" /><SocietyMark /></div>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          <a className="button button-small" href="#request">Bring TechBRIDGE to work</a>
        </nav>
        <button className="menu-button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}><span className="sr-only">Toggle navigation</span><span /><span /></button>
      </div>
      <nav id="mobile-menu" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Mobile navigation">
        {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="button" href="#request" onClick={() => setOpen(false)}>Bring TechBRIDGE to work</a>
      </nav>
    </header>
  );
}

function SectionLabel({ children }) { return <p className="section-label">{children}</p>; }

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <SectionLabel>A 2027 IEEE Computer Society industry engagement initiative</SectionLabel>
        <h1><span>Tech</span><strong>BRIDGE</strong></h1>
        <h2>Practical technology learning,<br />delivered where professionals work.</h2>
        <p>Short, hands-on programs in AI and emerging technologies—hosted primarily on company campuses and led by industry practitioners.</p>
        <div className="hero-actions"><a className="button" href="#about">Explore the initiative <ArrowIcon direction="down" /></a><a className="button button-outline" href="#events">View the 2027 plan</a></div>
      </div>
      <figure className="hero-media"><img src="/assets/techbridge-workshop-hero.png" alt="A practitioner leads a collaborative technology workshop" /><figcaption>Hands-on workshop · project in progress</figcaption></figure>
    </section>
  );
}

function Stats() {
  const stats = [['20', 'City programs in 2027'], ['2,000', 'Industry professionals'], ['40+', 'Companies engaged'], ['15+', 'Continuing partnerships']];
  return <div className="stats-wrap" aria-label="2027 program targets"><div className="stats">{stats.map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>;
}

function About() {
  const steps = [
    ['01', 'Designed for the workday', 'A focused four-to-six-hour format makes current technical learning accessible without requiring a multi-day conference.'],
    ['02', 'Built around doing', 'Participants bring their laptops, work directly with tools and platforms, and complete a guided project.'],
    ['03', 'Led by practitioners', 'Industry experts guide implementation, connect the work to real-world practice and review the completed project.'],
  ];
  return (
    <section className="section section-light about" id="about">
      <div className="vision-grid">
        <div><SectionLabel>The objective</SectionLabel><h3>Bring practical, industry-relevant technology learning directly into the environments where professionals work.</h3></div>
        <div className="mission"><SectionLabel>Why now</SectionLabel><p>AI and other emerging technologies are reshaping software engineering quickly. Working professionals need shorter, practical learning experiences that fit the workday and move beyond presentation-only formats.</p></div>
      </div>
      <div className="about-grid">
        <div>
          <h2>What is <span>TechBRIDGE?</span></h2>
          <p className="lead">TechBRIDGE Global is a 2027 IEEE Computer Society Industry Engagement initiative designed for industry professionals. It will deliver 20 focused programs across multiple global regions—five each quarter—primarily at company and corporate campuses.</p>
          <div className="steps">{steps.map(([number, title, copy]) => <article className="step" key={number}><span>{number}</span><h4>{title}</h4><p>{copy}</p></article>)}</div>
        </div>
        <aside className="program-includes"><SectionLabel>Each program includes</SectionLabel><ul><li>4–6 hours of focused learning</li><li>Hands-on technical workshop</li><li>Complete guided project</li><li>Industry-practitioner leadership</li><li>Certificate on completion</li></ul><a className="button" href="#request">Discuss a program</a></aside>
      </div>
    </section>
  );
}

function Alignment() {
  const supportingGoals = [
    ['Goal 3', 'Emerging technology training', 'AI, cybersecurity, cloud, robotics and the technologies shaping industry.'],
    ['Goal 4', 'Volunteer leadership', 'Meaningful opportunities for IEEE volunteers to lead and organize programs.'],
    ['Goal 6', 'Global reach', 'Industry professionals engaged across multiple regions through city-based delivery.'],
    ['Goal 7', 'Stronger partnerships', 'Companies, practitioners, researchers and IEEE communities working together.'],
  ];
  return (
    <section className="section section-dark alignment" id="alignment">
      <div className="alignment-intro"><div><SectionLabel>Strategic plan alignment</SectionLabel><h2>Industry value comes first.</h2></div><p>TechBRIDGE passes the upfront strategic hurdle by directly advancing the IEEE Computer Society’s value proposition for industry professionals and organizations.</p></div>
      <article className="primary-goal"><span>Primary goal</span><strong>02</strong><div><h3>Increase the value proposition for industry professionals and organizations.</h3><p>Practical workshops, delivered in industry environments, turn IEEE Computer Society expertise into relevant skills professionals can apply immediately.</p></div></article>
      <div className="supporting-goals">{supportingGoals.map(([goal, title, copy]) => <article key={goal}><span>{goal}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
  );
}

function Footprint() {
  const dots = [[8,48],[13,41],[18,31],[20,65],[27,78],[37,39],[41,57],[48,35],[54,23],[58,44],[62,62],[69,30],[73,48],[78,68],[84,36],[90,56],[95,25],[32,52],[51,51],[87,74]];
  const quarterStats = [['5', 'Programs · Q1'], ['5', 'Programs · Q2'], ['5', 'Programs · Q3'], ['5', 'Programs · Q4'], ['40+', 'IEEE CS volunteers']];
  return (
    <section className="section footprint" id="impact">
      <div className="section-heading-row"><div><SectionLabel>2027 global model</SectionLabel><h2>20 cities · four quarters</h2></div><p className="footprint-note">Five company-hosted programs each quarter</p></div>
      <div className="impact-map" role="img" aria-label="A stylized world map representing 20 planned TechBRIDGE city programs"><svg viewBox="0 0 1000 330" aria-hidden="true"><path className="world-stroke" d="M90 80c82-51 153-45 204 5 48 47 10 84-14 112-29 34-62 26-91 11-39-20-47-77-99-128Zm254-8c61-38 159-50 226-11 54 31 36 64 72 83 49 26 78-4 127 16 47 19 86 55 115 94-72 16-135-3-192-6-62-3-86-25-147-32-78-9-113 20-168-5-49-23-67-99-33-139Z" />{dots.map(([x, y], index) => <circle key={`${x}-${y}`} className={index % 5 === 0 ? 'dot dot-gold' : 'dot'} cx={x * 10} cy={y * 3.1} r={index % 4 === 0 ? 6 : 4} />)}<text x="120" y="255">AMERICAS</text><text x="480" y="100">EUROPE</text><text x="560" y="250">AFRICA</text><text x="760" y="115">ASIA–PACIFIC</text></svg></div>
      <div className="region-stats">{quarterStats.map(([count, label]) => <div key={label}><strong>{count}</strong><span>{label}</span></div>)}</div>
    </section>
  );
}

function Roadmap() {
  const [filter, setFilter] = useState('all');
  const visiblePrograms = useMemo(() => filter === 'all' ? roadmap : roadmap.filter((item) => item.half === filter), [filter]);
  return (
    <section className="section section-light events" id="events">
      <div className="section-heading-row"><div><SectionLabel>Quarterly roadmap</SectionLabel><h2>Five programs, every quarter</h2></div><div className="filter-group" aria-label="Filter the 2027 program roadmap">{[['all', 'Full year'], ['h1', 'H1'], ['h2', 'H2']].map(([value, label]) => <button key={value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)} aria-pressed={filter === value}>{label}</button>)}</div></div>
      <p className="roadmap-note">Cities and host companies will be announced as regional partnerships are confirmed.</p>
      <div className="event-grid">{visiblePrograms.map((item) => <article className="event-card" key={item.quarter}><img src={item.image} alt="" /><div className="event-ticket"><h3>{item.quarter}</h3><p>{item.date}</p><span>{item.state}</span></div><div className="event-body"><h4>{item.title}</h4><p>{item.host}</p><span>{item.target}</span></div></article>)}</div>
    </section>
  );
}

function Experience() {
  const stages = [['01', 'Orientation & setup', 'Goals, tools, environment and the project brief.'], ['02', 'Practitioner-led lab', 'Live implementation with space to test, ask and iterate.'], ['03', 'Guided project build', 'Participants apply the material to a complete working project.'], ['04', 'Demo, review & certificate', 'Project review closes the workshop and confirms completion.']];
  return (
    <section className="section schedule"><div className="center-heading"><SectionLabel>The workshop experience</SectionLabel><h2>Four to six hours. One complete build.</h2></div><div className="timeline">{stages.map(([number, title, copy]) => <article key={number}><div className="timeline-date"><strong>{number}</strong><span>Workshop stage</span></div><span className="timeline-dot" /><div className="timeline-card"><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>
  );
}

function Gallery() {
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (!selected) return undefined;
    const close = (event) => { if (event.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [selected]);
  return (
    <section className="section section-dark gallery" id="gallery">
      <div className="section-heading-row"><div><SectionLabel>Program experience</SectionLabel><h2>Built for participation</h2></div><p>Click any frame to enlarge</p></div>
      <div className="gallery-grid">{galleryItems.map((item) => <button className={item.className || ''} key={item.title} onClick={() => setSelected(item)} aria-label={`Enlarge ${item.title}`}><img src={item.src} alt="" /><span>{item.title}</span></button>)}</div>
      {selected ? <div className="modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close image">×</button><figure onClick={(event) => event.stopPropagation()}><img src={selected.src} alt={selected.title} /><figcaption>{selected.title}</figcaption></figure></div> : null}
    </section>
  );
}

function Outcomes() {
  return <section className="section section-light stories"><SectionLabel>Participant outcomes</SectionLabel><h2>Learning that ends in a result</h2><div className="story-grid">{outcomes.map((outcome) => <article key={outcome.number}><span className="outcome-number">{outcome.number}</span><h3>{outcome.result}</h3><p>{outcome.copy}</p><strong className="outcome-tag">{outcome.tag}</strong></article>)}</div></section>;
}

function Ecosystem() {
  const groups = [['IEEE community', ['Regional chapters', 'Technical communities', 'Young Professionals', 'IEEE WIE', 'Standards community', 'Certification programs']], ['Industry environment', ['Corporate campuses', 'Engineering teams', 'Technical leaders', 'Platform providers', 'Learning & development', 'Innovation labs']]];
  return <section className="section partners"><div className="official-brand"><div><SectionLabel>IEEE Computer Society initiative</SectionLabel><h2>A global professional community behind every program.</h2></div><SocietyMark /></div>{groups.map(([label, items]) => <div className="partner-row" key={label}><h3>{label}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</section>;
}

function DeliveryNetwork() {
  return <section className="section section-light team" id="team"><SectionLabel>Delivery network</SectionLabel><h2>Designed to work together</h2><div className="team-grid">{deliveryNetwork.map(([name, role, initials], index) => <article key={name}><div className={`team-portrait portrait-${(index % 4) + 1}`}><span>{initials}</span></div><div className="team-copy"><h3>{name}</h3><p>{role}</p><a href="#request">Get involved <ArrowIcon /></a></div></article>)}</div></section>;
}

function Involvement() {
  return <section className="section section-dark involvement"><SectionLabel>Get involved</SectionLabel><h2>Five ways into TechBRIDGE</h2><div className="involvement-grid">{involvement.map(([title, copy, action], index) => <article key={title}><strong>0{index + 1}</strong><h3>{title}</h3><p>{copy}</p><a href="#request">{action} <ArrowIcon /></a></article>)}</div></section>;
}

function RequestProgram() {
  const [selectedSupport, setSelectedSupport] = useState(['Corporate hosting']);
  const [submitted, setSubmitted] = useState(false);
  const toggleSupport = (option) => setSelectedSupport((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]);
  const submit = (event) => { event.preventDefault(); setSubmitted(true); };
  return (
    <section className="section request" id="request">
      <div className="request-copy"><SectionLabel>Bring TechBRIDGE to work</SectionLabel><h2>Tell us what your professionals need to build.</h2><p>Share your company, city and technical focus. The TechBRIDGE team can use this information to explore a 2027 host partnership and workshop fit.</p><div className="contact-links"><span>Company campus · 4–6 hours · guided project · completion certificate</span></div></div>
      {submitted ? <div className="success-panel" role="status"><span>✓</span><SectionLabel>Interest received</SectionLabel><h3>Thank you for building the bridge.</h3><p>Your program interest is ready for the next partnership conversation.</p><button className="button button-dark" onClick={() => setSubmitted(false)}>Send another response</button></div> : (
        <form onSubmit={submit}>
          <div className="form-grid"><label>Full name<input name="name" required /></label><label>Work email<input name="email" type="email" required /></label><label>Company / organization<input name="organization" required /></label><label>City / global region<input name="region" required /></label><label>Technology focus<input name="topic" required /></label><label>Expected professionals<input name="attendees" type="number" min="1" required /></label></div>
          <fieldset><legend>Program interests</legend><div className="support-options">{supportOptions.map((option) => <button type="button" key={option} className={selectedSupport.includes(option) ? 'selected' : ''} aria-pressed={selectedSupport.includes(option)} onClick={() => toggleSupport(option)}>{option}</button>)}</div></fieldset>
          <label>Tell us more<textarea name="details" rows="4" required /></label><button className="button button-dark form-submit" type="submit">Register interest</button>
        </form>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer><div className="footer-grid">
      <div><Brand footer /><p>Practical, industry-relevant technology learning delivered directly into the environments where professionals work.</p><SocietyMark footer /></div>
      <div><h3>TechBRIDGE</h3><a href="#about">About the initiative</a><a href="#alignment">Strategic alignment</a><a href="#events">2027 roadmap</a><a href="#gallery">Program experience</a><a href="#impact">Global model</a></div>
      <div><h3>Get involved</h3><a href="#request">Host a program</a><a href="#request">Lead a workshop</a><a href="#request">Volunteer locally</a><a href="#request">Company partnerships</a><a href="#request">Register interest</a></div>
      <div><h3>IEEE Computer Society</h3><a href="https://www.computer.org/">computer.org</a><a href="https://www.computer.org/membership">Membership</a><a href="https://www.computer.org/education">Education &amp; certification</a><a href="https://www.computer.org/corporate-programs">Corporate partnerships</a><a href="https://www.computer.org/volunteering">Volunteer</a></div>
    </div><div className="footer-bottom"><span>© 2027 IEEE Computer Society. All rights reserved.</span><span>Privacy&nbsp;&nbsp;&nbsp; Terms&nbsp;&nbsp;&nbsp; Accessibility</span></div></footer>
  );
}

export default function App() {
  return <><Header /><main><Hero /><Stats /><About /><Alignment /><Footprint /><Roadmap /><Experience /><Gallery /><Outcomes /><Ecosystem /><DeliveryNetwork /><Involvement /><RequestProgram /></main><Footer /></>;
}
