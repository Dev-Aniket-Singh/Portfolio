import { FormEvent, KeyboardEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BrainCircuit, Braces,
  Check, ChevronRight, Circle, Code2, Cpu, Database, ExternalLink, Github,
  GitBranch, GraduationCap, Layers, Linkedin, Mail, Menu, Network, Send,
  ShoppingBag, Terminal, WalletCards, X, Zap,
} from 'lucide-react'

type Project = {
  id: string
  number: string
  title: string
  stack: string
  description: string
  details: string
  tags: string[]
  kind: 'shop' | 'finance'
}

const projects: Project[] = [
  {
    id: 'shopping', number: '01', title: 'Online Shopping Management System',
    stack: 'PYTHON  /  MYSQL', kind: 'shop',
    description: 'A foundational e-commerce system for managing customers, products, purchases, and feedback.',
    details: 'A practical exercise in turning everyday shopping workflows into a structured application. The system connects Python application logic to a MySQL database and covers registration, login, browsing, purchasing, order management, discounts, and customer feedback.',
    tags: ['Python', 'MySQL', 'Database design', 'CRUD operations', 'Structured data'],
  },
  {
    id: 'finance', number: '02', title: 'Personal Finance & Investment System',
    stack: 'PYTHON  /  OOP  /  YFINANCE', kind: 'finance',
    description: 'An OOP-based finance application combining stock analysis, portfolio tracking, and expense management.',
    details: 'A personal finance toolkit that brings market research and day-to-day money tracking into one interface. It includes historical stock analysis, portfolio valuation, trade history, multi-currency support, expense categories, recurring costs, and cash-flow views. It does not execute trades or provide financial advice.',
    tags: ['Python', 'Object-oriented design', 'yfinance', 'Matplotlib', 'Portfolio tracking', 'Expense analytics'],
  },
]

const navItems = [
  ['HOME', 'home'], ['ABOUT', 'about'], ['PROJECTS', 'projects'], ['SKILLS', 'skills'], ['JOURNEY', 'journey'], ['CONTACT', 'contact'],
]

function useTyping(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[wordIndex]
    const finished = text === word
    const empty = text.length === 0
    const delay = finished ? 1300 : deleting && empty ? 250 : deleting ? 36 : 76
    const timer = window.setTimeout(() => {
      if (!deleting && !finished) setText(word.slice(0, text.length + 1))
      else if (deleting && !empty) setText(word.slice(0, text.length - 1))
      else if (finished) setDeleting(true)
      else { setDeleting(false); setWordIndex((i) => (i + 1) % words.length) }
    }, delay)
    return () => window.clearTimeout(timer)
  }, [deleting, text, wordIndex, words])
  return text
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: reduce ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    navItems.forEach(([, id]) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActive(id) }, { rootMargin: '-36% 0px -56% 0px' })
      observer.observe(el); observers.push(observer)
    })
    return () => observers.forEach((observer) => observer.disconnect())
  }, [])
  useEffect(() => { document.body.classList.toggle('menu-open', menuOpen); return () => document.body.classList.remove('menu-open') }, [menuOpen])
  return <header className="topbar">
    <a href="#home" className="brand" onClick={() => setMenuOpen(false)} aria-label="Aniket Singh, home"><span className="brand-mark">AS</span><span className="brand-id">// 01</span></a>
    <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
      {navItems.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      <a className="mobile-opportunity" href="#contact" onClick={() => setMenuOpen(false)}><span className="status-dot" /> OPEN TO OPPORTUNITIES</a>
    </nav>
    <a className="opportunity" href="#contact"><span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES</a>
    <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
  </header>
}

