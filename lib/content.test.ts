import { describe, expect, it } from "vitest";
import { NAV_LINKS, SITE, SOCIAL } from "./constants";
import { PROJECTS, getAllSlugs, getProjectBySlug } from "./projects";
import { SKILL_GROUPS } from "./skills";

describe("project data", () => {
  it("has unique slugs and numbers", () => {
    expect(new Set(getAllSlugs()).size).toBe(PROJECTS.length);
    expect(new Set(PROJECTS.map((p) => p.number)).size).toBe(PROJECTS.length);
  });

  it.each(PROJECTS.map((p) => [p.slug, p] as const))(
    "%s is complete and well-formed",
    (_slug, p) => {
      expect(p.accentColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(p.github).toMatch(/^https:\/\/github\.com\/scorpiocodex\//);
      if (p.pypi) expect(p.pypi).toMatch(/^https:\/\/pypi\.org\/project\//);
      expect(p.features.length).toBeGreaterThan(0);
      expect(p.designDecisions.length).toBeGreaterThan(0);
      // The detail page splits architecture items on " — " into title + description.
      for (const item of p.architecture) expect(item).toContain(" — ");
      for (const step of p.terminalDemo ?? []) expect(step.output.length).toBeGreaterThan(0);
      // A demo must say where its output comes from.
      if (p.terminalDemo) expect(p.terminalDemoNote).toBeTruthy();
    },
  );

  it("looks projects up by slug", () => {
    expect(getProjectBySlug("nyxora")?.name).toBe("Nyxora");
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("skills", () => {
  it("has no empty or duplicated categories", () => {
    const names = SKILL_GROUPS.map((g) => g.category);
    expect(new Set(names).size).toBe(names.length);
    for (const group of SKILL_GROUPS) expect(group.skills.length).toBeGreaterThan(0);
  });
});

describe("site constants", () => {
  it("uses HTTPS URLs and the public contact alias", () => {
    expect(SITE.url).toMatch(/^https:\/\//);
    expect(SOCIAL.github.url).toMatch(/^https:\/\/github\.com\//);
    expect(SOCIAL.linkedin.url).toMatch(/^https:\/\/www\.linkedin\.com\//);
    expect(SOCIAL.email).toContain("@");
  });

  it("has a nav entry per section with matching hash links", () => {
    for (const link of NAV_LINKS) expect(link.href).toBe(`#${link.id}`);
    expect(new Set(NAV_LINKS.map((l) => l.id)).size).toBe(NAV_LINKS.length);
  });
});
