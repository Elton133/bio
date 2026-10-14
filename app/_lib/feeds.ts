// External content pulled in at build time and refreshed hourly.
// If a source is unreachable the site renders without it instead of failing.

const HOUR = 3600;
export const SUBSTACK_URL = "https://eltonmorden.substack.com";
export const GITHUB_USER = "Elton133";
// Tag a repo with this topic on GitHub to feature it on /work.
export const GITHUB_TOPIC = "portfolio";
// Never shown, even if tagged: projects whose code is kept private on purpose, plus throwaway repos.
const GITHUB_EXCLUDE = ["speakup", "v0-grievance-management-system", "bookish-octo-funicular"];

export type ExternalPost = { title: string; url: string; date: string; summary: string; source: "SUBSTACK" | "LINKEDIN" };
export type Repo = { name: string; title: string; description: string; url: string; homepage: string | null; language: string | null; stars: number; updated: string };

const decode = (s: string) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  .replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .trim();
const tag = (xml: string, name: string) => decode(xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? "");

// YYYY.MM.DD, matching the dates used for on-site notes
export const dotDate = (d: Date) => `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${String(d.getUTCDate()).padStart(2, "0")}`;

export async function getSubstackPosts(): Promise<ExternalPost[]> {
  try {
    const res = await fetch(`${SUBSTACK_URL}/feed`, { next: { revalidate: HOUR } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
      title: tag(item, "title"),
      url: tag(item, "link"),
      date: dotDate(new Date(tag(item, "pubDate"))),
      summary: tag(item, "description"),
      source: "SUBSTACK" as const,
    })).filter(p => p.title && p.url);
  } catch {
    return [];
  }
}

type GitHubRepo = { name: string; description: string | null; html_url: string; homepage: string | null; language: string | null; stargazers_count: number; pushed_at: string; fork: boolean; archived: boolean; topics?: string[] };

const prettify = (name: string) => name.replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());

export async function getFeaturedRepos(limit = 9): Promise<{ repos: Repo[]; curated: boolean }> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: HOUR },
    });
    if (!res.ok) return { repos: [], curated: false };
    const all = (await res.json()) as GitHubRepo[];
    const own = all.filter(r => !r.fork && !r.archived && r.name !== GITHUB_USER && !GITHUB_EXCLUDE.includes(r.name));
    const tagged = own.filter(r => r.topics?.includes(GITHUB_TOPIC));
    // Until repos are tagged, fall back to recent projects that have a live demo.
    const picked = tagged.length ? tagged : own.filter(r => r.homepage && !/test/i.test(r.name));
    return {
      curated: tagged.length > 0,
      repos: picked.slice(0, limit).map(r => ({
        name: r.name,
        title: prettify(r.name),
        description: r.description ?? "",
        url: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        stars: r.stargazers_count,
        updated: r.pushed_at.slice(0, 4),
      })),
    };
  } catch {
    return { repos: [], curated: false };
  }
}
