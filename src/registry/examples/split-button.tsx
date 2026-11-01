"use client"
import * as React from "react"
import { SplitButton } from "@/registry/ui/split-button"
import type { Example } from "./types"

function SendDemo() {
  const [status, setStatus] = React.useState("INV-2041 is a draft")
  return (
    <div className="flex flex-col items-center gap-3">
      <SplitButton
        label="Send invoice"
        onPrimaryClick={() => setStatus("INV-2041 sent to Northwind")}
        items={[
          { label: "Send and mark as paid", onSelect: () => setStatus("INV-2041 sent and marked as paid") },
          { label: "Schedule for Monday", onSelect: () => setStatus("INV-2041 scheduled for Monday 09:00") },
          { label: "Discard draft", destructive: true, onSelect: () => setStatus("Draft discarded") },
        ]}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{status}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom actions",
    description: "The primary label is the common case; related choices go in items and a destructive one sits last.",
    code: `<SplitButton
  label="Deploy to production"
  items={[
    { label: "Deploy to staging" },
    { label: "Create preview link" },
    { label: "Roll back", destructive: true },
  ]}
/>`,
    node: (
      <SplitButton
        label="Deploy to production"
        items={[
          { label: "Deploy to staging" },
          { label: "Create preview link" },
          { label: "Roll back", destructive: true },
        ]}
      />
    ),
  },
  {
    title: "With handlers",
    description: "onPrimaryClick runs for the main button and each item has its own onSelect.",
    code: `function SendDemo() {
  const [status, setStatus] = React.useState("INV-2041 is a draft")
  return (
    <div className="flex flex-col items-center gap-3">
      <SplitButton
        label="Send invoice"
        onPrimaryClick={() => setStatus("INV-2041 sent to Northwind")}
        items={[
          { label: "Send and mark as paid", onSelect: () => setStatus("INV-2041 sent and marked as paid") },
          { label: "Schedule for Monday", onSelect: () => setStatus("INV-2041 scheduled for Monday 09:00") },
          { label: "Discard draft", destructive: true, onSelect: () => setStatus("Draft discarded") },
        ]}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{status}</p>
    </div>
  )
}`,
    node: <SendDemo />,
  },
  {
    title: "Disabled",
    description: "disabled turns off both halves, which is right while a save is still running.",
    code: `<SplitButton label="Saving" disabled />`,
    node: <SplitButton label="Saving" disabled />,
  },
]
