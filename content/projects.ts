/*
  Project content — every fact below is sourced from the CV or the project's
  own README/docs. Nothing invented. See PROJECT_CONTEXT.md §4.
*/

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
  tagline: string;
  question: string;
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
    tagline: "A framework for evaluating multi-agent AI systems",
    question:
      "How do you measure whether a multi-agent system actually works — reproducibly, and regardless of which orchestration framework it runs on?",
    summary: [
      "MASEF is a research-oriented framework for evaluating multi-agent AI systems through modular, framework-agnostic evaluation pipelines.",
      "It uses multi-layer evaluation methodologies spanning agent behavior, reasoning artifacts, and system performance — integrating LLM-based judges, semantic similarity, and NLI-based metrics to provide reproducible and standardized assessments across diverse agent orchestration frameworks.",
    ],
    highlights: [
      "Multi-layer evaluation across agent behavior, reasoning artifacts, and system performance",
      "LLM-based judges, semantic similarity, and NLI-based metrics",
      "Modular, framework-agnostic evaluation pipelines",
      "Reproducible and standardized assessments across orchestration frameworks",
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
    tagline: "Diagnostic investigation layer for agentic AI",
    question: "When an agent run goes wrong — where did it start going wrong?",
    summary: [
      "Atlas is an execution intelligence platform for agentic AI systems. It reconstructs agent runs into causal execution graphs, attributes cost and failures across branches, and helps engineers debug, govern, and optimize complex agent workflows across frameworks.",
      "As a diagnostic investigation layer, it traces how a failure propagated to everything downstream of it and localizes candidate root causes deterministically — so an engineer can see not just that a run went wrong, but where it started going wrong.",
    ],
    highlights: [
      "Reconstructs runs into span-level causal execution graphs",
      "Traces failure propagation downstream of a fault",
      "Localizes candidate root causes deterministically, with evidence and blast radius",
      "Attributes cost and failures across branches",
      "Works across agent orchestration frameworks",
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
        { id: "cost", label: "Cost\nAttribution", kind: "step" },
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
    tagline: "Company documents in, grounded support agents out",
    question: "How do you make an LLM answer only from your documents — with citations, not guesses?",
    summary: [
      "Handelny is a SaaS platform that enables businesses to transform their internal knowledge into AI-powered customer support agents.",
      "It implements an end-to-end Retrieval-Augmented Generation pipeline: company documents are parsed, chunked, embedded, and indexed into a searchable knowledge base, and the assistant delivers context-aware, grounded responses through scalable LLM-powered chat — with sources shown, and a configured fallback message instead of guessing when nothing relevant is found.",
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
    tagline: "Fine-tuning methods under honest measurement",
    question:
      "Full fine-tuning, LoRA, or QLoRA — which gives the best trade-off between quality, memory, compute, and inference speed?",
    summary: [
      "ForgeLM is a reproducible LLM adaptation pipeline comparing full fine-tuning, LoRA, and QLoRA across model quality, compute, memory, and inference efficiency.",
      "Instead of asserting that one method is cheaper, it measures it: every method trains on the same data, under the same seed, through the same evaluation pipeline, and lands in a single comparison table — task-quality metrics alongside systems metrics like peak VRAM, training time, checkpoint size, and inference latency.",
    ],
    highlights: [
      "Identical data, seed, and evaluation for every adaptation method",
      "Quality metrics alongside peak VRAM, training time, checkpoint size, and latency",
      "Automated evaluation and ablation workflows",
      "Downstream task: mapping free-text support messages to strict-JSON triage objects",
    ],
    stack: ["LoRA", "QLoRA", "PEFT", "Fine-Tuning", "Quantization", "PyTorch"],
    repo: "https://github.com/marwantosolve/ForgeLM",
    graph: {
      nodes: [
        { id: "input", label: "Base LLM\n+ Task Dataset", kind: "source" },
        { id: "zeroshot", label: "Zero-Shot\nBaseline", kind: "step" },
        { id: "full", label: "Full\nFine-Tuning", kind: "step" },
        { id: "lora", label: "LoRA", kind: "step" },
        { id: "qlora", label: "QLoRA\n(4-bit + adapters)", kind: "step" },
        { id: "eval", label: "Evaluation\nQuality · VRAM · Time · Latency", kind: "step" },
        { id: "report", label: "Comparison\nReport", kind: "output" },
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
    tagline: "Real-time multi-object tracking, studied with data",
    question:
      "How much does appearance-based association improve identity preservation over IoU-only association — and what does it cost in latency?",
    summary: [
      "VisionTrack is a real-time multi-object tracking pipeline combining YOLO detection, a hand-implemented Kalman filter, and Hungarian data association.",
      "The detector is off-the-shelf; the tracking logic — Kalman filtering, data association, track lifecycle management — is implemented and studied here. The project benchmarks IoU-only versus appearance-assisted association, analyzing identity-switch failure modes and quality/latency tradeoffs across tracking accuracy (MOTA / IDF1 / HOTA) and throughput (FPS).",
    ],
    highlights: [
      "YOLO detection + hand-implemented Kalman filter + Hungarian IoU association",
      "Full track lifecycle management: coasting through drops, rejecting false positives",
      "IoU-only vs. appearance-assisted association comparison",
      "Identity-switch failure mode analysis",
      "Benchmarked on MOTA / IDF1 / HOTA and throughput (FPS)",
    ],
    stack: [
      "YOLO",
      "Kalman Filter",
      "Hungarian Assignment",
      "MOTA · IDF1 · HOTA",
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
        { id: "metrics", label: "MOTA · IDF1 · HOTA\n· FPS", kind: "output" },
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
