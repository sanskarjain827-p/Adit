import { useReveal } from '../hooks/useReveal.js'

// Arrow that fades up on hover — ported from Skiper40 Link001 (Tailwind → our CSS).
function Arrow() {
  return (
    <svg
      className="footer-arrow"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Footer({ onContact }) {
  const [ref, shown] = useReveal(0.15)

  return (
    <footer ref={ref} className={`site-footer ${shown ? 'hp-in' : ''}`}>
      <div className="footer-cta">
        <h2 className="footer-headline">
          Let&rsquo;s build
          <br />
          your product.
        </h2>
        <button type="button" className="pill footer-pill" onClick={onContact}>
          Start a project
        </button>
      </div>

      <div className="footer-bottom">
        <a className="footer-link" href="mailto:hello@insyd.studio">
          hello@insyd.studio
          <Arrow />
        </a>
        <span className="footer-copy">© {new Date().getFullYear()} Insyd</span>
      </div>
    </footer>
  )
}
