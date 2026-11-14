import { readFile } from "node:fs/promises"
import { join } from "node:path"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon, BotIcon, DownloadIcon } from "lucide-react"
import { DocsH2, DocsShell } from "../_components/docs-shell"
import { FaqList } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { abs, articleLd, breadcrumbLd, faqLd, graph, meta } from "@/lib/seo"
import { SITE } from "@/lib/site"
import { Button } from "@/registry/ui/button"
import { CodeBlock } from "@/registry/ui/code-block"
import { CopyButton } from "@/registry/ui/copy-button"

const PATH = "/docs/ai"
const MCP_URL = `${SITE.url}/mcp`
const UPDATED = "2026-11-14"

export const metadata: Metadata = meta({
  title: "Use MiniDev UI with AI Agents: Claude Code, Cursor, Codex, MCP",
  description:
    "One-command setup for Claude Code, Cursor, Codex, Windsurf, GitHub Copilot and v0: MCP server, llms.txt, per-component Markdown docs, AGENTS.md, Cursor rules and a Claude skill for MiniDev UI.",
  path: PATH,
  image: `${PATH}/opengraph-image`,
  type: "article",
  publishedTime: UPDATED,
  keywords: ["AI agent UI library", "Claude Code components", "Cursor rules React", "MCP server UI components", "llms.txt", "AGENTS.md", "shadcn registry"],
})

const TOC = [
  { id: "quick-start", label: "Quick start" },
  { id: "setup", label: "Setup by tool" },
  { id: "mcp", label: "MCP server" },
  { id: "context", label: "Docs agents can read" },
  { id: "rules", label: "Rules files" },
  { id: "prompts", label: "Prompts that work" },
  { id: "faq", label: "FAQ" },
]

const code = "rounded bg-sunken px-1 font-mono text-[12.5px] text-fg"
const link = "text-accent-fg underline decoration-accent-line underline-offset-4"
const body = "text-[0.9375rem] leading-[1.7] text-fg-muted"

const QUICK = `Use MiniDev UI for the interface. Read ${SITE.url}/llms.txt first, then ${SITE.url}/docs/<name>.md for each component you use, and install with npx shadcn@latest add @minidev/<name>.`

const MCP_JSON = JSON.stringify({ mcpServers: { "minidev-ui": { url: MCP_URL } } }, null, 2)
const CURSOR_DEEPLINK = `cursor://anysphere.cursor-deeplink/mcp/install?name=minidev-ui&config=${Buffer.from(JSON.stringify({ url: MCP_URL })).toString("base64")}`
const VSCODE_LINK = `vscode:mcp/install?${encodeURIComponent(JSON.stringify({ name: "minidev-ui", type: "http", url: MCP_URL }))}`

type Tool = {
  id: string
  name: string
  rules: { note: React.ReactNode; code: string }
  mcp?: { note: React.ReactNode; code: string; language: string; filename?: string; oneClick?: { href: string; label: string } }
}

