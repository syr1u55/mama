"use client";

import { Text, Float, Stars, Sparkles, Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

function Heart(props: any) {
  const shape = useMemo(() => {
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    return heartShape;
  }, []);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh {...props} scale={0.1}>
        <extrudeGeometry args={[shape, { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 }]} />
        <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function Firework({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const [particles] = useState(() => {
    return Array.from({ length: 20 }).map(() => ({
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      ),
      color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
    }));
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        child.position.add(particles[i].velocity);
        child.scale.multiplyScalar(0.95); // Fade out/shrink
      });
    }
  });

  return (
    <group ref={ref} position={position}>
      {particles.map((p, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={p.color} />
        </mesh>
      ))}
    </group>
  );
}

function FireworksDisplay() {
  const [fireworks, setFireworks] = useState<{ id: number; position: [number, number, number] }[]>([]);

  useFrame(({ clock }) => {
    if (Math.random() < 0.1) { // 10% chance per frame to spawn a firework - MORE FIREWORKS!
      const id = Date.now() + Math.random();
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10 - 5;
      setFireworks((prev) => [...prev, { id, position: [x, y, z] }].slice(-20)); // Keep last 20
    }
  });

  return (
    <>
      {fireworks.map((fw) => (
        <Firework key={fw.id} position={fw.position} />
      ))}
    </>
  );
}

function FloatingHearts({ count = 30 }: { count?: number }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5,
      ] as [number, number, number],
      rotation: [0, 0, (Math.random() - 0.5) * 0.5] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5,
    }));
  }, [count]);

  return (
    <>
      {hearts.map((h, i) => (
        <Heart key={i} position={h.position} rotation={h.rotation} scale={h.scale} />
      ))}
    </>
  );
}

export default function Experience() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff69b4" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={500} scale={20} size={6} speed={0.4} opacity={0.5} color="#ffd700" />

      <FireworksDisplay />
      <FloatingHearts count={30} />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            position={[0, 1.5, 0]}
            fontSize={1.5}
            color="#ffd700"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#b8860b"
          >
            Happy Birthday
            <meshStandardMaterial emissive="#ffd700" emissiveIntensity={0.5} />
          </Text>
        </Float>

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, 0, 0]}>
          <Text
            position={[0, -0.5, 0]}
            fontSize={1.2}
            color="#ff69b4"
            anchorX="center"
            anchorY="middle"
          >
            Mama
            <meshStandardMaterial emissive="#ff69b4" emissiveIntensity={0.5} />
          </Text>
        </Float>

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <Text
            position={[0, -2, 0]}
            fontSize={0.8}
            color="#e6b3ff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#9d4edd"
            letterSpacing={0.05}
          >
            Patricia Shongotola
            <meshStandardMaterial emissive="#e6b3ff" emissiveIntensity={0.3} />
          </Text>
        </Float>

        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
          <Text
            position={[0, -3.5, 0]}
            fontSize={0.25}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
            fontStyle="italic"
          >
            From Abayomi
          </Text>
        </Float>
      </group>
    </>
  );
}
