import { logoWall } from '../data/projects.js'

function PhoneScreen({ card }) {
  const fg = card.light ? '#111' : '#fff'
  return (
    <div className="phone-screen" style={{ background: card.screenBg, color: fg }}>
      <div className="phone-status">
        <span>9:41</span>
        <span className="phone-dot" style={{ background: card.accent }} />
      </div>
      <div className="phone-heading">
        {card.heading}
        <br />
        <em style={{ color: card.accent }}>{card.sub}</em>
      </div>
      {card.chart && (
        <svg className="phone-chart" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path
            d="M0 34 L12 30 L22 32 L34 22 L46 26 L58 14 L70 18 L82 8 L100 12"
            fill="none"
            stroke={card.accent}
            strokeWidth="2"
          />
        </svg>
      )}
      {card.wave && (
        <div className="phone-wave">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              style={{
                background: card.accent,
                height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%`,
              }}
            />
          ))}
        </div>
      )}
      {card.map && (
        <div className="phone-map">
          <svg viewBox="0 0 100 70" preserveAspectRatio="none">
            <rect width="100" height="70" fill="#e8e6e1" />
            <g stroke="#cfccc4" strokeWidth="2">
              <line x1="20" y1="0" x2="14" y2="70" />
              <line x1="55" y1="0" x2="50" y2="70" />
              <line x1="85" y1="0" x2="82" y2="70" />
              <line x1="0" y1="22" x2="100" y2="18" />
              <line x1="0" y1="48" x2="100" y2="44" />
            </g>
            <path d="M18 60 L52 46 L80 20" fill="none" stroke="#111" strokeWidth="2.5" />
            <circle cx="80" cy="20" r="4" fill="#111" />
          </svg>
        </div>
      )}
      {card.rings && (
        <div className="phone-rings">
          <span style={{ borderColor: card.accent }} />
          <span style={{ borderColor: '#4f7bf7' }} />
          <span style={{ borderColor: '#ff5d73' }} />
        </div>
      )}
      {card.sunny && (
        <svg className="phone-sunny" viewBox="0 0 100 60" preserveAspectRatio="none">
          <circle cx="25" cy="55" r="22" fill="#4f9cf7" />
          <circle cx="55" cy="58" r="26" fill="#fff" opacity="0.9" />
          <circle cx="82" cy="54" r="20" fill={card.accent} />
        </svg>
      )}
      {card.article && (
        <div className="phone-article">
          <span />
          <span />
          <span style={{ width: '62%' }} />
        </div>
      )}
    </div>
  )
}

export default function PreviewCard({ project }) {
  if (!project) return null
  if (project.id === 'allwork') {
    return (
      <div className="preview-card logo-card">
        {logoWall.slice(0, 21).map((name) => (
          <span key={name} className="logo-cell">
            {name}
          </span>
        ))}
      </div>
    )
  }
  const { card } = project
  return (
    <div className="preview-card" style={{ background: card.backdrop }}>
      {card.kind === 'monitor' ? (
        <div className="monitor">
          <div className="monitor-screen" style={{ background: card.screenBg }}>
            <div className="monitor-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    background: `linear-gradient(140deg, ${card.accent}, #b03a2e)`,
                    opacity: 0.55 + (i % 3) * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="monitor-stand" />
          <div className="monitor-base" />
        </div>
      ) : (
        <div className="phone">
          <div className="phone-notch" />
          <PhoneScreen card={card} />
        </div>
      )}
    </div>
  )
}
