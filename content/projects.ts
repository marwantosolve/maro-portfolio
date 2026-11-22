/*
  Project content — every fact below is sourced from the CV or the project's
  own README/docs. Nothing invented. See PROJECT_CONTEXT.md §4.

  Hierarchy (v2 direction):
    flagship   — MASEF (research identity, publication in progress)
    major      — Atlas, Handelny, ForgeLM
    additional — VisionTrack

  Narrative: each project gets its own frame (problem / system / study /
  benchmark) — not every story is a question about measurement.
*/

export type ProjectTier = "flagship" | "major" | "additional";

export type GraphNodeKind = "source" | "step" | "store" | "output";

export type GraphNode = {
  id: string;
  label: string;
  kind: GraphNodeKind;
};

export type GraphEdge = {
  from: string;
  to: string;
};

export type Project = {
  slug: string;
  name: string;
  domain: string;
  tier: ProjectTier;
  tagline: string;
  /** the project's own narrative frame — label + one strong statement */
  frame: { label: string; statement: string };
  summary: string[];
  highlights: string[];
  stack: string[];
  repo?: string;
  status?: string;
  publication?: string;
  graph: { nodes: GraphNode[]; edges: GraphEdge[] };
};

export const projects: Project[] = [
  {
    slug: "masef",
    name: "MASEF",
    domain: "Multi-Agent Evaluation",
    tier: "flagship",
    tagline: "A research framework for evaluating multi-agent AI systems",
    frame: {
      label: "The research",
      statement:
        "Multi-agent systems are powerful but hard to trust. MASEF makes them measurable — modular evaluation pipelines spanning agent behavior, reasoning artifacts, and system performance.",
    },
    summary: [
      "MASEF is a research-oriented framework for evaluating multi-agent AI systems through modular evaluation pipelines.",
      "It uses multi-layer evaluation methodologies spanning agent behavior, reasoning artifacts, and system performance — integrating LLM-based judges, semantic similarity, and NLI-based metrics, with batch experiment outputs and resource monitoring for reproducible assessment.",
    ],
    highlights: [
      "Multi-layer evaluation across agent behavior, reasoning artifacts, and system performance",
      "LLM-based judges, semantic similarity, and NLI-based metrics",
      "Modular evaluation pipelines",
      "Batch experiment outputs with resource monitoring and diagnostics",
    ],
    stack: [
      "Multi-Agent Systems",
      "LLM-as-Judge",
      "Semantic Similarity",
      "NLI Metrics",
      "Evaluation Pipelines",
    ],
    publication: "Publication in progress",
    graph: {
      nodes: [
        { id: "runs", label: "Agent Runs\n(any framework)", kind: "source" },
        { id: "collect", label: "Trace & Artifact\nCollection", kind: "step" },
        { id: "behavior", label: "Agent Behavior\nLayer", kind: "step" },
        { id: "reasoning", label: "Reasoning\nArtifacts Layer", kind: "step" },
        { id: "performance", label: "System\nPerformance Layer", kind: "step" },
        { id: "report", label: "Standardized\nEvaluation Report", kind: "output" },
      ],
      edges: [
        { from: "runs", to: "collect" },
        { from: "collect", to: "behavior" },
        { from: "collect", to: "reasoning" },
        { from: "collect", to: "performance" },
        { from: "behavior", to: "report" },
        { from: "reasoning", to: "report" },
        { from: "performance", to: "report" },
      ],
    },
  },
  {
    slug: "atlas",
    name: "Atlas",
    domain: "Agent Observability",
    tier: "major",
    tagline: "Causal debugging and root-cause analysis for agentic systems",
    frame: {
      label: "The problem",
      statement:
        "When an agent run fails, you can see that it failed — not where it started failing. Atlas reconstructs runs into causal execution graphs and localizes root causes deterministically.",
    },
    summary: [
      "Atlas is a diagnostic investigation layer for agentic AI systems. It reconstructs agent runs into span-level causal execution graphs, traces how a failure propagated downstream, and localizes candidate root causes deterministically.",
      "As a diagnostic investigation layer, it traces how a failure propagated to everything downstream of it and localizes candidate root causes deterministically — so an engineer can see not just that a run went wrong, but where it started going wrong.",
    ],
    highlights: [
      "Reconstructs runs into span-level causal execution graphs",
      "Traces failure propagation downstream of a fault",
      "Localizes candidate root causes deterministically, with evidence and blast radius",
      "Detects retry chains and attributes their waste — latency, and cost when the trace supplies it",
      "Deterministic, rule-based analysis — no LLM decides what failed",
    ],
    stack: [
      "Python",
      "Execution Graphs",
      "Root-Cause Analysis",
      "Agent Traces",
      "Observability",
    ],
    repo: "https://github.com/marwantosolve/Atlas",
    graph: {
      nodes: [
        { id: "trace", label: "Agent Trace\n(any framework)", kind: "source" },
        { id: "graph", label: "Span-Level\nExecution Graph", kind: "step" },
        { id: "failure", label: "Failure Propagation\n& Blast Radius", kind: "step" },
        { id: "cost", label: "Retry Waste\nAttribution", kind: "step" },
        { id: "report", label: "Root-Cause\nReport", kind: "output" },
      ],
      edges: [
        { from: "trace", to: "graph" },
        { from: "graph", to: "failure" },
        { from: "graph", to: "cost" },
        { from: "failure", to: "report" },
        { from: "cost", to: "report" },
      ],
    },
  },
  {
    slug: "handelny",
    name: "Handelny",
    domain: "RAG Platform",
    tier: "major",
    tagline: "A self-hostable RAG platform that turns company documents into cited answers",
    frame: {
      label: "The system",
      statement:
        "Businesses sit on internal knowledge that never reaches their customers. Handelny turns company documents into AI support agents that answer with citations — and say so when they can't.",
    },
    summary: [
      "Handelny is a self-hostable platform that turns a company’s internal documents into an AI support agent.",
      "The v1 milestone runs end to end on Docker Compose: documents are parsed, chunked, embedded, and indexed into Qdrant, and the assistant streams grounded answers with sources shown — and a configured fallback message instead of guessing when nothing relevant is found. Multi-tenant at the data-model layer; cloud deployment is roadmap.",
    ],
    highlights: [
      "End-to-end RAG pipeline: parse → chunk → embed → index",
      "Qdrant index with multilingual embeddings — works for Arabic and English content",
      "Streamed answers (SSE) grounded only in retrieved chunks, with citations",
      "Fallback message instead of hallucinating when retrieval comes up empty",
      "JWT auth, one organization and one configurable agent per account",
    ],
    stack: [
      "RAG",
      "Qdrant",
      "Multilingual Embeddings",
      "SSE Streaming",
      "Citations",
      "JWT Auth",
    ],
    repo: "https://github.com/marwantosolve/Handelny",
    status: "v1",
    graph: {
      nodes: [
        { id: "docs", label: "Company\nDocuments", kind: "source" },
        { id: "ingest", label: "Parse · Chunk\n· Embed", kind: "step" },
        { id: "index", label: "Qdrant\nIndex", kind: "store" },
        { id: "retrieve", label: "Retrieve\nTop Chunks", kind: "step" },
        { id: "llm", label: "LLM", kind: "step" },
        { id: "answer", label: "Grounded Answer\n+ Citations", kind: "output" },
      ],
      edges: [
        { from: "docs", to: "ingest" },
        { from: "ingest", to: "index" },
        { from: "index", to: "retrieve" },
        { from: "retrieve", to: "llm" },
        { from: "llm", to: "answer" },
      ],
    },
  },
  {
    slug: "forgelm",
    name: "ForgeLM",
    domain: "Model Adaptation",
    tier: "major",
    tagline: "Full fine-tuning vs LoRA vs QLoRA — one controlled pipeline",
    frame: {
      label: "The study",
      statement:
        "Everyone asserts which adaptation method is cheaper. ForgeLM is built to measure it: same data, same seed, same evaluation for every method — quality, memory, compute, and inference speed, comparable by construction.",
    },
    summary: [
      "ForgeLM is a reproducible LLM adaptation pipeline for comparing full fine-tuning, LoRA, and QLoRA across model quality, compute, memory, and inference efficiency.",
      "Every method trains on the same data, under the same seed, through the same evaluation pipeline — task-quality metrics alongside systems metrics like peak VRAM, training time, checkpoint size, and inference latency, so any two runs are directly comparable.",
    ],
    highlights: [
      "Identical data, seed, and evaluation for every adaptation method",
      "Quality metrics alongside peak VRAM, training time, checkpoint size, and latency",
      "Automated evaluation and ablation workflows",
      "Downstream task: mapping free-text support messages to strict-JSON triage objects",
    ],
    stack: ["LoRA", "QLoRA", "PEFT", "PyTorch", "Fine-Tuning", "Quantization"],
    repo: "https://github.com/marwantosolve/ForgeLM",
    graph: {
      nodes: [
        { id: "input", label: "Base LLM\n+ Task Dataset", kind: "source" },
        { id: "zeroshot", label: "Zero-Shot\nBaseline", kind: "step" },
        { id: "full", label: "Full\nFine-Tuning", kind: "step" },
        { id: "lora", label: "LoRA", kind: "step" },
        { id: "qlora", label: "QLoRA\n(4-bit + adapters)", kind: "step" },
        { id: "eval", label: "Evaluation\nQuality · VRAM · Time · Latency", kind: "step" },
        { id: "report", label: "Comparable\nMetrics", kind: "output" },
      ],
      edges: [
        { from: "input", to: "zeroshot" },
        { from: "input", to: "full" },
        { from: "input", to: "lora" },
        { from: "input", to: "qlora" },
        { from: "zeroshot", to: "eval" },
        { from: "full", to: "eval" },
        { from: "lora", to: "eval" },
        { from: "qlora", to: "eval" },
        { from: "eval", to: "report" },
      ],
    },
  },
  {
    slug: "visiontrack",
    name: "VisionTrack",
    domain: "Computer Vision",
    tier: "additional",
    tagline: "Multi-object tracking with a hand-built tracking core",
    frame: {
      label: "The study",
      statement:
        "Off-the-shelf detector, hand-built tracker: Kalman filtering, data association, and track lifecycle implemented from scratch — with appearance-based association and MOT17 benchmarking as the next milestone.",
    },
    summary: [
      "VisionTrack is a multi-object tracking pipeline combining YOLO detection, a hand-implemented Kalman filter, and Hungarian data association.",
      "The detector is off-the-shelf; the tracking logic — Kalman filtering, IoU-cost association with gating, track lifecycle management — is implemented from scratch. V1 runs end to end on any video with a 132-test suite; appearance-based association and benchmark tables (MOTA / IDF1 / HOTA) are the documented next milestone.",
    ],
    highlights: [
      "YOLO detection + hand-implemented Kalman filter + Hungarian IoU association",
      "Full track lifecycle management: coasting through drops, rejecting false positives",
      "132-test suite, runnable end to end on CPU",
      "Next milestone: appearance-based association and MOT17 benchmarking",
    ],
    stack: [
      "YOLO",
      "Kalman Filter",
      "Hungarian Assignment",
      "Track Lifecycle",
      "Python",
      "OpenCV",
    ],
    repo: "https://github.com/marwantosolve/VisionTrack",
    status: "v1 runnable",
    graph: {
      nodes: [
        { id: "video", label: "Video\nStream", kind: "source" },
        { id: "detect", label: "YOLO\nDetection", kind: "step" },
        { id: "kalman", label: "Kalman\nFilter", kind: "step" },
        { id: "assoc", label: "Hungarian\nAssociation", kind: "step" },
        { id: "lifecycle", label: "Track\nLifecycle", kind: "step" },
        { id: "metrics", label: "Consistent\nTrack IDs", kind: "output" },
      ],
      edges: [
        { from: "video", to: "detect" },
        { from: "detect", to: "kalman" },
        { from: "kalman", to: "assoc" },
        { from: "assoc", to: "lifecycle" },
        { from: "lifecycle", to: "metrics" },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const flagship = projects.filter((p) => p.tier === "flagship");
export const majorWork = projects.filter((p) => p.tier === "major");
export const additionalWork = projects.filter((p) => p.tier === "additional");