function Hero() {
  const typed = useTyping(['Python Developer', 'C++ Learner', 'DSA Enthusiast', 'AI Explorer', 'GPU Programming Aspirant', 'Hackathon Builder'])
  const reduce = useReducedMotion()
  return <section id="home" className="hero section-wrap">
    <div className="hero-copy">
      <div className="eyebrow"><span className="pulse-dot" /> SYSTEM ONLINE <span className="eyebrow-divider">/</span> BENNETT UNIVERSITY</div>
      <h1><span>ANIKET</span><span className="name-second">SINGH<span className="name-period">.</span></span></h1>
      <p className="hero-subtitle">Computer Science student<br /><span>building toward GPU engineering.</span></p>
      <div className="typing-line"><span className="typing-prefix">CURRENT MODE&nbsp; /&nbsp;</span><span className="typing-text">{typed}</span><span className="caret">▍</span></div>
      <p className="hero-description">Building a strong foundation in programming, problem solving, and software projects — while exploring AI, GPU programming, and what happens beneath the abstraction.</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#projects">VIEW PROJECTS <ArrowDownRight size={15} /></a>
        <a className="button button-quiet" href="https://github.com/Dev-Aniket-Singh" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={15} /></a>
        <a className="button button-text" href="#contact">CONNECT <ArrowRight size={14} /></a>
      </div>
      <div className="hero-meta"><span><span className="meta-line" /> GREATER NOIDA, INDIA</span><span>20°21' N&nbsp; 85°04' E</span></div>
    </div>
    <div className="hero-visual" aria-label="Animated system core visualization">
      <div className="visual-caption visual-caption-top"><span>CORE / 0001</span><span className="caption-live"><span className="pulse-dot" /> LIVE</span></div>
      <div className="core-stage">
        <div className="core-grid" />
        <div className="core-orbit orbit-one" /><div className="core-orbit orbit-two" /><div className="core-orbit orbit-three" />
        <div className="core-center"><div className="core-glow" /><Cpu size={42} strokeWidth={1.05} /><span>AS</span></div>
        <div className="core-crosshair crosshair-h" /><div className="core-crosshair crosshair-v" />
        <div className="circuit circuit-a" /><div className="circuit circuit-b" /><div className="circuit circuit-c" /><div className="circuit circuit-d" />
        <motion.div className="data-particle particle-a" animate={reduce ? {} : { y: [0, -9, 0], opacity: [.45, 1, .45] }} transition={{ duration: 3.4, repeat: Infinity }} />
        <motion.div className="data-particle particle-b" animate={reduce ? {} : { y: [0, 8, 0], opacity: [.35, .9, .35] }} transition={{ duration: 2.8, repeat: Infinity }} />
      </div>
      <div className="system-chip chip-cpu"><span className="chip-icon"><Cpu size={15} /></span><span><b>CPU</b><small>HOST / READY</small></span><span className="chip-led" /></div>
      <div className="system-chip chip-gpu"><span className="chip-icon cyan-icon"><Zap size={15} /></span><span><b>GPU</b><small>TARGET / FUTURE</small></span><span className="chip-led led-violet" /></div>
      <div className="system-chip chip-python"><span className="chip-icon"><Braces size={15} /></span><span><b>PYTHON</b><small>LEARNING / ACTIVE</small></span></div>
      <div className="visual-index">FIG. 01 <span>—</span> COMPUTE CORE</div>
    </div>
    <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={15} /></a>
    <div className="hero-corner">PORTFOLIO / 2026<br />BUILD 001.04</div>
  </section>
}

function SectionHeading({ index, title, right }: { index: string; title: string; right?: string }) {
  return <div className="section-heading"><div><p className="section-index">{index} <span>/</span> {title}</p><h2>{title}</h2></div>{right && <span className="heading-aside">{right}</span>}</div>
}