const TOOLS: Tool[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    rules: {
      note: <>Install the MiniDev UI skill. Claude loads it whenever you ask for UI.</>,
      code: `mkdir -p .claude/skills/minidev-ui && curl -fsSL ${SITE.url}/skill/minidev-ui/SKILL.md -o .claude/skills/minidev-ui/SKILL.md`,
    },
    mcp: { note: <>Add the hosted MCP server. Nothing to install.</>, code: `claude mcp add --transport http minidev-ui ${MCP_URL}`, language: "bash" },
  },
  {
    id: "cursor",
    name: "Cursor",
    rules: {
      note: <>Save the rules file. It applies to <code className={code}>.tsx</code>, <code className={code}>.jsx</code> and <code className={code}>.css</code> files.</>,
      code: `mkdir -p .cursor/rules && curl -fsSL ${SITE.url}/rules/minidev-ui.mdc -o .cursor/rules/minidev-ui.mdc`,
    },
    mcp: { note: <>Add the server, or use the one-click link.</>, code: MCP_JSON, language: "json", filename: ".cursor/mcp.json", oneClick: { href: CURSOR_DEEPLINK, label: "Add to Cursor" } },
  },
  {
    id: "codex",
    name: "Codex",
    rules: { note: <>Codex reads <code className={code}>AGENTS.md</code>. Append the MiniDev rules to it.</>, code: `curl -fsSL ${SITE.url}/AGENTS.md >> AGENTS.md` },
    mcp: { note: <>Register the server in your Codex config.</>, code: `[mcp_servers.minidev-ui]\nurl = "${MCP_URL}"`, language: "toml", filename: "~/.codex/config.toml" },
  },
  {
    id: "windsurf",
    name: "Windsurf",
    rules: { note: <>Windsurf picks up <code className={code}>AGENTS.md</code> in the workspace.</>, code: `curl -fsSL ${SITE.url}/AGENTS.md >> AGENTS.md` },
    mcp: { note: <>Add the server to Windsurf&apos;s MCP config.</>, code: JSON.stringify({ mcpServers: { "minidev-ui": { serverUrl: MCP_URL } } }, null, 2), language: "json", filename: "~/.codeium/windsurf/mcp_config.json" },
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    rules: { note: <>Append the rules to Copilot&apos;s repository instructions.</>, code: `mkdir -p .github && curl -fsSL ${SITE.url}/AGENTS.md >> .github/copilot-instructions.md` },
    mcp: {
      note: <>In VS Code, add the server to the workspace, or use the one-click link.</>,
      code: JSON.stringify({ servers: { "minidev-ui": { type: "http", url: MCP_URL } } }, null, 2),
      language: "json",
      filename: ".vscode/mcp.json",
      oneClick: { href: VSCODE_LINK, label: "Add to VS Code" },
    },
  },
  {
    id: "v0",
    name: "v0",
    rules: {
      note: <>v0 has no local rules file. Start your chat with the line from Quick start, or open any registry item in v0 directly:</>,
      code: `https://v0.dev/chat/api/open?url=${SITE.url}/r/dashboard-home.json`,
    },
  },
]

const SOURCES = [
  { path: "/llms.txt", what: "Install routes, house rules and a one-line index of every component (about 130 KB)." },
  { path: "/llms-full.txt", what: "Every component in full: purpose, when to use, install, import, props, examples. Search it to pick components." },
  { path: "/docs/button.md", what: "One component's docs as Markdown: props, examples, related components. Swap button for any name." },
  { path: "/r/button.json", what: "The shadcn registry item: exact source, npm dependencies and MiniDev dependencies." },
  { path: "/r/registry.json", what: "The whole registry index, for tools that enumerate items." },
  { path: "/r/styles.css", what: "The token stylesheet every component reads. Needed once per project on the shadcn route." },
]

const FILES = [
  { href: "/AGENTS.md", name: "AGENTS.md", for: "Codex, Windsurf, Copilot, Jules, Zed and any tool that reads AGENTS.md" },
  { href: "/rules/minidev-ui.mdc", name: "minidev-ui.mdc", for: "Cursor project rules" },
  { href: "/skill/minidev-ui/SKILL.md", name: "SKILL.md", for: "Claude Code skill" },
]

