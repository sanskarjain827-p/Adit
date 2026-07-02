import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import './CtaBand.css'

export default function CtaBand() {
  return (
    <section className="cta" id="contact">
      <div className="wrap cta__inner">
        <Reveal as="h2" className="cta__title">
          Not sure which side you need?
        </Reveal>
        <Reveal as="p" className="cta__sub" delay={100}>
          Tell us where you are. We&rsquo;ll tell you what we&rsquo;d do.
        </Reveal>
        <Reveal as="div" className="cta__actions" delay={200}>
          <Link className="btn btn--ghost-light" to="/contact">
            Book a call
          </Link>
          <span className="cta__or">
            or{' '}
            <a className="cta__mail" href="mailto:hello@insyd.dev">
              hello@insyd.dev
            </a>
          </span>
        </Reveal>
      </div>
    </section>
  )
}