function About() {
  const stats = [['84.6%', 'CLASS XII'], ['90/100', 'COMPUTER SCIENCE'], ['2030', 'EXPECTED GRADUATION'], ['∞', 'THINGS TO BUILD']]
  return <section id="about" className="section-wrap content-section about-section">
    <Reveal><SectionHeading index="01" title="About me" right="A LITTLE CONTEXT, A LOT OF CURIOSITY." /></Reveal>
    <div className="about-grid">
      <Reveal className="about-intro"><span className="micro-label"><Circle size={8} /> PROFILE / 001</span><p className="about-statement">I'm Aniket Singh, a Computer Science undergraduate at <span>Bennett University.</span></p><p className="body-copy">I'm building my foundation in programming, problem solving, C++, Python, and Data Structures & Algorithms while exploring AI and GPU programming. I learn by making things, getting stuck, and figuring out what's underneath.</p><a className="inline-link" href="#journey">FOLLOW THE JOURNEY <ArrowRight size={14} /></a></Reveal>
      <Reveal className="stats-panel" delay={.08}><div className="panel-topline"><span>QUICK READOUT</span><span>01—04</span></div><div className="stats-grid">{stats.map(([value, label], i) => <div className="stat-cell" key={label}><span className={`stat-value ${i === 3 ? 'stat-infinity' : ''}`}>{value}</span><span className="stat-label">{label}</span><span className="stat-num">0{i + 1}</span></div>)}</div></Reveal>
    </div>
    <Reveal className="focus-console" delay={.1}><div className="console-header"><span className="console-dots"><i /><i /><i /></span><span>CURRENT_FOCUS — zsh</span><span className="console-live"><span className="pulse-dot" /> RUNNING</span></div><div className="focus-lines"><span><i>01</i><b>&gt;</b> learning <em> C++</em></span><span><i>02</i><b>&gt;</b> solving <em> DSA problems</em></span><span><i>03</i><b>&gt;</b> building <em> projects</em></span><span><i>04</i><b>&gt;</b> exploring <em> GPU programming</em></span><span><i>05</i><b>&gt;</b> participating in <em> hackathons</em></span></div><div className="console-foot">PROCESS STATE <span>● ACTIVE</span><span>UPTIME: EVERY DAY</span></div></Reveal>
  </section>
}

type Skill = { name: string; level: string; description: string }
const skillGroups: { icon: typeof Code2; category: string; id: string; items: Skill[] }[] = [
  { icon: Code2, category: 'PROGRAMMING', id: '01', items: [
    { name: 'Python', level: 'PROJECT EXPERIENCE', description: 'Used to build coursework and personal projects, including a finance toolkit.' },
    { name: 'C++', level: 'LEARNING', description: 'Building language fundamentals and exploring systems-level programming.' },
    { name: 'Programming Fundamentals', level: 'FOUNDATIONAL', description: 'Practising core concepts through coursework and hands-on exercises.' },
  ] },
  { icon: Database, category: 'DATA', id: '02', items: [
    { name: 'MySQL', level: 'PROJECT EXPERIENCE', description: 'Applied relational database concepts to an online shopping management system.' },
    { name: 'SQL', level: 'FOUNDATIONAL', description: 'Working with structured queries and relational data.' },
    { name: 'Structured Data', level: 'FOUNDATIONAL', description: 'Modelling information for useful, maintainable applications.' },
  ] },
  { icon: BrainCircuit, category: 'COMPUTER SCIENCE', id: '03', items: [
    { name: 'Data Structures & Algorithms', level: 'LEARNING', description: 'Building problem-solving fluency one concept and problem at a time.' },
    { name: 'Problem Solving', level: 'IN PROGRESS', description: 'Breaking bigger problems into smaller, testable steps.' },
    { name: 'Object-Oriented Programming', level: 'PROJECT EXPERIENCE', description: 'Organising application logic into reusable classes and components.' },
  ] },
  { icon: Layers, category: 'TOOLS / LIBRARIES', id: '04', items: [
    { name: 'Git / GitHub', level: 'FOUNDATIONAL', description: 'Using version control and GitHub to manage and share code.' },
    { name: 'Matplotlib', level: 'PROJECT EXPERIENCE', description: 'Creating charts and visual analysis in the finance project.' },
    { name: 'yfinance', level: 'PROJECT EXPERIENCE', description: 'Fetching market data for historical analysis and portfolio views.' },
  ] },
]

