"use client"
import * as React from "react"
import { CheckIcon, ChevronRightIcon, LoaderCircleIcon, TerminalIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * One tool invocation inside an agent turn: tool name, argument preview, status pill, duration and a collapsible output.
 *
 * Children are the output (plain text or `<pre>`); without children the header is static. Use `ToolCallCollapsed` for a minimal one-line disclosure, `ToolResultPanel` to show JSON output, and `AgentTrace` for a whole run.
 *
 * @example
 * <ToolCallCard name="get_invoice" args='id="INV-2041"' status="done" duration="0.3s">{JSON.stringify(result, null, 2)}</ToolCallCard>
 */
type ToolCallCardProps = {
  /** Tool or function name, shown in mono. */
  name: string
  /** "running" shows a spinner and hides the duration. */
  status?: "running" | "done" | "error"
  /** Short argument preview, e.g. `path="DESIGN.md"`. */
  args?: string
  /** Wall time, e.g. "0.4s". Hidden while running. */
  duration?: string
  /** The output. Makes the card collapsible. */
  children?: React.ReactNode
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean
  /** Initial open state for the uncontrolled card. */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

const STATUS = {
  running: { label: "Running", tone: "bg-accent-soft text-accent-fg", icon: <LoaderCircleIcon className="size-3 animate-spin" aria-hidden /> },
  done: { label: "Done", tone: "bg-success/10 text-success", icon: <CheckIcon className="size-3" strokeWidth={2.5} aria-hidden /> },
  error: { label: "Failed", tone: "bg-danger/10 text-danger", icon: <XIcon className="size-3" strokeWidth={2.5} aria-hidden /> },
} as const

function ToolCallCard({ name, status = "done", args, duration, children, open: openProp, defaultOpen = true, onOpenChange, className }: ToolCallCardProps) {
  const [internal, setInternal] = React.useState(defaultOpen)
  const open = openProp ?? internal
  const id = React.useId()
  const hasBody = children != null
  const s = STATUS[status]
  return (
    <div data-slot="tool-call-card" data-status={status} className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-xs", className)}>
      <button
        type="button"
        disabled={!hasBody}
        onClick={() => {
          if (openProp === undefined) setInternal(!open)
          onOpenChange?.(!open)
        }}
        aria-expanded={hasBody ? open : undefined}
        aria-controls={hasBody ? id : undefined}
        className="flex h-10 w-full items-center gap-2.5 px-3 text-left outline-none transition-colors duration-[70ms] focus-visible:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset enabled:cursor-pointer enabled:hover:bg-sunken"
      >
        <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-md border border-border bg-sunken text-fg-subtle">
          <TerminalIcon className="size-3" />
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-xs">
          <span className="text-fg">{name}</span>
          {args ? <span className="text-fg-subtle">({args})</span> : null}
        </span>
        {duration && status !== "running" ? <span className="font-mono text-[11px] tabular-nums text-fg-subtle">{duration}</span> : null}
        <span className={cn("inline-flex h-5 items-center gap-1 rounded-full px-1.5 text-[11px] font-medium", s.tone)}>
          {s.icon}
          {s.label}
        </span>
        {hasBody ? <ChevronRightIcon aria-hidden className={cn("size-3.5 text-fg-subtle transition-transform duration-200 ease-hairline", open && "rotate-90")} /> : null}
      </button>
      {hasBody ? (
        <div className={cn("grid transition-[grid-template-rows] duration-200 ease-hairline", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
          {/* inert keeps the collapsed output out of the tab order and the accessibility tree. */}
          <div id={id} inert={!open} className="min-h-0 overflow-hidden">
            <div className="border-t border-border bg-sunken px-3 py-2.5 font-mono text-xs leading-[1.6] text-fg-muted">{children}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export { ToolCallCard }
export type { ToolCallCardProps }
