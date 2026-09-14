"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
function ToolCallCollapsed({
  name,
  children,
  className,
}: {
  name: string
  children?: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div data-slot="tool-call-collapsed" className={cn("rounded-xl border border-border bg-sunken", className)}>
      <button
        type="button"
        className="flex h-9 w-full items-center gap-2 px-3 text-left text-xs font-medium text-fg"
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronRightIcon className={cn("size-3.5 text-fg-muted transition-transform duration-[140ms]", open && "rotate-90")} />
        <span className="font-mono">{name}</span>
      </button>
      {open && children ? <div className="border-t border-border px-3 py-2 text-xs text-fg-muted">{children}</div> : null}
    </div>
  )
}
export { ToolCallCollapsed }
