import useInView from '../hooks/useInView.js'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Small handoff illustration for CrossSell: a "build" block on one side,
 * a "manage" pulse-ring on the other, joined by a dashed path with a dot
 * that travels the line — reads as continuity between the two services.
 */
export default function CrossSellVisual({ tone }) {
  const [ref, inView] = useInView()
  const reduced = prefersReduced()
  const dest = `var(--${tone})`
  const origin = `var(--${tone === 'manage' ? 'build' : 'manage'})`

  return (
    <div
      ref={ref}
      className={`crosssell__shot${inView ? ' is-in' : ''}`}
      style={{ '--csv-origin': origin, '--csv-dest': dest }}
    >
      <svg viewBox="0 0 200 150" className="csv__svg" aria-hidden="true">
        <path
          className="csv__path"
          d="M 46,75 C 80,40 120,110 154,75"
          fill="none"
          strokeWidth="2"
          strokeDasharray="5 7"
        />
        {!reduced && inView && (
          <circle className="csv__pulse" r="3.4">
            <animateMotion
              path="M 46,75 C 80,40 120,110 154,75"
              dur="2.6s"
              repeatCount="indefinite"
              begin="0.6s"
            />
          </circle>
        )}

        <g className="csv__node csv__node--build">
          <rect x="28" y="59" width="32" height="32" rx="9" />
          <rect x="38" y="69" width="12" height="12" rx="3" className="csv__node-inner" />
        </g>

        <g className="csv__node csv__node--manage">
          <circle cx="154" cy="75" r="18" className="csv__ring-track" />
          <circle cx="154" cy="75" r="18" className="csv__ring" />
          <circle cx="154" cy="75" r="5" className="csv__node-inner" />
        </g>
      </svg>
    </div>
  )
}
