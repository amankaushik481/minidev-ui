"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

/**
 * ExpandableRow — a bordered row whose header toggles a details panel underneath (a disclosure).
 *
 * Use for one collapsible block of extra detail, like a log entry or an
 * invoice line. For several mutually exclusive sections use `Accordion`; for
 * an unstyled show/hide use `Collapsible`.
 *
 * @example
 * <ExpandableRow title="Request headers">
 *   <pre>content-type: application/json</pre>
 * </ExpandableRow>
 *
 * Controlled: `<ExpandableRow open={open} onOpenChange={setOpen} title="…">`.
 */
type ExpandableRowProps = {
  /** Header text of the toggle button. */
  title?: React.ReactNode
  /** Content of the details panel. */
  children?: React.ReactNode
  /** Controlled open state. */
  open?: boolean
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean
  /** Called with the next open state. */
  onOpenChange?: (open: boolean) => void
  className?: string
}

function ExpandableRow({ title = "Details", children, open: openProp, defaultOpen = false, onOpenChange, className }: ExpandableRowProps) {
  const [inner, setInner] = React.useState(defaultOpen)
  const open = openProp ?? inner
  const id = React.useId()
  const toggle = () => {
    if (openProp === undefined) setInner(!open)
    onOpenChange?.(!open)
  }
  return (
    <div data-slot="expandable-row" data-open={open || undefined} className={cn("rounded-xl border border-border bg-surface", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={toggle}
      >
        {title}
        <ChevronDownIcon className={cn("size-4 shrink-0 text-fg-muted transition-transform duration-[140ms] ease-hairline", open && "rotate-180")} aria-hidden />
      </button>
      <div id={id} hidden={!open} className="border-t border-border px-4 py-3 text-sm text-fg">
        {open ? children : null}
      </div>
    </div>
  )
}
export { ExpandableRow }
export type { ExpandableRowProps }
