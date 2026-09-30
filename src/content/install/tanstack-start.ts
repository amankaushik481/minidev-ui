import type { Guide } from "../types"

const guide: Guide = {
  slug: "tanstack-start",
  title: "Install MiniDev UI in TanStack Start",
  description:
    "Install MiniDev UI in TanStack Start: Tailwind v4 via the Vite plugin, shadcn init, the tokens stylesheet linked from the root route, components and dark mode.",
  date: "2026-09-30",
  keywords: [
    "shadcn tanstack start",
    "tanstack start tailwind v4",
    "tanstack start ui components",
    "tanstack router react components",
    "tanstack start dark mode",
  ],
  related: ["button", "pricing-plans"],
  body: [
    {
      type: "p",
      text: "To add MiniDev UI to TanStack Start, create the app with Tailwind CSS v4 and the `@/*` alias, run `npx shadcn@latest init`, and import the MiniDev tokens stylesheet after Tailwind in the CSS file your root route links. Then add components with `npx shadcn@latest add https://ui.minidev.pro/r/button.json` and use them in any route.",
    },

    { type: "h2", text: "Step 1: Create the app", id: "create-the-project" },
    {
      type: "code",
      lang: "bash",
      code: `npx @tanstack/cli@latest create
cd my-app`,
    },
    {
      type: "p",
      text: "Pick Tailwind CSS when the CLI offers add-ons. The generated app has file-based routes in `src/routes` and a root route at `src/routes/__root.tsx`. As a shortcut, `npx shadcn@latest init -t start` scaffolds a Start app with Tailwind, the alias and shadcn already configured, which covers steps 1 to 3.",
    },

    { type: "h2", text: "Step 2: Check Tailwind CSS v4", id: "add-tailwind" },
    {
      type: "p",
      text: "Start runs on Vite, so Tailwind v4 comes in through `@tailwindcss/vite`. If you skipped the add-on:",
    },
    {
      type: "code",
      lang: "bash",
      code: `npm install tailwindcss @tailwindcss/vite`,
    },
    {
      type: "code",
      lang: "ts",
      filename: "vite.config.ts",
      code: `import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tailwindcss(), tsConfigPaths(), tanstackStart()],
})`,
    },
    {
      type: "p",
      text: "Keep whatever other plugins your template has, such as `@vitejs/plugin-react`. Create `src/styles.css` with `@import \"tailwindcss\";` and link it from the root route with a `?url` import:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "src/routes/__root.tsx",
      code: `import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
})`,
    },
    {
      type: "p",
      text: "The `?url` import makes Vite emit the processed CSS as a file and hand you its URL, so the stylesheet is in the server rendered `<head>` and there is no flash of unstyled content.",
    },

    { type: "h2", text: "Step 3: Check the alias and run shadcn init", id: "shadcn-init" },
    {
      type: "p",
      text: "Start templates map `@/*` to `./src/*` in `tsconfig.json`, and `vite-tsconfig-paths` makes Vite honor it. Confirm the `paths` entry, then:",
    },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest init`,
    },
    {
      type: "p",
      text: "Init writes `components.json`, creates `src/lib/utils.ts` with `cn`, and adds a theme to your stylesheet. The next step replaces that theme.",
    },

    { type: "h2", text: "Step 4: Add the MiniDev tokens stylesheet", id: "tokens-stylesheet" },
    {
      type: "p",
      text: "MiniDev components read semantic tokens like `bg-surface`, `text-fg-muted` and `shadow-raised` from one stylesheet, served at `https://ui.minidev.pro/r/styles.css`:",
    },
    {
      type: "code",
      lang: "bash",
      code: `curl -o src/minidev.css https://ui.minidev.pro/r/styles.css`,
    },
    {
      type: "code",
      lang: "css",
      filename: "src/styles.css",
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
      text: "Delete the `:root`, `.dark` and `@theme inline` blocks init generated, and any template styles on `body`. They set `--accent`, `--border` and `--ring` to neutral values and override MiniDev's tokens, so the accent turns gray. MiniDev's stylesheet already maps every shadcn variable name. Keep only the font variables above.",
    },
    {
      type: "p",
      text: "The stylesheet begins with `@custom-variant dark (&:is(.dark *));`, so dark mode follows a `dark` class on `<html>`; remove the duplicate from init. Load Geist by adding a Google Fonts stylesheet (`family=Geist:wght@100..900&family=Geist+Mono:wght@100..900`) to the root route's `links`. Without it, text falls back to serif.",
    },

    {
      type: "p",
      text: "Optional: the stylesheet ships four materials. Hairline is the default; set `data-material=\"glass\"`, `\"metal\"` or `\"paper\"` on `<html>` in `RootDocument`, or on any element, to restyle the page or one section without touching a component.",
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
      text: "The first writes `src/components/ui/button.tsx` and installs `@base-ui/react` and `class-variance-authority`. The second resolves registry dependencies: `pricing-plans` lists `button`, `number-roll` and `segmented-control` by full MiniDev URL, so the CLI fetches each and installs `lucide-react` and `motion`. Decline overwriting `button.tsx` if you edited it.",
    },
    { type: "component", name: "button" },
    { type: "component", name: "pricing-plans" },

    { type: "h2", text: "Step 6: Use it in a route", id: "use-in-a-page" },
    {
      type: "code",
      lang: "tsx",
      filename: "src/routes/index.tsx",
      code: `import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { PricingPlans } from "@/components/ui/pricing-plans"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <main className="mx-auto max-w-5xl space-y-10 p-8">
      <Button variant="accent">Start free</Button>
      <PricingPlans onSelect={(plan, period) => console.log(plan, period)} />
    </main>
  )
}`,
    },
    {
      type: "p",
      text: "Run `npm run dev`. The route renders on the server and hydrates, and handlers pass straight through. Swap the `console.log` for `useNavigate()` once your signup route exists.",
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
      filename: "src/styles.css",
      code: `@import "tailwindcss";
@import "minidev-ui-kit/styles.css";
@source "../node_modules/minidev-ui-kit";`,
    },
    {
      type: "p",
      text: "Import by path, such as `minidev-ui-kit/ui/button`. `@source` is relative to the CSS file; if your stylesheet lives in `src/styles/app.css`, use `../../node_modules/minidev-ui-kit`.",
    },

    { type: "h2", text: "Dark mode without a flash", id: "dark-mode" },
    {
      type: "p",
      text: "Set the class from an inline script in the document shell, ahead of `<HeadContent />`, and allow the attribute mismatch on `<html>`:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "src/routes/__root.tsx",
      code: `const themeScript = "(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()"

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}`,
    },
    {
      type: "p",
      text: "Older templates render the shell from `component` with an `<Outlet />` instead of `shellComponent`; the script goes in the same `<head>`. The reasoning is the same as in [Dark mode in Next.js without the flash](/guides/nextjs-dark-mode-no-flash).",
    },

    { type: "h2", text: "TanStack Start specific gotchas", id: "gotchas" },
    {
      type: "list",
      items: [
        "Import the stylesheet with `?url` and list it in `head().links`. A bare `import \"../styles.css\"` in a Vite based Start app does not put the CSS into the server rendered head.",
        "`\"use client\"` at the top of MiniDev files is ignored. Start renders every route component on the server and hydrates it, so no wrapper is needed.",
        "For shadows that follow the pointer, add `https://ui.minidev.pro/r/light-provider.json` and render `<LightProvider />` once in `RootDocument`. It only touches `document` inside an effect.",
      ],
    },

    { type: "h2", text: "Troubleshooting", id: "troubleshooting" },
    {
      type: "list",
      items: [
        "**Styles appear only after hydration.** The CSS is imported as a side effect instead of through `?url` and `links`.",
        "**`Failed to resolve import \"@/components/ui/button\"`.** `vite-tsconfig-paths` is missing from `vite.config.ts`, or `paths` is not set.",
        "**The accent is gray.** A generated `:root` block is overriding the tokens. Delete it.",
        "**npm route: `Unknown file extension \".tsx\"` during SSR.** Add `ssr: { noExternal: [\"minidev-ui-kit\"] }` to `vite.config.ts`.",
      ],
    },
  ],
  faq: [
    {
      q: "Does MiniDev UI work with TanStack Router without Start?",
      a: "Yes. A client-only TanStack Router app is a plain Vite React app: follow the React with Vite steps, then import components inside your route components.",
    },
    {
      q: "Can I turn off SSR for a route that uses MiniDev components?",
      a: "You can, with Start's per-route `ssr` option, but you should not need to. MiniDev components render on the server and do browser work in effects.",
    },
    {
      q: "Why is the stylesheet linked instead of imported?",
      a: "Start renders the document on the server. Linking the `?url` asset from the root route's `head` puts the CSS in the initial HTML, so the page paints styled.",
    },
    {
      q: "Should I use the shadcn preset flow instead?",
      a: "It works. `npx shadcn@latest init -t start` or a preset from shadcn/create scaffolds the app, Tailwind and the alias. Afterwards, continue from step 4 here to swap in the MiniDev tokens.",
    },
  ],
}

export default guide
