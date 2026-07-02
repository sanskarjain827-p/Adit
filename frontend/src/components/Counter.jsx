import { useEffect, useRef, useState } from 'react'
import useInView from '../hooks/useInView.js'

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Counts up to `value` the first time it scrolls into view.
 * Renders an inline <span>, so it slots into any heading.
 */
export default function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1400,
  className = '',
}) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [display, setDisplay] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplay(value)
      return
    }

    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setDisplay(value * easeOutExpo(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
