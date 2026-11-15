"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { ConfirmDestructive } from "@/registry/ui/confirm-destructive"
import type { Example } from "./types"

function WebhookDemo() {
  const [deleted, setDeleted] = React.useState(false)
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
      <div className="min-w-0">
        <p className="truncate font-mono text-xs text-fg">https://hooks.halcyon.studio/invoices</p>
        <p className="text-xs text-fg-muted">{deleted ? "Deleted. Events are no longer sent." : "invoice.paid, invoice.voided"}</p>
      </div>
      {deleted ? null : (
        <ConfirmDestructive
          triggerLabel="Delete"
          title="Delete this webhook?"
          description="Lumen stops sending invoice events to this URL straight away. Failed deliveries are not retried."
          confirmLabel="Delete webhook"
          onConfirm={() => setDeleted(true)}
        />
      )}
    </div>
  )
}

function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Revoke production key</Button>
      <ConfirmDestructive
        title="Revoke the production API key?"
        description="Requests signed with lumen_live_…9f2c fail from now on. Create a new key first if anything still uses it."
        confirmLabel="Revoke key"
        cancelLabel="Keep key"
        open={open}
        onOpenChange={setOpen}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">Dialog {open ? "open" : "closed"}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Delete a row's item",
    description: "Say what stops working in description and use the verb in confirmLabel; onConfirm runs as the dialog closes.",
    code: `function WebhookDemo() {
  const [deleted, setDeleted] = React.useState(false)
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
      <div className="min-w-0">
        <p className="truncate font-mono text-xs text-fg">https://hooks.halcyon.studio/invoices</p>
        <p className="text-xs text-fg-muted">{deleted ? "Deleted. Events are no longer sent." : "invoice.paid, invoice.voided"}</p>
      </div>
      {deleted ? null : (
        <ConfirmDestructive
          triggerLabel="Delete"
          title="Delete this webhook?"
          description="Lumen stops sending invoice events to this URL straight away. Failed deliveries are not retried."
          confirmLabel="Delete webhook"
          onConfirm={() => setDeleted(true)}
        />
      )}
    </div>
  )
}`,
    node: <WebhookDemo />,
  },
  {
    title: "Opened from your own button",
    description: "With open set, the red trigger is not rendered: open the dialog from any control, and let cancelLabel name what is kept.",
    code: `function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Revoke production key</Button>
      <ConfirmDestructive
        title="Revoke the production API key?"
        description="Requests signed with lumen_live_…9f2c fail from now on. Create a new key first if anything still uses it."
        confirmLabel="Revoke key"
        cancelLabel="Keep key"
        open={open}
        onOpenChange={setOpen}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">Dialog {open ? "open" : "closed"}</p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
]
