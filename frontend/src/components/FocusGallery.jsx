import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

function titleLines(title) {
  return title.split('\n').map((line, i) => <span key={i}>{line}</span>)
}

/* MetaLab-style row: collapsed shows only the serif title; the active
   (hovered) row expands, tints, wipes its centered media in with a
   slanted clip-path, and fades the description up. */
function FocusRow({ item, active, onActivate }) {
  const [ref, shown] = useReveal(0.15)
  return (
    <article
      ref={ref}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
      className={`focus-row ${shown ? 'focus-in' : ''} ${active ? 'focus-active' : ''}`}
    >
      <h3 className="focus-title">{titleLines(item.title)}</h3>
      <div className="focus-media">
        <figure className="focus-media-frame">
          <img src={item.img} alt="" loading="lazy" />
        </figure>
      </div>
      <p className="focus-body">{item.body}</p>
    </article>
  )
}

export default function FocusGallery({ items }) {
  // null = no row hovered, so no image shows. Reset on leaving the whole list.
  const [active, setActive] = useState(null)
  return (
    <div className="focus-rows" onMouseLeave={() => setActive(null)}>
      {items.map((item, i) => (
        <FocusRow
          key={i}
          item={item}
          active={i === active}
          onActivate={() => setActive(i)}
        />
      ))}
    </div>
  )
}
