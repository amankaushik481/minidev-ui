"use client"
import * as React from "react"
import { CancelFlow } from "@/registry/ui/cancel-flow"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import type { Example } from "./types"

function ReasonDemo() {
  const [reason, setReason] = React.useState<string | null>(null)
  if (reason) {
    return (
      <div className="w-full max-w-sm space-y-3 rounded-xl border border-border bg-surface p-5 text-sm">
        <p className="text-fg">Scale ends on Dec 1. Reason noted: {reason}.</p>
        <Button size="sm" variant="outline" onClick={() => setReason(null)}>Start over</Button>
      </div>
    )
  }
  return (
    <CancelFlow
      planName="Scale"
      reasons={["Too expensive", "Missing a feature I need", "Moving to another tool", "Only needed it for one project"]}
      onConfirm={setReason}
      className="w-full max-w-sm"
    />
  )
}

function DialogDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>Cancel plan</DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">Cancel subscription</DialogTitle>
        <CancelFlow planName="Pro" onConfirm={() => setOpen(false)} className="border-0 bg-transparent p-0 shadow-none" />
      </DialogContent>
    </Dialog>
  )
}

export const examples: Example[] = [
  {
    title: "Your reasons and a result",
    description: "reasons replaces the list, and onConfirm gets the chosen string; swap the card for your own confirmation once it runs.",
    code: `function ReasonDemo() {
  const [reason, setReason] = React.useState<string | null>(null)
  if (reason) {
    return (
      <div className="w-full max-w-sm space-y-3 rounded-xl border border-border bg-surface p-5 text-sm">
        <p className="text-fg">Scale ends on Dec 1. Reason noted: {reason}.</p>
        <Button size="sm" variant="outline" onClick={() => setReason(null)}>Start over</Button>
      </div>
    )
  }
  return (
    <CancelFlow
      planName="Scale"
      reasons={["Too expensive", "Missing a feature I need", "Moving to another tool", "Only needed it for one project"]}
      onConfirm={setReason}
      className="w-full max-w-sm"
    />
  )
}`,
    node: <ReasonDemo />,
  },
  {
    title: "Inside a dialog",
    description: "Strip the card styles with className and close the dialog from onConfirm; the dialog's X covers backing out.",
    code: `function DialogDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>Cancel plan</DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">Cancel subscription</DialogTitle>
        <CancelFlow planName="Pro" onConfirm={() => setOpen(false)} className="border-0 bg-transparent p-0 shadow-none" />
      </DialogContent>
    </Dialog>
  )
}`,
    node: <DialogDemo />,
  },
]
