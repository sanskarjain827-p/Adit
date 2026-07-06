import { useEffect, useRef, useState } from 'react'

/* MetaLab-style custom cursor: native cursor hidden, a small white dot
   plus an outline ring follow the pointer with a smooth lag; the ring
   swells over interactive elements. Pointer-fine devices only. */
export default function Cursor() {
  const wrapRef = useRef(null)
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )

  useEffect(() => {
    if (!enabled) return
    const wrap = wrapRef.current
    let raf
    let mx = -100
    let my = -100
    let x = -100
    let y = -100
    let visible = false

    const loop = () => {
      // lerp toward the pointer for the trailing feel
      x += (mx - x) * 0.22
      y += (my - y) * 0.22
      wrap.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        // first appearance: snap to the pointer, don't glide from a corner
        x = mx
        y = my
        wrap.classList.add('cursor-visible')
      }
      const interactive = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, .focus-row, .hpx-card',
      )
      wrap.classList.toggle('cursor-hot', !!interactive)
    }
    const onLeave = () => {
      visible = false
      wrap.classList.remove('cursor-visible')
    }
    const onDown = () => wrap.classList.add('cursor-down')
    const onUp = () => wrap.classList.remove('cursor-down')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={wrapRef} className="cursor" aria-hidden>
      <span className="cursor-ring" />
      <span className="cursor-dot" />
    </div>
  )
}
