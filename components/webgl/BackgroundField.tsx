"use client";

import { useDeviceCapability } from "@/lib/useDeviceCapability";
import dynamic from "next/dynamic";
import Constellation from "../Constellation";

/* Single site-wide depth layer, fixed behind all content. three.js loads in its
   own client-only chunk and only for capable, motion-OK desktops; everyone else
   gets the lightweight canvas constellation. */
const SceneField = dynamic(() => import("./HeroScene"), { ssr: false });

export default function BackgroundField() {
    const cap = useDeviceCapability();

    // Until capability is known, render nothing (the body background covers
    // first paint) — avoids loading three.js on devices that won't use it.
    if (!cap.ready) return null;

    return (
        <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none">
            {cap.enableWebGL ? <SceneField /> : <Constellation />}
            {/* Vignette keeps text legible over the field (per contrast rules). */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--bg)_95%)]" />
        </div>
    );
}
