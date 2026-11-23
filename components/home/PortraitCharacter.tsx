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
  with a ringlet fringe over the forehead, diamond-leaning face, silver-
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

  // face silhouette (diamond-leaning: wide cheekbones, tapered jaw) reused for shading + clipping
  const FACE =
    "M130 148 C130 110 150 92 180 92 C210 92 230 110 230 148 C231 163 235 176 238 190 C234 211 224 230 210 244 C206 248 202 251 198 254 L180 267 L162 254 C158 251 154 248 150 244 C136 230 126 211 122 190 C125 176 129 163 130 148 Z";

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
        {/* sideburn fade: solid at the curl mass, transparent at the tip */}
        <linearGradient id="pc-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HAIR} />
          <stop offset="55%" stopColor={HAIR} />
          <stop offset="100%" stopColor={HAIR} stopOpacity="0" />
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

      {/* lower neck: tapered, top corners hidden behind the jaw, drawn
          UNDER the polo so the shirt's curved neckline is the boundary */}
      <path d="M160 258 L152 316 L208 316 L200 258 Z" fill={SKIN_SHADE} />

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
        <path d="M163 240 L160 282 L200 282 L197 240 Z" fill={SKIN_SHADE} />
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
        {/* soft jawline definition */}
        <path d="M126 196 C132 222 142 240 156 252" fill="none" stroke={SKIN_DEEP} strokeWidth="2.4" strokeLinecap="round" opacity="0.3" filter="url(#pc-soft)" clipPath="url(#pc-face)" />
        <path d="M234 196 C228 222 218 240 204 252" fill="none" stroke={SKIN_DEEP} strokeWidth="2.4" strokeLinecap="round" opacity="0.3" filter="url(#pc-soft)" clipPath="url(#pc-face)" />

        {/* light stubble on jaw, chin and upper lip */}
        <g clipPath="url(#pc-face)">
          <path
            d="M128 198 C136 236 154 258 180 265 C206 258 224 236 232 198 L232 265 L128 265 Z"
            fill={SKIN_DEEP}
            opacity="0.2"
          />
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
        {/* blink lids — wrapped in a translate group so scaleY pivots on
            the eye center itself (a px origin on the ellipse resolves
            against its own bbox and the lid slides down onto the shirt
            mid-blink) */}
        <g transform="translate(153 184)">
          <motion.ellipse
            cx="0"
            cy="0"
            rx="13"
            ry="9"
            fill={SKIN}
            style={{ scaleY: 0, originX: 0.5, originY: 0.5 }}
            {...lidMotion}
          />
        </g>
        <g transform="translate(207 184)">
          <motion.ellipse
            cx="0"
            cy="0"
            rx="13"
            ry="9"
            fill={SKIN}
            style={{ scaleY: 0, originX: 0.5, originY: 0.5 }}
            {...lidMotion}
          />
        </g>

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
        {/* one continuous curl mass: dome runs straight into the scalloped
            hairline, so no background can show through */}
        <path
          d="M112 152
             C104 138 100 116 106 94
             C119 68 147 59 180 59
             C213 59 241 68 253 94
             C260 116 256 138 248 152
             C246 144 244 138 240 134
             C236 142 230 144 224 140
             C220 146 212 148 206 142
             C202 148 194 150 188 144
             C184 150 176 150 172 144
             C166 150 158 148 154 142
             C148 148 140 146 136 140
             C130 144 124 142 120 134
             C116 138 114 144 112 152 Z"
          fill="url(#pc-hair)"
        />
        {/* irregular curl clumps along the silhouette */}
        <g fill="#241f1a">
          <circle cx="108" cy="110" r="7" />
          <circle cx="105" cy="128" r="6" />
          <circle cx="114" cy="90" r="8" />
          <circle cx="126" cy="78" r="9" />
          <circle cx="146" cy="65" r="9" />
          <circle cx="168" cy="58" r="9" />
          <circle cx="192" cy="57" r="9" />
          <circle cx="214" cy="64" r="9" />
          <circle cx="234" cy="72" r="9" />
          <circle cx="248" cy="90" r="8" />
          <circle cx="252" cy="110" r="7" />
          <circle cx="255" cy="130" r="6" />
          <circle cx="128" cy="84" r="7.5" />
          <circle cx="150" cy="70" r="7.5" />
          <circle cx="176" cy="62" r="7.5" />
          <circle cx="202" cy="64" r="7.5" />
          <circle cx="224" cy="76" r="7.5" />
        </g>
        {/* one ringlet row sitting ON the hairline edge (half merged into
            the mass — an edge of curls, not a floating row) */}
        <g fill={HAIR}>
          <circle cx="122" cy="138" r="7" />
          <circle cx="135" cy="142" r="6.5" />
          <circle cx="148" cy="145" r="7" />
          <circle cx="161" cy="147" r="6.5" />
          <circle cx="174" cy="148" r="7" />
          <circle cx="187" cy="147" r="6.5" />
          <circle cx="200" cy="146" r="7" />
          <circle cx="213" cy="144" r="6.5" />
          <circle cx="226" cy="141" r="7" />
          <circle cx="238" cy="138" r="6.5" />
          <circle cx="115" cy="146" r="6" />
          <circle cx="245" cy="146" r="6" />
        </g>
        {/* graduated sides: a short wedge at each temple that runs from
            the curl mass down the sideburn and fades out toward the ear */}
        <path d="M112 144 C109 153 109 167 113 178 L130 176 C126 167 127 155 133 144 Z" fill="url(#pc-fade)" />
        <path d="M248 144 C251 153 251 167 247 178 L230 176 C234 167 233 155 227 144 Z" fill="url(#pc-fade)" />
        {/* ring highlights on some hairline curls */}
        <g fill="none" stroke={CURL_HI} strokeWidth="1.7" strokeLinecap="round" opacity="0.85">
          <path d="M119 139 Q122 134 126 138" />
          <path d="M145 146 Q148 141 152 145" />
          <path d="M171 149 Q174 144 178 148" />
          <path d="M197 147 Q200 142 204 146" />
          <path d="M223 142 Q226 137 230 141" />
        </g>
        {/* light side shading (his sides are short but curly) */}
        <path d="M106 94 C100 116 102 136 112 152 L124 144 C117 132 116 112 122 96 Z" fill="#000000" opacity="0.15" filter="url(#pc-soft)" />
        <path d="M254 94 C260 116 258 136 248 152 L236 144 C243 132 244 112 238 96 Z" fill="#000000" opacity="0.15" filter="url(#pc-soft)" />
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
          <path d="M148 64 Q154 58 160 63" />
          <path d="M196 60 Q202 54 208 59" />
        </g>
        {/* crown highlight, kept inside the mass */}
        <path d="M150 74 Q180 62 210 74" fill="none" stroke="#5a5045" strokeWidth="3" strokeLinecap="round" opacity="0.38" filter="url(#pc-soft)" />
        {/* soft shadow the fringe casts on the forehead */}
        <path
          d="M128 146 C146 138 162 142 180 140 C198 142 214 138 232 146 L232 156 C214 148 198 152 180 150 C162 152 146 148 128 156 Z"
          fill="#000000"
          opacity="0.14"
          filter="url(#pc-soft)"
          clipPath="url(#pc-face)"
        />
      </motion.g>
    </svg>
  );
}
