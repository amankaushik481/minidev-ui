"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { InlineAlert } from "@/registry/ui/inline-alert"
import type { Example } from "./types"

function SaveResult() {
  const [result, setResult] = React.useState<"saved" | "failed" | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {result === "saved" ? (
        <InlineAlert tone="success">Saved. New invoices use these payment terms.</InlineAlert>
      ) : null}
      {result === "failed" ? (
        <InlineAlert tone="danger" title="Could not save">Payment terms must be between 7 and 90 days.</InlineAlert>
      ) : null}
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setResult("saved")}>Save</Button>
        <Button size="sm" variant="outline" onClick={() => setResult("failed")}>Save with an error</Button>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Warning in a settings section",
    description: "warning and danger are role=\"alert\", so they are announced when they appear; keep them for things the user must act on.",
    code: `<InlineAlert tone="warning" title="Payouts paused" className="w-full max-w-md">
  Add a bank account to resume weekly payouts. Pending payouts total $3,180.00.
</InlineAlert>`,
    node: (
      <InlineAlert tone="warning" title="Payouts paused" className="w-full max-w-md">
        Add a bank account to resume weekly payouts. Pending payouts total $3,180.00.
      </InlineAlert>
    ),
  },
  {
    title: "Result of a save",
    description: "Render the alert from the result of the request. success is a polite status, danger interrupts.",
    code: `function SaveResult() {
  const [result, setResult] = React.useState<"saved" | "failed" | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {result === "saved" ? (
        <InlineAlert tone="success">Saved. New invoices use these payment terms.</InlineAlert>
      ) : null}
      {result === "failed" ? (
        <InlineAlert tone="danger" title="Could not save">Payment terms must be between 7 and 90 days.</InlineAlert>
      ) : null}
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setResult("saved")}>Save</Button>
        <Button size="sm" variant="outline" onClick={() => setResult("failed")}>Save with an error</Button>
      </div>
    </div>
  )
}`,
    node: <SaveResult />,
  },
  {
    title: "Neutral note",
    description: "neutral has a grey info icon and border, for context that is not a problem.",
    code: `<InlineAlert className="w-full max-w-md">Exchange rates are locked when an invoice is sent, not when it is paid.</InlineAlert>`,
    node: <InlineAlert className="w-full max-w-md">Exchange rates are locked when an invoice is sent, not when it is paid.</InlineAlert>,
  },
]