const PROMPTS = [
  {
    prompt: "Using MiniDev UI, build a dashboard home: a page header, four KPIs, and a weekly revenue chart below. Install with the shadcn CLI.",
    install: "npx shadcn@latest add @minidev/page-header @minidev/kpi-row @minidev/chart-card @minidev/area-chart @minidev/button",
    filename: "app/dashboard/page.tsx",
    code: `import { AreaChart } from "@/components/ui/area-chart"
import { Button } from "@/components/ui/button"
import { ChartCard } from "@/components/ui/chart-card"
import { KpiRow } from "@/components/ui/kpi-row"
import { PageHeader } from "@/components/ui/page-header"

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <PageHeader title="Overview" description="Last 30 days" actions={<Button size="sm">Export</Button>} />
      <KpiRow
        items={[
          { label: "MRR", value: "$48.2k", delta: 8 },
          { label: "Active accounts", value: "1,204", delta: 3 },
          { label: "Net revenue retention", value: "112%", delta: 2 },
          { label: "Churn", value: "1.1%", delta: -0.3, invert: true },
        ]}
      />
      <ChartCard title="Revenue" description="Last 8 weeks">
        <AreaChart data={[18, 22, 27, 31, 36, 41, 45, 52]} label="Weekly revenue, $k" className="h-48 w-full" />
      </ChartCard>
    </main>
  )
}`,
    why: "Composes existing pieces instead of hand-drawing cards, uses only documented props, and marks churn as invert so a drop reads green.",
  },
  {
    prompt: "Add an AI assistant panel with MiniDev UI: a scrolling message thread and a composer that sends on Enter.",
    install: "npx shadcn@latest add @minidev/chat-thread @minidev/prompt-input",
    filename: "components/assistant.tsx",
    code: `"use client"
import * as React from "react"
import { ChatThread, type ChatThreadMessage } from "@/components/ui/chat-thread"
import { PromptInput } from "@/components/ui/prompt-input"

export function Assistant() {
  const [messages, setMessages] = React.useState<ChatThreadMessage[]>([])
  const [prompt, setPrompt] = React.useState("")
  return (
    <section aria-label="Assistant" className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-raised">
      <ChatThread className="h-96" messages={messages} />
      <PromptInput
        value={prompt}
        onChange={setPrompt}
        onSubmit={(text) => {
          setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", content: text }])
          setPrompt("")
        }}
      />
    </section>
  )
}`,
    why: "Gives the thread a height so it scrolls, keeps state in a client component, and frames the panel with surface, border and shadow-raised tokens.",
  },
  {
    prompt: "Build a three-plan pricing section with MiniDev UI. Highlight Pro as the most popular.",
    install: "npx shadcn@latest add @minidev/plan-card",
    filename: "components/pricing.tsx",
    code: `import { PlanCard } from "@/components/ui/plan-card"

export function Pricing() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <PlanCard name="Starter" price="$0" period="mo" features={["1 seat", "100 invoices a month"]} cta="Start free" />
      <PlanCard name="Pro" price="$49" period="mo" features={["10 seats", "Bank sync", "Recurring invoices"]} highlighted badge="Most popular" />
      <PlanCard name="Team" price="$129" period="mo" features={["Unlimited seats", "SSO", "Audit log"]} cta="Talk to sales" />
    </div>
  )
}`,
    why: "One component, three instances, prices as preformatted strings, and the highlight comes from the prop, not a hand-written accent border.",
  },
  {
    prompt: "Create a sign-in screen with MiniDev UI: email, password, and a link to sign up.",
    install: "npx shadcn@latest add @minidev/auth-card @minidev/form-field @minidev/input @minidev/button",
    filename: "app/login/page.tsx",
    code: `import Link from "next/link"
import { AuthCard } from "@/components/ui/auth-card"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"

export default function Login() {
  return (
    <main className="grid min-h-svh place-items-center bg-bg p-4">
      <AuthCard title="Sign in" description="Use your work email." footer={<Link href="/signup">Create an account</Link>}>
        <form action="/api/login" method="post" className="space-y-4">
          <FormField id="email" label="Email">
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </FormField>
          <FormField id="password" label="Password">
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </FormField>
          <Button type="submit" className="w-full">Continue</Button>
        </form>
      </AuthCard>
    </main>
  )
}`,
    why: "Labels and errors are wired through FormField, autofill tokens are set, and the primary action is the default ink Button.",
  },
]

