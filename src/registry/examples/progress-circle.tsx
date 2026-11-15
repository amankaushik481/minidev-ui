"use client"
import * as React from "react"
import { ProgressCircle } from "@/registry/ui/progress-circle"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Upload list",
    description: "One ring per file in a list; label names each file for screen readers.",
    code: `<ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
  <li className="flex items-center justify-between gap-3 px-4 py-2">
    <span className="truncate text-sm text-fg">receipts-october.zip</span>
    <ProgressCircle value={100} size={32} label="receipts-october.zip" />
  </li>
  <li className="flex items-center justify-between gap-3 px-4 py-2">
    <span className="truncate text-sm text-fg">bank-statement-q3.pdf</span>
    <ProgressCircle value={64} size={32} label="bank-statement-q3.pdf" />
  </li>
  <li className="flex items-center justify-between gap-3 px-4 py-2">
    <span className="truncate text-sm text-fg">payroll-2026-11.csv</span>
    <ProgressCircle value={8} size={32} label="payroll-2026-11.csv" />
  </li>
</ul>`,
    node: (
      <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
        <li className="flex items-center justify-between gap-3 px-4 py-2">
          <span className="truncate text-sm text-fg">receipts-october.zip</span>
          <ProgressCircle value={100} size={32} label="receipts-october.zip" />
        </li>
        <li className="flex items-center justify-between gap-3 px-4 py-2">
          <span className="truncate text-sm text-fg">bank-statement-q3.pdf</span>
          <ProgressCircle value={64} size={32} label="bank-statement-q3.pdf" />
        </li>
        <li className="flex items-center justify-between gap-3 px-4 py-2">
          <span className="truncate text-sm text-fg">payroll-2026-11.csv</span>
          <ProgressCircle value={8} size={32} label="payroll-2026-11.csv" />
        </li>
      </ul>
    ),
  },
  {
    title: "Steps instead of a percent",
    description: "Convert counts to a percent for the ring, hide its number and say the count in text.",
    code: `<div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
  <ProgressCircle value={(3 / 5) * 100} size={44} showValue={false} label="Setup progress" />
  <div>
    <p className="text-sm font-medium text-fg">Finish setting up Lumen</p>
    <p className="text-xs text-fg-muted tabular-nums">3 of 5 steps done</p>
  </div>
</div>`,
    node: (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
        <ProgressCircle value={(3 / 5) * 100} size={44} showValue={false} label="Setup progress" />
        <div>
          <p className="text-sm font-medium text-fg">Finish setting up Lumen</p>
          <p className="text-xs text-fg-muted tabular-nums">3 of 5 steps done</p>
        </div>
      </div>
    ),
  },
]
