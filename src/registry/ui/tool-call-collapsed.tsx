"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A quiet one-line disclosure for a tool call: chevron and mono tool name, with the details hidden until opened.
 *
 * Use it when tool calls should stay out of the way in a chat transcript. Use `ToolCallCard` when status and duration matter.
 *
 * @example
 * <ToolCallCollapsed name="search_customers">Found 3 customers matching "northwind".</ToolCallCollapsed>
 */
type ToolCallCollapsedProps = {
  /** Tool or function name, shown in mono. */
  name: string
  /** Details revealed when opened. */
  children?: React.ReactNode
  /** Start open. */
  defaultOpen?: boolean
  className?: string
}

function ToolCallCollapsed({ name, children, defaultOpen = false, className }: ToolCallCollapsedProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const id = React.useId()
  const hasBody = children != null
  return (
    <div data-slot="tool-call-collapsed" data-state={open ? "open" : "closed"} className={cn("rounded-xl border border-border bg-sunken", className)}>
      <button
        type="button"
        disabled={!hasBody}
        aria-expanded={hasBody ? open : undefined}
        aria-controls={hasBody ? id : undefined}
        className="flex h-9 w-full items-center gap-2 rounded-xl px-3 text-left text-xs font-medium text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent enabled:cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronRightIcon aria-hidden className={cn("size-3.5 text-fg-muted transition-transform duration-[140ms] ease-hairline", open && "rotate-90", !hasBody && "opacity-0")} />
        <span className="truncate font-mono">{name}</span>
      </button>
      {hasBody ? (
        <div id={id} hidden={!open} className="border-t border-border px-3 py-2 text-xs text-fg-muted">
          {children}
        </div>
      ) : null}
    </div>
  )
}
export { ToolCallCollapsed }
export type { ToolCallCollapsedProps }
