# Contributing to MiniDev UI

Thanks for helping. A few rules keep 548 components feeling like one kit, and keep them readable by the AI agents that install most of them.

## Before you start

- For a new component, open an issue first ("Component request") so we agree on the API and avoid duplicates. Search [llms-full.txt](https://ui.minidev.pro/llms-full.txt) before you ask: it may exist under another name.
- Small fixes (typos, a11y bugs, broken states) can go straight to a pull request.
- Read [DESIGN.md](./DESIGN.md) and [docs/VISION.md](./docs/VISION.md). They are short and they are the law.

## Setup

```bash
npm install
npm run dev          # regenerates the registry, then starts Next.js on localhost:3000
```

Open `http://localhost:3000/docs/<name>` to see your work.

## Add a component in six steps

### 1. Name the signature detail

Five words, before any code: "digits roll, not swap", "button becomes the panel". If you cannot name one, the component is not ready. Put it in the issue.

### 2. Write one file

`src/registry/ui/<name>.tsx` for components, `src/registry/blocks/<name>.tsx` for full sections, `src/registry/premium/<name>.tsx` for motion pieces. The file name is the install name: `npx shadcn@latest add @minidev/<name>`. The shape, for a made-up `limit-gauge` (read `number-roll.tsx`, `morph-panel.tsx` and `segmented-control.tsx` for real ones):

```tsx
"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * LimitGauge - a labelled bar that fills toward a plan limit and warns near it.
 *
 * Use it for seats, API calls or storage against a quota. For a single number
 * with no limit use KpiRow instead.
 *
 * @example
 * <LimitGauge label="API calls" value={8420} max={10000} />
 */

type LimitGaugeProps = {
  /** What is being counted. */
  label: string
  /** Current usage. */
  value: number
  /** The plan limit. */
  max?: number
  className?: string
}

function LimitGauge({ label, value, max = 100, className }: LimitGaugeProps) {
  return <div data-slot="limit-gauge" className={cn("rounded-xl bg-surface shadow-raised", className)}>…</div>
}

export { LimitGauge }
export type { LimitGaugeProps }
```

What the generator and agents rely on:

- The first JSDoc line becomes the summary everywhere (docs, llms.txt, the MCP server). The paragraph after it is "when to use". Name related components in PascalCase there and they get linked both ways.
- Every prop has a one-line JSDoc comment and its default in the destructuring. The docs API table is generated from them.
- Named exports only, PascalCase of the file name, plus the props type. No default exports.
- `data-slot="<name>"` on the root. Thumbs and knobs get `data-slot="<name>-thumb"` so the metal material can machine them (add new slots to the knob list in `src/styles/minidev.css`).
- Import siblings as `@/registry/ui/<other>` and `cn` from `@/lib/utils`. The registry rewrites them for shadcn and npm users.
- Build on Base UI for focus, keyboard, ARIA and positioning. Do not hand-roll focus traps or popovers.

### 3. Follow the material law and the five laws

- Surfaces: only `bg-bg`, `bg-surface`, `bg-raised`, `bg-sunken`, `bg-ink`, `bg-accent`. No hex, no palette steps (`blue-500`), no `bg-white` or `bg-black`, no `bg-surface/80` on cards.
- Depth: only `shadow-xs`, `shadow-sm`, `shadow-raised`, `shadow-key`, `shadow-ink`, `shadow-md`, `shadow-lg`, `shadow-overlay`. No `shadow-[...]` except the 1px inset ring and the 3px focus halo. No `backdrop-blur` on surfaces.
- Geometry: even heights, paddings and gaps on the 2px grid. Radius from the scale. Numbers get `tabular-nums`.
- Motion: springs from the presets in [docs/VISION.md](./docs/VISION.md), never ad-hoc durations for movement. `const reduce = useReducedMotion()` and `transition={reduce ? { duration: 0 } : PRESET}`. No animation on page load in product components. Hover never moves layout, press never scales.

### 4. Add a live example

`src/registry/examples/<name>.tsx` exports `examples: Example[]` (see `accordion.tsx`). Each example has a title, the rendered `node` and the same JSX as a `code` string. Use believable product data (customers, invoices, deploys). Never real company logos, testimonials, awards or customer stats.

### 5. Add the SEO entry

One entry in a `src/content/component-seo/part-*.ts` file: a one-sentence `description`, a `category` id from `src/content/categories.ts`, and three search `keywords`.

### 6. Check it

```bash
npm run registry          # regenerates public/r, llms.txt, llms-full.txt and the docs index
npm run craft -- <name>   # mechanical DESIGN.md rules: hex, palette steps, transition-all, press scale...
npx tsc --noEmit          # no type errors
npx eslint src/registry/ui/<name>.tsx
```

Then the designer test on `/docs/<name>`:

1. Light and dark, and `?material=glass`, `?material=metal`, `?material=paper`. Eight looks, all good.
2. Hold Option (Alt) and hover every part. Token classes are named, nothing is flagged off-grid.
3. Keyboard only, start to finish.
4. Reduced motion on (DevTools, Rendering). Everything still works, instantly.
5. Switch theme in the middle of an interaction. Nothing breaks.

Do not hand-edit generated files: `public/r/**`, `registry.json`, `llms.txt`, `public/llms*.txt`, `public/components.json`, `src/lib/component-index.ts`, `src/lib/component-lite.ts`, `src/lib/registry-loaders.ts`, `src/lib/example-loaders.ts`. `npm run registry` writes them.

## Opening the pull request

Fill in the template: what changed, `npm run registry` and `npx tsc --noEmit` pass, keyboard and reduced motion checked, and screenshots or a short recording in light and dark.

## License

By contributing you agree that your contribution is released under the MIT license.
