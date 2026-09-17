import {
  siPytorch,
  siHuggingface,
  siVllm,
  siLangchain,
  siLanggraph,
  siQdrant,
  siFastapi,
  siPostgresql,
  siRedis,
  siDocker,
  siLinux,
  siOpentelemetry,
  siPrometheus,
  siGrafana,
  siKubernetes,
  siTensorflow,
  siScikitlearn,
  type SimpleIcon,
} from "simple-icons";

/*
  TechIcon — real technology marks (Simple Icons), rendered muted /
  monochrome by default; emphasis comes from surrounding hover states.
  Technologies without an icon (PEFT, LoRA, BM25, MCP, ...) render as
  plain text chips — see <TechChip />.
  Server-component friendly: no client JS shipped for icons.
*/

const ICONS: Record<string, SimpleIcon> = {
  PyTorch: siPytorch,
  "Hugging Face": siHuggingface,
  vLLM: siVllm,
  LangChain: siLangchain,
  LangGraph: siLanggraph,
  Qdrant: siQdrant,
  FastAPI: siFastapi,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  Docker: siDocker,
  Linux: siLinux,
  OpenTelemetry: siOpentelemetry,
  Prometheus: siPrometheus,
  Grafana: siGrafana,
  Kubernetes: siKubernetes,
  TensorFlow: siTensorflow,
  "scikit-learn": siScikitlearn,
};

export function TechIcon({ name, size = 14 }: { name: string; size?: number }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="shrink-0"
    >
      <path d={icon.path} />
    </svg>
  );
}

/*
  TechChip — a single technology: icon where one exists, always with
  the name. Muted by default; brightens inside group-hover contexts.
*/
export function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted transition-colors group-hover:border-accent-text/40 group-hover:text-foreground">
      <TechIcon name={name} size={12} />
      {name}
    </span>
  );
}

export function hasTechIcon(name: string): boolean {
  return name in ICONS;
}
