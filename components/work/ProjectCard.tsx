import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/*
  Project cards — hierarchy-aware.

  FlagshipCard: MASEF's stage — large, statement always visible,
  architecture graph as supporting visual.
  MajorCard:    full row — hover reveals the project's narrative frame.
  CompactCard:  additional work — one line, no ceremony.
*/

export function FlagshipCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block border border-border bg-surface transition-colors hover:border-accent-text/50"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-[2px] w-16 bg-accent transition-all duration-300 group-hover:w-24"
      />
      <div className="p-8 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-text">
            Flagship
          </span>
          <span className="text-muted/40">·</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {project.domain}
          </span>
          {project.publication && (
            <span className="rounded-sm border border-accent-text/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent-text">
              {project.publication}
            </span>
          )}
        </div>

        <h3 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {project.name}
        </h3>
        <p className="mt-3 text-lg text-muted">{project.tagline}</p>

        <p className="mt-6 max-w-2xl border-l-2 border-accent/60 pl-5 text-[15px] leading-relaxed text-muted sm:text-base">
          {project.frame.statement}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {project.stack.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-sm border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
            >
              {item}
            </span>
          ))}
        </div>

        <span className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-foreground">
          Read the case study
          <ArrowUpRight
            size={13}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block border-t border-border py-7 transition-colors last:border-b hover:bg-surface"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
      />

      <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-3 px-1 sm:gap-x-8 sm:px-4">
        <span className="tnum font-mono text-xs text-muted/60 transition-colors group-hover:text-accent-text">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.name}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {project.domain}
            </span>
            {project.status && (
              <span className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                {project.status}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-muted sm:text-[15px]">{project.tagline}</p>

          {/* narrative frame — always readable on touch, revealed on hover/focus from sm up */}
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-400 ease-out sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] sm:group-focus-visible:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-4 max-w-xl border-l-2 border-accent/60 pl-4 text-sm italic leading-relaxed text-muted">
                {project.frame.statement}
              </p>
            </div>
          </div>
        </div>

        <ArrowUpRight
          size={20}
          strokeWidth={1.5}
          className={cn(
            "self-center text-muted/50 transition-all duration-300",
            "group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-text",
          )}
        />
      </div>
    </Link>
  );
}

export function CompactCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex items-center justify-between gap-4 border-t border-border py-5 transition-colors last:border-b hover:bg-surface"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="font-display text-xl font-semibold tracking-tight">
          {project.name}
        </h3>
        <span className="text-sm text-muted">{project.tagline}</span>
      </div>
      <span className="flex shrink-0 items-center gap-3">
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:inline">
          {project.domain}
        </span>
        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          className="text-muted/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
        />
      </span>
    </Link>
  );
}
