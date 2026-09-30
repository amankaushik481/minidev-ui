import type { Guide } from "../types"

const guide: Guide = {
  slug: "nextjs-dark-mode-no-flash",
  title: "Dark mode in Next.js without the flash",
  description:
    "Fix the dark mode flash in Next.js with a blocking head script, suppressHydrationWarning, a Tailwind v4 dark variant, system preference and theme-color.",
  date: "2026-09-30",
  keywords: [
    "next js dark mode",
    "dark mode flash fix",
    "tailwind dark mode toggle",
    "nextjs theme toggle app router",
    "prevent flash of unstyled theme",
  ],
  related: ["theme-picker", "segmented-control"],
  body: [
    {
      type: "p",
      text: "To get dark mode in Next.js without a flash, decide the theme before the browser paints: put a tiny inline script in `<head>` that reads the saved choice (or the system preference) and adds a `dark` class to `<html>`, add `suppressHydrationWarning` to `<html>`, and point Tailwind's `dark` variant at that class. Everything else, the toggle, the system option and the browser `theme-color`, builds on those three pieces. This is the exact setup [ui.minidev.pro](/) runs.",
    },

    { type: "h2", text: "Why the flash happens", id: "why-it-flashes" },
    {
      type: "p",
      text: "A statically rendered or cached page is the same HTML for every visitor. The server cannot read `localStorage` and does not know the visitor's OS setting, so it sends the default (usually light) markup. If you apply the saved theme in a `useEffect` or a context provider, that code runs after hydration, which is after the first paint. The visitor sees light, then dark: a flash of the wrong theme, often loosely called FOUC.",
    },
    {
      type: "p",
      text: "There is a second trap. If you compute the class from React state during render, the server renders one value and the client another, and React reports a hydration mismatch. The fix below keeps the theme out of React's render entirely until after hydration.",
    },

    { type: "h2", text: "Step 1: a blocking script in the head", id: "blocking-script" },
    {
      type: "p",
      text: "An inline, non-module script in `<head>` runs synchronously while the HTML is parsed, before the body renders and before any paint. It is the only place early enough to set the class. Keep it tiny, wrap it in `try` (storage can throw in private modes or when blocked), and never let it depend on your bundle.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/layout.tsx",
      code: "const themeScript = \"(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()\"\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"en\" suppressHydrationWarning>\n      <head>\n        <script dangerouslySetInnerHTML={{ __html: themeScript }} />\n      </head>\n      <body className=\"bg-bg text-fg\">{children}</body>\n    </html>\n  )\n}",
    },
    {
      type: "p",
      text: "The logic: if a choice is stored, use it; otherwise follow `prefers-color-scheme`. MiniDev UI's own layout does the same and, in the same script, restores the `data-material` attribute. Anything that changes the first paint, such as theme, density or material, belongs in this one script.",
    },
    {
      type: "callout",
      tone: "warning",
      text: "If you ship a strict Content Security Policy, inline scripts are blocked unless you allow them with a nonce or a hash. Add the script's SHA-256 hash to `script-src`, or pass the request nonce to the tag.",
    },

    { type: "h2", text: "Step 2: suppressHydrationWarning on html", id: "suppress-hydration-warning" },
    {
      type: "p",
      text: "The script changes the `class` attribute on `<html>` before React hydrates. React then compares the server's attributes with the DOM, sees the extra `dark` class, and warns. `suppressHydrationWarning` on `<html>` silences attribute mismatches on that one element. It is shallow: it does not hide mismatches in children, so it will not mask real bugs elsewhere. Do not spread it around your tree.",
    },
    {
      type: "p",
      text: "If `<html>` has other classes, such as font variables from `next/font`, keep them in the server `className`. The script only adds `dark`; it does not replace the attribute.",
    },

    { type: "h2", text: "Step 3: the Tailwind v4 dark variant and tokens", id: "tailwind-dark-variant" },
    {
      type: "p",
      text: "Tailwind CSS v4's `dark:` variant uses the `prefers-color-scheme` media query by default, which ignores a manual choice. Redefine it to follow the class:",
    },
    {
      type: "code",
      lang: "css",
      filename: "app/globals.css",
      code: '@import "tailwindcss";\n\n@custom-variant dark (&:is(.dark *));',
    },
    {
      type: "p",
      text: "This is the line at the top of MiniDev's `styles.css`. It matches elements inside `.dark`. Tailwind's documentation also shows `(&:where(.dark, .dark *))`, which additionally matches the element that carries the class and adds no specificity; either works when the class sits on `<html>`.",
    },
    {
      type: "p",
      text: "The bigger decision is where dark styles live. Writing `bg-white dark:bg-zinc-900` on every element works, but it doubles every color decision and one missed `dark:` is a bug. MiniDev UI uses semantic tokens instead: `:root` defines the light values, `.dark` redefines the same variables, and components only ever use the token utilities. Dark mode redefines tokens, never components.",
    },
    {
      type: "code",
      lang: "css",
      code: ':root {\n  --bg: oklch(0.985 0.0015 264);\n  --surface: oklch(1 0 0);\n  --fg: oklch(0.185 0.012 268);\n  --fg-muted: oklch(0.45 0.012 266);\n  --border: oklch(0.917 0.004 264);\n  color-scheme: light;\n}\n\n.dark {\n  --bg: oklch(0.145 0.004 270);\n  --surface: oklch(0.172 0.005 270);\n  --fg: oklch(0.965 0.003 270);\n  --fg-muted: oklch(0.73 0.01 270);\n  --border: oklch(0.262 0.006 270);\n  color-scheme: dark;\n}\n\n@theme inline {\n  --color-bg: var(--bg);\n  --color-surface: var(--surface);\n  --color-fg: var(--fg);\n  --color-fg-muted: var(--fg-muted);\n  --color-border: var(--border);\n}',
    },
    {
      type: "p",
      text: "`@theme inline` makes `bg-surface` compile to `background-color: var(--surface)`, so the utility follows whichever value is active. `color-scheme: dark` tells the browser to draw native scrollbars, form controls and the default canvas in dark as well, which removes a second, subtler flash on inputs and scrollbars. The [OKLCH colors guide](/guides/oklch-colors-tailwind-v4) explains why the tokens are written in OKLCH.",
    },

    { type: "h2", text: "Light, dark and system", id: "system-preference" },
    {
      type: "p",
      text: "Offer three modes. Store `\"light\"` or `\"dark\"` when the visitor picks one, and remove the key for system, which makes the head script fall back to `prefers-color-scheme` on the next load.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/theme.ts",
      code: 'export type Mode = "light" | "dark" | "system"\n\nconst media = () => window.matchMedia("(prefers-color-scheme: dark)")\n\nexport function readMode(): Mode {\n  try {\n    const t = localStorage.getItem("theme")\n    return t === "light" || t === "dark" ? t : "system"\n  } catch {\n    return "system"\n  }\n}\n\nexport function applyMode(mode: Mode) {\n  const root = document.documentElement\n  const dark = mode === "dark" || (mode === "system" && media().matches)\n  // Suppress transitions for two frames so every surface swaps at once.\n  root.classList.add("[&_*]:!transition-none")\n  root.classList.toggle("dark", dark)\n  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("[&_*]:!transition-none")))\n  try {\n    if (mode === "system") localStorage.removeItem("theme")\n    else localStorage.setItem("theme", mode)\n  } catch {}\n}',
    },
    {
      type: "p",
      text: "The transition trick matters when components use `transition-colors`. Without it, every surface animates to its new color at its own duration and the swap looks smeared. Adding the arbitrary-variant class `[&_*]:!transition-none` to `<html>` disables transitions on every descendant for two frames. Tailwind generates it because the string appears in a source file it scans.",
    },
    {
      type: "p",
      text: "[ThemePicker](/docs/theme-picker) is a three-option radiogroup for Light, Dark and System. Drive it with the functions above:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/theme-setting.tsx",
      code: '"use client"\nimport * as React from "react"\nimport { ThemePicker } from "@/components/ui/theme-picker"\nimport { applyMode, readMode, type Mode } from "@/lib/theme"\n\nexport function ThemeSetting() {\n  const [mode, setMode] = React.useState<Mode>("system")\n  React.useEffect(() => setMode(readMode()), [])\n  return (\n    <ThemePicker\n      value={mode}\n      onChange={(next) => {\n        setMode(next)\n        applyMode(next)\n      }}\n    />\n  )\n}',
    },
    {
      type: "p",
      text: "The state starts at `\"system\"` and is corrected after mount, so the server and client render the same markup. In system mode the page should also follow the OS when it changes (many people switch automatically at sunset). Mount one listener near the root:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/theme-watcher.tsx",
      code: '"use client"\nimport * as React from "react"\nimport { applyMode, readMode } from "@/lib/theme"\n\nexport function ThemeWatcher() {\n  React.useEffect(() => {\n    const media = window.matchMedia("(prefers-color-scheme: dark)")\n    const onSystem = () => { if (readMode() === "system") applyMode("system") }\n    // Another tab changed the setting.\n    const onStorage = (e: StorageEvent) => { if (e.key === "theme") applyMode(readMode()) }\n    media.addEventListener("change", onSystem)\n    window.addEventListener("storage", onStorage)\n    return () => {\n      media.removeEventListener("change", onSystem)\n      window.removeEventListener("storage", onStorage)\n    }\n  }, [])\n  return null\n}',
    },

    { type: "h2", text: "A toggle that is right on first paint", id: "theme-toggle" },
    {
      type: "p",
      text: "For a two-state button in a header, the MiniDev site uses a `useTheme` hook that treats the `dark` class on `<html>` as the source of truth. It reads the class after mount, subscribes with a `MutationObserver` so every toggle on the page stays in sync (including changes made by the watcher above), and writes through the same persist-and-suppress-transitions path:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/theme-toggle.tsx",
      code: 'export function useTheme() {\n  const [dark, setDark] = React.useState(false)\n  React.useEffect(() => {\n    const el = document.documentElement\n    setDark(el.classList.contains("dark"))\n    const mo = new MutationObserver(() => setDark(el.classList.contains("dark")))\n    mo.observe(el, { attributes: true, attributeFilter: ["class"] })\n    return () => mo.disconnect()\n  }, [])\n  const toggle = () => applyMode(dark ? "light" : "dark")\n  return { dark, toggle }\n}',
    },
    {
      type: "p",
      text: "`dark` is `false` during server render and the first client render, then corrects itself. If the icon depends on that state, a dark-mode visitor sees the sun icon for a frame. Let CSS pick the icon instead, since the class is already correct at first paint:",
    },
    {
      type: "code",
      lang: "tsx",
      code: '<button type="button" onClick={toggle} aria-label="Toggle dark mode" className="grid size-8 place-items-center rounded-lg">\n  <SunIcon className="size-4 dark:hidden" />\n  <MoonIcon className="hidden size-4 dark:block" />\n</button>',
    },
    {
      type: "callout",
      tone: "tip",
      text: "The same applies to logos and screenshots that differ per theme: render both and hide one with `dark:hidden` and `hidden dark:block`, and the right image is visible from the first frame. The rule of thumb: anything visible on first paint that depends on the theme should be decided by CSS (`dark:` or tokens), not by React state. State is fine for things that only appear after interaction, such as the checked option in a settings menu.",
    },

    { type: "h2", text: "Match the browser theme-color", id: "theme-color" },
    {
      type: "p",
      text: "Mobile browsers tint the address bar from `<meta name=\"theme-color\">`. In the App Router you declare it in the `viewport` export, and media queries let it follow the OS:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "app/layout.tsx",
      code: 'import type { Viewport } from "next"\n\nexport const viewport: Viewport = {\n  themeColor: [\n    { media: "(prefers-color-scheme: light)", color: "#fbfbfc" },\n    { media: "(prefers-color-scheme: dark)", color: "#0e0f11" },\n  ],\n}',
    },
    {
      type: "p",
      text: "Use the same values as your `--bg` token. Media queries only know the OS setting, so a visitor who picked dark on a light OS gets a light address bar. Correct it at runtime by setting both tags to the active color whenever the mode is applied, and once on mount in `ThemeWatcher`:",
    },
    {
      type: "code",
      lang: "ts",
      code: 'function syncThemeColor(dark: boolean) {\n  document\n    .querySelectorAll(\'meta[name="theme-color"]\')\n    .forEach((m) => m.setAttribute("content", dark ? "#0e0f11" : "#fbfbfc"))\n}',
    },

    { type: "h2", text: "Other approaches and when to use them", id: "alternatives" },
    {
      type: "list",
      items: [
        "**Cookie instead of localStorage.** Read the theme with `cookies()` in the root layout and render the class on the server. No script and no hydration warning, but reading cookies makes every route dynamic, so you lose static rendering.",
        "**A library.** `next-themes` packages the same blocking-script technique with a provider and a hook. It is a good choice if you want it maintained for you; the mechanics are identical.",
        "**Media query only.** If you never offer a toggle, keep Tailwind's default `dark` variant and skip the script. The browser applies the right theme before paint on its own.",
      ],
    },

    { type: "h2", text: "Checklist", id: "checklist" },
    {
      type: "list",
      ordered: true,
      items: [
        "Inline script in `<head>` adds `dark` from storage or `prefers-color-scheme`, wrapped in `try`.",
        "`suppressHydrationWarning` on `<html>` only.",
        "`@custom-variant dark (&:is(.dark *));` in your CSS.",
        "Colors are tokens redefined under `.dark`, with `color-scheme` set in both.",
        "Toggle persists the choice, removes it for system, and suppresses transitions during the swap.",
        "Theme-dependent icons and images are chosen by CSS, not state.",
        "`theme-color` follows the OS by default and the explicit choice at runtime.",
      ],
    },

    { type: "h2", text: "Components and install", id: "components" },
    {
      type: "p",
      text: "Every MiniDev UI component already ships light and dark through the token set in [styles.css](https://ui.minidev.pro/r/styles.css), so once the class is on `<html>` there is nothing else to wire. For a compact icon-based control, a [SegmentedControl](/docs/segmented-control) with `icon` on each option works as a theme switch too. The [MiniDev studio](https://minidev.pro) builds complete products on this kit when you want the whole thing done for you.",
    },
    { type: "component", name: "theme-picker" },
    { type: "component", name: "segmented-control" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/theme-picker.json",
    },
  ],
  faq: [
    {
      q: "Why does my Next.js site flash white before dark mode loads?",
      a: "The server sends the default theme and your theme code runs after the first paint, usually in a `useEffect`. Set the `dark` class from an inline script in `<head>` so it applies before the page paints.",
    },
    {
      q: "Do I need suppressHydrationWarning for dark mode in Next.js?",
      a: "Yes, on the `<html>` element when a script changes its class before hydration. It only suppresses attribute mismatches on that one element, not in its children.",
    },
    {
      q: "How do I make Tailwind v4 dark mode use a class instead of the media query?",
      a: "Add `@custom-variant dark (&:is(.dark *));` (or `(&:where(.dark, .dark *))`) to your CSS after importing Tailwind. The `dark:` variant then follows the `dark` class on `<html>`.",
    },
    {
      q: "How do I respect the system theme and still let users choose?",
      a: "Store an explicit light or dark choice, and remove it for system. The head script falls back to `prefers-color-scheme` when nothing is stored, and a `matchMedia` change listener keeps system mode live.",
    },
  ],
}

export default guide
