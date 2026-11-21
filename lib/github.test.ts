import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getGitHubData, getStaticFallback } from "./github";
import { PROJECTS } from "./projects";

/* A 30-week calendar so we can check that only the most recent 26 are kept. */
function calendar(weeks: number) {
  return Array.from({ length: weeks }, (_, w) => ({
    contributionDays: Array.from({ length: 7 }, (_, d) => ({
      color: "#39d353",
      contributionCount: w + 1,
      date: `2026-01-${String(((w * 7 + d) % 28) + 1).padStart(2, "0")}`,
    })),
  }));
}

function graphqlOk(overrides: { pinned?: unknown[]; weeks?: number } = {}) {
  return {
    data: {
      user: {
        name: "San Shibu",
        login: "scorpiocodex",
        avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
        url: "https://github.com/scorpiocodex",
        pinnedItems: {
          nodes: overrides.pinned ?? [
            {
              name: "Nyxora",
              description: null,
              url: "https://github.com/scorpiocodex/Nyxora",
              stargazerCount: 7,
              primaryLanguage: { name: "Python", color: "#3572A5" },
            },
          ],
        },
        contributionsCollection: {
          contributionCalendar: { weeks: calendar(overrides.weeks ?? 30) },
        },
      },
    },
  };
}

function mockFetch(response: { ok: boolean; status?: number; body?: unknown }) {
  const fn = vi.fn().mockResolvedValue({
    ok: response.ok,
    status: response.status ?? (response.ok ? 200 : 500),
    json: async () => response.body,
  });
  vi.stubGlobal("fetch", fn);
  return fn;
}

beforeEach(() => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("static fallback", () => {
  it("never contains contribution data", () => {
    expect(getStaticFallback().contributions).toBeNull();
  });

  it("lists the featured projects with unknown star counts", () => {
    const { repos } = getStaticFallback();
    expect(repos.map((r) => r.name)).toEqual(PROJECTS.map((p) => p.name));
    expect(repos.every((r) => r.stars === null)).toBe(true);
  });
});

describe("getGitHubData", () => {
  it("returns the fallback (no fetch) when no token is configured", async () => {
    vi.stubEnv("GITHUB_PAT", "");
    const fetchFn = mockFetch({ ok: true, body: graphqlOk() });

    const data = await getGitHubData();

    expect(fetchFn).not.toHaveBeenCalled();
    expect(data.contributions).toBeNull();
    expect(console.warn).toHaveBeenCalled();
  });

  it("maps live data and keeps only the most recent 26 weeks", async () => {
    vi.stubEnv("GITHUB_PAT", "test-token");
    mockFetch({ ok: true, body: graphqlOk({ weeks: 30 }) });

    const data = await getGitHubData();

    expect(data.contributions).toHaveLength(26);
    // The oldest kept week is week index 4 of 30 (counts are w + 1).
    expect(data.contributions?.[0].contributionDays[0].contributionCount).toBe(5);
    expect(data.repos[0]).toMatchObject({ name: "Nyxora", stars: 7, language: "Python" });
    expect(data.repos[0].description).toBe("");
  });

  it("falls back to the featured projects when nothing is pinned", async () => {
    vi.stubEnv("GITHUB_PAT", "test-token");
    mockFetch({ ok: true, body: graphqlOk({ pinned: [] }) });

    const data = await getGitHubData();

    expect(data.repos.map((r) => r.name)).toEqual(PROJECTS.map((p) => p.name));
    expect(data.contributions).not.toBeNull();
  });

  it("degrades without fabricating activity when the token is rejected (dev/build)", async () => {
    vi.stubEnv("GITHUB_PAT", "bad-token");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "phase-production-build");
    mockFetch({ ok: false, status: 401 });

    const data = await getGitHubData();

    expect(data.contributions).toBeNull();
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("401"));
  });

  it("throws on a runtime revalidation failure so the last good page is kept", async () => {
    vi.stubEnv("GITHUB_PAT", "test-token");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "phase-production-server");
    mockFetch({ ok: false, status: 502 });

    await expect(getGitHubData()).rejects.toThrow("502");
  });

  it("treats GraphQL-level errors as failures", async () => {
    vi.stubEnv("GITHUB_PAT", "test-token");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "phase-production-server");
    mockFetch({ ok: true, body: { errors: [{ message: "Bad credentials" }] } });

    await expect(getGitHubData()).rejects.toThrow("Bad credentials");
  });
});
