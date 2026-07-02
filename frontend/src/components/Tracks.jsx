import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import './Tracks.css'

const buildServices = ['Web apps', 'Mobile', 'ML models', 'AI / deep learning']
const manageServices = ['Security', 'Databases', 'System design', 'UI / UX']

export default function Tracks() {
  return (
    <>
      {/* Track 01 — BUILD */}
      <section className="track" id="build">
        <div className="wrap track__inner">
          <Reveal as="div" className="track__copy" variant="left">
            <span className="tag tag--build">Build</span>
            <h2 className="track__title">
              You have an idea.
              <br />
              We have the team.
            </h2>
            <p className="track__body">
              Zero to a live product, end to end — design, engineering, models,
              infrastructure. One crew that owns the whole thing.
            </p>
            <ul className="chips" aria-label="Build services">
              {buildServices.map((s) => (
                <li key={s} className="chip chip--build">
                  {s}
                </li>
              ))}
            </ul>
            <Link className="track__link track__link--build" to="/build">
              Start a build <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <Reveal
            as="figure"
            className="track__visual track__visual--build"
            variant="right"
            aria-hidden="true"
          >
            <div className="screens">
              <span className="screens__a" />
              <span className="screens__b" />
              <span className="screens__c" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Track 02 — MANAGE */}
      <section className="track" id="manage">
        <div className="wrap track__inner track__inner--reverse">
          <Reveal
            as="figure"
            className="track__visual track__visual--manage"
            variant="left"
            aria-hidden="true"
          >
            <div className="dash">
              <div className="dash__grid">
                <i style={{ height: '38%' }} />
                <i style={{ height: '62%' }} />
                <i style={{ height: '50%' }} />
                <i style={{ height: '78%' }} />
                <i style={{ height: '46%' }} />
                <i style={{ height: '70%' }} />
                <i style={{ height: '58%' }} />
              </div>
            </div>
          </Reveal>

          <Reveal as="div" className="track__copy" variant="right">
            <span className="tag tag--manage">Manage</span>
            <h2 className="track__title">
              You have a product.
              <br />
              We keep it healthy.
            </h2>
            <p className="track__body">
              Become your outsourced tech department. We take the pager, harden
              the stack, and make it better month over month.
            </p>
            <ul className="chips" aria-label="Manage services">
              {manageServices.map((s) => (
                <li key={s} className="chip chip--manage">
                  {s}
                </li>
              ))}
            </ul>
            <Link className="track__link track__link--manage" to="/manage">
              Hand it over <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
