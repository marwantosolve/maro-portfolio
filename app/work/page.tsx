import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FlagshipCard, ProjectCard, CompactCard } from "@/components/work/ProjectCard";
import { flagship, majorWork, additionalWork } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects — multi-agent evaluation, agent observability, RAG platforms, LLM adaptation, and computer vision.",
};

export default function WorkPage() {
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
          A flagship research effort, three production-grade systems, and a
          benchmarking study. Different shapes of engineering, same standard.
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
              <ProjectCard project={project} index={i} />
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
              <CompactCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
