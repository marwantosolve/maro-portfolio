import { ArrowUpRight, Clock } from "lucide-react";
import type { SubstackPost } from "@/lib/substack";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function WritingCard({ post, featured = false }: { post: SubstackPost; featured?: boolean }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col border border-border bg-surface transition-colors hover:border-accent-text/60",
        featured && "md:flex-row",
      )}
    >
      {post.image && (
        <div className={cn("overflow-hidden", featured ? "md:w-2/5" : "")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className={cn(
              "aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out",
              featured ? "h-full" : "",
              "group-hover:scale-[1.03]",
            )}
          />
        </div>
      )}

      <div className={cn("flex flex-1 flex-col p-6", featured && "justify-center p-8")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <p className="tnum font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {formatDate(post.publishedAt)}
          </p>
          {post.categories.slice(0, 2).map((category) => (
            <span
              key={category}
              className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
            >
              {category}
            </span>
          ))}
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted/70">
            <Clock size={10} />
            <span className="tnum">{post.readingTime} min</span>
          </span>
        </div>

        <h3
          className={cn(
            "mt-3 font-display font-semibold leading-snug tracking-tight",
            featured ? "text-2xl sm:text-3xl" : "text-lg",
          )}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">
          Read on Substack
          <ArrowUpRight
            size={13}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </a>
  );
}
