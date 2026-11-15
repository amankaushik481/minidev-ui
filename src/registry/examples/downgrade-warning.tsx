"use client"
import * as React from "react"
import { DowngradeWarning } from "@/registry/ui/downgrade-warning"
import type { Example } from "./types"

function PlanDemo() {
  const [status, setStatus] = React.useState("You are on Scale.")
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <DowngradeWarning
        title="Downgrade to Starter?"
        description="Cash-flow forecasts and bank sync turn off on Dec 1. Your invoices and customers stay."
        keepLabel="Keep Scale"
        downgradeLabel="Downgrade on Dec 1"
        onKeep={() => setStatus("Still on Scale.")}
        onDowngrade={() => setStatus("Starter starts on Dec 1.")}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{status}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Plan downgrade",
    description: "Say what turns off and when, and put the date in the destructive label so nobody expects it to happen now.",
    code: `function PlanDemo() {
  const [status, setStatus] = React.useState("You are on Scale.")
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <DowngradeWarning
        title="Downgrade to Starter?"
        description="Cash-flow forecasts and bank sync turn off on Dec 1. Your invoices and customers stay."
        keepLabel="Keep Scale"
        downgradeLabel="Downgrade on Dec 1"
        onKeep={() => setStatus("Still on Scale.")}
        onDowngrade={() => setStatus("Starter starts on Dec 1.")}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{status}</p>
    </div>
  )
}`,
    node: <PlanDemo />,
  },
  {
    title: "Removing seats",
    description: "The same card works for any reduction that takes something away, such as seats on a team plan.",
    code: `<DowngradeWarning
  className="w-full max-w-md"
  title="Remove 4 seats?"
  description="Lee Park, Sam Lowe, Noor Haddad and Priya Raman lose access at the end of this billing period."
  keepLabel="Keep 12 seats"
  downgradeLabel="Remove seats"
/>`,
    node: (
      <DowngradeWarning
        className="w-full max-w-md"
        title="Remove 4 seats?"
        description="Lee Park, Sam Lowe, Noor Haddad and Priya Raman lose access at the end of this billing period."
        keepLabel="Keep 12 seats"
        downgradeLabel="Remove seats"
      />
    ),
  },
]
