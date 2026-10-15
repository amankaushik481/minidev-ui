"use client"
import * as React from "react"
import { SignaturePad } from "@/registry/ui/signature-pad"
import { Button } from "@/registry/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog"
import type { Example } from "./types"

function SubmitDemo() {
  const [signature, setSignature] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <SignaturePad label="Sign to approve INV-2041" onChange={setSignature} />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-fg-muted">
          {signature ? "Captured as a " + Math.round(signature.length / 1024) + " KB PNG" : "Nothing signed yet"}
        </p>
        <Button size="sm" disabled={!signature}>
          Approve
        </Button>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Label and height",
    description: "label names the field for screen readers and height sets the canvas in pixels.",
    code: `<SignaturePad label="Signature of Maya Chen" height={120} />`,
    node: <SignaturePad label="Signature of Maya Chen" height={120} />,
  },
  {
    title: "Submit when signed",
    description: "onChange gives a PNG data URL after each stroke and null after Clear, so you can gate the submit button on it.",
    code: `function SubmitDemo() {
  const [signature, setSignature] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <SignaturePad label="Sign to approve INV-2041" onChange={setSignature} />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-fg-muted">
          {signature ? "Captured as a " + Math.round(signature.length / 1024) + " KB PNG" : "Nothing signed yet"}
        </p>
        <Button size="sm" disabled={!signature}>
          Approve
        </Button>
      </div>
    </div>
  )
}`,
    node: <SubmitDemo />,
  },
  {
    title: "In a dialog",
    description: "The canvas measures itself on mount, so it works inside a Dialog that opens later.",
    code: `<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Sign agreement</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Sign the Northwind agreement</DialogTitle>
      <DialogDescription>Draw your signature, or choose Type instead to type your name.</DialogDescription>
    </DialogHeader>
    <SignaturePad label="Signature" height={160} className="max-w-none" />
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
      <Button>Sign and send</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    node: (
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>Sign agreement</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign the Northwind agreement</DialogTitle>
            <DialogDescription>Draw your signature, or choose Type instead to type your name.</DialogDescription>
          </DialogHeader>
          <SignaturePad label="Signature" height={160} className="max-w-none" />
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button>Sign and send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
]
