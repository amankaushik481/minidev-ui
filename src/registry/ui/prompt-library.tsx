"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/registry/ui/search-input"

/**
 * PromptLibrary — a searchable list of saved prompts, each a card with a title, tag and two-line preview.
 *
 * Use it in an AI app's sidebar or a "/" picker so people can reuse prompts. Search filters by
 * title, body and tag as you type; clicking a card calls `onSelect`. For command style search
 * across actions use a command palette instead.
 *
 * @example
 * <PromptLibrary prompts={[{ id: "sum", title: "Summarize thread", body: "Summarize this thread in five bullets.", tag: "Writing" }]} onSelect={(p) => setPrompt(p.body)} />
 */

type Prompt = {
  /** Stable key. */
  id: string
  title: string
  /** The prompt text; the card shows its first two lines. */
  body: string
  /** Short category shown on the right of the title. */
  tag?: string
}

// Saved prompts for the Lumen finance assistant.
const SAMPLE_PROMPTS: Prompt[] = [
  { id: "overdue", title: "Chase overdue invoices", body: "List every invoice more than 14 days overdue, group by customer, and draft a polite reminder for each.", tag: "Collections" },
  { id: "month-close", title: "Month-end close checklist", body: "Walk through unreconciled transactions, flag anything over $5,000 without a receipt, and summarize open items.", tag: "Close" },
  { id: "cash-forecast", title: "13-week cash forecast", body: "Project cash from open invoices, recurring bills and payroll. Call out the first week balance drops below $50,000.", tag: "Planning" },
  { id: "board-summary", title: "Board revenue summary", body: "Summarize MRR, churn and expansion for the quarter in five bullet points a board member can read in a minute.", tag: "Reporting" },
  { id: "vendor-dupes", title: "Find duplicate vendor bills", body: "Compare bills from the last 90 days by amount, vendor and date and list likely duplicates.", tag: "Audit" },
]

type PromptLibraryProps = {
  /** Saved prompts to list and search. */
  prompts?: Prompt[]
  /** Fires with the prompt whose card was clicked. */
  onSelect?: (p: Prompt) => void
  className?: string
}

function PromptLibrary({
  prompts = SAMPLE_PROMPTS,
  onSelect,
  className,
}: PromptLibraryProps) {
  const [q, setQ] = React.useState("")
  const needle = q.trim().toLowerCase()
  const filtered = prompts.filter((p) => `${p.title} ${p.body} ${p.tag ?? ""}`.toLowerCase().includes(needle))
  return (
    <div data-slot="prompt-library" className={cn("space-y-3", className)}>
      <SearchInput aria-label="Search prompts" placeholder="Search prompts…" value={q} onChange={(e) => setQ(e.target.value)} />
      <p className="sr-only" aria-live="polite">
        {needle ? `${filtered.length} prompt${filtered.length === 1 ? "" : "s"} found` : ""}
      </p>
      {filtered.length === 0 ? <p className="px-1 py-3 text-xs text-fg-muted">No prompts match “{q.trim()}”.</p> : null}
      <ul className="space-y-2">
        {filtered.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onSelect?.(p)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-left outline-none transition-[border-color] duration-[70ms] ease-hairline hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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
