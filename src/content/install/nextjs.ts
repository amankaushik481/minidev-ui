import type { Guide } from "../types"

const guide: Guide = {
  slug: "nextjs",
  title: "Install MiniDev UI in Next.js",
  description:
    "Add MiniDev UI to a Next.js App Router project: Tailwind CSS v4, shadcn init, the tokens stylesheet, registry components, the npm package and dark mode.",
  date: "2026-09-30",
  keywords: [
    "shadcn nextjs",
    "tailwind v4 nextjs components",
    "nextjs app router ui library",
    "react components nextjs tailwind",
    "shadcn registry nextjs",
  ],
  related: ["button", "pricing-plans"],
  body: [
    {
      type: "p",
      text: "To add MiniDev UI to Next.js, start from an App Router project with Tailwind CSS v4, run `npx shadcn@latest init`, import the MiniDev tokens stylesheet after Tailwind, then add components with `npx shadcn@latest add https://ui.minidev.pro/r/button.json`. The files land in your repo as source you own. If you would rather keep them in a dependency, install `minidev-ui-kit` from npm instead.",
    },

    { type: "h2", text: "Step 1: Create a Next.js app", id: "create-the-project" },
    {
      type: "code",
      lang: "bash",
      code: `npx create-next-app@latest my-app --typescript --tailwind --eslint --app
cd my-app`,
    },
    {
      type: "p",
      text: "Keep the default import alias, `@/*`. This guide assumes no `src` directory, so global styles live in `app/globals.css` and components in `components/ui`. If you chose `src`, prefix the paths below with `src/`.",
    },

    { type: "h2", text: "Step 2: Check Tailwind CSS v4", id: "add-tailwind" },
    {
      type: "p",
      text: "The `--tailwind` flag installs Tailwind CSS v4 with its PostCSS plugin. For an existing app without Tailwind, install it and register the plugin yourself:",
    },
    {
      type: "code",
      lang: "bash",
      code: `npm install tailwindcss @tailwindcss/postcss postcss`,
    },
    {
      type: "code",
      lang: "ts",
      filename: "postcss.config.mjs",
      code: `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config`,
    },
    {
      type: "p",
      text: "Tailwind v4 has no `tailwind.config.js` by default. The stylesheet starts with a single `@import \"tailwindcss\";` line and everything else is configured in CSS.",
    },

    { type: "h2", text: "Step 3: Run shadcn init", id: "shadcn-init" },
    {
      type: "p",
      text: "The shadcn CLI reads the path alias from `tsconfig.json` and writes `components.json`, which tells every later `add` where files go. create-next-app already sets the alias:",
    },
    {
      type: "code",
      lang: "json",
      filename: "tsconfig.json",
      code: `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}`,
    },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest init`,
    },
    {
      type: "p",
      text: "Accept the defaults. Init creates `lib/utils.ts` with the `cn` helper, installs `clsx` and `tailwind-merge`, and writes a theme into `app/globals.css`. The next step replaces that theme.",
    },

    { type: "h2", text: "Step 4: Add the MiniDev tokens stylesheet", id: "tokens-stylesheet" },
    {
      type: "p",
      text: "Every MiniDev component reads semantic tokens such as `bg-surface`, `text-fg-muted` and `shadow-raised`. They live in one stylesheet, served at `https://ui.minidev.pro/r/styles.css`. Save a copy next to your global CSS:",
    },
    {
      type: "code",
      lang: "bash",
      code: `curl -o app/minidev.css https://ui.minidev.pro/r/styles.css`,
    },
    {
      type: "p",
      text: "Then reduce `app/globals.css` to imports, with MiniDev after Tailwind:",
    },
    {
      type: "code",
      lang: "css",
      filename: "app/globals.css",
      code: `@import "tailwindcss";
/* keep any other @import lines shadcn init added, such as tw-animate-css */
@import "./minidev.css";`,
    },
    {
      type: "callout",
      tone: "warning",
      text: "Delete the `:root`, `.dark` and `@theme inline` blocks that create-next-app and shadcn init generated, plus the template's `body` rule. They define `--accent`, `--border` and `--ring` with neutral values and, coming later in the file, override MiniDev's tokens: your accent turns gray and the body font falls back to Arial. MiniDev's stylesheet already maps every shadcn variable name, so stock shadcn components keep working.",
    },
    {
      type: "p",
      text: "The stylesheet opens with `@custom-variant dark (&:is(.dark *));`, so `dark:` utilities and the dark token set follow a `dark` class on `<html>`, not the OS setting. Remove the duplicate line init added. Fonts come from `--font-geist-sans` and `--font-geist-mono`, which the default create-next-app layout already sets through `next/font`. Shadows fall from a fixed light; to make them follow the pointer, add `https://ui.minidev.pro/r/light-provider.json` and render `<LightProvider />` once in `app/layout.tsx`.",
    },

    { type: "h2", text: "Step 5: Add components with the shadcn CLI", id: "add-components" },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest add https://ui.minidev.pro/r/button.json`,
    },
    {
      type: "p",
      text: "The CLI writes `components/ui/button.tsx`, installs `@base-ui/react` and `class-variance-authority`, and reuses your `cn` helper. Now add a block:",
    },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest add https://ui.minidev.pro/r/pricing-plans.json`,
    },
    {
      type: "p",
      text: "`pricing-plans` lists `button`, `number-roll` and `segmented-control` as registry dependencies, each as a full MiniDev URL, so the CLI pulls all three from the same registry and installs `lucide-react` and `motion`. When it asks to overwrite `button.tsx`, answer no unless you want a fresh copy.",
    },
    { type: "component", name: "button" },
    { type: "component", name: "pricing-plans" },

    { type: "h2", text: "Step 6: Use it in a page", id: "use-in-a-page" },
    {
      type: "code",
      lang: "tsx",
      filename: "app/page.tsx",
      code: `import { Button } from "@/components/ui/button"
import { PricingPlans } from "@/components/ui/pricing-plans"

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl space-y-10 p-8">
      <Button variant="accent">Start free</Button>
      <PricingPlans />
    </main>
  )
}`,
    },
    {
      type: "p",
      text: "Run `npm run dev`. The page stays a Server Component. Both components begin with `\"use client\"`, so they render on the server and hydrate in the browser.",
    },

    { type: "h2", text: "Alternative: the npm package", id: "npm-package" },
    {
      type: "code",
      lang: "bash",
      code: `npm i minidev-ui-kit @base-ui/react class-variance-authority clsx tailwind-merge lucide-react motion`,
    },
    {
      type: "code",
      lang: "ts",
      filename: "next.config.ts",
      code: `import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["minidev-ui-kit"],
}

export default nextConfig`,
    },
    {
      type: "code",
      lang: "css",
      filename: "app/globals.css",
      code: `@import "tailwindcss";
@import "minidev-ui-kit/styles.css";
@source "../node_modules/minidev-ui-kit";`,
    },
    {
      type: "p",
      text: "The package ships TypeScript source, so Next.js has to compile it: that is what `transpilePackages` does. `@source` makes Tailwind scan the package, which it skips by default because it lives in `node_modules`; the path is relative to the CSS file. Import by path, for example `minidev-ui-kit/ui/button` and `minidev-ui-kit/blocks/pricing-plans`. You do not need shadcn init or `components.json` on this route. `motion` is only needed for animated pieces such as `pricing-plans`.",
    },

    { type: "h2", text: "Dark mode without a flash", id: "dark-mode" },
    {
      type: "p",
      text: "Add the `dark` class to `<html>` before first paint with a small inline script in `<head>`, and put `suppressHydrationWarning` on `<html>` so React accepts the extra class:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/layout.tsx",
      code: `const themeScript = "(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}`,
    },
    {
      type: "p",
      text: "Keep the `next/font` variable classes on `<html>` or `<body>` as the template had them. The full walkthrough, with the toggle, system preference, CSP and `theme-color`, is in [Dark mode in Next.js without the flash](/guides/nextjs-dark-mode-no-flash). `next-themes` also works if you set `attribute=\"class\"`.",
    },

    { type: "h2", text: "Server Component boundaries", id: "server-components" },
    {
      type: "p",
      text: "Interactive MiniDev components are client components. You can render them from a Server Component and pass serializable props: strings, numbers, plain objects, JSX. You cannot pass functions across that boundary, so `onSelect` on `PricingPlans` or an `onClick` on `Button` needs a small client wrapper:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/pricing.tsx",
      code: `"use client"
import { useRouter } from "next/navigation"
import { PricingPlans } from "@/components/ui/pricing-plans"

export function Pricing() {
  const router = useRouter()
  return <PricingPlans onSelect={(plan, period) => router.push(\`/signup?plan=\${plan}&period=\${period}\`)} />
}`,
    },
    {
      type: "p",
      text: "Hooks exported by the kit, such as `useMaterial`, also belong in client components.",
    },

    { type: "h2", text: "Troubleshooting", id: "troubleshooting" },
    {
      type: "list",
      items: [
        "**Components render unstyled.** The tokens stylesheet is missing, or it is imported before `@import \"tailwindcss\";`. Check the order in `app/globals.css`.",
        "**The accent is gray or borders look wrong.** A leftover `:root` block from the template or from init is overriding the tokens. Delete it.",
        "**npm route: some classes are missing.** The `@source` path is wrong for your layout. With a `src` directory it becomes `../../node_modules/minidev-ui-kit`.",
        "**npm route: `Unexpected token` or a module parse error.** `transpilePackages` is missing from `next.config.ts`. Restart the dev server after adding it.",
        "**Event handlers cannot be passed to Client Component props.** You passed a function from a Server Component. Move it into a `\"use client\"` wrapper as shown above.",
      ],
    },
  ],
  faq: [
    {
      q: "Do I need shadcn/ui installed to use MiniDev UI in Next.js?",
      a: "No. The shadcn CLI is only the installer: `init` writes `components.json` and the `cn` helper, and `add` copies MiniDev files. No shadcn package ships to the browser. With the npm package you skip the CLI entirely.",
    },
    {
      q: "Can I mix MiniDev components with stock shadcn/ui components?",
      a: "Yes. MiniDev's stylesheet defines the shadcn variable names (`--background`, `--primary`, `--ring` and the rest) mapped to its own tokens, so shadcn components pick up the same theme.",
    },
    {
      q: "Does it work with the Pages Router?",
      a: "Yes. Import `globals.css` in `pages/_app.tsx`, set the `@/*` alias, and use the components normally. The `\"use client\"` directive is ignored outside the App Router.",
    },
    {
      q: "Does `transpilePackages` work with Turbopack?",
      a: "Yes. It applies to both `next dev` with Turbopack and webpack builds. It is only needed for the npm route; files added by the shadcn CLI are already part of your app.",
    },
  ],
}

export default guide
