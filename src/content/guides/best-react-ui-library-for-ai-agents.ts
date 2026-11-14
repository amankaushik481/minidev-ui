import type { Guide } from "../types"

const guide: Guide = {
  slug: "best-react-ui-library-for-ai-agents",
  title: "Best React UI library for AI coding agents (Claude Code, Cursor, Codex)",
  description:
    "Which React UI library do AI coding agents use best? Nine libraries compared on source access, llms.txt, MCP servers, install and styling an agent can follow.",
  date: "2026-11-14",
  keywords: [
    "best react ui library for ai agents",
    "ui library for claude code",
    "ui library for cursor",
    "ai friendly component library",
    "react components llms.txt mcp",
    "best ui library for vibe coding",
  ],
  related: ["button", "dashboard-home", "chat-page", "agent-trace", "data-table", "form-field"],
  body: [
    {
      type: "tldr",
      items: [
        "**The agent should own the code.** Libraries that copy source into your repo (shadcn/ui, MiniDev UI, Magic UI) let the agent read and edit the exact component it is using instead of guessing at a package's internals.",
        "**It needs docs it can fetch.** An `llms.txt`, per-component Markdown and an MCP server turn \"guess the props\" into \"look up the props\".",
        "**Styling must be a small, closed vocabulary.** Semantic tokens such as `bg-surface` and `text-fg-muted` keep generated screens consistent; open palettes invite `blue-500` everywhere.",
        "**Our pick for product UI:** shadcn/ui as the base plus a registry that covers the screens you need. We build MiniDev UI for that job, and say below where others fit better.",
      ],
    },
    {
      type: "p",
      text: "In 2026 most UI code is first written by an agent and then reviewed by a person. The library you choose decides how often that first draft is right. An agent does well with a library when it can find the right component, read its real API, install it in one command and style around it without inventing values. This guide compares nine React libraries on exactly those points, then gives you a fifteen minute test to run on your own project.",
    },
    {
      type: "callout",
      tone: "note",
      text: "MiniDev UI is on this list and this guide is written by its team. Facts about other libraries come from our [comparison pages](/compare), each of which lists its sources and the date it was checked (between September 30 and November 1, 2026). Where we have not checked something, we say so.",
    },

    { type: "h2", text: "What makes a library easy for an agent", id: "criteria" },
    {
      type: "list",
      ordered: true,
      items: [
        "**Source the agent can read.** When the component lives in `components/ui/button.tsx`, the agent opens the file and sees every prop and variant. When it lives in `node_modules`, the agent relies on memory, which may be a major version out of date.",
        "**Machine-readable docs.** An [llms.txt](/guides/llms-txt-for-component-libraries) index, a Markdown version of each docs page and a full-text dump the agent can search. HTML docs with tabs and client-side rendering are hard for tools to read.",
        "**An MCP server.** A [Model Context Protocol](https://modelcontextprotocol.io) server lets the agent search components and fetch props on demand instead of loading everything into context. See [using registries with MCP](/guides/shadcn-registry-mcp-claude-code-cursor).",
        "**One install command.** `npx shadcn@latest add @minidev/data-table` is a single, checkable step. Multi-step setup with providers, theme objects and PostCSS presets is where agents skip a step and leave you with a broken page.",
        "**A closed styling vocabulary.** A short list of [semantic tokens](/guides/design-tokens-for-ai-agents) that already handle dark mode beats a palette of 200 colour steps. The fewer valid choices, the more consistent the output.",
        "**Rules the agent can load.** A ready-made [AGENTS.md or Cursor rule](/guides/agents-md-cursor-rules-ui) that says how to use the library: which button is primary, how links render, what never to do.",
      ],
    },

    { type: "h2", text: "At a glance", id: "at-a-glance" },
    {
      type: "table",
      head: ["Library", "Where the code lives", "Agent docs and tools", "Styling the agent writes"],
      rows: [
        ["[shadcn/ui](/compare/minidev-ui-vs-shadcn-ui)", "Your repo (CLI copies source)", "`llms.txt`, official MCP server for any registry", "Tailwind + CSS variables"],
        ["[MiniDev UI](/docs)", "Your repo (shadcn CLI) or npm", "`llms.txt`, `llms-full.txt`, per-component `.md`, MCP server, AGENTS.md and Cursor rule", "Tailwind + semantic OKLCH tokens"],
        ["[Mantine](/compare/minidev-ui-vs-mantine)", "npm packages", "`llms.txt`, `llms-full.txt`, experimental MCP server, agent skills", "CSS modules, Styles API, style props"],
        ["[Chakra UI](/compare/minidev-ui-vs-chakra-ui)", "npm, plus CLI snippets in your repo", "`llms.txt`, AI rules and skills, MCP server (template tools need Pro)", "Style props, recipes (Emotion)"],
        ["[HeroUI](/compare/minidev-ui-vs-heroui)", "npm packages", "`llms.txt`, MCP server, agent skills", "BEM classes + Tailwind utilities"],
        ["[daisyUI](/compare/minidev-ui-vs-daisyui)", "Tailwind plugin (class names)", "`llms.txt`, editor setup guides, a skill, paid MCP server", "Class names such as `btn`, `card`"],
        ["[Magic UI](/compare/minidev-ui-vs-magic-ui)", "Your repo (shadcn CLI)", "Official MCP server", "Tailwind, follows shadcn/ui theme"],
        ["[Flowbite](/compare/minidev-ui-vs-flowbite)", "npm + Tailwind plugin", "Official MCP server (Figma to code, themes)", "Tailwind utilities, data attributes"],
        ["[Ant Design](/compare/minidev-ui-vs-ant-design)", "npm package", "A docs page written for coding agents", "CSS-in-JS theme tokens"],
      ],
    },

    { type: "h2", text: "shadcn/ui: the default base", id: "shadcn-ui" },
    {
      type: "p",
      text: "[shadcn/ui](https://ui.shadcn.com) is the reason \"copy the source into the repo\" became normal, and that model is the single biggest win for agents. Its CLI and registry format are now a shared standard: any registry, MiniDev UI included, installs with the same `npx shadcn@latest add` command, and its MCP server browses every registry configured in `components.json`. Models have also seen a lot of shadcn/ui code, so the basic components come out right more often than not.",
    },
    {
      type: "p",
      text: "**Pick it if** you want the base every other registry assumes. **Limitation:** the official set is deliberately small. Billing, settings, AI chat and analytics screens are left to you or to community registries, and that is where agents start improvising layouts.",
    },

    { type: "h2", text: "MiniDev UI: built for agents to read", id: "minidev-ui" },
    {
      type: "p",
      text: "MiniDev UI is a shadcn-compatible registry of 500+ components, blocks and motion pieces on Base UI and Tailwind CSS v4. Every component's source opens with a doc comment that says what it is, when to use it instead of its neighbours, and an `@example`, so an agent reading the file gets the intent along with the props. The site publishes an [llms.txt](/llms.txt) with a quick start and code rules, [llms-full.txt](/llms-full.txt), a Markdown page per component at `/docs/<name>.md`, a JSON catalogue, an AGENTS.md and a Cursor rule. Setup for each agent is on [MiniDev UI for AI agents](/docs/ai).",
    },
    {
      type: "code",
      lang: "bash",
      code: "# one command, the agent can run it\nnpx shadcn@latest add @minidev/dashboard-home @minidev/agent-trace",
    },
    {
      type: "p",
      text: "Styling goes through one set of semantic tokens (`bg-surface`, `text-fg-muted`, `shadow-raised`, `bg-accent`) that also drive dark mode and four materials, so an agent never writes `dark:` variants. Full product screens ship as blocks, which means \"build a billing page\" can start from [billing-page](/docs/billing-page) instead of a blank file. **Pick it if** you build SaaS or AI products and want agents to assemble whole screens from parts. **Limitation:** it is React only, and it is built on Base UI, so components use the `render` prop rather than Radix's `asChild`. Agents trained mostly on Radix code need the rules file to get that right.",
    },
    { type: "example", name: "agent-trace", caption: "AgentTrace, one of the AI surface components an agent can install by name." },

    { type: "h2", text: "Mantine, Chakra UI and HeroUI: npm libraries with MCP", id: "npm-libraries" },
    {
      type: "p",
      text: "These three ship as packages and have invested in agent tooling. [Mantine](https://mantine.dev) has 100+ components and 70+ hooks, `llms.txt` files and an experimental MCP server. [Chakra UI](https://chakra-ui.com) has `llms.txt`, AI rules and an MCP server, and its CLI can copy ready compositions into `components/ui`. [HeroUI](https://heroui.com) is built on React Aria Components and offers an MCP server and agent skills.",
    },
    {
      type: "p",
      text: "**Pick one if** your team already uses it, or you want a single dependency that is upgraded for you. **Limitation for agents:** the component code is not in your repo, so when the agent's memory and the installed version disagree, the MCP server is the only thing standing between you and a made-up prop. Keep it connected.",
    },

    { type: "h2", text: "daisyUI and Flowbite: class names on Tailwind", id: "class-libraries" },
    {
      type: "p",
      text: "[daisyUI](https://daisyui.com) adds semantic class names such as `btn` and `card` and 35 themes, with no JavaScript. That is genuinely easy for an agent to write, and it works in any framework. [Flowbite](https://flowbite.com) pairs Tailwind classes with a script and has an official MCP server that can turn Figma layers into code. **Pick one if** you are not on React or want HTML-first components. **Limitation:** interactive behaviour (focus traps, roving keyboard focus, async states) is yours or the script's to wire up, which is exactly the part agents most often get subtly wrong.",
    },

    { type: "h2", text: "Magic UI and Ant Design", id: "others" },
    {
      type: "p",
      text: "[Magic UI](https://magicui.design) is 150+ animated components that sit next to shadcn/ui and install with its CLI, plus an official MCP server; use it for landing page effects, not for forms and tables. [Ant Design](https://ant.design) is a large enterprise system with CSS-in-JS theming and a docs page written for coding agents; it suits data-heavy internal tools where its look is acceptable as is.",
    },

    { type: "h2", text: "Test it on your own project in fifteen minutes", id: "bake-off" },
    {
      type: "p",
      text: "Do not take a roundup's word for it, ours included. Give two candidates the same prompt in the same agent, in two clean branches, and check the result with commands rather than by eye.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Connect each library's MCP server or paste its rules file, so both get the same help.",
        "Prompt: \"Build a settings page with a profile form (name, email, avatar), a notification preferences section with switches, and a danger zone with a delete account confirmation. Use only components from <library>.\"",
        "Run the checks below and count what fails.",
        "Toggle dark mode and tab through the page with the keyboard. Note anything you cannot reach or read.",
      ],
    },
    {
      type: "code",
      lang: "bash",
      filename: "check.sh",
      code: "npx tsc --noEmit                      # invented props show up as type errors\nnpx eslint app components            # hooks and a11y lint rules\n# hard-coded colours the theme cannot reach\ngrep -rnE '#[0-9a-fA-F]{6}\\b|-(blue|gray|slate|zinc)-[0-9]{3}\\b|bg-(white|black)\\b' app components",
    },
    {
      type: "p",
      text: "Type errors are the most telling number: each one is usually a prop or variant the agent made up. The colour grep tells you whether the next screen will match this one. If both libraries pass, choose on looks and coverage.",
    },

    { type: "h2", text: "Set up MiniDev UI for your agent", id: "setup" },
    {
      type: "p",
      text: "If you want to try MiniDev UI in the bake-off, this is the whole setup in a shadcn project. The [AI agents page](/docs/ai) has the same steps for Cursor, Codex, Windsurf, GitHub Copilot and v0.",
    },
    {
      type: "code",
      lang: "bash",
      code: "# rules the agent loads on every task\ncurl -fsSL https://ui.minidev.pro/AGENTS.md >> AGENTS.md\n# tokens, once\ncurl -o app/minidev.css https://ui.minidev.pro/r/styles.css\n# then ask for a page, or install directly\nnpx shadcn@latest add @minidev/settings-page",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Whatever you choose, the biggest single improvement is a rules file that names your primary button, your tokens and your import paths. The [AGENTS.md guide](/guides/agents-md-cursor-rules-ui) has a template you can adapt to any library.",
    },
  ],
  faq: [
    {
      q: "Which UI library does Claude Code work best with?",
      a: "Libraries whose source is copied into your repo, such as shadcn/ui and registries built on it like MiniDev UI, because Claude Code can open the component file and read the real props. Add the library's MCP server or rules file so it looks components up instead of recalling them.",
    },
    {
      q: "Does a UI library need an MCP server to work with AI agents?",
      a: "No, but it helps. An agent can read llms.txt or per-component Markdown over HTTP. An MCP server makes lookups faster and keeps the context small, which matters most for npm libraries whose source is not in your repo.",
    },
    {
      q: "Is shadcn/ui or MiniDev UI better for Cursor?",
      a: "They work together. MiniDev UI installs through the shadcn CLI, and the shadcn MCP server can browse it alongside the official registry. Use shadcn/ui for the core set and MiniDev UI when you want finished product screens, AI components and motion on the same tokens.",
    },
    {
      q: "Why do AI agents generate inconsistent UI?",
      a: "Usually because the styling vocabulary is open: any colour step, any shadow, any radius. A small set of semantic tokens plus a rules file that lists them, and a lint check that rejects raw colours, makes each generated screen match the last.",
    },
  ],
}

export default guide
