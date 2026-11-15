"use client"
import * as React from "react"
import { DeleteAccountConfirm } from "@/registry/ui/delete-account-confirm"
import { DangerZone } from "@/registry/ui/danger-zone"
import { InlineAlert } from "@/registry/ui/inline-alert"
import type { Example } from "./types"

function DoneDemo() {
  const [deleted, setDeleted] = React.useState(false)
  return deleted ? (
    <InlineAlert tone="success" title="Account scheduled for deletion" className="w-full max-w-md">
      Your data is removed within 30 days. You have been signed out.
    </InlineAlert>
  ) : (
    <DeleteAccountConfirm className="w-full max-w-md" onConfirm={() => setDeleted(true)} />
  )
}

export const examples: Example[] = [
  {
    title: "Type the workspace name",
    description: "Inside a DangerZone, children replace the built-in button. The match is exact and case-sensitive.",
    code: `<DangerZone
  className="w-full max-w-md"
  title="Delete workspace"
  description="Removes northwind-prod, its 214 invoices and every member's access."
>
  <DeleteAccountConfirm confirmText="northwind-prod" />
</DangerZone>`,
    node: (
      <DangerZone
        className="w-full max-w-md"
        title="Delete workspace"
        description="Removes northwind-prod, its 214 invoices and every member's access."
      >
        <DeleteAccountConfirm confirmText="northwind-prod" />
      </DangerZone>
    ),
  },
  {
    title: "Replace it after confirming",
    description: "onConfirm takes no arguments and the form stays as is, so swap it for a result message yourself. Type DELETE to try it.",
    code: `function DoneDemo() {
  const [deleted, setDeleted] = React.useState(false)
  return deleted ? (
    <InlineAlert tone="success" title="Account scheduled for deletion" className="w-full max-w-md">
      Your data is removed within 30 days. You have been signed out.
    </InlineAlert>
  ) : (
    <DeleteAccountConfirm className="w-full max-w-md" onConfirm={() => setDeleted(true)} />
  )
}`,
    node: <DoneDemo />,
  },
]
