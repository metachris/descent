import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { LAYERS } from '../data/content'

interface EarthProps {
  progress: number
}

export default function Earth({ progress }: EarthProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cutawayAngle = Math.PI * 0.25 // Quarter cutaway

  // Create layer materials
  const layerMaterials = useMemo(() => {
    return LAYERS.map(layer =>
      new THREE.MeshStandardMaterial({
        color: layer.color,
        emissive: layer.name === 'Inner Core' ? layer.color : '#000000',
        emissiveIntensity: layer.name === 'Inner Core' ? 0.5 : 0,
        metalness: layer.name.includes('Core') ? 0.8 : 0.2,
        roughness: layer.name.includes('Core') ? 0.2 : 0.8,
      })
    )
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Subtle rotation
      groupRef.current.rotation.y += 0.001
    }
  })

  // Calculate radii for each layer (normalized to 1-3 range for visibility)
  const maxRadius = 3
  const earthRadius = 6371 // km

  // Core glow intensity based on progress (brighter as you get closer)
  const coreGlowIntensity = 0.5 + progress * 0.5

  return (
    <group ref={groupRef}>
      {LAYERS.map((layer, index) => {
        const radius = maxRadius * (1 - layer.startDepth / earthRadius)

        return (
          <mesh key={layer.name}>
            <sphereGeometry
              args={[
                radius,
                64,
                64,
                0,
                Math.PI * 2 - cutawayAngle,
                0,
                Math.PI
              ]}
            />
            <primitive object={layerMaterials[index]} attach="material" />
          </mesh>
        )
      })}

      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial
          color="#ff9f43"
          transparent
          opacity={coreGlowIntensity}
        />
      </mesh>
    </group>
  )
}
