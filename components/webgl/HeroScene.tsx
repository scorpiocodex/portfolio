"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme, useThemeHex, type ThemeName } from "@/lib/theme";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

/* Soft radial sprite so points render as glowing dots, not squares. */
function useSpriteTexture() {
    const texture = useMemo(() => {
        const s = 64;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = s;
        const ctx = canvas.getContext("2d")!;
        const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.35, "rgba(255,255,255,0.55)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
        ctx.fill();
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }, []);

    // Release the GPU copy when the scene unmounts (e.g. a resize flips the layer off).
    useEffect(() => () => texture.dispose(), [texture]);

    return texture;
}

function makePositions(count: number, radius: number) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
}

function Layer({
    texture,
    count,
    radius,
    color,
    size,
    speed,
    opacity,
}: {
    texture: THREE.Texture;
    count: number;
    radius: number;
    color: string;
    size: number;
    speed: number;
    opacity: number;
}) {
    const ref = useRef<THREE.Points>(null);
    const positions = useMemo(() => makePositions(count, radius), [count, radius]);

    useFrame((_, delta) => {
        if (!ref.current) return;
        // clamp delta so a backgrounded tab doesn't jump on resume
        const d = Math.min(delta, 0.05);
        ref.current.rotation.y += d * speed;
        ref.current.rotation.x += d * speed * 0.4;
    });

    return (
        <points ref={ref} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                map={texture}
                color={color}
                size={size}
                sizeAttenuation
                transparent
                opacity={opacity}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* Subtle cursor parallax on a parent group (eased, never abrupt). */
function ParallaxRig({ children }: { children: ReactNode }) {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!group.current) return;
        const tx = state.pointer.y * 0.12;
        const ty = state.pointer.x * 0.12;
        group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
        group.current.rotation.y += (ty - group.current.rotation.y) * 0.04;
    });
    return <group ref={group}>{children}</group>;
}

/* Particle layers per theme. Midnight keeps its original palette; Deep Ocean shifts
   to teal / blue. The fog colour always tracks the live --bg token. */
const LAYER_COLORS: Record<ThemeName, [string, string, string]> = {
    midnight: ["#8ec5ff", "#a78bfa", "#5eead4"],
    "deep-ocean": ["#7ee8dc", "#93c5fd", "#67e8f9"],
};

export default function HeroScene() {
    const texture = useSpriteTexture();
    const theme = useTheme();
    const { bg } = useThemeHex();
    const [c1, c2, c3] = LAYER_COLORS[theme];

    return (
        <Canvas
            className="!absolute inset-0"
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
            <fog attach="fog" args={[bg, 6, 18]} />
            <ParallaxRig>
                <Layer texture={texture} count={2200} radius={7} color={c1} size={0.05} speed={0.03} opacity={0.9} />
                <Layer texture={texture} count={1100} radius={9} color={c2} size={0.08} speed={0.018} opacity={0.65} />
                <Layer texture={texture} count={700} radius={5} color={c3} size={0.04} speed={0.045} opacity={0.7} />
            </ParallaxRig>
        </Canvas>
    );
}
