import { useEffect, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Returns [ref, inView]. `inView` flips true the first time the element
 * scrolls into the viewport. Honours prefers-reduced-motion by reporting
 * the element as visible immediately (no entrance to wait on).
 */
export default function useInView({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced() || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    // useEffect runs after layout/paint, so the rect is final here. If the
    // element is already on screen at mount, reveal it right away — the
    // observer's own initial notification is unreliable for above-the-fold
    // elements after an SPA route mount.
    const r = el.getBoundingClientRect()
    if (r.height > 0 && r.top < window.innerHeight && r.bottom > 0) {
      setInView(true)
      if (once) return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
