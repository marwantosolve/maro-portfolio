import { ArrowUpRight, Star } from "lucide-react";
import { getGitHubRepos, formatMonthYear, type GitHubRepo } from "@/lib/github";
import { portfolioConfig } from "@/content/portfolio.config";

/*
  "More from GitHub" — built live from Marwan's public repos.
  What appears (and its order) is controlled in content/portfolio.config.ts.
  Server component: data is fetched with a 1-hour revalidation window.
*/

function languageColor(language: string | null): string {
  switch (language) {
    case "Python":
      return "#3572a5";
    case "TypeScript":
      return "#3178c6";
    case "JavaScript":
      return "#d4b938";
    case "Shell":
      return "#6fbf5f";
    case "C++":
      return "#f34b7d";
    case "C#":
      return "#7a3fa0";
    case "Jupyter Notebook":
      return "#da5b0b";
    default:
      return "#8b949e";
  }
}

function RepoRow({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 border-t border-border py-5 transition-colors last:border-b hover:bg-surface"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {repo.name}
          </h3>
          {repo.description && (
            <span className="text-sm text-muted">{repo.description}</span>
          )}
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: languageColor(repo.language) }}
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star size={11} strokeWidth={1.75} aria-hidden />
            <span className="tnum">{repo.stars}</span>
          </span>
          {repo.updatedAt && (
            <span className="tnum normal-case tracking-[0.08em]">
              updated {formatMonthYear(repo.updatedAt)}
            </span>
          )}
        </div>
      </div>
      <ArrowUpRight
        size={16}
        strokeWidth={1.5}
        className="shrink-0 text-muted/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
      />
    </a>
  );
}

export async function GitHubRepoList() {
  const repos = await getGitHubRepos();

  if (!repos) {
    return (
      <div className="border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted">
          Live repository data is unavailable right now — visit{" "}
          <a
            href={`https://github.com/${portfolioConfig.github.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text underline underline-offset-4"
          >
            github.com/{portfolioConfig.github.username}
          </a>{" "}
          for the full list.
        </p>
      </div>
    );
  }

  const byName = new Map(repos.map((r) => [r.name, r]));
  const configured = portfolioConfig.github.repos;

  const listed = configured
    .filter((c) => c.show)
    .map((c) => byName.get(c.name))
    .filter((r): r is GitHubRepo => Boolean(r));

  const unlisted = portfolioConfig.github.showUnlisted
    ? repos.filter((r) => !configured.some((c) => c.name === r.name))
    : [];

  const shown = [...listed, ...unlisted];

  if (shown.length === 0) {
    return null;
  }

  return (
    <div>
      {shown.map((repo) => (
        <RepoRow key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
