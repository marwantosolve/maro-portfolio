/*
  ─────────────────────────────────────────────────────────────────
  PORTFOLIO CONFIG — the one file you edit to control the site
  ─────────────────────────────────────────────────────────────────

  1) PORTRAIT (hero image)
     - mode "character": the interactive cartoon (follows the cursor,
       blinks, breathes; completely still under reduced motion)
     - mode "avatar":   the illustrated portrait at public/avatar.jpg
     - mode "photo":    your real photo at public/portrait.jpg
     (not committed for privacy — drop the file in yourself to use it)
     - mode "monogram": a clean "MO" monogram block (no image)
     To change the picture, replace the file in public/ (keep the
     name) and commit. To change the mode, edit one line below.

  2) FEATURED PROJECTS (the big cards on the homepage and /work)
     - One line per project, in the order you want them shown.
     - show: false hides the card everywhere; the project's
       /work/<slug> page stays reachable by direct link.
     - The full write-up of each project lives in content/projects.ts.
       Featuring a NEW project = add its content there, then one line here.

  3) GITHUB PROJECTS ("More from GitHub" section on /work)
     The section is built LIVE from your public GitHub repos.
     Nothing appears unless you allow it here:
     - Each repo below has  show: true | false.
       Flip the flag, commit, push — the site updates itself.
     - The order of this list is the order on the site.
     - New repo on GitHub? Add one line here to feature it.
     - Set showUnlisted to true if you ever want every public
       repo to appear automatically (not recommended — curating
       looks better).

  Everything here is safe to change: no facts, no design code.
  ─────────────────────────────────────────────────────────────────
*/

export const portfolioConfig = {
  portrait: {
    mode: "character" as "character" | "avatar" | "photo" | "monogram",
    avatarSrc: "/avatar.jpg",
    photoSrc: "/portrait.jpg",
    alt: "Portrait of Marwan Osama",
  },

  projects: [
    { slug: "masef", show: true },
    { slug: "atlas", show: true },
    { slug: "handelny", show: true },
    { slug: "forgelm", show: true },
    { slug: "visiontrack", show: true },
  ],

  github: {
    username: "marwantosolve",

    // show/hide each repo in the "More from GitHub" section
    repos: [
      { name: "ArchForge", show: true },
      { name: "MDPDF", show: true },
      { name: "maro-terminal", show: true },
      { name: "comp-video", show: true },
      { name: "MARONEX", show: true },
      { name: "TensorTonic-Solutions", show: false },
      { name: "E-Puck-Robot-Webots", show: false },
      { name: "Tetris-Genetic-Algorithm-Agent", show: false },
      { name: "TSP-Ant-Colony-Optimization-Agent", show: false },
      { name: "Games-Hub", show: false },
      { name: "Database-Project", show: false },
    ],

    // true = also list every other public repo automatically
    showUnlisted: false,
  },
} as const;
