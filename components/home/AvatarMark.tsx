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
  Stylized vector avatar — v1 placeholder character matching the reference
  traits (short dark curly hair, thin dark-framed glasses, oval face).
  Subtle cursor-aware parallax: head tilts, pupils track, torso follows.
  To be replaced by the full custom 3D character in a later milestone.
  All motion is disabled for reduced-motion users.
*/

const HAIR = "#191b20";
const SKIN = "#ecbe91";
const SKIN_DARK = "#d8a577";
const TOP = "#1c1f26";
const TOP_LIGHT = "#262a33";
const INK = "#14161a";

export function AvatarMark() {
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

  const headX = useSpring(useTransform(mx, [-1, 1], [-7, 7]), { stiffness: 55, damping: 14 });
  const headY = useSpring(useTransform(my, [-1, 1], [-3, 4]), { stiffness: 55, damping: 14 });
  const headR = useSpring(useTransform(mx, [-1, 1], [-2.5, 2.5]), { stiffness: 45, damping: 12 });
  const eyeX = useSpring(useTransform(mx, [-1, 1], [-3.2, 3.2]), { stiffness: 130, damping: 16 });
  const eyeY = useSpring(useTransform(my, [-1, 1], [-2.2, 2.4]), { stiffness: 130, damping: 16 });
  const bodyX = useSpring(useTransform(mx, [-1, 1], [-2.5, 2.5]), { stiffness: 40, damping: 15 });

  return (
    <svg
      viewBox="0 0 320 360"
      className="h-auto w-full"
      role="img"
      aria-label="Stylized avatar of Marwan Osama"
    >
      {/* torso */}
      <motion.g style={reduce ? undefined : { x: bodyX }}>
        <path
          d="M52 360 C52 292 96 258 160 258 C224 258 268 292 268 360 Z"
          fill={TOP}
        />
        <path
          d="M134 262 L160 286 L186 262"
          fill="none"
          stroke={TOP_LIGHT}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path d="M138 264 L160 283 L182 264 L182 262 L160 280 L138 262 Z" fill={TOP_LIGHT} />
      </motion.g>

      {/* neck */}
      <rect x="141" y="212" width="38" height="52" rx="13" fill={SKIN_DARK} />

      {/* head group — tilts toward the cursor */}
      <motion.g
        style={reduce ? undefined : { x: headX, y: headY, rotate: headR, originX: 0.5, originY: 0.58 }}
      >
        {/* ears */}
        <circle cx="97" cy="158" r="10.5" fill={SKIN} />
        <circle cx="223" cy="158" r="10.5" fill={SKIN} />

        {/* face */}
        <ellipse cx="160" cy="150" rx="63" ry="71" fill={SKIN} />

        {/* short curly hair — cluster of curls */}
        <g fill={HAIR}>
          <circle cx="104" cy="120" r="21" />
          <circle cx="118" cy="98" r="23" />
          <circle cx="143" cy="84" r="25" />
          <circle cx="170" cy="82" r="25" />
          <circle cx="196" cy="92" r="23" />
          <circle cx="212" cy="112" r="21" />
          <circle cx="222" cy="132" r="16" />
          <circle cx="99" cy="140" r="14" />
          <circle cx="224" cy="146" r="13" />
          {/* forehead curls */}
          <circle cx="128" cy="104" r="14" />
          <circle cx="160" cy="96" r="15" />
          <circle cx="192" cy="102" r="14" />
        </g>

        {/* brows */}
        <path d="M122 134 Q135 128 148 133" fill="none" stroke={HAIR} strokeWidth="4" strokeLinecap="round" />
        <path d="M172 133 Q185 128 198 134" fill="none" stroke={HAIR} strokeWidth="4" strokeLinecap="round" />

        {/* glasses */}
        <g stroke={INK} strokeWidth="3.5" fill="#ffffff" fillOpacity="0.06">
          <rect x="120" y="142" width="36" height="29" rx="9" />
          <rect x="164" y="142" width="36" height="29" rx="9" />
        </g>
        <path d="M156 154 Q160 150 164 154" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M120 155 L101 151" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M200 155 L219 151" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />

        {/* pupils — track the cursor */}
        <motion.g style={reduce ? undefined : { x: eyeX, y: eyeY }}>
          <circle cx="138" cy="156" r="4.2" fill={INK} />
          <circle cx="182" cy="156" r="4.2" fill={INK} />
        </motion.g>

        {/* nose */}
        <path
          d="M160 162 C157 169 156 174 161 178"
          fill="none"
          stroke={SKIN_DARK}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* mouth */}
        <path
          d="M145 193 Q160 201 175 193"
          fill="none"
          stroke="#a06544"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </motion.g>
    </svg>
  );
}
