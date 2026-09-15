# MiniDev UI

Hairline React + Tailwind registry — **free MIT product UI** and **Premium kinetic launch moments**.

Geist Sans · accent hue **285** · audit-gated screenshots + axe.

Live: [ui.minidev.pro](https://ui.minidev.pro) · npm: [`minidev-ui-kit`](https://www.npmjs.com/package/minidev-ui-kit)

## Install

```bash
npm install minidev-ui-kit
# or
yarn add minidev-ui-kit
```

```tsx
import { Button } from "minidev-ui-kit/ui/button"
import { HeroKineticType } from "minidev-ui-kit/premium/hero-kinetic-type"
```

Your bundler must transpile the package (Next.js: `transpilePackages: ["minidev-ui-kit"]`). Peer deps: React 18+, Tailwind, Base UI, CVA, lucide-react; `motion` and `next` are optional peers for Premium / Link usage.

## Local registry (this repo)

```bash
npm install
npm run dev
```

- Gallery: http://localhost:3000/gallery
- Docs: http://localhost:3000/docs
- Playground: http://localhost:3000/playground
- Showcase: http://localhost:3000/showcase

Copy files from `src/registry/ui`, `src/registry/blocks`, or `src/registry/premium` into your app. Keep `DESIGN.md` open — invent nothing.

## Design law

| Decision | Choice |
|---|---|
| Typeface | Geist Sans / Mono (not Inter) |
| Accent | OKLCH hue **285** |
| Signature | **Hairline** — 1px lines + top highlights |
| Shadows | No blur shadows outside overlays |

Full spec: [`DESIGN.md`](./DESIGN.md)

## Quality gate

```bash
npm run build
npm run audit
```

`npm run audit` screenshots every gallery route (light/dark × desktop/mobile) and fails on axe violations.

## Structure

```
src/registry/ui        Free primitives + product surfaces
src/registry/blocks    Free page compositions
src/registry/premium   Kinetic heroes + page kits
src/app/gallery        Browse by category
src/app/docs           Install + per-component docs
src/app/playground     Curated interactive states
registry.json          Machine-readable registry + tiers
llms.txt               LLM-friendly index
```

## License

Free UI and blocks: **MIT**. Premium blocks are marked `data-tier="premium"` for commercial soft-gating.
