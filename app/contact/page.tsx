import type { Metadata } from "next";
import { Mail, MapPin, PenLine } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — ${site.role}, ${site.location}.`,
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/marwantosolve",
    href: site.urls.github,
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "in/marwantosolvein",
    href: site.urls.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "Writing",
    value: "marwantosolve.substack.com",
    href: site.urls.substack,
    icon: PenLine,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
      <Reveal>
        <SectionHeader index="05" title="Contact" />
        <h1 className="mt-8 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Got an interesting problem? Let&apos;s talk.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
          AI engineering, LLM systems, research, agentic systems — if it&apos;s
          a technical problem worth solving, I&apos;m interested. The fastest
          way to reach me is email.
        </p>
        <p className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <MapPin size={13} strokeWidth={1.75} />
          {site.location}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {channels.map((channel, i) => (
          <Reveal key={channel.label} delay={i * 0.06}>
            <a
              href={channel.href}
              target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center justify-between border border-border p-6 transition-colors hover:border-accent-text/60"
            >
              <div className="flex items-center gap-4">
                <channel.icon size={18} className="text-muted" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {channel.label}
                  </p>
                  <p className="mt-1 font-medium">{channel.value}</p>
                </div>
              </div>
              <span
                aria-hidden
                className="h-1.5 w-1.5 bg-muted/40 transition-colors group-hover:bg-accent"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
