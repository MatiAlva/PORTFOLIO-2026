# Full Stack Developer Portfolio

An interactive, performance-minded portfolio for a full stack developer. A real-time
WebGL hero, scroll-driven storytelling, case-study pages, Spanish / English content and a
downloadable CV per language — built to feel premium on a high-end laptop and still fast and
accessible on a modest phone. Fully static: no backend.

> All personal content is placeholder data. Replace it in `src/data/` (see
> [Personal information](#personal-information)).

## Highlights

- **Topographic core** — a custom GLSL surface (simplex-noise displacement + contour lines +
  fresnel rim) that morphs with the cursor and dollies with scroll, surrounded by orbit rings,
  instanced shards and particles.
- **Scroll storytelling** — a manifesto read word by word at scroll speed, a self-filling
  experience timeline, clip-path cover reveals on case studies.
- **Work index** — editorial rows (no cards) with a floating, velocity-tilted preview that
  follows the cursor and tints the whole section with the project palette.
- **Bilingual** — Spanish by default, English one click away (both flags are always visible in
  the navbar, the active one sits on a sliding pill). The
  choice persists in `localStorage` and updates `<html lang>`.
- **CV download** — navbar, mobile menu and contact section serve the PDF matching the active
  language.
- **Cursor aurora** — on desktop (fine pointer, no reduced motion) the cursor leaves a subtle
  trail of soft colour bands whose intensity follows pointer speed.
- **Theme switch** — dark by default; light mode reveals with a circular View Transition from
  the toggle.
- **Easter egg** — the Konami code cycles the accent colour.
- **Fallbacks everywhere** — no WebGL, low-end GPU, reduced motion, slow JS and lost WebGL
  context all degrade to a designed static state instead of a broken one.

## Stack

| Concern | Choice                                                   |
| ------- | -------------------------------------------------------- |
| Build   | Vite 8, TypeScript (strict, no `any`)                    |
| UI      | React 19, React Router 7, Tailwind CSS 4                 |
| 3D      | Three.js, React Three Fiber, drei (`PerformanceMonitor`) |
| Motion  | Motion (`motion/react`)                                  |
| Quality | ESLint (typescript-eslint strict, react-hooks), Prettier |
| i18n    | Typed dictionaries + React context (no library)          |

## Getting started

Requirements: **Node.js ≥ 20.19** and npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Dev server with HMR                            |
| `npm run build`     | Type-check, then production build into `dist/` |
| `npm run preview`   | Serve the production build locally             |
| `npm run typecheck` | TypeScript only                                |
| `npm run lint`      | ESLint (`lint:fix` to autofix)                 |
| `npm run format`    | Prettier write (`format:check` to verify)      |
| `npm run check`     | Typecheck + lint + format check (use in CI)    |

## Project structure

```
scripts/seo-plugin.ts     Vite plugin: meta tags, per-project HTML, sitemap.xml, robots.txt
public/                   Static files and CVs
src/
  components/
    3d/                   Scene, HeroScene, Core, Particles, FloatingObjects, CameraRig,
                          Lights, shaders/, quality presets, fallback & error boundary
    contact/              Copy-to-clipboard email
    layout/               RootLayout, Preloader, PageTransition, Footer, EasterEgg
    navigation/           Navbar, MobileMenu, Logo, ThemeToggle, LanguageToggle, Flag
    projects/             Work index, rows, floating preview, media, generative covers
    sections/             Hero, Manifesto, Work, Experience, Stack, About, Contact
    ui/                   SplitReveal, MagneticButton, Cursor, CursorAurora, CvButton…
  context/                Experience context (device, theme, accent) and locale context
  data/                   ← all editable content lives here, per language
  i18n/                   Locale config and UI strings (buttons, labels, aria texts)
  hooks/                  Small focused hooks (media queries, visibility, SEO…)
  lib/                    Constants, device detection, boot store, SEO, analytics
  pages/                  HomePage, ProjectPage (lazy), NotFoundPage
  styles/                 index.css (Tailwind theme, light / dark colors, base styles, keyframes)
  types/                  Content types (Project, Experience, Skill, SocialLink…)
```

## Styling and dark mode

Components are styled with Tailwind utility classes. The theme is the `data-theme` attribute on
`<html>` (`dark` by default, persisted in `localStorage`), and colors are semantic tokens defined
in `src/styles/index.css` that switch on their own: `bg-bg`, `bg-bg-elevated`, `text-fg`,
`text-fg-muted`, `text-fg-subtle`, `border-line`, `text-accent`… To change a color, edit its
value in the `@theme` block (dark) or the `[data-theme='light']` block (light). For one-off
differences use the `dark:` and `light:` variants, e.g. `light:mix-blend-multiply`.

## Personal information

Everything visible on the site comes from typed data files — no copy is hard-coded in
components. Language-independent values (name, email, dates, stack, palettes…) are defined
once; translatable text lives in an `es` and an `en` version side by side. TypeScript fails
the build if a translation is missing.

- `src/data/site.ts` — shared `profile` (name, initials, email, location / time zone) plus
  per-language role, tagline (`*word*` renders in the serif accent), bio, facts, principles,
  availability, contact copy, CV file and SEO defaults.
- `src/data/projects.ts` — shared project data plus per-language texts.
- `src/data/experience.ts` — timeline entries.
- `src/data/skills.ts` — toolkit nodes (category, level, years, note).
- `src/data/socials.ts` — social links (used in contact, footer and mobile menu).
- `src/data/navigation.ts` — nav items (each `id` must match a section id).
- `src/i18n/ui.ts` — interface strings (buttons, labels, accessible names).

Also update `index.html` (`<noscript>` fallback), `public/site.webmanifest`, `public/favicon.svg`
and the CVs (below).

### Languages

Spanish is the default (`DEFAULT_LOCALE` in `src/i18n/config.ts`). The language is switched
client-side on the same URL; static HTML, meta tags and the sitemap are generated in the
default language. To add a language, add its code to `LOCALES` / `LOCALE_META`, then add the
matching entry to every `Record<Locale, …>` in `src/data/` and `src/i18n/ui.ts` — the
compiler lists each missing spot.

### CV

The download buttons serve `public/cv/cv-es.pdf` or `public/cv/cv-en.pdf` depending on the
active language (paths and download file names in `site.cv`, `src/data/site.ts`). Replace
both files with your real CVs.

## Adding a project

Add a base object to `src/data/projects.ts` and its translated texts to both the `es` and `en`
lists (the example below shows the merged shape). The route `/projects/<slug>`, its static SEO page,
the sitemap entry and the "next project" link are all derived from it.

```ts
{
  slug: 'my-project',
  title: 'My Project',
  summary: 'One line used in lists and meta descriptions.',
  description: 'A short paragraph for the case-study intro.',
  category: 'Product',
  year: 2026,
  role: 'Full Stack Lead',
  stack: ['React', 'TypeScript'],
  palette: { background: '#101014', foreground: '#f2f2f2', accent: '#ff4f1f' },
  cover: {
    type: 'image',
    src: '/projects/my-project/cover.jpg',
    avif: '/projects/my-project/cover.avif', // optional
    webp: '/projects/my-project/cover.webp', // optional
    width: 1600,
    height: 1000,
    alt: 'Describe what the image shows',
  },
  links: { live: 'https://…', github: 'https://…' },
  caseStudy: { problem, solution, responsibilities, process, gallery, results }, // optional
}
```

Media can be `image`, `video` (`src` + `poster`) or `generative` — procedural SVG artwork
(`terrain`, `orbits`, `interface`, `type`) that costs zero network bytes and works as a
placeholder until real assets exist. Put real files in `public/projects/<slug>/`, ideally
AVIF + WebP + a JPG fallback around 1600px wide.

## Modifying the 3D scene

All WebGL code lives in `src/components/3d/` and is code-split: three.js is never part of the
initial bundle.

- `Scene.tsx` — the `<Canvas>`: frame loop (paused off-screen / hidden tab), adaptive DPR via
  `PerformanceMonitor`, context-loss handling.
- `HeroScene.tsx` — composition and responsive layout (wide / square / portrait).
- `Core.tsx` + `shaders/core.ts` — the morphing surface. The `MORPH` constant controls
  amplitude, frequency and contour density; the fragment shader holds lighting.
- `OrbitRings.tsx`, `FloatingObjects.tsx`, `Particles.tsx`, `WireShell.tsx` — supporting layers
  (shards and particles are instanced / single draw calls).
- `CameraRig.tsx` — pointer parallax and scroll dolly.
- `quality.ts` — per-tier budgets (geometry detail, particle and shard counts, DPR range,
  antialiasing). Tiers come from `src/lib/device.ts`.
- Colours are read from CSS custom properties (`--color-accent`, …), so themes and the
  accent easter egg recolour the scene with no extra code.
- `sceneState.ts` — a mutable bridge (scroll, pointer) read inside `useFrame`, so scroll never
  triggers React renders.

## Environment variables

All optional. Put them in a `.env.local` file if needed. Only `VITE_*` variables reach the
browser — **never put secrets in them**. `.env*` files are git-ignored.

| Variable                  | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `VITE_SITE_URL`           | Absolute URL: canonical, Open Graph, sitemap         |
| `VITE_ANALYTICS_PROVIDER` | `plausible`, `umami` or `ga4` (empty → no analytics) |
| `VITE_ANALYTICS_ID`       | Domain / website id / measurement id                 |
| `VITE_ANALYTICS_SRC`      | Optional self-hosted script URL                      |

Analytics are off by default and loaded on idle only when configured — no cookies or
trackers ship otherwise.

## Deployment

The build is a static SPA plus pre-rendered HTML per project: run `npm run build` and serve
`dist/` from any static host. Set `VITE_SITE_URL` in the host's environment before building.

## Performance & accessibility

- **Code splitting** — three.js / R3F load in a lazy chunk; project pages are a separate route
  chunk.
- **WebGL off the critical path** — the scene chunk downloads and mounts behind the preloader
  once the browser is idle, so it is ready when the hero is revealed; shaders compile in parallel (`compileAsync`) before the first frame and the
  core mesh is welded with a fast integer-key pass. The static fallback covers the gap.
- **Short tasks at startup** — sections below the hero mount one per frame (deep links mount
  everything at once), so there is no single long block.
- **Non-blocking preloader** — waits only for web fonts and always exits after at most 2.6s.
  The 3D scene fades in after the hero intro; the static fallback is reserved for devices
  without WebGL.
- **Adaptive rendering** — device tier (WebGL2 support, software renderer, cores, memory,
  Save-Data) picks a quality preset; `PerformanceMonitor` lowers DPR when frames drop; the
  render loop stops when the hero is off-screen or the tab is hidden.
- **Reduced motion** — respected globally (Motion `reducedMotion="user"`, CSS kill switch);
  the scene renders a single still frame and the custom cursor and aurora are disabled.
- **Touch devices** — no custom cursor, aurora or hover-only UI; project media is shown inline.
- **Accessibility** — semantic landmarks, skip link, visible focus, focus trap in the mobile
  menu, `aria-live` feedback, translated accessible names, split-text animations
  hidden from assistive tech behind plain-text equivalents.
- **SEO** — per-route titles, descriptions, canonical, Open Graph, Twitter cards, JSON-LD,
  `sitemap.xml` and `robots.txt` generated at build time from `src/data`.

## Architecture decisions

- **No GSAP / Lenis.** Motion covers scroll-linked values, springs and layout transitions;
  adding a second animation runtime and scroll hijacking would cost bundle size and native
  scroll feel without visible gains.
- **No post-processing.** Bloom-like rim light and contour lines are computed in the core
  shader itself, which is far cheaper than full-screen passes on mobile GPUs.
- **One WebGL context.** The toolkit visualisation is CSS (transforms only), so the page never
  runs two GPU contexts at once.
- **No backend.** Contact happens through email (copy-to-clipboard / `mailto:`) and socials, so
  the site is purely static — no server, database or authentication to maintain.
- **No i18n library.** Two languages with typed dictionaries don't justify i18next & co.; a
  small context keeps the bundle lean and the compiler guarantees complete translations.
- **No CSS blur on the aurora or hero text.** Soft radial gradients give the glow without
  `filter: blur`, which is expensive to repaint every frame and made the hero name look
  out of focus on phones.
