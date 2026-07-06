import { useEffect, useRef } from 'react'
import Logo from './Logo.jsx'

const SHRINK_RANGE = 140
const EASE = 0.16

export default function Header({ onMenu, onLogo, onContact, floating }) {
  const headerRef = useRef(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    if (!floating) {
      el.style.setProperty('--p', 0)
      return
    }

    let target = Math.min(1, Math.max(0, window.scrollY / SHRINK_RANGE))
    let current = target
    let raf = 0

    const onScroll = () => {
      target = Math.min(1, Math.max(0, window.scrollY / SHRINK_RANGE))
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const tick = () => {
      current += (target - current) * EASE
      if (Math.abs(target - current) < 0.001) current = target
      el.style.setProperty('--p', current.toFixed(4))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [floating])

  return (
    <header ref={headerRef} className="header">
      <button className="pill menu-btn" onClick={onMenu}>
        Menu
      </button>
      <button className="logo" onClick={onLogo} aria-label="Insyd home">
        <Logo />
      </button>
      <div className="header-right">
        <button className="icon-btn" onClick={onContact} aria-label="Talk to us">
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <rect x="0.5" y="0.5" width="13" height="10" rx="1.5" stroke="currentColor" />
            <path d="M1 1.5L7 6L13 1.5" stroke="currentColor" />
          </svg>
        </button>
      </div>
    </header>
  )
}
