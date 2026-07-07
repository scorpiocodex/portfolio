import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig } from "eslint/config";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        rules: {
            // Several components use the canonical SSR hydration gate
            // (setMounted(true) / capability detection in a mount effect).
            // Migrating them to useSyncExternalStore is tracked separately;
            // keep the signal visible without failing the build.
            "react-hooks/set-state-in-effect": "warn",
        },
    },
    {
        ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
    },
]);

export default eslintConfig;
