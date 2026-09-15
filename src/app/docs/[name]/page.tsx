"use client"
import * as React from "react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { CopyButton } from "@/registry/ui/copy-button"
import { StatusBadge } from "@/registry/ui/status-badge"

export default function ComponentDocsPage() {
  const params = useParams<{ name: string }>()
  const entry = COMPONENT_INDEX.find((c) => c.name === params.name)
  if (!entry) {
    notFound()
  }
  const importLine = `import { ${entry.title} } from "${entry.import}"`
  const pkgImport = entry.import.replace("@/registry/", "minidev-ui-kit/")
  const pkgImportLine = `import { ${entry.title} } from "${pkgImport}"`
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-fg">
      <Link href="/docs" className="text-xs font-medium text-fg-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">← Docs</Link>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h1 className="text-3xl font-medium tracking-[-0.022em]">{entry.title}</h1>
        <StatusBadge tone={entry.tier === "premium" ? "accent" : "neutral"}>{entry.tier}</StatusBadge>
        <StatusBadge tone="neutral">{entry.kind}</StatusBadge>
      </div>
      <p className="mt-2 font-mono text-xs text-fg-muted">{entry.path}</p>

      <section className="mt-8 space-y-2">
        <h2 className="text-sm font-medium text-fg">npm package</h2>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-sunken p-3 font-mono text-xs">
          <code className="flex-1 overflow-x-auto text-fg">{pkgImportLine}</code>
          <CopyButton value={pkgImportLine} size="sm" />
        </div>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="text-sm font-medium text-fg">Local registry import</h2>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-sunken p-3 font-mono text-xs">
          <code className="flex-1 overflow-x-auto text-fg">{importLine}</code>
          <CopyButton value={importLine} size="sm" />
        </div>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="text-sm font-medium text-fg">File</h2>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-sunken p-3 font-mono text-xs">
          <code className="flex-1 overflow-x-auto text-fg">{entry.path}</code>
          <CopyButton value={entry.path} size="sm" />
        </div>
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/playground/${entry.name}`}
          className="inline-flex h-9 items-center rounded-lg bg-accent px-4 text-sm font-medium text-primary-foreground"
        >
          Open playground
        </Link>
        <Link
          href={entry.tier === "premium" ? "/gallery/premium-motion" : "/gallery"}
          className="inline-flex h-9 items-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-fg"
        >
          Browse gallery
        </Link>
      </section>

      <section className="mt-10 rounded-xl border border-border bg-surface p-5 text-sm leading-[1.55] text-fg-muted">
        <p className="font-medium text-fg">Usage notes</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Respect <code className="font-mono text-xs text-fg">DESIGN.md</code> — semantic tokens only.</li>
          <li>Prefer composition over one-off colors or blur shadows.</li>
          <li>Premium blocks set <code className="font-mono text-xs text-fg">data-tier=&quot;premium&quot;</code>.</li>
          {entry.tier === "premium" ? <li>Gate commercially; keep free UI MIT forever.</li> : <li>MIT — ship in product UI freely.</li>}
        </ul>
      </section>
    </main>
  )
}
