"use client"
import * as React from "react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { getPlaygroundDemos } from "@/lib/playground-demos"
import { CopyButton } from "@/registry/ui/copy-button"
import { StatusBadge } from "@/registry/ui/status-badge"
import { Callout } from "@/registry/ui/callout"

export default function PlaygroundPage() {
  const params = useParams<{ name: string }>()
  const entry = COMPONENT_INDEX.find((c) => c.name === params.name)
  if (!entry) notFound()
  const demos = getPlaygroundDemos(entry.name)
  const importLine = `import { ${entry.title} } from "${entry.import}"`

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 text-fg">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/docs" className="text-xs font-medium text-fg-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">Docs</Link>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-medium tracking-[-0.022em]">{entry.title}</h1>
            <StatusBadge tone={entry.tier === "premium" ? "accent" : "neutral"}>{entry.tier}</StatusBadge>
          </div>
          <p className="mt-1 font-mono text-xs text-fg-muted">{entry.path}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="h-8 rounded-lg border border-border px-3 text-xs" onClick={() => document.documentElement.classList.remove("dark")}>Light</button>
          <button type="button" className="h-8 rounded-lg border border-border px-3 text-xs" onClick={() => document.documentElement.classList.add("dark")}>Dark</button>
        </div>
      </div>

      <div className="mb-8 flex items-center gap-2 rounded-xl border border-border bg-sunken p-3 font-mono text-xs">
        <code className="flex-1 overflow-x-auto">{importLine}</code>
        <CopyButton value={importLine} size="sm" />
      </div>

      {demos ? (
        <div className="space-y-8">
          {demos.map((d) => (
            <section key={d.label} className="space-y-3">
              <h2 className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{d.label}</h2>
              <div className="flex flex-wrap items-start gap-4 rounded-2xl border border-border bg-surface p-6 shadow-highlight">
                {d.node}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <Callout title="Generic playground" tone="info">
            No curated states yet for <span className="font-mono text-fg">{entry.name}</span>. Use the import path and open a related gallery.
          </Callout>
          <div className="flex flex-wrap gap-3">
            <Link href={`/docs/${entry.name}`} className="inline-flex h-9 items-center rounded-lg border border-border bg-surface px-4 text-sm font-medium">Docs</Link>
            <Link href="/gallery" className="inline-flex h-9 items-center rounded-lg bg-accent px-4 text-sm font-medium text-primary-foreground">Gallery</Link>
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-6 text-sm">
        <Link href={`/docs/${entry.name}`} className="text-accent underline-offset-4 hover:underline">Component docs</Link>
        <Link href="/docs" className="text-fg-muted underline-offset-4 hover:underline">All components</Link>
      </div>
    </main>
  )
}
