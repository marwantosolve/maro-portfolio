import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/work/ProjectCard";
import { WritingCard } from "@/components/writing/WritingCard";
import { projects } from "@/content/projects";
import { capabilities } from "@/content/experience";
import { getSubstackPosts } from "@/lib/substack";
import { site } from "@/lib/site";

export default async function HomePage() {
  const posts = await getSubstackPosts(4);

  return (
    <>
      <Hero />

      {/* selected work */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SectionHeader index="01" title="Selected Work" />
          <div className="mt-10">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.06}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
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
        </Reveal>
      </section>

      {/* capabilities */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <SectionHeader index="02" title="Capabilities" />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 0.07} className="h-full">
                <div className="flex h-full flex-col bg-background p-7">
                  <span className="tnum font-mono text-[10px] text-muted/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{cap.blurb}</p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
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
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 lg:py-32">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              04 — Contact
            </p>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s build something <span className="text-accent-text">measurable</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base text-muted">
              Working on LLM systems, agents, or evaluation? I&apos;d love to hear
              about it.
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
