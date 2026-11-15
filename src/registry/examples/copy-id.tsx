"use client"
import * as React from "react"
import { CopyId } from "@/registry/ui/copy-id"
import type { Example } from "./types"

function ToastDemo() {
  const [note, setNote] = React.useState("")
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-medium text-fg">Invoice INV-2041</h3>
        <CopyId value="inv_01JD8Q4ZK7M2X9" onCopy={(id) => setNote(`${id} copied. Paste it into a support ticket.`)} />
      </div>
      <p className="text-xs text-fg-muted">{note}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "In a detail header",
    description: "onCopy runs only after the id is on the clipboard, so it is safe for a toast or a note.",
    code: `function ToastDemo() {
  const [note, setNote] = React.useState("")
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-medium text-fg">Invoice INV-2041</h3>
        <CopyId value="inv_01JD8Q4ZK7M2X9" onCopy={(id) => setNote(\`\${id} copied. Paste it into a support ticket.\`)} />
      </div>
      <p className="text-xs text-fg-muted">{note}</p>
    </div>
  )
}`,
    node: <ToastDemo />,
  },
  {
    title: "Request ids in a list",
    description: "Long ids truncate at 160px but copy in full; the full id is in the tooltip and the accessible name.",
    code: `<ul className="w-full max-w-md divide-y divide-border rounded-xl border border-border bg-surface text-sm">
  <li className="flex items-center justify-between gap-3 px-3 py-2">
    <span className="text-fg">POST /v1/invoices <span className="text-danger">500</span></span>
    <CopyId value="req_7f3a9b20c4e14d6f8a1b2c3d4e5f6a7b" />
  </li>
  <li className="flex items-center justify-between gap-3 px-3 py-2">
    <span className="text-fg">GET /v1/customers <span className="text-fg-muted">200</span></span>
    <CopyId value="req_02be6c91f0aa4c55" />
  </li>
</ul>`,
    node: (
      <ul className="w-full max-w-md divide-y divide-border rounded-xl border border-border bg-surface text-sm">
        <li className="flex items-center justify-between gap-3 px-3 py-2">
          <span className="text-fg">POST /v1/invoices <span className="text-danger">500</span></span>
          <CopyId value="req_7f3a9b20c4e14d6f8a1b2c3d4e5f6a7b" />
        </li>
        <li className="flex items-center justify-between gap-3 px-3 py-2">
          <span className="text-fg">GET /v1/customers <span className="text-fg-muted">200</span></span>
          <CopyId value="req_02be6c91f0aa4c55" />
        </li>
      </ul>
    ),
  },
]
