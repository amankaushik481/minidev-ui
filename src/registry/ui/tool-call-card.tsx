"use client"
import * as React from "react"
import { CheckIcon, ChevronRightIcon, LoaderCircleIcon, TerminalIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * ToolCallCard — one tool invocation inside an agent turn: the call, its
 * status, and (optionally) its output, collapsible.
 */
function ToolCallCard({
  name,
  status = "done",
  args,
  duration,
  children,
  defaultOpen = true,
  className,
}: {
  name: string
  status?: "running" | "done" | "error"
  /** Short argument preview, e.g. `path="DESIGN.md"`. */
  args?: string
  /** e.g. "0.4s" */
  duration?: string
  children?: React.ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const hasBody = children != null
  return (
    <div data-slot="tool-call-card" data-status={status} className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-xs", className)}>
      <button
        type="button"
        disabled={!hasBody}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={hasBody ? open : undefined}
        className="flex h-10 w-full items-center gap-2.5 px-3 text-left outline-none focus-visible:bg-sunken enabled:cursor-pointer enabled:hover:bg-sunken/60"
      >
        <span className="grid size-5 shrink-0 place-items-center rounded-md border border-border bg-sunken text-fg-subtle">
          <TerminalIcon className="size-3" />
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-xs">
          <span className="text-fg">{name}</span>
          {args ? <span className="text-fg-subtle">({args})</span> : null}
        </span>
        {duration && status !== "running" ? <span className="font-mono text-[11px] text-fg-subtle">{duration}</span> : null}
        <span
          className={cn(
            "inline-flex h-5 items-center gap-1 rounded-full px-1.5 text-[11px] font-medium",
            status === "running" && "bg-accent-soft text-accent-fg",
            status === "done" && "bg-success/10 text-success",
            status === "error" && "bg-danger/10 text-danger"
          )}
        >
          {status === "running" ? <LoaderCircleIcon className="size-3 animate-spin" /> : status === "done" ? <CheckIcon className="size-3" strokeWidth={2.5} /> : <XIcon className="size-3" strokeWidth={2.5} />}
          {status === "running" ? "Running" : status === "done" ? "Done" : "Failed"}
        </span>
        {hasBody ? <ChevronRightIcon className={cn("size-3.5 text-fg-subtle transition-transform duration-200 ease-hairline", open && "rotate-90")} /> : null}
      </button>
      {hasBody ? (
        <div className={cn("grid transition-[grid-template-rows] duration-200 ease-hairline", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-border bg-sunken/60 px-3 py-2.5 font-mono text-[11.5px] leading-[1.6] text-fg-muted">{children}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export { ToolCallCard }
