import Reveal from './Reveal.jsx'
import './StatBand.css'

export default function StatBand({ accent, bg, stats }) {
  return (
    <section
      className="statband-section"
      style={{ '--accent': accent, '--accent-bg': bg }}
    >
      <div className="wrap statband">
        {stats.map((s, i) => (
          <Reveal
            className="statband__cell"
            key={s.label}
            variant="up"
            delay={i * 110}
          >
            <div
              className="statband__value"
              dangerouslySetInnerHTML={{ __html: s.value }}
            />
            <div className="statband__label">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
