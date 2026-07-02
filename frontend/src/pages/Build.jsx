import { Link } from 'react-router-dom'
import ProcessSteps from '../components/ProcessSteps.jsx'
import StatBand from '../components/StatBand.jsx'
import CrossSell from '../components/CrossSell.jsx'
import Reveal from '../components/Reveal.jsx'
import CaseCard from '../components/CaseCard.jsx'
import { caseStudies } from '../data/caseStudies.js'
import './shared.css'
import '../components/WorkTeaser.css'

const services = [
  { name: 'Web apps', desc: 'Fast, modern web products — from marketing site to full SaaS.' },
  { name: 'Mobile apps', desc: 'iOS and Android, native-grade, shipped to the stores.' },
  { name: 'ML models', desc: 'Trained, evaluated and deployed — wired into a real product.' },
  { name: 'AI / deep learning', desc: 'LLM features, vision and deep nets — production-ready.' },
]

const steps = [
  { label: 'Scope', body: 'What to build — and what to skip.' },
  { label: 'Design', body: 'You see it before we code it.' },
  { label: 'Build', body: 'Shipped in slices, you watch it come alive.' },
  { label: 'Ship', body: 'Live, in real hands — not a demo on a shelf.' },
]

const stats = [
  { value: 'One senior team', label: 'no juniors, no handoffs, end to end' },
  { value: 'Built in slices', label: 'you watch it come alive, not a reveal at the end' },
  { value: 'Ready to hand off', label: 'we can keep running what we build — your call' },
]

// Illustrative — not case studies. No status pill, no invented metric (CaseCard
// enforces that via variant="example").
const examples = [
  {
    kind: 'chart',
    tone: 'build',
    tags: ['build'],
    title: 'Fintech-style payments product',
    blurb:
      'The kind of build we take on — a regulated product, real transactions, live users, from a blank repo to production.',
  },
  {
    kind: 'list',
    tone: 'build',
    tags: ['build'],
    title: 'Compliance-first product',
    blurb: 'Healthcare, fintech, anything regulated — we build audit-ready from the first commit.',
  },
]

export default function Build() {
  return (
    <>
      <section className="phero phero--split phero--build">
        <div className="wrap phero__inner">
          <Reveal as="div" className="phero__copy stagger" variant="none">
            <span className="eyebrow eyebrow--build">What we do</span>
            <span className="tag tag--build">Build</span>
            <h1 className="phero__title">
              Zero to launch,
              <br />
              end to end.
            </h1>
            <p className="phero__lede">You have an idea. We have the team.</p>
            <p className="phero__body">
              We take founders from a blank repo to a live product — web, mobile,
              ML and AI — with one senior team that owns the whole thing.
            </p>
            <Link className="btn btn--build" to="/contact?intent=build">
              Start a build →
            </Link>
          </Reveal>

          <Reveal as="div" className="phero__visual" variant="right" aria-hidden="true">
            <div className="pvis__ghost pvis__ghost--build" />
            <div className="bvis">
              <div className="pvis__top">
                <span className="tag tag--build">Build</span>
                <span className="pvis__live pvis__live--build">
                  <span className="pvis__livedot pvis__livedot--build" />
                  assembling
                </span>
              </div>
              <div className="bvis__slices">
                <div className="bslice bslice--bar">
                  <span className="bslice__sq" />
                  <span className="bslice__ln" />
                  <span className="bslice__tag">UI</span>
                </div>
                <div className="bslice bslice--pair">
                  <span />
                  <span />
                </div>
                <div className="bslice bslice--prog">
                  <div className="bslice__progrow">
                    <span>ML model</span>
                  </div>
                  <div className="bslice__track">
                    <div className="bslice__fill" style={{ '--w': '72%' }} />
                  </div>
                </div>
                <div className="bslice bslice--ghost">+ ship &amp; launch</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="svc" style={{ '--accent': 'var(--build)' }}>
        <div className="wrap">
          <Reveal as="h2" className="svc__head">What we build.</Reveal>
          <Reveal as="p" className="svc__sub" delay={80}>
            one team for the whole product — front to model
          </Reveal>
          <div className="svc__grid">
            {services.map((s, i) => (
              <Reveal as="div" className="svc__card" key={s.name} delay={i * 90}>
                <span className="svc__icon" aria-hidden="true" />
                <div>
                  <p className="svc__name">{s.name}</p>
                  <p className="svc__desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps
        accent="var(--build)"
        title="How we build."
        sub="a clear path from rough idea to something real and live"
        steps={steps}
      />

      <StatBand accent="var(--build)" bg="var(--build-bg)" stats={stats} />

      <section className="pteaser">
        <div className="wrap">
          <Reveal as="div" className="pteaser__head">
            <div>
              <h2 className="svc__head" style={{ marginBottom: '6px' }}>
                Built and live right now.
              </h2>
              <p className="svc__sub" style={{ marginBottom: 0 }}>
                real products, in real hands
              </p>
            </div>
            <Link className="pteaser__all" to="/work">
              See all work →
            </Link>
          </Reveal>
          <div className="pteaser__grid">
            {caseStudies.map((c, i) => (
              <CaseCard item={c} key={c.slug} variant="case" delay={i * 110} />
            ))}
          </div>
        </div>
      </section>

      <section className="pteaser pteaser--examples">
        <div className="wrap">
          <Reveal as="div" className="pteaser__head">
            <div>
              <h2 className="svc__head" style={{ marginBottom: '6px' }}>
                The kind of thing we build.
              </h2>
              <p className="svc__sub" style={{ marginBottom: 0 }}>
                illustrative examples — not case studies
              </p>
            </div>
          </Reveal>
          <div className="pteaser__grid">
            {examples.map((e, i) => (
              <CaseCard item={e} key={e.title} variant="example" delay={i * 110} />
            ))}
          </div>
        </div>
      </section>

      <CrossSell
        accent="var(--manage)"
        tone="manage"
        tagLabel="Manage"
        title="We don’t disappear at launch."
        body="The day you go live is the day the real work starts. Keep us on to run, secure and grow it — the thing we just built you."
        pillLabel="Want us to maintain it after? See Manage"
        to="/manage"
      />

      <section className="endcta">
        <Reveal as="h2" className="endcta__title">Have an idea?</Reveal>
        <Reveal as="p" className="endcta__sub" delay={100}>
          Bring us the rough version. We’ll tell you what it takes to make it real.
        </Reveal>
        <Reveal as="div" className="endcta__actions" delay={200}>
          <Link className="btn btn--build" to="/contact?intent=build">
            Start a build →
          </Link>
        </Reveal>
      </section>
    </>
  )
}
