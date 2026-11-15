"use client"
import * as React from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { MobileActionSheet } from "@/registry/ui/mobile-action-sheet"
import { IconButton } from "@/registry/ui/icon-button"
import type { Example } from "./types"

function PhotoDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-3">
      <MobileActionSheet
        triggerLabel="Photo options"
        title="IMG_2207.jpg"
        actions={[
          { id: "share", label: "Share", onSelect: () => setLast("Shared") },
          { id: "album", label: "Add to album", onSelect: () => setLast("Added to album") },
          { id: "delete", label: "Delete photo", destructive: true, onSelect: () => setLast("Deleted") },
        ]}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{last ?? "No action yet."}</p>
    </div>
  )
}

function RowDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex w-full max-w-sm items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
      <div>
        <p className="text-sm font-medium text-fg">Northwind Traders</p>
        <p className="text-xs text-fg-muted">INV-2041 · $12,400.00</p>
      </div>
      <IconButton aria-label="Actions for INV-2041" variant="ghost" size="icon-sm" onClick={() => setOpen(true)}>
        <MoreHorizontalIcon />
      </IconButton>
      <MobileActionSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Invoice INV-2041"
        actions={[
          { id: "remind", label: "Send reminder" },
          { id: "paid", label: "Mark as paid" },
          { id: "void", label: "Void invoice", destructive: true },
        ]}
      />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Actions with handlers",
    description: "Each onSelect runs, then the sheet closes; put the destructive action last.",
    code: `function PhotoDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-3">
      <MobileActionSheet
        triggerLabel="Photo options"
        title="IMG_2207.jpg"
        actions={[
          { id: "share", label: "Share", onSelect: () => setLast("Shared") },
          { id: "album", label: "Add to album", onSelect: () => setLast("Added to album") },
          { id: "delete", label: "Delete photo", destructive: true, onSelect: () => setLast("Deleted") },
        ]}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{last ?? "No action yet."}</p>
    </div>
  )
}`,
    node: <PhotoDemo />,
  },
  {
    title: "Opened from a row's more button",
    description: "Controlled with open and onClose, so any button can open it and no built-in trigger renders.",
    code: `function RowDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex w-full max-w-sm items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
      <div>
        <p className="text-sm font-medium text-fg">Northwind Traders</p>
        <p className="text-xs text-fg-muted">INV-2041 · $12,400.00</p>
      </div>
      <IconButton aria-label="Actions for INV-2041" variant="ghost" size="icon-sm" onClick={() => setOpen(true)}>
        <MoreHorizontalIcon />
      </IconButton>
      <MobileActionSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Invoice INV-2041"
        actions={[
          { id: "remind", label: "Send reminder" },
          { id: "paid", label: "Mark as paid" },
          { id: "void", label: "Void invoice", destructive: true },
        ]}
      />
    </div>
  )
}`,
    node: <RowDemo />,
  },
]
