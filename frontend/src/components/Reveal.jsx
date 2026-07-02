import useInView from '../hooks/useInView.js'

/**
 * Wraps an element so it fades / slides into place the first time it enters
 * the viewport. Renders the tag you pass via `as` (default <div>), so it can
 * stand in for an existing element without changing the DOM shape — e.g.
 * `<Reveal as={Link} to="/work" className="card">`.
 *
 * variant: 'up' | 'left' | 'right' | 'scale' | 'fade'
 * delay:   ms before this element animates (use to stagger siblings)
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInView()
  const classes = [
    'reveal',
    `reveal--${variant}`,
    inView ? 'is-in' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
