"use client"
import * as React from "react"
import { WebhookList, type Webhook } from "@/registry/ui/webhook-list"
import type { Example } from "./types"

function AddEndpointDemo() {
  const [hooks, setHooks] = React.useState<Webhook[]>([])
  const add = () =>
    setHooks((list) => [...list, { url: `https://hooks.acme.example/lumen/${list.length + 1}`, events: "invoice.paid", status: "active" }])
  return <WebhookList className="w-full max-w-lg" hooks={hooks} onAdd={add} />
}

export const examples: Example[] = [
  {
    title: "Endpoints",
    description: "events is one comma-separated string; status is active or paused.",
    code: `<WebhookList
  className="w-full max-w-lg"
  hooks={[
    { url: "https://api.northwind.example/hooks/lumen", events: "invoice.paid, invoice.overdue", status: "active" },
    { url: "https://ops.acme.example/lumen/payouts", events: "payout.sent", status: "active" },
    { url: "https://staging.acme.example/lumen/test", events: "invoice.created", status: "paused" },
  ]}
/>`,
    node: (
      <WebhookList
        className="w-full max-w-lg"
        hooks={[
          { url: "https://api.northwind.example/hooks/lumen", events: "invoice.paid, invoice.overdue", status: "active" },
          { url: "https://ops.acme.example/lumen/payouts", events: "payout.sent", status: "active" },
          { url: "https://staging.acme.example/lumen/test", events: "invoice.created", status: "paused" },
        ]}
      />
    ),
  },
  {
    title: "Empty, then add",
    description: "An empty hooks array shows the empty state; onAdd is where you open your create dialog.",
    code: `function AddEndpointDemo() {
  const [hooks, setHooks] = React.useState<Webhook[]>([])
  const add = () =>
    setHooks((list) => [...list, { url: \`https://hooks.acme.example/lumen/\${list.length + 1}\`, events: "invoice.paid", status: "active" }])
  return <WebhookList className="w-full max-w-lg" hooks={hooks} onAdd={add} />
}`,
    node: <AddEndpointDemo />,
  },
]
