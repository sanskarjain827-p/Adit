import { lazy, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Tilt from './Tilt.jsx'
import FloatingShapes from './FloatingShapes.jsx'
import useScrollPin from '../hooks/useScrollPin.js'
import useHero3DEnabled from '../hooks/useHero3DEnabled.js'
import './Hero.css'

// three/@react-three/fiber are the heaviest dependency in the bundle by far —
// code-split them out so every other page (and the initial paint of this one)
// doesn't pay for a WebGL library it may never use. Gated behind
// useHero3DEnabled (dependency-free) so mobile/reduced-motion visitors never
// even trigger the download, not just skip rendering it once downloaded.
const Hero3D = lazy(() => import('./Hero3D.jsx'))

const buildProgress = [
  { label: 'Web app', pct: 85 },
  { label: 'ML model', pct: 60 },
  { label: 'Launch readiness', pct: 40 },
]

export default function Hero() {
  const heroRef = useRef(null)
  const kickerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const ledeRef = useRef(null)
  const actionsRef = useRef(null)
  const buildCardRef = useRef(null)
  const manageCardRef = useRef(null)
  const hero3DEnabled = useHero3DEnabled()

  useScrollPin(
    heroRef,
    (tl) => {
      // null under prefers-reduced-motion / mobile — leave everything at its
      // natural, fully-visible CSS state instead of animating.
      if (!tl) return

      const fills = gsap.utils.toArray('.hbar__fill', buildCardRef.current)
      const pulseLine = manageCardRef.current.querySelector('.pulse-line')
      const pulseLength = pulseLine.getTotalLength()
      pulseLine.style.strokeDasharray = pulseLength
      pulseLine.style.strokeDashoffset = pulseLength

      gsap.set([kickerRef.current, line1Ref.current, line2Ref.current, ledeRef.current, actionsRef.current], {
        opacity: 0,
        y: 24,
      })
      gsap.set([buildCardRef.current, manageCardRef.current], { opacity: 0, y: 34, scale: 0.95 })
      gsap.set(fills, { scaleX: 0 })

      tl.to(kickerRef.current, { opacity: 1, y: 0, duration: 0.4 })
        .to(line1Ref.current, { opacity: 1, y: 0, duration: 0.45 }, '-=0.15')
        .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
        .to(ledeRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .to(buildCardRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, '-=0.3')
        .to(fills, { scaleX: 1, duration: 0.5, stagger: 0.1 }, '-=0.35')
        .to(manageCardRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, '-=0.4')
        .to(pulseLine, { strokeDashoffset: 0, duration: 0.55 }, '-=0.3')
    },
    { distance: '+=140%' },
  )

  return (
    <div className="hero" id="top" ref={heroRef}>
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="kicker hero__kicker" ref={kickerRef}>
            one partner, the whole life of your software
          </p>
          <h1 className="hero__title">
            <span className="hero__title-line" ref={line1Ref}>
              Build it, or run it.
            </span>
            <span className="hero__title-line" ref={line2Ref}>
              We do both, properly.
            </span>
          </h1>
          <p className="hero__lede" ref={ledeRef}>
            We&rsquo;re the senior engineering team behind brand-new products{' '}
            <em>and</em> the live systems other people already depend on. Two
            jobs, one team.
          </p>
          <div className="hero__actions" ref={actionsRef}>
            <Link className="btn btn--build" to="/build">
              Start a build
            </Link>
            <Link className="btn" to="/manage">
              Hand over your stack
            </Link>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          {hero3DEnabled ? (
            <Suspense fallback={<FloatingShapes />}>
              <Hero3D />
            </Suspense>
          ) : (
            <FloatingShapes />
          )}

          {/* BUILD card */}
          <div className="hcard hcard--build" ref={buildCardRef}>
            <Tilt className="hcard__tilt" max={7}>
              <div className="hcard__top">
                <span className="tag tag--build">Build</span>
                <span className="hcard__note">in progress</span>
              </div>
              <div className="hcard__bars">
                {buildProgress.map((b, i) => (
                  <div className="hbar" key={b.label}>
                    <div className="hbar__row">
                      <span>{b.label}</span>
                    </div>
                    <div className="hbar__track">
                      <div
                        className="hbar__fill"
                        style={{ '--w': `${b.pct}%`, '--i': i }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Tilt>
          </div>

          {/* MANAGE card */}
          <div className="hcard hcard--manage" ref={manageCardRef}>
            <Tilt className="hcard__tilt" max={7}>
              <div className="hcard__top">
                <span className="tag tag--manage">Manage</span>
                <span className="hcard__note hcard__note--live">
                  <span className="hcard__dot" />
                  live
                </span>
              </div>
              <svg className="hcard__pulse" viewBox="0 0 264 56" preserveAspectRatio="none">
                <polyline
                  className="pulse-line"
                  points="0,34 20,30 38,36 56,24 74,31 92,19 110,28 128,22 146,33 164,17 182,26 200,21 220,29 240,20 264,25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <div className="hcard__stats">
                <div>
                  <div className="hcard__stat">Standix</div>
                  <div className="hcard__statlabel">live product we run</div>
                </div>
                <div>
                  {/* TODO(owner): once the real Standix metric is known, swap in
                      <Counter value={STANDIX_METRIC} suffix={STANDIX_METRIC_SUFFIX} />
                      here. Don't fabricate a number in the meantime. */}
                  <div className="hcard__stat hcard__stat--text">Live now</div>
                  <div className="hcard__statlabel">real users, real uptime</div>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </div>
  )
}
