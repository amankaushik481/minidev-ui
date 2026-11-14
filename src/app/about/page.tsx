import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { ContentShell, Crumbs, StudioNote } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { GUIDES } from "@/content/guides"
import { TOOLS } from "@/content/tools"
import { GLOSSARY } from "@/content/glossary"
import { breadcrumbLd, graph, meta, personLd } from "@/lib/seo"
import { SITE } from "@/lib/site"

export const metadata: Metadata = meta({
  title: "About MiniDev UI: A Free Component Library Built for AI Agents",
  description: "MiniDev UI is a free, MIT licensed React and Tailwind CSS v4 component library built by Aman Kaushik and the MiniDev studio, designed so AI coding agents can find, install and use it correctly. How it is made and tested.",
  path: "/about",
  keywords: ["minidev ui", "about minidev", "aman kaushik", "free react component library maintainer", "UI library for AI agents", "llms.txt", "MCP server"],
})

/** A route handler serving text/markdown, so a plain link: next/link would try to client-navigate to it. */
const BUTTON_MD = "/docs/button/md"

const FACTS = () => [
  [String(COMPONENT_INDEX.length), "components, blocks and motion pieces"],
  [String(GUIDES.length), "long-form guides"],
  [String(TOOLS.length), "free browser tools"],
  [String(GLOSSARY.length), "glossary terms"],
]

export default function AboutPage() {
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          { "@type": "AboutPage", name: "About MiniDev UI", url: `${SITE.url}/about`, mainEntity: { "@id": `${SITE.url}/about#aman` } },
          personLd(),
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "About", path: "/about" }]),
        )}
      />
      <div className="mx-auto max-w-3xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "About" }]} />
        <h1 className="mt-4 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-[3.5rem]">About MiniDev UI</h1>
        <p className="mt-5 text-[1.125rem] leading-[1.65] text-fg-muted">A free component library for the screens products are made of, built and maintained by a small studio that uses it every day, and written so an AI coding agent can use it as well as a person can.</p>

        <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FACTS().map(([n, label]) => (
            <div key={label} className="rounded-2xl border border-border bg-surface p-4 shadow-raised">
              <dt className="text-[0.75rem] text-fg-subtle">{label}</dt>
              <dd className="mt-1 text-[1.75rem] font-medium tracking-[-0.04em] text-fg tabular-nums">{n}</dd>
            </div>
          ))}
        </dl>

        <div className="prose-minidev mt-12 space-y-5 text-[1.0625rem] leading-[1.75] text-fg-muted">
          <h2 id="who" className="text-[1.5rem] font-medium tracking-[-0.03em] text-fg">Who makes it</h2>
          <p>
            MiniDev UI is written by <strong className="text-fg">Aman Kaushik</strong>, founder of <a href={SITE.studio.url} className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">MiniDev</a>, a product studio based in India that has shipped more than twenty products over five years. The kit started as the internal set of components the studio reused on client work: billing pages, data tables, settings screens, dashboards and the marketing sites that sit in front of them.
          </p>
          <p>
            Every component, guide and tool on this site is reviewed and tested by the same person who uses them in production. Where a component has a limit, the docs say so.
          </p>

          <h2 id="why-free" className="text-[1.5rem] font-medium tracking-[-0.03em] text-fg">Why it is free</h2>
          <p>
            The library is MIT licensed, with no paid tier and no attribution requirement. The studio earns its living building products, and a kit that other teams trust is the best introduction it could have. If you want the product built rather than the parts, the <Link href="/studio" className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">studio page</Link> explains how that works.
          </p>

          <h2 id="agents" className="text-[1.5rem] font-medium tracking-[-0.03em] text-fg">Built for AI coding agents</h2>
          <p>
            A lot of UI code is now written by an agent such as Claude Code, Cursor, Codex or v0, with a person reviewing it. Those agents do best with a library they can read in plain text, install with one command and check against written rules. So every part of MiniDev UI is published in a form an agent can use without scraping the site:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li><Link href="/docs/ai" className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">Setup for AI agents</Link>: one page with the steps for Claude Code, Cursor, Codex, Windsurf, GitHub Copilot and v0.</li>
            <li>A hosted MCP server, <code className="font-mono text-[0.9em] text-fg">ui.minidev.pro/mcp</code>, with tools to list and search components, read a component&apos;s source, props and examples, read the design rules and get install steps.</li>
            <li><a href="/llms.txt" className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">llms.txt</a> and <a href="/llms-full.txt" className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">llms-full.txt</a>: the whole catalogue as one text file.</li>
            <li>Every component page as Markdown, for example <a href={BUTTON_MD} className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">/docs/button/md</a>, with install command, imports, props and examples.</li>
            <li>Rules files to drop into a project: <a href="/AGENTS.md" className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">AGENTS.md</a>, <a href="/rules/minidev-ui.mdc" className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">Cursor rules</a> and a <a href="/skill/minidev-ui/SKILL.md" className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">Claude skill</a>. They tell the agent the house rules: semantic tokens, no hex colours, the shadow set, keyboard support.</li>
            <li>One install command per component, <code className="font-mono text-[0.9em] text-fg">npx shadcn@latest add {SITE.registry}/&lt;name&gt;</code>, which writes a single file the project owns. Nothing to wrap, nothing hidden in a package.</li>
          </ul>
          <p>
            None of this makes an agent infallible. It cuts down the guessing: the props in the docs come from the TypeScript types, the examples are the ones rendered on the site, and the rules are the same ones the components were built to. If an agent keeps getting a component wrong, that is usually a docs problem, and an issue on GitHub is the fastest way to get it fixed.
          </p>

          <h2 id="how" className="text-[1.5rem] font-medium tracking-[-0.03em] text-fg">How it is built</h2>
          <p>
            Components are React 19 and Tailwind CSS v4, with <Link href="/glossary/base-ui" className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">Base UI</Link> for focus, keyboard and ARIA behaviour and the motion library for animation. Each one is a single file that installs through the shadcn CLI, so you own the code. All of them read one set of <Link href="/glossary/semantic-tokens" className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">semantic tokens</Link>, which is why a hero, a table and a dialog from this kit match without tuning.
          </p>
          <p>
            Before a component ships it is rendered with no props, in light and dark, on desktop and phone widths, used with the keyboard only, and checked with reduced motion on. The API reference table on each page is generated from the component&apos;s TypeScript props, so it cannot drift from the code.
          </p>

          <h2 id="contact" className="text-[1.5rem] font-medium tracking-[-0.03em] text-fg">Contact and source</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Source code, issues and pull requests: {SITE.github ? <a href={SITE.github} className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">GitHub</a> : "GitHub"}</li>
            <li>Package: <a href={SITE.npm} className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">{SITE.npmPackage} on npm</a></li>
            <li>Email: <a href={`mailto:${SITE.studio.email}`} className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">{SITE.studio.email}</a></li>
            <li>Security reports: email the address above with steps to reproduce.</li>
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {[["/docs/installation", "Install the kit"], ["/docs/ai", "Set up your agent"], ["/components", "Browse components"], ["/guides", "Read the guides"], ["/changelog", "What changed"]].map(([href, label]) => (
            <Link key={href} href={href} className="group inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-[0.875rem] text-fg shadow-key hover:border-border-strong">
              {label} <ArrowRightIcon className="size-3.5 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
        <StudioNote />
      </div>
    </ContentShell>
  )
}
