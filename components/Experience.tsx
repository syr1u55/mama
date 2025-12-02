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

function Balloon({ position, color, message }: { position: [number, number, number]; color: string; message: string }) {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={position}>
        {/* Balloon body */}
        <mesh
          position={[0, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setShowMessage(!showMessage);
          }}
          onPointerOver={(e) => (e.object.scale.set(1.2, 1.2, 1.2))}
          onPointerOut={(e) => (e.object.scale.set(1, 1, 1))}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        {/* Balloon knot */}
        <mesh position={[0, -0.45, 0]} scale={[0.1, 0.15, 0.1]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
        {/* String */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1.5, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* Message Card */}
        {showMessage && (
          <group position={[0, -0.8, 0.5]}>
            <mesh onClick={(e) => {
              e.stopPropagation();
              setShowMessage(false);
            }}>
              <planeGeometry args={[2, 1]} />
              <meshStandardMaterial
                color="#ffffff"
                opacity={0.95}
                transparent
                side={THREE.DoubleSide}
              />
            </mesh>
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.2}
              color={color}
              anchorX="center"
              anchorY="middle"
              maxWidth={1.8}
              textAlign="center"
              lineHeight={1.2}
            >
              {message}
            </Text>
          </group>
        )}
      </group>
    </Float>
  );
}

