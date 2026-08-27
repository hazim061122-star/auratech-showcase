import type React from "react";
import { useMemo } from "react";
import * as THREE from "three";

export type ModelKind = "earbuds" | "watch" | "speaker" | "powerbank" | "headphones" | "pad";

const CYAN = "#35d3e6";
const PURPLE = "#9061f9";

function useBody(color = "#1b1f26") {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.34,
        metalness: 0.72,
      }),
    [color],
  );
}

function useAccentMat(color = CYAN) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: new THREE.Color(color),
        emissiveIntensity: 1.4,
        roughness: 0.25,
        metalness: 0.1,
      }),
    [color],
  );
}

/* ---------------- Earbuds: case + two buds ---------------- */
function Earbuds() {
  const body = useBody("#20252d");
  const dark = useBody("#12161c");
  const accent = useAccentMat();

  const bud = (x: number) => (
    <group key={x} position={[x, 0.62, 0]} rotation={[0.25, 0, x > 0 ? -0.2 : 0.2]}>
      <mesh material={body} castShadow>
        <sphereGeometry args={[0.3, 40, 32]} />
      </mesh>
      <mesh material={dark} position={[0, -0.3, 0.02]} rotation={[0.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.44, 8, 24]} />
      </mesh>
      <mesh material={accent} position={[0, -0.52, 0.06]}>
        <sphereGeometry args={[0.055, 16, 16]} />
      </mesh>
    </group>
  );

  return (
    <group>
      {/* case */}
      <mesh material={body} position={[0, -0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.7, 1.1]} />
      </mesh>
      <mesh material={dark} position={[0, -0.02, 0]} castShadow>
        <boxGeometry args={[1.72, 0.06, 1.12]} />
      </mesh>
      <mesh material={accent} position={[0, -0.35, 0.56]}>
        <boxGeometry args={[0.5, 0.03, 0.02]} />
      </mesh>
      {bud(-0.45)}
      {bud(0.45)}
    </group>
  );
}

