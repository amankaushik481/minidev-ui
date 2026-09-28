# MiniDev UI

Free React + Tailwind v4 components for the screens people actually live in: tables, billing, settings, dashboards and AI chat. Drawn to a hairline standard, built on Base UI, MIT forever.

**[ui.minidev.pro](https://ui.minidev.pro)** · [Docs](https://ui.minidev.pro/docs) · [Components](https://ui.minidev.pro/gallery) · [Theme playground](https://ui.minidev.pro/playground) · [llms.txt](https://ui.minidev.pro/llms.txt)

## Use it

```bash
# one component, via the shadcn CLI
npx shadcn@latest add https://ui.minidev.pro/r/button.json

# or the whole kit
npm i minidev-ui-kit
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "minidev-ui-kit/styles.css";
@source "../node_modules/minidev-ui-kit";
```

```tsx
import { Button } from "minidev-ui-kit/ui/button"
```

## Develop

```bash
npm install
npm run dev        # generates the registry, then starts Next.js
```

| Route | What |
|---|---|
| `/` | Landing |
| `/gallery` | Every component, by category, with live thumbnails |
| `/docs`, `/docs/[name]` | Guides, live preview, source, install |
| `/playground` | Theme builder that exports CSS variables |
| `/showcase` | Lumen, a whole app built only from the kit |

## Structure

```
src/styles/minidev.css      tokens, depth, motion, Hairline utilities (the design system)
src/registry/ui             components
src/registry/blocks         full-page compositions
src/registry/premium        motion pieces (free, like everything else)
tools/build-registry.mjs    registry + docs index + llms.txt generator
DESIGN.md                   the rules
```

## License

MIT. Built by [MiniDev](https://minidev.pro), a studio that ships MVPs in 30 days with this kit.
