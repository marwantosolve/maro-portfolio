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
  Drawn from his portrait photo: dense dark curls hugging the skull
  with a ringlet fringe over the forehead, long oval face, silver-
  green eyes, thin round silver glasses, thick straight brows,
  light stubble, black polo. Soft gradient shading for a 3D feel.

  Behavior:
  - Head, pupils and torso follow the cursor (springs, bounded).
  - Blinks every few seconds; torso breathes slowly.
  - Touch: gaze follows the finger; after a few idle seconds it
    looks around gently on its own (mobile has no cursor).
  - prefers-reduced-motion: renders completely still, no listeners.
  ─────────────────────────────────────────────────────────────────
*/

const SKIN = "#e0aa7d";
const SKIN_SHADE = "#cb9066";
const SKIN_DEEP = "#b07a50";
const HAIR = "#221d18";
const HAIR_DARK = "#171310";
const CURL_HI = "#4d443b";
const INK = "#17181c";
const FRAME = "#c9ced6";
const POLO = "#12151b";
const POLO_HI = "#232936";

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

  // face silhouette (long oval, defined jaw) reused for shading + clipping
  const FACE =
    "M124 148 C124 108 148 92 180 92 C212 92 236 108 236 148 C236 184 230 216 212 242 C202 256 191 263 180 265 C169 263 158 256 148 242 C130 216 124 184 124 148 Z";

  return (
    <svg
      viewBox="0 0 360 400"
      className="h-auto w-full"
      role="img"
      aria-label="Animated cartoon portrait of Marwan Osama"
    >
      <defs>
        {/* 3D skin shading: lit center, shaded edges */}
        <radialGradient id="pc-skin" cx="0.5" cy="0.42" r="0.75">
          <stop offset="0%" stopColor="#eec194" />
          <stop offset="55%" stopColor={SKIN} />
          <stop offset="100%" stopColor="#cd9268" />
        </radialGradient>
        {/* hair volume: lighter crown, dark base */}
        <radialGradient id="pc-hair" cx="0.42" cy="0.28" r="0.9">
          <stop offset="0%" stopColor="#463d34" />
          <stop offset="45%" stopColor="#2c2620" />
          <stop offset="100%" stopColor={HAIR_DARK} />
        </radialGradient>
        {/* silver-green iris */}
        <radialGradient id="pc-iris" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#a8bfa8" />
          <stop offset="55%" stopColor="#7d9c83" />
          <stop offset="100%" stopColor="#52705c" />
        </radialGradient>
        <linearGradient id="pc-polo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={POLO_HI} />
          <stop offset="35%" stopColor={POLO} />
          <stop offset="100%" stopColor="#0b0e13" />
        </linearGradient>
        <radialGradient id="pc-cheek" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={SKIN_SHADE} stopOpacity="0.4" />
          <stop offset="100%" stopColor={SKIN_SHADE} stopOpacity="0" />
        </radialGradient>
        <filter id="pc-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="pc-softer" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <clipPath id="pc-face">
          <path d={FACE} />
        </clipPath>
      </defs>

      {/* torso: black polo — follows gently, breathes */}
      <motion.g {...torsoMotion}>
        <path d="M64 400 C64 326 110 294 180 294 C250 294 296 326 296 400 Z" fill="url(#pc-polo)" />
        {/* shoulder shading */}
        <path d="M64 400 C64 326 110 294 180 294 L180 400 Z" fill="#ffffff" opacity="0.03" />
        {/* polo collar */}
        <path d="M149 295 L180 317 L162 330 L144 302 Z" fill={POLO_HI} />
        <path d="M211 295 L180 317 L198 330 L216 302 Z" fill={POLO_HI} />
        <path d="M149 295 L180 317 L162 330" fill="none" stroke="#2e3542" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
        <path d="M211 295 L180 317 L198 330" fill="none" stroke="#2e3542" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
        <path d="M180 317 L180 352" stroke="#0b0e13" strokeWidth="4" strokeLinecap="round" />
        <circle cx="180" cy="334" r="2.4" fill="#2e3542" />
        <circle cx="180" cy="346" r="2.4" fill="#2e3542" />
      </motion.g>

      {/* neck + shadow cast by the chin */}
      <path d="M158 240 L158 292 C158 301 202 301 202 292 L202 240 Z" fill={SKIN_SHADE} />
      <ellipse cx="180" cy="252" rx="24" ry="9" fill={SKIN_DEEP} opacity="0.55" filter="url(#pc-soft)" />

      {/* head — tilts toward the cursor */}
      <motion.g {...headMotion}>
        {/* ears */}
        <ellipse cx="122" cy="180" rx="9" ry="14" fill="url(#pc-skin)" />
        <ellipse cx="238" cy="180" rx="9" ry="14" fill="url(#pc-skin)" />
        <ellipse cx="122" cy="180" rx="4" ry="7" fill={SKIN_SHADE} opacity="0.7" />
        <ellipse cx="238" cy="180" rx="4" ry="7" fill={SKIN_SHADE} opacity="0.7" />

        {/* face with 3D gradient */}
        <path d={FACE} fill="url(#pc-skin)" />
        {/* soft inner shadow around the jaw/edges */}
        <path d={FACE} fill="none" stroke={SKIN_DEEP} strokeWidth="9" opacity="0.28" filter="url(#pc-soft)" clipPath="url(#pc-face)" />
        {/* forehead + nose-bridge highlight */}
        <ellipse cx="180" cy="126" rx="34" ry="16" fill="#ffffff" opacity="0.14" filter="url(#pc-softer)" />
        {/* cheekbone shading */}
        <ellipse cx="140" cy="202" rx="15" ry="20" fill="url(#pc-cheek)" />
        <ellipse cx="220" cy="202" rx="15" ry="20" fill="url(#pc-cheek)" />

        {/* light stubble on jaw, chin and upper lip */}
        <g clipPath="url(#pc-face)">
          <path
            d="M128 198 C136 236 154 258 180 265 C206 258 224 236 232 198 L232 265 L128 265 Z"
            fill={SKIN_DEEP}
            opacity="0.2"
          />
          <g fill={SKIN_DEEP} opacity="0.3">
            <circle cx="150" cy="238" r="0.9" /><circle cx="158" cy="246" r="0.9" />
            <circle cx="166" cy="252" r="0.9" /><circle cx="176" cy="256" r="0.9" />
            <circle cx="186" cy="255" r="0.9" /><circle cx="196" cy="250" r="0.9" />
            <circle cx="204" cy="243" r="0.9" /><circle cx="211" cy="235" r="0.9" />
            <circle cx="143" cy="228" r="0.9" /><circle cx="217" cy="226" r="0.9" />
            <circle cx="154" cy="230" r="0.9" /><circle cx="206" cy="232" r="0.9" />
            <circle cx="170" cy="226" r="0.9" /><circle cx="190" cy="226" r="0.9" />
          </g>
          <ellipse cx="180" cy="221" rx="13" ry="3.4" fill={SKIN_DEEP} opacity="0.22" />
        </g>

        {/* nose: bridge highlight + shading */}
        <path d="M180 186 C177 197 175 205 180 211" fill="none" stroke={SKIN_DEEP} strokeWidth="3" strokeLinecap="round" />
        <path d="M182 188 C181 196 180 203 182 209" fill="none" stroke="#f4d3ae" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        <path d="M171 211 Q175 214 179 213" fill="none" stroke={SKIN_DEEP} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M189 211 Q185 214 181 213" fill="none" stroke={SKIN_DEEP} strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* mouth: closed, full lips, neutral */}
        <path d="M165 231 Q180 236 195 231" fill="none" stroke="#9c5f43" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M168 236 Q180 241 192 236 Q180 244 168 236 Z" fill="#b0705a" opacity="0.55" />

        {/* thick straight brows */}
        <path d="M133 158 C143 153 158 153 166 157" fill="none" stroke={HAIR_DARK} strokeWidth="5.4" strokeLinecap="round" />
        <path d="M194 157 C202 153 217 153 227 158" fill="none" stroke={HAIR_DARK} strokeWidth="5.4" strokeLinecap="round" />

        {/* almond eyes: whites, silver-green tracking irises, blinking lids */}
        <path d="M142 184 Q153 176 164 184 Q153 191 142 184 Z" fill="#f7f3ee" />
        <path d="M196 184 Q207 176 218 184 Q207 191 196 184 Z" fill="#f7f3ee" />
        <motion.g {...eyeMotion}>
          <circle cx="153" cy="184" r="5.2" fill="url(#pc-iris)" />
          <circle cx="207" cy="184" r="5.2" fill="url(#pc-iris)" />
          <circle cx="153" cy="184" r="2.3" fill={INK} />
          <circle cx="207" cy="184" r="2.3" fill={INK} />
          <circle cx="154.6" cy="182.4" r="1.2" fill="#ffffff" opacity="0.9" />
          <circle cx="208.6" cy="182.4" r="1.2" fill="#ffffff" opacity="0.9" />
        </motion.g>
        {/* upper lash lines */}
        <path d="M142 184 Q153 175.4 164 184" fill="none" stroke="#241c14" strokeWidth="2" strokeLinecap="round" />
        <path d="M196 184 Q207 175.4 218 184" fill="none" stroke="#241c14" strokeWidth="2" strokeLinecap="round" />
        {/* blink lids */}
        <motion.ellipse
          cx="153"
          cy="184"
          rx="13"
          ry="9"
          fill={SKIN}
          style={{ scaleY: 0, originX: "153px", originY: "184px" }}
          {...lidMotion}
        />
        <motion.ellipse
          cx="207"
          cy="184"
          rx="13"
          ry="9"
          fill={SKIN}
          style={{ scaleY: 0, originX: "207px", originY: "184px" }}
          {...lidMotion}
        />

        {/* thin round silver glasses + lens sheen */}
        <g stroke={FRAME} strokeWidth="2.3" fill="#ffffff" fillOpacity="0.05">
          <circle cx="153" cy="184" r="17.5" />
          <circle cx="207" cy="184" r="17.5" />
        </g>
        <path d="M170.5 181 Q180 175 189.5 181" fill="none" stroke={FRAME} strokeWidth="2.3" strokeLinecap="round" />
        <path d="M135.8 182 L121 178" fill="none" stroke={FRAME} strokeWidth="2.3" strokeLinecap="round" />
        <path d="M224.2 182 L239 178" fill="none" stroke={FRAME} strokeWidth="2.3" strokeLinecap="round" />
        <path d="M145 175 A17.5 17.5 0 0 1 159 169" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
        <path d="M199 175 A17.5 17.5 0 0 1 213 169" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />

        {/* hair: one solid mass hugging the skull, ringlet fringe on the forehead */}
        <path
          d="M118 158
             C108 148 104 128 110 106
             C116 70 146 50 180 50
             C214 50 244 70 250 106
             C256 128 252 148 242 158
             C240 142 238 130 232 120
             C234 108 230 100 222 98
             C224 108 218 114 210 112
             C212 102 206 96 197 97
             C199 107 193 113 185 111
             C186 101 180 96 172 98
             C172 108 166 113 158 111
             C159 102 153 97 145 99
             C147 109 141 115 133 112
             C132 122 126 130 122 134
             C120 142 119 150 118 158 Z"
          fill="url(#pc-hair)"
        />
        {/* loose ringlets hanging from the fringe */}
        <g fill="url(#pc-hair)">
          <circle cx="134" cy="116" r="8" />
          <circle cx="148" cy="112" r="7" />
          <circle cx="162" cy="114" r="8" />
          <circle cx="176" cy="110" r="7" />
          <circle cx="190" cy="113" r="8" />
          <circle cx="204" cy="110" r="7" />
          <circle cx="218" cy="114" r="8" />
          <circle cx="126" cy="128" r="7" />
          <circle cx="232" cy="126" r="7" />
        </g>
        {/* curl texture */}
        <g fill="none" stroke={CURL_HI} strokeWidth="2" strokeLinecap="round" opacity="0.75">
          <path d="M130 100 Q136 94 143 99" />
          <path d="M148 84 Q155 78 162 84" />
          <path d="M170 72 Q177 66 184 72" />
          <path d="M194 74 Q201 68 208 75" />
          <path d="M216 88 Q222 82 228 89" />
          <path d="M120 118 Q126 112 132 117" />
          <path d="M228 116 Q234 110 240 116" />
          <path d="M140 116 Q146 111 152 116" />
          <path d="M160 106 Q166 101 172 106" />
          <path d="M182 104 Q188 99 194 105" />
          <path d="M204 108 Q210 103 216 109" />
          <path d="M156 94 Q162 89 168 94" />
          <path d="M186 90 Q192 85 198 91" />
        </g>
        {/* crown highlight */}
        <path d="M140 66 Q180 48 220 66" fill="none" stroke="#5a5045" strokeWidth="4" strokeLinecap="round" opacity="0.55" filter="url(#pc-soft)" />
        {/* soft shadow the fringe casts on the forehead */}
        <path
          d="M128 118 C144 108 162 112 180 110 C198 112 216 108 232 118 L232 128 C216 118 198 122 180 120 C162 122 144 118 128 128 Z"
          fill="#000000"
          opacity="0.14"
          filter="url(#pc-soft)"
          clipPath="url(#pc-face)"
        />
      </motion.g>
    </svg>
  );
}
