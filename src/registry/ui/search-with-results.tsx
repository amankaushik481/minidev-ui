"use client"
import * as React from "react"
import { SearchInput } from "@/registry/ui/search-input"
import { cn } from "@/lib/utils"

/**
 * A search field with a result list underneath, for global search and quick lookups.
 *
 * Without `onSearch` it filters `results` by title and subtitle itself; with it, you fetch and
 * pass back `results`. Pass `onSelect` to make each result a button. The result count is
 * announced to screen readers. For a keyboard-first launcher use CommandPalette; for a field alone use
 * SearchInput.
 *
 * @example
 * <SearchWithResults results={hits} onSearch={setQuery} onSelect={(r) => router.push(`/items/${r.id}`)} />
 */
type SearchResult = { id: string; title: string; subtitle?: string }

type SearchWithResultsProps = {
  /** Results to list. Defaults to a Lumen search across invoices, customers and deploys. */
  results?: SearchResult[]
  /** Called on every keystroke. Without it, the list filters itself by title and subtitle. */
  onSearch?: (q: string) => void
  /** Makes each result a button and fires with the picked result. */
  onSelect?: (result: SearchResult) => void
  /** Placeholder and accessible name of the field. */
  placeholder?: string
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

function SearchWithResults({ results = SAMPLE_RESULTS, onSearch, onSelect, placeholder = "Search…", className }: SearchWithResultsProps) {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  const shown = onSearch || !q ? results : results.filter((r) => `${r.title} ${r.subtitle ?? ""}`.toLowerCase().includes(q))
  const body = (r: SearchResult) => (
    <>
      <span className="block text-sm text-fg">{r.title}</span>
      {r.subtitle ? <span className="block text-xs text-fg-muted">{r.subtitle}</span> : null}
    </>
  )
  return (
    <div data-slot="search-with-results" className={cn("w-full max-w-md", className)}>
      <SearchInput
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value)
          onSearch?.(e.target.value)
        }}
        aria-label={placeholder.replace(/…$/, "")}
      />
      <p className="sr-only" aria-live="polite">
        {q ? `${shown.length} result${shown.length === 1 ? "" : "s"}` : ""}
      </p>
      <ul className="mt-2 overflow-hidden rounded-xl border border-border bg-surface">
        {shown.map((r) => (
          <li key={r.id} className="border-b border-border last:border-b-0">
            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(r)}
                className="w-full px-3 py-2 text-left outline-none transition-[background-color] duration-[70ms] ease-hairline hover:bg-sunken focus-visible:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
              >
                {body(r)}
              </button>
            ) : (
              <div className="px-3 py-2">{body(r)}</div>
            )}
          </li>
        ))}
        {shown.length === 0 ? <li className="px-3 py-4 text-xs text-fg-muted">No results</li> : null}
      </ul>
    </div>
  )
}
export { SearchWithResults }
export type { SearchWithResultsProps, SearchResult }
