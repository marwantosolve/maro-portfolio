"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PenLine } from "lucide-react";
import { AvatarMark } from "./AvatarMark";
import { site } from "@/lib/site";

const focusAreas = [
  "LLMs",
  "Agentic AI",
  "Multi-Agent Systems",
  "RAG",
  "AI Evaluation",
  "Model Adaptation",
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-28 lg:pt-44">
        {/* copy */}
        <div>
          <motion.p
            {...fadeUp(0)}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span className="inline-block h-1.5 w-1.5 bg-accent" aria-hidden />
            {site.role} — {site.location}
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Agentic AI,
            <br />
            built to be <span className="text-accent-text">measured</span>.
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            I&apos;m {site.name} — an AI engineer working across large language
            models, multi-agent systems, RAG, and model adaptation, taking AI
            systems from research concepts to production.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              View work
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 border border-border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-accent-text/60 hover:text-foreground"
            >
              <PenLine size={14} strokeWidth={1.75} />
              Read the writing
            </Link>
          </motion.div>

          <motion.ul
            {...fadeUp(0.4)}
            className="mt-12 flex flex-wrap gap-x-2 gap-y-2"
            aria-label="Focus areas"
          >
            {focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-sm border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
              >
                {area}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* avatar */}
        <motion.div
          {...fadeUp(0.25)}
          className="relative mx-auto w-full max-w-[360px]"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* technical frame */}
            <div className="relative border border-border bg-surface p-6">
              <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-accent" />
              <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-accent" />
              <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-accent" />
              <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent" />

              <div className="bg-grid" aria-hidden>
                <AvatarMark />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  fig. 01 — the engineer
                </span>
                <span className="tnum font-mono text-[10px] text-muted/60">
                  {site.location.split(",")[0].toUpperCase()} / EG
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
