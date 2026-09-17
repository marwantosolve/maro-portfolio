import Link from "next/link";
import { PenLine } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";

const internal = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
            marwan<span className="text-accent-text">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            AI systems that reason, retrieve, adapt, and act.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {site.location}
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav className="flex flex-col gap-2.5">
            {internal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
            >
              Email
            </a>
            <a
              href={site.urls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
            >
              <GithubIcon size={12} /> GitHub
            </a>
            <a
              href={site.urls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
            >
              <LinkedinIcon size={12} /> LinkedIn
            </a>
            <a
              href={site.urls.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
            >
              <PenLine size={12} strokeWidth={1.75} /> Substack
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Designed & built with intent</span>
        </div>
      </div>
    </footer>
  );
}
