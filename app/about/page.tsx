import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechChip } from "@/components/ui/TechIcon";
import { capabilities, techClusters } from "@/content/experience";
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
          An AI engineer who researches, builds, adapts, integrates — and
          makes sure it all actually works.
        </h1>
      </Reveal>

      <Reveal className="mt-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m {site.name}, a computer science graduate from Cairo
            University&apos;s AI department. I work across the whole span of
            applied AI: large language models, agentic and multi-agent
            systems, retrieval, model adaptation, and the infrastructure that
            keeps it all running in production.
          </p>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            What pulls me in is the distance between a demo and a system.
            Making that distance small is the job: multi-agent evaluation
            frameworks, causal debugging for agent runs, RAG platforms that
            cite their sources, and honest comparisons of fine-tuning methods
            instead of folklore.
          </p>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            When I&apos;m not building, I&apos;m usually writing — breaking
            down the systems I study into notes other engineers can use — or
            competing in hackathons with my classmates.
          </p>
        </div>
      </Reveal>

      {/* how I work */}
      <Reveal className="mt-20">
        <SectionHeader index="—" title="How I work" />
        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {[
            {
              title: "Research to production",
              body: "A technique only counts when it runs: reproducible pipelines, clean interfaces, real workloads.",
            },
            {
              title: "Systems that reason and act",
              body: "Agents, retrieval, and adaptation composed carefully — intelligence is an engineering problem too.",
            },
            {
              title: "Measure, don't assert",
              body: "Every claim about a system should survive an experiment — quality, cost, latency, all of it.",
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

      {/* capabilities */}
      <Reveal className="mt-20">
        <SectionHeader index="—" title="Capabilities" />
        <div className="mt-8">
          {capabilities.map((cap, i) => (
            <div
              key={cap.verb}
              className="group grid gap-3 border-t border-border py-6 last:border-b md:grid-cols-[64px_1fr_2fr] md:items-baseline md:gap-8"
            >
              <div>
                <span className="tnum font-mono text-xs text-muted/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-accent-text">
                  {cap.verb}
                </h3>
              </div>
              <div>
                <p className="font-display font-semibold tracking-tight">{cap.title}</p>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {cap.items.map((item) => (
                  <li key={item}>
                    <TechChip name={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      {/* toolbox — real tech identity, clustered */}
      <Reveal className="mt-20">
        <SectionHeader index="—" title="Toolbox" />
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {techClusters.map((cluster) => (
            <div key={cluster.title}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {cluster.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {cluster.items.map((item) => (
                  <li key={item}>
                    <TechChip name={item} />
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
