import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Earth from './Earth'
import { useJourney } from '../hooks/useJourney'

export default function Experience() {
  const { progress } = useJourney()
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    // Camera animation will be driven by Theatre.js
  })

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      {/* Core glow light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        color="#ff9f43"
        distance={5}
      />

      {/* Earth */}
      <Earth progress={progress} />

      {/* Dev controls - remove in production */}
      <OrbitControls enableZoom={true} enablePan={false} />
    </group>
  )
}
