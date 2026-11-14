import type { GlossaryTerm } from "../types"

/** Terms for building with AI coding agents. */
export const GLOSSARY_5: GlossaryTerm[] = [
  /* ───────────────────────────── MCP ───────────────────────────── */
  {
    slug: "mcp",
    term: "MCP (Model Context Protocol)",
    short:
      "MCP (Model Context Protocol) is an open standard that lets AI apps and coding agents call external tools and read data through small servers.",
    body: [
      {
        type: "p",
        text: "The Model Context Protocol is an open protocol, introduced by Anthropic in November 2024, for connecting AI applications to the tools and data they need. An MCP **client** lives inside the AI app (Claude Code, Claude Desktop, Cursor, VS Code with GitHub Copilot, Windsurf, Codex and many others). An MCP **server** is a small program that exposes capabilities to it. Because both sides speak one protocol, a server written once works in every client, the way a USB device works in any port.",
      },
      { type: "h2", text: "How it works", id: "how-it-works" },
      {
        type: "list",
        items: [
          "**Tools** are functions the model can call, such as `search_components` or `get_component`. Each tool has a name, a description and a JSON Schema for its arguments, so the model knows when and how to use it.",
          "**Resources** are read-only data the client can load into context, such as files or documents.",
          "**Prompts** are reusable templates a server offers to the user.",
          "Messages are JSON-RPC 2.0. A local server usually runs over **stdio** (the client starts it as a child process, often with `npx`); a remote server uses **Streamable HTTP**.",
        ],
      },
      { type: "h2", text: "Why it matters for UI libraries", id: "ui-libraries" },
      {
        type: "p",
        text: "A coding agent that writes UI from memory guesses at prop names and import paths, and its memory is months old. An MCP server for a component library replaces the guess with a lookup: the agent searches for the component it needs, reads the current props and an example, and installs it with the library's own command. The result is code that compiles on the first try and matches the library's design rules.",
      },
      {
        type: "p",
        text: "The shadcn CLI ships an MCP server that can browse and install from any [shadcn registry](/glossary/shadcn-registry), including MiniDev UI. Set it up for your client with `npx shadcn@latest mcp init`.",
      },
      { type: "h2", text: "How MiniDev UI uses it", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI also has its own server, hosted at `https://ui.minidev.pro/mcp`. It needs no install and no API key, and reads only public files: the registry at `ui.minidev.pro/r` and the public docs. Its tools are `search_components` (typo tolerant, by need: \"date range picker\"), `list_components`, `get_component` (props, install command, import line, example and full source), `get_example`, `get_design_rules` (tokens, shadows, radius, springs, materials) and `get_install_instructions` for Next.js, Vite and React Router.",
      },
      {
        type: "code",
        lang: "bash",
        code: `# Claude Code
claude mcp add --transport http minidev-ui https://ui.minidev.pro/mcp`,
      },
      {
        type: "p",
        text: "Setup for Cursor, VS Code, Windsurf and Codex is on [Use MiniDev UI with AI agents](/docs/ai). A typical agent run is `search_components`, then `get_component`, then `npx shadcn@latest add @minidev/<name>`, then a page written to `get_design_rules`.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "An MCP server runs with your permissions. Before you add one, check what it reads and sends. Prefer servers that read public data only and keep tool calls visible so you can approve them.",
      },
      { type: "component", name: "tool-call-card" },
    ],
    related: ["tool-call-card", "agent-trace", "tool-result-panel", "terminal-window"],
    see: ["llms-txt", "agents-md", "shadcn-registry", "component-library"],
  },

  /* ───────────────────────────── llms.txt ───────────────────────────── */
  {
    slug: "llms-txt",
    term: "llms.txt",
    short:
      "llms.txt is a Markdown file at a site's root that gives AI models a short summary and a curated list of links to the site's most useful docs.",
    body: [
      {
        type: "p",
        text: "`llms.txt` is a proposal, published by Jeremy Howard in September 2024, for a file that helps large language models use a website at inference time. HTML pages are full of navigation, scripts and layout that waste a model's context window. A plain Markdown file at `/llms.txt` says what the site is and points to clean versions of the pages that matter, so an agent can read a library's docs in a few requests instead of crawling it.",
      },
      { type: "h2", text: "The format", id: "format" },
      {
        type: "list",
        items: [
          "An `#` heading with the project name. This is the only required part.",
          "A `>` blockquote with a one or two sentence summary.",
          "Optional paragraphs with the details a model needs before anything else, such as install steps and rules.",
          "`##` sections, each a list of links in the form `[Title](url): note`. A section named `Optional` marks links a model can skip when context is short.",
        ],
      },
      {
        type: "p",
        text: "The proposal also suggests serving a Markdown copy of each page at the same URL with `.md` added. A common companion file, `llms-full.txt`, is not part of the proposal but is widely used: it puts all the docs in one file, so an agent can load everything with one request.",
      },
      { type: "h2", text: "What makes a good one", id: "good-llms-txt" },
      {
        type: "list",
        items: [
          "**Rules before links.** The few things a model gets wrong without being told (imports, required setup, naming) belong at the top, in plain imperative sentences.",
          "**One line per page that says what it is for**, so the model can pick the right link without opening all of them.",
          "**Generated from the source**, not written by hand, so it never drifts from the code.",
          "Short enough to fit in context with room to spare. Put the long reference in `llms-full.txt` and the per-page `.md` files.",
        ],
      },
      { type: "h2", text: "How MiniDev UI uses it", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI publishes [`/llms.txt`](https://ui.minidev.pro/llms.txt) with a quick start to follow exactly, the rules for generating code with the kit (Base UI's `render` prop instead of `asChild`, semantic tokens only, the shadow set, the spring presets) and one line for every component. [`/llms-full.txt`](https://ui.minidev.pro/llms-full.txt) has every component in one file, and every docs page has a Markdown twin at `/docs/<name>.md`, for example [`/docs/button.md`](https://ui.minidev.pro/docs/button.md), with purpose, install command, props and examples. All three are generated from the registry on each build.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "To use it, tell your agent: \"Read https://ui.minidev.pro/llms.txt before writing any UI.\" Or put that line in your [`AGENTS.md`](/glossary/agents-md) so every session starts with it.",
      },
      { type: "component", name: "code-block" },
    ],
    related: ["code-block", "copy-button", "terminal-window"],
    see: ["agents-md", "mcp", "shadcn-registry", "component-library"],
  },

  /* ───────────────────────────── AGENTS.md ───────────────────────────── */
  {
    slug: "agents-md",
    term: "AGENTS.md",
    short:
      "AGENTS.md is a Markdown file in a repository that tells AI coding agents how to work in it: setup, commands, conventions and rules to follow.",
    body: [
      {
        type: "p",
        text: "`AGENTS.md` is a README for coding agents. A README explains a project to people; `AGENTS.md` holds the instructions an agent needs and a person would find noise: which commands build and test the code, which conventions the codebase follows, what to never do. It is plain Markdown with no required fields, and it lives at the repository root. Codex, Cursor, GitHub Copilot, Gemini CLI, Jules, Amp, Windsurf and other agents read it at the start of a session.",
      },
      { type: "h2", text: "What to put in it", id: "contents" },
      {
        type: "list",
        items: [
          "**Commands**: how to install, run, test and lint, exactly as typed.",
          "**Conventions**: file layout, naming, the component library and how to import from it.",
          "**Rules with reasons**: \"semantic tokens only, because dark mode depends on them\" is followed more reliably than \"use tokens\".",
          "**Things that are not obvious from the code**: generated files not to edit, framework versions with breaking changes, where the docs live.",
        ],
      },
      {
        type: "p",
        text: "Keep it short and specific. Every line is read on every task, and a rule an agent cannot act on costs context without changing the output. In a monorepo, put an `AGENTS.md` in each package; agents use the one closest to the file they are editing.",
      },
      { type: "h2", text: "Claude Code and other file names", id: "file-names" },
      {
        type: "p",
        text: "Some tools read their own file first: Claude Code reads `CLAUDE.md`, Cursor reads rules in `.cursor/rules`, GitHub Copilot reads `.github/copilot-instructions.md`. To keep one source of truth, write the rules in `AGENTS.md` and import it from the others. In Claude Code, a `CLAUDE.md` that contains the line `@AGENTS.md` pulls the whole file in.",
      },
      {
        type: "code",
        lang: "bash",
        filename: "CLAUDE.md",
        code: `@AGENTS.md`,
      },
      { type: "h2", text: "How MiniDev UI uses it", id: "minidev-ui" },
      {
        type: "p",
        text: "MiniDev UI publishes a ready block of rules at [`/AGENTS.md`](https://ui.minidev.pro/AGENTS.md) for you to paste into your own `AGENTS.md` or `CLAUDE.md`. It tells the agent to look components up before writing markup (in [`llms.txt`](/glossary/llms-txt), the per-component `.md` docs or the [MCP server](/glossary/mcp)), how to install with the shadcn CLI or npm, and the house rules: [semantic tokens](/glossary/semantic-tokens) only, the shadow and radius set, the 2px grid, spring presets with reduced motion, and focus rings that stay. The same rules ship as a Cursor rules file at `/rules/minidev-ui.mdc` and as a Claude Code skill at `/skill/minidev-ui/SKILL.md`. Setup for each agent is on [Use MiniDev UI with AI agents](/docs/ai).",
      },
      {
        type: "callout",
        tone: "note",
        text: "`AGENTS.md` is guidance, not enforcement. Pair the rules with checks that fail the build, such as a lint rule against raw hex colors, for the ones that must never break.",
      },
    ],
    related: ["code-block", "terminal-window", "copy-button"],
    see: ["llms-txt", "mcp", "design-tokens", "semantic-tokens"],
  },
]
