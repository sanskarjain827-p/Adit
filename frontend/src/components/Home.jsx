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
  const [introRef, introShown] = useReveal()
  const [whatRef, whatShown] = useReveal()
  const [servicesRef, servicesShown] = useReveal(0.1)
  const [closeRef, closeShown] = useReveal()

  return (
    <main className="homepage">
      <section className="hp-hero">
        <p className="hp-hero-text">
          We build your product, design it, train the models behind it, and
          run the social presence that grows it, one team from start to finish.
        </p>
      </section>

      <section ref={introRef} className={`hp-intro ${introShown ? 'hp-in' : ''}`}>
        <div className="hp-intro-art">
          <img
            className="frame-img"
            src="/images/intro.jpg"
            alt="Our team collaborating on a product build"
            loading="lazy"
          />
        </div>
        <p className="hp-intro-text">
          We've helped shape the technology landscape by partnering with
          diverse businesses to bring innovative ideas to life. Our expertise
          spans across product development, design, and AI model training,
          ensuring every aspect of your project is handled with precision and
          creativity. We don't just stop at building, we also manage the
          social presence that elevates your brand, creating a cohesive
          strategy that drives growth. Whether you're a startup or an
          established company, our team is dedicated to delivering
          end-to-end solutions that meet your unique needs. Connect with us
          to transform your vision into reality.
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
    </main>
  )
}
