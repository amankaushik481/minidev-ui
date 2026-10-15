"use client"
import * as React from "react"
import { LoaderCircleIcon, Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/ui/alert-dialog"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function AsyncDemo() {
  const [open, setOpen] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [voided, setVoided] = React.useState(false)
  const confirm = () => {
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      setVoided(true)
      setOpen(false)
    }, 1000)
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="destructive" />}>Void invoice</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Void INV-2041?</AlertDialogTitle>
          <AlertDialogDescription>Northwind will no longer be able to pay it. The invoice stays in your records as voided.</AlertDialogDescription>
          <AlertDialogActions>
            <AlertDialogClose render={<Button variant="outline" />} disabled={busy}>Keep invoice</AlertDialogClose>
            <Button variant="destructive" onClick={confirm} disabled={busy}>
              {busy ? <LoaderCircleIcon className="animate-spin" /> : null}
              {busy ? "Voiding…" : "Void invoice"}
            </Button>
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-xs text-fg-muted">{voided ? "INV-2041 is now void." : "Confirming takes a second, then the dialog closes."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Confirm a bulk action",
    description: "Not every confirmation is destructive; use the default button for the primary action and spell out what happens.",
    code: `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>Send reminders</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Send 12 payment reminders?</AlertDialogTitle>
    <AlertDialogDescription>
      Each overdue customer gets one email from billing@lumen.app. Anyone emailed in the last 3 days is skipped.
    </AlertDialogDescription>
    <AlertDialogActions>
      <AlertDialogClose render={<Button variant="outline" />}>Not now</AlertDialogClose>
      <AlertDialogClose render={<Button />}>Send reminders</AlertDialogClose>
    </AlertDialogActions>
  </AlertDialogContent>
</AlertDialog>`,
    node: (
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>Send reminders</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Send 12 payment reminders?</AlertDialogTitle>
          <AlertDialogDescription>
            Each overdue customer gets one email from billing@lumen.app. Anyone emailed in the last 3 days is skipped.
          </AlertDialogDescription>
          <AlertDialogActions>
            <AlertDialogClose render={<Button variant="outline" />}>Not now</AlertDialogClose>
            <AlertDialogClose render={<Button />}>Send reminders</AlertDialogClose>
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  {
    title: "Async confirm",
    description: "Control open yourself so the dialog stays up while the request runs and closes only once it succeeds.",
    code: `function AsyncDemo() {
  const [open, setOpen] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [voided, setVoided] = React.useState(false)
  const confirm = () => {
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      setVoided(true)
      setOpen(false)
    }, 1000)
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="destructive" />}>Void invoice</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Void INV-2041?</AlertDialogTitle>
          <AlertDialogDescription>Northwind will no longer be able to pay it. The invoice stays in your records as voided.</AlertDialogDescription>
          <AlertDialogActions>
            <AlertDialogClose render={<Button variant="outline" />} disabled={busy}>Keep invoice</AlertDialogClose>
            <Button variant="destructive" onClick={confirm} disabled={busy}>
              {busy ? <LoaderCircleIcon className="animate-spin" /> : null}
              {busy ? "Voiding…" : "Void invoice"}
            </Button>
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-xs text-fg-muted">{voided ? "INV-2041 is now void." : "Confirming takes a second, then the dialog closes."}</p>
    </div>
  )
}`,
    node: <AsyncDemo />,
  },
  {
    title: "Icon trigger in a row",
    description: "The trigger can be any button; give an icon trigger an aria-label and name the person or thing in the title.",
    code: `<div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2 shadow-raised">
  <div className="min-w-0">
    <p className="truncate text-sm font-medium text-fg">Sam Lowe</p>
    <p className="truncate text-xs text-fg-muted">sam@northwind.io · Finance</p>
  </div>
  <AlertDialog>
    <AlertDialogTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Remove Sam Lowe" />}>
      <Trash2Icon />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogTitle>Remove Sam Lowe from Finance?</AlertDialogTitle>
      <AlertDialogDescription>They lose access to invoices and payouts right away. Their past activity stays in the audit log.</AlertDialogDescription>
      <AlertDialogActions>
        <AlertDialogClose render={<Button variant="outline" />}>Cancel</AlertDialogClose>
        <AlertDialogClose render={<Button variant="destructive" />}>Remove</AlertDialogClose>
      </AlertDialogActions>
    </AlertDialogContent>
  </AlertDialog>
</div>`,
    node: (
      <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2 shadow-raised">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-fg">Sam Lowe</p>
          <p className="truncate text-xs text-fg-muted">sam@northwind.io · Finance</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Remove Sam Lowe" />}>
            <Trash2Icon />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Remove Sam Lowe from Finance?</AlertDialogTitle>
            <AlertDialogDescription>They lose access to invoices and payouts right away. Their past activity stays in the audit log.</AlertDialogDescription>
            <AlertDialogActions>
              <AlertDialogClose render={<Button variant="outline" />}>Cancel</AlertDialogClose>
              <AlertDialogClose render={<Button variant="destructive" />}>Remove</AlertDialogClose>
            </AlertDialogActions>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
]
