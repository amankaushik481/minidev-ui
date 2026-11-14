"use client"
import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * MobileActionSheet — an iOS-style sheet of full-width actions with a separate Cancel row, for phone-sized screens.
 *
 * Built on Base UI Dialog: focus moves into the sheet and is trapped there, the page is
 * scroll-locked and inert, Escape or a tap on the scrim cancels, and focus returns to
 * the trigger. Use it for a short list of verbs on one object; for forms or longer
 * content use Drawer, for desktop menus use DropdownMenu.
 *
 * @example
 * const [open, setOpen] = React.useState(false)
 * <Button onClick={() => setOpen(true)}>Invoice actions</Button>
 * <MobileActionSheet
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Invoice INV-2041"
 *   actions={[
 *     { id: "send", label: "Send reminder", onSelect: send },
 *     { id: "void", label: "Void invoice", destructive: true, onSelect: voidInvoice },
 *   ]}
 * />
 */
type SheetAction = {
  /** Stable key. */
  id: string
  label: string
  /** Colours the row as dangerous (delete, void, remove). */
  destructive?: boolean
  /** Runs before the sheet closes. */
  onSelect?: () => void
}

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
  /** Called on Cancel, Escape, a scrim tap or after an action runs. Set `open` to false here. */
  onClose?: () => void
  /** Rows in order. Put destructive actions last. */
  actions?: SheetAction[]
  /** Optional heading above the actions; also the dialog's accessible name. */
  title?: string
  /** Label of the Cancel row. */
  cancelLabel?: string
  /** Label of the trigger button, shown only when the sheet is uncontrolled. */
  triggerLabel?: string
  /** Classes for the action panel. */
  className?: string
}

const row =
  "flex h-12 w-full items-center justify-center text-sm outline-none transition-[background-color] duration-[70ms] hover:bg-sunken focus-visible:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"

function MobileActionSheet({
  open,
  onClose,
  actions = SAMPLE_ACTIONS,
  title,
  cancelLabel = "Cancel",
  triggerLabel = "Open action sheet",
  className,
}: MobileActionSheetProps) {
  const controlled = open !== undefined
  const [internal, setInternal] = React.useState(false)
  const isOpen = controlled ? open : internal
  const setOpen = (next: boolean) => {
    if (!controlled) setInternal(next)
    if (!next) onClose?.()
  }
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
      {controlled ? null : (
        <DialogPrimitive.Trigger render={<Button variant="outline" />}>{triggerLabel}</DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          data-slot="mobile-action-sheet-overlay"
          className="fixed inset-0 z-50 bg-scrim duration-200 data-closed:duration-[160ms] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        />
        <DialogPrimitive.Popup
          data-slot="mobile-action-sheet"
          aria-label={title ? undefined : "Actions"}
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-md flex-col gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] outline-none duration-200 ease-hairline data-closed:duration-[160ms] data-closed:ease-exit data-open:animate-in data-open:slide-in-from-bottom data-closed:animate-out data-closed:slide-out-to-bottom"
        >
          <div className={cn("overflow-hidden rounded-xl border border-border bg-raised shadow-overlay", className)}>
            {title ? (
              <DialogPrimitive.Title className="border-b border-border px-4 py-3 text-center text-xs font-medium text-fg-muted">
                {title}
              </DialogPrimitive.Title>
            ) : null}
            {actions.map((a) => (
              <button
                key={a.id}
                type="button"
                className={cn(row, "border-b border-border last:border-b-0", a.destructive ? "text-danger" : "text-fg")}
                onClick={() => {
                  a.onSelect?.()
                  setOpen(false)
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
          <DialogPrimitive.Close
            className={cn(row, "rounded-xl border border-border bg-raised font-medium text-fg shadow-overlay")}
          >
            {cancelLabel}
          </DialogPrimitive.Close>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
export { MobileActionSheet }
export type { MobileActionSheetProps, SheetAction }
