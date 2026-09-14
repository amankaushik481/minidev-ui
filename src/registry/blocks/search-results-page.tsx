"use client"
import { Badge } from "@/registry/ui/badge"
import { Input } from "@/registry/ui/input"

const HITS = [
  { name: "button", tier: "free", blurb: "Primary control with Hairline inset highlight" },
  { name: "hero-client-pitch", tier: "premium", blurb: "Kinetic pitch hero for client walkthroughs" },
  { name: "product-os-mock", tier: "premium", blurb: "Living product surface mock" },
]

function SearchResultsPage() {
  return (
    <div data-slot="search-results-page" className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]">
      <Input defaultValue="pitch" placeholder="Search registry" />
      <p className="text-xs text-fg-muted">3 results</p>
      <ul className="space-y-2">
        {HITS.map((h) => (
          <li key={h.name} className="rounded-xl border border-border bg-bg px-3 py-3">
            <div className="flex items-center gap-2">
              <code className="font-mono text-sm text-fg">{h.name}</code>
              <Badge variant="outline">{h.tier}</Badge>
            </div>
            <p className="mt-1 text-sm text-fg-muted">{h.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { SearchResultsPage }
