/* ─── Skills, grouped exactly as on the resume ─────────────────────────── */

export interface SkillGroup {
  category: string;
  number: string;
  color: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    number: "01",
    color: "#58A6FF",
    skills: ["Python", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    category: "Backend",
    number: "02",
    color: "#7C3AED",
    skills: [
      "FastAPI",
      "Celery",
      "Redis",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "REST APIs",
      "JWT",
      "asyncio",
      "Node.js",
      "Express",
    ],
  },
  {
    category: "Frontend",
    number: "03",
    color: "#00B8D4",
    skills: ["React", "Vite", "Tailwind CSS"],
  },
  {
    category: "AI / LLM",
    number: "04",
    color: "#F0883E",
    skills: [
      "LLM integration",
      "Ollama",
      "Llama 3.2",
      "Prompt engineering for structured data extraction",
    ],
  },
  {
    category: "DevOps & Tools",
    number: "05",
    color: "#3FB950",
    skills: [
      "pytest",
      "mypy",
      "Docker",
      "GitHub Actions (CI/CD)",
      "Git",
      "Linux",
      "Vercel",
      "Twilio API",
      "Postman",
    ],
  },
];

/** Total number of distinct skills listed — used for the About-page counter. */
export const SKILL_COUNT = new Set(SKILL_GROUPS.flatMap((g) => g.skills)).size;
