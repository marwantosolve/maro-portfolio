# PROJECT_CONTEXT.md

Portfolio of **Marwan Osama Abdelazim** — AI / LLM Engineer, AI Researcher.

This document is the single source of context for the design and build of the portfolio site.
It was produced from a full audit of the available material on **2026-09-14**.
The CV (`Marwan_Osama_CV.docx` / `.pdf`) is the source of truth for all factual professional information.

> **Rule for every future step:** never invent achievements, metrics, technologies, responsibilities, publications, or project results. If a fact is not in the CV, a project README, or the Substack, it does not go on the site until Marwan confirms it.

---

## 1. Product Goal

A personal portfolio that positions Marwan as an **AI / LLM Engineer and AI Researcher** who builds production-oriented LLM, agentic, and evaluation systems — not a generalist web developer.

The site must:

- Communicate depth through **technical storytelling** (each project framed as a research/engineering question and its answer).
- Feel like **AI Research Lab × Elite Software Engineering × Modern Product Design**.
- Be memorable through composition, typography, and interaction — not decoration.
- Serve as the canonical professional presence (recruiters, engineers, researchers, collaborators).

## 2. Target Audience

1. **Hiring managers / recruiters** at AI labs, engineering orgs, and research groups — need to grasp positioning and credibility in under 30 seconds.
2. **Engineers and researchers** — will read case studies closely; respect their intelligence.
3. **Collaborators / open-source community** — will look at GitHub links and writing.

## 3. Positioning

One line (from the CV summary, to be refined with Marwan):

> AI-focused Computer Science graduate specializing in LLMs, Agentic AI systems, and Generative AI — taking AI systems from research concepts to production-ready implementations.

Positioning pillars (all CV-backed):

- **LLMs & Model Adaptation** — fine-tuning, LoRA/QLoRA, quantization, evaluation (ForgeLM).
- **Agentic & Multi-Agent Systems** — agent architectures, A2A, MCP, orchestration (Atlas, MASEF).
- **RAG & Knowledge Systems** — end-to-end grounded retrieval pipelines (Handelny).
- **AI Evaluation & Observability** — benchmarking, LLM-as-judge, execution tracing (MASEF, Atlas).

## 4. Content Strategy

### Source of truth
- **CV** (extracted in full; see §12) — professional facts.
- **Project READMEs + docs** (sibling repos, listed in §11) — case-study material.
- **Substack** (`https://marwantosolve.substack.com`) — writing.
- **Reference photos** (§11) — avatar only, never published as-is unless Marwan chooses.

### Projects (all five are real, CV-backed)

| Project | One-line framing (from CV/README, no embellishment) | Case-study depth available |
|---|---|---|
| **MASEF** | Research-oriented framework for evaluating multi-agent AI systems: modular, framework-agnostic evaluation pipelines; multi-layer methodology spanning agent behavior, reasoning artifacts, and system performance; LLM-based judges, semantic similarity, NLI metrics. **Publication in progress.** | Low locally — no repo found; needs Marwan's input + publication status |
| **Atlas** | Diagnostic investigation layer for agentic AI: reconstructs runs into span-level causal execution graphs, attributes cost/failures, localizes root causes deterministically. | High — README, ATLAS.md, implementation plan, docs, tests, examples |
| **Handelny** | Multi-tenant SaaS RAG platform: document ingestion → embeddings → Qdrant index → grounded chat with citations; JWT auth, per-org agents, SSE streaming, Arabic+English embeddings. | High — README, architecture docs, v1 plan, roadmap |
| **ForgeLM** | Reproducible LLM adaptation framework: Full FT vs LoRA vs QLoRA on identical data/seed/eval; quality + VRAM + time + checkpoint size + latency in one comparison table. | High — README, configs, experiments, notebooks |
| **VisionTrack** | Real-time multi-object tracking: YOLO detection + hand-implemented Kalman filter + Hungarian association; IoU-only vs appearance-assisted association, MOTA/IDF1/HOTA + FPS tradeoffs. | High — README, plans, experiments, reports |