function TechStack() {
  const [selected, setSelected] = useState('Python')
  const selectedGroup = skillGroups.find((group) => group.items.some((item) => item.name === selected))
  return <section id="skills" className="section-wrap content-section tech-section">
    <Reveal><SectionHeading index="02" title="Tech stack" right="TOOLS IN THE WORKBENCH." /></Reveal>
    <Reveal className="skills-intro"><p>Skills are a work in progress. Here’s what’s on the bench — and where each tool is in the learning curve.</p><span className="skill-legend"><i className="legend-cyan" /> IN USE <i /> LEARNING</span></Reveal>
    <div className="skills-grid">{skillGroups.map((group, groupIndex) => { const Icon = group.icon; return <Reveal key={group.id} className="skill-group" delay={groupIndex * .055}><div className="skill-group-head"><span className="skill-group-icon"><Icon size={17} strokeWidth={1.6} /></span><span className="skill-group-name">{group.category}</span><span className="skill-group-id">{group.id}</span></div><div className="skill-list">{group.items.map((item) => <button className={`skill-item ${selected === item.name ? 'selected' : ''}`} key={item.name} onMouseEnter={() => setSelected(item.name)} onFocus={() => setSelected(item.name)} onClick={() => setSelected(item.name)} aria-pressed={selected === item.name}><span>{item.name}</span><small>{item.level}</small><ChevronRight size={14} /></button>)}</div></Reveal> })}</div>
    <AnimatePresence mode="wait"><motion.div key={selected} className="skill-detail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .22 }}><span className="detail-tag"><span className="status-dot" /> {selectedGroup?.category} / {selected}</span><p>{selectedGroup?.items.find((item) => item.name === selected)?.description}</p><span className="detail-related">RELATED WORK&nbsp; → &nbsp;{selected === 'MySQL' ? 'ONLINE SHOPPING SYSTEM' : selected === 'Python' || selected === 'Matplotlib' || selected === 'yfinance' ? 'PERSONAL FINANCE SYSTEM' : 'IN PROGRESS'}</span></motion.div></AnimatePresence>
  </section>
}

function ShoppingPreview() {
  return <div className="project-art shop-art"><div className="art-top"><span>SHOP_CORE / ARCHITECTURE</span><span>01—04</span></div><div className="shop-flow"><div className="flow-node flow-user"><ShoppingBag size={17} /><span>USER</span></div><div className="flow-connector"><i /><i /><i /></div><div className="flow-node flow-app"><Code2 size={17} /><span>PYTHON APP</span></div><div className="flow-connector"><i /><i /><i /></div><div className="flow-node flow-db"><Database size={17} /><span>MYSQL DB</span></div></div><div className="db-tables"><span>USERS</span><span>PRODUCTS</span><span>ORDERS</span><span>FEEDBACK</span></div><div className="art-footer"><span><i /> DATA FLOW</span><span>REGISTER → BROWSE → PURCHASE</span></div></div>
}

