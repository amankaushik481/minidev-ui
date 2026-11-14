import type { Guide } from "../types"

const guide: Guide = {
  slug: "design-tokens-for-ai-agents",
  title: "Design tokens that AI agents can follow (Tailwind v4)",
  description:
    "Design tokens AI coding agents use correctly: semantic names, a small closed set, one set for light and dark, Tailwind v4 classes, motion presets, a lint check.",
  date: "2026-11-14",
  keywords: [
    "design tokens for ai",
    "semantic design tokens tailwind",
    "tailwind v4 design tokens",
    "design system for ai coding agents",
    "consistent ui ai generated code",
  ],
  related: ["button", "card", "stat-card", "badge", "switch"],
  body: [
    {
      type: "tldr",
      items: [
        "**Name tokens by role, not colour:** `bg-surface`, `text-fg-muted`, `border-border`, `bg-accent`. An agent can pick by meaning; it cannot pick between `gray-100` and `gray-50` by meaning.",
        "**Keep the set small and closed:** around twenty colour roles, one shadow scale, one radius scale, named springs. Then ban everything else.",
        "**One token set for light and dark.** If dark mode lives in the variables, the agent never writes a `dark:` class and never forgets one.",
        "**Expose tokens as Tailwind classes, list them in your rules file, and lint for anything outside them.**",
      ],
    },
    {
      type: "p",
      text: "AI agents are good at following a vocabulary and bad at inventing a consistent one. Give an agent the full Tailwind palette and every screen it builds will be slightly different: `gray-50` here, `slate-100` there, a shadow typed by hand. Give it twenty named roles and a rule that nothing else is allowed, and screen ten looks like screen one. This guide shows how to shape [design tokens](/glossary/design-tokens) for that, using the token set MiniDev UI ships as the worked example.",
    },

    { type: "h2", text: "Why agents drift", id: "why" },
    {
      type: "list",
      items: [
        "**Too many valid choices.** Tailwind's default palette has hundreds of colour classes. The model picks whichever it has seen most near similar code.",
        "**Names that describe the value, not the job.** `gray-200` says what it looks like. It does not say whether it is a border, a hover state or a disabled background, so the agent guesses.",
        "**Dark mode as a second set of classes.** Every `bg-white dark:bg-zinc-900` pair is a chance to forget half of it.",
        "**Values the theme cannot reach.** A hex colour or a `shadow-[...]` ignores your theme, so the next theme change leaves it behind.",
      ],
    },

    { type: "h2", text: "Name tokens by role", id: "semantic" },
    {
      type: "p",
      text: "[Semantic tokens](/glossary/semantic-tokens) are named for what they do. Each one answers a question an agent can answer from the markup it is writing: is this the page, a card, a pressed-in well, primary text, secondary text, a hairline, the brand action?",
    },
    {
      type: "table",
      head: ["Role", "MiniDev token class", "Use it for"],
      rows: [
        ["Page", "`bg-bg`", "The app and page background"],
        ["Surface", "`bg-surface`", "Cards, panels, inputs"],
        ["Raised", "`bg-raised`", "Menus, popovers, dialogs"],
        ["Sunken", "`bg-sunken`", "Wells, code, table headers, hover fills"],
        ["Ink", "`bg-ink` + `text-on-ink`", "Primary buttons, strong emphasis"],
        ["Accent", "`bg-accent` + `text-on-accent`, `bg-accent-soft`, `text-accent-fg`", "The brand action, selection, links"],
        ["Text", "`text-fg`, `text-fg-muted`, `text-fg-subtle`", "Primary, secondary and hint text"],
        ["Lines", "`border-border`, `border-border-strong`", "Hairlines and input borders"],
        ["Status", "`success`, `warning`, `danger`, `info`", "State, never decoration"],
      ],
    },
    {
      type: "p",
      text: "That is the whole colour vocabulary. It is small enough to list in a rules file, and each name narrows the choice to one or two candidates. Values are written in [OKLCH](/guides/oklch-colors-tailwind-v4), so lightness steps look even and the dark set is easy to derive.",
    },

    { type: "h2", text: "One set of tokens, light and dark", id: "light-dark" },
    {
      type: "p",
      text: "Define the roles once as CSS variables and redefine them under `.dark`. Components only ever reference the role, so they are correct in both modes without a single `dark:` class. This is a trimmed version of MiniDev's stylesheet:",
    },
    {
      type: "code",
      lang: "css",
      filename: "app/tokens.css",
      code: ":root {\n  --bg: oklch(0.985 0.0015 264);\n  --surface: oklch(1 0 0);\n  --sunken: oklch(0.967 0.0025 264);\n  --border: oklch(0.917 0.004 264);\n  --fg: oklch(0.185 0.012 268);\n  --fg-muted: oklch(0.45 0.012 266);\n  --accent: oklch(0.53 0.215 283);\n  --on-accent: oklch(0.99 0.004 283);\n  --danger: oklch(0.54 0.2 25);\n}\n\n.dark {\n  --bg: oklch(0.145 0.004 270);\n  --surface: oklch(0.172 0.005 270);\n  --sunken: oklch(0.125 0.004 270);\n  --border: oklch(0.262 0.006 270);\n  --fg: oklch(0.965 0.003 270);\n  --fg-muted: oklch(0.73 0.01 270);\n  --accent: oklch(0.7 0.165 285);\n  --on-accent: oklch(0.16 0.02 285);\n  --danger: oklch(0.7 0.17 25);\n}",
    },
    {
      type: "callout",
      tone: "note",
      text: "Notice the dark accent is lighter and its `on-accent` text flips to dark: a role keeps its meaning, not its value. Check each text and surface pair with a [contrast checker](/tools) when you derive your own set.",
    },

    { type: "h2", text: "Turn tokens into Tailwind classes", id: "tailwind" },
    {
      type: "p",
      text: "Tailwind CSS v4 creates utilities from `@theme` variables. Using `@theme inline` makes each class reference the CSS variable directly, so when `.dark` changes `--surface`, `bg-surface` follows. Now the agent writes ordinary Tailwind and the vocabulary is enforced by what classes exist.",
    },
    {
      type: "code",
      lang: "css",
      filename: "app/globals.css",
      code: "@import \"tailwindcss\";\n@import \"./tokens.css\";\n\n@custom-variant dark (&:is(.dark *));\n\n@theme inline {\n  --color-bg: var(--bg);\n  --color-surface: var(--surface);\n  --color-sunken: var(--sunken);\n  --color-border: var(--border);\n  --color-fg: var(--fg);\n  --color-fg-muted: var(--fg-muted);\n  --color-accent: var(--accent);\n  --color-on-accent: var(--on-accent);\n  --color-danger: var(--danger);\n}",
    },
    {
      type: "p",
      text: "If you also use shadcn/ui components, map its variable names onto your roles (`--background: var(--bg)`, `--card: var(--surface)`, `--primary: var(--accent)`, `--muted-foreground: var(--fg-muted)`) so both sets of components read one palette. MiniDev's stylesheet does this, which is why shadcn components dropped into a MiniDev project match.",
    },

    { type: "h2", text: "Depth, shape and space are tokens too", id: "beyond-colour" },
    {
      type: "p",
      text: "Colour is where drift is most visible, but shadows, radius and spacing drift the same way. Close those sets as well:",
    },
    {
      type: "table",
      head: ["Scale", "Allowed", "Rule an agent can follow"],
      rows: [
        ["Shadow", "`shadow-xs`, `shadow-sm`, `shadow-raised`, `shadow-md`, `shadow-lg`, `shadow-overlay`", "Cards `shadow-raised`; menus and dialogs `shadow-overlay`. No `shadow-[...]`"],
        ["Radius", "`rounded-lg`, `rounded-xl`, `rounded-2xl`", "Controls `lg`, cards `xl`, overlays `2xl`. Nested radius = outer minus padding"],
        ["Spacing", "Even steps on a 2px grid", "Paddings, gaps and heights are even numbers"],
        ["Control height", "28, 32, 36, 44, 48px", "Use the component's `size` prop, not a custom `h-`"],
        ["Numbers", "`tabular-nums`", "Every figure in a table, stat or counter"],
      ],
    },
    { type: "example", name: "stat-card", caption: "StatCard uses only surface, border, text and status tokens, so it is correct in light, dark and every material." },

    { type: "h2", text: "Motion presets as named values", id: "motion" },
    {
      type: "p",
      text: "Agents invent durations and easing curves freely, and that is where generated UI feels most off. Give motion the same treatment: a handful of named springs in one file, and a rule that movement uses one of them. MiniDev's five presets:",
    },
    { type: "code", lang: "ts", filename: "lib/motion.ts", code: "import type { Transition } from \"motion/react\"\n\n// The only springs in the product. Agents pick one by name; nobody types a duration.\nexport const SPRING = {\n  snappy: { type: \"spring\", bounce: 0.18, duration: 0.42 }, // toggles, tabs, thumbs\n  morph: { type: \"spring\", bounce: 0.16, duration: 0.5 }, // panels, size and shape changes\n  roll: { type: \"spring\", stiffness: 260, damping: 28, mass: 0.9 }, // numbers\n  release: { type: \"spring\", stiffness: 400, damping: 40 }, // after a drag\n  data: { type: \"spring\", bounce: 0.12, duration: 0.7 }, // chart lines and areas\n} satisfies Record<string, Transition>" },
    {
      type: "p",
      text: "Usage is then a name, plus the reduced-motion rule that makes every animation instant for people who ask for it:",
    },
    { type: "code", lang: "tsx", filename: "components/thumb.tsx", code: "\"use client\"\nimport { motion, useReducedMotion } from \"motion/react\"\nimport { SPRING } from \"@/lib/motion\"\n\nexport function Thumb({ on }: { on: boolean }) {\n  const reduce = useReducedMotion()\n  return (\n    <motion.span\n      data-slot=\"switch-thumb\"\n      className=\"block size-4 rounded-full bg-surface shadow-sm\"\n      animate={{ x: on ? 16 : 0 }}\n      transition={reduce ? { duration: 0 } : SPRING.snappy}\n    />\n  )\n}" },

    { type: "h2", text: "Tell the agent, then check", id: "enforce" },
    {
      type: "p",
      text: "Tokens only help if the agent knows them. List the class names, the scales and the bans in your [AGENTS.md or Cursor rule](/guides/agents-md-cursor-rules-ui), and in your [llms.txt](/guides/llms-txt-for-component-libraries) if you publish a library. Then make a script the judge. This one walks the tracked `.tsx` and `.jsx` files and fails on anything outside the vocabulary:",
    },
    { type: "code", lang: "ts", filename: "scripts/check-tokens.mjs", code: "// Fails when UI code reaches past the tokens. Run it in CI and tell your agent to run it.\n// shortcut: line-based regexes, not a parser; upgrade to an ESLint rule if false positives pile up.\nimport { readFileSync } from \"node:fs\"\nimport { execFileSync } from \"node:child_process\"\n\nconst RULES = [\n  [/(?<![\\w&])#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?\\b/, \"raw hex colour: use a token class\"],\n  [/\\b(?:bg|text|border|ring|fill|stroke|from|to|via)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\\d{2,3}\\b/, \"palette step: use a semantic token\"],\n  [/\\bbg-(?:white|black)\\b/, \"bg-white/bg-black: use bg-surface or bg-ink\"],\n  [/\\bshadow-\\[/, \"hand-written shadow: use the shadow scale\"],\n  [/\\bdark:(?:bg|text|border)-/, \"dark: variant: tokens already switch in dark mode\"],\n]\n\nconst files = execFileSync(\"git\", [\"ls-files\", \"*.tsx\", \"*.jsx\"], { encoding: \"utf8\" }).split(\"\\n\").filter(Boolean)\nlet problems = 0\nfor (const file of files) {\n  readFileSync(file, \"utf8\").split(\"\\n\").forEach((line, i) => {\n    for (const [re, why] of RULES) {\n      if (re.test(line)) {\n        console.log(`${file}:${i + 1}  ${why}`)\n        problems++\n      }\n    }\n  })\n}\nif (problems) {\n  console.log(`\\n${problems} token problem(s)`)\n  process.exit(1)\n}" },
    {
      type: "p",
      text: "Run it in CI and name it in the rules file's \"done means\" list. Expect a few legitimate hits, such as a `theme-color` meta tag or a colour picker, and exclude those files by path rather than loosening the rules.",
    },

    { type: "h2", text: "Common mistakes", id: "mistakes" },
    {
      type: "list",
      items: [
        "**Semantic names that are really colours.** `--purple` or `--brand-blue` is a palette entry with a new name. Name the job: `--accent`.",
        "**Too many roles.** If you have `surface-1` to `surface-6`, the agent is back to guessing. Most products need page, surface, raised and sunken.",
        "**Opacity variants on surfaces.** `bg-surface/80` is a new colour nobody defined, and it breaks themes that change the surface (MiniDev's glass and metal materials, for example).",
        "**Tokens in the CSS but not in the rules.** The agent does not open your stylesheet unless told to. List the classes where it will read them.",
        "**Docs examples that break the rules.** Agents copy examples. Lint the examples with the same script.",
      ],
    },
  ],
  faq: [
    {
      q: "What are semantic design tokens?",
      a: "Named values that describe a role rather than a colour, such as surface, fg-muted or danger. Components reference the role, and the theme decides the value, so light, dark and brand themes change without touching component code.",
    },
    {
      q: "How do I stop AI agents from using random Tailwind colours?",
      a: "Expose a small set of semantic token classes through @theme inline, list them in AGENTS.md or a Cursor rule with the banned patterns, and run a check that fails on hex colours, palette steps such as blue-500, bg-white and dark: variants.",
    },
    {
      q: "Should I use dark: variants with design tokens?",
      a: "Not for colour. Redefine the token variables under .dark and let the classes follow. Components then have no dark: classes to forget, which is the most common dark mode bug in generated code.",
    },
    {
      q: "Do design tokens work with shadcn/ui?",
      a: "Yes. shadcn/ui reads CSS variables such as --background, --card and --primary. Map those to your semantic roles in one place and both shadcn and your own components use the same palette.",
    },
  ],
}

export default guide
