import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const MOBILE_BREAKPOINT = 860

/**
 * Pins `containerRef` for extra scroll distance and hands `build` a GSAP
 * timeline scrubbed to that scroll progress, so the caller can stage a
 * sequence of reveals (kicker -> headline -> ...). Skips pinning entirely
 * under prefers-reduced-motion or below the mobile breakpoint — scroll-
 * jacking is disorienting on touch and unnecessary when motion is disabled —
 * `build` is called with `null` in that case so the caller can leave
 * everything at its natural, fully-visible CSS state instead of animating.
 *
 * Cleanup uses gsap.context/revert, matching React's effect lifecycle: this
 * is required here (not just nice-to-have) because React Router unmounts the
 * pinned component on navigation, and a ScrollTrigger + pin left registered
 * on a detached element will misbehave on remount.
 */
export default function useScrollPin(containerRef, build, { distance = '+=150%' } = {}) {
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (prefersReduced() || window.innerWidth < MOBILE_BREAKPOINT) {
      build(null)
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: distance,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })
      build(tl)
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef])
}
