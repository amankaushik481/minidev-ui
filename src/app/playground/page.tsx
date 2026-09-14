"use client"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"
import Link from "next/link"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { CURATED_PLAYGROUND } from "@/lib/playground-demos"

export default function PlaygroundIndex() {
  const featured = COMPONENT_INDEX.filter((c) => (CURATED_PLAYGROUND as readonly string[]).includes(c.name))
  return (
    <div className="min-h-full bg-bg text-fg">
      <SiteHeader solid />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 text-fg">
      <h1 className="text-4xl font-medium tracking-[-0.026em]">Playground</h1>
      <p className="mt-3 max-w-xl text-sm leading-[1.55] text-fg-muted">
        Curated interactive states with light/dark. Every component also has docs with copy/install.
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((c) => (
          <Link key={c.name} href={`/playground/${c.name}`} className="rounded-xl border border-border bg-surface px-4 py-3 outline-none hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent">
            <p className="text-sm font-medium">{c.title}</p>
            <p className="font-mono text-[11px] text-fg-muted">{c.name} · {c.tier}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-fg-muted">
        Or open any component from <Link href="/docs" className="text-accent underline-offset-4 hover:underline">docs</Link>.
      </p>
    </main>
      <SiteFooter />
    </div>
  )
}
