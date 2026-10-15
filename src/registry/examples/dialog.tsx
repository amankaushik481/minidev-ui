"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import type { Example } from "./types"

function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  const [sending, setSending] = React.useState(false)
  const send = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setOpen(false)
    }, 900)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Invite teammate</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to Lumen</DialogTitle>
          <DialogDescription>They get an email with a link that works for 7 days.</DialogDescription>
        </DialogHeader>
        <FormField id="invite-email" label="Email">
          <Input id="invite-email" type="email" placeholder="theo@northwind.io" />
        </FormField>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={send} disabled={sending}>{sending ? "Sending…" : "Send invite"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const examples: Example[] = [
  {
    title: "Form in a dialog",
    description: "Header, a form field and a footer; DialogClose wraps the cancel button so it closes without extra state.",
    code: `<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Rename workspace</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Rename workspace</DialogTitle>
      <DialogDescription>The new name shows on invoices and in the customer portal.</DialogDescription>
    </DialogHeader>
    <FormField id="workspace-name" label="Name">
      <Input id="workspace-name" defaultValue="Northwind" />
    </FormField>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    node: (
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>Rename workspace</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename workspace</DialogTitle>
            <DialogDescription>The new name shows on invoices and in the customer portal.</DialogDescription>
          </DialogHeader>
          <FormField id="workspace-name" label="Name">
            <Input id="workspace-name" defaultValue="Northwind" />
          </FormField>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    title: "Controlled open",
    description: "Own the open state to close the dialog after an async action finishes instead of on click.",
    code: `function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  const [sending, setSending] = React.useState(false)
  const send = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setOpen(false)
    }, 900)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Invite teammate</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to Lumen</DialogTitle>
          <DialogDescription>They get an email with a link that works for 7 days.</DialogDescription>
        </DialogHeader>
        <FormField id="invite-email" label="Email">
          <Input id="invite-email" type="email" placeholder="theo@northwind.io" />
        </FormField>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={send} disabled={sending}>{sending ? "Sending…" : "Send invite"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Footer close button",
    description: "Hide the corner X with showCloseButton and let the footer render a Close button instead for a notice people must read.",
    code: `<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>View updated terms</DialogTrigger>
  <DialogContent showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Updated terms of service</DialogTitle>
      <DialogDescription>From November 1, card payments on Lumen are processed by Northwind Payments Ltd. Nothing changes for bank transfers.</DialogDescription>
    </DialogHeader>
    <DialogFooter showCloseButton />
  </DialogContent>
</Dialog>`,
    node: (
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>View updated terms</DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Updated terms of service</DialogTitle>
            <DialogDescription>From November 1, card payments on Lumen are processed by Northwind Payments Ltd. Nothing changes for bank transfers.</DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    ),
  },
]
