<div align="center">

# MiniDev UI

**500+ free React components, blocks and templates for real product screens.**<br/>
Tailwind CSS v4, Base UI, motion. shadcn-compatible. MIT.

[Website](https://ui.minidev.pro) · [Docs](https://ui.minidev.pro/docs) · [Components](https://ui.minidev.pro/components) · [Blocks](https://ui.minidev.pro/blocks) · [Templates](https://ui.minidev.pro/templates) · [Free tools](https://ui.minidev.pro/tools) · [Guides](https://ui.minidev.pro/guides) · [llms.txt](https://ui.minidev.pro/llms.txt)

[![npm](https://img.shields.io/npm/v/minidev-ui-kit?color=6d5bff&label=minidev-ui-kit)](https://www.npmjs.com/package/minidev-ui-kit)
[![license](https://img.shields.io/badge/license-MIT-111114)](./LICENSE)
[![shadcn](https://img.shields.io/badge/shadcn-compatible-111114)](https://ui.minidev.pro/docs/installation)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/hero-dark.jpg">
  <img alt="MiniDev UI: every UI kit is flat, this one is lit" src=".github/assets/hero-light.jpg" width="100%">
</picture>

</div>

## Why MiniDev UI

Most kits stop at buttons and cards. MiniDev UI covers the screens a product actually lives in after launch: data tables, billing and invoices, settings, dashboards, command palettes, notification centers and AI chat.

- **Product screens, not just primitives.** Multi select, date range picker, stepper, timeline, file tree, kanban, Gantt chart, org chart, QR code, OTP input, signature pad, image cropper, virtual list and hundreds more.
- **Lit, not flat.** One light source crosses the page and every shadow follows it. Switch the whole kit between four materials (hairline, glass, metal, paper) with one attribute.
- **Accessible by default.** Built on [Base UI](https://base-ui.com) for focus, keyboard and ARIA. Every component works with the keyboard and with reduced motion.
- **You own the code.** Each component is one file that lands in your repo. No runtime lock-in.
- **Every page previews live.** All 548 components render with sample data on their docs page, with a typed API reference generated from the source.
- **Ready for AI agents.** [llms.txt](https://ui.minidev.pro/llms.txt) and [llms-full.txt](https://ui.minidev.pro/llms-full.txt) describe every component.

## Install

### One component with the shadcn CLI

```bash
npx shadcn@latest add @minidev/multi-select
```

MiniDev UI is listed in the [shadcn registry directory](https://ui.shadcn.com/docs/directory), so the `@minidev/` form needs no setup. The long form `npx shadcn@latest add https://ui.minidev.pro/r/multi-select.json` also works. The source lands in `components/ui/`. Every component page shows its own command. Framework guides: [Next.js](https://ui.minidev.pro/docs/installation/nextjs), [Vite](https://ui.minidev.pro/docs/installation/vite), [React Router](https://ui.minidev.pro/docs/installation/react-router), [Astro](https://ui.minidev.pro/docs/installation/astro), [TanStack Start](https://ui.minidev.pro/docs/installation/tanstack-start).

### The whole kit from npm

```bash
npm i minidev-ui-kit @base-ui/react class-variance-authority clsx tailwind-merge lucide-react motion
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "minidev-ui-kit/styles.css";
@source "../node_modules/minidev-ui-kit";
```

```tsx
import { Button } from "minidev-ui-kit/ui/button"
import { MultiSelect } from "minidev-ui-kit/ui/multi-select"
```

With Next.js, add `transpilePackages: ["minidev-ui-kit"]` to `next.config`.

## What's inside

| Category | Examples |
|---|---|
| [Forms](https://ui.minidev.pro/components/forms) | multi select, combobox, date range picker, OTP, masked input, floating label input, password strength, signature pad |
| [Data tables](https://ui.minidev.pro/components/data-tables) | sortable data table, row selection, pagination, column filters |
| [Charts](https://ui.minidev.pro/components/charts) | area, bar, line, pie, donut, radial, treemap, sankey, funnel, Gantt, sparklines |
| [Dashboard](https://ui.minidev.pro/components/dashboard) | event calendar, stat cards, activity feed, onboarding checklist |
| [Billing](https://ui.minidev.pro/components/billing) | pricing tables, credit card input, plan cards, invoices, usage meters |
| [Settings](https://ui.minidev.pro/components/settings) | profile, team, API keys, notifications, danger zone |
| [AI chat](https://ui.minidev.pro/components/ai-chat) | chat thread, prompt input, streaming message, model picker |
| [Navigation](https://ui.minidev.pro/components/navigation) | sidebar, command palette, tabs, breadcrumbs, stepper |
| [Feedback](https://ui.minidev.pro/components/feedback) | toast, notification center, empty states, skeletons |
| [Animation](https://ui.minidev.pro/components/animation) | aurora, lamp, globe, meteors, particles, retro grid, tilt card, shine border, terminal, text effects |
| [Media and dev tools](https://ui.minidev.pro/components/media) | image cropper, image gallery, file tree, code block, audio player |
| [Marketing](https://ui.minidev.pro/components/marketing) | heroes, feature grids, bento grid, testimonials, FAQ, CTA |

Plus [20 categories](https://ui.minidev.pro/components), [15 block types](https://ui.minidev.pro/blocks) (hero, pricing, features, testimonials, FAQ, footers, navbars, login, dashboards), [8 full templates](https://ui.minidev.pro/templates) with brand kits, [19 free tools](https://ui.minidev.pro/tools) (shadcn theme generator, SVG to JSX, CSS to Tailwind, JSON to TypeScript, contrast checker, gradients, favicons) and [30+ guides](https://ui.minidev.pro/guides).

## Run the site locally

```bash
npm install
npm run dev          # builds the registry, then starts Next.js on localhost:3000
```

Analytics are off unless you set env vars on your host. See `.env.example`.

```
src/registry/ui         components
src/registry/blocks     full-page compositions
src/registry/premium    motion components (free, like everything else)
src/styles/minidev.css  tokens, light, materials, motion
tools/build-registry.mjs   registry, docs index and llms.txt generator
DESIGN.md, docs/VISION.md  the design rules
```

## Contributing

Bug reports, component requests and pull requests are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

## License

[MIT](./LICENSE). Free for personal and commercial projects, no attribution required.

---

Made by [MiniDev](https://minidev.pro), a studio that builds MVPs, apps and websites with this kit. Need the product, not just the parts? [Talk to us](https://ui.minidev.pro/studio).
