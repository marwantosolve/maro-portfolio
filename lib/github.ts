import { portfolioConfig } from "@/content/portfolio.config";

/*
  Live GitHub data for the portfolio.

  One API call per hour (ISR revalidate), never throws: if GitHub is
  unreachable or rate-limited, callers get null and render their
  graceful fallback — the build can never fail because of GitHub.

  Only PUBLIC repo data is ever returned (the unauthenticated
  /users/:name/repos endpoint can't see anything private).
*/

export type GitHubRepo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string; // ISO date
};

export type RepoStats = {
  stars: number;
  language: string | null;
  updatedAt: string;
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2026-09-25T00:38:39Z" -> "Sep 2026" (locale-independent) */
export function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export async function getGitHubRepos(): Promise<GitHubRepo[] | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${portfolioConfig.github.username}/repos?per_page=100&sort=updated&type=owner`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      },
    );
    if (!res.ok) return null;
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return null;

    return data
      .filter((r) => r && typeof r === "object" && !r.fork)
      .map((r) => ({
        name: String(r.name ?? ""),
        url: String(r.html_url ?? ""),
        description: r.description ? String(r.description) : null,
        language: r.language ? String(r.language) : null,
        stars: Number(r.stargazers_count ?? 0),
        forks: Number(r.forks_count ?? 0),
        updatedAt: String(r.pushed_at ?? r.updated_at ?? ""),
      }))
      .filter((r) => r.name && r.url);
  } catch {
    return null;
  }
}

/** name -> repo, for decorating the curated project cards */
export async function getGitHubRepoMap(): Promise<Map<string, GitHubRepo>> {
  const repos = await getGitHubRepos();
  return new Map((repos ?? []).map((r) => [r.name, r]));
}

/** repo URL (e.g. "https://github.com/marwantosolve/Atlas") -> live stats */
export function statsFor(
  map: Map<string, GitHubRepo>,
  repoUrl?: string,
): RepoStats | undefined {
  if (!repoUrl) return undefined;
  const name = repoUrl.replace(/\/+$/, "").split("/").pop();
  if (!name) return undefined;
  const repo = map.get(name);
  if (!repo) return undefined;
  return { stars: repo.stars, language: repo.language, updatedAt: repo.updatedAt };
}
