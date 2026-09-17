"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PenLine } from "lucide-react";
import { Avatar } from "./Avatar";
import { PipelineFlow, TopologyBackground } from "@/components/viz/TopologyBackground";
import { site } from "@/lib/site";

const focusAreas = [
  "LLMs",
  "Agentic AI",
  "Multi-Agent Systems",
  "RAG",
  "Model Adaptation",
  "AI Evaluation",
  "AI Infrastructure",
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
      {/* ambient topology — the site's visual system */}
      <TopologyBackground seed={11} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-36 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-24 lg:pt-44">
        {/* copy */}
        <div>
          <motion.p
            {...fadeUp(0)}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span className="inline-block h-1.5 w-1.5 bg-accent" aria-hidden />
            {site.name} — {site.role}
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            AI systems that
            <br />
            reason, retrieve,
            <br />
            adapt, <span className="text-accent-text">and act</span>.
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            I&apos;m an AI engineer and researcher working across large
            language models, agentic and multi-agent systems, retrieval, and
            model adaptation — from research concepts to production.
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
        <motion.div {...fadeUp(0.25)}>
          <Avatar />
        </motion.div>
      </div>

      {/* the engineering chain — hero signature motif */}
      <motion.div
        {...fadeUp(0.55)}
        className="relative mx-auto max-w-3xl px-5 pb-14 sm:px-8"
      >
        <PipelineFlow className="opacity-70" />
      </motion.div>
    </section>
  );
}
