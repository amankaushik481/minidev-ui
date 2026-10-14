"use client"
import * as React from "react"
import { SearchInput } from "@/registry/ui/search-input"
import { cn } from "@/lib/utils"

/** A search field with a result list underneath, for global search and quick lookups. */
type SearchResult = { id: string; title: string; subtitle?: string }

type SearchWithResultsProps = {
  /** Results to list. Defaults to a Lumen search across invoices, customers and deploys. */
  results?: SearchResult[]
  /** Called on every keystroke. Without it, the list filters itself by title and subtitle. */
  onSearch?: (q: string) => void
  className?: string
}

const SAMPLE_RESULTS: SearchResult[] = [
  { id: "inv-2041", title: "INV-2041 · Northwind Traders", subtitle: "Invoice · $12,400 · due Mar 14, 2026" },
  { id: "cust-maya", title: "Maya Chen", subtitle: "Customer · maya@northwind.com" },
  { id: "inv-2038", title: "INV-2038 · Fabrikam", subtitle: "Invoice · $3,180 · paid" },
  { id: "deploy-412", title: "Deploy #412", subtitle: "lumen-web · production · 2 hours ago" },
  { id: "cust-theo", title: "Theo Okafor", subtitle: "Customer · theo@fabrikam.co" },
  { id: "doc-refunds", title: "Refund policy", subtitle: "Docs · Billing" },
]

function SearchWithResults({ results = SAMPLE_RESULTS, onSearch, className }: SearchWithResultsProps) {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  const shown = onSearch || !q ? results : results.filter((r) => `${r.title} ${r.subtitle ?? ""}`.toLowerCase().includes(q))
  return (
    <div data-slot="search-with-results" className={cn("w-full max-w-md", className)}>
      <SearchInput
        placeholder="Search…"
        onChange={(e) => {
          setQuery(e.target.value)
          onSearch?.(e.target.value)
        }}
        aria-label="Search"
      />
      <ul className="mt-2 overflow-hidden rounded-xl border border-border bg-surface">
        {shown.map((r) => (
          <li key={r.id} className="border-b border-border px-3 py-2 last:border-b-0">
            <p className="text-sm text-fg">{r.title}</p>
            {r.subtitle ? <p className="text-xs text-fg-muted">{r.subtitle}</p> : null}
          </li>
        ))}
        {shown.length === 0 ? <li className="px-3 py-4 text-xs text-fg-muted">No results</li> : null}
      </ul>
    </div>
  )
}
export { SearchWithResults }
export type { SearchWithResultsProps, SearchResult }
