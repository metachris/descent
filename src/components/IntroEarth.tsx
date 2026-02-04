import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useJourney } from '../hooks/useJourney'

// Ground surface with tunnel hole
function TunnelScene() {
  // Create rings descending into the tunnel for depth
  const rings = Array.from({ length: 12 }, (_, i) => ({
    depth: i * 0.8,
    radius: 2.5 - i * 0.15,
    opacity: 1 - i * 0.07,
  }))

  return (
    <group>
      {/* Ground plane - rocky earth surface */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#3d3022"
          roughness={0.95}
          metalness={0.1}
        />
      </mesh>

      {/* Darker earth ring around hole */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[2.5, 6, 64]} />
        <meshStandardMaterial
          color="#2a2018"
          roughness={1}
        />
      </mesh>

      {/* Tunnel hole - black void */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[2.5, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Depth rings inside tunnel */}
      {rings.map((ring, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -ring.depth, 0]}
        >
          <ringGeometry args={[ring.radius - 0.1, ring.radius, 64]} />
          <meshBasicMaterial
            color="#1a1510"
            transparent
            opacity={ring.opacity * 0.5}
          />
        </mesh>
      ))}

      {/* Subtle glow from below - hint of what's to come */}
      <pointLight
        position={[0, -10, 0]}
        intensity={0.5}
        color="#ff6b35"
        distance={20}
      />

      {/* Ambient rocks/debris around the edge */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const dist = 3 + Math.random() * 0.5
        return (
          <mesh
            key={`rock-${i}`}
            position={[
              Math.cos(angle) * dist,
              0.1 + Math.random() * 0.2,
              Math.sin(angle) * dist,
            ]}
            rotation={[
              Math.random() * 0.5,
              Math.random() * Math.PI,
              Math.random() * 0.5,
            ]}
          >
            <boxGeometry args={[
              0.3 + Math.random() * 0.4,
              0.2 + Math.random() * 0.3,
              0.3 + Math.random() * 0.4,
            ]} />
            <meshStandardMaterial
              color="#4a3c2a"
              roughness={1}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Camera that starts looking at the hole, then dives in
function AnimatedCamera() {
  const { camera } = useThree()
  const { progress, duration } = useJourney()
  const currentTime = progress * duration

  useFrame(() => {
    // 0-10s: The Edge - standing, looking at the hole
    // 10-14s: The Plunge - diving in

    if (currentTime < 10) {
      // Standing at edge, slightly looking down at the hole
      const breathe = Math.sin(currentTime * 0.5) * 0.05 // Subtle breathing motion
      camera.position.set(0, 2 + breathe, 4)
      camera.lookAt(0, -1, 0)
    } else if (currentTime < 14) {
      // Diving into the hole
      const t = (currentTime - 10) / 4
      const eased = t * t * t // Accelerating

      // Move forward and down
      const y = 2 - eased * 10 // 2 -> -8
      const z = 4 - eased * 4 // 4 -> 0

      camera.position.set(0, y, z)
      camera.lookAt(0, y - 3, 0) // Always looking down
    } else {
      // Fully in the tunnel
      camera.position.set(0, -10, 0)
      camera.lookAt(0, -20, 0)
    }
  })

  return null
}

// Scene wrapper
function Scene() {
  return (
    <>
      {/* Dark ambient */}
      <ambientLight intensity={0.2} />

      {/* Overhead light - like standing outside */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.6}
        color="#e8e4e0"
      />

      {/* Subtle fill from the void below */}
      <hemisphereLight
        args={['#1a1510', '#000000', 0.3]}
      />

      <TunnelScene />
      <AnimatedCamera />
    </>
  )
}

// Main component with fade logic
export default function IntroEarth() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration

  // Fade out as we dive in (12-15s)
  const fadeStart = 12
  const fadeEnd = 15

  let opacity = 1
  if (currentTime >= fadeStart && currentTime < fadeEnd) {
    opacity = 1 - (currentTime - fadeStart) / (fadeEnd - fadeStart)
  } else if (currentTime >= fadeEnd) {
    opacity = 0
  }

  // Don't render once fully faded
  if (opacity <= 0) return null

  return (
    <div
      className="absolute inset-0"
      style={{
        opacity,
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 4], fov: 60 }}
        gl={{ antialias: true }}
        style={{ background: '#0a0806' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
