import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, InfoIcon, LightbulbIcon, TriangleAlertIcon } from "lucide-react"
import type { Block, Faq } from "@/content/types"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { componentCopy } from "@/lib/seo-routes"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/registry/ui/code-block"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"

/* ------------------------------------------------------------------ */
/* Inline markup: `code`, **bold**, [label](href)                        */
/* ------------------------------------------------------------------ */

export function Inline({ text }: { text: string }) {
  const out: React.ReactNode[] = []
  const re = /`([^`]+)`|\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1] !== undefined) out.push(<code key={k++} className="rounded-[5px] border border-border bg-sunken px-1.5 py-0.5 font-mono text-[0.86em] text-fg">{m[1]}</code>)
    else if (m[2] !== undefined) out.push(<strong key={k++} className="font-semibold text-fg">{m[2]}</strong>)
    else {
      const href = m[4]
      const external = /^https?:/.test(href)
      out.push(
        external ? (
          <a key={k++} href={href} target="_blank" rel="noopener" className="text-accent-fg underline decoration-accent-line underline-offset-4 hover:decoration-accent">
            {m[3]}
          </a>
        ) : (
          <Link key={k++} href={href} className="text-accent-fg underline decoration-accent-line underline-offset-4 hover:decoration-accent">
            {m[3]}
          </Link>
        ),
      )
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}

/* ------------------------------------------------------------------ */
/* Blocks                                                              */
/* ------------------------------------------------------------------ */

const CALLOUT = {
  note: { icon: InfoIcon, cls: "border-info/25 bg-info/8" },
  tip: { icon: LightbulbIcon, cls: "border-accent-line bg-accent-soft" },
  warning: { icon: TriangleAlertIcon, cls: "border-warning/30 bg-warning/10" },
}

export function ComponentCard({ name }: { name: string }) {
  const e = COMPONENT_INDEX.find((c) => c.name === name)
  if (!e) return null
  const c = componentCopy(e)
  return (
    <Link
      href={`/docs/${e.name}`}
      className="group flex min-w-0 items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-raised outline-none transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="text-[0.9375rem] font-medium text-fg">{c.name}</span>
          <span className="rounded-md border border-border bg-sunken px-1.5 py-px font-mono text-[10.5px] text-fg-muted">{e.kind === "block" ? "block" : e.kind === "premium" ? "motion" : "ui"}</span>
        </span>
        <span className="mt-1 block text-[0.8125rem] leading-[1.55] text-fg-muted">{c.description}</span>
        <span className="mt-3 block truncate font-mono text-[11.5px] text-fg-subtle">npx shadcn@latest add ui.minidev.pro/r/{e.name}.json</span>
      </span>
      <ArrowRightIcon className="mt-1 size-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="text-[1.0625rem] leading-[1.75] text-fg-muted">
                <Inline text={b.text} />
              </p>
            )
          case "h2":
            return (
              <h2 key={i} id={b.id} className="scroll-mt-24 pt-8 text-[1.75rem] leading-[1.15] font-medium tracking-[-0.03em] text-fg">
                <a href={`#${b.id}`} className="outline-none hover:underline hover:decoration-border-strong hover:underline-offset-8">
                  {b.text}
                </a>
              </h2>
            )
          case "h3":
            return (
              <h3 key={i} className="pt-3 text-[1.1875rem] font-medium tracking-[-0.02em] text-fg">
                {b.text}
              </h3>
            )
          case "code":
            return <CodeBlock key={i} code={b.code} language={b.lang} filename={b.filename} />
          case "list": {
            const L = b.ordered ? "ol" : "ul"
            return (
              <L key={i} className={cn("space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-fg-muted marker:text-fg-subtle", b.ordered ? "list-decimal" : "list-disc")}>
                {b.items.map((it, j) => (
                  <li key={j} className="pl-1">
                    <Inline text={it} />
                  </li>
                ))}
              </L>
            )
          }
          case "callout": {
            const c = CALLOUT[b.tone ?? "note"]
            const Icon = c.icon
            return (
              <div key={i} className={cn("flex gap-3 rounded-xl border p-4 text-[0.9375rem] leading-[1.65] text-fg", c.cls)}>
                <Icon className="mt-0.5 size-4 shrink-0 text-fg-muted" />
                <p>
                  <Inline text={b.text} />
                </p>
              </div>
            )
          }
          case "component":
            return <ComponentCard key={i} name={b.name} />
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[520px] text-left text-[0.875rem]">
                  <thead className="bg-sunken text-fg">
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} className="px-4 py-2.5 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-border">
                        {r.map((cell, k) => (
                          <td key={k} className={cn("px-4 py-2.5 align-top text-fg-muted", k === 0 && "font-medium text-fg")}>
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        }
      })}
    </div>
  )
}

export function FaqList({ faq, title = "Frequently asked questions" }: { faq: Faq[]; title?: string }) {
  return (
    <section aria-labelledby="faq" className="mt-16">
      <h2 id="faq" className="scroll-mt-24 text-[1.75rem] font-medium tracking-[-0.03em] text-fg">
        {title}
      </h2>
      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
        {faq.map((f) => (
          <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1rem] font-medium text-fg outline-none focus-visible:underline">
              <h3>{f.q}</h3>
              <span aria-hidden className="text-xl leading-none text-fg-subtle transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-[0.9375rem] leading-[1.7] text-fg-muted">
              <Inline text={f.a} />
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-fg-subtle">
      {items.map((it, i) => (
        <React.Fragment key={it.name}>
          {i ? <span aria-hidden>/</span> : null}
          {it.href ? (
            <Link href={it.href} className="hover:text-fg">
              {it.name}
            </Link>
          ) : (
            <span className="text-fg-muted" aria-current="page">
              {it.name}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

/** Header, main and footer for the content pages. */
export function ContentShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-bg text-fg">
      <SiteHeader solid />
      <main className="min-w-0">{children}</main>
      <SiteFooter />
    </div>
  )
}

/** The quiet studio ask at the end of content pages. */
export function StudioNote() {
  return (
    <aside className="mt-16 flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-surface p-7 shadow-raised sm:flex-row sm:items-center">
      <div className="max-w-xl">
        <p className="text-[1.125rem] font-medium tracking-[-0.02em] text-fg">Need the whole product, not just the parts?</p>
        <p className="mt-1.5 text-[0.9375rem] leading-[1.6] text-fg-muted">MiniDev is the studio behind this kit. We design and build MVPs, apps and websites, starting with a free 48 hour prototype.</p>
      </div>
      <Link href="/studio" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-ink px-4 text-[0.875rem] font-medium text-on-ink shadow-ink outline-none hover:bg-ink-hover focus-visible:ring-2 focus-visible:ring-accent">
        Talk to MiniDev <ArrowRightIcon className="size-4" />
      </Link>
    </aside>
  )
}
