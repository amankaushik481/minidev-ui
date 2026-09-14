"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/registry/ui/search-input"

type Prompt = { id: string; title: string; body: string; tag?: string }

function PromptLibrary({
  prompts,
  onSelect,
  className,
}: {
  prompts: Prompt[]
  onSelect?: (p: Prompt) => void
  className?: string
}) {
  const [q, setQ] = React.useState("")
  const filtered = prompts.filter((p) => `${p.title} ${p.body} ${p.tag ?? ""}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <div data-slot="prompt-library" className={cn("space-y-3", className)}>
      <SearchInput aria-label="Search prompts" placeholder="Search prompts…" value={q} onChange={(e) => setQ(e.target.value)} />
      <ul className="space-y-2">
        {filtered.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onSelect?.(p)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-left outline-none hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-fg">{p.title}</span>
                {p.tag ? <span className="text-[11px] text-fg-muted">{p.tag}</span> : null}
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-fg-muted">{p.body}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { PromptLibrary }
