import { portfolioConfig } from "@/content/portfolio.config";
import PortraitCharacter from "@/components/home/PortraitCharacter";

/*
  Portrait — the hero's visual.

  Four modes, controlled from content/portfolio.config.ts:
    "character" — the interactive cartoon: follows the cursor,
                  blinks, breathes; still under reduced motion
    "avatar"    — the illustrated portrait at public/avatar.jpg
    "photo"     — Marwan's real photo at public/portrait.jpg
    "monogram"  — a clean typographic mark (no image)
*/

export function Portrait() {
  const { portrait } = portfolioConfig;

  if (portrait.mode === "character") {
    return (
      <div className="relative aspect-[360/400] w-full overflow-hidden bg-surface-2">
        <PortraitCharacter />
      </div>
    );
  }

  if (portrait.mode !== "monogram") {
    const src = portrait.mode === "avatar" ? portrait.avatarSrc : portrait.photoSrc;
    return (
      <div className="relative aspect-[360/400] w-full overflow-hidden bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={portrait.alt}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-[360/400] w-full flex-col items-center justify-center bg-surface-2"
      style={{
        backgroundImage:
          "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
      role="img"
      aria-label="Monogram of Marwan Osama"
    >
      <p className="font-display text-8xl font-bold leading-none tracking-tight sm:text-9xl">
        M<span className="text-accent-text">O</span>
      </p>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
        Marwan Osama Abdelazim
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted/60">
        AI / LLM Engineer
      </p>
    </div>
  );
}
