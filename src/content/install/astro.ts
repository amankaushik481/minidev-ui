import type { Guide } from "../types"

const guide: Guide = {
  slug: "astro",
  title: "Install MiniDev UI in Astro (React islands)",
  description:
    "Use MiniDev UI in Astro as React islands: the React integration, Tailwind v4, shadcn init, the tokens stylesheet, client directives and dark mode with no flash.",
  date: "2026-09-30",
  keywords: [
    "shadcn astro",
    "astro react components tailwind v4",
    "astro react islands ui library",
    "astro client load react component",
    "tailwind v4 astro",
  ],
  related: ["button", "pricing-plans"],
  body: [
    {
      type: "p",
      text: "To add MiniDev UI to Astro, enable the React integration and Tailwind CSS v4, set the `@/*` alias, run `npx shadcn@latest init`, and import the MiniDev tokens stylesheet after Tailwind in your global CSS. Components then render as React islands: static HTML by default, and interactive once you add a client directive such as `client:load`.",
    },

    { type: "h2", text: "Step 1: Create the project", id: "create-the-project" },
    {
      type: "code",
      lang: "bash",
      code: `npm create astro@latest my-app -- --template with-tailwindcss --install --add react --git
cd my-app`,
    },
    {
      type: "p",
      text: "This starts from Astro's Tailwind template and adds `@astrojs/react`. In an existing project, run `npx astro add react` instead.",
    },

    { type: "h2", text: "Step 2: Check Tailwind CSS v4", id: "add-tailwind" },
    {
      type: "p",
      text: "Astro uses Tailwind v4 through the Vite plugin. The template already has it. To add it by hand:",
    },
    {
      type: "code",
      lang: "bash",
      code: `npm install tailwindcss @tailwindcss/vite`,
    },
    {
      type: "code",
      lang: "ts",
      filename: "astro.config.mjs",
      code: `import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
})`,
    },
    {
      type: "p",
      text: "Global styles live in `src/styles/global.css`, starting with `@import \"tailwindcss\";`, and are imported by your layout.",
    },

    { type: "h2", text: "Step 3: Set the alias and run shadcn init", id: "shadcn-init" },
    {
      type: "code",
      lang: "json",
      filename: "tsconfig.json",
      code: `{
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
      text: "Keep the `extends`, `include` and `exclude` keys Astro generated; add only `compilerOptions`. Astro's Vite setup reads these paths, so no separate alias config is needed.",
    },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest init`,
    },
    {
      type: "p",
      text: "Init writes `components.json`, creates `src/lib/utils.ts` with `cn`, and adds a theme to `src/styles/global.css`, which the next step replaces.",
    },

    { type: "h2", text: "Step 4: Add the MiniDev tokens stylesheet", id: "tokens-stylesheet" },
    {
      type: "p",
      text: "MiniDev components read semantic tokens like `bg-surface` and `shadow-raised` from one stylesheet, served at `https://ui.minidev.pro/r/styles.css`:",
    },
    {
      type: "code",
      lang: "bash",
      code: `curl -o src/styles/minidev.css https://ui.minidev.pro/r/styles.css`,
    },
    {
      type: "code",
      lang: "css",
      filename: "src/styles/global.css",
      code: `@import "tailwindcss";
/* keep any other @import lines shadcn init added, such as tw-animate-css */
@import "./minidev.css";

:root {
  --font-geist-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-geist-mono: "Geist Mono", ui-monospace, monospace;
}`,
    },
    {
      type: "callout",
      tone: "warning",
      text: "Delete the `:root`, `.dark` and `@theme inline` blocks init generated. They set `--accent`, `--border` and `--ring` to neutral values and override MiniDev's tokens, so the accent turns gray. MiniDev's stylesheet already maps every shadcn variable name. Keep only the font variables shown above.",
    },
    {
      type: "p",
      text: "The stylesheet begins with `@custom-variant dark (&:is(.dark *));`, so dark mode follows a `dark` class on `<html>`; remove the duplicate from init. The font variables need Geist itself, so load it in the layout `<head>`, for example from Google Fonts with `family=Geist:wght@100..900&family=Geist+Mono:wght@100..900`. Without them text falls back to serif.",
    },

    {
      type: "p",
      text: "Optional: the stylesheet ships four materials. Hairline is the default; set `data-material=\"glass\"`, `\"metal\"` or `\"paper\"` on `<html>` in your layout, or on any element, to restyle the page or one section without touching a component. This works in static `.astro` markup too.",
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
      text: "The first writes `src/components/ui/button.tsx` and installs `@base-ui/react` and `class-variance-authority`. The second resolves registry dependencies: `pricing-plans` lists `button`, `number-roll` and `segmented-control` by full MiniDev URL, so the CLI fetches each and installs `lucide-react` and `motion`.",
    },
    { type: "component", name: "button" },
    { type: "component", name: "pricing-plans" },

    { type: "h2", text: "Step 6: Use it in a page", id: "use-in-a-page" },
    {
      type: "code",
      lang: "html",
      filename: "src/pages/index.astro",
      code: `---
import "@/styles/global.css"
import { Button } from "@/components/ui/button"
import { PricingPlans } from "@/components/ui/pricing-plans"
---

<main class="mx-auto max-w-5xl space-y-10 p-8">
  <form method="post" action="/api/waitlist">
    <Button type="submit" variant="accent">Join the waitlist</Button>
  </form>
  <PricingPlans client:load />
</main>`,
    },
    {
      type: "p",
      text: "`Button` here has no directive, so Astro renders it to HTML and ships no JavaScript for it. That is fine for a submit button in a plain form. `PricingPlans` keeps the billing period in React state, so it needs `client:load` (or `client:visible` to hydrate when it scrolls into view). Without a directive the toggle renders but does nothing.",
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
      filename: "src/styles/global.css",
      code: `@import "tailwindcss";
@import "minidev-ui-kit/styles.css";
@source "../../node_modules/minidev-ui-kit";`,
    },
    {
      type: "p",
      text: "Import by path, such as `minidev-ui-kit/ui/button`. `@source` is relative to the CSS file, hence two levels up from `src/styles`. The font variables still apply.",
    },

    { type: "h2", text: "Dark mode without a flash", id: "dark-mode" },
    {
      type: "p",
      text: "Put an inline script in the layout `<head>`. `is:inline` stops Astro from bundling it, so it runs before first paint:",
    },
    {
      type: "code",
      lang: "html",
      filename: "src/layouts/main.astro",
      code: `<head>
  <script is:inline>
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
      text: "With view transitions (`<ClientRouter />`), `<html>` attributes are replaced on navigation. Run the same logic again in a `document.addEventListener(\"astro:after-swap\", ...)` listener.",
    },

    { type: "h2", text: "Astro specific gotchas", id: "gotchas" },
    {
      type: "list",
      items: [
        "**Interactive components need a client directive.** Menus, dialogs, tabs, toggles and anything with state or handlers must be hydrated with `client:load`, `client:idle` or `client:visible`.",
        "**Props must be serializable.** You cannot pass a function such as `onSelect` from an `.astro` file. Write a small `.tsx` wrapper that defines the handler, and hydrate the wrapper.",
        "**Each island is its own React root.** Context does not cross islands, so compose multi-part components (a dialog and its trigger, a form and its fields) inside one `.tsx` file.",
        "**Use `className` on React components.** `class` works on HTML in `.astro` markup; MiniDev components expect `className`.",
        "**Light provider.** For shadows that follow the pointer, add `https://ui.minidev.pro/r/light-provider.json` and render `<LightProvider client:idle />` once in the layout. It renders nothing and writes CSS variables to `<html>`.",
      ],
    },

    { type: "h2", text: "Troubleshooting", id: "troubleshooting" },
    {
      type: "list",
      items: [
        "**Components render unstyled.** The page or layout does not import `global.css`, or MiniDev is imported before Tailwind.",
        "**A toggle or menu does not respond.** It is missing a client directive.",
        "**`Invalid hook call` or a blank island.** `@astrojs/react` is not in `integrations`.",
        "**npm route: `Unknown file extension \".tsx\"` during build.** Add `vite: { ssr: { noExternal: [\"minidev-ui-kit\"] } }` to `astro.config.mjs`.",
      ],
    },
  ],
  faq: [
    {
      q: "Do MiniDev components ship JavaScript in Astro?",
      a: "Only when you hydrate them. Without a client directive a component is rendered to static HTML at build or request time, and its styles still apply.",
    },
    {
      q: "Which client directive should I use?",
      a: "`client:load` for anything visible and interactive on arrival, `client:visible` for below-the-fold blocks such as pricing, and `client:idle` for background pieces like the light provider.",
    },
    {
      q: "Can I use MiniDev UI with other frameworks in the same Astro site?",
      a: "Yes. MiniDev components are React, but the tokens stylesheet is plain CSS, so Svelte or Vue islands and `.astro` markup can use the same utilities such as `bg-surface` and `text-fg-muted`.",
    },
    {
      q: "Does this work with static output?",
      a: "Yes. With the default static build, islands hydrate from prerendered HTML and the inline dark mode script runs in the browser as usual. Server output and adapters need no extra MiniDev setup.",
    },
  ],
}

export default guide
