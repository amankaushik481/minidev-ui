"use client"
import { ToolResultPanel } from "@/registry/ui/tool-result-panel"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Object output",
    description: "Objects are pretty-printed for you; there is no need to stringify them.",
    code: `<ToolResultPanel
  name="get_payout"
  status="success"
  output={{ payout: "po_3911", amount: 48210.55, currency: "USD", arrives: "2026-11-03", invoices: 37 }}
/>`,
    node: (
      <ToolResultPanel
        name="get_payout"
        status="success"
        output={{ payout: "po_3911", amount: 48210.55, currency: "USD", arrives: "2026-11-03", invoices: 37 }}
      />
    ),
  },
  {
    title: "Error",
    description: "A string is shown as is, which suits an error message from the tool.",
    code: `<ToolResultPanel name="send_email" status="error" output={"SMTP 550: mailbox maya@northwind.example does not exist"} />`,
    node: (
      <ToolResultPanel name="send_email" status="error" output={"SMTP 550: mailbox maya@northwind.example does not exist"} />
    ),
  },
  {
    title: "Running",
    description: "Output still renders while running, so pass a placeholder until the result arrives.",
    code: `<ToolResultPanel name="export_ledger" status="running" output={"Waiting for result…"} />`,
    node: (
      <ToolResultPanel name="export_ledger" status="running" output={"Waiting for result…"} />
    ),
  },
]
