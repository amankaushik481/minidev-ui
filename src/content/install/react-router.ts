import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-router",
  title: "Install MiniDev UI in React Router (framework mode)",
  description:
    "Install MiniDev UI in a React Router v7 framework mode app: Tailwind v4, the ~ alias, shadcn init, the tokens stylesheet, SSR safe dark mode and npm.",
  date: "2026-09-30",
  keywords: [
    "shadcn react router",
    "react router v7 tailwind v4",
    "react router framework mode components",
    "remix shadcn tailwind v4",
    "react router ui library",
  ],
  related: ["button", "pricing-plans"],
  body: [
    {
      type: "p",
      text: "To add MiniDev UI to React Router in framework mode, create the app with `create-react-router` (it already configures Tailwind CSS v4 and the `~/*` alias), run `npx shadcn@latest init`, and import the MiniDev tokens stylesheet after Tailwind in `app/app.css`. Then add components with `npx shadcn@latest add https://ui.minidev.pro/r/button.json` and import them from `~/components/ui`.",
    },

    { type: "h2", text: "Step 1: Create the app", id: "create-the-project" },
    {
      type: "code",
      lang: "bash",
      code: `npx create-react-router@latest my-app
cd my-app`,
    },
    {
      type: "p",
      text: "The default template is framework mode with server rendering on. Routes live in `app/routes`, the document shell in `app/root.tsx`.",
    },

    { type: "h2", text: "Step 2: Check Tailwind CSS v4", id: "add-tailwind" },
    {
      type: "p",
      text: "The template ships Tailwind v4 through the Vite plugin. If your project predates that, install it and add the plugin before `reactRouter()`:",
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
      code: `import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
})`,
    },
    {
      type: "p",
      text: "`vite-tsconfig-paths` reads the alias from `tsconfig.json`, so there is no separate `resolve.alias` to maintain.",
    },

    { type: "h2", text: "Step 3: Run shadcn init", id: "shadcn-init" },
    {
      type: "p",
      text: "The template maps `~/*` to `./app/*`. The shadcn CLI picks that up, so components land in `app/components/ui` and import as `~/components/ui/button`.",
    },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest init`,
    },
    {
      type: "p",
      text: "Init writes `components.json`, creates `app/lib/utils.ts` with `cn`, installs `clsx` and `tailwind-merge`, and adds a theme to `app/app.css`. You replace that theme next.",
    },

    { type: "h2", text: "Step 4: Add the MiniDev tokens stylesheet", id: "tokens-stylesheet" },
    {
      type: "p",
      text: "MiniDev components read semantic tokens such as `bg-surface`, `text-fg-muted` and `shadow-raised` from one stylesheet, served at `https://ui.minidev.pro/r/styles.css`:",
    },
    {
      type: "code",
      lang: "bash",
      code: `curl -o app/minidev.css https://ui.minidev.pro/r/styles.css`,
    },
    {
      type: "code",
      lang: "css",
      filename: "app/app.css",
      code: `@import "tailwindcss";
/* keep any other @import lines shadcn init added, such as tw-animate-css */
@import "./minidev.css";`,
    },
    {
      type: "callout",
      tone: "warning",
      text: "Delete everything else in `app/app.css`: the template's own `@theme` font and `html, body` background rules, and the `:root`, `.dark` and `@theme inline` blocks from init. Those blocks set `--accent`, `--border` and `--ring` to neutral values and override MiniDev's tokens, so the accent turns gray. MiniDev's stylesheet already maps every shadcn variable name.",
    },
    {
      type: "p",
      text: "The stylesheet begins with `@custom-variant dark (&:is(.dark *));`, so dark mode follows a `dark` class on `<html>`, not the OS; remove the duplicate from init. Fonts read `--font-geist-sans` and `--font-geist-mono`. Swap the template's font link in `app/root.tsx` for Geist and define the variables:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/root.tsx",
      code: `export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap",
  },
]`,
    },
    {
      type: "code",
      lang: "css",
      filename: "app/app.css",
      code: `:root {
  --font-geist-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-geist-mono: "Geist Mono", ui-monospace, monospace;
}`,
    },

    {
      type: "p",
      text: "Optional: the stylesheet ships four materials. Hairline is the default; set `data-material=\"glass\"`, `\"metal\"` or `\"paper\"` on `<html>` in the `Layout` export, or on any element, to restyle the page or one section without touching a component.",
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
      text: "The first command writes `app/components/ui/button.tsx` and installs `@base-ui/react` and `class-variance-authority`. The second resolves registry dependencies: `pricing-plans` lists `button`, `number-roll` and `segmented-control` by full MiniDev URL, so the CLI fetches each and installs `lucide-react` and `motion`. Decline overwriting `button.tsx` if you changed it.",
    },
    { type: "component", name: "button" },
    { type: "component", name: "pricing-plans" },

    { type: "h2", text: "Step 6: Use it in a route", id: "use-in-a-page" },
    {
      type: "code",
      lang: "tsx",
      filename: "app/routes/home.tsx",
      code: `import { useNavigate } from "react-router"
import { Button } from "~/components/ui/button"
import { PricingPlans } from "~/components/ui/pricing-plans"

export default function Home() {
  const navigate = useNavigate()
  return (
    <main className="mx-auto max-w-5xl space-y-10 p-8">
      <Button variant="accent">Start free</Button>
      <PricingPlans onSelect={(plan, period) => navigate(\`/signup?plan=\${plan}&period=\${period}\`)} />
    </main>
  )
}`,
    },
    {
      type: "p",
      text: "Run `npm run dev`. The route renders on the server and hydrates in the browser. Unlike Next.js, route components are ordinary React components, so you can pass handlers directly.",
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
      filename: "app/app.css",
      code: `@import "tailwindcss";
@import "minidev-ui-kit/styles.css";
@source "../node_modules/minidev-ui-kit";`,
    },
    {
      type: "p",
      text: "Import by path, for example `minidev-ui-kit/ui/button`. `@source` is required because Tailwind skips `node_modules`; its path is relative to `app/app.css`. The font setup above still applies.",
    },

    { type: "h2", text: "Dark mode without a flash", id: "dark-mode" },
    {
      type: "p",
      text: "Server rendered HTML does not know the visitor's choice, so set the class with an inline script in the `Layout` export before the body paints, and add `suppressHydrationWarning` to `<html>`:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/root.tsx",
      code: `const themeScript = "(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}`,
    },
    {
      type: "p",
      text: "The same approach, with a toggle and system preference, is covered in depth in [Dark mode in Next.js without the flash](/guides/nextjs-dark-mode-no-flash); the script is identical.",
    },

    { type: "h2", text: "React Router specific gotchas", id: "gotchas" },
    {
      type: "list",
      items: [
        "The alias is `~`, not `@`. Code copied from other MiniDev docs that imports `@/components/ui/...` needs the prefix changed. The CLI rewrites imports inside the files it installs for you.",
        "`\"use client\"` at the top of each component is ignored in the default SSR mode. It only matters if you opt into React Router's React Server Components support.",
        "Mount `<LightProvider />` (from `https://ui.minidev.pro/r/light-provider.json`) inside `Layout` or `App` if you want shadows to follow the pointer. It only touches `document` in an effect, so it is SSR safe.",
      ],
    },

    { type: "h2", text: "Troubleshooting", id: "troubleshooting" },
    {
      type: "list",
      items: [
        "**`Cannot find module \"~/components/ui/button\"`.** `tsconfigPaths()` is missing from `vite.config.ts`, or `components.json` points at a different alias.",
        "**Text renders in a system font or Inter.** The template's `@theme` font rule is still in `app/app.css`, or the Geist variables are not defined.",
        "**npm route: `Unknown file extension \".tsx\"` during SSR.** Add `ssr: { noExternal: [\"minidev-ui-kit\"] }` to `vite.config.ts` so Vite compiles the package instead of handing it to Node.",
        "**Hydration warning on `<html>`.** `suppressHydrationWarning` is missing from the `Layout` export.",
      ],
    },
  ],
  faq: [
    {
      q: "Does this work in React Router declarative or data mode?",
      a: "Yes. Without the framework plugin you have a plain Vite app, so follow the React with Vite install steps and use the `@/*` alias instead of `~/*`.",
    },
    {
      q: "Can I use MiniDev UI with Remix?",
      a: "Remix v2 became React Router v7, and this guide is the upgrade path. On a Remix v2 app that already uses Vite and Tailwind v4, the same steps apply; only the route imports come from `@remix-run/react`.",
    },
    {
      q: "Do MiniDev components need a client-only wrapper?",
      a: "No. They render on the server and hydrate. Browser-only work, such as reading the pointer or `localStorage`, happens inside effects.",
    },
    {
      q: "Where should a theme toggle live?",
      a: "Anywhere below `Layout`. It only needs to flip the `dark` class on `document.documentElement` and write `theme` to `localStorage`, so the inline script picks up the choice on the next request.",
    },
  ],
}

export default guide