function FinancePreview() {
  return <div className="project-art finance-art"><div className="art-top"><span>PORTFOLIO / OVERVIEW</span><span><i className="tiny-green" /> LOCAL DATA</span></div><div className="finance-metrics"><div><small>PORTFOLIO VALUE</small><b>₹—<span>••••</span></b></div><div><small>MARKET DATA</small><b className="market-neutral">NOT CONNECTED</b></div><div><small>HISTORY</small><b>1Y <span className="period-tag">VIEW</span></b></div></div><div className="chart-wrap"><div className="chart-axis"><span>+12%</span><span>+06%</span><span>0%</span><span>−06%</span></div><svg viewBox="0 0 440 118" preserveAspectRatio="none" role="img" aria-label="Illustrative portfolio chart"><defs><linearGradient id="chartArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#57dded" stopOpacity=".2" /><stop offset="100%" stopColor="#57dded" stopOpacity="0" /></linearGradient></defs><path d="M0 88 C26 85 24 72 51 78 S87 47 111 58 S144 66 170 48 S204 61 231 39 S262 50 289 32 S325 47 346 27 S376 38 400 20 S424 27 440 9 L440 118 L0 118Z" fill="url(#chartArea)" /><path d="M0 88 C26 85 24 72 51 78 S87 47 111 58 S144 66 170 48 S204 61 231 39 S262 50 289 32 S325 47 346 27 S376 38 400 20 S424 27 440 9" fill="none" stroke="#69e5ef" strokeWidth="1.7" vectorEffect="non-scaling-stroke" /></svg><div className="chart-x"><span>JUN</span><span>AUG</span><span>OCT</span><span>DEC</span><span>FEB</span><span>NOW</span></div></div><div className="finance-bottom"><span><i className="tiny-cyan" /> PORTFOLIO TRACKING</span><span><i className="tiny-violet" /> EXPENSE ANALYTICS</span><span>•••</span></div></div>
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const closeOnEscape = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', closeOnEscape)
    document.body.classList.add('modal-open')
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('modal-open') }
  }, [project, onClose])
  return <AnimatePresence>{project && <motion.div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .28 }}>
      <div className="modal-top"><span><span className="pulse-dot" /> PROJECT_FILE / {project.number}</span><button aria-label="Close project details" onClick={onClose}><X size={18} /></button></div>
      <div className="modal-body"><span className="micro-label">{project.stack}</span><h2 id="modal-title">{project.title}</h2><p className="modal-description">{project.details}</p><div className="modal-visual">{project.kind === 'shop' ? <ShoppingPreview /> : <FinancePreview />}</div><div className="modal-columns"><div><h3>BUILT WITH</h3><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div><h3>DEVELOPMENT NOTES</h3><p>Built to practise practical software design, data flow, and core programming concepts. Project details reflect the current implementation.</p></div></div><a className="button button-primary modal-code" href="https://github.com/Dev-Aniket-Singh?tab=repositories" target="_blank" rel="noreferrer">BROWSE REPOSITORIES <ExternalLink size={14} /></a></div>
    </motion.section>
  </motion.div>}</AnimatePresence>
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const close = () => setSelected(null)
  return <section id="projects" className="section-wrap content-section projects-section">
    <Reveal><SectionHeading index="03" title="Project lab" right="SMALL SYSTEMS. REAL LEARNING." /></Reveal>
    <Reveal className="projects-lead"><p>Things I’ve built to learn by doing. Open a project to see how it fits together.</p><span>2 PROJECTS <span className="lead-divider">/</span> 2025—26</span></Reveal>
    <div className="project-list">{projects.map((project, index) => <Reveal key={project.id} className={`project-card project-${project.kind}`} delay={index * .07}><div className="project-card-header"><span><i className="project-signal" /> PROJECT / {project.number}</span><span>{project.stack}</span></div>{project.kind === 'shop' ? <ShoppingPreview /> : <FinancePreview />}<div className="project-info"><div className="project-title-block"><h3>{project.title}</h3><p>{project.description}</p></div><div className="project-controls"><button className="project-open" onClick={() => setSelected(project)}>OPEN PROJECT <ArrowUpRight size={14} /></button><a href="https://github.com/Dev-Aniket-Singh?tab=repositories" target="_blank" rel="noreferrer" className="code-link" aria-label={`Browse code repositories for ${project.title}`}><Github size={16} /> CODE</a></div></div><div className="project-card-foot"><div className="tag-list">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><span className="project-foot-index">0{index + 1} / 02</span></div></Reveal>)}</div>
    <ProjectModal project={selected} onClose={close} />
  </section>
}

function Journey() {
  const entries = [
    { year: '2026', status: 'INITIALIZED', title: 'Computer Science Undergraduate', place: 'Bennett University', icon: GraduationCap, text: 'Starting the journey with a broad foundation in computer science and software development.' },
    { year: 'NOW', status: 'IN PROGRESS', title: 'Fundamentals in motion', place: 'C++ · DSA · Python · AI concepts', icon: GitBranch, text: 'Learning by building projects, solving problems, and participating in hackathons.' },
    { year: 'EXPLORING', status: 'CURIOSITY BRANCH', title: 'Closer to the hardware', place: 'GPU programming · CUDA · HPC', icon: Cpu, text: 'Following the path from software abstractions down to parallel compute and AI/ML.' },
    { year: 'NEXT', status: 'NEXT OBJECTIVE', title: 'Build technically advanced systems', place: 'Software & GPU engineering', icon: Zap, text: 'Keep learning, keep shipping, and explore opportunities in GPU and software engineering.' },
  ]
  return <section id="journey" className="section-wrap content-section journey-section"><Reveal><SectionHeading index="04" title="Development log" right="A COMMIT HISTORY, STILL IN PROGRESS." /></Reveal><div className="timeline">{entries.map((entry, index) => { const Icon = entry.icon; return <Reveal key={entry.year} className="timeline-entry" delay={index * .06}><div className="timeline-commit"><span className="commit-dot" /><span className="commit-line" /></div><span className="timeline-year">{entry.year}</span><div className="timeline-card"><div className="timeline-card-top"><span className="timeline-status">{entry.status}</span><span className="commit-hash">{['a91c2f0', 'd03e7a1', 'f61b9c4', 'NEXT →'][index]}</span></div><div className="timeline-title"><Icon size={18} /><h3>{entry.title}</h3></div><span className="timeline-place">{entry.place}</span><p>{entry.text}</p></div></Reveal> })}</div></section>
}

