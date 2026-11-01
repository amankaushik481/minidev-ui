"use client"
import * as React from "react"
import { JsonViewer } from "@/registry/ui/json-viewer"
import type { Example } from "./types"

const event = {
  id: "evt_3kq9ZpL",
  type: "invoice.paid",
  created: "2026-10-09T15:02:11Z",
  livemode: true,
  data: {
    object: {
      id: "inv_8f3a2c",
      number: "LUM-2026-0147",
      customer: "cus_n0rthw1nd",
      amount_paid: 184000,
      currency: "usd",
      paid_at: "2026-10-09T15:02:09Z",
    },
    previous_attributes: { status: "open", amount_paid: 0 },
  },
  request: { id: "req_Y2x1ZmZ5", idempotency_key: null },
  pending_webhooks: 1,
}

const customer = {
  id: "cus_n0rthw1nd",
  name: "Northwind Traders",
  email: "billing@northwind.example",
  plan: "pro",
  seats: 12,
  delinquent: false,
  owner: { name: "Theo Okafor", role: "Admin" },
}

function CopyDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <JsonViewer
        value={customer}
        title="GET /v1/customers/cus_n0rthw1nd"
        defaultExpandDepth={1}
        onCopy={(text, kind, path) => setLast(kind === "path" ? `Copied path ${path}` : `Copied ${text.length} characters from ${path}`)}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{last ?? "Hover a row and use the copy buttons."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom data",
    description: "Pass any JSON value; defaultExpandDepth opens the first two levels so the payload is readable without clicking.",
    code: `const event = {
  id: "evt_3kq9ZpL",
  type: "invoice.paid",
  created: "2026-10-09T15:02:11Z",
  livemode: true,
  data: {
    object: {
      id: "inv_8f3a2c",
      number: "LUM-2026-0147",
      customer: "cus_n0rthw1nd",
      amount_paid: 184000,
      currency: "usd",
      paid_at: "2026-10-09T15:02:09Z",
    },
    previous_attributes: { status: "open", amount_paid: 0 },
  },
  request: { id: "req_Y2x1ZmZ5", idempotency_key: null },
  pending_webhooks: 1,
}

<JsonViewer value={event} title="POST /webhooks/lumen" defaultExpandDepth={2} defaultExpanded={[]} />`,
    node: <JsonViewer value={event} title="POST /webhooks/lumen" defaultExpandDepth={2} defaultExpanded={[]} />,
  },
  {
    title: "Compact without toolbar",
    description: "An empty title and toolbar false leave just the tree, and rootName labels the root row for an inline debug panel.",
    code: `const customer = {
  id: "cus_n0rthw1nd",
  name: "Northwind Traders",
  email: "billing@northwind.example",
  plan: "pro",
  seats: 12,
  delinquent: false,
  owner: { name: "Theo Okafor", role: "Admin" },
}

<JsonViewer
  value={customer}
  title=""
  toolbar={false}
  rootName="customer"
  defaultExpandDepth={1}
  defaultExpanded={[]}
  className="max-w-sm"
/>`,
    node: (
      <JsonViewer
        value={customer}
        title=""
        toolbar={false}
        rootName="customer"
        defaultExpandDepth={1}
        defaultExpanded={[]}
        className="max-w-sm"
      />
    ),
  },
  {
    title: "Copy callback",
    description: "onCopy tells you what was copied and from which path, so you can confirm it in your own toast.",
    code: `function CopyDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <JsonViewer
        value={customer}
        title="GET /v1/customers/cus_n0rthw1nd"
        defaultExpandDepth={1}
        onCopy={(text, kind, path) => setLast(kind === "path" ? \`Copied path \${path}\` : \`Copied \${text.length} characters from \${path}\`)}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{last ?? "Hover a row and use the copy buttons."}</p>
    </div>
  )
}`,
    node: <CopyDemo />,
  },
]
