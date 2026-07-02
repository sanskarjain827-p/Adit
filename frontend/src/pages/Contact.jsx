import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import './shared.css'
import './Contact.css'

const COPY = {
  build: {
    accent: 'var(--build)',
    placeholder: 'What do you want to build? Even a rough idea is plenty.',
  },
  manage: {
    accent: 'var(--manage)',
    placeholder: 'What have you got, and what’s hurting? We’ll take it from there.',
  },
}

const nextSteps = [
  {
    title: 'We reply the same day.',
    body: 'A real person reads it and writes back — usually within hours.',
  },
  {
    title: 'A 30-minute call.',
    body: 'With the engineer who’ll actually do the work — not a sales rep.',
  },
  {
    title: 'A fixed scope.',
    body: 'Timeline, team and price up front. No surprises.',
  },
]

const trust = ['Same-day reply', 'No sales fluff', 'Talk to an engineer, not a rep']

export default function Contact() {
  const [params] = useSearchParams()
  const initial = params.get('intent') === 'manage' ? 'manage' : 'build'
  const [intent, setIntent] = useState(initial)
  const accent = COPY[intent].accent

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const subject = `New ${intent} enquiry — ${data.get('company') || 'Insyd'}`
    const body = [
      `Intent: ${intent}`,
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Company / product: ${data.get('company') || ''}`,
      '',
      data.get('message') || '',
    ].join('\n')
    window.location.href = `mailto:hello@insyd.dev?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="contact" style={{ '--accent': accent }}>
      <section className="phero contact__hero">
        <Reveal as="div" className="wrap stagger" variant="none">
          <span className="tag tag--neutral">Talk to us</span>
          <h1 className="phero__title contact__title">Tell us where you are.</h1>
          <p className="contact__lede">We’ll tell you what we’d do.</p>
        </Reveal>
      </section>

      <section className="contact__body">
        <div className="wrap contact__grid">
          {/* LEFT: form */}
          <Reveal as="div" className="contact__formcol" variant="left">
            <p className="contact__need">I need to…</p>
            <div className="contact__toggle">
              <button
                type="button"
                className={`intent intent--build${intent === 'build' ? ' is-on' : ''}`}
                aria-pressed={intent === 'build'}
                onClick={() => setIntent('build')}
              >
                <span className="intent__top">
                  <span className="tag tag--build">Build</span>
                  <span className="intent__dot" />
                </span>
                <span className="intent__title">Build something</span>
                <span className="intent__desc">
                  From nothing to a live product: web, mobile, ML, AI.
                </span>
              </button>

              <button
                type="button"
                className={`intent intent--manage${intent === 'manage' ? ' is-on' : ''}`}
                aria-pressed={intent === 'manage'}
                onClick={() => setIntent('manage')}
              >
                <span className="intent__top">
                  <span className="tag tag--manage">Manage</span>
                  <span className="intent__dot" />
                </span>
                <span className="intent__title">Manage something</span>
                <span className="intent__desc">
                  You’ve got a product — we run it: security, databases, UX, all of it.
                </span>
              </button>
            </div>

            <form className="contact__form" onSubmit={handleSubmit}>
              <label className="field">
                <span className="field__label">Your name</span>
                <input name="name" type="text" autoComplete="name" />
              </label>
              <label className="field">
                <span className="field__label">Email</span>
                <input name="email" type="email" autoComplete="email" />
              </label>
              <label className="field">
                <span className="field__label">Company / product</span>
                <input name="company" type="text" />
              </label>
              <label className="field">
                <span className="field__label">Tell us where you are</span>
                <textarea name="message" rows={4} placeholder={COPY[intent].placeholder} />
              </label>
              <button type="submit" className={`btn contact__submit btn--${intent}`}>
                Send — we reply same day
              </button>
            </form>
          </Reveal>

          {/* RIGHT: reassurance */}
          <Reveal as="aside" className="contact__panel" variant="right" delay={120}>
            <h2 className="contact__panel-title">What happens next</h2>
            <ol className="contact__steps">
              {nextSteps.map((s, i) => (
                <li className="contact__step" key={s.title}>
                  <span className="contact__step-rail">
                    <span
                      className={`contact__step-num${
                        i === nextSteps.length - 1 ? ' contact__step-num--filled' : ''
                      }`}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <span className="contact__step-copy">
                    <span className="contact__step-title">{s.title}</span>
                    <span className="contact__step-body">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="contact__trust">
              {trust.map((t) => (
                <span className="contact__trustchip" key={t}>
                  {t}
                </span>
              ))}
            </div>

            <div className="contact__alt">
              <p className="contact__alt-label">Rather skip the form?</p>
              <div className="contact__alt-row">
                <a className="contact__mail" href="mailto:hello@insyd.dev">
                  hello@insyd.dev
                </a>
                <span className="contact__alt-sep">·</span>
                <a className="contact__book" href="mailto:hello@insyd.dev">
                  Book a call →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