/* ---------------- Watch: rounded body + strap loops ---------------- */
function Watch() {
  const body = useBody("#2b2f36");
  const strap = useBody("#14181d");
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#050a0f",
        roughness: 0.06,
        metalness: 0.2,
        clearcoat: 1,
      }),
    [],
  );
  const accent = useAccentMat();

  return (
    <group scale={0.8}>
      <mesh material={body} castShadow receiveShadow>
        <boxGeometry args={[1.1, 1.35, 0.34]} />
      </mesh>
      <mesh material={glass} position={[0, 0, 0.19]}>
        <boxGeometry args={[0.95, 1.2, 0.03]} />
      </mesh>
      <mesh material={accent} position={[0, 0.35, 0.215]}>
        <boxGeometry args={[0.6, 0.05, 0.01]} />
      </mesh>
      <mesh material={accent} position={[-0.15, 0.12, 0.215]}>
        <boxGeometry args={[0.3, 0.05, 0.01]} />
      </mesh>
      {/* crown */}
      <mesh material={body} position={[0.6, 0.25, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.14, 24]} />
      </mesh>
      {/* strap loops */}
      {[1, -1].map((s) => (
        <group key={s}>
          <mesh material={strap} position={[0, s * 1.0, 0]} castShadow>
            <boxGeometry args={[0.8, 0.7, 0.18]} />
          </mesh>
          <mesh material={strap} position={[0, s * 1.5, -0.22]} rotation={[s * 0.55, 0, 0]} castShadow>
            <boxGeometry args={[0.78, 0.6, 0.14]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------------- Speaker: capsule + grille ring + light ring ---------------- */
function Speaker() {
  const body = useBody("#23272e");
  const cap = useBody("#15191f");
  const accent = useAccentMat(PURPLE);

  const grille = useMemo(() => {
    const rows: React.ReactElement[] = [];
    const count = 44;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      rows.push(
        <mesh
          key={i}
          position={[Math.cos(a) * 0.71, 0, Math.sin(a) * 0.71]}
          rotation={[0, -a, 0]}
        >
          <boxGeometry args={[0.02, 1.35, 0.055]} />
          <meshStandardMaterial color="#0d1116" roughness={0.9} metalness={0.3} />
        </mesh>,
      );
    }
    return rows;
  }, []);

  return (
    <group>
      <mesh material={cap} castShadow receiveShadow>
        <cylinderGeometry args={[0.68, 0.68, 1.4, 48]} />
      </mesh>
      {grille}
      <mesh material={body} position={[0, 0.78, 0]} castShadow>
        <cylinderGeometry args={[0.74, 0.72, 0.22, 48]} />
      </mesh>
      <mesh material={body} position={[0, -0.78, 0]} castShadow>
        <cylinderGeometry args={[0.72, 0.74, 0.22, 48]} />
      </mesh>
      <mesh material={accent} position={[0, -0.9, 0]}>
        <torusGeometry args={[0.66, 0.035, 12, 60]} />
      </mesh>
      <mesh material={accent} position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.22, 32]} />
      </mesh>
    </group>
  );
}

/* ---------------- Power bank ---------------- */
function PowerBank() {
  const body = useBody("#252a31");
  const dark = useBody("#101419");
  const accent = useAccentMat();

  return (
    <group rotation={[0, 0, 0.06]}>
      <mesh material={body} castShadow receiveShadow>
        <boxGeometry args={[1.0, 1.7, 0.5]} />
      </mesh>
      <mesh material={dark} position={[0, 0, 0.255]}>
        <boxGeometry args={[0.8, 1.5, 0.02]} />
      </mesh>
      <mesh material={accent} position={[0, 0.45, 0.27]}>
        <boxGeometry args={[0.42, 0.16, 0.01]} />
      </mesh>
      {/* ports */}
      {[-0.28, 0, 0.28].map((x) => (
        <mesh key={x} material={dark} position={[x, -0.86, 0]} castShadow>
          <boxGeometry args={[0.2, 0.06, 0.16]} />
        </mesh>
      ))}
      <mesh material={accent} position={[0, -0.86, 0.18]}>
        <boxGeometry args={[0.7, 0.02, 0.02]} />
      </mesh>
    </group>
  );
}

/* ---------------- Headphones: headband + earcups ---------------- */
function Headphones() {
  const body = useBody("#24282f");
  const pad = useBody("#0f1318");
  const accent = useAccentMat(PURPLE);

  return (
    <group position={[0, -0.15, 0]}>
      {/* headband */}
      <mesh material={body} position={[0, 0.55, 0]} castShadow>
        <torusGeometry args={[0.95, 0.09, 20, 60, Math.PI]} />
      </mesh>
      <mesh material={pad} position={[0, 0.6, 0]}>
        <torusGeometry args={[0.9, 0.055, 16, 48, Math.PI]} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.95, 0.1, 0]}>
          <mesh material={body} position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[0.12, 0.5, 0.16]} />
          </mesh>
          <mesh material={body} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.46, 0.46, 0.3, 48]} />
          </mesh>
          <mesh material={pad} position={[-s * 0.16, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.36, 0.12, 16, 48]} />
          </mesh>
          <mesh material={accent} position={[s * 0.16, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.3, 0.018, 10, 48]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------------- Charging pad ---------------- */
function Pad() {
  const body = useBody("#262b32");
  const accent = useAccentMat();

  return (
    <group rotation={[0, 0, 0]}>
      <mesh material={body} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.16, 1.05]} />
      </mesh>
      <mesh material={body} position={[-0.5, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.06, 48]} />
      </mesh>
      <mesh material={accent} position={[-0.5, 0.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.012, 10, 60]} />
      </mesh>
      {/* watch dock */}
      <mesh material={body} position={[0.62, 0.26, 0]} rotation={[0, 0, -0.35]} castShadow>
        <cylinderGeometry args={[0.26, 0.28, 0.12, 40]} />
      </mesh>
      <mesh material={accent} position={[0, -0.09, 0]}>
        <boxGeometry args={[1.9, 0.015, 0.95]} />
      </mesh>
    </group>
  );
}

export const MODELS: Record<ModelKind, () => React.ReactElement> = {
  earbuds: Earbuds,
  watch: Watch,
  speaker: Speaker,
  powerbank: PowerBank,
  headphones: Headphones,
  pad: Pad,
};
