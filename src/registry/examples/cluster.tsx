"use client"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Cluster } from "@/registry/ui/cluster"
import { StatusBadge } from "@/registry/ui/status-badge"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Tags that wrap",
    description: "Items flow onto new lines when the row runs out of room; gap={1.5} is 6px.",
    code: `<Cluster gap={1.5} className="max-w-xs">
  <Badge variant="secondary">finance</Badge>
  <Badge variant="secondary">q4-close</Badge>
  <Badge variant="secondary">eu-west-1</Badge>
  <Badge variant="secondary">needs-review</Badge>
  <Badge variant="secondary">auto-imported</Badge>
  <Badge variant="secondary">recurring</Badge>
</Cluster>`,
    node: (
      <Cluster gap={1.5} className="max-w-xs">
        <Badge variant="secondary">finance</Badge>
        <Badge variant="secondary">q4-close</Badge>
        <Badge variant="secondary">eu-west-1</Badge>
        <Badge variant="secondary">needs-review</Badge>
        <Badge variant="secondary">auto-imported</Badge>
        <Badge variant="secondary">recurring</Badge>
      </Cluster>
    ),
  },
  {
    title: "Form actions",
    description: "justify=\"between\" keeps the destructive action apart; a nested Cluster groups the rest.",
    code: `<Cluster justify="between" className="w-full max-w-md rounded-xl border border-border bg-surface p-3">
  <Button variant="ghost" size="sm">Delete draft</Button>
  <Cluster gap={2}>
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Send invoice</Button>
  </Cluster>
</Cluster>`,
    node: (
      <Cluster justify="between" className="w-full max-w-md rounded-xl border border-border bg-surface p-3">
        <Button variant="ghost" size="sm">Delete draft</Button>
        <Cluster gap={2}>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Send invoice</Button>
        </Cluster>
      </Cluster>
    ),
  },
  {
    title: "Mixed sizes on one baseline",
    description: "align=\"baseline\" lines up a large figure with its label and badge.",
    code: `<Cluster align="baseline" gap={3}>
  <span className="text-3xl font-medium tracking-[-0.03em] text-fg tabular-nums">$48,210</span>
  <span className="text-sm text-fg-muted">monthly revenue</span>
  <StatusBadge tone="success">+4.2%</StatusBadge>
</Cluster>`,
    node: (
      <Cluster align="baseline" gap={3}>
        <span className="text-3xl font-medium tracking-[-0.03em] text-fg tabular-nums">$48,210</span>
        <span className="text-sm text-fg-muted">monthly revenue</span>
        <StatusBadge tone="success">+4.2%</StatusBadge>
      </Cluster>
    ),
  },
]
