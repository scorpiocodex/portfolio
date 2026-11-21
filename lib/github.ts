import { SOCIAL, SITE } from "./constants";
import { PROJECTS } from "./projects";

export interface Repo {
  name: string;
  description: string;
  language: string | null;
  langColor: string;
  /** null when the star count is unknown (static fallback) — the UI hides it. */
  stars: number | null;
  url: string;
  accent: string;
}

export interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface GitHubData {
  user: {
    name: string;
    login: string;
    avatarUrl: string | null;
    url: string;
  };
  repos: Repo[];
  /**
   * Real contribution weeks from GitHub, or null when live data is unavailable.
   * The site never invents activity: null renders an explicit "unavailable" state.
   */
  contributions: ContributionWeek[] | null;
}

/* ─── Typed GraphQL response ──────────────────────────────────────────── */
interface GitHubGraphQLRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

interface GitHubGraphQLUser {
  name: string | null;
  login: string;
  avatarUrl: string;
  url: string;
  pinnedItems: {
    nodes: GitHubGraphQLRepo[];
  };
  contributionsCollection: {
    contributionCalendar: {
      weeks: ContributionWeek[];
    };
  };
}

interface GitHubGraphQLResponse {
  data?: {
    user?: GitHubGraphQLUser;
  };
  errors?: { message: string }[];
}

const CONTRIBUTION_WEEKS = 26;
const ACCENTS = ["#58A6FF", "#7C3AED", "#00E5FF", "#3FB950", "#E34C26", "#F05133"];

/* ─── Static fallback ─────────────────────────────────────────────────── */
/**
 * Used when no token is configured or the API cannot be reached at build time.
 * Repos come from the project data; contributions are deliberately null.
 */
export function getStaticFallback(): GitHubData {
  return {
    user: {
      name: SITE.name,
      login: SOCIAL.github.username,
      avatarUrl: SOCIAL.github.avatarUrl,
      url: SOCIAL.github.url,
    },
    repos: PROJECTS.map((project) => ({
      name: project.name,
      description: project.description,
      language: "Python",
      langColor: "#3572A5",
      stars: null,
      url: project.github,
      accent: project.accentColor,
    })),
    contributions: null,
  };
}

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      name
      login
      avatarUrl
      url
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              color
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

async function fetchLiveData(token: string): Promise<GitHubData> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { username: SOCIAL.github.username } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status}`);
  }

  const json: GitHubGraphQLResponse = await res.json();
  const user = json.data?.user;

  if (json.errors?.length || !user) {
    throw new Error(json.errors?.[0]?.message || "GitHub API returned no user data");
  }

  const weeks = user.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) {
    throw new Error("GitHub API returned no contribution calendar");
  }

  const repos: Repo[] = user.pinnedItems.nodes.map((repo, index) => ({
    name: repo.name,
    description: repo.description || "",
    language: repo.primaryLanguage?.name ?? null,
    langColor: repo.primaryLanguage?.color || "#888888",
    stars: repo.stargazerCount,
    url: repo.url,
    accent: ACCENTS[index % ACCENTS.length],
  }));

  return {
    user: {
      name: user.name || SITE.name,
      login: user.login,
      avatarUrl: user.avatarUrl,
      url: user.url,
    },
    repos: repos.length > 0 ? repos : getStaticFallback().repos,
    contributions: weeks.slice(-CONTRIBUTION_WEEKS),
  };
}

/**
 * When a statically generated page is *re*-generated at runtime (ISR) and GitHub
 * is down, throwing makes Next.js keep serving the last good page instead of
 * caching a degraded one for an hour. At build time (and in dev) we degrade
 * gracefully instead so a missing/expired token never blocks a deploy.
 */
function shouldKeepLastGoodPage(): boolean {
  return (
    process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build"
  );
}

/* ─── Data fetcher ────────────────────────────────────────────────────── */
export async function getGitHubData(): Promise<GitHubData> {
  const token = process.env.GITHUB_PAT?.trim();

  if (!token) {
    console.warn("[github] GITHUB_PAT is not set — the GitHub section will show no live data.");
    return getStaticFallback();
  }

  try {
    return await fetchLiveData(token);
  } catch (error) {
    if (shouldKeepLastGoodPage()) {
      throw error;
    }
    console.warn(
      `[github] Live data unavailable (${error instanceof Error ? error.message : String(error)}) — ` +
        "the GitHub section will show no live data. Check GITHUB_PAT.",
    );
    return getStaticFallback();
  }
}
