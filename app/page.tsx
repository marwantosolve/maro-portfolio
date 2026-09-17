import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechChip } from "@/components/ui/TechIcon";
import { FlagshipCard, ProjectCard, CompactCard } from "@/components/work/ProjectCard";
import { WritingCard } from "@/components/writing/WritingCard";
import { flagship, majorWork, additionalWork } from "@/content/projects";
import { capabilities } from "@/content/experience";
import { getSubstackPosts } from "@/lib/substack";
import { site } from "@/lib/site";

export default async function HomePage() {
  const posts = await getSubstackPosts(4);

  return (
    <>
      <Hero />

      {/* selected work — flagship first, then major, then additional */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SectionHeader index="01" title="Selected Work" />
        </Reveal>

        <div className="mt-10">
          <Reveal>
            {flagship.map((project) => (
              <FlagshipCard key={project.slug} project={project} />
            ))}
          </Reveal>
          <div className="mt-12">
            {majorWork.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.06}>
                <ProjectCard project={project} index={i + 1} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            {additionalWork.map((project) => (
              <Reveal key={project.slug}>
                <CompactCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <Link
            href="/work"
            className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
          >
            All projects
            <ArrowRight
              size={13}
              strokeWidth={1.75}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </section>

      {/* capabilities — what I can do, not a tool catalog */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <SectionHeader index="02" title="Capabilities" />
          </Reveal>

          <div className="mt-12">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.verb} delay={i * 0.05}>
                <div className="group grid gap-4 border-t border-border py-8 last:border-b md:grid-cols-[64px_1fr_2fr] md:items-baseline md:gap-8">
                  <div>
                    <span className="tnum font-mono text-xs text-muted/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-accent-text">
                      {cap.verb}
                    </h3>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight">
                      {cap.title}
                    </p>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                      {cap.blurb}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {cap.items.map((item) => (
                      <li key={item}>
                        <TechChip name={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* writing */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SectionHeader index="03" title="Writing" />
          <p className="mt-6 max-w-xl text-base text-muted">
            Technical notes on building AI systems — from attention kernels to
            agentic pipelines.
          </p>
        </Reveal>

        {posts ? (
          <div className="mt-10">
            <Reveal>
              <WritingCard post={posts[0]} featured />
            </Reveal>
            {posts.length > 1 && (
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {posts.slice(1, 4).map((post, i) => (
                  <Reveal key={post.url} delay={i * 0.07}>
                    <WritingCard post={post} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Reveal>
            <div className="mt-10 border border-dashed border-border p-10 text-center">
              <p className="text-sm text-muted">
                Posts are served live from Substack — they&apos;ll appear here shortly.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <a
            href={site.urls.substack}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
          >
            Read more on Substack
            <ArrowRight
              size={13}
              strokeWidth={1.75}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </section>

      {/* contact cta */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 lg:py-32">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              04 — Contact
            </p>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Got an interesting problem? <span className="text-accent-text">Let&apos;s talk</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base text-muted">
              AI engineering, LLM systems, research, agentic systems —
              if it&apos;s technically interesting, I want to hear about it.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-10 inline-block bg-accent px-8 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              {site.email}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
