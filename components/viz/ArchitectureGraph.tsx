"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { GraphEdge, GraphNode, GraphNodeKind } from "@/content/projects";

/*
  ArchitectureGraph — the site's signature visualization.
  Renders a project's real architecture as a layered directed graph with a
  scroll-triggered draw-in animation. Layout: longest-path layering, nodes
  stacked per layer, bezier edges.
*/

const NODE_W = 152;
const NODE_H = 56;
const GAP_X = 64;
const GAP_Y = 26;
const PAD = 8;

const kindStyles: Record<GraphNodeKind, { fill: string; stroke: string; dash?: string; text: string }> = {
  source: { fill: "var(--surface)", stroke: "var(--muted)", dash: "4 3", text: "var(--foreground)" },
  step: { fill: "var(--surface)", stroke: "var(--border)", text: "var(--foreground)" },
  store: { fill: "var(--surface-2)", stroke: "var(--border)", text: "var(--foreground)" },
  output: { fill: "var(--accent)", stroke: "var(--accent)", text: "var(--accent-ink)" },
};

type Layout = {
  nodes: (GraphNode & { x: number; y: number; layer: number })[];
  edges: (GraphEdge & { d: string })[];
  width: number;
  height: number;
};

function layout(nodes: GraphNode[], edges: GraphEdge[]): Layout {
  const layerOf = new Map<string, number>();
  nodes.forEach((n) => layerOf.set(n.id, 0));

  // longest-path layering (graphs are DAGs)
  for (let changed = true; changed; ) {
    changed = false;
    for (const e of edges) {
      const from = layerOf.get(e.from);
      const to = layerOf.get(e.to);
      if (from === undefined || to === undefined) continue;
      if (to < from + 1) {
        layerOf.set(e.to, from + 1);
        changed = true;
      }
    }
  }

  const layerCount = Math.max(...[...layerOf.values()]) + 1;
  const byLayer: string[][] = Array.from({ length: layerCount }, () => []);
  nodes.forEach((n) => byLayer[layerOf.get(n.id) ?? 0].push(n.id));

  const pos = new Map<string, { x: number; y: number; layer: number }>();
  const maxRows = Math.max(...byLayer.map((l) => l.length));
  const height = maxRows * NODE_H + (maxRows - 1) * GAP_Y + PAD * 2;

  byLayer.forEach((layer, li) => {
    const colH = layer.length * NODE_H + (layer.length - 1) * GAP_Y;
    layer.forEach((id, ri) => {
      pos.set(id, {
        x: PAD + li * (NODE_W + GAP_X),
        y: PAD + (height - colH) / 2 + ri * (NODE_H + GAP_Y),
        layer: li,
      });
    });
  });

  const width = PAD * 2 + layerCount * NODE_W + (layerCount - 1) * GAP_X;

  const laidOut = nodes.map((n) => ({ ...n, ...pos.get(n.id)! }));

  const paths = edges.map((e) => {
    const a = pos.get(e.from)!;
    const b = pos.get(e.to)!;
    const x1 = a.x + NODE_W;
    const y1 = a.y + NODE_H / 2;
    const x2 = b.x;
    const y2 = b.y + NODE_H / 2;
    const c = GAP_X * 0.55;
    return { ...e, d: `M ${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}` };
  });

  return { nodes: laidOut, edges: paths, width, height };
}

export function ArchitectureGraph({ nodes, edges }: { nodes: GraphNode[]; edges: GraphEdge[] }) {
  const reduce = useReducedMotion();
  const g = layout(nodes, edges);

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${g.width} ${g.height}`}
        className="h-auto min-w-[640px] w-full"
        role="img"
        aria-label="Project architecture diagram"
      >
        {/* edges */}
        {g.edges.map((e, i) => {
          const target = g.nodes.find((n) => n.id === e.to);
          const delay = (target?.layer ?? 0) * 0.18 + 0.1;
          return (
            <motion.path
              key={`edge-${i}`}
              d={e.d}
              fill="none"
              stroke="var(--muted)"
              strokeOpacity="0.55"
              strokeWidth="1.25"
              initial={reduce ? undefined : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay, ease: "easeOut" }}
            />
          );
        })}

        {/* nodes */}
        {g.nodes.map((n, i) => {
          const s = kindStyles[n.kind];
          const lines = n.label.split("\n");
          const delay = n.layer * 0.18 + i * 0.03;
          return (
            <motion.g
              key={n.id}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <rect
                x={n.x}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                rx="4"
                fill={s.fill}
                stroke={s.stroke}
                strokeWidth="1.25"
                strokeDasharray={s.dash}
              />
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={n.x + NODE_W / 2}
                  y={n.y + NODE_H / 2 + (li - (lines.length - 1) / 2) * 13 + 4}
                  textAnchor="middle"
                  fill={s.text}
                  fontSize="10.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.04em"
                >
                  {line}
                </text>
              ))}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
