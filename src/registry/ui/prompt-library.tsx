"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/registry/ui/search-input"

/** PromptLibrary — a searchable list of saved prompts, each a card with a title, tag and two-line preview. */

type Prompt = { id: string; title: string; body: string; tag?: string }

// Saved prompts for the Lumen finance assistant.
const SAMPLE_PROMPTS: Prompt[] = [
  { id: "overdue", title: "Chase overdue invoices", body: "List every invoice more than 14 days overdue, group by customer, and draft a polite reminder for each.", tag: "Collections" },
  { id: "month-close", title: "Month-end close checklist", body: "Walk through unreconciled transactions, flag anything over $5,000 without a receipt, and summarize open items.", tag: "Close" },
  { id: "cash-forecast", title: "13-week cash forecast", body: "Project cash from open invoices, recurring bills and payroll. Call out the first week balance drops below $50,000.", tag: "Planning" },
  { id: "board-summary", title: "Board revenue summary", body: "Summarize MRR, churn and expansion for the quarter in five bullet points a board member can read in a minute.", tag: "Reporting" },
  { id: "vendor-dupes", title: "Find duplicate vendor bills", body: "Compare bills from the last 90 days by amount, vendor and date and list likely duplicates.", tag: "Audit" },
]

type PromptLibraryProps = {
  prompts?: Prompt[]
  onSelect?: (p: Prompt) => void
  className?: string
}

function PromptLibrary({
  prompts = SAMPLE_PROMPTS,
  onSelect,
  className,
}: PromptLibraryProps) {
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
export type { PromptLibraryProps, Prompt }
