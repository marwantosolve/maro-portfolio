import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WritingCard } from "@/components/writing/WritingCard";
import { getSubstackPosts } from "@/lib/substack";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical notes, experiments, and ideas from building AI systems — published on Substack.",
};

export default async function WritingPage() {
  const posts = await getSubstackPosts(10);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
      <Reveal>
        <SectionHeader index="02" title="Writing" />
        <h1 className="mt-8 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Technical notes, experiments, and ideas from building AI systems.
        </h1>
      </Reveal>

      {posts ? (
        <div className="mt-14">
          <Reveal>
            <WritingCard post={posts[0]} featured />
          </Reveal>
          {posts.length > 1 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(1).map((post, i) => (
                <Reveal key={post.url} delay={i * 0.06}>
                  <WritingCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Reveal>
          <div className="mt-14 border border-dashed border-border p-12 text-center">
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
          className="group mt-12 inline-flex items-center gap-2 border border-border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-accent-text/60 hover:text-foreground"
        >
          Read more on Substack
          <ArrowRight
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </Reveal>
    </div>
  );
}