function SpecialMessageBalloon() {
  const [showMessage, setShowMessage] = useState(false);

  const message = `Mama there are no words in any language or form of expression that can adequately describe what is in our hearts. You have sacrificed, loved and given unconditionally. Even when you did not have to, you begged, took insults, gave up your own comfort just so that we did not have to experience the bad in the world. You are the greatest human being to us and an asset to the world, a blessing to everyone who is opportuned to meet you. We love you and we pray that as a year is added to your time on this earth, that the Lord's grace never departs from your side, that as His will is done, He will grant you more strength and wisdom all your remaining days here. Happy birthday Oma 🎈`;

  return (
    <group position={[0, 2, -9]}>
      {/* Special Golden Balloon */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh
          onClick={() => setShowMessage(!showMessage)}
          onPointerOver={(e) => (e.object.scale.set(1.2, 1.2, 1.2))}
          onPointerOut={(e) => (e.object.scale.set(1, 1, 1))}
        >
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Balloon knot */}
        <mesh position={[0, -0.65, 0]} scale={[0.12, 0.18, 0.12]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#ffd700" roughness={0.8} />
        </mesh>
        {/* String */}
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 2, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </Float>

      {/* Message Card */}
      {showMessage && (
        <group position={[0, -1, 1]}>
          <mesh onClick={(e) => { e.stopPropagation(); setShowMessage(false); }}>
            <planeGeometry args={[6, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              opacity={0.95}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.25}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            maxWidth={5.5}
            textAlign="center"
            lineHeight={1.3}
          >
            {message}
          </Text>

        </group>
      )}
    </group>
  );
}

function LoveYouMamaBalloon({ onClose }: { onClose?: () => void }) {
  const [showMessage, setShowMessage] = useState(false);
  const message = `Love you Mama`;
  return (
    <group position={[-3, 1, -9]}>
      {/* Simple Golden Balloon */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh
          onClick={() => setShowMessage(!showMessage)}
          onPointerOver={(e) => (e.object.scale.set(1.2, 1.2, 1.2))}
          onPointerOut={(e) => (e.object.scale.set(1, 1, 1))}
        >
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Balloon knot */}
        <mesh position={[0, -0.65, 0]} scale={[0.12, 0.18, 0.12]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#ffd700" roughness={0.8} />
        </mesh>
        {/* String */}
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 2, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </Float>

      {/* Message Card */}
      {showMessage && (
        <group position={[0, -1, 1]}>
          <mesh onClick={(e) => {
            e.stopPropagation();
            setShowMessage(false);
            if (onClose) onClose();
          }}>
            <planeGeometry args={[3, 2]} />
            <meshStandardMaterial
              color="#ffffff"
              opacity={0.95}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.4}
            color="#ff1493"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.5}
            textAlign="center"
            lineHeight={1.3}
          >
            {message}
            <meshStandardMaterial emissive="#ff1493" emissiveIntensity={0.3} />
          </Text>


        </group>
      )}
    </group>
  );
}

function AnotherGoldenBalloon({ onClose }: { onClose?: () => void }) {
  const [showMessage, setShowMessage] = useState(false);
  const message = `Love you Mama,\nThank you for everything`;
  return (
    <group position={[3, 1, -9]}>
      {/* Simple Golden Balloon */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh
          onClick={() => setShowMessage(!showMessage)}
          onPointerOver={(e) => (e.object.scale.set(1.2, 1.2, 1.2))}
          onPointerOut={(e) => (e.object.scale.set(1, 1, 1))}
        >
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Balloon knot */}
        <mesh position={[0, -0.65, 0]} scale={[0.12, 0.18, 0.12]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#ffd700" roughness={0.8} />
        </mesh>
        {/* String */}
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 2, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </Float>

      {/* Message Card */}
      {showMessage && (
        <group position={[0, -1, 1]}>
          <mesh onClick={(e) => {
            e.stopPropagation();
            setShowMessage(false);
            if (onClose) onClose();
          }}>
            <planeGeometry args={[4, 2.5]} />
            <meshStandardMaterial
              color="#ffffff"
              opacity={0.95}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.35}
            color="#ff1493"
            anchorX="center"
            anchorY="middle"
            maxWidth={3.5}
            textAlign="center"
            lineHeight={1.3}
          >
            {message}
            <meshStandardMaterial emissive="#ff1493" emissiveIntensity={0.3} />
          </Text>

        </group>
      )}
    </group>
  );
}

function FloatingBalloons() {
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);

  const balloons = useMemo(() => {
    const colors = ['#ff1493', '#ffd700', '#00ffff', '#ff69b4', '#9d4edd', '#00ff00', '#ff4500', '#1e90ff'];
    const messages = [
      "We love you!", "Best Mama!", "God Bless You", "You are amazing",
      "Thank you!", "Happy Birthday!", "Long Life!", "Good Health!",
      "Joy & Peace", "Our Queen", "Wonderful Mama", "Forever Loved"
    ];
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        -8 - Math.random() * 4, // Behind the main text
      ] as [number, number, number],
      color: colors[i % colors.length],
      message: messages[i % messages.length],
    }));
  }, []);

  return (
    <>
      <SpecialMessageBalloon />
      {showFirst && <LoveYouMamaBalloon onClose={() => { setShowFirst(false); setShowSecond(true); }} />}
      {showSecond && <AnotherGoldenBalloon onClose={() => setShowSecond(false)} />}
      {balloons.map((b, i) => (
        <Balloon key={i} position={b.position} color={b.color} message={b.message} />
      ))}
    </>
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
      const newFirework = { id, position: [x, y, z] as [number, number, number] };
      setFireworks((prev) => [...prev, newFirework].slice(-20)); // Keep last 20
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

function ScrollingMessage() {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      // Move text upward and backward (Star Wars style)
      textRef.current.position.y = ((state.clock.elapsedTime * 0.5) % 30) - 15;

      // Reset position when it goes too far
      if (textRef.current.position.y > 15) {
        textRef.current.position.y = -15;
      }
    }
  });

  const message = `Best Mama in the world,

I appreciate everything you have done for us

and we wish you

Good health, Long Life

and more years to come`;

  return (
    <group ref={textRef} position={[0, -15, -10]} rotation={[-0.5, 0, 0]}>
      <Text
        fontSize={0.4}
        color="#ffd700"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        textAlign="center"
        lineHeight={1.5}
      >
        {message}
        <meshStandardMaterial emissive="#ffd700" emissiveIntensity={0.2} opacity={0.7} transparent />
      </Text>
    </group>
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
      <FloatingBalloons />
      <ScrollingMessage />

      {/* Back side text - "LOVE YOU MAMA" */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Text
          position={[0, 0, -10]}
          rotation={[0, Math.PI, 0]}
          fontSize={2}
          color="#ff1493"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.08}
          outlineColor="#ff69b4"
          letterSpacing={0.1}
        >
          LOVE YOU MAMA
          <meshStandardMaterial emissive="#ff1493" emissiveIntensity={0.6} />
        </Text>
      </Float>

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
