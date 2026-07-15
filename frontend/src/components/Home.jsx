import { useReveal } from '../hooks/useReveal.js'
import Principles from './Principles.jsx'
import HeroParallax from './HeroParallax.jsx'
import FocusGallery from './FocusGallery.jsx'

const parallaxNames = [
  'Quanta', 'Playhouse', 'Fieldnote', 'bardo', 'Crusade', 'Windmark',
  'relay', 'Somnia', 'Meridian', 'WAKEFUL', 'Fanfare', 'atoms.',
  'Lumen', 'Aster', 'Route',
]

const parallaxItems = parallaxNames.map((title, i) => ({
  title,
  img: `/images/parallax/p${i + 1}.jpg`,
}))

const focusAreas = [
  {
    title: 'Take a product\nfrom zero to one',
    body: "From a napkin sketch or a validated idea, we shape, prototype, and build full-stack web and mobile products.",
    img: '/images/intro.jpg',
  },
  {
    title: 'Design experiences\nworth remembering',
    body: 'Interfaces are the start, not the whole job. We design the product around them, built to scale with how users behave.',
    img: '/images/close.jpg',
  },
  {
    title: 'Keep the product\ngrowing after launch',
    body: 'Shipping is day one. We run the content, social presence, and custom ML models that keep a launched product growing.',
    img: '/images/growth.jpg',
  },
]

const stats = [
  { label: 'Views\ngenerated', value: '500M+' },
  { label: 'Followers\ngained', value: '1M+' },
  { label: 'Brands\nscaled', value: '10+' },
]

const serviceGroups = [
  {
    name: 'Design & UX',
    items: ['UI/UX Design', 'Design Systems', 'Brand Identity', 'Ideation & Prototyping'],
  },
  {
    name: 'Engineering',
    items: ['Full Stack Engineering', 'Frontend Development', 'Backend Development', 'Mobile Development'],
  },
  {
    name: 'Growth & AI',
    items: ['Social Media Management', 'Content & Community Growth', 'Custom ML & DL Models'],
  },
]

function ServiceGroup({ group, i }) {
  const [ref, shown] = useReveal()
  return (
    <div
      ref={ref}
      className={`service-group ${shown ? 'service-in' : ''}`}
      style={{ transitionDelay: `${i * 0.08}s` }}
    >
      <h4 className="service-name">{group.name}</h4>
      <ul className="service-list">
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Home({ onTalk, onWork }) {
  const [whatRef, whatShown] = useReveal()
  const [servicesRef, servicesShown] = useReveal(0.1)
  const [closeRef, closeShown] = useReveal()
  const [statsRef, statsShown] = useReveal(0.1)

  return (
    <main className="homepage">
      <section className="hp-hero">
        <p className="hp-hero-text">
          We build your product, design it, train the models behind it, and
          run the social presence that grows it, one team from start to finish.
        </p>
      </section>

      <HeroParallax items={parallaxItems} />

      <section ref={whatRef} className={`hp-what ${whatShown ? 'hp-in' : ''}`}>
        <h2>What we do</h2>
      </section>

      <section className="hp-rows">
        <FocusGallery items={focusAreas} />
      </section>

      <section ref={servicesRef} className={`hp-services ${servicesShown ? 'hp-in' : ''}`}>
        {serviceGroups.map((group, i) => (
          <ServiceGroup key={group.name} group={group} i={i} />
        ))}
      </section>

      <section ref={closeRef} className={`hp-closer ${closeShown ? 'hp-in' : ''}`}>
        <div className="hp-closer-art">
          <img
            className="frame-img"
            src="/images/close.jpg"
            alt="Design wireframes and product sketches"
            loading="lazy"
          />
        </div>
      </section>

      <Principles onWork={onWork} />

      <section ref={statsRef} className={`hp-stats ${statsShown ? 'hp-in' : ''}`}>
        <h2 className="hp-stats-title">Numbers that speak louder than pitches</h2>
        <div className="hp-stats-grid">
          {stats.map((s) => (
            <div key={s.value} className="stat-cell">
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
