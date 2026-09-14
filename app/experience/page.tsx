import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  certifications,
  education,
  experience,
  hackathons,
  languages,
  publication,
} from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "AI research engineering at Ericsson, machine learning at Codveda, and computer science at Cairo University.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
      <Reveal>
        <SectionHeader index="03" title="Experience" />
        <h1 className="mt-8 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Where the work happened.
        </h1>
      </Reveal>

      {/* roles */}
      <div className="mt-16 space-y-12">
        {experience.map((job, i) => (
          <Reveal key={job.org} delay={i * 0.06}>
            <div className="grid gap-4 border-t border-border pt-8 md:grid-cols-[200px_1fr]">
              <div>
                <p className="tnum font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
                  {job.period}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {job.location}
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {job.org}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {job.role}
                  {job.note && <span className="text-muted/70"> — {job.note}</span>}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {job.points.map((point, j) => (
                    <li key={j} className="flex gap-4 text-[15px] leading-relaxed text-muted">
                      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 bg-accent-text" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* publication */}
      <Reveal className="mt-20">
        <div className="border border-border bg-surface/50 p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Publication
          </p>
          <p className="mt-4 font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {publication.title}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-text">
            {publication.status}
          </p>
        </div>
      </Reveal>

      {/* education */}
      <Reveal className="mt-20">
        <SectionHeader index="—" title="Education" />
        <div className="mt-8 grid gap-4 border-t border-border pt-8 md:grid-cols-[200px_1fr]">
          <div>
            <p className="tnum font-mono text-xs uppercase tracking-[0.14em] text-accent-text">
              {education.period}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {education.location}
            </p>
          </div>
          <div>
            <div className="flex items-start gap-3">
              <GraduationCap size={20} strokeWidth={1.5} className="mt-1 text-muted" />
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {education.school}
                </h2>
                <p className="mt-1 text-sm text-muted">{education.degree}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  GPA <span className="tnum text-foreground">{education.gpa}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* hackathons */}
      <Reveal className="mt-20">
        <SectionHeader index="—" title="Hackathons" />
        <div className="mt-8">
          {hackathons.map((hack, i) => (
            <div key={hack.name} className="border-t border-border py-6 last:border-b">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {hack.name}
              </h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
                {hack.detail}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* certifications + languages */}
      <div className="mt-20 grid gap-16 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <SectionHeader index="—" title="Certifications" />
          <ul className="mt-8">
            {certifications.map((cert, i) => (
              <li
                key={cert}
                className="flex gap-4 border-t border-border py-3.5 text-[15px] last:border-b"
              >
                <span className="tnum font-mono text-xs text-muted/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {cert}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeader index="—" title="Languages" />
          <ul className="mt-8">
            {languages.map((lang) => (
              <li
                key={lang.language}
                className="flex items-baseline justify-between border-t border-border py-3.5 last:border-b"
              >
                <span className="font-display text-lg font-semibold tracking-tight">
                  {lang.language}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {lang.level}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
