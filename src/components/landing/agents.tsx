"use client"
import Link from "next/link"
import { ArrowRightIcon, FileTextIcon, PlugIcon, RulerIcon, TerminalIcon } from "lucide-react"
import { SITE } from "@/lib/site"
import { Button } from "@/registry/ui/button"
import { CodeBlock } from "@/registry/ui/code-block"
import { SectionHead } from "@/components/landing/section-head"
import { COUNTS } from "@/components/landing/hero"

const SETUP = `# Give Claude Code the whole library as tools
claude mcp add --transport http minidev-ui https://ui.minidev.pro/mcp

# Add one component to any shadcn project
npx shadcn@latest add ${SITE.registry}/button

# Or hand any model the index
curl ${SITE.url}/llms.txt`

const POINTS = [
  {
    icon: TerminalIcon,
    t: "One command, one file",
    d: `npx shadcn@latest add ${SITE.registry}/<name> writes a single readable file into the repo. No runtime, no provider, nothing hidden for an agent to guess about.`,
  },
  {
    icon: PlugIcon,
    t: "An MCP server",
    d: "Claude Code, Cursor and Codex can search the catalog and read a component's docs and source without leaving the task.",
  },
  {
    icon: FileTextIcon,
    t: "llms.txt and Markdown docs",
    d: `/llms.txt lists all ${COUNTS.total} components, each with a one-line purpose and a link to its Markdown docs, and every component's docs are plain Markdown a model can read.`,
  },
  {
    icon: RulerIcon,
    t: "Every value is a token",
    d: "Colour, shadow, radius and motion come from a small named set, with written rules. Generated screens match the kit instead of drifting.",
  },
]

export function AgentSection() {
  return (
    <section aria-labelledby="agents-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="min-w-0">
          <SectionHead
            id="agents-title"
            align="left"
            eyebrow="Built for AI agents"
            title="The UI kit your agent gets right the first time."
            body="Agents write UI from what they can read. MiniDev UI gives them the catalog, the source and the rules in plain text, so the screen they build looks like it came from a designer."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex gap-4">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent-line bg-accent-soft text-accent-fg">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] font-medium text-fg">{t}</h3>
                  <p className="mt-1 text-[0.8125rem] leading-[1.6] break-words text-fg-muted">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:pt-12">
          <CodeBlock filename="terminal" language="bash" code={SETUP} />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button size="lg" render={<Link href="/docs/ai" />}>
              Set up your agent <ArrowRightIcon />
            </Button>
            <Button size="lg" variant="outline" render={<a href="/llms.txt" />}>
              Read /llms.txt
            </Button>
            <a
              href="/llms-full.txt"
              className="rounded-md px-1 font-mono text-[12px] text-fg-muted underline decoration-border-strong underline-offset-4 outline-none hover:text-fg hover:decoration-fg-subtle focus-visible:ring-2 focus-visible:ring-accent sm:ml-1"
            >
              /llms-full.txt
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
