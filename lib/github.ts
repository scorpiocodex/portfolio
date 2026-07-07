import { SOCIAL } from "./constants";

export interface Repo {
  name: string;
  description: string;
  language: string;
  langColor: string;
  stars: string | number;
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
  contributions: ContributionWeek[];
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

/* ─── Static fallback ─────────────────────────────────────────────────── */
const STATIC_FALLBACK: GitHubData = {
  user: {
    name: "San Shibu",
    login: SOCIAL.github.username,
    avatarUrl: SOCIAL.github.avatarUrl,
    url: SOCIAL.github.url,
  },
  repos: [
    {
      name: "Nyxora",
      description: "Terminal-native, zero-knowledge password vault. Argon2id key derivation + XChaCha20-Poly1305 authenticated encryption, offline-first architecture, and a polished terminal interface.",
      language: "Python",
      langColor: "#3572A5",
      stars: "—",
      url: "https://github.com/scorpiocodex/Nyxora",
      accent: "#58A6FF",
    },
  ],
  contributions: generateMockContributions(),
};

function generateMockContributions() {
  const weeks: ContributionWeek[] = [];
  const colors = ["#161B22", "#0E4429", "#006D32", "#26A641", "#39D353"];
  const totalDays = 26 * 7;
  const today = new Date();
  for (let w = 0; w < 26; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const index = w * 7 + d;
      const pseudo = ((index * 1103515245 + 12345) & 0x7fffffff) % 100;
      let level = 0;
      if (pseudo >= 40 && pseudo < 60) level = 1;
      else if (pseudo >= 60 && pseudo < 75) level = 2;
      else if (pseudo >= 75 && pseudo < 88) level = 3;
      else if (pseudo >= 88) level = 4;
      const cellDate = new Date(today);
      cellDate.setDate(today.getDate() - (totalDays - 1 - index));
      const date = cellDate.toISOString().slice(0, 10);
      days.push({ color: colors[level], contributionCount: level * 3, date });
    }
    weeks.push({ contributionDays: days });
  }
  return weeks;
}

/* ─── Data fetcher ────────────────────────────────────────────────────── */
export async function getGitHubData(): Promise<GitHubData> {
  const token = process.env.GITHUB_PAT;
  const username = SOCIAL.github.username;

  if (!token) {
    return STATIC_FALLBACK;
  }

  try {
    const query = `
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

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const json: GitHubGraphQLResponse = await res.json();

    if (json.errors || !json.data?.user) {
      throw new Error(json.errors?.[0]?.message || "Failed to fetch GitHub data");
    }

    const user = json.data.user;
    const colorsList = ["#58A6FF", "#7C3AED", "#00E5FF", "#3FB950", "#E34C26", "#F05133"];

    const repos: Repo[] = user.pinnedItems.nodes.map((repo, index) => ({
      name: repo.name,
      description: repo.description || "",
      language: repo.primaryLanguage?.name || "Unknown",
      langColor: repo.primaryLanguage?.color || "#888888",
      stars: repo.stargazerCount,
      url: repo.url,
      accent: colorsList[index % colorsList.length],
    }));

    const allWeeks = user.contributionsCollection.contributionCalendar.weeks;
    const recentWeeks = allWeeks.slice(-26);

    return {
      user: {
        name: user.name || "San Shibu",
        login: user.login,
        avatarUrl: user.avatarUrl,
        url: user.url,
      },
      repos: repos.length > 0 ? repos : STATIC_FALLBACK.repos,
      contributions: recentWeeks,
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return STATIC_FALLBACK;
  }
}
