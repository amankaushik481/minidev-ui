"use client"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"
import Link from "next/link"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { CopyButton } from "@/registry/ui/copy-button"

const free = COMPONENT_INDEX.filter((c) => c.tier === "free").length
const prem = COMPONENT_INDEX.filter((c) => c.tier === "premium").length

const groups = [
  { id: "ui", label: "UI", items: COMPONENT_INDEX.filter((c) => c.kind === "ui") },
  { id: "block", label: "Blocks", items: COMPONENT_INDEX.filter((c) => c.kind === "block") },
  { id: "premium", label: "Premium", items: COMPONENT_INDEX.filter((c) => c.kind === "premium") },
]

export default function DocsPage() {
  return (
    <div className="min-h-full bg-bg text-fg">
      <SiteHeader solid />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 text-fg">
      <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">MiniDev UI</p>
      <h1 className="mt-2 text-4xl font-medium tracking-[-0.026em]">Docs</h1>
      <p className="mt-3 max-w-2xl text-base leading-[1.55] text-fg-muted">
        {free} free · {prem} premium. Hairline signature, Geist Sans, accent hue 285. Copy a path, open a playground, stay on-token.
      </p>

      <section className="mt-12 space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]">
        <h2 className="text-xl font-medium tracking-[-0.014em]">Install</h2>
        <p className="text-sm text-fg-muted">
          Published as{" "}
          <a className="font-medium text-fg underline-offset-2 hover:underline" href="https://www.npmjs.com/package/minidev-ui-kit">
            minidev-ui-kit
          </a>
          . Also works with yarn / pnpm / bun from the same registry.
        </p>
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-sunken p-3 font-mono text-xs text-fg">
          <span className="flex-1 truncate">npm install minidev-ui-kit</span>
          <CopyButton value="npm install minidev-ui-kit" size="sm" />
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-sunken p-3 font-mono text-xs text-fg">
          <span className="flex-1 truncate">yarn add minidev-ui-kit</span>
          <CopyButton value="yarn add minidev-ui-kit" size="sm" />
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-sunken p-3 font-mono text-xs text-fg">
          <span className="flex-1 truncate">{'import { Button } from "minidev-ui-kit/ui/button"'}</span>
          <CopyButton value={'import { Button } from "minidev-ui-kit/ui/button"'} size="sm" />
        </div>
        <p className="text-xs text-fg-muted">
          Next.js: add <code className="rounded bg-sunken px-1 font-mono text-[11px] text-fg">transpilePackages: [&quot;minidev-ui-kit&quot;]</code>. Or copy from the local registry paths below.
        </p>
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-sunken p-3 font-mono text-xs text-fg">
          <span className="flex-1 truncate">import {"{ Button }"} from "@/registry/ui/button"</span>
          <CopyButton value={'import { Button } from "@/registry/ui/button"'} size="sm" />
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-medium tracking-[-0.014em]">Design law</h2>
        <ul className="space-y-2 text-sm leading-[1.55] text-fg-muted">
          <li className="border-l border-accent/40 pl-3"><span className="font-medium text-fg">Geist Sans / Mono</span> — never Inter</li>
          <li className="border-l border-accent/40 pl-3"><span className="font-medium text-fg">Accent hue 285</span> — semantic OKLCH tokens only</li>
          <li className="border-l border-accent/40 pl-3"><span className="font-medium text-fg">Hairline</span> — 1px lines + top highlights; no blur shadows outside overlays</li>
          <li className="border-l border-accent/40 pl-3"><span className="font-medium text-fg">Audit gate</span> — screenshots + axe before ship</li>
        </ul>
        <p className="text-sm text-fg-muted">Full spec lives in <code className="rounded bg-sunken px-1.5 py-0.5 font-mono text-xs text-fg">DESIGN.md</code>.</p>
      </section>

      <section className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href="/gallery" className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-primary-foreground sm:w-auto">Open gallery</Link>
        <Link href="/playground/button" className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-fg sm:w-auto">Try playground</Link>
      </section>

      {groups.map((g) => (
        <section key={g.id} className="mt-14">
          <div className="mb-4 flex items-end justify-between gap-3 border-b border-border pb-2">
            <h2 className="text-lg font-medium tracking-[-0.008em]">{g.label}</h2>
            <p className="text-xs tabular-nums text-fg-muted">{g.items.length}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((c) => (
              <Link
                key={c.name}
                href={`/docs/${c.name}`}
                className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-fg outline-none transition-[border-color] hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="font-medium">{c.title}</span>
                <span className="mt-0.5 block font-mono text-[11px] text-fg-muted">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
      <SiteFooter />
    </div>
  )
}
