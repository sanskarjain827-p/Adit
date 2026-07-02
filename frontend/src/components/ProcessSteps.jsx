import Reveal from './Reveal.jsx'
import './ProcessSteps.css'

export default function ProcessSteps({ accent, title, sub, steps }) {
  return (
    <section className="steps" style={{ '--accent': accent }}>
      <div className="wrap">
        <Reveal as="h2" className="steps__title">
          {title}
        </Reveal>
        <Reveal as="p" className="steps__sub" delay={80}>
          {sub}
        </Reveal>
        <Reveal as="ol" className="steps__row" variant="fade">
          {steps.map((s, i) => (
            <li className="steps__item" key={s.label}>
              <span
                className={`steps__num${
                  i === steps.length - 1 ? ' steps__num--filled' : ''
                }`}
              >
                {i + 1}
              </span>
              <p className="steps__label">{s.label}</p>
              <p className="steps__body">{s.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
