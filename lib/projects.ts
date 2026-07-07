/* ─── Shared project data for list + detail pages ─────────────────────── */

export interface TerminalStep {
    command?: string;
    output: string;
    delay?: number; // ms before next step
}

export interface ProjectData {
    slug: string;
    name: string;
    number: string;
    tagline: string;
    description: string;
    features: string[];
    tech: string[];
    github: string;
    accentColor: string;
    overview: string;
    architecture: string[];
    designDecisions: { title: string; description: string }[];
    terminalDemo: TerminalStep[];
}

export const PROJECTS: ProjectData[] = [
    {
        slug: "nyxora",
        name: "Nyxora",
        number: "01",
        tagline: "Cryptographic Cipher Vault",
        description:
            "Terminal-native, zero-knowledge password vault. Argon2id key derivation with XChaCha20-Poly1305 authenticated encryption, offline-first architecture, Shamir's Secret Sharing recovery, and a polished terminal interface.",
        features: [
            "Argon2id + XChaCha20-Poly1305 encryption",
            "Zero-knowledge offline-first architecture",
            "Shamir's Secret Sharing recovery",
            "Security audit — HIBP breach scan (k-anonymity)",
            "Memory-guarded key handling (mlock/VirtualLock)",
        ],
        tech: ["Python", "Cryptography", "SQLite", "CLI"],
        github: "https://github.com/scorpiocodex/Nyxora",
        accentColor: "#3FB950",
        overview:
            "Nyxora was designed with one principle: your secrets should never exist in plaintext outside your machine. It uses Argon2id for key derivation and XChaCha20-Poly1305 for authenticated encryption — modern, well-audited primitives. The vault is entirely offline-first, with optional Shamir's Secret Sharing for recovery key distribution.",
        architecture: [
            "Key Derivation — Argon2id with tunable memory/time parameters for hardware-adaptive password hashing",
            "Cipher Engine — XChaCha20-Poly1305 AEAD encryption with per-entry unique nonces",
            "Vault Storage — SQLite with WAL mode for concurrent-safe, atomic credential storage",
            "Security Audit — Have I Been Pwned (HIBP) k-anonymity API for breach detection without exposing passwords",
            "Memory Guard — mlock (Linux) / VirtualLock (Windows) to prevent key material from being swapped to disk",
        ],
        designDecisions: [
            {
                title: "Argon2id over bcrypt/scrypt",
                description:
                    "Argon2id won the Password Hashing Competition for its resistance to both GPU and side-channel attacks. It's the gold standard for key derivation.",
            },
            {
                title: "XChaCha20 over AES-GCM",
                description:
                    "XChaCha20 has a 192-bit nonce (vs AES-GCM's 96-bit), making random nonce collisions astronomically unlikely — critical for a vault that may store thousands of entries.",
            },
            {
                title: "Offline-first architecture",
                description:
                    "Cloud sync introduces attack surface. Nyxora keeps everything local, with Shamir's Secret Sharing as the recovery mechanism instead of cloud backup.",
            },
        ],
        terminalDemo: [
            {
                command: "nyx --version",
                output: `  ◆ NYXORA  Tactical Secrets Vault
  Version   v3.1.0
  License   MIT
  Author    ScorpioCodeX
  Cipher    Argon2id · XChaCha20-Poly1305`,
                delay: 900,
            },
            {
                command: "nyx vault status",
                output: `┌──────────────────── Vault Status ─────────────────────┐
│ Vault is LOCKED                                       │
└───────────────────────────────────────────────────────┘`,
                delay: 1100,
            },
            {
                command: "nyx generate password -l 28",
                output: `  gKi|xJSjHSd*9d%g^nQt0vd!%E_D
  ████████████████████  EXCELLENT  184 bits`,
                delay: 1200,
            },
            {
                command: "nyx generate entropy \"hunter2\"",
                output: `┌────────────────── Password Analysis ──────────────────┐
│ Password: *******                                     │
│ Entropy:  ███░░░░░░░░░░░░░░░░░  WEAK  21.2 bits       │
│ Patterns: leet_speak, common_word_base                │
└───────────────────────────────────────────────────────┘`,
                delay: 1400,
            },
            {
                command: "nyx generate passphrase --words 5",
                output: `  hardness-banish-outflank-kindly-uninjured
  ██████████░░░░░░░░░░  STRONG  65 bits`,
                delay: 1200,
            },
            {
                command: "nyx generate api-key --prefix NYX",
                output: `  NYX_nklfuRmClWgfPf-0m3_4m3K5lrpI9RoETGpHmh9jWdo`,
                delay: 1000,
            },
        ],
    },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
    return PROJECTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return PROJECTS.map((p) => p.slug);
}
