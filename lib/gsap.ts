import { gsap } from "gsap";

/* Shared motion tokens — keep the whole site on one rhythm. */
export const EASE = {
    out: "power3.out",
    inOut: "power2.inOut",
    expo: "expo.out",
} as const;

export const DUR = {
    micro: 0.2,
    base: 0.45,
    slow: 0.7,
} as const;

export const STAGGER = 0.06;

export { gsap };
