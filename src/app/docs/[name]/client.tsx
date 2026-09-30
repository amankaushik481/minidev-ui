"use client"
import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, MoonIcon, PackageIcon, RotateCcwIcon, SparklesIcon, SunIcon } from "lucide-react"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { REGISTRY_LOADERS } from "@/lib/registry-loaders"
import { getPlaygroundDemos } from "@/lib/playground-demos"
import { GALLERY_ENTRIES } from "@/lib/gallery-catalog"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/registry/ui/code-block"
import { Skeleton } from "@/registry/ui/skeleton"
import { DocsH2, DocsShell, Tabbed, humanize } from "../_components/docs-shell"
import { componentCopy } from "@/lib/seo-routes"
import { componentsInCategory } from "@/content/component-seo"

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

function useModule(name: string) {
  const [mod, setMod] = React.useState<Record<string, unknown> | null>(null)
  React.useEffect(() => {
    let live = true
    setMod(null)
    REGISTRY_LOADERS[name]?.().then((m) => live && setMod(m)).catch(() => live && setMod({}))
    return () => {
      live = false
    }
  }, [name])
  return mod
}

function useSource(name: string) {
  const [src, setSrc] = React.useState<string | null>(null)
  React.useEffect(() => {
    let live = true
    setSrc(null)
    fetch(`/r/${name}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => live && setSrc(j?.files?.[0]?.content ?? ""))
      .catch(() => live && setSrc(""))
    return () => {
      live = false
    }
  }, [name])
  return src
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

export function ComponentDocs({ name, api }: { name: string; /** Server-rendered API reference. */ api?: React.ReactNode }) {
  const params = { name }
  const i = COMPONENT_INDEX.findIndex((c) => c.name === params.name)
  const entry = COMPONENT_INDEX[i]
  const mod = useModule(params.name)
  const src = useSource(params.name)
  const [dark, setDark] = React.useState(false)
  const [nonce, setNonce] = React.useState(0)

  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  if (!entry) notFound()

  const prev = COMPONENT_INDEX[i - 1]
  const next = COMPONENT_INDEX[i + 1]
  const demos = getPlaygroundDemos(entry.name)
  const Comp = mod?.[entry.title] as React.ComponentType | undefined
  const pkgPath = entry.import.replace("@/registry/", `${SITE.npmPackage}/`)
  const galleries = entry.galleries.map((s) => GALLERY_ENTRIES.find((g) => g.slug === s)).filter(Boolean) as typeof GALLERY_ENTRIES
  const kindLabel = entry.kind === "ui" ? "Component" : entry.kind === "block" ? "Block" : "Motion"
  const copy = componentCopy(entry)
  const related = copy.category
    ? componentsInCategory(copy.category.id)
        .filter((n) => n !== entry.name)
        .map((n) => COMPONENT_INDEX.find((c) => c.name === n))
        .filter((c): c is (typeof COMPONENT_INDEX)[number] => Boolean(c))
        .sort((a, b) => Number(b.kind === entry.kind) - Number(a.kind === entry.kind))
        .slice(0, 6)
    : []

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
    { label: "shadcn CLI", content: <CodeBlock language="bash" code={`npx shadcn@latest add ${SITE.url}/r/${entry.name}.json`} /> },
    {
      label: "npm",
      content: (
        <div className="space-y-3">
          <CodeBlock language="bash" code={`npm i ${SITE.npmPackage}${entry.deps.length ? " " + entry.deps.join(" ") : ""}`} />
          <CodeBlock language="tsx" code={`import { ${entry.title} } from "${pkgPath}"`} />
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

  const toc = [
    { id: "preview", label: "Preview" },
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Usage" },
    ...(api ? [{ id: "api", label: "API reference" }] : []),
    ...(entry.registryDeps.length || entry.deps.length ? [{ id: "dependencies", label: "Dependencies" }] : []),
    ...(galleries.length ? [{ id: "examples", label: "Examples" }] : []),
    ...(related.length ? [{ id: "related", label: "Related" }] : []),
  ]

  return (
    <DocsShell toc={toc}>
      <article className="max-w-4xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-fg-subtle">
          <Link href="/docs" className="hover:text-fg">Docs</Link>
          <span>/</span>
          {copy.category ? (
            <Link href={`/components/${copy.category.id}`} className="hover:text-fg">{copy.category.label}</Link>
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
          {copy.description}
        </p>
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
                  <Stage dark={dark} onDark={() => setDark((d) => !d)} onReset={() => setNonce((n) => n + 1)}>
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
          <CodeBlock
            language="tsx"
            code={
              entry.usage
                ? `import { ${entry.title} } from "@/components/ui/${entry.name}"\n\nexport function Example() {\n  return (\n${entry.usage.split("\n").map((l) => "    " + l).join("\n")}\n  )\n}`
                : `import { ${entry.title} } from "@/components/ui/${entry.name}"\n\nexport function Example() {\n  return <${entry.title} />\n}`
            }
          />
        </section>

        {api ? (
          <section className="mt-14 space-y-5">
            <DocsH2 id="api">API reference</DocsH2>
            {api}
          </section>
        ) : null}

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
                    <Link key={d} href={`/docs/${d}`} className="rounded-md border border-border bg-surface px-2 py-0.5 text-[12px] font-medium text-fg shadow-key hover:border-border-strong">{humanize(COMPONENT_INDEX.find((c) => c.name === d)?.title ?? d)}</Link>
                  )) : <span className="text-[0.8125rem] text-fg-muted">No other MiniDev files</span>}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {galleries.length ? (
          <section className="mt-14 space-y-5">
            <DocsH2 id="examples">Examples</DocsH2>
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
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-14 space-y-5">
            <DocsH2 id="related">Related {copy.category ? copy.category.label.toLowerCase() : ""} components</DocsH2>
            <div className="grid gap-2 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.name} href={`/docs/${r.name}`} className="group rounded-xl border border-border bg-surface px-4 py-3 shadow-raised outline-none transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                  <span className="block text-[0.875rem] font-medium text-fg">{humanize(r.title)}</span>
                  <span className="mt-0.5 line-clamp-2 block text-xs leading-[1.5] text-fg-muted">{componentCopy(r).description}</span>
                </Link>
              ))}
            </div>
            {copy.category ? (
              <Link href={`/components/${copy.category.id}`} className="inline-flex items-center gap-1 text-[0.8125rem] font-medium text-fg hover:underline">
                All {copy.category.h1.replace(/^React /, "")} <ArrowRightIcon className="size-3.5" />
              </Link>
            ) : null}
          </section>
        ) : null}

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
