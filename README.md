# maro-portfolio

Personal portfolio of **Marwan Osama Abdelazim** — AI / LLM Engineer.

Live: https://marwantosolve-portfolio.vercel.app

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://www.framer.com/motion/) — page transitions, scroll reveals, the cursor-aware avatar, and animated architecture graphs
- [Lucide](https://lucide.dev) icons
- Live writing via the Substack RSS feed (`marwantosolve.substack.com/feed`), fetched at build time with hourly revalidation

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Content

All professional facts live in `content/projects.ts` and `content/experience.ts`, sourced from the CV and each project's README. Design/product context is documented in [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md). Never add metrics or claims that aren't backed by those sources.

## Deployment

GitHub → Vercel. Every push to `main` deploys automatically.
