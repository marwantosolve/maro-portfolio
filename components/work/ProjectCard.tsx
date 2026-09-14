import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
};

/*
  Project row with an intelligent hover state: hovering reveals the project's
  driving question and its stack — information, not effects.
*/
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block border-t border-border py-7 transition-colors last:border-b hover:bg-surface"
    >
      {/* accent spine grows on hover */}
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
            {project.publication && (
              <span className="rounded-sm border border-accent-text/50 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent-text">
                {project.publication}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-muted sm:text-[15px]">{project.tagline}</p>

          {/* the question — revealed on hover */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-400 ease-out group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-4 max-w-xl border-l-2 border-accent/60 pl-4 text-sm italic leading-relaxed text-muted">
                {project.question}
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
