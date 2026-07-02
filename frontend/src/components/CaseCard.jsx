import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'
import ProductShot from './ProductShot.jsx'
import { tagLabel } from '../data/caseStudies.js'
import './WorkTeaser.css'

/**
 * Shared teaser card for both real case studies and illustrative capability
 * examples. variant="example" structurally omits the status pill and metric
 * row (no live claim, no invented number) instead of relying on content
 * authors to leave fields blank.
 */
export default function CaseCard({ item, delay = 0, variant = 'case' }) {
  return (
    <Reveal as={Link} className="wt__card" to="/work" variant="up" delay={delay}>
      <Tilt className="wt__shot" max={6} aria-hidden="true">
        <ProductShot tone={item.tone} kind={item.kind} />
      </Tilt>
      <div className="wt__body">
        <div className="wt__cardhead">
          <div className="wt__tags">
            {item.tags.map((t) => (
              <span key={t} className={`tag tag--${t}`}>
                {tagLabel[t]}
              </span>
            ))}
          </div>
          {variant === 'case' && (
            <span className={`wt__status wt__status--${item.status.tone}`}>
              {item.status.label}
            </span>
          )}
        </div>
        <h3 className="wt__cardtitle">{item.title}</h3>
        <p className="wt__blurb">{variant === 'case' ? item.teaserBlurb : item.blurb}</p>
        {variant === 'case' && item.metric && (
          <p className="wt__metric">
            {item.metric.value}
            <span> {item.metric.sub}</span>
          </p>
        )}
      </div>
    </Reveal>
  )
}
