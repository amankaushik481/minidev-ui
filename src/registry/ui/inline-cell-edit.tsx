"use client"
import * as React from "react"
import { Input } from "@/registry/ui/input"
import { cn } from "@/lib/utils"
function InlineCellEdit({ value, onChange, className }: { value: string; onChange?: (v: string) => void; className?: string }) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)
  React.useEffect(() => setDraft(value), [value])
  if (!editing) {
    return (
      <button data-slot="inline-cell-edit" type="button" className={cn("rounded-md px-1 text-left text-sm hover:bg-sunken", className)} onClick={() => setEditing(true)}>
        {value || <span className="text-fg-subtle">Edit</span>}
      </button>
    )
  }
  return (
    <Input
      autoFocus
      className={cn("h-8", className)}
      value={draft}
      aria-label="Edit cell"
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => { setEditing(false); onChange?.(draft) }}
      onKeyDown={(e) => { if (e.key === "Enter") { setEditing(false); onChange?.(draft) } if (e.key === "Escape") setEditing(false) }}
    />
  )
}
export { InlineCellEdit }
