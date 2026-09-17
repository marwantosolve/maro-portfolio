/*
  Experience / education / skills — facts sourced verbatim from the CV.
  See PROJECT_CONTEXT.md §4. Presentation note: Ericsson is NOT framed as
  current employment (per Marwan, 2026-09-14).
*/

export const experience = [
  {
    org: "Ericsson",
    role: "AI Research Engineer",
    period: "Oct 2025",
    location: "Cairo, EG",
    note: "Ericsson-sponsored graduation project",
    points: [
      "Industry-focused advanced AI techniques program in collaboration with Ericsson",
      "Developing MASEF, a research-oriented framework for benchmarking and evaluating multi-agent AI systems",
      "Designing evaluation protocols, performance metrics, and reproducible experimentation pipelines for agentic systems",
      "Collaborating with the R&D team on AI engineering architectures, experimentation methodology, and research workflows",
    ],
  },
  {
    org: "Codveda",
    role: "Machine Learning Intern",
    period: "Sep 2025",
    location: "Remote",
    note: null,
    points: [
      "Built and evaluated predictive ML models using TensorFlow, Keras, and Scikit-learn",
      "Preprocessed and analyzed datasets using Pandas and NumPy",
      "Applied multiple ML algorithms to solve predictive modeling tasks",
      "Tuned models and hyperparameters to improve performance",
    ],
  },
] as const;

export const education = {
  degree: "Bachelor, Computer Science — Artificial Intelligence Department",
  school: "Cairo University",
  period: "Oct 2022 – Jul 2026",
  location: "Cairo, Egypt",
  gpa: "3.3",
} as const;

export const publication = {
  title: "MASEF — Multi-Agent System Evaluation Framework",
  status: "In publishing progress",
} as const;

export const hackathons = [
  {
    name: "Here Technologies Geospatial Data Cairo Hackathon 2025",
    detail:
      "Developed an AI solution utilizing geospatial and LiDAR data — geospatial analytics, machine learning, and real-world deployment.",
  },
  {
    name: "Solship Zewail City Hackathon 2026",
    detail:
      "Developed an AI-driven solution for battery performance forecasting and electricity cost optimization, applying machine learning to improve energy efficiency and operational planning.",
  },
] as const;

export const certifications = [
  "DeepLearning.AI — Machine Learning Specialization",
  "DeepLearning.AI — Deep Learning Specialization",
  "DeepLearning.AI — Machine Learning in Production",
  "DeepLearning.AI — Generative AI with Large Language Models",
  "DeepLearning.AI — Agentic AI",
  "Sprints × Microsoft — AI and Machine Learning Summer Training",
  "CIB Egypt — Internship Certificate",
] as const;

export const languages = [
  { language: "Arabic", level: "Native" },
  { language: "English", level: "Advanced" },
] as const;

/*
  Capabilities — framed around verbs (build / reason / retrieve / adapt /
  evaluate), not a tool catalog. Technologies beneath each capability are
  supporting evidence, all CV-backed. Icons render automatically where a
  real logo exists (see components/ui/TechIcon.tsx).
*/

export const capabilities = [
  {
    verb: "Build",
    title: "Production-oriented AI systems",
    blurb: "From research prototype to deployed system — APIs, pipelines, and infrastructure that hold up in production.",
    items: ["FastAPI", "Docker", "PostgreSQL", "Redis", "Linux", "Kubernetes", "CI/CD"],
  },
  {
    verb: "Reason",
    title: "LLMs, agents, and orchestration",
    blurb: "Agents that plan, call tools, and cooperate — orchestrated as reliable systems.",
    items: ["LangGraph", "LangChain", "LlamaIndex", "Tool Calling", "MCP", "A2A", "Prompt Engineering", "Context Engineering"],
  },
  {
    verb: "Retrieve",
    title: "RAG and knowledge systems",
    blurb: "Grounded answers from real documents, with citations instead of guesses.",
    items: ["Qdrant", "FAISS", "ChromaDB", "Hybrid Search", "Reranking", "GraphRAG", "BM25", "Knowledge Graphs"],
  },
  {
    verb: "Adapt",
    title: "Fine-tuning and efficient model adaptation",
    blurb: "Making pretrained models better at the task that matters — without wasting compute.",
    items: ["PyTorch", "Hugging Face", "vLLM", "PEFT", "LoRA / QLoRA", "Quantization"],
  },
  {
    verb: "Evaluate",
    title: "Reliable benchmarking and AI evaluation",
    blurb: "Systems you can measure, trust, and debug — evaluation as a first-class engineering concern.",
    items: ["LLM-as-Judge", "Benchmarking", "Evaluation Pipelines", "OpenTelemetry", "Prometheus", "Grafana"],
  },
] as const;

/*
  Technology clusters — the toolbox view used on About. Same CV-backed
  set as capabilities, grouped for scanning.
*/

export const techClusters = [
  {
    title: "LLM / Model Engineering",
    items: ["PyTorch", "Hugging Face", "vLLM", "TensorFlow", "PEFT", "LoRA / QLoRA", "Quantization"],
  },
  {
    title: "Agentic Systems",
    items: ["LangGraph", "LangChain", "LlamaIndex", "Tool Calling", "MCP", "A2A"],
  },
  {
    title: "Retrieval / Knowledge",
    items: ["Qdrant", "FAISS", "ChromaDB", "BM25", "Hybrid Search", "Reranking", "Knowledge Graphs", "GraphRAG"],
  },
  {
    title: "Systems",
    items: ["FastAPI", "PostgreSQL", "Redis", "Docker", "Linux", "Kubernetes"],
  },
  {
    title: "Observability",
    items: ["OpenTelemetry", "Prometheus", "Grafana"],
  },
] as const;
