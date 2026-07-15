import { useMemo, useState } from 'react'
import { projects, extraWork, filterOptions } from '../data/projects.js'
import PreviewCard from './PreviewCard.jsx'
import { useReveal } from '../hooks/useReveal.js'

function Row({ item, visibleThumb }) {
  const [ref, shown] = useReveal(0.15)

  return (
    <article ref={ref} className={`work-row ${shown ? 'row-in' : ''}`}>
      <span className={`work-mark ${item.wordmark}`}>{item.name}</span>
      <p className="work-desc">{item.tagline}</p>
      {visibleThumb && item.card && (
        <div className="work-thumb">
          <PreviewCard project={item} />
        </div>
      )}
      <ul className="work-tags">
        {item.services.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      {item.caseStudy && (
        <a className="work-link" href="#work" onClick={(e) => e.preventDefault()}>
          View case study
        </a>
      )}
    </article>
  )
}

export default function Work() {
  const [filter, setFilter] = useState(null)

  const rows = useMemo(() => {
    const all = [...projects, ...extraWork]
    if (!filter) return all
    return all.filter((p) => p.filters.includes(filter))
  }, [filter])

  return (
    <main className="work">
      <h1 className="work-headline">
        A sample of our work <span className="work-dash" />
        <br />
        from first commit to full scale
      </h1>

      <div className="work-filters">
        <span className="work-filter-label">Filter By:</span>
        {filterOptions.map((f) => (
          <button
            key={f}
            className={`pill filter-pill ${filter === f ? 'filter-active' : ''}`}
            onClick={() => setFilter(filter === f ? null : f)}
          >
            {f}
          </button>
        ))}
      </div>

      <section className="work-list">
        {rows.map((item, i) => (
          <Row key={item.name} item={item} visibleThumb={i % 3 === 0} />
        ))}
      </section>
    </main>
  )
}
