import { Link } from 'react-router-dom'
import './Footer.css'

const cols = [
  {
    head: 'Build',
    tone: 'build',
    to: '/build',
    items: ['Web apps', 'Mobile apps', 'ML models', 'AI / deep learning'],
  },
  {
    head: 'Manage',
    tone: 'manage',
    to: '/manage',
    items: ['Security', 'Databases', 'System design', 'UI / UX'],
  },
  {
    head: 'Company',
    tone: 'neutral',
    items: [
      { label: 'Work', to: '/work' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <Link className="nav__brand" to="/" aria-label="Insyd home">
            <span className="nav__mark" aria-hidden="true">I</span>
            <span className="nav__name">Insyd</span>
          </Link>
          <p className="footer__tag">Build it, or run it.</p>
        </div>

        <div className="footer__cols">
          {cols.map((c) => (
            <div key={c.head} className="footer__col">
              <p className={`footer__head footer__head--${c.tone}`}>{c.head}</p>
              <ul>
                {c.items.map((i) => {
                  const label = typeof i === 'string' ? i : i.label
                  const to = typeof i === 'string' ? c.to : i.to
                  return (
                    <li key={label}>
                      <Link to={to}>{label}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap footer__bar">
        <span>© {new Date().getFullYear()} Insyd</span>
        <span>Build · Manage · Work · Contact</span>
      </div>
    </footer>
  )
}
