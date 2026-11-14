"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"

/**
 * A side panel that slides over the page from any edge, with a scrim, a title bar and a close button.
 *
 * Built on Base UI Dialog: focus is trapped inside, the page is inert and
 * scroll-locked, Escape and the scrim close it, and focus returns to the
 * trigger. Use Sheet for secondary tasks beside the page (filters, edit
 * forms, mobile nav); use Dialog for a centred decision, Drawer for a
 * bottom sheet on mobile.
 *
 * @example
 * const [open, setOpen] = React.useState(false)
 * <Button onClick={() => setOpen(true)}>Edit</Button>
 * <Sheet open={open} onClose={() => setOpen(false)} side="right" title="Edit customer">
 *   <form>…</form>
 * </Sheet>
 */
type SheetProps = {
  /** Controlled open state. Leave it out and the sheet renders its own "Open sheet" button. */
  open?: boolean
  /** Called when the sheet asks to close: Escape, the scrim or the close button. Set `open` to false here. */
  onClose?: () => void
  /** The edge the panel slides in from. */
  side?: "left" | "right" | "top" | "bottom"
  /** Heading in the title bar; also the dialog's accessible name. */
  title?: string
  /** Panel content. Defaults to a Lumen invoice summary. */
  children?: React.ReactNode
  /** Classes for the panel itself, e.g. `max-w-xl` for a wider sheet. */
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

const SIDE: Record<NonNullable<SheetProps["side"]>, string> = {
  right: "inset-y-0 right-0 w-full max-w-md border-l data-open:slide-in-from-right data-closed:slide-out-to-right",
  left: "inset-y-0 left-0 w-full max-w-md border-r data-open:slide-in-from-left data-closed:slide-out-to-left",
  top: "inset-x-0 top-0 max-h-[80vh] border-b data-open:slide-in-from-top data-closed:slide-out-to-top",
  bottom: "inset-x-0 bottom-0 max-h-[80vh] border-t data-open:slide-in-from-bottom data-closed:slide-out-to-bottom",
}

function Sheet({ open, onClose, side = "right", title, children, className }: SheetProps) {
  const heading = title ?? (children === undefined ? SAMPLE_TITLE : undefined)
  const controlled = open !== undefined
  return (
    // Base UI Dialog gives the focus trap, scroll lock, inert page, Escape and focus return.
    <SheetPrimitive.Root
      {...(controlled ? { open } : {})}
      onOpenChange={(next) => {
        if (!next) onClose?.()
      }}
    >
      {controlled ? null : (
        <SheetPrimitive.Trigger render={<Button variant="outline" />}>Open sheet</SheetPrimitive.Trigger>
      )}
      <SheetPrimitive.Portal>
        <SheetPrimitive.Backdrop
          data-slot="sheet-overlay"
          className="fixed inset-0 z-50 bg-scrim duration-200 data-closed:duration-[160ms] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        />
        <SheetPrimitive.Popup
          data-slot="sheet"
          data-side={side}
          aria-label={heading ? undefined : "Sheet"}
          className={cn(
            "fixed z-50 flex flex-col border-border bg-raised text-fg shadow-overlay outline-none",
            "duration-200 ease-hairline data-closed:duration-[160ms] data-closed:ease-exit data-open:animate-in data-closed:animate-out",
            SIDE[side],
            className
          )}
        >
          <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border pr-2 pl-4">
            {heading ? (
              <SheetPrimitive.Title className="truncate text-sm font-medium text-fg">{heading}</SheetPrimitive.Title>
            ) : (
              <span />
            )}
            <SheetPrimitive.Close render={<Button variant="ghost" size="icon-sm" />} aria-label="Close sheet">
              <XIcon aria-hidden />
            </SheetPrimitive.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-4">{children ?? SAMPLE_CONTENT}</div>
        </SheetPrimitive.Popup>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  )
}
export { Sheet }
export type { SheetProps }
