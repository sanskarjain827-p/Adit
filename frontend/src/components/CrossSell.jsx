import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'
import CrossSellVisual from './CrossSellVisual.jsx'
import './CrossSell.css'

export default function CrossSell({
  accent,
  tone,
  tagLabel,
  title,
  body,
  pillLabel,
  to,
  reverse,
}) {
  const visual = (
    <Tilt className={`crosssell__visual crosssell__visual--${tone}`} max={8} aria-hidden="true">
      <CrossSellVisual tone={tone} />
    </Tilt>
  )
  return (
    <section className="crosssell-section">
      <div className="wrap">
        <Reveal
          as="div"
          variant="scale"
          className={`crosssell crosssell--${tone}${reverse ? ' crosssell--reverse' : ''}`}
          style={{ '--accent': accent }}
        >
          {reverse && visual}
          <div className="crosssell__copy">
            <span className={`tag tag--${tone}`}>{tagLabel}</span>
            <h2 className="crosssell__title">{title}</h2>
            <p className="crosssell__body">{body}</p>
            <Link className="crosssell__pill" to={to}>
              {pillLabel} <span aria-hidden="true">→</span>
            </Link>
          </div>
          {!reverse && visual}
        </Reveal>
      </div>
    </section>
  )
}
