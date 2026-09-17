import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ArchitectureGraph } from "@/components/viz/ArchitectureGraph";
import { TechChip } from "@/components/ui/TechIcon";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { getProject, projects } from "@/content/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
      {/* header */}
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <Link href="/work" className="transition-colors hover:text-foreground">
            Work
          </Link>
          <span className="mx-2 text-muted/50">/</span>
          <span className="text-accent-text">{project.slug}</span>
        </p>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
            {project.name}
          </h1>
          {project.status && (
            <span className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {project.status}
            </span>
          )}
          {project.publication && (
            <span className="rounded-sm border border-accent-text/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text">
              {project.publication}
            </span>
          )}
        </div>
        <p className="mt-4 max-w-2xl text-lg text-muted">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-5">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent-text/60 hover:text-foreground"
            >
              <GithubIcon size={13} />
              View repository
            </a>
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {project.domain}
          </span>
        </div>
      </Reveal>

      {/* the project's narrative frame — problem / system / study / benchmark */}
      <Reveal className="mt-16">
        <blockquote className="border-l-2 border-accent pl-6 sm:pl-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {project.frame.label}
          </p>
          <p className="mt-4 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            {project.frame.statement}
          </p>
        </blockquote>
      </Reveal>

      {/* overview */}
      <Reveal className="mt-16">
        <h2 className="font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-muted">
          Overview
        </h2>
        <div className="mt-5 max-w-3xl space-y-5">
          {project.summary.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      {/* architecture */}
      <Reveal className="mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-muted">
            Architecture
          </h2>
          <span className="font-mono text-[10px] text-muted/60">fig. {project.slug}</span>
        </div>
        <div className="mt-5 border border-border bg-surface/50 p-6 sm:p-8">
          <ArchitectureGraph nodes={project.graph.nodes} edges={project.graph.edges} />
        </div>
      </Reveal>

      {/* highlights */}
      <Reveal className="mt-16">
        <h2 className="font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-muted">
          What it does
        </h2>
        <ul className="mt-6 max-w-3xl">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex gap-5 border-t border-border py-4 last:border-b">
              <span className="tnum font-mono text-xs text-accent-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base leading-relaxed sm:text-lg">{highlight}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* stack — real tech identity where icons exist */}
      <Reveal className="mt-16">
        <h2 className="font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-muted">
          Stack
        </h2>
        <ul className="mt-5 flex max-w-3xl flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item}>
              <TechChip name={item} />
            </li>
          ))}
        </ul>
      </Reveal>

      {/* pager */}
      <nav className="mt-24 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        <Link
          href={`/work/${prev.slug}`}
          className="group flex items-center gap-4 border border-border p-5 transition-colors hover:border-accent-text/60"
        >
          <ArrowLeft size={16} strokeWidth={1.5} className="text-muted transition-transform duration-200 group-hover:-translate-x-1" />
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Previous</p>
            <p className="mt-1 font-display font-semibold tracking-tight">{prev.name}</p>
          </div>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-end gap-4 border border-border p-5 text-right transition-colors hover:border-accent-text/60"
        >
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Next</p>
            <p className="mt-1 font-display font-semibold tracking-tight">{next.name}</p>
          </div>
          <ArrowRight size={16} strokeWidth={1.5} className="text-muted transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </nav>
    </article>
  );
}
