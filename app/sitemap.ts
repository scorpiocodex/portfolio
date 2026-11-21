import { SITE } from "@/lib/constants";
import { getAllSlugs } from "@/lib/projects";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  const projectPages = getAllSlugs().map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectPages,
  ];
}
