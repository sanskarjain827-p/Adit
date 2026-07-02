import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Tilt from '../components/Tilt.jsx'
import ProductShot from '../components/ProductShot.jsx'
import DeviceFrame from '../components/DeviceFrame.jsx'
import { caseStudies, tagLabel } from '../data/caseStudies.js'
import './shared.css'
import './Work.css'

function CaseTag({ tone }) {
  return <span className={`tag tag--${tone} work__casetag`}>{tagLabel[tone]}</span>
}

function CaseVisual({ item }) {
  if (item.slug === 'this-site') {
    return (
      <Tilt className="work__shot" max={6}>
        <DeviceFrame variant="browser" tone="build" label="insyd.dev">
          <div className="work__browser-page">
            <div className="work__bp-nav">
              <span className="work__bp-mark" />
              <span className="ln" style={{ width: '60px', height: '7px' }} />
            </div>
            <div className="work__bp-title">Build it, or run it.</div>
            <span className="ln" style={{ width: '85%' }} />
            <span className="ln" style={{ width: '65%', marginTop: '8px' }} />
            <div className="work__bp-btns">
              <span className="work__bp-btn work__bp-btn--build" />
              <span className="work__bp-btn work__bp-btn--ghost" />
            </div>
            <div className="work__bp-cards">
              <span className="work__bp-card work__bp-card--build" />
              <span className="work__bp-card work__bp-card--manage" />
            </div>
          </div>
        </DeviceFrame>
      </Tilt>
    )
  }
  return (
    <Tilt className="work__shot" max={8}>
      <DeviceFrame variant="browser" tone={item.tone}>
        <ProductShot tone={item.tone} kind={item.kind} />
      </DeviceFrame>
    </Tilt>
  )
}

export default function Work() {
  return (
    <>
      <section className="phero work__hero">
        <Reveal as="div" className="wrap stagger" variant="none">
          <span className="eyebrow">Our work</span>
          <h1 className="phero__title">Work that’s live and running.</h1>
          <p className="work__herolede">
            Everything here is in production right now — not a concept reel. We
            built it, and we run it.
          </p>
          <p className="work__handnote">
            ↓ you’re looking at one — we built this site, and we run it
          </p>
        </Reveal>
      </section>

      {caseStudies.map((c, i) => {
        const reversed = i % 2 === 1
        const copy = (
          <Reveal as="div" className="work__featured-copy stagger" variant="none" key="copy">
            <span className="eyebrow">Case study — 0{i + 1}</span>
            <div className="work__tagrow">
              {c.tags.map((t) => (
                <CaseTag key={t} tone={t} />
              ))}
            </div>
            <h2 className="work__featured-title">{c.title}</h2>
            <p className="work__featured-body">{c.featuredBlurb}</p>
            <div className="work__signals">
              <span className="work__signal work__signal--on">{c.status.label}</span>
              {c.slug === 'this-site' && (
                <span className="work__signal">Built &amp; run by us</span>
              )}
              {c.metric && (
                <span className="work__signal work__signal--on">
                  {c.metric.value} {c.metric.sub}
                </span>
              )}
            </div>
            {c.slug === 'standix' && c.url && (
              <a className="work__visit" href={c.url} target="_blank" rel="noreferrer">
                Visit Standix <span aria-hidden="true">→</span>
              </a>
            )}
          </Reveal>
        )
        const visual = (
          <Reveal
            as="div"
            className="work__featured-visual"
            variant={reversed ? 'left' : 'right'}
            aria-hidden="true"
            key="visual"
          >
            <CaseVisual item={c} />
          </Reveal>
        )

        return (
          <section className="work__featured-section" key={c.slug}>
            <div className="wrap">
              <div className={`work__featured${reversed ? ' work__featured--reverse' : ''}`}>
                {reversed ? [visual, copy] : [copy, visual]}
              </div>
            </div>
          </section>
        )
      })}

      <section className="work__note-section">
        <div className="wrap">
          <Reveal as="p" className="work__note" variant="scale">
            Short list, on purpose — every project here gets the full team, not
            a slice of one. More real work lands here as it ships.
          </Reveal>
        </div>
      </section>

      <section className="endcta">
        <Reveal as="h2" className="endcta__title">Want work like this?</Reveal>
        <Reveal as="p" className="endcta__sub" delay={100}>
          Tell us where you are — we’ll tell you what we’d do.
        </Reveal>
        <Reveal as="div" className="endcta__actions" delay={200}>
          <Link className="btn btn--build" to="/contact?intent=build">
            Start a build
          </Link>
          <Link className="btn btn--manage" to="/contact?intent=manage">
            Hand it over
          </Link>
        </Reveal>
      </section>
    </>
  )
}
