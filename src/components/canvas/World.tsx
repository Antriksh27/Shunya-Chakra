'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Environment } from '@react-three/drei';
import { Tablet } from './Tablet';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function World() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#1c1a17]">
      <Canvas
        shadows
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 10], fov: 45 }}
      >
        <color attach="background" args={['#1c1a17']} />
        <fogExp2 attach="fog" args={['#1c1a17', 0.04]} />
        
        <ambientLight intensity={0.5} color="#c8beaf" />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#f59e0b" castShadow />

        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <ScrollCamera />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function ScrollCamera() {
  const { camera } = useThree();

  useEffect(() => {
    // When the user scrolls, push the camera deeper into the scene
    const ctx = gsap.context(() => {
      gsap.to(camera.position, {
        z: -15, // Move deep into the void
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5, // Smooth scrubbing
        },
      });
    });

    return () => ctx.revert();
  }, [camera]);

  return null;
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Slow breathing movement for the camera to make it feel alive, stacked on top of scroll position
  useFrame((state) => {
    // We add a tiny offset to the current camera position, so it doesn't overwrite the GSAP scroll position
    const time = state.clock.elapsedTime;
    camera.position.y = Math.sin(time * 0.2) * 0.2;
    camera.position.x = Math.cos(time * 0.1) * 0.3;
    camera.lookAt(0, 0, -5); // Look at the chakra
  });

  return (
    <group ref={groupRef}>
      {/* Dust particles (Sparkles) */}
      <Sparkles count={300} scale={20} size={1.5} speed={0.1} opacity={0.15} color="#d97706" />
      


      {/* Procedural carved tablets scattered along the scroll path */}
      <Tablet position={[-6, -1, -12]} rotation={[0, Math.PI / 4, 0]} isWood={true} />
      <Tablet position={[6, 2, -18]} rotation={[0, -Math.PI / 6, 0]} isWood={false} />
      <Tablet position={[-4, -3, -25]} rotation={[0, Math.PI / 8, 0]} isWood={true} />
    </group>
  );
}
