import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const principles = [
  {
    n: '01',
    label: 'You talk to the makers',
    body: "No account manager relaying messages. You're in the same room as the people designing and building it.",
  },
  {
    n: '02',
    label: 'We measure in outcomes',
    body: 'Shipped products, real users, real growth, not deliverables filed away in a folder no one opens.',
  },
  {
    n: '03',
    label: 'Built to grow, not just launch',
    body: 'We engineer for the next six months of users and iteration, not just for demo day.',
  },
  {
    n: '04',
    label: 'Taste is a requirement',
    body: 'Anyone can ship features. We sweat whether the thing actually feels good to use, the details most teams skip.',
  },
  {
    n: '05',
    label: 'We stay after launch',
    body: "Launch is day one. The content, the social presence, the next hundred users, that's the work, not a separate upsell.",
  },
]

export default function Principles({ onWork }) {
  const [headRef, headShown] = useReveal()
  const [gridRef, gridShown] = useReveal(0.15)
  const [active, setActive] = useState(null)

  return (
    <section
      className={`principles ${active ? 'principles-focus' : ''}`}
      onMouseLeave={() => setActive(null)}
    >
      <div
        ref={headRef}
        className={`principles-head ${headShown ? 'hp-in' : ''}`}
        onMouseEnter={() => setActive(null)}
      >
        <h2 className="principles-title">
          <span className="rise-line">
            After building products end to end, across design, code, models,
            and growth, a few things turned out to matter more than the rest.
          </span>
        </h2>
        <button className="principles-link" onClick={onWork}>
          <span className="rise-line">
            Work <span aria-hidden>→</span>
          </span>
        </button>
      </div>

      <div ref={gridRef} className={`principles-grid ${gridShown ? 'grid-in' : ''}`}>
        {principles.map((p, i) => (
          <div
            key={p.n}
            className={`principle ${active === p.n ? 'principle-active' : ''}`}
            style={{ '--i': i }}
            onMouseEnter={() => setActive(p.n)}
          >
            <span className="principle-n">
              <span className="rise">{p.n}</span>
            </span>
            <div className="principle-foot">
              <h3 className="principle-label">
                <span className="rise">{p.label}</span>
              </h3>
              <p className="principle-body">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
