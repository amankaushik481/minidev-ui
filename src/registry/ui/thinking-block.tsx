"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A collapsible "Thinking" disclosure for a model's hidden reasoning in a chat transcript, closed by default.
 *
 * Use it for one plain block of reasoning text. Use `ReasoningBlock` for streamed, step-by-step reasoning with a timer, and `ToolCallCard` for tool invocations.
 *
 * @example
 * <ThinkingBlock label="Thought for 4s">Checking which invoices are overdue before drafting the reminder…</ThinkingBlock>
 */
type ThinkingBlockProps = {
  /** The reasoning text. */
  children: React.ReactNode
  /** Header text, e.g. "Thinking…" while streaming or "Thought for 4s" when done. */
  label?: React.ReactNode
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean
  /** Initial open state for the uncontrolled block. */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

function ThinkingBlock({ children, label = "Thinking", open: openProp, defaultOpen = false, onOpenChange, className }: ThinkingBlockProps) {
  const [internal, setInternal] = React.useState(defaultOpen)
  const open = openProp ?? internal
  const id = React.useId()
  const toggle = () => {
    if (openProp === undefined) setInternal(!open)
    onOpenChange?.(!open)
  }
  return (
    <div data-slot="thinking-block" data-state={open ? "open" : "closed"} className={cn("rounded-xl border border-border bg-sunken", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium text-fg-muted outline-none transition-colors duration-[70ms] hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
        onClick={toggle}
      >
        {label}
        <ChevronDownIcon aria-hidden className={cn("size-4 transition-transform duration-[140ms] ease-hairline", open && "rotate-180")} />
      </button>
      <div id={id} hidden={!open} className="border-t border-border px-3 py-2 text-xs leading-[1.55] text-fg-muted">
        {children}
      </div>
    </div>
  )
}
export { ThinkingBlock }
export type { ThinkingBlockProps }
