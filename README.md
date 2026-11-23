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

## Controlling what shows

One file: [`content/portfolio.config.ts`](./content/portfolio.config.ts).

- **Hero portrait** — `mode: "character"` (default: the interactive cartoon
  that follows the cursor, blinks, and breathes), `"avatar"` (the illustrated
  portrait at `public/avatar.jpg`), `"photo"`, or `"monogram"`. For a photo,
  drop the file at `public/portrait.jpg` (not committed) and flip the mode.
- **Featured projects** — the big cards on the homepage and `/work`: one line
  per project (`{ slug, show }`), `show: false` hides the card, the list order
  is the display order. The write-ups themselves live in `content/projects.ts`.
- **GitHub projects** — the "More from GitHub" section is built live from the
  GitHub API (stars, language, activity, refreshed hourly). Each repo in the
  config has `show: true | false`; the list order is the display order. Add a
  line to feature a new repo, flip a flag to hide one.

## Content

All professional facts live in `content/projects.ts` and `content/experience.ts`, sourced from the CV and each project's README. Design/product context is documented in [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md). Never add metrics or claims that aren't backed by those sources.

## Deployment

GitHub → Vercel. Every push to `main` deploys automatically.
