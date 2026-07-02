import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import FloatingShapes from './FloatingShapes.jsx'
import useHero3DEnabled from '../hooks/useHero3DEnabled.js'
import './Hero3D.css'

/* Faceted rust gem with an idle spin plus a gentle lerp toward the pointer.
   Pointer is tracked on window (not via r3f's canvas-local pointer) because
   the canvas stays pointer-events:none so it never steals clicks from the
   hero cards/CTAs layered above it. */
function Gem({ pointerRef }) {
  const groupRef = useRef(null)

  useFrame((_state, delta) => {
    const group = groupRef.current
    if (!group) return
    group.rotation.y += delta * 0.16
    group.rotation.x += (pointerRef.current.y * 0.3 - group.rotation.x) * Math.min(delta * 2, 1)
    group.rotation.z += (pointerRef.current.x * -0.16 - group.rotation.z) * Math.min(delta * 2, 1)
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial color="#e08654" roughness={0.4} metalness={0.18} flatShading />
      </mesh>
    </group>
  )
}

function Scene() {
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return (
    <>
      <ambientLight intensity={0.55} color="#f6e3d2" />
      <pointLight position={[3, 3, 4]} intensity={70} color="#f6e3d2" />
      <pointLight position={[-3.5, -1.5, -2]} intensity={90} color="#5fc298" />
      <Gem pointerRef={pointerRef} />
    </>
  )
}

/**
 * Scoped WebGL hero accent — one soft-lit 3D object, not a full scene.
 * Bails out to the static CSS FloatingShapes under prefers-reduced-motion
 * and below the mobile breakpoint, so low-end/touch devices never pay for
 * a WebGL context at all — same fallback contract as useScrollPin.js.
 */
export default function Hero3D() {
  const enabled = useHero3DEnabled()

  if (!enabled) return <FloatingShapes />

  return (
    <div className="hero3d" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
