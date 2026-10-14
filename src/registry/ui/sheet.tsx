"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"

/** A side panel that slides over the page from any edge, with a scrim, a title bar and a close button. */
type SheetProps = {
  /** Controlled open state. Leave it out and the sheet renders its own "Open sheet" button. */
  open?: boolean
  onClose?: () => void
  side?: "left" | "right" | "top" | "bottom"
  title?: string
  /** Panel content. Defaults to a Lumen invoice summary. */
  children?: React.ReactNode
  className?: string
}

const SAMPLE_TITLE = "Invoice INV-2041"

const SAMPLE_CONTENT = (
  <div className="space-y-4 text-sm">
    <dl className="space-y-3">
      {[
        ["Customer", "Northwind Traders"],
        ["Amount", "$12,400.00"],
        ["Issued", "Mar 1, 2026"],
        ["Due", "Mar 14, 2026"],
        ["Status", "Sent"],
        ["Owner", "Maya Chen"],
      ].map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-4">
          <dt className="text-fg-muted">{k}</dt>
          <dd className="font-medium tabular-nums text-fg">{v}</dd>
        </div>
      ))}
    </dl>
    <p className="text-xs leading-[1.6] text-fg-muted">
      Sent to billing@northwind.com. A reminder goes out on Mar 10 if the invoice is still unpaid.
    </p>
  </div>
)

function Sheet({ open, onClose, side = "right", title, children, className }: SheetProps) {
  const controlled = open !== undefined
  const [internal, setInternal] = React.useState(false)
  const isOpen = controlled ? open : internal
  const panelRef = React.useRef<HTMLElement>(null)
  const returnRef = React.useRef<HTMLElement | null>(null)

  const close = React.useCallback(() => {
    if (!controlled) setInternal(false)
    onClose?.()
  }, [controlled, onClose])

  // Move focus into the panel on open and hand it back on close.
  React.useEffect(() => {
    if (!isOpen) return
    returnRef.current = document.activeElement as HTMLElement | null
    panelRef.current?.focus()
    return () => returnRef.current?.focus?.()
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, close])

  const heading = title ?? (children === undefined ? SAMPLE_TITLE : undefined)
  const trigger = controlled ? null : (
    <Button variant="outline" onClick={() => setInternal(true)} aria-haspopup="dialog" aria-expanded={isOpen}>
      Open sheet
    </Button>
  )
  if (!isOpen) return trigger
  const pos =
    side === "right"
      ? "inset-y-0 right-0 w-full max-w-md border-l"
      : side === "left"
        ? "inset-y-0 left-0 w-full max-w-md border-r"
        : side === "top"
          ? "inset-x-0 top-0 max-h-[80vh] border-b"
          : "inset-x-0 bottom-0 max-h-[80vh] border-t"
  return (
    <>
      {trigger}
      <div data-slot="sheet" className="fixed inset-0 z-50">
        <button type="button" aria-label="Close" className="absolute inset-0 bg-fg/40" onClick={close} />
        <aside
          ref={panelRef}
          role="dialog"
          aria-modal
          aria-label={heading ?? "Sheet"}
          tabIndex={-1}
          className={cn(
            "absolute flex flex-col border-border bg-surface shadow-lg outline-none",
            pos,
            className
          )}
        >
          <div className="flex h-12 items-center justify-between border-b border-border px-4">
            <h2 className="text-sm font-medium text-fg">{heading}</h2>
            <button
              type="button"
              aria-label="Close sheet"
              className="rounded-md text-fg-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
              onClick={close}
            >
              <XIcon className="size-4" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-4">{children ?? SAMPLE_CONTENT}</div>
        </aside>
      </div>
    </>
  )
}
export { Sheet }
export type { SheetProps }
