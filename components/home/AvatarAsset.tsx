"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/*
  ─────────────────────────────────────────────────────────────────
  AVATAR ASSET — v2 stylized vector character
  ─────────────────────────────────────────────────────────────────
  Based on the reference photos (primary: Ericsson photo): curly
  textured hair on top with faded/tapered sides, thin dark-framed
  rectangular glasses, natural skin tone with structured shading,
  dark outfit, subtle confident expression.

  ▸ DROP-IN REPLACEMENT POINT ◂
  The hero's <Avatar /> wrapper renders only this default export.
  When the final custom 3D character is produced (rendered frames,
  a rigged Lottie/SVG, or a react-three-fiber model), replace this
  component with one mounting that asset — keep the default export
  signature and rough aspect (360×400). No hero redesign needed.

  Interaction contract: subtle cursor awareness (head tilt, pupil
  tracking) + stillness otherwise. All motion respects
  prefers-reduced-motion.
  ─────────────────────────────────────────────────────────────────
*/

const SKIN = "#e2ae83";
const SKIN_SHADE = "#cf9569";
const SKIN_DEEP = "#bd7f56";
const HAIR = "#242120";
const HAIR_HI = "#3a3633";
const CURL_HI = "#4a4440";
const INK = "#15161a";
const OUTFIT = "#161a22";
const OUTFIT_HI = "#1f2531";

