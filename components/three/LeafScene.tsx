import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../lib/device'

const LEAF_COLOURS = ['#a7d16a', '#c3dc93', '#89a748', '#b9dd85']

/** A single stylised leaf outline, reused by every instance. */
function makeLeafGeometry() {
  const shape = new THREE.Shape()
  shape.moveTo(0, -0.9)
  shape.bezierCurveTo(0.62, -0.34, 0.78, 0.42, 0, 1.05)
  shape.bezierCurveTo(-0.78, 0.42, -0.62, -0.34, 0, -0.9)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.045,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.035,
    bevelSegments: 2,
    curveSegments: 24,
  })
  geo.center()
  return geo
}

type Seed = {
  pos: THREE.Vector3
  rot: THREE.Euler
  spin: THREE.Vector3
  scale: number
  drift: number
  phase: number
  colour: THREE.Color
}

function Leaves({ count = 34, reduced = false }: { count?: number; reduced?: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const geometry = useMemo(() => makeLeafGeometry(), [])
  const { size } = useThree()
  // Narrow viewports get proportionally smaller leaves, or they swamp the copy
  const sizeFactor = THREE.MathUtils.clamp(size.width / 1200, 0.42, 1.1)

  const seeds = useMemo<Seed[]>(() => {
    // Deterministic pseudo-random so the composition is stable between reloads
    let s = 8_675_309
    const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)
    return Array.from({ length: count }, () => ({
      pos: new THREE.Vector3((rnd() - 0.5) * 18, (rnd() - 0.5) * 10, (rnd() - 0.5) * 8 - 2.5),
      rot: new THREE.Euler(rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI),
      spin: new THREE.Vector3((rnd() - 0.5) * 0.32, (rnd() - 0.5) * 0.4, (rnd() - 0.5) * 0.22),
      scale: 0.22 + rnd() * 0.46,
      drift: 0.18 + rnd() * 0.5,
      phase: rnd() * Math.PI * 2,
      colour: new THREE.Color(LEAF_COLOURS[Math.floor(rnd() * LEAF_COLOURS.length)]),
    }))
  }, [count])

  useFrame(({ clock }) => {
    const t = reduced ? 0 : clock.getElapsedTime()
    seeds.forEach((seed, i) => {
      const y = seed.pos.y + Math.sin(t * seed.drift + seed.phase) * 0.9
      const x = seed.pos.x + Math.cos(t * seed.drift * 0.7 + seed.phase) * 0.55
      dummy.position.set(x, y, seed.pos.z)
      dummy.rotation.set(
        seed.rot.x + t * seed.spin.x,
        seed.rot.y + t * seed.spin.y,
        seed.rot.z + t * seed.spin.z,
      )
      dummy.scale.setScalar(seed.scale * sizeFactor)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
      mesh.current.setColorAt(i, seed.colour)
    })
    mesh.current.instanceMatrix.needsUpdate = true
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial
        roughness={0.38}
        metalness={0}
        side={THREE.DoubleSide}
        transparent
        opacity={0.88}
      />
    </instancedMesh>
  )
}

/** Slow field of drifting motes — the "ink" specks behind the leaves. */
function Motes({ count = 420, reduced = false }: { count?: number; reduced?: boolean }) {
  const points = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    let s = 1_234_567
    const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rnd() - 0.5) * 22
      arr[i * 3 + 1] = (rnd() - 0.5) * 13
      arr[i * 3 + 2] = (rnd() - 0.5) * 10 - 3
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (reduced) return
    const t = clock.getElapsedTime()
    points.current.rotation.y = t * 0.028
    points.current.rotation.x = Math.sin(t * 0.09) * 0.06
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        color="#c3dc93"
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  )
}

/** Camera follows the pointer for a gentle parallax. */
function PointerParallax({ reduced }: { reduced: boolean }) {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame(({ pointer }) => {
    if (reduced) return
    target.current.x += (pointer.x * 0.9 - target.current.x) * 0.035
    target.current.y += (pointer.y * 0.55 - target.current.y) * 0.035
    camera.position.x = target.current.x
    camera.position.y = target.current.y
    camera.lookAt(0, 0, 0)
  })
  return null
}

export function LeafScene({ className = '' }: { className?: string }) {
  const reduced = prefersReducedMotion()
  const host = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(true)

  // Stop rendering once the hero scrolls away or the tab is hidden — there is
  // no reason to hold the GPU busy for a canvas nobody is looking at.
  useEffect(() => {
    const el = host.current
    if (!el) return
    let onScreen = true
    const sync = () => setLive(onScreen && !document.hidden)

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sync()
      },
      { rootMargin: '120px' },
    )
    io.observe(el)
    document.addEventListener('visibilitychange', sync)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return (
    <div className={className} ref={host}>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={live && !reduced ? 'always' : 'demand'}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#0a3568', 13, 30]} />
          <ambientLight intensity={1.35} />
          <directionalLight position={[4, 6, 8]} intensity={2.6} color="#ffffff" />
          <directionalLight position={[-5, -3, 4]} intensity={1.1} color="#c3dc93" />
          <pointLight position={[-6, -2, 5]} intensity={45} color="#a7d16a" distance={24} />
          <pointLight position={[6, 3, -1]} intensity={30} color="#2f7ac2" distance={26} />
          <Leaves reduced={reduced} />
          <Motes reduced={reduced} />
          <PointerParallax reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  )
}