**Storytelling pattern for case studies:** each project opens with the *question it answers with data* (this phrasing already exists in the ForgeLM and VisionTrack READMEs and should become the site's signature): context → approach → architecture → results (only real ones) → what's next / status.

### Experience (CV, verbatim facts)
- **Ericsson — AI Research Engineer**, Cairo, Oct 2025 – Present. Ericsson-sponsored graduation project; developing MASEF; designing evaluation protocols, metrics, reproducible experimentation pipelines; collaborating with R&D on AI engineering architectures and research workflows.
- **Codveda — Machine Learning Intern**, Remote, Sep 2025. Predictive modeling with TensorFlow, Keras, Scikit-learn; Pandas/NumPy preprocessing; algorithm application and hyperparameter tuning.
- **Education:** BSc Computer Science, AI Department, Cairo University, Oct 2022 – Jul 2026, GPA 3.3.
- **Publications:** MASEF — Multi-Agent System Evaluation Framework (*in publishing progress*).
- **Hackathons:** Here Technologies Geospatial Data Cairo Hackathon 2025 (geospatial + LiDAR AI); Solship Zewail City Hackathon 2026 (battery performance forecasting / electricity cost optimization).
- **Certifications:** DeepLearning.AI — ML Specialization, Deep Learning Specialization, MLOps (Machine Learning in Production), GenAI with LLMs, Agentic AI; Sprints × Microsoft AI/ML Summer Training; CIB Egypt internship certificate.
- **Languages:** English (advanced), Arabic (native).

### Skills (CV grouping — present as curated capability areas, NOT percentage bars)
- Languages: Python, C/C++, Bash
- AI & LLM Engineering: LLMs, GenAI, Agentic AI, Multi-Agent Systems, RAG, AI Evaluation, Prompt Engineering, Context Engineering, MCP, A2A, PEFT, Tool Calling, Quantization, AI Observability
- Frameworks: LangChain, LangGraph, LlamaIndex, HF Transformers, PyTorch, TensorFlow, Scikit-learn, Pydantic, vLLM, OpenCV, YOLO
- Retrieval & Knowledge: FAISS, ChromaDB, Qdrant, semantic/hybrid search, embeddings, reranking, knowledge graphs, GraphRAG, BM25
- Data: NumPy, Pandas, Matplotlib, Plotly, probability & statistics, linear algebra
- Backend & Systems: FastAPI, Django, DRF, REST, GraphQL, WebSockets, AsyncIO, Redis, SQL, PostgreSQL, Neo4j
- Cloud & DevOps: Docker, Git, GitHub, AWS, Linux, OpenTelemetry, CI/CD, Kubernetes, Prometheus, Grafana
- Software Engineering: DSA, event-driven architecture, microservices, distributed systems, design patterns, system design

## 5. Design Direction

**Feel:** AI research lab × elite software engineering × modern product design. Intentional, premium, technical, minimal, memorable.

**Banned** (hard constraints): purple AI gradients, glowing blobs, floating brains, robot illustrations, generic 3D AI imagery, meaningless particles, excessive glassmorphism, excessive rounded cards, skill percentage bars, fake metrics, fake testimonials, stock photography, excessive animation, template layouts.

**Positive direction:**

- **Editorial/technical composition** — strong typographic hierarchy, generous whitespace, grid discipline; something between a research-lab site and a Swiss-design engineering brand.
- **Typography as identity** — one distinctive display face + one serious technical/mono pairing (mono for data, code, metrics, annotations). Font selection is an explicit design milestone.
- **Restrained color system** — near-monochrome base with a single precise accent; possibly a dark-first "lab" theme. Light/dark theme support.
- **Technical artifacts as design material** — the projects themselves produce beautiful material: execution graphs (Atlas), comparison tables (ForgeLM), pipeline diagrams (Handelny), tracking frames + metric charts (VisionTrack), evaluation matrices (MASEF). Custom SVG/DOM visualizations of *real* architectures are the site's visual signature — this is the "architecture graph motion" direction.
- **Data-honest detail** — every number shown must be real (from READMEs/reports). Mono type, tabular figures, careful units.
- Cards: sharp/minimal radii, borders over shadows, hover states that reveal *information* (metadata, stack, status) rather than effects.

## 6. Animation Philosophy

Strong motion design, applied with intent. Principles:

1. **Motion communicates structure** — page transitions convey hierarchy; scroll reveals pace the narrative; the architecture graphs animate to *explain* data flow.
2. **Intelligent hover** — project cards reveal real metadata and shift composition; no glow/lift-for-its-own-sake.
3. **Cursor-aware where justified** — hero avatar (subtle), architecture graphs (node highlighting), not everywhere.
4. **Micro-interactions** — links, buttons, theme toggle, nav states; 150–300ms, precise easing.
5. **Typographic motion** — staggered headline reveals, section-label treatments.
6. **Subtle parallax** only where it adds depth to a composed scene.
7. **Never blocks** — motion never delays content, hides state, or harms readability/usability.
8. **`prefers-reduced-motion` fully respected** — all non-essential animation disabled; content identical.

Budget: Framer Motion only. No GSAP, no scroll-jacking libraries, no three.js unless the avatar later requires it (decision deferred).

## 7. Avatar Direction (concept only — not implemented yet)

- Custom stylized **3D / sophisticated character**, a "personal digital character" — **not** a Bitmoji, not a caricature, not a generic robot.
- **Reference photos** (local, listed in §11 — never published as-is): young man, dark **short curly hair**, **thin dark-framed glasses**, oval face, medium skin tone, clean-shaven, professional dress. These traits must be recognizable.
- Tone: expressive-adjacent to modern 3D avatar design (e.g., the register of Meta/Snap 3D avatars or premium product characters) but materially restrained to match the site — muted palette, clean materials, no cartoon exaggeration.
- Should read as part of the site's identity system: same accent color, same lighting logic as the design.
- Planned behaviors (later, optional): subtle cursor-tracking of head/eyes, slight reactions to section changes, scroll-linked pose shifts — all small and reduced-motion-aware.
- **Open production question:** real-time 3D (three.js/react-three-fiber) vs. pre-rendered sprite sequence vs. Lottie/SVG rig — decide at avatar milestone based on budget vs. fidelity. No library installed until then.

## 8. Writing / Substack Integration

- Source of truth: **https://marwantosolve.substack.com** — verified live. Profile: "Marwan Osama", bio "LLMs Engineer | Agentic AI Researcher".
- **RSS feed verified:** `https://marwantosolve.substack.com/feed` — valid RSS 2.0, includes `content:encoded` and post cover images (enclosures). Currently 2 posts:
  1. "The Secret Brain of LLMs — Unlocking Fast Token Generation with the KV Cache" (2026-04-04)
  2. "From 'Attention' to 'FlashAttention' — Shattering the Transformer Memory Wall" (2026-04-13)
- **Approach:** fetch the RSS feed at **build time** (ISR / `revalidate`, e.g. hourly) inside a Next.js route; parse title, link, published date, description, cover image; render as native cards in the site's design language. No iframe/embedded widget look. No manual duplication of article content — cards link out to Substack.
- Structure: section intro → featured (latest) article card → 3 article cards → "Read more on Substack" link.
- Graceful fallback: if the feed is unreachable at build, render from a cached/last-known snapshot (or a minimal empty state), never fail the build.

## 9. Deployment & Architecture

- **Pipeline:** GitHub → Next.js (App Router, TypeScript) → Vercel. Every push to `main` deploys; PRs get preview URLs.
- Repo: `https://github.com/marwantosolve/maro-portfolio.git`
- Keep the repo self-contained: no server-side secrets; Substack fetch is public RSS; everything must build cleanly on Vercel with zero config beyond defaults.
- Content lives in-repo as **MDX / structured data** (project case studies, about, experience) so content edits are git commits.

## 10. Technical Constraints

- **Stack (fixed):** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide icons, MDX or structured content files.
- **No unnecessary libraries.** Anything beyond the stack above requires explicit justification.
- Performance: static-first; minimal client JS; hero and above-the-fold must be fast (avatar decision must not regress LCP badly — informs the 3D-vs-prerendered choice).
- Accessibility: semantic HTML, keyboard nav, contrast, `prefers-reduced-motion`.
- SEO: proper metadata, OG images, sitemap.
- WSL2 dev environment — pathing/line-ending care (`core.autocrlf`).

## 11. Repository Audit (2026-09-14) & Source-Material Inventory

**The Portfolio repo is empty** — no git history, no framework, no dependencies, no assets, no config, no content. Only `.claude/settings.local.json`. There is nothing to reuse *inside* the repo and nothing to remove. The site is a greenfield build.

**Source material lives outside the repo (local machine):**

| Material | Location | Status |
|---|---|---|
| CV (source of truth) | `Documents/FILES/CV/Marwan_Osama_CV.pdf` + `.docx` | Extracted; facts in §4 |
| Reference photos | `Pictures/Photos/` — `official.png`, `me_at_ericssion.png`, `semi-formal.jpg`, others | Avatar references only |
| Atlas repo (github.com/marwantosolve/Atlas) | `Documents/PROJECTS/Atlas` | README + ATLAS.md + docs + plan |
| ForgeLM repo (github.com/marwantosolve/ForgeLM) | `Documents/PROJECTS/ForgeLM` | README + configs + experiments |
| Handelny repo (github.com/marwantosolve/Handelny) | `Documents/PROJECTS/Handelny` | README + architecture docs + roadmap |
| VisionTrack repo (github.com/marwantosolve/VisionTrack) | `Documents/PROJECTS/VisionTrack` | README + plans + reports |
| MASEF | **No local repo found** — CV description only; "in publishing progress" | Needs Marwan's input |
| Substack | https://marwantosolve.substack.com (RSS verified) | 2 posts live |

**Not committed to this public repo:** the phone number and any other personal contact details beyond what Marwan approves for the site.

## 12. Proposed Site Architecture

```
maro-portfolio/
├── PROJECT_CONTEXT.md
├── README.md
├── next.config.ts
├── tailwind / tsconfig / postcss configs
├── app/
│   ├── layout.tsx                # fonts, theme, metadata, nav + footer, page transitions
│   ├── page.tsx                  # Home — hero (avatar + positioning), selected work preview,
│   │                             #   capability areas, featured writing, contact CTA
│   ├── work/
│   │   ├── page.tsx              # Selected Work — index of 5 projects
│   │   └── [slug]/page.tsx       # Case study (MDX-driven): question → approach →
│   │                             #   architecture (animated graph) → results → status
│   ├── research/page.tsx         # MASEF publication + research direction
│   ├── writing/page.tsx          # Substack feed (build-time RSS), featured + grid
│   ├── experience/page.tsx       # Ericsson, Codveda, education, hackathons, certifications
│   ├── about/page.tsx            # Narrative bio, skills as curated capability areas
│   └── contact/page.tsx          # Email, GitHub, LinkedIn, Substack
├── content/
│   ├── projects/                 # one MDX/structured file per project (real data only)
│   └── experience/               # structured experience data
├── components/
│   ├── layout/                   # nav, footer, theme toggle, page-transition shell
│   ├── home/                     # hero (avatar mount), selected-work preview, etc.
│   ├── work/                     # project card (intelligent hover), case-study blocks
│   ├── viz/                      # architecture-graph renderer, metric tables/charts
│   ├── writing/                  # substack card
│   └── avatar/                   # (deferred) avatar component
└── lib/
    ├── substack.ts               # RSS fetch + parse + types
    └── content.ts                # project/experience loaders
```

**Sitemap:** Home · Work (index) · Work/`{masef,atlas,handelny,forgelm,visiontrack}` · Research · Writing · Experience · About · Contact.

**Navigation decision to make:** single-page with anchored sections vs. multi-page (architecture above assumes multi-page with strong page transitions — matches the "smooth page transitions" motion goal; Home carries previews of every section).

## 13. Open Questions (for Marwan)

1. **MASEF** — is there a repo/link? What is publishable given "in publishing progress"? Should the case study exist before the paper's status resolves?
2. **Metrics** — which real numbers from ForgeLM/VisionTrack experiments may be shown? (READMEs contain real results; confirm which are final.)
3. **Contact details on the site** — email only, or also phone/socials beyond GitHub/LinkedIn/Substack?
4. **Theme** — dark-first, light-first, or both with toggle?
5. **Avatar production route** — real-time 3D vs. pre-rendered vs. SVG/Lottie (fidelity vs. performance vs. effort).
6. **Single-page vs. multi-page** (see §12).
7. **Photography** — should any real photo appear (e.g., About), or avatar-only?
8. **Research section scope** — MASEF only, or also hackathon/research-adjacent work?
9. **Domain** — custom domain on Vercel (e.g., marwan.dev / marwantosolve.com)?

## 14. Missing Content (blocking items)

- MASEF material (repo, screenshots, evaluation results, publication link when ready).
- Confirmed real metrics/diagrams per project for case-study "results" sections.
- Hero copy (positioning line, CTA wording).
- About narrative (bio beyond the CV summary).
- Final photo selection for avatar reference (several candidates exist; Marwan to confirm which to use).
- Logo/wordmark decision (typographic wordmark is the likely direction).
- OG image assets.
- GitHub repo topics/description setup for the portfolio repo itself.

## 15. Next Implementation Step

**Design foundations sprint (no visual components yet):**
1. Initialize the Next.js + TypeScript + Tailwind project in this repo.
2. Set up design tokens (type scale, spacing, color system incl. dark theme), font selection, base layout shell (nav/footer/grid).
3. Build the content layer: project MDX/structured files seeded with CV-fact-checked data.
4. Then: Home hero composition → then avatar milestone → then case-study system.

---

*Audit and document prepared 2026-09-14. Update this file whenever positioning, content, or direction decisions change.*
