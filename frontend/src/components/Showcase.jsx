import { useState, useRef, useCallback } from 'react'
import { projects } from '../data/projects.js'
import Scene from './Scene.jsx'
import PreviewCard from './PreviewCard.jsx'

const DEFAULT = {
  id: 'default',
  name: null,
  tagline:
    'Since day one, we’ve helped ambitious startups and established brands design and build web and mobile apps, run their social media, and ship ML/DL models worth talking about.',
  services: [],
}

const allWork = {
  id: 'allwork',
  name: 'All Work',
  tagline: 'From first commit to full scale.',
  services: [],
  scene: 'allwork',
}

// Every full-screen background, in stacking order. Each becomes one card.
const sceneIds = ['default', ...projects.map((p) => p.scene), 'allwork']

export default function Showcase({ onAllWork }) {
  const [active, setActive] = useState(DEFAULT)
  const [swapping, setSwapping] = useState(false)

  // Card-stack: the scene on top, and an ever-rising z so the newest wins.
  // CSS transitions on .scene do the animating; we just set the transforms.
  const [sceneId, setSceneId] = useState('default')
  const [z, setZ] = useState({ default: 1 })
  const cur = useRef('default')
  const prev = useRef('default')
  const zTop = useRef(1)
  const timer = useRef(null)

  const select = useCallback((p) => {
    clearTimeout(timer.current)
    const next = p.scene ?? 'default'
    if (next !== cur.current) {
      prev.current = cur.current
      cur.current = next
      zTop.current += 1
      setZ((m) => ({ ...m, [next]: zTop.current }))
      setSceneId(next)
    }
    setSwapping(true)
    timer.current = setTimeout(() => {
      setActive(p)
      setSwapping(false)
    }, 180)
  }, [])

  // Front: flat and full size. Outgoing: shrink + tilt, sit behind.
  // Rest: parked below the deck.
  const styleFor = (id) => {
    const zIndex = z[id] ?? 0
    if (id === sceneId) return { transform: 'translateY(0) scale(1) rotate(0deg)', zIndex }
    if (id === prev.current) return { transform: 'translateY(0) scale(0.7) rotate(5deg)', zIndex }
    return { transform: 'translateY(100%)', zIndex }
  }

  return (
    <main className="showcase">
      <div className="scenes">
        {sceneIds.map((id) => (
          <Scene key={id} id={id} style={styleFor(id)} />
        ))}
      </div>

      <nav className="rail" onMouseLeave={() => select(DEFAULT)}>
        {projects.map((p) => (
          <button
            key={p.id}
            className={`pill rail-pill ${active.id === p.id ? 'rail-active' : ''}`}
            onMouseEnter={() => select(p)}
            onFocus={() => select(p)}
          >
            {p.name}
          </button>
        ))}
        <button
          className={`pill rail-pill ${active.id === 'allwork' ? 'rail-active' : ''}`}
          onMouseEnter={() => select(allWork)}
          onFocus={() => select(allWork)}
          onClick={onAllWork}
        >
          All Work
        </button>
      </nav>

      <div className={`stage ${swapping ? 'stage-swap' : ''}`}>
        <p className="stage-tagline">{active.tagline}</p>

        {active.id === 'default' ? (
          <h1 className="stage-title stage-title-split">
            <span>We build</span>
            <span className="stage-title-indent">products</span>
          </h1>
        ) : (
          <h1
            className={`stage-title ${active.id === 'allwork' ? 'stage-title-left' : ''}`}
            data-hot
            onClick={active.id === 'allwork' ? onAllWork : undefined}
          >
            {active.name}
          </h1>
        )}

        {active.services.length > 0 && (
          <p className="stage-services">{active.services.join(', ')}</p>
        )}

        {active.id !== 'default' && (
          <div className={`stage-card ${active.id === 'allwork' ? 'stage-card-low' : ''}`}>
            <PreviewCard project={active} />
          </div>
        )}
      </div>
    </main>
  )
}
