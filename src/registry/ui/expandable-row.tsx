"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

function ExpandableRow({
  title = "Details",
  children,
  defaultOpen = false,
  className,
}: {
  title?: React.ReactNode
  children?: React.ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div data-slot="expandable-row" className={cn("rounded-xl border border-border bg-surface", className)}>
      <button
        type="button"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDownIcon className={cn("size-4 text-fg-muted transition-transform duration-[140ms]", open && "rotate-180")} aria-hidden />
      </button>
      {open ? <div className="border-t border-border px-4 py-3 text-sm text-fg">{children}</div> : null}
    </div>
  )
}
export { ExpandableRow }
