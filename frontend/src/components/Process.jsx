import Reveal from './Reveal.jsx'
import './Process.css'

const steps = [
  { n: 1, title: 'Talk', body: 'Tell us where you are. No pitch, no fluff.' },
  { n: 2, title: 'Scope', body: 'We map the work and what it really takes.' },
  { n: 3, title: 'Ship', body: 'We build and launch — live, in real hands.' },
  { n: 4, title: 'Run', body: 'We keep it alive, secure, and improving.' },
]

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap">
        <Reveal as="div" className="process__head">
          <h2 className="process__title">Four steps. No mystery.</h2>
          <p className="kicker process__kicker">
            you always know exactly where things stand
          </p>
        </Reveal>

        <Reveal as="ol" className="steps" variant="fade">
          <span className="steps__line" aria-hidden="true" />
          {steps.map((s) => (
            <li key={s.n} className={`step${s.n === 4 ? ' step--run' : ''}`}>
              <span className="step__num">{s.n}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__body">{s.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
