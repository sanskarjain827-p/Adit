import './DeviceFrame.css'

/**
 * Photo-realistic device chrome (browser or phone) for case-study visuals.
 * Renders a real screenshot when `image` is supplied; otherwise renders
 * `children` (the existing SVG/CSS mockup content) inside the same frame —
 * so a real Standix screenshot can be dropped in later without touching
 * any layout code, and nothing here fabricates a screenshot that doesn't
 * exist yet.
 */
export default function DeviceFrame({
  variant = 'browser',
  tone,
  label,
  image,
  alt = '',
  className = '',
  children,
}) {
  const toneClass = tone ? ` dframe--${tone}` : ''

  return (
    <div className={`dframe dframe--${variant}${toneClass} ${className}`}>
      {variant === 'browser' && (
        <div className="dframe__bar">
          <span className="dframe__dots" aria-hidden="true">
            <i /><i /><i />
          </span>
          {label && <span className="dframe__url">{label}</span>}
        </div>
      )}
      {variant === 'phone' && <div className="dframe__notch" aria-hidden="true" />}
      <div className="dframe__screen">
        {image ? <img className="dframe__img" src={image} alt={alt} /> : children}
      </div>
      <span className="dframe__sheen" aria-hidden="true" />
    </div>
  )
}
