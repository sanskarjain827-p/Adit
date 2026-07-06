export default function MenuOverlay({ open, onClose, onNavigate }) {
  return (
    <div className={`menu-overlay ${open ? 'open' : ''}`}>
      <button className="pill menu-close" onClick={onClose}>
        Close
      </button>
      <nav className="menu-nav">
        <button onClick={() => onNavigate('home')}>Home</button>
        <button onClick={() => onNavigate('showcase')}>Work</button>
        <button onClick={() => onNavigate('contact')}>Talk to Us</button>
      </nav>
      <p className="menu-foot">
        Insyd, we build web &amp; mobile apps, manage social media, and
        build ML/DL models.
      </p>
    </div>
  )
}
