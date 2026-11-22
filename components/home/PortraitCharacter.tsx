"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/*
  ─────────────────────────────────────────────────────────────────
  PORTRAIT CHARACTER — interactive cartoon Marwan
  ─────────────────────────────────────────────────────────────────
  Drawn from his portrait photo: dense dark curls all around, thin
  round silver glasses, thick straight brows, light stubble, black
  polo with collar.

  Behavior:
  - Head, pupils and torso follow the cursor (springs, bounded).
  - Blinks every few seconds; torso breathes slowly.
  - Touch: gaze follows the finger; after a few idle seconds it
    looks around gently on its own (mobile has no cursor).
  - prefers-reduced-motion: renders completely still, no listeners.
  ─────────────────────────────────────────────────────────────────
*/

const SKIN = "#dfa87e";
const SKIN_SHADE = "#cb9066";
const SKIN_DEEP = "#b87c54";
const HAIR = "#1e1a17";
const HAIR_HI = "#332d28";
const CURL_HI = "#4a423b";
const INK = "#15161a";
const FRAME = "#c3c8d0";
const POLO = "#11141a";
const POLO_HI = "#1e232d";

export default function PortraitCharacter() {
  const reduce = useReducedMotion();

  const mx = useMotionValue(0); // -1 .. 1
  const my = useMotionValue(0);
  const lastPointer = useRef(0);

  useEffect(() => {
    if (reduce) return;
    function point(x: number, y: number) {
      mx.set((x / window.innerWidth) * 2 - 1);
      my.set((y / window.innerHeight) * 2 - 1);
      lastPointer.current = performance.now();
    }
    function onMove(e: MouseEvent) {
      point(e.clientX, e.clientY);
    }
    function onTouch(e: TouchEvent) {
      const t = e.touches[0];
      if (t) point(t.clientX, t.clientY);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [mx, my, reduce]);

  // idle: look around gently on its own (mobile / hands-off)
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const tick = (t: number) => {
      if (t - lastPointer.current > 3500) {
        mx.set(Math.sin(t / 2400) * 0.5);
        my.set(Math.sin(t / 3100) * 0.28);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mx, my, reduce]);

  const headX = useSpring(useTransform(mx, [-1, 1], [-7, 7]), { stiffness: 55, damping: 14 });
  const headY = useSpring(useTransform(my, [-1, 1], [-4, 5]), { stiffness: 55, damping: 14 });
  const headR = useSpring(useTransform(mx, [-1, 1], [-2.6, 2.6]), { stiffness: 45, damping: 12 });
  const eyeX = useSpring(useTransform(mx, [-1, 1], [-3.4, 3.4]), { stiffness: 130, damping: 16 });
  const eyeY = useSpring(useTransform(my, [-1, 1], [-2.2, 2.4]), { stiffness: 130, damping: 16 });
  const bodyX = useSpring(useTransform(mx, [-1, 1], [-2.2, 2.2]), { stiffness: 38, damping: 15 });

  const torsoMotion = reduce
    ? {}
    : {
        style: { x: bodyX },
        animate: { y: [0, 1.6, 0] },
        transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const },
      };
  const headMotion = reduce
    ? {}
    : { style: { x: headX, y: headY, rotate: headR, originX: 0.5, originY: 0.62 } };
  const eyeMotion = reduce ? {} : { style: { x: eyeX, y: eyeY } };
  const lidMotion = reduce
    ? {}
    : {
        animate: { scaleY: [0, 0, 1, 1, 0, 0] },
        transition: {
          duration: 4.8,
          times: [0, 0.93, 0.955, 0.965, 0.99, 1],
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <svg
      viewBox="0 0 360 400"
      className="h-auto w-full"
      role="img"
      aria-label="Animated cartoon portrait of Marwan Osama"
    >
      <defs>
        <radialGradient id="pc-cheekL" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={SKIN_SHADE} stopOpacity="0.35" />
          <stop offset="100%" stopColor={SKIN_SHADE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pc-cheekR" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={SKIN_SHADE} stopOpacity="0.35" />
          <stop offset="100%" stopColor={SKIN_SHADE} stopOpacity="0" />
        </radialGradient>
        <clipPath id="pc-face">
          <path d="M118 155 C118 112 146 92 180 92 C214 92 242 112 242 155 C242 205 226 248 180 266 C134 248 118 205 118 155 Z" />
        </clipPath>
      </defs>

      {/* torso: black polo — follows gently, breathes */}
      <motion.g {...torsoMotion}>
        <path d="M70 400 C70 328 112 296 180 296 C248 296 290 328 290 400 Z" fill={POLO} />
        {/* polo collar */}
        <path d="M150 297 L180 318 L163 330 L146 304 Z" fill={POLO_HI} />
        <path d="M210 297 L180 318 L197 330 L214 304 Z" fill={POLO_HI} />
        <path d="M180 318 L180 348" stroke={POLO_HI} strokeWidth="3" strokeLinecap="round" />
        <circle cx="180" cy="338" r="2.2" fill={POLO_HI} />
        <path d="M96 324 C104 315 114 309 126 305" fill="none" stroke={POLO_HI} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M264 324 C256 315 246 309 234 305" fill="none" stroke={POLO_HI} strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {/* neck */}
      <path d="M158 244 L158 292 C158 300 202 300 202 292 L202 244 Z" fill={SKIN_SHADE} />
      <path d="M158 244 C166 260 194 260 202 244 L202 256 C194 268 166 268 158 256 Z" fill={SKIN_DEEP} opacity="0.45" />

      {/* head — tilts toward the cursor */}
      <motion.g {...headMotion}>
        {/* ears */}
        <ellipse cx="116" cy="176" rx="9" ry="14" fill={SKIN} />
        <ellipse cx="244" cy="176" rx="9" ry="14" fill={SKIN} />
        <ellipse cx="116" cy="176" rx="4" ry="7" fill={SKIN_SHADE} opacity="0.7" />
        <ellipse cx="244" cy="176" rx="4" ry="7" fill={SKIN_SHADE} opacity="0.7" />

        {/* face */}
        <path
          d="M118 155 C118 112 146 92 180 92 C214 92 242 112 242 155 C242 205 226 248 180 266 C134 248 118 205 118 155 Z"
          fill={SKIN}
        />
        <ellipse cx="136" cy="198" rx="16" ry="22" fill="url(#pc-cheekL)" />
        <ellipse cx="224" cy="198" rx="16" ry="22" fill="url(#pc-cheekR)" />

        {/* light stubble on the jaw and upper lip */}
        <g clipPath="url(#pc-face)">
          <path
            d="M124 196 C132 236 152 258 180 266 C208 258 228 236 236 196 L236 266 L124 266 Z"
            fill={SKIN_DEEP}
            opacity="0.22"
          />
          <ellipse cx="180" cy="222" rx="15" ry="4" fill={SKIN_DEEP} opacity="0.16" />
        </g>

        {/* hair: dense curls all around */}
        <g fill={HAIR}>
          <circle cx="108" cy="122" r="17" />
          <circle cx="108" cy="142" r="13" />
          <circle cx="252" cy="122" r="17" />
          <circle cx="252" cy="142" r="13" />
          <circle cx="122" cy="96" r="19" />
          <circle cx="146" cy="78" r="20" />
          <circle cx="172" cy="68" r="21" />
          <circle cx="198" cy="68" r="21" />
          <circle cx="224" cy="78" r="20" />
          <circle cx="242" cy="98" r="18" />
          <circle cx="134" cy="86" r="14" />
          <circle cx="160" cy="70" r="15" />
          <circle cx="186" cy="66" r="15" />
          <circle cx="212" cy="72" r="14" />
          <circle cx="234" cy="88" r="14" />
          <circle cx="114" cy="108" r="13" />
          <circle cx="246" cy="110" r="13" />
        </g>
        {/* curl texture */}
        <g fill="none" stroke={CURL_HI} strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <path d="M126 90 Q132 84 139 89" />
          <path d="M150 74 Q157 68 164 74" />
          <path d="M176 64 Q183 58 190 64" />
          <path d="M202 66 Q209 60 216 67" />
          <path d="M226 80 Q232 74 238 81" />
          <path d="M114 112 Q120 106 126 111" />
          <path d="M240 114 Q246 108 251 114" />
          <path d="M140 82 Q146 77 152 82" />
          <path d="M164 70 Q170 65 176 70" />
          <path d="M190 62 Q196 57 202 63" />
          <path d="M214 74 Q220 69 226 75" />
          <path d="M108 140 Q113 135 118 140" />
          <path d="M244 142 Q249 137 254 142" />
        </g>
        <path
          d="M142 70 Q180 52 218 70"
          fill="none"
          stroke={HAIR_HI}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* thick straight brows */}
        <path d="M132 158 C142 152 158 152 166 157" fill="none" stroke={HAIR} strokeWidth="5" strokeLinecap="round" />
        <path d="M194 157 C202 152 218 152 228 158" fill="none" stroke={HAIR} strokeWidth="5" strokeLinecap="round" />

        {/* eyes: whites, tracking pupils, blinking lids */}
        <ellipse cx="153" cy="183" rx="10" ry="5.6" fill="#f5f1ec" opacity="0.9" />
        <ellipse cx="207" cy="183" rx="10" ry="5.6" fill="#f5f1ec" opacity="0.9" />
        <motion.g {...eyeMotion}>
          <circle cx="153" cy="184" r="4.2" fill={INK} />
          <circle cx="207" cy="184" r="4.2" fill={INK} />
          <circle cx="154.4" cy="182.6" r="1.1" fill="#ffffff" opacity="0.85" />
          <circle cx="208.4" cy="182.6" r="1.1" fill="#ffffff" opacity="0.85" />
        </motion.g>
        {/* blink lids */}
        <motion.ellipse
          cx="153"
          cy="183"
          rx="12"
          ry="8"
          fill={SKIN}
          style={{ scaleY: 0, originX: "153px", originY: "183px" }}
          {...lidMotion}
        />
        <motion.ellipse
          cx="207"
          cy="183"
          rx="12"
          ry="8"
          fill={SKIN}
          style={{ scaleY: 0, originX: "207px", originY: "183px" }}
          {...lidMotion}
        />
        <path d="M143 180 Q153 175 163 180" fill="none" stroke={SKIN_DEEP} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        <path d="M197 180 Q207 175 217 180" fill="none" stroke={SKIN_DEEP} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />

        {/* thin round silver glasses */}
        <g stroke={FRAME} strokeWidth="2.4" fill="#ffffff" fillOpacity="0.04">
          <circle cx="153" cy="183" r="17" />
          <circle cx="207" cy="183" r="17" />
        </g>
        <path d="M170 180 Q180 174 190 180" fill="none" stroke={FRAME} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M136 181 L117 177" fill="none" stroke={FRAME} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M224 181 L243 177" fill="none" stroke={FRAME} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M144 174 A17 17 0 0 1 158 168" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />

        {/* nose */}
        <path d="M180 190 C177 199 175 205 180 210" fill="none" stroke={SKIN_DEEP} strokeWidth="3" strokeLinecap="round" />
        <path d="M172 210 Q175 213 179 212" fill="none" stroke={SKIN_DEEP} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M188 210 Q185 213 181 212" fill="none" stroke={SKIN_DEEP} strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* mouth — slight confident smile */}
        <path d="M164 232 Q180 238 196 232" fill="none" stroke="#96593d" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M169 236 Q180 240 191 236" fill="none" stroke={SKIN_DEEP} strokeWidth="1.6" strokeLinecap="round" opacity="0.35" />
      </motion.g>
    </svg>
  );
}
