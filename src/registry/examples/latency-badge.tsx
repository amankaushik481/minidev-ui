"use client"
import { LatencyBadge } from "@/registry/ui/latency-badge"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Endpoint list",
    description: "Default thresholds: under 100ms is fast, under 400ms slow, anything above very slow.",
    code: `<ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
  <li className="flex items-center justify-between px-4 py-2"><code className="font-mono text-xs text-fg">GET /v1/invoices</code><LatencyBadge ms={42} /></li>
  <li className="flex items-center justify-between px-4 py-2"><code className="font-mono text-xs text-fg">POST /v1/invoices</code><LatencyBadge ms={186} /></li>
  <li className="flex items-center justify-between px-4 py-2"><code className="font-mono text-xs text-fg">GET /v1/reports/annual</code><LatencyBadge ms={912.6} /></li>
</ul>`,
    node: (
      <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
        <li className="flex items-center justify-between px-4 py-2"><code className="font-mono text-xs text-fg">GET /v1/invoices</code><LatencyBadge ms={42} /></li>
        <li className="flex items-center justify-between px-4 py-2"><code className="font-mono text-xs text-fg">POST /v1/invoices</code><LatencyBadge ms={186} /></li>
        <li className="flex items-center justify-between px-4 py-2"><code className="font-mono text-xs text-fg">GET /v1/reports/annual</code><LatencyBadge ms={912.6} /></li>
      </ul>
    ),
  },
  {
    title: "Thresholds for slow jobs",
    description: "A PDF export is fine at 2 seconds, so raise the bounds for that row.",
    code: `<div className="flex items-center gap-3">
  <span className="text-sm text-fg">PDF export</span>
  <LatencyBadge ms={2140} thresholds={{ fast: 3000, slow: 8000 }} />
</div>`,
    node: (
      <div className="flex items-center gap-3">
        <span className="text-sm text-fg">PDF export</span>
        <LatencyBadge ms={2140} thresholds={{ fast: 3000, slow: 8000 }} />
      </div>
    ),
  },
]
