'use client';

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import gsap from 'gsap';

interface TabletProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  isWood?: boolean;
}

export function Tablet({ position, rotation = [0, 0, 0], isWood = false }: TabletProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Material settings based on wood vs stone
  const color = isWood ? '#3d2b1f' : '#332e29';
  const roughness = isWood ? 0.7 : 0.9;
  
  // Hover animation
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Scale up slightly on hover
    const targetScale = hovered ? 1.05 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    // Glow effect via emissive color on hover
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    const targetEmissive = hovered ? new THREE.Color('#3d1d05') : new THREE.Color('#000000');
    material.emissive.lerp(targetEmissive, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        // We set cursor directly in R3F, though standard CSS pointer works if canvas captures events
        onPointerDown={(e) => {
           // Interactive click effect (e.g. pulse or flip)
           gsap.to(meshRef.current!.rotation, {
             y: meshRef.current!.rotation.y + Math.PI * 2,
             duration: 1,
             ease: 'power2.inOut'
           });
        }}
      >
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial 
          color={color}
          roughness={roughness}
          metalness={0.1}
        />
        
        {/* Decorative inner carving (indentation) */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[1.7, 2.7, 0.05]} />
          <meshStandardMaterial color={isWood ? '#261a12' : '#221e1a'} roughness={1} />
        </mesh>
      </mesh>
    </Float>
  );
}
