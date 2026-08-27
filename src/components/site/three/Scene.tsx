import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import type { Group } from "three";
import { MODELS, type ModelKind } from "./models";

function Spinner({ kind, paused }: { kind: ModelKind; paused: boolean }) {
  const ref = useRef<Group>(null);
  const Model = MODELS[kind];

  useFrame((_, dt) => {
    if (!ref.current || paused) return;
    ref.current.rotation.y += dt * 0.35;
  });

  return (
    <group ref={ref}>
      <Model />
    </group>
  );
}

export default function Scene({ kind }: { kind: ModelKind }) {
  const [paused, setPaused] = useState(false);

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [2.6, 1.5, 3.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        {/* soft key light */}
        <directionalLight
          position={[3.5, 5, 3]}
          intensity={2.1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        {/* cyan rim */}
        <spotLight position={[-4, 2.5, -3]} angle={0.8} intensity={38} color="#35d3e6" />
        {/* purple fill */}
        <spotLight position={[3.5, -1.5, -3.5]} angle={0.9} intensity={26} color="#9061f9" />

        <Spinner kind={kind} paused={paused} />

        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.5}
          scale={9}
          blur={2.6}
          far={4}
          color="#000000"
        />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 1.7}
          rotateSpeed={0.8}
          dampingFactor={0.08}
        />
      </Suspense>
    </Canvas>
  );
}
