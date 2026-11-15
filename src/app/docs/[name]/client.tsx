"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, MoonIcon, PackageIcon, RotateCcwIcon, SparklesIcon, SunIcon } from "lucide-react"
import type { ComponentIndexEntry } from "@/lib/component-index"
import { REGISTRY_LOADERS } from "@/lib/registry-loaders"
import { EXAMPLE_LOADERS } from "@/lib/example-loaders"
import type { Example } from "@/registry/examples/types"
import { getPlaygroundDemos } from "@/lib/playground-demos"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/registry/ui/code-block"
import { Skeleton } from "@/registry/ui/skeleton"
import { DocsH2, DocsShell, Tabbed, humanize } from "../_components/docs-shell"
import { PageActions } from "./page-actions"

class PreviewBoundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/** Loads per-component data on the client. The result is tagged with its key, so a new key reads as loading without resetting state in the effect. */
function useLoad<T>(key: string, load: (() => Promise<T>) | undefined, fallback: T): T | null {
  const [got, setGot] = React.useState<{ key: string; value: T } | null>(null)
  React.useEffect(() => {
    let live = true
    ;(load ? load() : Promise.resolve(fallback)).catch(() => fallback).then((value) => live && setGot({ key, value }))
    return () => {
      live = false
    }
    // load and fallback are derived from key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return got?.key === key ? got.value : null
}

const useModule = (name: string) => useLoad<Record<string, unknown>>(name, REGISTRY_LOADERS[name], {})
const useExamples = (name: string) => useLoad<Example[]>(name, EXAMPLE_LOADERS[name] && (() => EXAMPLE_LOADERS[name]().then((m) => m.examples)), [])
const useSource = (name: string) =>
  useLoad<string>(name, () => fetch(`/r/${name}.json`).then((r) => (r.ok ? r.json() : null)).then((j) => j?.files?.[0]?.content ?? ""), "")

function ExampleCard({ ex, dark }: { ex: Example; dark: boolean }) {
  const [showCode, setShowCode] = React.useState(false)
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border shadow-raised", dark && "dark")}>
      <div className="relative min-h-[200px] bg-bg text-fg">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots [--grid-size:14px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />
        <div className="relative flex min-h-[200px] w-full min-w-0 flex-wrap items-center justify-center gap-4 overflow-x-auto p-6 sm:p-10">
          <PreviewBoundary fallback={<p className="text-[13px] text-fg-subtle">This example could not render.</p>}>{ex.node}</PreviewBoundary>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 border-t border-border bg-surface px-4 py-3">
        <div>
          <h3 className="text-[0.9375rem] font-medium text-fg">{ex.title}</h3>
          {ex.description ? <p className="mt-0.5 text-[0.8125rem] leading-[1.55] text-fg-muted">{ex.description}</p> : null}
        </div>
        <button type="button" onClick={() => setShowCode((v) => !v)} aria-expanded={showCode} className="shrink-0 rounded-md border border-border bg-bg px-2.5 py-1 text-[12.5px] font-medium text-fg shadow-key outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
          {showCode ? "Hide code" : "Code"}
        </button>
      </div>
      {showCode ? <div className="border-t border-border"><CodeBlock language="tsx" code={ex.code} className="rounded-none border-0" /></div> : null}
    </div>
  )
}

/** What an example card shows before its live preview loads: the same frame, title and description. */
function ExampleCardShell({ title, description }: { title: string; description?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-raised">
      <div className="grid min-h-[200px] place-items-center bg-bg p-6 sm:p-10">
        <Skeleton className="h-16 w-full max-w-sm" />
      </div>
      <div className="border-t border-border bg-surface px-4 py-3">
        <h3 className="text-[0.9375rem] font-medium text-fg">{title}</h3>
        {description ? <p className="mt-0.5 text-[0.8125rem] leading-[1.55] text-fg-muted">{description}</p> : null}
      </div>
    </div>
  )
}

function Stage({ children, dark, onDark, onReset }: { children: React.ReactNode; dark: boolean; onDark: () => void; onReset: () => void }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border shadow-raised", dark && "dark")}>
      <div className="relative min-h-[320px] bg-bg text-fg">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots [--grid-size:14px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />
        <div className="absolute top-3 right-3 z-10 flex gap-1">
          <button type="button" onClick={onReset} aria-label="Reset preview" className="grid size-7 place-items-center rounded-md border border-border bg-surface text-fg-muted shadow-key outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
            <RotateCcwIcon className="size-3.5" />
          </button>
          <button type="button" onClick={onDark} aria-label={dark ? "Preview in light" : "Preview in dark"} className="grid size-7 place-items-center rounded-md border border-border bg-surface text-fg-muted shadow-key outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
            {dark ? <SunIcon className="size-3.5" /> : <MoonIcon className="size-3.5" />}
          </button>
        </div>
        <div className="relative flex min-h-[320px] w-full min-w-0 flex-wrap items-center justify-center gap-4 overflow-x-auto p-8 sm:p-12">{children}</div>
      </div>
    </div>
  )
}

const noSubscribe = () => () => {}

/** Everything that needs the full component index or the SEO copy is computed on the server and passed in,
 * so those data files never ship to the browser. */
export type DocsData = {
  entry: ComponentIndexEntry
  prev: { name: string; title: string } | null
  next: { name: string; title: string } | null
  galleries: { slug: string; label: string; description: string }[]
  description: string
  category: { id: string; label: string; h1: string } | null
  related: { name: string; title: string; description: string }[]
  depTitles: Record<string, string>
  /** URL path of this page's Markdown twin. */
  md: string
  /** The usage snippet, shared with the Markdown so both say the same thing. */
  usage: string
  /** Every name the component file exports. */
  exports: string[]
  /** The live examples' titles, rendered on the server until the examples load. */
  exampleMeta: { title: string; description?: string }[]
  /** The component needs data props to render, so the preview uses its first example. */
  previewFromExample: boolean
}

export function ComponentDocs({
  data,
  api,
  sections = [],
  learn,
}: {
  data: DocsData
  /** Server-rendered API reference. */
  api?: React.ReactNode
  /** Server-rendered depth sections (when to use, keyboard, accessibility, FAQ), each a full <section>. */
  sections?: { id: string; label: string; node: React.ReactNode }[]
  /** Server-rendered cross links (guides, glossary, block hubs). */
  learn?: React.ReactNode
}) {
  const { entry, prev, next, galleries, description, category, related, depTitles, md, usage, exports, exampleMeta, previewFromExample } = data
  const params = { name: entry.name }
  const mod = useModule(params.name)
  const examples = useExamples(params.name)
  const src = useSource(params.name)
  // Preview theme follows the site until the reader flips it; the server snapshot is light.
  const siteDark = React.useSyncExternalStore(noSubscribe, () => document.documentElement.classList.contains("dark"), () => false)
  const [darkOverride, setDark] = React.useState<boolean | null>(null)
  const dark = darkOverride ?? siteDark
  const [nonce, setNonce] = React.useState(0)

  const demos = getPlaygroundDemos(entry.name)
  const Comp = mod?.[entry.title] as React.ComponentType | undefined
  const pkgPath = entry.import.replace("@/registry/", `${SITE.npmPackage}/`)
  const kindLabel = entry.kind === "ui" ? "Component" : entry.kind === "block" ? "Block" : "Motion"

  const fallback = (
    <div className="max-w-sm text-center">
      <p className="text-[0.9375rem] font-medium text-fg">This one needs real data to render.</p>
      <p className="mt-1.5 text-[0.8125rem] leading-[1.6] text-fg-muted">
        {galleries.length ? "See it wired up with sample data in the gallery." : "Open the Code tab for its props."}
      </p>
      {galleries[0] ? (
        <Link href={`/gallery/${galleries[0].slug}`} className="mt-4 inline-flex h-8 items-center gap-1.5 rounded-lg bg-ink px-3 text-[0.8125rem] font-medium text-on-ink shadow-ink">
          Open {galleries[0].label} <ArrowRightIcon className="size-3.5" />
        </Link>
      ) : null}
    </div>
  )

  const preview = demos ? (
    <div className="flex w-full flex-col items-center gap-8">
      {demos.map((d) => (
        <div key={d.label} className="flex w-full flex-col items-center gap-3">
          <div className="flex w-full flex-wrap items-center justify-center gap-4">{d.node}</div>
          <p className="font-mono text-[10px] tracking-[0.06em] text-fg-subtle uppercase">{d.label}</p>
        </div>
      ))}
    </div>
  ) : previewFromExample && exampleMeta.length ? (
    examples?.[0] ? (
      <div className="flex w-full min-w-0 justify-center">
        <PreviewBoundary key={nonce} fallback={fallback}>{examples[0].node}</PreviewBoundary>
      </div>
    ) : (
      <div className="w-full max-w-md space-y-3"><Skeleton className="h-6 w-1/3" /><Skeleton className="h-24 w-full" /></div>
    )
  ) : mod === null ? (
    <div className="w-full max-w-md space-y-3"><Skeleton className="h-6 w-1/3" /><Skeleton className="h-24 w-full" /></div>
  ) : Comp ? (
    <div className={cn("w-full min-w-0", entry.kind !== "ui" ? "max-w-5xl" : "flex justify-center")}>
      <PreviewBoundary key={nonce} fallback={fallback}>
        <Comp />
      </PreviewBoundary>
    </div>
  ) : (
    fallback
  )

  const install = [
    {
      label: "shadcn CLI",
      content: (
        <div className="space-y-3">
          <CodeBlock language="bash" code={`npx shadcn@latest add ${SITE.registry}/${entry.name}`} />
          <p className="text-[12.5px] leading-[1.6] text-fg-muted">
            MiniDev UI is in the shadcn registry directory, so the short form works with no setup. Older CLI versions can use the full URL: <code className="font-mono text-[11.5px] text-fg">npx shadcn@latest add {SITE.url}/r/{entry.name}.json</code>
          </p>
        </div>
      ),
    },
    {
      label: "npm",
      content: (
        <div className="space-y-3">
          <CodeBlock language="bash" code={`npm i ${SITE.npmPackage}${entry.deps.length ? " " + entry.deps.join(" ") : ""}`} />
          <CodeBlock language="css" filename="globals.css" code={`@import "tailwindcss";\n@import "${SITE.npmPackage}/styles.css";\n@source "../node_modules/${SITE.npmPackage}";`} />
          <CodeBlock language="tsx" code={`import { ${entry.title} } from "${pkgPath}"`} />
          <p className="text-[12.5px] leading-[1.6] text-fg-muted">
            Next.js also needs <code className="font-mono text-[11.5px] text-fg">transpilePackages: [&quot;{SITE.npmPackage}&quot;]</code> in next.config.
          </p>
        </div>
      ),
    },
    {
      label: "Manual",
      content: (
        <ol className="space-y-3 text-[0.875rem] leading-[1.6] text-fg-muted">
          <li className="flex gap-3"><span className="font-mono text-xs text-fg-subtle">1</span><span>Install the dependencies{entry.deps.length ? <>: <span className="font-mono text-[12.5px] text-fg">{entry.deps.join(", ")}</span></> : " (none beyond React)"}.</span></li>
          <li className="flex gap-3"><span className="font-mono text-xs text-fg-subtle">2</span><span>Copy the source from the Code tab into <span className="font-mono text-[12.5px] text-fg">components/ui/{entry.name}.tsx</span>.</span></li>
          <li className="flex gap-3"><span className="font-mono text-xs text-fg-subtle">3</span><span>Make sure your stylesheet includes the <a href="/r/styles.css" className="font-mono text-[12.5px] text-accent-fg underline decoration-accent-line underline-offset-4">tokens</a>.</span></li>
        </ol>
      ),
    },
  ]

  // Before the examples load, the server-known titles stand in, so the section is in the HTML and does not jump.
  const hasExamples = Boolean(galleries.length || (examples ? examples.length : exampleMeta.length))
  const toc = [
    { id: "preview", label: "Preview" },
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Usage" },
    ...(api ? [{ id: "api", label: "API reference" }] : []),
    ...sections.map(({ id, label }) => ({ id, label })),
    ...(entry.registryDeps.length || entry.deps.length ? [{ id: "dependencies", label: "Dependencies" }] : []),
    ...(hasExamples ? [{ id: "examples", label: "Examples" }] : []),
    ...(related.length ? [{ id: "related", label: "Related" }] : []),
    ...(learn ? [{ id: "learn", label: "Learn more" }] : []),
  ]

  return (
    <DocsShell toc={toc}>
      <article className="max-w-4xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-fg-subtle">
          <Link href="/docs" className="hover:text-fg">Docs</Link>
          <span>/</span>
          {category ? (
            <Link href={`/components/${category.id}`} className="hover:text-fg">{category.label}</Link>
          ) : (
            <span>{kindLabel === "Component" ? "Components" : kindLabel === "Block" ? "Blocks" : "Motion"}</span>
          )}
          <span>/</span>
          <span className="text-fg-muted">{humanize(entry.title)}</span>
        </nav>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-medium tracking-[-0.035em] text-fg">{humanize(entry.title)}</h1>
          {entry.kind === "premium" ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-fg">
              <SparklesIcon className="size-3" /> Motion
            </span>
          ) : null}
        </div>
        <p className="mt-3 max-w-2xl text-[1.0625rem] leading-[1.65] text-fg-muted">
          {description}
        </p>
        <div className="mt-5 -ml-2.5">
          <PageActions name={entry.name} title={humanize(entry.title)} md={md} />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-fg-muted shadow-xs">{entry.path}</span>
          <a href={`/r/${entry.name}.json`} className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 font-mono text-fg-muted shadow-xs hover:text-fg">
            /r/{entry.name}.json <ExternalLinkIcon className="size-3" />
          </a>
        </div>

        <section id="preview" className="mt-10 scroll-mt-24">
          <Tabbed
            tabs={[
              {
                label: "Preview",
                content: (
                  <Stage dark={dark} onDark={() => setDark(!dark)} onReset={() => setNonce((n) => n + 1)}>
                    <React.Fragment key={nonce}>{preview}</React.Fragment>
                  </Stage>
                ),
              },
              {
                label: "Code",
                content: src === null ? <Skeleton className="h-80 w-full rounded-xl" /> : <CodeBlock code={src || "// Source unavailable"} language="tsx" filename={`${entry.name}.tsx`} showLineNumbers className="max-h-[640px] overflow-y-auto" />,
              },
            ]}
          />
        </section>

        <section className="mt-14 space-y-5">
          <DocsH2 id="installation">Installation</DocsH2>
          <Tabbed tabs={install} />
        </section>

        <section className="mt-14 space-y-5">
          <DocsH2 id="usage">Usage</DocsH2>
          <CodeBlock language="tsx" code={usage} />
          {exports.length > 1 ? (
            <p className="text-[0.8125rem] leading-[1.7] text-fg-muted">
              Exports{" "}
              {exports.map((x, i) => (
                <React.Fragment key={x}>{i ? " " : ""}<code className="rounded-[5px] border border-border bg-sunken px-1 py-px font-mono text-[0.9em] text-fg">{x}</code></React.Fragment>
              ))}
            </p>
          ) : null}
        </section>

        {api ? (
          <section className="mt-14 space-y-5">
            <DocsH2 id="api">API reference</DocsH2>
            {api}
          </section>
        ) : null}

        {sections.map((s) => (
          <React.Fragment key={s.id}>{s.node}</React.Fragment>
        ))}

        {entry.registryDeps.length || entry.deps.length ? (
          <section className="mt-14 space-y-5">
            <DocsH2 id="dependencies">Dependencies</DocsH2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
                <p className="text-[0.8125rem] font-medium text-fg">npm</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {entry.deps.length ? entry.deps.map((d) => (
                    <span key={d} className="inline-flex items-center gap-1 rounded-md border border-border bg-sunken px-2 py-0.5 font-mono text-[11.5px] text-fg"><PackageIcon className="size-3 text-fg-subtle" />{d}</span>
                  )) : <span className="text-[0.8125rem] text-fg-muted">React only</span>}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
                <p className="text-[0.8125rem] font-medium text-fg">Built from</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {entry.registryDeps.length ? entry.registryDeps.map((d) => (
                    <Link key={d} href={`/docs/${d}`} className="rounded-md border border-border bg-surface px-2 py-0.5 text-[12px] font-medium text-fg shadow-key hover:border-border-strong">{humanize(depTitles[d] ?? d)}</Link>
                  )) : <span className="text-[0.8125rem] text-fg-muted">No other MiniDev files</span>}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {hasExamples ? (
          <section className="mt-14 space-y-5">
            <DocsH2 id="examples">Examples</DocsH2>
            {examples ? (
              examples.length ? (
                <div className="space-y-5">
                  {examples.map((ex) => (
                    <ExampleCard key={ex.title} ex={ex} dark={dark} />
                  ))}
                </div>
              ) : null
            ) : exampleMeta.length ? (
              <div className="space-y-5">
                {exampleMeta.map((ex) => (
                  <ExampleCardShell key={ex.title} title={ex.title} description={ex.description} />
                ))}
              </div>
            ) : null}
            {galleries.length ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {galleries.map((g) => (
                <Link key={g.slug} href={`/gallery/${g.slug}`} className="group flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 shadow-raised outline-none transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                  <span>
                    <span className="block text-[0.875rem] font-medium text-fg">{g.label}</span>
                    <span className="block text-xs text-fg-muted">{g.description}</span>
                  </span>
                  <ArrowRightIcon className="size-4 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
            ) : null}
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-14 space-y-5">
            <DocsH2 id="related">Related components</DocsH2>
            <div className="grid gap-2 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.name} href={`/docs/${r.name}`} className="group rounded-xl border border-border bg-surface px-4 py-3 shadow-raised outline-none transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                  <span className="block text-[0.875rem] font-medium text-fg">{humanize(r.title)}</span>
                  <span className="mt-0.5 line-clamp-2 block text-xs leading-[1.5] text-fg-muted">{r.description}</span>
                </Link>
              ))}
            </div>
            {category ? (
              <Link href={`/components/${category.id}`} className="inline-flex items-center gap-1 text-[0.8125rem] font-medium text-fg hover:underline">
                All {category.h1.replace(/^React /, "")} <ArrowRightIcon className="size-3.5" />
              </Link>
            ) : null}
          </section>
        ) : null}

        {learn}

        <nav aria-label="Pagination" className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/docs/${prev.name}`} className="group rounded-xl border border-border bg-surface p-4 shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
              <span className="flex items-center gap-1 text-xs text-fg-subtle"><ArrowLeftIcon className="size-3" /> Previous</span>
              <span className="mt-1 block text-[0.9375rem] font-medium text-fg">{humanize(prev.title)}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/docs/${next.name}`} className="group rounded-xl border border-border bg-surface p-4 text-right shadow-raised outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
              <span className="flex items-center justify-end gap-1 text-xs text-fg-subtle">Next <ArrowRightIcon className="size-3" /></span>
              <span className="mt-1 block text-[0.9375rem] font-medium text-fg">{humanize(next.title)}</span>
            </Link>
          ) : null}
        </nav>
      </article>
    </DocsShell>
  )
}
