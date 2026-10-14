"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Sheet } from "@/registry/ui/sheet"

/** A bottom sheet for quick actions and mobile forms: a Sheet that slides up from the bottom edge. */
type DrawerProps = {
  /** Controlled open state. Leave it out and the drawer renders its own "Open drawer" button. */
  open?: boolean
  onClose?: () => void
  /** Edge the drawer slides from. */
  side?: "left" | "right" | "top" | "bottom"
  /** Title in the drawer's header bar. */
  title?: string
  /** Drawer content. Defaults to a Lumen invoice action list. */
  children?: React.ReactNode
  /** Rendered when the drawer is uncontrolled. Defaults to an "Open drawer" button. */
  trigger?: React.ReactNode
  /** Extra classes for the panel. */
  className?: string
}

const SAMPLE_TITLE = "Invoice INV-2041"

const SAMPLE_ACTIONS = [
  { label: "Send reminder", hint: "Email Northwind's billing contact" },
  { label: "Record payment", hint: "$12,400.00 outstanding" },
  { label: "Download PDF", hint: "Issued Sep 24, 2026" },
  { label: "Void invoice", hint: "Cannot be undone", danger: true },
]

const SAMPLE_CONTENT = (
  <ul className="mx-auto max-w-md space-y-1">
    {SAMPLE_ACTIONS.map((a) => (
      <li key={a.label}>
        <button
          type="button"
          className="flex w-full flex-col rounded-lg px-3 py-2 text-left outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className={a.danger ? "text-sm font-medium text-danger" : "text-sm font-medium text-fg"}>{a.label}</span>
          <span className="text-xs text-fg-muted">{a.hint}</span>
        </button>
      </li>
    ))}
  </ul>
)

function Drawer({ open, onClose, side = "bottom", title, children, trigger, className }: DrawerProps) {
  const controlled = open !== undefined
  const [internal, setInternal] = React.useState(false)
  const isOpen = controlled ? open : internal
  const close = () => {
    if (!controlled) setInternal(false)
    onClose?.()
  }
  return (
    <div data-slot="drawer" className="contents">
      {!controlled
        ? trigger ?? (
            <Button type="button" variant="outline" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setInternal(true)}>
              Open drawer
            </Button>
          )
        : null}
      <Sheet open={isOpen} onClose={close} side={side} title={title ?? (children === undefined ? SAMPLE_TITLE : undefined)} className={className}>
        {children ?? SAMPLE_CONTENT}
      </Sheet>
    </div>
  )
}
export { Drawer }
export type { DrawerProps }