function BuildActivity() {
  const squares = useMemo(() => Array.from({ length: 84 }, (_, i) => (i * 13 + Math.floor(i / 5) * 7) % 5), [])
  return <section className="section-wrap content-section activity-section"><Reveal><SectionHeading index="05" title="Build activity" right="THE WORK ADDS UP." /></Reveal><div className="activity-grid"><Reveal className="activity-intro"><span className="micro-label"><Activity size={13} /> CONTRIBUTION STREAM</span><h3>Consistent curiosity.<br /><span>More commits to come.</span></h3><p>My GitHub is the home for project code and experiments. Live contribution data isn’t connected here, so no activity counts are shown.</p><a className="button button-primary" href="https://github.com/Dev-Aniket-Singh" target="_blank" rel="noreferrer"><Github size={15} /> OPEN GITHUB <ArrowUpRight size={14} /></a></Reveal><Reveal className="github-panel" delay={.08}><div className="github-panel-head"><div><Github size={16} /><span>github.com/Dev-Aniket-Singh</span></div><span className="api-status"><i /> API NOT CONNECTED</span></div><div className="github-placeholder"><div className="placeholder-title"><span>ACTIVITY GRID</span><span>PLACEHOLDER / NO LIVE COUNTS</span></div><div className="heatmap-wrap"><div className="heatmap-months"><span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span></div><div className="heatmap" aria-label="Placeholder grid; contribution data is not connected">{squares.map((level, index) => <span key={index} className={level === 0 ? '' : 'placeholder-square'} />)}</div></div><div className="github-panel-foot"><span><i className="legend-square" /> ACTIVITY PREVIEW DISABLED</span><span>CONNECT PROFILE TO LOAD DATA <ArrowRight size={12} /></span></div></div><div className="repo-row"><div className="repo-icon"><WalletCards size={16} /></div><div><b>Personal Finance & Investment System</b><small>Python · OOP · Analytics</small></div><span>PROJECT</span></div><div className="repo-row"><div className="repo-icon repo-icon-violet"><ShoppingBag size={16} /></div><div><b>Online Shopping Management System</b><small>Python · MySQL · CRUD</small></div><span>PROJECT</span></div></Reveal></div></section>
}

