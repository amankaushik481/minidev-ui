"use client"
import * as React from "react"
import { SearchInput } from "@/registry/ui/search-input"
import { cn } from "@/lib/utils"
function SearchWithResults({ results, onSearch, className }: { results: { id: string; title: string; subtitle?: string }[]; onSearch?: (q: string) => void; className?: string }) {
  return (
    <div data-slot="search-with-results" className={cn("w-full max-w-md", className)}>
      <SearchInput placeholder="Search…" onChange={(e) => onSearch?.(e.target.value)} aria-label="Search" />
      <ul className="mt-2 overflow-hidden rounded-xl border border-border">
        {results.map((r) => (
          <li key={r.id} className="border-b border-border px-3 py-2 last:border-b-0">
            <p className="text-sm text-fg">{r.title}</p>
            {r.subtitle ? <p className="text-xs text-fg-muted">{r.subtitle}</p> : null}
          </li>
        ))}
        {results.length === 0 ? <li className="px-3 py-4 text-xs text-fg-muted">No results</li> : null}
      </ul>
    </div>
  )
}
export { SearchWithResults }
