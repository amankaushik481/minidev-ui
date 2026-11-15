"use client"
import * as React from "react"
import { StatusDot } from "@/registry/ui/status-dot"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Beside text",
    description: "With text next to it, leave out label: the dot is hidden from screen readers and the words carry the status.",
    code: `<ul className="w-full max-w-xs space-y-2 text-sm text-fg">
  <li className="flex items-center gap-2"><StatusDot tone="success" /> Deployed to production</li>
  <li className="flex items-center gap-2"><StatusDot tone="warning" /> Waiting for review</li>
  <li className="flex items-center gap-2"><StatusDot tone="danger" /> Build failed</li>
  <li className="flex items-center gap-2"><StatusDot /> Draft</li>
</ul>`,
    node: (
      <ul className="w-full max-w-xs space-y-2 text-sm text-fg">
        <li className="flex items-center gap-2"><StatusDot tone="success" /> Deployed to production</li>
        <li className="flex items-center gap-2"><StatusDot tone="warning" /> Waiting for review</li>
        <li className="flex items-center gap-2"><StatusDot tone="danger" /> Build failed</li>
        <li className="flex items-center gap-2"><StatusDot /> Draft</li>
      </ul>
    ),
  },
  {
    title: "Alone in a compact column",
    description: "When the dot is the only thing in the cell, label gives it role=\"img\" and a name.",
    code: `<table className="w-full max-w-sm text-sm">
  <tbody className="divide-y divide-border">
    <tr><td className="py-2 text-fg">payments-worker</td><td className="py-2 text-right"><StatusDot tone="success" label="Healthy" /></td></tr>
    <tr><td className="py-2 text-fg">invoice-renderer</td><td className="py-2 text-right"><StatusDot tone="danger" label="Failing" /></td></tr>
  </tbody>
</table>`,
    node: (
      <table className="w-full max-w-sm text-sm">
        <tbody className="divide-y divide-border">
          <tr><td className="py-2 text-fg">payments-worker</td><td className="py-2 text-right"><StatusDot tone="success" label="Healthy" /></td></tr>
          <tr><td className="py-2 text-fg">invoice-renderer</td><td className="py-2 text-right"><StatusDot tone="danger" label="Failing" /></td></tr>
        </tbody>
      </table>
    ),
  },
]
