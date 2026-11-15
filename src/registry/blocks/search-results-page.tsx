"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { SearchInput } from "@/registry/ui/search-input"

/**
 * SearchResultsPage — a search screen: a search field, a live result count, and linked results tagged by type with the match highlighted.
 *
 * Use for an in-app search across records (customers, invoices, reports). Results filter as you type and the count
 * is announced to screen readers. For a dropdown of results under a field use SearchWithResults; for a ⌘K launcher
 * use CommandPalette; for "nothing found" art use EmptySearch.
 *
 * @example
 * <SearchResultsPage defaultQuery="northwind" />
 */
type SearchResultsPageProps = {
  /** Starting query. */
  defaultQuery?: string
  className?: string
}

type Hit = { id: string; type: "Customer" | "Invoice" | "Report"; title: string; detail: string }

const INDEX: Hit[] = [
  { id: "c-northwind", type: "Customer", title: "Northwind Traders", detail: "Team plan · 24 seats · MRR $1,176" },
  { id: "i-2041", type: "Invoice", title: "INV-2041 · Northwind Traders", detail: "$12,400.00 · paid Nov 14" },
  { id: "r-board", type: "Report", title: "Q4 board pack (Northwind)", detail: "Owner Priya Raman · updated 12m ago" },
  { id: "c-halcyon", type: "Customer", title: "Halcyon Health", detail: "Scale plan · 60 seats · MRR $7,740" },
  { id: "i-1987", type: "Invoice", title: "INV-1987 · Halcyon Health", detail: "$7,740.00 · paid Oct 1" },
  { id: "r-churn", type: "Report", title: "Starter churn review", detail: "Owner Marcus Webb · updated 2h ago" },
]

function Highlight({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q) : -1
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-accent-soft px-0.5 text-accent-fg">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  )
}

function SearchResultsPage({ defaultQuery = "northwind", className }: SearchResultsPageProps) {
  const [q, setQ] = React.useState(defaultQuery)
  const needle = q.trim().toLowerCase()
  const hits = needle ? INDEX.filter((h) => `${h.title} ${h.detail}`.toLowerCase().includes(needle)) : INDEX
  return (
    <section data-slot="search-results-page" aria-label="Search results" className={cn("space-y-4 rounded-2xl border border-border bg-surface p-4 shadow-raised sm:p-6", className)}>
      <div role="search">
        <SearchInput aria-label="Search customers, invoices and reports" placeholder="Search customers, invoices, reports…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <p aria-live="polite" className="text-xs text-fg-muted tabular-nums">
        {hits.length} {hits.length === 1 ? "result" : "results"}
        {needle ? ` for “${q.trim()}”` : ""}
      </p>
      {hits.length ? (
        <ul className="space-y-2">
          {hits.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="block rounded-xl border border-border bg-bg px-3 py-3 outline-none transition-colors duration-[70ms] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="flex items-center gap-2">
                  <span className="min-w-0 truncate text-sm font-medium text-fg">
                    <Highlight text={h.title} q={needle} />
                  </span>
                  <Badge variant="outline" className="shrink-0">
                    {h.type}
                  </Badge>
                </span>
                <span className="mt-1 block text-sm text-fg-muted tabular-nums">
                  <Highlight text={h.detail} q={needle} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-fg-muted">Nothing matches. Try a customer name or an invoice number.</p>
      )}
    </section>
  )
}

export { SearchResultsPage }
export type { SearchResultsPageProps }
