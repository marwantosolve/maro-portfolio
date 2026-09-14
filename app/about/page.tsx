import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { capabilities } from "@/content/experience";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
      <Reveal>
        <SectionHeader index="04" title="About" />
        <h1 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          An engineer who treats AI as a systems discipline — measurable,
          reproducible, production-ready.
        </h1>
      </Reveal>

      <Reveal className="mt-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m {site.name}, a computer science graduate specializing in
            Large Language Models, Agentic AI, and Generative AI applications.
            My work sits where research meets production: multi-agent systems,
            Retrieval-Augmented Generation pipelines, AI evaluation frameworks,
            and intelligent automation tools.
          </p>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            I care about the part of AI engineering that most demos skip —
            knowing whether a system actually works. That shows up across my
            projects: benchmarking multi-agent systems, tracing failures in
            agent runs to their root causes, measuring fine-tuning methods
            against each other, and grounding every answer in retrievable
            documents.
          </p>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            Beyond the work itself: strong foundations in machine learning,
            deep learning, NLP, and software engineering — and a habit of
            writing about what I learn along the way.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <SectionHeader index="—" title="How I work" />
        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {[
            {
              title: "Measure, don't assert",
              body: "Every claim about a system should survive an experiment — quality, cost, latency, all of it.",
            },
            {
              title: "Research to production",
              body: "A technique only counts when it runs: reproducible pipelines, clean interfaces, real workloads.",
            },
            {
              title: "Debuggable by design",
              body: "Traces, artifacts, and evaluation layers built in from the start — not bolted on after the failure.",
            },
          ].map((item, i) => (
            <div key={item.title} className="bg-background p-7">
              <span className="tnum font-mono text-[10px] text-muted/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <SectionHeader index="—" title="Toolbox" />
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {capabilities.map((cap) => (
            <div key={cap.title}>
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {cap.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {cap.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
