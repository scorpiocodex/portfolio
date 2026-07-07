"use client";

import { useEffect, useState } from "react";

/**
 * Decides whether the heavy WebGL layer should mount, based on the visitor's
 * device + preferences. SSR-safe: `ready` is false until mounted, so the first
 * paint always renders the lightweight fallback (no hydration mismatch).
 */
export interface DeviceCapability {
    ready: boolean;
    prefersReducedMotion: boolean;
    isMobile: boolean;
    saveData: boolean;
    supportsWebGL: boolean;
    /** Final decision: only true for capable, motion-OK desktop visitors. */
    enableWebGL: boolean;
}

function detectWebGL(): boolean {
    try {
        const canvas = document.createElement("canvas");
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
    } catch {
        return false;
    }
}

const INITIAL: DeviceCapability = {
    ready: false,
    prefersReducedMotion: false,
    isMobile: false,
    saveData: false,
    supportsWebGL: false,
    enableWebGL: false,
};

export function useDeviceCapability(): DeviceCapability {
    const [cap, setCap] = useState<DeviceCapability>(INITIAL);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        const isMobile = window.matchMedia(
            "(max-width: 768px), (pointer: coarse)"
        ).matches;

        const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
            .connection;
        const saveData = !!conn?.saveData;

        const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
            .deviceMemory;
        const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 2;

        const supportsWebGL = detectWebGL();

        const enableWebGL =
            supportsWebGL &&
            !prefersReducedMotion &&
            !saveData &&
            !isMobile &&
            !lowMemory;

        setCap({
            ready: true,
            prefersReducedMotion,
            isMobile,
            saveData,
            supportsWebGL,
            enableWebGL,
        });
    }, []);

    return cap;
}
