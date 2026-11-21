/* ─── Skills, grouped as on the resume ─────────────────────────────────────
   Order is the on-page reading order: the first three groups form the left column and
   the rest the right column (see Skills.tsx), which keeps both columns about equally tall. */

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
    category: "Frontend",
    number: "02",
    color: "#00B8D4",
    skills: ["React", "Vite", "Tailwind CSS"],
  },
  {
    category: "AI / LLM",
    number: "03",
    color: "#F0883E",
    skills: [
      "LLM integration",
      "Ollama",
      "Llama 3.2",
      "Prompt engineering for structured data extraction",
    ],
  },
  {
    category: "Backend",
    number: "04",
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
