import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';

export function NexusRing({ activeTool }) {
  const groupRef = useRef();
  const torusRef = useRef();
  const innerRef = useRef();

  const color = activeTool?.color ?? '#4285F4';
  const [rx, ry, rz] = activeTool?.rotation ?? [0.5, 0.5, 0];

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (rx * 0.3 - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += (rz * 0.3 - groupRef.current.rotation.z) * 0.05;
      groupRef.current.rotation.y += delta * 0.15 + (ry * 0.001);
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.4;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
      innerRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={[-0.5, 0, 0]}>
        <mesh ref={torusRef}>
          <torusGeometry args={[1.8, 0.045, 32, 200]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1.45, 0.025, 32, 200]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} wireframe />
        </mesh>
        <Sparkles count={60} scale={5} size={2} speed={0.4} color={color} />
      </group>
    </Float>
  );
}
