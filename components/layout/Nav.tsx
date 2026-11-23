"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/work", label: "Work", index: "01" },
  { href: "/writing", label: "Writing", index: "02" },
  { href: "/experience", label: "Experience", index: "03" },
  { href: "/about", label: "About", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];

const WORDMARK = "marwantosolve";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // bump to replay the letter bounce (hover/tap); first mount plays it once
  const [bounceKey, setBounceKey] = useState(0);
  const reduce = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
          onMouseEnter={() => setBounceKey((k) => k + 1)}
          onTouchStart={() => setBounceKey((k) => k + 1)}
        >
          <span key={bounceKey} className="inline-flex">
            {WORDMARK.split("").map((ch, i) => (
              <motion.span
                key={i}
                className={i < 6 ? "text-accent-text" : undefined}
                animate={reduce ? undefined : { y: [0, -5, 0] }}
                transition={{ delay: i * 0.045, duration: 0.34, ease: "easeOut" }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                  active ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "mr-1.5 transition-colors",
                    active ? "text-accent-text" : "text-muted/50 group-hover:text-accent-text",
                  )}
                >
                  {link.index}
                </span>
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>

        {/* mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-baseline gap-3 border-b border-border/50 py-3.5 font-mono text-xs uppercase tracking-[0.14em] last:border-b-0",
                    active ? "text-foreground" : "text-muted",
                  )}
                >
                  <span className={active ? "text-accent-text" : "text-muted/50"}>
                    {link.index}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
