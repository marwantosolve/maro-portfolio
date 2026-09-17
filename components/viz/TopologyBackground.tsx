"use client";

import { useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/*
  TopologyBackground — the site's ambient visual system.
  Sparse neural-network / computation-graph topology: a few thin edges,
  small nodes, controlled density, restrained opacity, occasional data
  flow. Two depth layers with subtle cursor parallax.

  Deliberately NOT: dense particle fields, glow, neon, big canvases.

  PipelineFlow — the hero's signature motif: the conceptual chain
  INPUT → MODEL → RETRIEVAL → TOOLS → OUTPUT with a slow traveling
  pulse. Rendered as a visible element at the hero's base.

  Both respect prefers-reduced-motion (static render).
*/

/* deterministic PRNG so the topology is stable across renders/builds */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1200;
const H = 640;

type Pt = { x: number; y: number; r: number };
type Edge = { a: Pt; b: Pt; layer: number };

function buildTopology(seed: number, counts: [number, number]): { points: Pt[][]; edges: Edge[] } {
  const rand = mulberry32(seed);
  const layers: Pt[][] = [];

  counts.forEach((count, li) => {
    const pts: Pt[] = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: 40 + rand() * (W - 80),
        y: 30 + rand() * (H - 60),
        r: 1.6 + rand() * (li === 0 ? 1.2 : 2.2),
      });
    }
    layers.push(pts);
  });

  const threshold = [185, 240];
  const edges: Edge[] = [];
  layers.forEach((pts, li) => {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < threshold[li]) edges.push({ a: pts[i], b: pts[j], layer: li });
      }
    }
  });

  return { points: layers, edges };
}

export function TopologyBackground({ seed = 7, className }: { seed?: number; className?: string }) {
  const reduce = useReducedMotion();

  const { points, edges } = useMemo(
    () => buildTopology(seed, [14, 9]),
    [seed],
  );

  /* cursor parallax — depth via differential movement */
  const mx = useMotionValue(0);
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

  const farX = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 30, damping: 18 });
  const farY = useSpring(useTransform(my, [-1, 1], [-4, 4]), { stiffness: 30, damping: 18 });
  const nearX = useSpring(useTransform(mx, [-1, 1], [-16, 16]), { stiffness: 30, damping: 18 });
  const nearY = useSpring(useTransform(my, [-1, 1], [-8, 8]), { stiffness: 30, damping: 18 });

  /* pick up to 3 near-layer edges for slow data-flow pulses */
  const pulseEdges = useMemo(() => {
    const near = edges.filter((e) => e.layer === 1);
    return near.slice(0, Math.min(3, near.length));
  }, [edges]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className ?? "absolute inset-0 h-full w-full"}
      aria-hidden
    >
      {/* far layer */}
      <motion.g
        style={reduce ? undefined : { x: farX, y: farY }}
        stroke="var(--muted)"
        strokeOpacity="0.5"
      >
        {edges
          .filter((e) => e.layer === 0)
          .map((e, i) => (
            <line key={i} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} strokeWidth="0.75" opacity="0.22" />
          ))}
        {points[0].map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={p.r * 1.6} height={p.r * 1.6} fill="var(--muted)" opacity="0.3" />
        ))}
      </motion.g>

      {/* near layer */}
      <motion.g
        style={reduce ? undefined : { x: nearX, y: nearY }}
        stroke="var(--muted)"
        strokeOpacity="0.7"
      >
        {edges
          .filter((e) => e.layer === 1)
          .map((e, i) => (
            <line key={i} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} strokeWidth="0.9" opacity="0.18" />
          ))}
        {points[1].map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={i % 7 === 0 ? "var(--accent)" : "var(--muted)"}
            opacity={i % 7 === 0 ? 0.55 : 0.32}
          />
        ))}

        {/* occasional data flow — slow pulses along a few edges */}
        {!reduce &&
          pulseEdges.map((e, i) => (
            <circle key={i} r="2" fill="var(--accent)" opacity="0.7">
              <animateMotion
                dur={`${9 + i * 2.5}s`}
                begin={`${i * 3.4}s`}
                repeatCount="indefinite"
                path={`M ${e.a.x} ${e.a.y} L ${e.b.x} ${e.b.y}`}
              />
            </circle>
          ))}
      </motion.g>
    </svg>
  );
}

/*
  PipelineFlow — hero motif: the engineering chain, labeled and slow.
  Input → Model → Retrieval → Tools → Output.
*/
export function PipelineFlow({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const labels = ["INPUT", "MODEL", "RETRIEVAL", "TOOLS", "OUTPUT"];
  const W = 640;
  const H = 64;
  const xs = labels.map((_, i) => 40 + (i * (W - 80)) / (labels.length - 1));
  const y = 22;
  const chain = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");

  return (
    <div className={className} aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        {/* chain edges */}
        {xs.slice(0, -1).map((x, i) => (
          <line
            key={i}
            x1={x + 10}
            y1={y}
            x2={xs[i + 1] - 10}
            y2={y}
            stroke="var(--muted)"
            strokeOpacity="0.6"
            strokeWidth="1"
          />
        ))}

        {/* nodes */}
        {xs.map((x, i) => (
          <g key={i}>
            <rect
              x={x - 5.5}
              y={y - 5.5}
              width="11"
              height="11"
              rx="2"
              fill="var(--background)"
              stroke={i === 0 || i === xs.length - 1 ? "var(--accent)" : "var(--muted)"}
              strokeOpacity="0.8"
              strokeWidth="1.25"
            />
            <text
              x={x}
              y={y + 28}
              textAnchor="middle"
              fontSize="9"
              letterSpacing="0.16em"
              fill="var(--muted)"
              opacity="0.85"
              fontFamily="var(--font-mono)"
            >
              {labels[i]}
            </text>
          </g>
        ))}

        {/* traveling signal */}
        {!reduce && (
          <circle r="2.2" fill="var(--accent)" opacity="0.9">
            <animateMotion dur="11s" repeatCount="indefinite" path={chain} />
          </circle>
        )}
      </svg>
    </div>
  );
}
