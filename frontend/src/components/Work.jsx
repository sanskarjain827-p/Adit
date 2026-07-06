import { useMemo, useState, useEffect, useRef } from 'react'
import { projects, extraWork, filterOptions } from '../data/projects.js'
import PreviewCard from './PreviewCard.jsx'

function Row({ item, visibleThumb }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.15 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

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

      <footer className="work-foot">
        <p>
          Have a product in mind?{' '}
          <a href="mailto:hello@insyd.studio">hello@insyd.studio</a>
        </p>
      </footer>
    </main>
  )
}