const FAQ = [
  {
    q: "Which AI coding tools work with MiniDev UI?",
    a: "Any agent that can read a URL or run a shell command. This page has setup for Claude Code, Cursor, Codex, Windsurf, GitHub Copilot and v0. Everything is public: `/llms.txt`, per-component Markdown at `/docs/<name>.md`, and shadcn registry items at `/r/<name>.json`.",
  },
  {
    q: "Do I need the MCP server?",
    a: "No. The rules file plus `/llms.txt` is enough for an agent to pick, install and use components. The MCP server saves the agent from fetching and searching those files itself.",
  },
  {
    q: "Does the agent need an API key or an account?",
    a: "No. MiniDev UI is MIT licensed and every file the agent reads is a static public URL. Installing runs `npx shadcn@latest add @minidev/<name>` or `npm i minidev-ui-kit`.",
  },
  {
    q: "The agent's output looks gray or unstyled. What went wrong?",
    a: "The token stylesheet is missing or overridden. On the shadcn route, save `/r/styles.css` next to your global CSS, import it after Tailwind, and delete the `:root`, `.dark` and `@theme inline` blocks that `shadcn init` generated. See [Installation](/docs/installation).",
  },
  {
    q: "How do I stop the agent inventing props?",
    a: "The rules files tell it to read `/docs/<name>.md` before using a component and to use only the props shown there. If it still guesses, paste that URL into the chat.",
  },
]

function Snippet({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="space-y-2">
      <p className="text-[0.8125rem] font-medium text-fg">{label}</p>
      {children}
    </div>
  )
}

