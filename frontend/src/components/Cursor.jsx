import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING = { mass: 0.1, damping: 10, stiffness: 131 }
const SIZE = 20

/* Global mouse-follow cursor: native cursor hidden (styles.css), a small
   dot springs toward the pointer. Pointer-fine devices only. */
export default function Cursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const x = useSpring(-100, SPRING)
  const y = useSpring(-100, SPRING)
  const opacity = useSpring(0, SPRING)

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => {
      x.set(e.clientX - SIZE / 2)
      y.set(e.clientY - SIZE / 2)
      opacity.set(1)
    }
    const onLeave = () => opacity.set(0)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, x, y, opacity])

  if (!enabled) return null
  return (
    <motion.div
      className="cursor"
      aria-hidden
      style={{ x, y, opacity, width: SIZE, height: SIZE }}
    />
  )
}