function GpuSection() {
  const [activeCore, setActiveCore] = useState<number | null>(null)
  const steps = ['CPU', 'HOST CODE', 'CUDA', 'GPU', 'PARALLEL THREADS', 'HIGH PERFORMANCE COMPUTING']
  return <section className="section-wrap content-section gpu-section"><Reveal><SectionHeading index="06" title="Next compute target" right="THE SIGNATURE INTEREST." /></Reveal><div className="gpu-layout"><Reveal className="gpu-copy"><span className="micro-label"><Cpu size={14} /> PARALLEL COMPUTE / EXPLORATION</span><h3>Software meets<br /><span>the silicon.</span></h3><p>I'm particularly interested in understanding how software interacts with hardware — and exploring GPU programming, CUDA, parallel computing, and performance-oriented systems.</p><p className="gpu-caveat">This is a learning target, not a claim of CUDA experience.</p><a className="inline-link" href="#terminal">EXPLORE THE WORKFLOW <ArrowRight size={14} /></a></Reveal><Reveal className="gpu-diagram" delay={.08}><div className="gpu-diagram-head"><span>COMPUTE PIPELINE</span><span>FIG. 06 / CONCEPTUAL</span></div><div className="pipeline">{steps.map((step, index) => <div className="pipeline-step" key={step}><div className={`pipeline-node ${index === 3 ? 'gpu-node' : ''}`}><span className="pipeline-index">0{index + 1}</span><b>{step}</b>{index === 3 && <div className="gpu-cores" onMouseLeave={() => setActiveCore(null)}>{Array.from({ length: 24 }, (_, core) => <button key={core} aria-label={`Parallel core ${core + 1}`} className={activeCore === core ? 'core-active' : ''} onMouseEnter={() => setActiveCore(core)} onFocus={() => setActiveCore(core)} />)}</div>}</div>{index < steps.length - 1 && <div className="pipeline-connector"><span /><i>↓</i></div>}</div>)}</div><div className="gpu-diagram-foot"><span><i className="tiny-cyan" /> CONCEPTUAL LEARNING PATH</span><span>{activeCore === null ? 'HOVER CORES TO ACTIVATE' : `THREAD BLOCK / ${String(activeCore + 1).padStart(2, '0')}`}</span></div></Reveal></div></section>
}

type TerminalLine = { kind: 'command' | 'output' | 'error' | 'welcome'; text: string }
function TerminalSection() {
  const [lines, setLines] = useState<TerminalLine[]>([{ kind: 'welcome', text: 'Aniket Singh · Interactive portfolio terminal. Type “help” to see what’s available.' }])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const outputByCommand: Record<string, string[]> = {
    help: ['AVAILABLE COMMANDS', 'about      — a quick introduction', 'projects   — current project files', 'skills     — tools in the workbench', 'github     — open GitHub profile', 'contact    — ways to get in touch', 'clear      — clear this session'],
    about: ['Aniket Singh · Computer Science undergraduate at Bennett University.', 'Building fundamentals in C++, Python, DSA, AI, and software engineering.'],
    projects: ['Loading project database...', '[01] Online Shopping Management System', '[02] Personal Finance & Investment System'],
    skills: ['Python · C++ · MySQL · SQL · Git · Matplotlib · yfinance', 'Status: learning, foundational, or project experience. No fake levels.'],
    contact: ['Email: aniketsingh.dev@gmail.com', 'LinkedIn: linkedin.com/in/aniket-singh-187583424'],
  }
  const runCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const command = input.trim().toLowerCase()
    if (!command) return
    if (command === 'clear') { setLines([]); setInput(''); return }
    if (command === 'github') { setLines((current) => [...current, { kind: 'command', text: command }, { kind: 'output', text: 'Opening github.com/Dev-Aniket-Singh' }]); window.open('https://github.com/Dev-Aniket-Singh', '_blank', 'noopener,noreferrer'); setInput(''); return }
    const result = outputByCommand[command]
    setLines((current) => [...current, { kind: 'command', text: command }, ...(result ? result.map((text) => ({ kind: 'output' as const, text })) : [{ kind: 'error' as const, text: `command not found: ${command}. Type “help” to see available commands.` }])])
    if (command === 'contact') window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300)
    if (command === 'projects') window.setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 300)
    setInput('')
  }
  const onTerminalKey = (event: KeyboardEvent<HTMLDivElement>) => { if (event.key === '/' && document.activeElement !== inputRef.current) { event.preventDefault(); inputRef.current?.focus() } }
  return <section id="terminal" className="section-wrap content-section terminal-section" onKeyDown={onTerminalKey}><Reveal><SectionHeading index="07" title="A small terminal" right="YOUR TURN. TYPE HELP." /></Reveal><Reveal className="terminal-window"><div className="terminal-titlebar"><div className="console-dots"><i /><i /><i /></div><span>ANIKET@PORTFOLIO:~$</span><span className="terminal-title-right">INTERACTIVE SHELL <Terminal size={13} /></span></div><div className="terminal-output" role="log" aria-live="polite">{lines.map((line, index) => <div className={`terminal-line terminal-${line.kind}`} key={`${line.text}-${index}`}>{line.kind === 'command' ? <><b>aniket@portfolio:~$</b> {line.text}</> : line.kind === 'output' ? <><i>›</i> {line.text}</> : line.kind === 'error' ? <><i>×</i> {line.text}</> : <><i>↳</i> {line.text}</>}</div>)}</div><form className="terminal-input-row" onSubmit={runCommand}><label htmlFor="terminal-command"><span>aniket@portfolio:~$</span></label><input ref={inputRef} id="terminal-command" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" spellCheck="false" aria-label="Terminal command" placeholder="type a command…" /><button type="submit" aria-label="Run command"><ArrowRight size={16} /></button></form><div className="terminal-hints"><span>TRY</span>{['help', 'projects', 'skills', 'contact', 'clear'].map((command) => <button key={command} onClick={() => { setInput(command); inputRef.current?.focus() }}>{command}</button>)}</div></Reveal></section>
}

