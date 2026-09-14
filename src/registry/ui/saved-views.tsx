"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type View = { id: string; name: string; count?: number }

function SavedViews({
  views = [
    { id: "1", name: "My open", count: 12 },
    { id: "2", name: "Needs review", count: 4 },
    { id: "3", name: "All issues", count: 128 },
  ],
  value,
  onChange,
  className,
}: {
  views?: View[]
  value?: string
  onChange?: (id: string) => void
  className?: string
}) {
  const [internal, setInternal] = React.useState(views[0]?.id)
  const current = value ?? internal
  return (
    <div data-slot="saved-views" role="listbox" aria-label="Saved views" className={cn("flex flex-col gap-0.5", className)}>
      {views.map((v) => {
        const on = v.id === current
        return (
          <button
            key={v.id}
            type="button"
            role="option"
            aria-selected={on}
            className={cn(
              "flex h-8 items-center justify-between rounded-lg px-2.5 text-left text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent",
              on ? "bg-sunken font-medium" : "hover:bg-sunken"
            )}
            onClick={() => { setInternal(v.id); onChange?.(v.id) }}
          >
            <span>{v.name}</span>
            {v.count != null ? <span className="tabular-nums text-xs text-fg">{v.count}</span> : null}
          </button>
        )
      })}
    </div>
  )
}
export { SavedViews }
