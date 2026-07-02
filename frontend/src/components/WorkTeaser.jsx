import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import CaseCard from './CaseCard.jsx'
import { caseStudies } from '../data/caseStudies.js'
import './WorkTeaser.css'

export default function WorkTeaser() {
  return (
    <section className="wt">
      <div className="wrap">
        <Reveal as="div" className="wt__head">
          <h2 className="wt__title">Work that’s live right now.</h2>
          <Link className="wt__all" to="/work">
            See all work <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <div className="wt__grid">
          {caseStudies.map((c, i) => (
            <CaseCard item={c} key={c.slug} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  )
}
