import type { Guide } from "../types"

const guide: Guide = {
  slug: "agents-md-cursor-rules-ui",
  title: "AGENTS.md and Cursor rules for consistent UI generation",
  description:
    "Write AGENTS.md, CLAUDE.md and Cursor rules that make AI agents build UI the same way every time: what to include, a template, and checks that enforce it.",
  date: "2026-11-14",
  keywords: [
    "agents.md",
    "agents.md example",
    "cursor rules for react",
    "cursor rules mdc",
    "claude.md ui rules",
    "ai coding rules design system",
  ],
  related: ["button", "icon-button", "form-field", "dialog", "card"],
  body: [
    {
      type: "tldr",
      items: [
        "**Write one AGENTS.md** at the repo root with a UI section, and point the other tools at it: `@AGENTS.md` in CLAUDE.md, a short Cursor rule scoped to `.tsx` files.",
        "**Rules that work are checkable:** name the import path, the primary button, the token classes and the things never to write. \"Make it look nice\" does nothing.",
        "**Tell the agent to look things up** (llms.txt, MCP, the component file) before it writes, and to use only documented props.",
        "**Back every rule with a command** the agent runs before it finishes: `tsc`, `eslint` and a token check.",
      ],
    },
    {
      type: "p",
      text: "Ask three agents for a settings page and you get three design systems: different greys, a shadow nobody approved, a modal without a title. The fix is not a longer prompt each time. It is a short file the agent reads on every task that says how UI is built in this repo. This guide covers which file each agent reads, what a UI section should say, a template you can copy, and how to check that the agent followed it.",
    },

    { type: "h2", text: "Which file each agent reads", id: "which-file" },
    {
      type: "p",
      text: "[AGENTS.md](https://agents.md) is an open format, \"a README for agents\", now stewarded by the Agentic AI Foundation under the Linux Foundation. Its site lists support in Codex, Cursor, GitHub Copilot's coding agent, Windsurf, Gemini CLI, Zed, Jules, Aider, Devin, Junie, Amp and others. A few tools have their own file as well:",
    },
    {
      type: "table",
      head: ["Agent", "Reads", "Tip"],
      rows: [
        ["Claude Code", "`CLAUDE.md` (root and subfolders)", "Put a line `@AGENTS.md` in CLAUDE.md to import it"],
        ["Cursor", "`.cursor/rules/*.mdc` and `AGENTS.md`", "Scope UI rules to `**/*.tsx` with `globs`"],
        ["Codex", "`AGENTS.md`", "Nearest file to the edited code wins"],
        ["GitHub Copilot", "`.github/copilot-instructions.md`; the coding agent also reads `AGENTS.md`", "Keep one source and copy, or point to it"],
        ["Windsurf, Gemini CLI, Zed, Aider and more", "`AGENTS.md`", "Listed on agents.md"],
      ],
    },
    {
      type: "p",
      text: "So the plan is: AGENTS.md is the source of truth, CLAUDE.md imports it, and a small Cursor rule attaches the UI part when Cursor edits components. This site's own repo does exactly that: its CLAUDE.md is the single line `@AGENTS.md`.",
    },
    {
      type: "code",
      lang: "bash",
      filename: "CLAUDE.md",
      code: "@AGENTS.md",
    },

    { type: "h2", text: "What the UI section should say", id: "contents" },
    {
      type: "list",
      ordered: true,
      items: [
        "**Stack and import paths.** \"React 19, Tailwind CSS v4, components in `components/ui`, imported as `@/components/ui/<name>`.\" Agents guess paths otherwise.",
        "**Look it up first.** Where the component index lives (llms.txt, an MCP server, the folder) and the rule \"use only props the docs or source show\".",
        "**Which component for which job.** The primary button, the destructive confirmation, the form field wrapper, the empty state. These are the choices agents make differently every time.",
        "**The token vocabulary.** The exact class names for surfaces, text, borders, status colours, shadows and radius, and the ones that are banned.",
        "**Layout and type.** Spacing grid, container widths, heading tracking, `tabular-nums` for numbers.",
        "**Motion.** The allowed springs or durations and the reduced-motion rule, or \"no animation\" if that is your choice.",
        "**Accessibility.** Labels on fields, `aria-label` on icon-only buttons, titles on dialogs, focus rings kept.",
        "**How to verify.** The commands to run before saying done.",
      ],
    },

    { type: "h2", text: "A template you can copy", id: "template" },
    {
      type: "p",
      text: "This is written for a project on MiniDev UI, so every class and component in it is real. For another library, keep the headings and swap the names; the structure is what does the work.",
    },
    {
      type: "code",
      lang: "bash",
      filename: "AGENTS.md",
      code: "## UI\n\nStack: Next.js App Router, React 19, Tailwind CSS v4, MiniDev UI on Base UI.\nComponents live in `components/ui/<name>.tsx`; import `{ Name } from \"@/components/ui/<name>\"` (named exports, PascalCase).\n\n### Look it up before you write it\n- Find components in https://ui.minidev.pro/llms.txt or the `minidev-ui` MCP server. Read https://ui.minidev.pro/docs/<name>.md before using one.\n- Prefer an existing component or block over new markup. Use only documented props. Never invent props, variants or sizes.\n- Install with `npx shadcn@latest add @minidev/<name>`. Do not edit files in `components/ui` unless asked.\n\n### Choices\n- Primary action: `<Button>`. Brand action: `<Button variant=\"accent\">`, at most one per screen. Secondary: `variant=\"outline\"`. Quiet: `variant=\"ghost\"`.\n- Links styled as buttons: `<Button render={<Link href=\"/x\" />}>`. There is no `asChild`.\n- Icon-only: `<IconButton aria-label=\"...\">`. Destructive confirmation: `<AlertDialog>`. Fields: wrap in `<FormField id label error>`.\n\n### Tokens\n- Surfaces: bg-bg, bg-surface, bg-raised, bg-sunken, bg-ink, bg-accent. Text: text-fg, text-fg-muted, text-fg-subtle. Lines: border-border, border-border-strong.\n- Status: success, warning, danger, info. Shadows: shadow-xs, shadow-sm, shadow-raised, shadow-md, shadow-lg, shadow-overlay.\n- Never: hex colours, palette steps (blue-500), bg-white, bg-black, shadow-[...], dark: variants, backdrop-blur on cards.\n- Radius: controls rounded-lg, cards rounded-xl, overlays rounded-2xl. Spacing on a 2px grid. Numbers: tabular-nums.\n\n### Done means\n- `npx tsc --noEmit` and `npx eslint .` pass, and `node scripts/check-tokens.mjs` reports nothing.\n- Keyboard: every control reachable with Tab, visible focus ring.\n- Say which `npx shadcn@latest add` command you ran.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "MiniDev UI publishes a fuller version of this as [/AGENTS.md](https://ui.minidev.pro/AGENTS.md), a Cursor rule and a Claude Code skill. `curl -fsSL https://ui.minidev.pro/AGENTS.md >> AGENTS.md` appends it; the [AI agents page](/docs/ai) has the command for each tool.",
    },

    { type: "h2", text: "The Cursor rule", id: "cursor-rule" },
    {
      type: "p",
      text: "Cursor rules are Markdown files in `.cursor/rules/` with a small frontmatter. `globs` attaches the rule when matching files are in play, `description` lets the agent pull it in when relevant, and `alwaysApply: true` sends it on every request. For UI rules, scope by file type so they do not crowd out backend work.",
    },
    {
      type: "code",
      lang: "bash",
      filename: ".cursor/rules/ui.mdc",
      code: "---\ndescription: How UI is built in this repo (MiniDev UI components, tokens, accessibility). Apply when writing or editing React UI.\nglobs: **/*.tsx,**/*.jsx,**/*.css\nalwaysApply: false\n---\n\nFollow the UI section of AGENTS.md at the repo root. In short:\n- Look up components in https://ui.minidev.pro/llms.txt before writing markup; use only documented props.\n- Semantic token classes only (bg-surface, text-fg-muted, border-border...). No hex, no blue-500, no dark: variants.\n- Run `npx tsc --noEmit` and `node scripts/check-tokens.mjs` before finishing.",
    },
    {
      type: "p",
      text: "The rule repeats only the three rules that matter most and points to AGENTS.md for the rest. Two full copies drift apart within a month; one source and a pointer does not.",
    },

    { type: "h2", text: "Monorepos: a file per package", id: "monorepo" },
    {
      type: "p",
      text: "AGENTS.md can live in any folder, and agents use the nearest one to the file they are editing. Put the UI rules in `packages/ui/AGENTS.md` and in the app that consumes it, and keep the root file about the repo: how to install, build and test. A direct instruction in the chat still overrides all of them.",
    },
    {
      type: "code",
      lang: "bash",
      code: "AGENTS.md                  # repo: install, build, test, commit style\napps/web/AGENTS.md          # app: routes, data fetching, the UI section\npackages/ui/AGENTS.md       # library: how components are written and documented",
    },

    { type: "h2", text: "Rules that stick", id: "writing" },
    {
      type: "list",
      items: [
        "**Name the thing.** \"Use `<Button variant=\"outline\">` for secondary actions\" beats \"use consistent button styles\".",
        "**Pair a ban with the replacement.** \"Never `bg-white`; use `bg-surface`.\" A bare ban leaves the agent guessing what to write instead.",
        "**Give the reason in a few words when it is not obvious.** \"No `dark:` variants: tokens already switch.\" The agent is less likely to \"fix\" it back.",
        "**Keep it short enough to read on every task.** Link to llms.txt or the docs for the full reference instead of pasting it.",
        "**Write what you want, not your history.** \"We used to use Radix\" invites Radix code.",
        "**Revise from failures.** When an agent gets something wrong twice, add one line that would have prevented it.",
      ],
    },

    { type: "h2", text: "Enforce it with checks", id: "enforce" },
    {
      type: "p",
      text: "A rules file is advice. A failing command is a fact the agent has to deal with. Put the checks in the \"Done means\" list so the agent runs them, and in CI so a person cannot skip them either. The type checker catches invented props; a short script catches colours and shadows the theme cannot reach. The [design tokens guide](/guides/design-tokens-for-ai-agents) has a ready `check-tokens.mjs`.",
    },
    {
      type: "code",
      lang: "json",
      filename: "package.json",
      code: '{\n  "scripts": {\n    "check": "tsc --noEmit && eslint . && node scripts/check-tokens.mjs"\n  }\n}',
    },
    {
      type: "p",
      text: "Then the rules file needs a single line: \"Run `npm run check` before you finish.\" That one instruction does more for consistency than any amount of prose about taste.",
    },
  ],
  faq: [
    {
      q: "What is AGENTS.md?",
      a: "An open, plain Markdown format for giving AI coding agents project instructions, a README for agents. Many agents read it, including Codex, Cursor, GitHub Copilot's coding agent, Windsurf and Gemini CLI. It has no required fields.",
    },
    {
      q: "Does Claude Code read AGENTS.md?",
      a: "Claude Code reads CLAUDE.md. Add the line @AGENTS.md to your CLAUDE.md to import AGENTS.md, so both stay in sync from one file.",
    },
    {
      q: "Where do Cursor rules go?",
      a: "In .cursor/rules/ as .mdc files with frontmatter: description, globs and alwaysApply. Scope UI rules with globs such as **/*.tsx so they attach only when components are being edited.",
    },
    {
      q: "How long should an AGENTS.md be?",
      a: "Short enough that the agent reads all of it on every task. Keep the specific, checkable rules in the file and link to llms.txt or docs for full references.",
    },
  ],
}

export default guide
