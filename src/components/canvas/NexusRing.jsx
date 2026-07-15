import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function NexusRing({ activeTool }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Butter-smooth, constant 60fps local rotation without re-rendering parent React DOM
      meshRef.current.rotation.y += 0.2 * delta;
      meshRef.current.rotation.x += 0.1 * delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.4, 150, 20]} />
      <meshStandardMaterial 
        color={activeTool.color} 
        roughness={0.1} 
        metalness={0.9} 
        emissive={activeTool.color}
        emissiveIntensity={1.5}
      />
    </mesh>
  );
}