export default async function AiDocsPage() {
  // The page shows the exact file agents download, so the two cannot drift.
  const agentsMd = await readFile(join(process.cwd(), "public/AGENTS.md"), "utf8")
  return (
    <DocsShell toc={TOC}>
      <JsonLd
        data={graph(
          articleLd({
            title: "Use MiniDev UI with AI agents",
            description: "Set up Claude Code, Cursor, Codex, Windsurf, GitHub Copilot and v0 to generate correct MiniDev UI code: MCP server, llms.txt, Markdown docs and rules files.",
            path: PATH,
            date: UPDATED,
            keywords: ["AI agents", "MCP", "llms.txt", "AGENTS.md", "Cursor rules", "Claude Code skill"],
          }),
          breadcrumbLd([{ name: "Docs", path: "/docs" }, { name: "AI agents", path: PATH }]),
          faqLd(FAQ)
        )}
      />
      <article className="max-w-3xl">
        <header>
          <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">AI agents</p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.035em] text-balance text-fg sm:text-5xl">Use MiniDev UI with AI agents</h1>
          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-pretty text-fg-muted">
            MiniDev UI is written to be read by agents as well as people. Every component is one file with documented props, a Markdown page and a
            registry item, so Claude Code, Cursor, Codex and the rest can find the right piece, install it in one command and use it correctly the first time.
          </p>
        </header>

        <section className="mt-12 space-y-5">
          <DocsH2 id="quick-start">Quick start</DocsH2>
          <p className={body}>No setup needed. Paste this into any agent at the start of a task:</p>
          <CodeBlock language="text" filename="prompt" code={QUICK} />
          <p className={body}>
            For work you repeat, install the rules file for your tool below so the agent knows the kit without being told, and add the MCP server
            so it can search components itself.
          </p>
        </section>

        <section className="mt-16 space-y-6">
          <DocsH2 id="setup">Setup by tool</DocsH2>
          {TOOLS.map((t) => (
            <section key={t.id} aria-labelledby={t.id} className="space-y-4 rounded-xl border border-border bg-surface p-5 shadow-raised">
              <h3 id={t.id} className="scroll-mt-24 text-[1.125rem] font-medium tracking-[-0.02em] text-fg">
                {t.name}
              </h3>
              <Snippet label={t.mcp ? "1. Rules" : "Context"}>
                <p className="text-[0.875rem] leading-[1.6] text-fg-muted">{t.rules.note}</p>
                <CodeBlock language={t.id === "v0" ? "text" : "bash"} code={t.rules.code} />
              </Snippet>
              {t.mcp ? (
                <Snippet label="2. MCP server">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[0.875rem] leading-[1.6] text-fg-muted">{t.mcp.note}</p>
                    {t.mcp.oneClick ? (
                      <Button size="sm" variant="outline" render={<a href={t.mcp.oneClick.href} />}>
                        {t.mcp.oneClick.label} <ArrowUpRightIcon aria-hidden />
                      </Button>
                    ) : null}
                  </div>
                  <CodeBlock language={t.mcp.language} filename={t.mcp.filename} code={t.mcp.code} />
                </Snippet>
              ) : null}
            </section>
          ))}
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="mcp">MCP server</DocsH2>
          <p className={body}>
            A Model Context Protocol server, hosted at <code className={code}>{MCP_URL}</code> (Streamable HTTP). It gives the agent the MiniDev
            catalogue and docs as tools, so it can look up the right component and its props without leaving the editor. Nothing to install, no
            account, no key.
          </p>
          <CodeBlock language="bash" code={`claude mcp add --transport http minidev-ui ${MCP_URL}`} />
          <p className={body}>
            Tools: <code className={code}>search_components</code>, <code className={code}>list_components</code>, <code className={code}>get_component</code>,{" "}
            <code className={code}>get_example</code>, <code className={code}>get_design_rules</code> and <code className={code}>get_install_instructions</code>. To run it
            locally over stdio instead, clone the repo and point your client at <code className={code}>node mcp/server.mjs</code>.
          </p>
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="context">Docs agents can read</DocsH2>
          <p className={body}>Plain text and JSON at stable URLs. Point any agent at them, or paste them into a chat.</p>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface shadow-raised">
            {SOURCES.map((s) => (
              <li key={s.path} className="flex items-start justify-between gap-4 p-4">
                <div className="min-w-0">
                  <a href={s.path} className={`font-mono text-[0.8125rem] break-all ${link}`}>
                    {s.path}
                  </a>
                  <p className="mt-1 text-[0.8125rem] leading-[1.6] text-fg-muted">{s.what}</p>
                </div>
                <CopyButton value={abs(s.path)} size="xs" variant="ghost" label="Copy URL" className="shrink-0" />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="rules">Rules files</DocsH2>
          <p className={body}>
            Three files with the same rules in the format each tool expects: how to install, which tokens to use, how buttons and links work, the
            spring presets, and the gotchas agents hit most.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {FILES.map((f) => (
              <div key={f.href} className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-4 shadow-raised">
                <div>
                  <p className="font-mono text-[0.8125rem] font-medium text-fg">{f.name}</p>
                  <p className="mt-1 text-[0.8125rem] leading-[1.6] text-fg-muted">{f.for}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="xs" variant="outline" render={<a href={f.href} download={f.name} />}>
                    <DownloadIcon aria-hidden /> Download
                  </Button>
                  <CopyButton value={abs(f.href)} size="xs" variant="ghost" label="Copy URL" />
                </div>
              </div>
            ))}
          </div>
          <CodeBlock language="md" filename="AGENTS.md" code={agentsMd} />
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="prompts">Prompts that work</DocsH2>
          <p className={body}>
            Name the library, say what the screen is for, and let the agent choose components. Each prompt below is followed by what a correct answer
            looks like: one install command, then code that uses only documented props and semantic tokens.
          </p>
          <ol className="space-y-10">
            {PROMPTS.map((p, i) => (
              <li key={p.install} className="space-y-3">
                <div className="flex gap-3 rounded-xl border border-accent-line bg-accent-soft p-4">
                  <BotIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-fg" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="font-mono text-[11px] tracking-[0.06em] text-accent-fg uppercase">Prompt {i + 1}</p>
                    <p className="text-[0.9375rem] leading-[1.6] text-fg">{p.prompt}</p>
                    <CopyButton value={p.prompt} size="xs" variant="ghost" label="Copy prompt" />
                  </div>
                </div>
                <CodeBlock language="bash" code={p.install} />
                <CodeBlock language="tsx" filename={p.filename} code={p.code} />
                <p className="text-[0.875rem] leading-[1.6] text-fg-muted">
                  <span className="font-medium text-fg">Why it is right: </span>
                  {p.why}
                </p>
              </li>
            ))}
          </ol>
          <p className={body}>
            More examples live on every component page. Start with <Link href="/docs/data-table" className={link}>DataTable</Link> or browse the{" "}
            <Link href="/gallery" className={link}>gallery</Link>.
          </p>
        </section>

        <FaqList faq={FAQ} />
      </article>
    </DocsShell>
  )
}
