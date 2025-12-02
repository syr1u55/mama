"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import Experience from "./Experience";
import { Suspense } from "react";

export default function Scene() {
    return (
        <div className="h-screen w-full bg-black">
            <Canvas
                camera={{
                    position: [0, 0, 8],
                    fov: 45,
                    near: 0.1,
                    far: 200,
                }}
                dpr={[1, 2]} // Handle high pixel density screens
            >
                <Suspense fallback={null}>
                    <Experience />
                    <Preload all />
                </Suspense>
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={5}
                    maxDistance={15}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* HTML Overlay for accessibility or extra UI if needed */}
            <div className="absolute bottom-4 right-4 text-white/30 text-xs pointer-events-none select-none">
                Drag to rotate • Scroll to zoom
            </div>
        </div>
    );
}
