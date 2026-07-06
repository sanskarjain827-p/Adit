import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/* Aceternity "Hero Parallax" — verbatim animation: three rows of cards
   that tilt in 3D and pan in opposite directions as you scroll through a
   300vh section. Ported from Tailwind to this project's plain CSS. */

const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

function ProductCard({ product, translate }) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="hpx-card"
    >
      <img
        src={product.img}
        className="hpx-card-img"
        alt={product.title}
        loading="lazy"
      />
      <div className="hpx-card-veil" />
      <h2 className="hpx-card-title">{product.title}</h2>
    </motion.div>
  )
}

export default function HeroParallax({ items }) {
  const firstRow = items.slice(0, 5)
  const secondRow = items.slice(5, 10)
  const thirdRow = items.slice(10, 15)
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig,
  )

  return (
    <div ref={ref} className="hpx">
      <div className="hpx-head">
        <h2 className="hpx-title">
          Built by a small team.
          <br />
          Used by people everywhere.
        </h2>
        <p className="hpx-lede">
          A look at the interfaces, dashboards, and products we've shipped.
          Scroll to see them settle into place.
        </p>
      </div>

      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="hpx-stage"
      >
        <motion.div className="hpx-row hpx-row-reverse">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="hpx-row">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="hpx-row hpx-row-reverse">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
