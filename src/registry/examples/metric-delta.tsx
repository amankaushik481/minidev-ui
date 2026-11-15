"use client"
import { MetricDelta } from "@/registry/ui/metric-delta"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Up, down and flat",
    description: "The sign sets the arrow; zero is muted with no arrow.",
    code: `<div className="flex items-center gap-6">
  <MetricDelta value={12.4} />
  <MetricDelta value={-3.1} />
  <MetricDelta value={0} />
</div>`,
    node: (
      <div className="flex items-center gap-6">
        <MetricDelta value={12.4} />
        <MetricDelta value={-3.1} />
        <MetricDelta value={0} />
      </div>
    ),
  },
  {
    title: "Latency, where down is good",
    description: "invert turns a fall green and a rise red; screen readers still hear Up or Down.",
    code: `<dl className="grid w-full max-w-sm grid-cols-2 gap-3">
  <div className="rounded-xl border border-border bg-surface p-3">
    <dt className="text-xs text-fg-muted">p95 latency</dt>
    <dd className="mt-1 flex items-baseline justify-between text-lg font-medium tabular-nums text-fg">182 ms <MetricDelta value={-12} invert /></dd>
  </div>
  <div className="rounded-xl border border-border bg-surface p-3">
    <dt className="text-xs text-fg-muted">Error rate</dt>
    <dd className="mt-1 flex items-baseline justify-between text-lg font-medium tabular-nums text-fg">0.4% <MetricDelta value={5} invert /></dd>
  </div>
</dl>`,
    node: (
      <dl className="grid w-full max-w-sm grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-surface p-3">
          <dt className="text-xs text-fg-muted">p95 latency</dt>
          <dd className="mt-1 flex items-baseline justify-between text-lg font-medium tabular-nums text-fg">182 ms <MetricDelta value={-12} invert /></dd>
        </div>
        <div className="rounded-xl border border-border bg-surface p-3">
          <dt className="text-xs text-fg-muted">Error rate</dt>
          <dd className="mt-1 flex items-baseline justify-between text-lg font-medium tabular-nums text-fg">0.4% <MetricDelta value={5} invert /></dd>
        </div>
      </dl>
    ),
  },
  {
    title: "In a sentence",
    description: "It is an inline span, so it sits inside running text in a summary or digest.",
    code: `<p className="max-w-md text-sm text-fg-muted">
  Revenue closed at $61,400 this month, <MetricDelta value={9.5} /> on October.
</p>`,
    node: (
      <p className="max-w-md text-sm text-fg-muted">
        Revenue closed at $61,400 this month, <MetricDelta value={9.5} /> on October.
      </p>
    ),
  },
]
