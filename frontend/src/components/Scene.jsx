// Full-screen background art per project. All scenes are original
// CSS/SVG compositions — placeholders until real case-study art exists.

function MapScene() {
  const streets = []
  for (let i = 0; i < 14; i++) {
    streets.push(
      <line key={`v${i}`} x1={i * 110 + 30} y1="0" x2={i * 110 - 60} y2="900" />,
    )
  }
  for (let i = 0; i < 10; i++) {
    streets.push(
      <line key={`h${i}`} x1="0" y1={i * 100 + 20} x2="1440" y2={i * 100 - 40} />,
    )
  }
  return (
    <svg className="scene-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <rect width="1440" height="900" fill="#141414" />
      <g stroke="#2b2b2b" strokeWidth="10" strokeLinecap="round">{streets}</g>
      <g stroke="#232323" strokeWidth="26" strokeLinecap="round">
        <line x1="380" y1="0" x2="240" y2="900" />
        <line x1="0" y1="620" x2="1440" y2="500" />
        <line x1="1050" y1="0" x2="960" y2="900" />
      </g>
      <g fill="#3a3a3a" fontSize="15" fontFamily="Inter, sans-serif" opacity="0.9">
        <text x="180" y="180" transform="rotate(-5 180 180)">Fulton St</text>
        <text x="880" y="320" transform="rotate(85 880 320)">9th St</text>
        <text x="420" y="700" transform="rotate(-5 420 700)">Oak St</text>
        <text x="1150" y="520" transform="rotate(-5 1150 520)">Howard St</text>
      </g>
    </svg>
  )
}

function DriftScene() {
  return (
    <svg className="scene-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <rect width="1440" height="900" fill="#28455e" />
      <circle cx="1030" cy="450" r="720" fill="#6b5c10" />
      <g stroke="#243043" strokeWidth="34" strokeLinecap="round" fill="none">
        <path d="M600 240 a230 230 0 0 0 220 60" opacity="0.9" />
        <path d="M640 130 a95 95 0 0 0 30 130" />
        <path d="M800 110 a95 95 0 0 0 -10 132" />
      </g>
    </svg>
  )
}

function EchoScene() {
  const bars = []
  for (let i = 0; i < 48; i++) {
    const h = 120 + Math.abs(Math.sin(i * 0.55)) * 420
    bars.push(
      <rect key={i} x={i * 30 + 8} y={(900 - h) / 2} width="12" rx="6" height={h} />,
    )
  }
  return (
    <svg className="scene-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <rect width="1440" height="900" fill="#120a16" />
      <g fill="#a05be6" opacity="0.35">{bars}</g>
    </svg>
  )
}

export default function Scene({ id, style }) {
  return (
    <div className={`scene scene-${id}`} style={style}>
      {id === 'route' && <MapScene />}
      {id === 'drift' && <DriftScene />}
      {id === 'echo' && <EchoScene />}
      {id === 'default' && (
        <>
          <div className="blade blade-a" />
          <div className="blade blade-b" />
          <div className="blade blade-c" />
          <div className="blade blade-d" />
        </>
      )}
      {id === 'lumen' && <div className="torus" />}
      {id === 'aster' && (
        <>
          <div className="blob blob-a" />
          <div className="blob blob-b" />
          <div className="blob blob-c" />
        </>
      )}
    </div>
  )
}
