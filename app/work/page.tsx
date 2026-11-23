import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FlagshipCard, ProjectCard, CompactCard } from "@/components/work/ProjectCard";
import { GitHubRepoList } from "@/components/work/GitHubRepoList";
import { flagship, majorWork, additionalWork } from "@/content/projects";
import { getGitHubRepoMap, statsFor } from "@/lib/github";
import { portfolioConfig } from "@/content/portfolio.config";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects — multi-agent evaluation, agent observability, RAG platforms, LLM adaptation, and computer vision.",
};

export default async function WorkPage() {
  const repoMap = await getGitHubRepoMap();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Selected Work
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Research, systems, and studies — built end to end.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          A flagship research effort, three end-to-end systems, and a
          computer-vision tracking study. Different shapes of engineering, same standard.
        </p>
      </Reveal>

      {/* flagship */}
      <div className="mt-16">
        <Reveal>
          <SectionHeader index="01" title="Flagship" />
        </Reveal>
        <div className="mt-8">
          <Reveal>
            {flagship.map((project) => (
              <FlagshipCard key={project.slug} project={project} />
            ))}
          </Reveal>
        </div>
      </div>

      {/* major work */}
      <div className="mt-16">
        <Reveal>
          <SectionHeader index="02" title="Major Work" />
        </Reveal>
        <div className="mt-4">
          {majorWork.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard
                project={project}
                index={i}
                stats={statsFor(repoMap, project.repo)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* additional work */}
      <div className="mt-16">
        <Reveal>
          <SectionHeader index="03" title="Additional Work" />
        </Reveal>
        <div className="mt-4">
          {additionalWork.map((project) => (
            <Reveal key={project.slug}>
              <CompactCard
                project={project}
                stats={statsFor(repoMap, project.repo)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* more from github — live, curated in content/portfolio.config.ts */}
      <div className="mt-16">
        <Reveal>
          <SectionHeader index="04" title="More from GitHub" />
        </Reveal>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Live from{" "}
          <a
            href={`https://github.com/${portfolioConfig.github.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text underline underline-offset-4"
          >
            @{portfolioConfig.github.username}
          </a>{" "}
          — stars, languages and activity straight from the GitHub API.
        </p>
        <div className="mt-6">
          <Reveal>
            <GitHubRepoList />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
