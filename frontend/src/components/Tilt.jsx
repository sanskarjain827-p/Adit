import { useRef } from 'react'
import './Tilt.css'

/**
 * Wraps children in a div that tilts in 3D toward the pointer — perspective +
 * rotateX/rotateY driven by CSS custom properties so the transition (set in
 * Tilt.css) can ease the return-to-rest without fighting inline styles.
 * No-ops on touch devices and honours prefers-reduced-motion.
 */
export default function Tilt({ className = '', max = 10, glare = true, children, ...rest }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--tilt-x', `${(-(py - 0.5) * 2 * max).toFixed(2)}deg`)
    el.style.setProperty('--tilt-y', `${((px - 0.5) * 2 * max).toFixed(2)}deg`)
    el.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`)
    el.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`)
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div
      ref={ref}
      className={`tilt${glare ? ' tilt--glare' : ''} ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </div>
  )
}
