export interface Repo {
  name: string;
  description: string;
  language: string;
  langColor: string;
  stars: string | number;
  url: string;
  accent: string;
}

export interface ContributionWeek {
  contributionDays: {
    color: string;
    contributionCount: number;
    date: string;
  }[];
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

const STATIC_FALLBACK: GitHubData = {
  user: {
    name: "San Shibu",
    login: "scorpiocodex",
    avatarUrl: null,
    url: "https://github.com/scorpiocodex",
  },
  repos: [
    {
      name: "Watchflow",
      description: "Next-gen pipeline automation CLI — define NLP intents in YAML to trigger topological shell workflows on file changes. Daemon orchestration + dry-run simulation.",
      language: "Python",
      langColor: "#3572A5",
      stars: "—",
      url: "https://github.com/scorpiocodex/Watchflow",
      accent: "#58A6FF",
    },
    {
      name: "Termbackup",
      description: "Advanced zero-knowledge backup architecture interfacing directly with the GitHub API. Mathematically enforced security and next-gen terminal UI paradigms.",
      language: "Python",
      langColor: "#3572A5",
      stars: "—",
      url: "https://github.com/scorpiocodex/Termbackup",
      accent: "#7C3AED",
    },
    {
      name: "Fluxion",
      description: "The Intelligent Network Command Engine — CLI download accelerator with adaptive parallel transport, TLS deep inspection, and HTTP/2 · HTTP/3 QUIC · FTP · SFTP · SCP.",
      language: "Python",
      langColor: "#3572A5",
      stars: "—",
      url: "https://github.com/scorpiocodex/Fluxion",
      accent: "#00E5FF",
    },
    {
      name: "Tasklite",
      description: "Simple tasks. Clean flow. Full-stack todo app built with Node.js/Express and Vanilla JS — optimistic UI, dark mode, inline editing & LocalStorage persistence.",
      language: "JavaScript",
      langColor: "#F7DF1E",
      stars: "—",
      url: "https://github.com/scorpiocodex/Tasklite",
      accent: "#3FB950",
    },
  ],
  contributions: generateMockContributions(),
};

function generateMockContributions() {
  const weeks: ContributionWeek[] = [];
  const colors = ["#161B22", "#0E4429", "#006D32", "#26A641", "#39D353"];
  for (let w = 0; w < 26; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const seed = w * 7 + d;
      const pseudo = ((seed * 1103515245 + 12345) & 0x7fffffff) % 100;
      let level = 0;
      if (pseudo >= 40 && pseudo < 60) level = 1;
      else if (pseudo >= 60 && pseudo < 75) level = 2;
      else if (pseudo >= 75 && pseudo < 88) level = 3;
      else if (pseudo >= 88) level = 4;
      days.push({ color: colors[level], contributionCount: level * 3, date: "" });
    }
    weeks.push({ contributionDays: days });
  }
  return weeks;
}

export async function getGitHubData(): Promise<GitHubData> {
  const token = process.env.GITHUB_PAT;
  const username = "scorpiocodex";

  if (!token) {
    console.log("No GITHUB_PAT found. Falling back to static data.");
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
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const { data, errors } = await res.json();

    if (errors || !data?.user) {
      throw new Error(errors?.[0]?.message || "Failed to fetch GitHub data");
    }

    const user = data.user;

    const colorsList = ["#58A6FF", "#7C3AED", "#00E5FF", "#3FB950", "#E34C26", "#F05133"];

    const repos: Repo[] = user.pinnedItems.nodes.map((repo: any, index: number) => ({
      name: repo.name,
      description: repo.description || "",
      language: repo.primaryLanguage?.name || "Unknown",
      langColor: repo.primaryLanguage?.color || "#888888",
      stars: repo.stargazerCount,
      url: repo.url,
      accent: colorsList[index % colorsList.length],
    }));

    // Only take the last 26 weeks for a half-year view
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
    console.log("Falling back to static GitHub data.");
    return STATIC_FALLBACK;
  }
}
