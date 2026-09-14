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

export const capabilities = [
  {
    title: "LLMs & Model Adaptation",
    blurb: "Adapting and serving language models efficiently.",
    items: [
      "Fine-Tuning",
      "LoRA / QLoRA (PEFT)",
      "Quantization",
      "Instruction Following",
      "vLLM",
      "Hugging Face Transformers",
      "PyTorch",
    ],
  },
  {
    title: "Agentic & Multi-Agent Systems",
    blurb: "Agents that act, call tools, and cooperate.",
    items: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Tool Calling",
      "MCP",
      "A2A",
      "Prompt Engineering",
      "Context Engineering",
    ],
  },
  {
    title: "RAG & Knowledge Systems",
    blurb: "Grounded answers from real documents.",
    items: [
      "FAISS",
      "Qdrant",
      "ChromaDB",
      "Hybrid Search",
      "Reranking",
      "Knowledge Graphs",
      "GraphRAG",
      "BM25",
    ],
  },
  {
    title: "AI Evaluation & Observability",
    blurb: "Systems you can measure, trust, and debug.",
    items: [
      "LLM-as-Judge",
      "Benchmarking",
      "AI Observability",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
    ],
  },
] as const;
