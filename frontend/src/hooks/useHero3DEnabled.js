import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 860

function prefersReduced() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Whether the WebGL hero accent should render at all — kept dependency-free
 * (no three/@react-three/fiber import) so Hero.jsx can call this before
 * deciding whether to trigger the lazy Hero3D chunk. Without this check
 * living outside Hero3D.jsx, mobile/reduced-motion visitors would still
 * download the three.js chunk just to immediately discard it.
 */
export default function useHero3DEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const check = () => setEnabled(!prefersReduced() && window.innerWidth >= MOBILE_BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return enabled
}
