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

      {/* lower neck: drawn UNDER the polo so the shirt's curved neckline
          forms the boundary — no hard bottom edge can ever show */}
      <path d="M146 258 L146 316 L214 316 L214 258 Z" fill={SKIN_SHADE} />

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

      {/* head — tilts toward the cursor (upper neck travels with it;
          it overlaps the static lower neck in the same flat tone, so the
          junction stays invisible at every pose) */}
      <motion.g {...headMotion}>
        <path d="M158 240 L158 282 L202 282 L202 240 Z" fill={SKIN_SHADE} />
        <ellipse cx="180" cy="252" rx="24" ry="9" fill={SKIN_DEEP} opacity="0.55" filter="url(#pc-soft)" />
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

        {/* hair: tight curls close to the skull, faded sides, ringlet
            fringe over the forehead — matched to his real cut */}
        {/* curl mass: wide and forward like his, hairline low on the forehead */}
        <path
          d="M110 156
             C100 142 98 118 106 96
             C116 62 146 48 180 48
             C214 48 244 62 254 96
             C262 118 260 142 250 156
             C248 140 246 130 242 122
             C244 110 238 102 230 102
             C231 112 225 118 217 116
             C219 106 212 100 204 102
             C205 112 199 118 191 116
             C192 106 186 100 178 102
             C178 112 172 118 164 116
             C165 106 159 100 151 102
             C152 112 146 118 138 116
             C137 108 132 104 126 106
             C122 116 118 126 116 134
             C113 142 111 150 110 156 Z"
          fill="url(#pc-hair)"
        />
        {/* big irregular curl clumps around the silhouette (his curl scale) */}
        <g fill="#241f1a">
          <circle cx="108" cy="110" r="8" />
          <circle cx="104" cy="128" r="7" />
          <circle cx="114" cy="92" r="9" />
          <circle cx="126" cy="74" r="10" />
          <circle cx="146" cy="60" r="10" />
          <circle cx="168" cy="52" r="10" />
          <circle cx="192" cy="51" r="10" />
          <circle cx="214" cy="58" r="10" />
          <circle cx="234" cy="72" r="10" />
          <circle cx="248" cy="90" r="9" />
          <circle cx="254" cy="110" r="8" />
          <circle cx="256" cy="130" r="7" />
          <circle cx="128" cy="84" r="8" />
          <circle cx="150" cy="70" r="8" />
          <circle cx="176" cy="62" r="8" />
          <circle cx="202" cy="64" r="8" />
          <circle cx="224" cy="76" r="8" />
        </g>
        {/* fringe: tight ringlets hanging low over the forehead, near the brows */}
        <g fill={HAIR}>
          <circle cx="128" cy="130" r="8.5" />
          <circle cx="142" cy="126" r="9" />
          <circle cx="157" cy="129" r="8.5" />
          <circle cx="172" cy="125" r="9" />
          <circle cx="187" cy="128" r="8.5" />
          <circle cx="202" cy="125" r="9" />
          <circle cx="217" cy="129" r="8.5" />
          <circle cx="231" cy="126" r="9" />
          <circle cx="122" cy="145" r="7" />
          <circle cx="136" cy="142" r="7.5" />
          <circle cx="151" cy="146" r="7" />
          <circle cx="166" cy="141" r="7.5" />
          <circle cx="181" cy="145" r="7" />
          <circle cx="196" cy="141" r="7.5" />
          <circle cx="211" cy="146" r="7" />
          <circle cx="226" cy="142" r="7.5" />
          <circle cx="238" cy="144" r="7" />
        </g>
        {/* ring highlights on some fringe curls */}
        <g fill="none" stroke={CURL_HI} strokeWidth="1.7" strokeLinecap="round" opacity="0.85">
          <path d="M124 131 Q128 125 133 130" />
          <path d="M153 130 Q157 124 162 129" />
          <path d="M183 129 Q187 123 192 128" />
          <path d="M213 130 Q217 124 222 129" />
          <path d="M133 143 Q137 138 141 142" />
          <path d="M163 142 Q167 137 171 141" />
          <path d="M193 142 Q197 137 201 141" />
          <path d="M223 143 Q227 138 231 142" />
        </g>
        {/* light side shading (his sides are short but curly, not skin-faded) */}
        <path d="M106 96 C100 118 102 140 112 156 L124 148 C117 134 116 114 122 98 Z" fill="#000000" opacity="0.15" filter="url(#pc-soft)" />
        <path d="M254 96 C260 118 258 140 248 156 L236 148 C243 134 244 114 238 98 Z" fill="#000000" opacity="0.15" filter="url(#pc-soft)" />
        {/* dense curl texture hooks across the mass */}
        <g fill="none" stroke="#3a332c" strokeWidth="2" strokeLinecap="round" opacity="0.95">
          <path d="M126 100 Q132 93 139 98" />
          <path d="M144 86 Q150 79 157 84" />
          <path d="M164 74 Q170 67 177 72" />
          <path d="M186 72 Q192 65 199 70" />
          <path d="M208 78 Q214 71 221 76" />
          <path d="M226 92 Q232 85 239 90" />
          <path d="M118 116 Q124 109 131 114" />
          <path d="M136 108 Q142 101 149 106" />
          <path d="M154 98 Q160 91 167 96" />
          <path d="M174 92 Q180 85 187 90" />
          <path d="M194 94 Q200 87 207 92" />
          <path d="M214 102 Q220 95 227 100" />
          <path d="M234 112 Q240 105 247 110" />
          <path d="M148 62 Q154 56 160 61" />
          <path d="M196 58 Q202 52 208 57" />
        </g>
        {/* crown highlight, kept inside the mass */}
        <path d="M150 72 Q180 58 210 72" fill="none" stroke="#5a5045" strokeWidth="3" strokeLinecap="round" opacity="0.38" filter="url(#pc-soft)" />
        {/* soft shadow the fringe casts on the forehead */}
        <path
          d="M126 146 C144 136 162 140 180 138 C198 140 216 136 234 146 L234 156 C216 146 198 150 180 148 C162 150 144 146 126 156 Z"
          fill="#000000"
          opacity="0.14"
          filter="url(#pc-soft)"
          clipPath="url(#pc-face)"
        />
      </motion.g>
    </svg>
  );
}
