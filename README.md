# MiniDev UI

```bash
npm install minidev-ui
```

```tsx
import { Button } from "minidev-ui/ui/button"
```

# MiniDev UI

> Client walkthrough: open `/` then `/showcase`. Free MIT product UI + Premium kinetic launch moments. Hairline · Geist · hue 285 · audit-gated.


Hairline React + Tailwind registry — **free MIT product UI** and **Premium kinetic launch moments**.

Geist Sans · accent hue **285** · audit-gated screenshots + axe.

**457 components** · 398 free · 59 premium

## Quick start

```bash
npm install
npm run dev
```

- Gallery: [http://localhost:3000/gallery](http://localhost:3000/gallery)
- Docs: [http://localhost:3000/docs](http://localhost:3000/docs)
- Playground: [http://localhost:3000/playground](http://localhost:3000/playground)

### Use a component

```tsx
import { Button } from "@/registry/ui/button"
```

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
