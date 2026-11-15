"use client"
import * as React from "react"
import { AttachmentChip } from "@/registry/ui/attachment-chip"
import { MessageBubble } from "@/registry/ui/message-bubble"
import type { Example } from "./types"

function AttachedFiles() {
  const [files, setFiles] = React.useState([
    { name: "INV-2041.pdf", size: "240 KB" },
    { name: "northwind-statement-october-2026.csv", size: "1.2 MB" },
    { name: "signed-contract.pdf", size: "88 KB" },
  ])
  return (
    <div className="flex w-full max-w-md flex-wrap gap-1.5">
      {files.map((f) => (
        <AttachmentChip key={f.name} name={f.name} meta={f.size} onRemove={() => setFiles((all) => all.filter((x) => x.name !== f.name))} />
      ))}
      {files.length === 0 ? <p className="text-xs text-fg-muted">No files attached.</p> : null}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Removable attachments",
    description: "Keep the files in state and remove one in onRemove. Each remove button is named after its file.",
    code: `function AttachedFiles() {
  const [files, setFiles] = React.useState([
    { name: "INV-2041.pdf", size: "240 KB" },
    { name: "northwind-statement-october-2026.csv", size: "1.2 MB" },
    { name: "signed-contract.pdf", size: "88 KB" },
  ])
  return (
    <div className="flex w-full max-w-md flex-wrap gap-1.5">
      {files.map((f) => (
        <AttachmentChip key={f.name} name={f.name} meta={f.size} onRemove={() => setFiles((all) => all.filter((x) => x.name !== f.name))} />
      ))}
      {files.length === 0 ? <p className="text-xs text-fg-muted">No files attached.</p> : null}
    </div>
  )
}`,
    node: <AttachedFiles />,
  },
  {
    title: "On a sent message",
    description: "Without onRemove the chip is read-only, which suits files already sent in a chat.",
    code: `<div className="w-full max-w-md">
  <MessageBubble role="user">
    <span className="block">Can you check these against the bank export?</span>
    <span className="mt-2 flex flex-wrap gap-1.5">
      <AttachmentChip name="payouts-oct.csv" meta="64 KB" />
      <AttachmentChip name="bank-export.csv" meta="310 KB" />
    </span>
  </MessageBubble>
</div>`,
    node: (
      <div className="w-full max-w-md">
        <MessageBubble role="user">
          <span className="block">Can you check these against the bank export?</span>
          <span className="mt-2 flex flex-wrap gap-1.5">
            <AttachmentChip name="payouts-oct.csv" meta="64 KB" />
            <AttachmentChip name="bank-export.csv" meta="310 KB" />
          </span>
        </MessageBubble>
      </div>
    ),
  },
]
