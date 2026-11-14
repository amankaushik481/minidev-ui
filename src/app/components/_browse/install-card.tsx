import Link from "next/link"
import { CopyButton } from "@/registry/ui/copy-button"
import { SITE } from "@/lib/site"

export type Kind = "ui" | "block" | "premium"
/** Plain data the server passes down, so the component index never ships to the browser. */
export type BrowseItem = { name: string; title: string; kind: Kind; description?: string; meta?: string }

export const installCommand = (names: string[]) => `npx shadcn@latest add ${names.map((n) => `${SITE.registry}/${n}`).join(" ")}`
export const KIND_LABEL: Record<Kind, string> = { ui: "ui", block: "block", premium: "motion" }

/**
 * A component in a browse grid: the whole card opens its docs, and a copy button for the
 * install command shows on hover or keyboard focus (always visible on touch screens).
 */
export function InstallCard({ item }: { item: BrowseItem }) {
  const cmd = installCommand([item.name])
  return (
    <li className="group/card relative flex min-w-0 flex-col rounded-2xl border border-border bg-surface p-5 shadow-raised transition-[border-color] duration-[70ms] hover:border-border-strong has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">
          <Link href={`/docs/${item.name}`} className="outline-none after:absolute after:inset-0 after:rounded-2xl">
            {item.title}
          </Link>
        </h3>
        <span className="shrink-0 rounded-md border border-border bg-sunken px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle uppercase">{KIND_LABEL[item.kind]}</span>
      </div>
      {item.description ? <p className="mt-1 line-clamp-2 text-[0.8125rem] leading-[1.55] text-fg-muted">{item.description}</p> : null}
      {item.meta ? <p className="mt-1 text-[0.8125rem] text-fg-subtle">{item.meta}</p> : null}
      <div className="mt-auto flex min-h-8 items-center gap-2 pt-3">
        <code className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-fg-subtle">{cmd}</code>
        <CopyButton
          value={cmd}
          size="xs"
          aria-label={`Copy install command for ${item.title}`}
          className="relative z-10 shrink-0 transition-opacity duration-[140ms] [@media(hover:hover)]:opacity-0 group-hover/card:opacity-100 group-focus-within/card:opacity-100 data-[copied]:opacity-100"
        />
      </div>
    </li>
  )
}

/** The one-command install for a set of items, for people and for agents that read the page. */
export function InstallAll({ names, label }: { names: string[]; label: string }) {
  const cmd = installCommand(names)
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-sunken py-1.5 pr-1.5 pl-3.5 shadow-xs">
      <code className="min-w-0 flex-1 truncate font-mono text-[12px] text-fg-muted" title={cmd}>
        <span aria-hidden className="text-fg-subtle select-none">$ </span>
        {cmd}
      </code>
      <CopyButton value={cmd} size="sm" label={label} className="shrink-0" />
    </div>
  )
}

/** Where an AI coding agent should look instead of scraping this page. */
export function AgentNote() {
  const link = "font-mono text-[12.5px] text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg"
  return (
    <p className="mt-6 max-w-3xl text-[0.875rem] leading-[1.65] text-fg-muted">
      Using an AI coding agent?{" "}
      <Link href="/docs/ai" className="font-medium text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">
        Read the agent guide
      </Link>
      , point it at{" "}
      <a href="/llms.txt" className={link}>
        /llms.txt
      </a>{" "}
      for the full index, or paste{" "}
      <a href="/AGENTS.md" className={link}>
        /AGENTS.md
      </a>{" "}
      into your project. Every component has plain Markdown docs at <code className="font-mono text-[12.5px] text-fg">/docs/&lt;name&gt;.md</code>.
    </p>
  )
}
