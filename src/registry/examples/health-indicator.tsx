"use client"
import * as React from "react"
import { HealthIndicator } from "@/registry/ui/health-indicator"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Service list",
    description: "label names the service; screen readers still hear the status after it, such as \"Webhooks: down\".",
    code: `<ul className="w-full max-w-xs divide-y divide-border rounded-xl border border-border bg-surface">
  <li className="px-4 py-2.5"><HealthIndicator status="operational" label="Dashboard" /></li>
  <li className="px-4 py-2.5"><HealthIndicator status="operational" label="Invoicing API" /></li>
  <li className="px-4 py-2.5"><HealthIndicator status="degraded" label="Bank sync" /></li>
  <li className="px-4 py-2.5"><HealthIndicator status="down" label="Webhooks" /></li>
</ul>`,
    node: (
      <ul className="w-full max-w-xs divide-y divide-border rounded-xl border border-border bg-surface">
        <li className="px-4 py-2.5"><HealthIndicator status="operational" label="Dashboard" /></li>
        <li className="px-4 py-2.5"><HealthIndicator status="operational" label="Invoicing API" /></li>
        <li className="px-4 py-2.5"><HealthIndicator status="degraded" label="Bank sync" /></li>
        <li className="px-4 py-2.5"><HealthIndicator status="down" label="Webhooks" /></li>
      </ul>
    ),
  },
  {
    title: "Status word in a table cell",
    description: "Without label the status itself is the text, capitalised.",
    code: `<table className="w-full max-w-sm text-sm">
  <tbody className="divide-y divide-border">
    <tr><td className="py-2 text-fg">eu-west</td><td className="py-2 text-right"><HealthIndicator status="operational" /></td></tr>
    <tr><td className="py-2 text-fg">us-east</td><td className="py-2 text-right"><HealthIndicator status="degraded" /></td></tr>
  </tbody>
</table>`,
    node: (
      <table className="w-full max-w-sm text-sm">
        <tbody className="divide-y divide-border">
          <tr><td className="py-2 text-fg">eu-west</td><td className="py-2 text-right"><HealthIndicator status="operational" /></td></tr>
          <tr><td className="py-2 text-fg">us-east</td><td className="py-2 text-right"><HealthIndicator status="degraded" /></td></tr>
        </tbody>
      </table>
    ),
  },
]
