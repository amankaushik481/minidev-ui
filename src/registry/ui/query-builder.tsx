"use client"
import * as React from "react"
import { PlusIcon, TrashIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { IconButton } from "@/registry/ui/icon-button"

type Clause = { id: string; field: string; op: string; value: string }

const fieldOpts = ["status", "assignee", "priority"]
const opOpts = ["is", "is not", "contains"]

function QueryBuilder({ className }: { className?: string }) {
  const [clauses, setClauses] = React.useState<Clause[]>([
    { id: "1", field: "status", op: "is", value: "open" },
    { id: "2", field: "assignee", op: "is", value: "me" },
  ])
  return (
    <div data-slot="query-builder" className={cn("space-y-2 rounded-xl border border-border bg-surface p-3", className)}>
      {clauses.map((c, i) => (
        <div key={c.id} className="flex flex-wrap items-center gap-2">
          {i > 0 ? <span className="w-10 text-xs font-medium text-fg-muted">AND</span> : <span className="w-10 text-xs text-fg-muted">Where</span>}
          <label className="sr-only" htmlFor={`field-${c.id}`}>Field</label>
          <select
            id={`field-${c.id}`}
            value={c.field}
            onChange={(e) => setClauses((prev) => prev.map((x) => x.id === c.id ? { ...x, field: e.target.value } : x))}
            className="h-9 rounded-lg border border-border bg-bg px-2 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {fieldOpts.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <label className="sr-only" htmlFor={`op-${c.id}`}>Operator</label>
          <select
            id={`op-${c.id}`}
            value={c.op}
            onChange={(e) => setClauses((prev) => prev.map((x) => x.id === c.id ? { ...x, op: e.target.value } : x))}
            className="h-9 rounded-lg border border-border bg-bg px-2 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {opOpts.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <input
            aria-label="Value"
            value={c.value}
            onChange={(e) => setClauses((prev) => prev.map((x) => x.id === c.id ? { ...x, value: e.target.value } : x))}
            className="h-9 w-28 rounded-lg border border-border bg-bg px-2 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
          <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Remove clause" onClick={() => setClauses((prev) => prev.filter((x) => x.id !== c.id))}>
            <TrashIcon />
          </IconButton>
        </div>
      ))}
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setClauses((prev) => [...prev, { id: String(Date.now()), field: "status", op: "is", value: "" }])}
      >
        <PlusIcon /> Add filter
      </Button>
    </div>
  )
}
export { QueryBuilder }
