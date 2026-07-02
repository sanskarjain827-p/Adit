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
  { name: 'Cybersecurity', desc: 'Hardening, monitoring and patching — so a breach never becomes your story.' },
  { name: 'Database management', desc: 'Backups, tuning and migrations — data stays fast and intact.' },
  { name: 'System design', desc: 'Re-architect what’s fragile so it scales instead of falling over.' },
  { name: 'UI/UX improvement', desc: 'The slow rot after launch, reversed.' },
  { name: 'Media', desc: 'SMM and Meta Ads — organic presence and paid campaigns, run and optimized.' },
]

const steps = [
  { label: 'Audit', body: 'We map what you have — code, data, risks.' },
  { label: 'Stabilize', body: 'Patch what’s urgent, stop the bleeding.' },
  { label: 'Own', body: 'We take the pager — it’s our problem now.' },
  { label: 'Improve', body: 'Month over month it gets better, not worse.' },
]

const stats = [
  { value: '24/7', label: 'monitoring — someone’s always watching' },
  { value: 'Monthly', label: 'health reports, plain-English' },
  { value: 'One team', label: 'holds the pager, no ticket queue' },
]

// Illustrative — not case studies. No status pill, no invented metric (CaseCard
// enforces that via variant="example").
const examples = [
  {
    kind: 'map',
    tone: 'manage',
    tags: ['manage'],
    title: 'Legacy system stabilization',
    blurb: 'The kind of handover we take on — a fragile, undocumented system, steadied without a rewrite.',
  },
  {
    kind: 'grid',
    tone: 'manage',
    tags: ['manage'],
    title: 'App we keep running post-launch',
    blurb:
      'Built somewhere, handed to us — or built by us and kept alive. Either way, someone owns uptime, security and the next release.',
  },
]

export default function Manage() {
  return (
    <>
      <section className="phero phero--split phero--manage">
        <div className="wrap phero__inner">
          <Reveal as="div" className="phero__copy stagger" variant="none">
            <span className="eyebrow eyebrow--manage">What we do</span>
            <span className="tag tag--manage">Manage</span>
            <h1 className="phero__title">
              Your outsourced
              <br />
              tech department.
            </h1>
            <p className="phero__lede">Already built? We run it for you.</p>
            <p className="phero__body">
              Hand over a live product and we keep it healthy — security,
              databases, system design and UX. One senior team holding the pager.
            </p>
            <Link className="btn btn--manage" to="/contact?intent=manage">
              Hand it over →
            </Link>
          </Reveal>

          <Reveal as="div" className="phero__visual" variant="right" aria-hidden="true">
            <div className="pvis__ghost pvis__ghost--manage" />
            <div className="mvis">
              <div className="pvis__top">
                <span className="tag tag--manage">Manage</span>
                <span className="pvis__live pvis__live--manage">
                  <span className="pvis__livedot pvis__livedot--manage" />
                  live
                </span>
              </div>
              <svg className="mvis__pulse" viewBox="0 0 268 56" preserveAspectRatio="none">
                <polyline
                  points="0,34 20,30 38,36 56,24 74,31 92,19 110,28 128,22 146,33 164,17 182,26 200,21 220,29 240,20 268,25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <div className="mvis__rows">
                <div className="mrow">
                  <span className="mrow__k">Monitoring</span>
                  <span className="mrow__v">24/7</span>
                </div>
                <div className="mrow">
                  <span className="mrow__k">Reports</span>
                  <span className="mrow__v">monthly</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="svc" style={{ '--accent': 'var(--manage)' }}>
        <div className="wrap">
          <Reveal as="h2" className="svc__head">What we manage.</Reveal>
          <Reveal as="p" className="svc__sub" delay={80}>
            whatever your stack needs — we cover the whole surface
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
        accent="var(--manage)"
        title="The handover."
        sub="how we take a live system off your hands — without breaking it"
        steps={steps}
      />

      <StatBand accent="var(--manage)" bg="var(--manage-bg)" stats={stats} />

      <section className="pteaser">
        <div className="wrap">
          <Reveal as="div" className="pteaser__head">
            <div>
              <h2 className="svc__head" style={{ marginBottom: '6px' }}>
                Managed and stable right now.
              </h2>
              <p className="svc__sub" style={{ marginBottom: 0 }}>
                live systems we keep healthy
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
                The kind of thing we manage.
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
        accent="var(--build)"
        tone="build"
        tagLabel="Build"
        title="Didn’t build it with us? Doesn’t matter."
        body="We take over any stack — any language, any age, any mess. The audit tells us where we stand, and we go from there."
        pillLabel="Need it built first? See Build"
        to="/build"
        reverse
      />

      <section className="endcta">
        <Reveal as="h2" className="endcta__title">Already built?</Reveal>
        <Reveal as="p" className="endcta__sub" delay={100}>
          Stop babysitting it. Hand it over — we’ll take the pager tonight.
        </Reveal>
        <Reveal as="div" className="endcta__actions" delay={200}>
          <Link className="btn btn--manage" to="/contact?intent=manage">
            Hand it over →
          </Link>
        </Reveal>
      </section>
    </>
  )
}
