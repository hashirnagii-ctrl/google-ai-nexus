import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Fan({ position, direction }) {
  const bladesRef = useRef();

  useFrame((_, delta) => {
    if (bladesRef.current) bladesRef.current.rotation.y += direction * 5 * delta;
  });

  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.36, 0.36, 0.02, 32]} />
        <meshStandardMaterial color="#070708" roughness={0.9} />
      </mesh>
      <group ref={bladesRef} position={[0, 0.02, 0]}>
        <mesh>
          <cylinderGeometry args={[0.09, 0.09, 0.03, 24]} />
          <meshStandardMaterial color="#8e8e93" metalness={0.8} roughness={0.3} />
        </mesh>
        {Array.from({ length: 7 }, (_, i) => (
          <group key={i} rotation={[0, (i / 7) * Math.PI * 2, 0]}>
            <mesh position={[0.17, 0, 0]}>
              <boxGeometry args={[0.24, 0.015, 0.09]} />
              <meshStandardMaterial color="#1a1a1c" roughness={0.85} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export function GpuModel() {
  return (
    <group position={[0, 0.1, 0]}>
      {/* CNC gunmetal outer bezel */}
      <mesh castShadow>
        <boxGeometry args={[2.5, 1.1, 0.45]} />
        <meshStandardMaterial color="#5a5a5d" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Matte black cooling fins insert */}
      <mesh>
        <boxGeometry args={[2.42, 1.02, 0.46]} />
        <meshStandardMaterial color="#111112" roughness={0.85} />
      </mesh>
      {/* Hourglass silver crossing ribbons */}
      <mesh position={[-0.55, 0, 0]} rotation={[0, 0, 0.22]}>
        <boxGeometry args={[1.2, 0.85, 0.47]} />
        <meshStandardMaterial color="#8e8e93" metalness={0.95} roughness={0.25} />
      </mesh>
      <mesh position={[0.55, 0, 0]} rotation={[0, 0, -0.22]}>
        <boxGeometry args={[1.2, 0.85, 0.47]} />
        <meshStandardMaterial color="#8e8e93" metalness={0.95} roughness={0.25} />
      </mesh>
      {/* Dual axial spinning fans */}
      <Fan position={[-0.55, 0, 0.24]} direction={1} />
      <Fan position={[0.55, 0, -0.24]} direction={-1} />
    </group>
  );
}

export function CpuModel() {
  return (
    <group position={[0, 0.1, 0]}>
      {/* Green substrate PCB */}
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.08, 1.6]} />
        <meshStandardMaterial color="#14532d" roughness={0.75} />
      </mesh>
      {/* Octagonal AM5 integrated heat spreader */}
      <mesh position={[0, 0.14, 0]} rotation={[0, Math.PI / 8, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.75, 0.22, 8]} />
        <meshStandardMaterial color="#c7c7cd" metalness={0.85} roughness={0.3} />
      </mesh>
      {/* Central die marker */}
      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.5]} />
        <meshStandardMaterial color="#1d1d1f" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}

export function DisplayModel() {
  return (
    <group position={[0, 0.1, 0]}>
      {/* Ultra-thin dark panel */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[2.9, 1.6, 0.06]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.7} />
      </mesh>
      {/* Space-grey aluminium bezel wrap */}
      <mesh position={[0, 0.3, -0.01]}>
        <boxGeometry args={[2.94, 1.64, 0.05]} />
        <meshStandardMaterial color="#8e8e93" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Pro-stand arm */}
      <mesh position={[0, -0.3, -0.2]} rotation={[-0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.12, 1.2, 0.12]} />
        <meshStandardMaterial color="#d2d2d7" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Heavy metal base */}
      <mesh position={[0, -0.9, -0.1]} receiveShadow>
        <boxGeometry args={[0.9, 0.03, 0.6]} />
        <meshStandardMaterial color="#8e8e93" metalness={0.9} />
      </mesh>
    </group>
  );
}

export const showcaseModelById = {
  'gpu-fe': GpuModel,
  'cpu-ryzen': CpuModel,
  'display-nagi': DisplayModel
};
