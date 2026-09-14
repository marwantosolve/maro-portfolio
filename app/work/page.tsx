import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { projects } from "@/content/projects";

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
        <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Five systems, each answering a question with data.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          Every project here is framed the way it was built — as a measurable
          question, an architecture, and an honest answer.
        </p>
      </Reveal>

      <div className="mt-14">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