export default function AvatarAsset() {
  const reduce = useReducedMotion();

  const mx = useMotionValue(0); // -1 .. 1
  const my = useMotionValue(0);

  useEffect(() => {
    if (reduce) return;
    function onMove(e: MouseEvent) {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  const headX = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 50, damping: 14 });
  const headY = useSpring(useTransform(my, [-1, 1], [-3, 4]), { stiffness: 50, damping: 14 });
  const headR = useSpring(useTransform(mx, [-1, 1], [-2.2, 2.2]), { stiffness: 42, damping: 12 });
  const eyeX = useSpring(useTransform(mx, [-1, 1], [-3, 3]), { stiffness: 120, damping: 16 });
  const eyeY = useSpring(useTransform(my, [-1, 1], [-2, 2.2]), { stiffness: 120, damping: 16 });
  const bodyX = useSpring(useTransform(mx, [-1, 1], [-2, 2]), { stiffness: 36, damping: 15 });

  return (
    <svg
      viewBox="0 0 360 400"
      className="h-auto w-full"
      role="img"
      aria-label="Stylized portrait of Marwan Osama"
    >
      <defs>
        <linearGradient id="fadeL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HAIR} stopOpacity="0.5" />
          <stop offset="100%" stopColor={HAIR} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fadeR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HAIR} stopOpacity="0.5" />
          <stop offset="100%" stopColor={HAIR} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cheekL" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={SKIN_SHADE} stopOpacity="0.35" />
          <stop offset="100%" stopColor={SKIN_SHADE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cheekR" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={SKIN_SHADE} stopOpacity="0.35" />
          <stop offset="100%" stopColor={SKIN_SHADE} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* torso: dark outfit — follows the cursor gently */}
      <motion.g style={reduce ? undefined : { x: bodyX }}>
        <path
          d="M70 400 C70 330 112 296 180 296 C248 296 290 330 290 400 Z"
          fill={OUTFIT}
        />
        <path
          d="M150 300 C160 313 200 313 210 300"
          fill="none"
          stroke={OUTFIT_HI}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M96 322 C104 314 114 308 126 304" fill="none" stroke={OUTFIT_HI} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M264 322 C256 314 246 308 234 304" fill="none" stroke={OUTFIT_HI} strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {/* neck */}
      <path d="M158 246 L158 292 C158 300 202 300 202 292 L202 246 Z" fill={SKIN_SHADE} />
      <path d="M158 246 C166 262 194 262 202 246 L202 258 C194 270 166 270 158 258 Z" fill={SKIN_DEEP} opacity="0.45" />

      {/* head group — tilts toward the cursor */}
      <motion.g
        style={
          reduce
            ? undefined
            : { x: headX, y: headY, rotate: headR, originX: 0.5, originY: 0.62 }
        }
      >
        {/* ears */}
        <ellipse cx="120" cy="174" rx="9" ry="14" fill={SKIN} />
        <ellipse cx="240" cy="174" rx="9" ry="14" fill={SKIN} />
        <ellipse cx="120" cy="174" rx="4" ry="7" fill={SKIN_SHADE} opacity="0.7" />
        <ellipse cx="240" cy="174" rx="4" ry="7" fill={SKIN_SHADE} opacity="0.7" />

        {/* face: structured silhouette, tapered chin */}
        <path
          d="M122 158 C122 116 148 94 180 94 C212 94 238 116 238 158 C238 200 224 242 180 260 C136 242 122 200 122 158 Z"
          fill={SKIN}
        />
        <ellipse cx="138" cy="196" rx="16" ry="22" fill="url(#cheekL)" />
        <ellipse cx="222" cy="196" rx="16" ry="22" fill="url(#cheekR)" />
        <path
          d="M180 260 C160 252 146 236 136 218 C148 240 162 250 180 254 C198 250 212 240 224 218 C214 236 200 252 180 260 Z"
          fill={SKIN_SHADE}
          opacity="0.35"
        />

        {/* hair: curly top, tapered sides */}
        <g fill={HAIR}>
          <circle cx="128" cy="112" r="17" />
          <circle cx="150" cy="96" r="19" />
          <circle cx="176" cy="90" r="20" />
          <circle cx="202" cy="94" r="19" />
          <circle cx="224" cy="108" r="17" />
          <circle cx="238" cy="124" r="13" />
          <circle cx="120" cy="128" r="12" />
          <circle cx="146" cy="108" r="13" />
          <circle cx="172" cy="100" r="14" />
          <circle cx="198" cy="106" r="13" />
          <circle cx="114" cy="138" r="9" />
          <circle cx="246" cy="136" r="9" />
        </g>
        <g fill="none" stroke={CURL_HI} strokeWidth="2" strokeLinecap="round" opacity="0.65">
          <path d="M144 96 Q150 90 157 95" />
          <path d="M168 86 Q175 80 182 86" />
          <path d="M192 88 Q199 83 205 90" />
          <path d="M216 98 Q222 93 227 100" />
          <path d="M132 110 Q137 105 143 109" />
          <path d="M158 104 Q164 99 170 104" />
          <path d="M184 98 Q190 93 196 99" />
          <path d="M208 106 Q214 101 219 107" />
        </g>
        <path
          d="M146 84 Q180 70 214 84"
          fill="none"
          stroke={HAIR_HI}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* faded sides */}
        <path d="M122 118 C118 138 118 158 122 176 L134 172 C130 152 131 134 138 118 Z" fill="url(#fadeL)" />
        <path d="M238 118 C242 138 242 158 238 176 L226 172 C230 152 229 134 222 118 Z" fill="url(#fadeR)" />

        {/* brows */}
        <path d="M138 156 C145 151 156 151 162 155" fill="none" stroke={HAIR} strokeWidth="4" strokeLinecap="round" />
        <path d="M198 155 C204 151 215 151 222 156" fill="none" stroke={HAIR} strokeWidth="4" strokeLinecap="round" />

        {/* glasses */}
        <g stroke={INK} strokeWidth="3" fill="#dfe9f5" fillOpacity="0.05">
          <rect x="138" y="166" width="38" height="28" rx="7" />
          <rect x="184" y="166" width="38" height="28" rx="7" />
        </g>
        <path d="M176 177 Q181 172 184 177" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path d="M138 179 L121 175" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path d="M222 179 L239 175" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />

        {/* pupils — track the cursor */}
        <motion.g style={reduce ? undefined : { x: eyeX, y: eyeY }}>
          <circle cx="155" cy="182" r="3.6" fill={INK} />
          <circle cx="199" cy="182" r="3.6" fill={INK} />
        </motion.g>
        <path d="M147 180 Q155 176 163 180" fill="none" stroke={SKIN_DEEP} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        <path d="M191 180 Q199 176 207 180" fill="none" stroke={SKIN_DEEP} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />

        {/* nose */}
        <path
          d="M180 186 C177 195 175 201 180 206"
          fill="none"
          stroke={SKIN_DEEP}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M172 206 Q175 209 179 208" fill="none" stroke={SKIN_DEEP} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M188 206 Q185 209 181 208" fill="none" stroke={SKIN_DEEP} strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* mouth — subtle, confident */}
        <path
          d="M163 224 Q180 231 197 224"
          fill="none"
          stroke="#9a5f41"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          d="M168 228 Q180 233 192 228"
          fill="none"
          stroke={SKIN_DEEP}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.35"
        />
      </motion.g>
    </svg>
  );
}
