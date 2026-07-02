import './FloatingShapes.css'

const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom']

/**
 * Purely decorative, aria-hidden ambient motion for hero backgrounds: a
 * slow-tumbling soft-shaded 3D block, a matte sphere, and a tilted orbit
 * ring, filling the empty space around the hero cards. Faces/sphere use
 * gradient shading (not flat fills) so they read as solid objects under
 * light, not line art. Still no canvas/WebGL — real 3D via
 * `transform-style: preserve-3d`, so it stays cheap. Frozen under
 * reduced-motion.
 */
export default function FloatingShapes({ className = '' }) {
  return (
    <div className={`fshapes ${className}`} aria-hidden="true">
      <div className="fshapes__block-scene">
        <div className="fshapes__block">
          {FACES.map((f) => (
            <div key={f} className={`fshapes__face fshapes__face--${f}`} />
          ))}
        </div>
      </div>

      <div className="fshapes__ring" />

      <div className="fshapes__sphere" />
    </div>
  )
}
