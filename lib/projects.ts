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
        slug: "watchflow",
        name: "Watchflow",
        number: "01",
        tagline: "Pipeline Automation CLI",
        description:
            "Next-generation pipeline automation CLI. Define NLP intents in YAML to instantly trigger topological shell workflows on file changes. Includes built-in daemon orchestration, dry-run simulation, and cross-session analytics.",
        features: [
            "YAML-defined NLP intent triggers",
            "Topological shell workflow execution",
            "Built-in daemon orchestration",
            "Dry-run simulation mode",
            "Cross-session analytics",
        ],
        tech: ["Python", "YAML", "Shell", "Watchdog"],
        github: "https://github.com/scorpiocodex/Watchflow",
        accentColor: "#58A6FF",
        overview:
            "Watchflow was born from the frustration of manually re-running build pipelines on file changes. Instead of writing brittle file-watcher scripts, Watchflow lets you define intents in natural language via YAML — the engine parses them, resolves dependency order topologically, and orchestrates shell workflows automatically.",
        architecture: [
            "YAML Intent Parser — Converts human-readable intent definitions into executable DAG nodes",
            "Topological Scheduler — Resolves dependencies between pipeline stages and determines optimal execution order",
            "Watchdog Integration — Native filesystem event monitoring with debounce and path filtering",
            "Daemon Orchestrator — Background process management with graceful shutdown and signal handling",
            "Analytics Engine — Cross-session metrics tracking with duration, success/failure rates, and pipeline throughput",
        ],
        designDecisions: [
            {
                title: "YAML over JSON for config",
                description:
                    "YAML's readability and support for comments make it ideal for pipeline definitions that teams need to understand and maintain.",
            },
            {
                title: "Topological sort for execution order",
                description:
                    "DAG-based scheduling ensures stages with dependencies always run after their prerequisites, preventing race conditions.",
            },
            {
                title: "Daemon mode with PID management",
                description:
                    "Long-running watchers need proper process lifecycle management to avoid orphaned processes and resource leaks.",
            },
        ],
        terminalDemo: [
            {
                command: "watchflow --version",
                output: "Watchflow v2.1.0 — Pipeline Automation Engine",
                delay: 600,
            },
            {
                command: "cat watchflow.yaml",
                output: `intents:
  - name: "build on save"
    trigger: "when python files change"
    path: "./src/**/*.py"
    pipeline:
      - stage: lint
        run: "flake8 src/"
      - stage: test
        run: "pytest tests/ -v"
        depends_on: [lint]
      - stage: build
        run: "python -m build"
        depends_on: [test]`,
                delay: 1200,
            },
            {
                command: "watchflow run --dry-run",
                output: `⚡ Dry-run mode — no commands will be executed

  Parsing intents ......... ✓ 1 intent loaded
  Resolving DAG ........... ✓ 3 stages (lint → test → build)
  Validating paths ........ ✓ ./src/**/*.py (14 files matched)

  Pipeline Preview:
  ┌─────────┬──────────────────────┬──────────────┐
  │  Stage  │  Command             │  Depends On  │
  ├─────────┼──────────────────────┼──────────────┤
  │  lint   │  flake8 src/         │  —           │
  │  test   │  pytest tests/ -v    │  lint        │
  │  build  │  python -m build     │  test        │
  └─────────┴──────────────────────┴──────────────┘

  ✓ Pipeline is valid. Ready to watch.`,
                delay: 1500,
            },
            {
                command: "watchflow run",
                output: `👁 Watching ./src/**/*.py for changes...
  Daemon PID: 48721

  [20:14:32] ✏ File changed: src/engine.py
  [20:14:32] ⚡ Triggering pipeline: "build on save"
  [20:14:33] ┃ lint  ✓ passed (0.8s)
  [20:14:35] ┃ test  ✓ 12 passed, 0 failed (1.4s)
  [20:14:36] ┃ build ✓ dist/watchflow-2.1.0.tar.gz (0.6s)
  [20:14:36] ✓ Pipeline complete (2.8s total)`,
                delay: 800,
            },
        ],
    },
    {
        slug: "termbackup",
        name: "Termbackup",
        number: "02",
        tagline: "Zero-Knowledge Backup System",
        description:
            "Advanced zero-knowledge backup architecture interfacing directly with the GitHub API. Engineered with mathematically enforced security, automated snapshot logic, and next-generation terminal UI paradigms.",
        features: [
            "Zero-knowledge backup architecture",
            "Direct GitHub API integration",
            "Mathematically enforced security",
            "Automated directory snapshots",
            "File validation and restore",
        ],
        tech: ["Python", "GitHub API", "Cryptography", "CLI"],
        github: "https://github.com/scorpiocodex/Termbackup",
        accentColor: "#7C3AED",
        overview:
            "Termbackup solves a critical problem: how do you back up sensitive files to a remote repository without the remote ever seeing your plaintext data? It encrypts everything client-side before pushing to GitHub, ensuring zero-knowledge security. Even if the repository is compromised, the data remains encrypted.",
        architecture: [
            "Client-Side Encryption — All data is encrypted locally before any network call, ensuring zero-knowledge guarantee",
            "GitHub API Interface — Direct REST API integration for creating repos, pushing blobs, and managing trees",
            "Snapshot Engine — Recursive directory traversal with hash-based change detection for incremental backups",
            "Integrity Validator — SHA-256 checksums verify data integrity on both backup and restore operations",
            "Key Derivation — PBKDF2 with configurable iterations for password-to-key derivation",
        ],
        designDecisions: [
            {
                title: "GitHub as storage backend",
                description:
                    "Git's content-addressable storage, versioning, and free hosting make it an ideal encrypted backup target — with the bonus of version history.",
            },
            {
                title: "Client-side only encryption",
                description:
                    "The server never sees unencrypted data. This zero-knowledge architecture means even a compromised GitHub account doesn't expose your files.",
            },
            {
                title: "Incremental snapshots over full copies",
                description:
                    "Hash-based change detection means only modified files are re-encrypted and pushed, reducing bandwidth and API calls.",
            },
        ],
        terminalDemo: [
            {
                command: "termbackup --help",
                output: `╔═══════════════════════════════════════════╗
║   TERMBACKUP — Zero-Knowledge Backup     ║
╚═══════════════════════════════════════════╝

Commands:
  backup    Encrypt and push a directory
  restore   Pull and decrypt from remote
  status    Show sync status
  diff      Compare local vs remote`,
                delay: 800,
            },
            {
                command: "termbackup backup ./projects --repo scorpiocodex/vault",
                output: `🔐 Initializing zero-knowledge backup...

  Scanning directory ........ 47 files found
  Computing hashes .......... ✓ SHA-256 checksums
  Detecting changes ......... 12 new, 3 modified, 0 deleted

  Encrypting files:
    ████████████████████████████ 15/15 [100%]

  Pushing to GitHub:
    Repository: scorpiocodex/vault
    Branch: encrypted/main
    Committing blob tree ..... ✓
    Updating ref ............. ✓

  ✓ Backup complete — 15 files encrypted and pushed
  ✓ Snapshot ID: snap_a3f8c1d2`,
                delay: 1500,
            },
            {
                command: "termbackup status",
                output: `  Repository:  scorpiocodex/vault
  Last sync:   2 minutes ago
  Local files: 47  |  Remote: 47
  Status:      ✓ In sync

  Snapshots:
  ┌──────────────┬───────────┬───────────┐
  │  Snapshot     │  Files    │  Date     │
  ├──────────────┼───────────┼───────────┤
  │  snap_a3f8c1 │  15 files │  just now │
  │  snap_7e2b09 │  32 files │  2d ago   │
  │  snap_1c4a5f │  47 files │  5d ago   │
  └──────────────┴───────────┴───────────┘`,
                delay: 800,
            },
        ],
    },
    {
        slug: "fluxion",
        name: "Fluxion",
        number: "03",
        tagline: "Intelligent Network Command Engine",
        description:
            "Next-gen CLI download accelerator with adaptive parallel transport, real-time network telemetry, and TLS deep inspection. Multi-protocol support across HTTP/2, HTTP/3 QUIC, FTP, SFTP, and SCP. Built for speed and precision.",
        features: [
            "Adaptive parallel transport engine",
            "Real-time network telemetry",
            "TLS deep inspection",
            "HTTP/2 · HTTP/3 QUIC · FTP · SFTP · SCP",
            "Browser-grade stealth mode",
        ],
        tech: ["Python", "HTTP/2", "HTTP/3 QUIC", "Networking"],
        github: "https://github.com/scorpiocodex/Fluxion",
        accentColor: "#00E5FF",
        overview:
            "Fluxion was built because existing CLI downloaders (wget, curl) don't leverage modern protocols or adaptive parallelism. Fluxion auto-detects the optimal protocol (HTTP/2, HTTP/3 QUIC, FTP), splits downloads into parallel streams, and adapts chunk sizes based on real-time network conditions.",
        architecture: [
            "Protocol Negotiator — Auto-detects and selects the fastest available protocol (HTTP/2, HTTP/3 QUIC, FTP, SFTP, SCP)",
            "Parallel Transport Engine — Splits downloads into adaptive chunk streams with dynamic concurrency tuning",
            "Network Telemetry — Real-time bandwidth monitoring, latency tracking, and throughput optimization",
            "TLS Inspector — Deep packet inspection for certificate chain analysis and security audit",
            "Stealth Mode — Browser-grade User-Agent rotation, header mimicry, and request pattern randomization",
        ],
        designDecisions: [
            {
                title: "Adaptive over fixed parallelism",
                description:
                    "Fixed thread counts waste bandwidth on fast connections and overwhelm slow ones. Adaptive parallelism measures RTT and adjusts concurrency in real-time.",
            },
            {
                title: "Multi-protocol by default",
                description:
                    "Rather than forcing users to specify protocols, Fluxion auto-negotiates the fastest option, including cutting-edge HTTP/3 QUIC.",
            },
            {
                title: "Stealth mode for reliability",
                description:
                    "Many servers rate-limit or block CLI user-agents. Browser-grade header mimicry ensures consistent download reliability.",
            },
        ],
        terminalDemo: [
            {
                command: "fluxion --version",
                output: "Fluxion v3.2.0 — Intelligent Network Command Engine",
                delay: 600,
            },
            {
                command: "fluxion get https://releases.ubuntu.com/22.04/ubuntu-22.04.3-desktop-amd64.iso",
                output: `⚡ Fluxion — Intelligent Download

  URL:       releases.ubuntu.com/.../ubuntu-22.04.3-desktop-amd64.iso
  Size:      4.7 GB
  Protocol:  HTTP/2 (auto-negotiated)
  Threads:   8 (adaptive)

  Downloading:
  ████████████████░░░░░░░░░░░░ 58%  2.73 GB / 4.7 GB

  Speed:     124.6 MB/s (↑ adapting)
  ETA:       00:00:16
  Chunks:    [██ ██ ██ ██ ██ ██ ░░ ░░]

  Network Telemetry:
    RTT: 12ms | Bandwidth: 1.02 Gbps | Loss: 0.01%`,
                delay: 2000,
            },
            {
                command: "fluxion inspect https://github.com --tls",
                output: `🔒 TLS Deep Inspection

  Host:         github.com:443
  Protocol:     TLSv1.3
  Cipher:       TLS_AES_128_GCM_SHA256
  Certificate:
    Subject:    CN=github.com
    Issuer:     DigiCert TLS Hybrid ECC SHA384 2020 CA1
    Valid:      2024-03-07 → 2025-03-07
    Key:        ECDSA P-256 (256 bit)
    Serial:     0A:0B:83:F5:...:2C:9D

  Chain:
    [0] github.com ✓
    [1] DigiCert TLS Hybrid ECC ✓
    [2] DigiCert Global Root CA ✓

  ✓ Certificate chain is valid`,
                delay: 1000,
            },
        ],
    },
    {
        slug: "nyxora",
        name: "Nyxora",
        number: "04",
        tagline: "Cryptographic Cipher Vault",
        description:
            "Terminal-native, zero-knowledge, quantum-resilient password vault. Military-grade encryption (Argon2id + XChaCha20-Poly1305) with offline-first architecture, Shamir's Secret Sharing recovery, and a cyberpunk CLI interface.",
        features: [
            "Argon2id + XChaCha20-Poly1305 encryption",
            "Zero-knowledge offline-first architecture",
            "Shamir's Secret Sharing recovery",
            "Intel engine with breach detection (HIBP)",
            "Memory-guarded key handling (mlock/VirtualLock)",
        ],
        tech: ["Python", "Cryptography", "SQLite", "CLI"],
        github: "https://github.com/scorpiocodex/Nyxora",
        accentColor: "#3FB950",
        overview:
            "Nyxora was designed with one principle: your secrets should never exist in plaintext outside your machine. It uses Argon2id for key derivation and XChaCha20-Poly1305 for encryption — both quantum-resilient algorithms. The vault is entirely offline-first, with optional Shamir's Secret Sharing for recovery key distribution.",
        architecture: [
            "Key Derivation — Argon2id with tunable memory/time parameters for hardware-adaptive password hashing",
            "Cipher Engine — XChaCha20-Poly1305 AEAD encryption with per-entry unique nonces",
            "Vault Storage — SQLite with WAL mode for concurrent-safe, atomic credential storage",
            "Intel Engine — Have I Been Pwned (HIBP) k-anonymity API for breach detection without exposing passwords",
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
                command: "nyxora --help",
                output: `╔══════════════════════════════════════════╗
║         NYXORA — CIPHER VAULT           ║
║   Zero-Knowledge Password Manager       ║
╚══════════════════════════════════════════╝

Commands:
  init       Initialize a new vault
  add        Store a credential
  get        Retrieve a credential
  list       List stored entries
  intel      Run breach detection scan
  export     Export vault (encrypted)
  recovery   Manage Shamir recovery keys`,
                delay: 800,
            },
            {
                command: "nyxora init --vault personal",
                output: `🔐 Initializing vault: personal

  Master password: ●●●●●●●●●●●●●●●●
  Confirm:         ●●●●●●●●●●●●●●●●

  Deriving key (Argon2id):
    Memory:     256 MB
    Iterations: 4
    Parallelism: 4
    ████████████████████████████ 100%

  ✓ Vault "personal" initialized
  ✓ XChaCha20-Poly1305 cipher ready
  ✓ SQLite WAL mode enabled
  ✓ Memory guard: mlock active`,
                delay: 1500,
            },
            {
                command: "nyxora add github --vault personal",
                output: `  Entry: github
  Username: scorpiocodex
  Password: ●●●●●●●●●●●●
  URL:      https://github.com

  Encrypting with XChaCha20-Poly1305...
  Nonce:    [random 192-bit] ✓
  Tag:      [AEAD verified] ✓

  ✓ Credential encrypted and stored
  ✓ Entry ID: nx_8f2a1c4d`,
                delay: 1200,
            },
            {
                command: "nyxora intel --vault personal",
                output: `🛡 Intel Engine — Breach Detection

  Scanning 3 stored credentials...

  ┌──────────┬──────────────┬─────────────────┐
  │  Entry   │  Status      │  Details        │
  ├──────────┼──────────────┼─────────────────┤
  │  github  │  ✓ Clean     │  No breaches    │
  │  email   │  ⚠ Warning   │  2 breaches     │
  │  aws     │  ✓ Clean     │  No breaches    │
  └──────────┴──────────────┴─────────────────┘

  Method: HIBP k-anonymity (SHA-1 prefix)
  ✓ No passwords were transmitted`,
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
