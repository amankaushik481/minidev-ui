import type { Metadata } from "next"
import Link from "next/link"
import { CHANGELOG, type Release } from "@/content/changelog"
import { ContentShell, Crumbs } from "@/components/seo/prose"
import { JsonLd } from "@/components/seo/json-ld"
import { abs, breadcrumbLd, graph, meta } from "@/lib/seo"

export const metadata: Metadata = meta({
  title: "Changelog: New Components, Tools and Guides",
  description: "What changed in MiniDev UI, release by release: new React components, tooling for AI coding agents (MCP server, llms.txt, Markdown docs), templates, free tools, guides and fixes.",
  path: "/changelog",
})

/* In the repo, not yet in a numbered release. Taken from git history since v0.6; move into CHANGELOG when it ships. */
const UNRELEASED: Release["items"] = [
  { text: "Setup for AI agents: one page with the steps for Claude Code, Cursor, Codex, Windsurf, GitHub Copilot and v0.", href: "/docs/ai" },
  { text: "A hosted MCP server at ui.minidev.pro/mcp, with six tools: list and search components, read a component's source, props and examples, read the design rules, and get install steps for your framework.", href: "/docs/ai#mcp" },
  { text: "Every component docs page is also served as Markdown at /docs/<name>/md, with install command, imports, props and examples.", href: "/docs/ai#context" },
  { text: "Rules files for agents: AGENTS.md, a Cursor rules file and a Claude skill, each carrying the design rules the components are built to.", href: "/docs/ai#rules" },
  { text: "Six 'types of' guides with a short answer, a picker table and live examples: buttons, form inputs, modals and overlays, navigation menus, loading and feedback states, and charts.", href: "/guides/types-of-buttons" },
  { text: "Ten head-to-head comparisons, such as shadcn/ui vs Material UI and Aceternity UI vs Magic UI, and alternatives pages for shadcn/ui, Tailwind Plus, Material UI, Chakra UI, Aceternity UI and Magic UI.", href: "/alternatives" },
  { text: "Live examples with code on 150 more component pages.", href: "/docs" },
  { text: "A faster site: the landing page's hero paints without JavaScript, sections below the fold load their code when you reach them, template cards use still images, and the cursor light and font files are lighter." },
]

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })

function Items({ items }: { items: Release["items"] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((it) => (
        <li key={it.text} className="text-[0.9375rem] leading-[1.65] text-fg-muted">
          {it.text}{" "}
          {it.href ? <Link href={it.href} className="whitespace-nowrap text-accent-fg underline decoration-accent-line underline-offset-4">View</Link> : null}
        </li>
      ))}
    </ul>
  )
}

export default function Changelog() {
  return (
    <ContentShell>
      <JsonLd
        data={graph(
          {
            "@type": "Blog",
            name: "MiniDev UI changelog",
            url: abs("/changelog"),
            blogPost: CHANGELOG.map((r) => ({ "@type": "BlogPosting", headline: `${r.version}: ${r.title}`, datePublished: r.date, url: abs(`/changelog#v${r.version.replace(/\./g, "-")}`) })),
          },
          breadcrumbLd([{ name: "MiniDev UI", path: "/" }, { name: "Changelog", path: "/changelog" }]),
        )}
      />
      <div className="mx-auto max-w-3xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-8">
        <Crumbs items={[{ name: "MiniDev UI", href: "/" }, { name: "Changelog" }]} />
        <h1 className="mt-4 text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-fg sm:text-6xl">Changelog</h1>
        <p className="mt-5 text-[1.125rem] leading-[1.65] text-fg-muted">Every release of MiniDev UI, newest first.</p>
        <ol className="mt-12 space-y-12 border-l border-border pl-6">
          <li id="unreleased" className="relative scroll-mt-24">
            <span aria-hidden className="absolute top-2 -left-[29px] size-2.5 rounded-full border-2 border-bg bg-border-strong" />
            <p className="font-mono text-[12px] text-fg-subtle">Unreleased · in the repository, not yet versioned</p>
            <h2 className="mt-1 text-[1.5rem] font-medium tracking-[-0.03em] text-fg">Built for AI coding agents</h2>
            <Items items={UNRELEASED} />
          </li>
          {CHANGELOG.map((r) => (
            <li key={r.version} id={`v${r.version.replace(/\./g, "-")}`} className="relative scroll-mt-24">
              <span aria-hidden className="absolute top-2 -left-[29px] size-2.5 rounded-full border-2 border-bg bg-accent" />
              <p className="font-mono text-[12px] text-fg-subtle">
                v{r.version} · <time dateTime={r.date}>{fmt(r.date)}</time>
              </p>
              <h2 className="mt-1 text-[1.5rem] font-medium tracking-[-0.03em] text-fg">{r.title}</h2>
              <Items items={r.items} />
            </li>
          ))}
        </ol>
      </div>
    </ContentShell>
  )
}
