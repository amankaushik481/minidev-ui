# Contributing to MiniDev UI

Thanks for helping. A few rules keep 500+ components feeling like one kit.

## Before you start

- For a new component, open an issue first ("Component request") so we can agree on the API and avoid duplicates.
- Small fixes (typos, a11y bugs, broken states) can go straight to a pull request.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000/docs/<component-name> to see your work.

## Rules for components

Read [DESIGN.md](./DESIGN.md) and [docs/VISION.md](./docs/VISION.md). The short version:

1. One file in `src/registry/ui` (primitives), `src/registry/blocks` (compositions) or `src/registry/premium` (motion).
2. Semantic tokens only (`bg-surface`, `text-fg-muted`, `shadow-raised`). No hex values, no `bg-white`.
3. Base UI for focus, keyboard and ARIA. Do not hand-roll focus traps or popover positioning.
4. Springs from the presets in docs/VISION.md, and everything instant with reduced motion.
5. Works with keyboard only, in light and dark, and in the glass, metal and paper materials.
6. Typed props with defaults in the destructuring. The API table on the docs page is generated from them.

## Before you open a pull request

```bash
npm run registry     # regenerates the registry and docs index
npx tsc --noEmit     # no type errors
```

In the pull request, include a short screen recording or screenshots in light and dark.

## License

By contributing you agree that your contribution is released under the MIT license.
