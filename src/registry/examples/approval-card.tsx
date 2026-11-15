"use client"
import * as React from "react"
import { ApprovalCard } from "@/registry/ui/approval-card"
import type { Example } from "./types"

function RefundApproval() {
  const [decision, setDecision] = React.useState<"approved" | "rejected" | null>(null)
  if (decision) {
    return (
      <p role="status" className="w-full max-w-md rounded-xl border border-border bg-surface p-4 text-sm text-fg">
        Refund {decision}. Theo can see the decision on INV-2041.
      </p>
    )
  }
  return (
    <ApprovalCard
      title="Refund $1,240 on INV-2041"
      requester="Theo Okafor"
      summary="Northwind Labs was charged twice for 24 seats in October."
      approveLabel="Approve refund"
      rejectLabel="Reject refund"
      onApprove={() => setDecision("approved")}
      onReject={() => setDecision("rejected")}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Refund sign-off",
    description: "Replace the card with the outcome once someone decides, so it cannot be approved twice.",
    code: `function RefundApproval() {
  const [decision, setDecision] = React.useState<"approved" | "rejected" | null>(null)
  if (decision) {
    return (
      <p role="status" className="w-full max-w-md rounded-xl border border-border bg-surface p-4 text-sm text-fg">
        Refund {decision}. Theo can see the decision on INV-2041.
      </p>
    )
  }
  return (
    <ApprovalCard
      title="Refund $1,240 on INV-2041"
      requester="Theo Okafor"
      summary="Northwind Labs was charged twice for 24 seats in October."
      approveLabel="Approve refund"
      rejectLabel="Reject refund"
      onApprove={() => setDecision("approved")}
      onReject={() => setDecision("rejected")}
    />
  )
}`,
    node: <RefundApproval />,
  },
  {
    title: "An agent asking first",
    description: "A human-in-the-loop step before an agent sends emails, with Allow and Deny labels.",
    code: `<ApprovalCard
  title="Send 214 overdue reminders"
  requester="Billing Agent"
  summary="Drafted from the overdue list at 09:00. Each email links to its invoice and a pay button."
  approveLabel="Allow"
  rejectLabel="Deny"
/>`,
    node: (
      <ApprovalCard
        title="Send 214 overdue reminders"
        requester="Billing Agent"
        summary="Drafted from the overdue list at 09:00. Each email links to its invoice and a pay button."
        approveLabel="Allow"
        rejectLabel="Deny"
      />
    ),
  },
]
