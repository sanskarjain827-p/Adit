import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Nav.css'

const links = [
  { label: 'Build', to: '/build', tone: 'build' },
  { label: 'Manage', to: '/manage', tone: 'manage' },
  { label: 'Work', to: '/work', tone: 'neutral' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav${open ? ' nav--open' : ''}`}>
      <div className="wrap nav__inner">
        <Link className="nav__brand" to="/" aria-label="Insyd home">
          <span className="nav__mark" aria-hidden="true">I</span>
          <span className="nav__name">Insyd</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={`nav__link nav__link--${l.tone}`}
            >
              {l.tone !== 'neutral' && (
                <span className="nav__dot" aria-hidden="true" />
              )}
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link className="btn btn--solid nav__cta" to="/contact">
          Talk to us
        </Link>

        <button
          type="button"
          className="nav__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className="nav__sheet"
        id="mobile-menu"
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <nav className="nav__sheet-inner" aria-label="Mobile">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={`nav__sheet-link nav__link--${l.tone}`}
            >
              {l.tone !== 'neutral' && (
                <span className="nav__dot" aria-hidden="true" />
              )}
              {l.label}
            </NavLink>
          ))}
          <Link className="btn btn--solid nav__sheet-cta" to="/contact">
            Talk to us
          </Link>
        </nav>
      </div>
    </header>
  )
}
