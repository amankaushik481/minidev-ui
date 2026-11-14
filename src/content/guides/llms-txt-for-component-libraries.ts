import type { Guide } from "../types"

const guide: Guide = {
  slug: "llms-txt-for-component-libraries",
  title: "llms.txt for component libraries: what to put in it",
  description:
    "What a UI component library's llms.txt should contain: quick start, code rules, a one-line index, llms-full.txt and Markdown pages, generated from the source.",
  date: "2026-11-14",
  keywords: [
    "llms.txt",
    "llms.txt example",
    "llms-full.txt",
    "llms.txt for documentation",
    "llms.txt component library",
    "docs for ai agents",
  ],
  related: ["code-block", "button", "data-table"],
  body: [
    {
      type: "tldr",
      items: [
        "**Order:** an H1 with the name, a one-paragraph summary, a quick start with exact commands, rules for writing code with the library, then an index of every component with a one-line description.",
        "**The rules section matters most.** It is what stops agents inventing props, colours and import paths. Write each rule so it can be checked.",
        "**Link a Markdown page per component** (`/docs/button.md`) and an `llms-full.txt` with everything, so agents can fetch only what they need.",
        "**Generate it from the source** on every build. A hand-written index is out of date by the next release.",
      ],
    },
    {
      type: "p",
      text: "An `llms.txt` file is a Markdown index at the root of a site that tells language models what the site is and where the useful pages are. For a component library it does more work than for most sites, because the agent reading it is about to write code. A good one gets a correct install on the first try and code that looks like the rest of the project. This guide covers what the format requires, what a component library should add, and how MiniDev UI generates its own.",
    },

    { type: "h2", text: "What the format requires", id: "spec" },
    {
      type: "p",
      text: "The [llms.txt proposal](https://llmstxt.org) from Jeremy Howard (September 2024) is deliberately small. Only the H1 is required. The full order is:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "An H1 with the project or site name.",
        "A blockquote with a short summary.",
        "Any Markdown except headings: paragraphs and lists explaining the project and how to read the linked files.",
        "H2 sections, each a list of links in the form `- [name](url): notes`.",
        "Optionally an H2 named `Optional` for links an agent can skip when context is short.",
      ],
    },
    {
      type: "p",
      text: "The proposal also suggests a clean Markdown version of each useful page at the same URL with `.md` added, and lets a file live at a subpath to cover the pages under it. It does not define `llms-full.txt`; that is a common convention for \"everything in one file\".",
    },

    { type: "h2", text: "What a component library should put in it", id: "contents" },
    {
      type: "table",
      head: ["Section", "Why the agent needs it", "Keep it"],
      rows: [
        ["Summary blockquote", "Decides in one read whether this library fits the task: framework, styling, licence, size", "Two or three sentences"],
        ["Quick start", "Exact commands to install and wire up styles, in order", "Numbered, copy-pasteable"],
        ["Rules for generating code", "Primitives, prop patterns, tokens, shadows, motion, accessibility", "One checkable rule per bullet"],
        ["Machine-readable links", "Per-component Markdown, catalogue JSON, registry index, llms-full.txt", "URL patterns, not every URL"],
        ["Docs links", "Getting started, gallery, templates", "A handful"],
        ["Component index", "Find the right component by need, not by name", "Name, link, one line"],
      ],
    },
    {
      type: "p",
      text: "Here is the top of MiniDev UI's [llms.txt](/llms.txt), trimmed. The quick start and rules come before the long index on purpose: an agent that stops reading early still installs correctly.",
    },
    {
      type: "code",
      lang: "bash",
      filename: "llms.txt",
      code: "# MiniDev UI\n\n> Free, MIT-licensed React + Tailwind CSS v4 components, blocks and motion pieces for product UI.\n> Built on Base UI. Every component is one TypeScript file you own, installed with the shadcn CLI.\n\n## Quick start (follow exactly)\n\n1. A React project with Tailwind CSS v4 and the `@/*` alias. Run `npx shadcn@latest init` once.\n2. Tokens: `curl -o app/minidev.css https://ui.minidev.pro/r/styles.css`, then import it after tailwindcss.\n3. Add components: `npx shadcn@latest add @minidev/button @minidev/dialog`.\n\n## Machine-readable\n\n- Per-component Markdown: `https://ui.minidev.pro/docs/<name>.md`\n- Everything in one file: https://ui.minidev.pro/llms-full.txt\n\n## Rules for generating code with MiniDev UI\n\n- Built on Base UI, not Radix: pass `render={<a href=\"/pricing\" />}`. There is no `asChild`.\n- Semantic tokens only: bg, surface, raised, sunken, fg, fg-muted, accent... Never hex or blue-500.\n- Icon-only buttons need aria-label.\n\n## Components\n\n- [AgentTrace](https://ui.minidev.pro/docs/agent-trace.md): An AI agent run as a timeline of tool calls and steps.\n- [AiComposer](https://ui.minidev.pro/docs/ai-composer.md): A chat input for AI apps: prompt, suggestions, model picker...",
    },

    { type: "h2", text: "Write rules an agent can follow", id: "rules" },
    {
      type: "p",
      text: "Most llms.txt files stop at links. For a component library the rules are where the value is, because they cover the mistakes models make from habit: Radix props on a Base UI library, palette colours instead of tokens, a shadow typed by hand. A rule earns its place if you could check it with a grep or the type checker.",
    },
    {
      type: "table",
      head: ["Vague", "Checkable"],
      rows: [
        ["Use the design system colours", "Use semantic tokens only: `bg-surface`, `text-fg-muted`... Never hex, `blue-500`, `bg-white` or `bg-black`"],
        ["Make it accessible", "Icon-only buttons need `aria-label`. Dialogs always get a title"],
        ["Follow our patterns for links", "Render a link as a button with `render={<Link href=\"/x\" />}`. There is no `asChild`"],
        ["Keep animations subtle", "Springs from the presets only: `snappy { type: \"spring\", bounce: 0.18, duration: 0.42 }`. Nothing animates on page load"],
        ["Use our components", "Exports are named, PascalCase of the file name: `chat-thread` exports `ChatThread`"],
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Put the same rules in an AGENTS.md or Cursor rule that users can drop into their project, so the agent sees them on every task and not only when it happens to fetch your llms.txt. The [AGENTS.md guide](/guides/agents-md-cursor-rules-ui) covers that side.",
    },

    { type: "h2", text: "Per-component Markdown and llms-full.txt", id: "markdown-pages" },
    {
      type: "p",
      text: "The index line tells the agent a component exists. The Markdown page tells it how to use it: purpose, when to choose it over its neighbours, the install command, props with types and defaults, and one or two examples. Serve it at the docs URL plus `.md`, as plain text with no navigation, so a fetch tool gets content rather than chrome. `llms-full.txt` concatenates those pages for agents that prefer to load or search one file.",
    },
    {
      type: "p",
      text: "In Next.js, a rewrite maps the `.md` URL to a route that renders the page as Markdown. MiniDev UI uses this in its `next.config.ts`; the comment explains why a rewrite is needed at all.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "next.config.ts",
      code: 'async rewrites() {\n  // afterFiles: runs before dynamic routes, so /docs/button.md never reaches /docs/[name]\n  return [{ source: "/docs/:name([a-z0-9-]+)\\\\.md", destination: "/docs/:name/md" }]\n},',
    },
    {
      type: "p",
      text: "Point to the Markdown version from the HTML page too, so agents that land on the page can find it. In the Next.js metadata API that is an alternate type:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "app/docs/[name]/page.tsx",
      code: 'export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {\n  const { name } = await params\n  return {\n    alternates: { types: { "text/markdown": `/docs/${name}.md` } },\n  }\n}',
    },

    { type: "h2", text: "Generate it from the source", id: "generate" },
    {
      type: "p",
      text: "If your components are a shadcn registry you already have the data: `registry.json` lists every item with its name, title, type and description. Write the quick start and rules by hand once, and let a script append the index on every build. MiniDev UI goes one step further and builds descriptions and props tables from the doc comments in each component file, so what an agent reads in llms.txt matches what it sees when it opens the source, and the build fails if those comments go missing.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "scripts/build-llms.mjs",
      code: 'import { readFileSync, writeFileSync } from "node:fs"\n\nconst SITE = "https://ui.example.com"\nconst { items } = JSON.parse(readFileSync("registry.json", "utf8"))\n// Hand-written: H1, summary, quick start and rules\nconst head = readFileSync("docs/llms-head.md", "utf8").trim()\n\nconst section = (title, type) => {\n  const list = items.filter((i) => i.type === type)\n  return [`## ${title} (${list.length})`, "", ...list.map((i) => `- [${i.title ?? i.name}](${SITE}/docs/${i.name}.md): ${i.description}`)].join("\\n")\n}\n\nwriteFileSync(\n  "public/llms.txt",\n  [head, section("Components", "registry:ui"), section("Blocks", "registry:block")].join("\\n\\n") + "\\n",\n)',
    },
    {
      type: "p",
      text: "Run it before `next build` so the file never drifts from the registry. Fail the build if any item has an empty description; an index line with no description is a component the agent will never pick.",
    },

    { type: "h2", text: "Test it like an agent would", id: "test" },
    {
      type: "list",
      ordered: true,
      items: [
        "Open a new, empty project and a fresh agent session with no other context.",
        "Prompt: \"Read https://your-site/llms.txt. Install what you need and build a sign-in page with email, password and a forgot password link.\"",
        "Watch which URLs it fetches. If it never opens a component's Markdown page, the index lines are not telling it enough.",
        "Run `npx tsc --noEmit` and grep for raw colours. Each failure points at a rule that is missing or unclear.",
        "Fix the file, start a new session and repeat. Two or three rounds usually settle it.",
      ],
    },

    { type: "h2", text: "Common mistakes", id: "mistakes" },
    {
      type: "list",
      items: [
        "**Marketing copy in the summary.** \"Beautiful, blazing fast\" tells the agent nothing. Say the framework, the styling system and the install method.",
        "**Install steps buried below the index.** Agents stop reading long files early. Put the quick start first.",
        "**Links to HTML pages only.** Tabs, client-rendered examples and navigation make docs pages hard to read through a fetch tool. Link the `.md` versions.",
        "**One giant file and nothing else.** `llms-full.txt` is useful, but an agent with limited context needs the short index to find the one page it wants.",
        "**Rules that contradict the examples.** If an example uses `bg-white`, the agent will copy the example. Lint your docs examples with the same rules.",
      ],
    },
  ],
  faq: [
    {
      q: "What is llms.txt?",
      a: "A proposed standard from llmstxt.org: a Markdown file at /llms.txt with an H1, a short summary, optional notes and sections of links that help language models understand and use a website.",
    },
    {
      q: "What is the difference between llms.txt and llms-full.txt?",
      a: "llms.txt is a short index with links. llms-full.txt is a common convention for the full content in one file. Component libraries benefit from both: the index for finding a component, the full file for searching props and examples.",
    },
    {
      q: "Do AI coding agents actually read llms.txt?",
      a: "Agents read it when they are pointed at it, by a rules file, a prompt or an MCP server that fetches it. That is why a library should link it from its AGENTS.md and README and keep the most important instructions near the top.",
    },
    {
      q: "Should llms.txt include code rules or only links?",
      a: "For a component library, include rules. Short, checkable rules about props, tokens, imports and accessibility prevent the most common generated-code mistakes, and they cost a few hundred words.",
    },
  ],
}

export default guide
