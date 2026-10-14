import type { MetadataRoute } from "next";
import { notes, projects } from "./_data/site";
import { siteUrl } from "./_lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/stack", "/notes", "/lab", "/contact"].map(path => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly" as const, priority: path ? 0.8 : 1 }));
  const work = projects.map(p => ({ url: `${siteUrl}/work/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.9 }));
  const writing = notes.map(n => ({ url: `${siteUrl}/notes/${n.slug}`, lastModified: new Date(n.date.replaceAll(".", "-")), changeFrequency: "yearly" as const, priority: 0.6 }));
  return [...pages, ...work, ...writing];
}
