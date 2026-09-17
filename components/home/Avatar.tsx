"use client";

import { motion, useReducedMotion } from "framer-motion";
import AvatarAsset from "./AvatarAsset";

/*
  Avatar — presentational wrapper for the hero character.
  Owns the frame, idle motion, and caption. Renders <AvatarAsset />,
  which is the single drop-in point for the final generated 3D
  character (see AvatarAsset.tsx header for the contract).
*/

export function Avatar() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={
          reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div className="relative border border-border bg-surface p-6">
          {/* corner marks */}
          <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-accent" />
          <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-accent" />
          <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-accent" />
          <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent" />

          <AvatarAsset />

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              fig. 01 — the engineer
            </span>
            <span className="tnum font-mono text-[10px] text-muted/60">CAIRO / EG</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
