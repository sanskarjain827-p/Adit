import Reveal from './Reveal.jsx'
import './Lifecycle.css'

export default function Lifecycle() {
  return (
    <section className="life">
      <div className="wrap">
        <Reveal as="div" className="life__head">
          <span className="kicker life__kicker">the difference</span>
          <h2 className="life__title">One team. The whole lifecycle.</h2>
          <p className="life__lede">
            Most agencies stop at launch and hand you the keys. We don&rsquo;t —
            build flows straight into run, as one continuous engagement.
          </p>
        </Reveal>

        <Reveal as="div" className="life__track" variant="fade">
          <div className="life__bar">
            <span className="life__seg life__seg--build" />
            <span className="life__seg life__seg--manage" />
          </div>

          <div className="life__node" />
          <span className="life__nodelabel">Launch</span>
          <span className="life__stop" aria-hidden="true">
            most agencies stop here ✗
            <span className="life__stoparrow">↓</span>
          </span>

          <div className="life__phases">
            <div className="life__phase life__phase--build">
              <span className="tag tag--build">Build</span>
              <span className="life__steps">Scope · Design · Build</span>
            </div>
            <div className="life__phase life__phase--manage">
              <span className="tag tag--manage">Manage</span>
              <span className="life__steps">Run · Secure · Improve · Forever</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
