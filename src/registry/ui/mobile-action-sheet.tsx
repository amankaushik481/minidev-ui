"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/** MobileActionSheet — a bottom sheet of full-width actions with a cancel row, for phone-sized screens. */

type SheetAction = { id: string; label: string; destructive?: boolean; onSelect?: () => void }

// Actions on an invoice in the Lumen mobile app.
const SAMPLE_ACTIONS: SheetAction[] = [
  { id: "download", label: "Download PDF" },
  { id: "send", label: "Send to Northwind" },
  { id: "duplicate", label: "Duplicate invoice" },
  { id: "void", label: "Void invoice", destructive: true },
]

type MobileActionSheetProps = {
  /** Controlled open state. Leave it out and the sheet manages itself behind a trigger button. */
  open?: boolean
  onClose?: () => void
  actions?: SheetAction[]
  /** Label of the trigger button, shown only when the sheet is uncontrolled. */
  triggerLabel?: string
  className?: string
}

function MobileActionSheet({
  open,
  onClose,
  actions = SAMPLE_ACTIONS,
  triggerLabel = "Open action sheet",
  className,
}: MobileActionSheetProps) {
  const controlled = open !== undefined
  const [internal, setInternal] = React.useState(false)
  const isOpen = controlled ? open : internal
  const close = () => {
    if (!controlled) setInternal(false)
    onClose?.()
  }
  return (
    <>
      {!controlled ? (
        <Button variant="outline" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setInternal(true)}>
          {triggerLabel}
        </Button>
      ) : null}
      {isOpen ? (
        <div data-slot="mobile-action-sheet" className="fixed inset-0 z-50 flex items-end justify-center bg-fg/40 p-3">
          <button type="button" className="absolute inset-0" aria-label="Dismiss" onClick={close} />
          <div role="dialog" aria-modal="true" aria-label="Actions" className={cn("relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-border bg-raised", className)}>
            {actions.map((a) => (
              <button
                key={a.id}
                type="button"
                className={cn(
                  "flex h-12 w-full items-center justify-center border-b border-border text-sm last:border-b-0",
                  a.destructive ? "text-danger" : "text-fg"
                )}
                onClick={() => {
                  a.onSelect?.()
                  close()
                }}
              >
                {a.label}
              </button>
            ))}
            <button type="button" className="flex h-12 w-full items-center justify-center text-sm text-fg-muted" onClick={close}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
export { MobileActionSheet }
export type { MobileActionSheetProps, SheetAction }
