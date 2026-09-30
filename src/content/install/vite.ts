import type { Guide } from "../types"

const guide: Guide = {
  slug: "vite",
  title: "Install MiniDev UI in React with Vite",
  description:
    "Set up MiniDev UI in a React + Vite app: the Tailwind v4 Vite plugin, the @ path alias, shadcn init, the tokens stylesheet, registry components and dark mode.",
  date: "2026-09-30",
  keywords: [
    "shadcn vite",
    "tailwind v4 vite react components",
    "vite react ui library",
    "shadcn vite path alias",
    "react tailwind component library",
  ],
  related: ["button", "pricing-plans"],
  body: [
    {
      type: "p",
      text: "To add MiniDev UI to a React app built with Vite, install Tailwind CSS v4 with the `@tailwindcss/vite` plugin, set the `@/*` path alias in both `tsconfig` files and `vite.config.ts`, run `npx shadcn@latest init`, and import the MiniDev tokens stylesheet after Tailwind. After that, `npx shadcn@latest add https://ui.minidev.pro/r/button.json` copies any component into `src/components/ui`.",
    },

    { type: "h2", text: "Step 1: Create a React app", id: "create-the-project" },
    {
      type: "code",
      lang: "bash",
      code: `npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`,
    },

    { type: "h2", text: "Step 2: Add Tailwind CSS v4", id: "add-tailwind" },
    {
      type: "code",
      lang: "bash",
      code: `npm install tailwindcss @tailwindcss/vite`,
    },
    {
      type: "p",
      text: "Replace everything in `src/index.css` with one line. Tailwind v4 is configured in CSS, so there is no `tailwind.config.js` to create.",
    },
    {
      type: "code",
      lang: "css",
      filename: "src/index.css",
      code: `@import "tailwindcss";`,
    },

    { type: "h2", text: "Step 3: Set up the path alias and run shadcn init", id: "shadcn-init" },
    {
      type: "p",
      text: "The Vite template splits TypeScript config across files, and the shadcn CLI looks for the alias in the root `tsconfig.json`. Add `baseUrl` and `paths` to both `tsconfig.json` and `tsconfig.app.json`:",
    },
    {
      type: "code",
      lang: "json",
      filename: "tsconfig.json",
      code: `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,
    },
    {
      type: "p",
      text: "TypeScript paths only affect type checking. Vite needs the same alias to resolve imports, and it needs the Tailwind plugin:",
    },
    {
      type: "code",
      lang: "bash",
      code: `npm install -D @types/node`,
    },
    {
      type: "code",
      lang: "ts",
      filename: "vite.config.ts",
      code: `import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`,
    },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest init`,
    },
    {
      type: "p",
      text: "Init detects Vite, writes `components.json`, creates `src/lib/utils.ts` with the `cn` helper, and adds a theme to `src/index.css`. The next step replaces that theme.",
    },

    { type: "h2", text: "Step 4: Add the MiniDev tokens stylesheet", id: "tokens-stylesheet" },
    {
      type: "p",
      text: "MiniDev components read semantic tokens like `bg-surface`, `text-fg-muted` and `shadow-raised` from one stylesheet, served at `https://ui.minidev.pro/r/styles.css`. Save it into `src`:",
    },
    {
      type: "code",
      lang: "bash",
      code: `curl -o src/minidev.css https://ui.minidev.pro/r/styles.css`,
    },
    {
      type: "code",
      lang: "css",
      filename: "src/index.css",
      code: `@import "tailwindcss";
/* keep any other @import lines shadcn init added, such as tw-animate-css */
@import "./minidev.css";`,
    },
    {
      type: "callout",
      tone: "warning",
      text: "Delete the `:root`, `.dark` and `@theme inline` blocks that init generated. They set `--accent`, `--border` and `--ring` to neutral values and, coming after the import, override MiniDev's tokens: the accent turns gray. MiniDev's stylesheet already maps every shadcn variable name, so stock shadcn components keep working.",
    },
    {
      type: "p",
      text: "The stylesheet starts with `@custom-variant dark (&:is(.dark *));`, so dark mode follows a `dark` class on `<html>`; delete the duplicate line from init. It sets `font-sans` to `var(--font-geist-sans)`, which only Next.js defines for you. Load Geist and define the variables, or the page falls back to the browser's serif:",
    },
    {
      type: "code",
      lang: "html",
      filename: "index.html",
      code: `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet" />
<style>
  :root {
    --font-geist-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
    --font-geist-mono: "Geist Mono", ui-monospace, monospace;
  }
</style>`,
    },

    {
      type: "p",
      text: "Optional: the stylesheet ships four materials. Hairline is the default; set `data-material=\"glass\"`, `\"metal\"` or `\"paper\"` on the `<html>` tag in `index.html`, or on any element, to restyle the page or one section without touching a component.",
    },

    { type: "h2", text: "Step 5: Add components with the shadcn CLI", id: "add-components" },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest add https://ui.minidev.pro/r/button.json
npx shadcn@latest add https://ui.minidev.pro/r/pricing-plans.json`,
    },
    {
      type: "p",
      text: "The first command writes `src/components/ui/button.tsx` and installs `@base-ui/react` and `class-variance-authority`. The second shows registry dependencies at work: `pricing-plans` depends on `button`, `number-roll` and `segmented-control` by full MiniDev URL, so the CLI fetches all of them and installs `lucide-react` and `motion`. Decline the prompt to overwrite `button.tsx` if you have edited it.",
    },
    { type: "component", name: "button" },
    { type: "component", name: "pricing-plans" },

    { type: "h2", text: "Step 6: Use it in a page", id: "use-in-a-page" },
    {
      type: "code",
      lang: "tsx",
      filename: "src/App.tsx",
      code: `import { Button } from "@/components/ui/button"
import { PricingPlans } from "@/components/ui/pricing-plans"

export default function App() {
  return (
    <main className="mx-auto max-w-5xl space-y-10 p-8">
      <Button variant="accent" onClick={() => alert("Hello")}>
        Start free
      </Button>
      <PricingPlans onSelect={(plan, period) => console.log(plan, period)} />
    </main>
  )
}`,
    },
    {
      type: "p",
      text: "Run `npm run dev`. A Vite SPA renders everything on the client, so there are no server boundaries to think about: pass handlers straight in. For shadows that follow the pointer, add `https://ui.minidev.pro/r/light-provider.json` and render `<LightProvider />` once in `App`.",
    },

    { type: "h2", text: "Alternative: the npm package", id: "npm-package" },
    {
      type: "code",
      lang: "bash",
      code: `npm i minidev-ui-kit @base-ui/react class-variance-authority clsx tailwind-merge lucide-react motion`,
    },
    {
      type: "code",
      lang: "css",
      filename: "src/index.css",
      code: `@import "tailwindcss";
@import "minidev-ui-kit/styles.css";
@source "../node_modules/minidev-ui-kit";`,
    },
    {
      type: "p",
      text: "Import by path: `minidev-ui-kit/ui/button`, `minidev-ui-kit/blocks/pricing-plans`. Vite compiles the package's TypeScript source without extra config. `@source` is required because Tailwind does not scan `node_modules`; the path is relative to the CSS file. You can skip shadcn init on this route, though the font variables above still apply.",
    },

    { type: "h2", text: "Dark mode without a flash", id: "dark-mode" },
    {
      type: "p",
      text: "Set the class in `index.html` before the bundle loads. There is no server render, so no hydration warning to suppress:",
    },
    {
      type: "code",
      lang: "html",
      filename: "index.html",
      code: `<head>
  <script>
    try {
      var t = localStorage.getItem("theme")
      var d = t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches
      if (d) document.documentElement.classList.add("dark")
    } catch (e) {}
  </script>
</head>`,
    },
    {
      type: "p",
      text: "Your toggle then flips `document.documentElement.classList` and writes `theme` to `localStorage`.",
    },

    { type: "h2", text: "Vite specific gotchas", id: "gotchas" },
    {
      type: "list",
      items: [
        "The alias must exist in three places: `tsconfig.json` (for the CLI), `tsconfig.app.json` (for the editor and `tsc`) and `vite.config.ts` (for the bundler). Missing any one gives a different error.",
        "Component files start with `\"use client\"`. In a plain Vite app the directive does nothing. If a build prints that it was ignored, the warning is harmless.",
        "Vite does not ship a font loader. Without `--font-geist-sans` defined, text renders in serif.",
      ],
    },

    { type: "h2", text: "Troubleshooting", id: "troubleshooting" },
    {
      type: "list",
      items: [
        "**`Failed to resolve import \"@/components/ui/button\"`.** The `resolve.alias` entry is missing from `vite.config.ts`.",
        "**shadcn init reports no import alias.** Add `paths` to the root `tsconfig.json`, not only `tsconfig.app.json`.",
        "**Components render unstyled.** `src/index.css` is not imported in `src/main.tsx`, or MiniDev is imported before Tailwind.",
        "**The accent is gray.** A generated `:root` block is overriding the tokens. Delete it.",
      ],
    },
  ],
  faq: [
    {
      q: "Do I need the `@/*` alias if I use the npm package?",
      a: "No. Package imports like `minidev-ui-kit/ui/button` resolve through `node_modules`. The alias is only needed for the shadcn CLI route, where components live in your `src` folder.",
    },
    {
      q: "Does MiniDev UI work with the SWC React plugin?",
      a: "Yes. `@vitejs/plugin-react-swc` works the same way; swap it into the `plugins` array.",
    },
    {
      q: "Can I use MiniDev UI with Tailwind CSS v3 in Vite?",
      a: "No. The stylesheet relies on v4 features such as `@theme`, `@custom-variant` and CSS-first configuration. Upgrade to v4 with the `@tailwindcss/vite` plugin first.",
    },
    {
      q: "Can I use JavaScript instead of TypeScript?",
      a: "Yes. Start from the `react` template instead of `react-ts`. With `\"tsx\": false` in `components.json`, the CLI converts each MiniDev file to `.jsx` as it installs. Put the alias in `jsconfig.json` instead of the `tsconfig` files.",
    },
  ],
}

export default guide
