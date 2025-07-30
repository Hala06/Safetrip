'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function GlobeModel() {
  const ref = useRef<THREE.Group>(null)
  
  // Load your globe.glb file
  const { scene } = useGLTF('/globe.glb')
  
  // Rotate the globe
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005 // Slow rotation
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 // Gentle wobble
    }
  })

  return (
    <group ref={ref}>
      <primitive object={scene} scale={1.5} />
    </group>
  )
}

function Lights() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.4} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
      />
      
      {/* Secondary light for fill */}
      <directionalLight
        position={[-5, 5, 5]}
        intensity={0.6}
      />
      
      {/* Point light for highlight */}
      <pointLight
        position={[0, 5, 0]}
        intensity={0.8}
        color="#ffffff"
      />
    </>
  )
}

export default function Globe3D({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Lights />
          <GlobeModel />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minDistance={3}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload('/globe.glb')
