import useInView from '../hooks/useInView.js'
import './ProductShot.css'

const CHROME = (
  <g className="pshot__chrome">
    <circle className="pshot__dot" cx="14" cy="13" r="3" />
    <circle className="pshot__dot" cx="26" cy="13" r="3" />
    <circle className="pshot__dot" cx="38" cy="13" r="3" />
    <rect className="pshot__url" x="60" y="8" width="84" height="10" rx="5" />
  </g>
)

function ChartContent() {
  const bars = [38, 68, 52, 84]
  return (
    <g className="pshot__body">
      <rect className="pshot__ln pshot__ln--title" x="16" y="42" width="120" height="11" rx="4" />
      <rect className="pshot__ln pshot__ln--sub" x="16" y="60" width="76" height="8" rx="4" />

      <polyline
        className="pshot__spark"
        points="210,90 232,74 254,82 276,58 298,68 320,48 342,56"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="pshot__sparkdot" cx="342" cy="56" r="4.5" />

      {bars.map((h, i) => (
        <rect
          key={i}
          className={`pshot__bar${i % 2 ? ' pshot__bar--b' : ''}`}
          x={16 + i * 30}
          y={214 - h}
          width="18"
          height={h}
          rx="4"
          style={{ '--bar-h': `${h}px`, '--i': i }}
        />
      ))}

      <circle className="pshot__ring-track" cx="352" cy="176" r="26" />
      <circle
        className="pshot__ring"
        cx="352"
        cy="176"
        r="26"
        style={{ '--i': 4, '--ring-c': 2 * Math.PI * 26 }}
      />
    </g>
  )
}

function MapContent() {
  const dots = []
  for (let x = 20; x < 400; x += 34) {
    for (let y = 40; y < 232; y += 34) {
      dots.push([x, y])
    }
  }
  return (
    <g className="pshot__body">
      {dots.map(([x, y], i) => (
        <circle key={i} className="pshot__grain" cx={x} cy={y} r="1.4" />
      ))}
      <path
        className="pshot__route"
        d="M40,190 C 100,120 150,210 210,140 S 320,90 368,70"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {[
        [40, 190],
        [210, 140],
        [368, 70],
      ].map(([x, y], i) => (
        <g key={i} className="pshot__pin" style={{ '--i': i }}>
          <circle cx={x} cy={y} r="9" className="pshot__pin-halo" />
          <circle cx={x} cy={y} r="5" className={`pshot__pin-core${i % 2 ? ' pshot__pin-core--b' : ''}`} />
        </g>
      ))}
    </g>
  )
}

function ListContent() {
  const rows = [0, 1, 2, 3]
  return (
    <g className="pshot__body">
      <rect className="pshot__pill" x="298" y="16" width="86" height="18" rx="9" />
      {rows.map((i) => (
        <g key={i} className="pshot__row" style={{ '--i': i }}>
          <rect className="pshot__row-sq" x="16" y={44 + i * 44} width="26" height="26" rx="7" />
          <rect className="pshot__ln" x="54" y={49 + i * 44} width="150" height="9" rx="4" />
          <rect className="pshot__ln pshot__ln--sub" x="54" y={63 + i * 44} width="96" height="7" rx="4" />
          <rect
            className={`pshot__row-check${i % 2 ? ' pshot__row-check--b' : ''}`}
            x="352"
            y={50 + i * 44}
            width="20"
            height="20"
            rx="10"
          />
        </g>
      ))}
    </g>
  )
}

function GridContent() {
  const cards = [0, 1, 2, 3]
  return (
    <g className="pshot__body">
      <rect className="pshot__phone" x="140" y="14" width="120" height="212" rx="18" />
      <rect className="pshot__ln pshot__ln--title" x="156" y="34" width="60" height="8" rx="4" />
      {cards.map((i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        return (
          <g key={i} className="pshot__card" style={{ '--i': i }}>
            <rect
              x={156 + col * 46}
              y={52 + row * 76}
              width="40"
              height="46"
              rx="7"
              className={`pshot__card-thumb${i % 2 ? ' pshot__card-thumb--b' : ''}`}
            />
            <rect x={156 + col * 46} y={102 + row * 76} width="40" height="6" rx="3" className="pshot__ln" />
          </g>
        )
      })}
    </g>
  )
}

function DashboardContent() {
  const bars = [30, 55, 42]
  return (
    <g className="pshot__body">
      <rect className="pshot__ln pshot__ln--title" x="16" y="42" width="140" height="11" rx="4" />
      <rect className="pshot__ln pshot__ln--sub" x="16" y="60" width="90" height="8" rx="4" />

      <rect className="pshot__panel" x="16" y="86" width="168" height="128" rx="10" />
      {bars.map((h, i) => (
        <rect
          key={i}
          className={`pshot__bar${i % 2 ? ' pshot__bar--b' : ''}`}
          x={34 + i * 40}
          y={198 - h}
          width="20"
          height={h}
          rx="4"
          style={{ '--bar-h': `${h}px`, '--i': i }}
        />
      ))}

      <rect className="pshot__panel" x="200" y="86" width="184" height="58" rx="10" />
      <polyline
        className="pshot__spark"
        points="216,120 236,110 256,124 276,102 296,112 316,96 336,106 356,98 372,104"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect className="pshot__panel" x="200" y="156" width="86" height="58" rx="10" />
      <rect className="pshot__panel" x="298" y="156" width="86" height="58" rx="10" />
      <circle className="pshot__ring-track" cx="243" cy="185" r="18" />
      <circle
        className="pshot__ring"
        cx="243"
        cy="185"
        r="18"
        style={{ '--i': 3, '--ring-c': 2 * Math.PI * 18 }}
      />
      <circle className="pshot__ring-track" cx="341" cy="185" r="18" />
      <circle
        className="pshot__ring"
        cx="341"
        cy="185"
        r="18"
        style={{ '--i': 4, '--ring-c': 2 * Math.PI * 18, '--ring-pct': 0.4 }}
      />
    </g>
  )
}

const KINDS = {
  chart: ChartContent,
  map: MapContent,
  list: ListContent,
  grid: GridContent,
  dashboard: DashboardContent,
}

/**
 * Stand-in for a real product screenshot: an illustrated, tone-matched app
 * mockup drawn in SVG so it never needs an actual asset. Bars/lines/pins
 * animate in the first time it scrolls into view (skipped under
 * prefers-reduced-motion via useInView).
 */
export default function ProductShot({ tone = 'build', kind = 'dashboard', className = '' }) {
  const [ref, inView] = useInView()
  const Content = KINDS[kind] || DashboardContent

  return (
    <div ref={ref} className={`pshot pshot--${tone}${inView ? ' is-in' : ''} ${className}`}>
      <svg className="pshot__svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect className="pshot__bg" x="0" y="0" width="400" height="240" />
        {CHROME}
        <Content />
      </svg>
    </div>
  )
}
