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
  pypi?: string;
  accentColor: string;
  overview: string;
  /** "Title — description" pairs; the detail page splits on " — ". */
  architecture: string[];
  designDecisions: { title: string; description: string }[];
  /** Scripted replay shown on the detail page; omit when there is no real output to show. */
  terminalDemo?: TerminalStep[];
  /** Caption shown under the demo so it is clear where the output comes from. */
  terminalDemoNote?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "scorpiowatch",
    name: "ScorpioWatch",
    number: "01",
    tagline: "Event-Driven Automation Engine",
    description:
      "Reactive automation engine published on PyPI. It watches files, matches changes against glob triggers, and runs your commands through the swatch CLI — async, safe by default, and language-agnostic.",
    features: [
      "Async-native engine built on asyncio with a bounded event bus",
      "No shell: argv-list commands with allow-listed environment variables",
      "Per-step timeouts that stop the whole process group",
      "Leading-edge cooldown: one run per editor save",
      "100% test coverage, mypy --strict, enforced layer boundaries",
      "Releases via GitHub Actions and PyPI Trusted Publishing with provenance attestations",
    ],
    tech: ["Python", "asyncio", "mypy", "GitHub Actions"],
    github: "https://github.com/scorpiocodex/scorpiowatch",
    pypi: "https://pypi.org/project/scorpiowatch/",
    accentColor: "#C89A30",
    overview:
      "ScorpioWatch sits between “something happened” and “the right work ran, safely, with a record of it”. It watches your files, matches changes against triggers you declare in swatch.toml, and runs your commands — async from top to bottom, never through a shell, one run per save. It knows nothing about languages or toolchains, so the same config can drive Python, Node, Rust or Go in one repo.",
    architecture: [
      "Triggers — Glob-matched filesystem events declared in swatch.toml; patterns are normalised to forward slashes so a config written on one OS matches on another",
      "Event Bus — Bounded async bus with explicit backpressure: no polling and no silent drops",
      "Executor — Steps run through asyncio.create_subprocess_exec with shell=False, from a scrubbed environment that only inherits what the step allow-lists",
      "Run Control — Per-step timeouts terminate the whole process group, and a leading-edge cooldown collapses an editor save's burst of events into a single run",
      "Renderer — One event stream rendered four ways: default, --verbose, --quiet and --json, so the views cannot drift apart",
    ],
    designDecisions: [
      {
        title: "No shell, by construction",
        description:
          "Commands are argv lists executed without a shell, and child processes start with an allow-listed environment. Command injection is not a bug class the engine can have, and nothing leaks into a step that it did not ask for.",
      },
      {
        title: "Leading-edge cooldown",
        description:
          "One save in an editor produces a burst of filesystem events. The cooldown fires on the first event and ignores the rest per (trigger, path), which removed duplicate runs from a single save.",
      },
      {
        title: "Quiet on success, loud on failure",
        description:
          "The default view prints a one-line verdict per run and only shows a step's output when it fails. Verbose and JSON modes render the same events, so scripts and humans see consistent results.",
      },
      {
        title: "Layer boundaries enforced in CI",
        description:
          "mypy --strict, 100% test coverage and an import contract keep the layered architecture from eroding as features land.",
      },
    ],
    terminalDemo: [
      {
        command: "swatch run .",
        output: `  swatch  ·  engine starting

  ✓ config loaded    swatch.toml  ·  1 triggers, 1 workflows
  watching .  ·  1 triggers armed  ·  ^C to stop

  02:04:43  ·  tests  → started  r_5c1f
  02:04:44  ·  tests  ✓ succeeded  0.9s
  02:04:47  ·  tests  → started  r_8b69
  02:04:48  ·  tests  ✓ succeeded  0.9s`,
        delay: 1500,
      },
    ],
    terminalDemoNote:
      "Sample session from the project README: two saves, two runs, quiet on success.",
  },
  {
    slug: "nyxora",
    name: "Nyxora",
    number: "02",
    tagline: "Offline Terminal Password Manager",
    description:
      "Offline, zero-knowledge password manager for the terminal, published on PyPI (v3.1.1) with a standalone Windows build. Argon2id key derivation, XChaCha20-Poly1305 authenticated encryption and per-entry HMAC integrity checks, with a Textual TUI.",
    features: [
      "Argon2id + XChaCha20-Poly1305 with per-entry HMAC integrity checks",
      "Offline-first: no cloud, no accounts",
      "Textual TUI with live TOTP codes and strength ratings",
      "Security audit with HaveIBeenPwned breach checks (k-anonymity)",
      "Best-effort memory locking (mlock / VirtualLock)",
      "Cross-platform CI: secret scanning, dependency CVE checks, 8 required merge checks",
    ],
    tech: ["Python", "Textual", "SQLite", "Cryptography"],
    github: "https://github.com/scorpiocodex/Nyxora",
    pypi: "https://pypi.org/project/nyxora/",
    accentColor: "#3FB950",
    overview:
      "Nyxora was designed around one principle: your secrets should never exist in plaintext outside your machine. The vault is a local, encrypted SQLite file; nothing is synced anywhere. It is a personal project built as a craft exercise in applied cryptography and terminal UI design — it has not been independently audited, and the README says so plainly.",
    architecture: [
      "Key Derivation — Argon2id (256 MiB memory cost by default) turns the master password into the vault key",
      "Cipher Engine — XChaCha20-Poly1305 AEAD with 192-bit nonces; AES-256-GCM is also supported",
      "Vault Storage — SQLite in WAL mode, with a per-entry HMAC for field-level tampering and a vault-wide HMAC for deleted or inserted entries",
      "Security Audit — HaveIBeenPwned range API (k-anonymity) plus weak and reused password detection",
      "Memory Guard — Best-effort mlock (Linux) / VirtualLock (Windows) so key material is not swapped to disk",
    ],
    designDecisions: [
      {
        title: "Argon2id over bcrypt/scrypt",
        description:
          "Argon2 won the Password Hashing Competition. The id variant mixes data-dependent and data-independent memory access, so it resists both GPU cracking and side-channel attacks.",
      },
      {
        title: "XChaCha20 over AES-GCM",
        description:
          "XChaCha20 has a 192-bit nonce (vs AES-GCM's 96-bit), which makes random nonce collisions astronomically unlikely — important for a vault that stores many entries.",
      },
      {
        title: "Offline-first, no cloud sync",
        description:
          "Cloud sync adds attack surface. Nyxora keeps everything local and offers recovery capsules and Shamir-style secret splitting instead of a cloud backup.",
      },
      {
        title: "Fail safe on a wrong password",
        description:
          "A data-loss bug let a single wrong password permanently lock older vaults. Verification now runs first inside a rollback-safe transaction, and affected vaults repair themselves on the next correct unlock.",
      },
    ],
    terminalDemo: [
      {
        command: "nyx --version",
        output: `  ◆ NYXORA  Tactical Secrets Vault
  Version   v3.1.1
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
        command: 'nyx generate entropy "hunter2"',
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
    terminalDemoNote:
      "Sample session replayed from real CLI output. The generated values are throwaway examples.",
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