function Contact() {
  const [sent, setSent] = useState(false)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '')
    const email = String(form.get('email') ?? '')
    const message = String(form.get('message') ?? '')
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)
    setSent(true)
    window.location.href = `mailto:aniketsingh.dev@gmail.com?subject=${subject}&body=${body}`
  }
  return <section id="contact" className="section-wrap content-section contact-section"><Reveal><SectionHeading index="08" title="Establish connection" right="GOOD THINGS START WITH A MESSAGE." /></Reveal><div className="contact-layout"><Reveal className="contact-copy"><span className="micro-label"><Network size={14} /> OPEN CHANNELS</span><h3>Have an interesting project, hackathon idea, collaboration, or technical opportunity?</h3><p>I'm always glad to hear from people building something thoughtful.</p><div className="contact-links"><a href="mailto:aniketsingh.dev@gmail.com"><span className="contact-link-icon"><Mail size={16} /></span><span><small>EMAIL</small>aniketsingh.dev@gmail.com</span><ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/aniket-singh-187583424" target="_blank" rel="noreferrer"><span className="contact-link-icon"><Linkedin size={16} /></span><span><small>LINKEDIN</small>linkedin.com/in/aniket-singh-187583424</span><ArrowUpRight size={14} /></a><a href="https://github.com/Dev-Aniket-Singh" target="_blank" rel="noreferrer"><span className="contact-link-icon"><Github size={16} /></span><span><small>GITHUB</small>github.com/Dev-Aniket-Singh</span><ArrowUpRight size={14} /></a></div></Reveal><Reveal className="contact-form-card" delay={.08}><div className="contact-form-head"><span><Send size={14} /> TRANSMIT A MESSAGE</span><span>ENCRYPTION: FRIENDLY</span></div><form onSubmit={handleSubmit}><label htmlFor="contact-name">YOUR NAME<input id="contact-name" name="name" placeholder="How should I address you?" required /></label><label htmlFor="contact-email">EMAIL ADDRESS<input id="contact-email" name="email" type="email" placeholder="you@example.com" required /></label><label htmlFor="contact-message">MESSAGE<textarea id="contact-message" name="message" rows={4} placeholder="Tell me what you're thinking about…" required /></label><div className="form-bottom"><span>{sent ? <><Check size={13} /> OPENING YOUR EMAIL APP…</> : 'A MAIL APP WILL OPEN TO SEND THIS MESSAGE.'}</span><button className="button button-primary" type="submit">TRANSMIT MESSAGE <ArrowUpRight size={14} /></button></div></form></Reveal></div></section>
}

function Footer() {
  return <footer className="site-footer section-wrap"><a href="#home" className="brand footer-brand"><span className="brand-mark">AS</span><span className="brand-id">// 01</span></a><span>ANIKET SINGH <i>//</i> 2026</span><span>BUILT WITH CURIOSITY + CODE</span><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={13} /></a><span className="footer-status"><span className="pulse-dot" /> SYSTEM STATUS: ONLINE</span></footer>
}

export default function App() {
  return <div className="site-shell"><div className="site-grid" aria-hidden="true" /><Navbar /><main><Hero /><About /><TechStack /><Projects /><Journey /><BuildActivity /><GpuSection /><TerminalSection /><Contact /></main><Footer /></div>
}
