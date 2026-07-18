'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Float } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

export function Chakra() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const ctx = gsap.context(() => {
      // Rotate the Chakra based on scroll
      gsap.to(groupRef.current!.rotation, {
        z: -Math.PI * 2, // Full rotation over the page scroll
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Material for the ancient stone look
  const stoneMaterial = new THREE.MeshStandardMaterial({
    color: '#2a2520',
    roughness: 0.9,
    metalness: 0.1,
    envMapIntensity: 0.5
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} position={[0, 0, -8]} rotation={[Math.PI / 8, 0, 0]}>
        {/* Outer Ring */}
        <mesh castShadow receiveShadow material={stoneMaterial}>
          <torusGeometry args={[5, 0.5, 32, 64]} />
        </mesh>

        {/* Inner Hub */}
        <mesh castShadow receiveShadow material={stoneMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.5, 32]} />
        </mesh>

        {/* 9 Spokes representing the 9 Days */}
        {[...Array(9)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 9;
          return (
            <mesh 
              key={i} 
              rotation={[0, 0, angle]} 
              position={[Math.cos(angle) * 3, Math.sin(angle) * 3, 0]}
              castShadow 
              receiveShadow
              material={stoneMaterial}
            >
              <boxGeometry args={[4, 0.2, 0.2]} />
            </mesh>
          );
        })}
        
        {/* Decorative Inner Ring */}
        <mesh castShadow receiveShadow material={stoneMaterial}>
          <torusGeometry args={[3.2, 0.15, 16, 64]} />
        </mesh>
      </group>
    </Float>
  );
}
