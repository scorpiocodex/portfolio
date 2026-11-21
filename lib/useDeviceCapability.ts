"use client";

import { useSyncExternalStore } from "react";

/**
 * Decides whether the heavy WebGL layer should mount, based on the visitor's
 * device + preferences. SSR-safe: the server snapshot has `ready: false`, so the
 * first paint always renders the lightweight fallback (no hydration mismatch).
 * Reacts to the OS toggling reduced motion or the viewport crossing the mobile
 * breakpoint.
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

const SERVER_SNAPSHOT: DeviceCapability = {
  ready: false,
  prefersReducedMotion: false,
  isMobile: false,
  saveData: false,
  supportsWebGL: false,
  enableWebGL: false,
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 768px), (pointer: coarse)";

let webglSupport: boolean | null = null;

/** Probe once and release the probe context — browsers cap live WebGL contexts. */
function detectWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    webglSupport = !!(window.WebGLRenderingContext && gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

function compute(): DeviceCapability {
  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const isMobile = window.matchMedia(MOBILE_QUERY).matches;

  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const saveData = !!conn?.saveData;

  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 2;

  const supportsWebGL = detectWebGL();

  return {
    ready: true,
    prefersReducedMotion,
    isMobile,
    saveData,
    supportsWebGL,
    enableWebGL: supportsWebGL && !prefersReducedMotion && !saveData && !isMobile && !lowMemory,
  };
}

// getSnapshot must return a referentially stable value until something changes.
let cached: DeviceCapability | null = null;

function getSnapshot(): DeviceCapability {
  return (cached ??= compute());
}

function subscribe(onChange: () => void): () => void {
  const lists = [window.matchMedia(REDUCED_MOTION_QUERY), window.matchMedia(MOBILE_QUERY)];
  const handler = () => {
    cached = null;
    onChange();
  };
  lists.forEach((l) => l.addEventListener("change", handler));
  return () => lists.forEach((l) => l.removeEventListener("change", handler));
}

export function useDeviceCapability(): DeviceCapability {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
}
