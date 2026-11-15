"use client"
import { AdminStatStrip } from "@/registry/ui/admin-stat-strip"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Workspace admin KPIs",
    description: "Pre-format each value; delta is a percent change. Set `invert` where a fall is good news, so it shows green.",
    code: `<AdminStatStrip
  stats={[
    { label: "Seats used", value: "42 of 50", delta: 8 },
    { label: "Active today", value: "128", delta: 3.2 },
    { label: "Failed sign-ins", value: "14", delta: -22, invert: true },
    { label: "Audit events", value: "1,204" },
  ]}
/>`,
    node: (
      <AdminStatStrip
        stats={[
          { label: "Seats used", value: "42 of 50", delta: 8 },
          { label: "Active today", value: "128", delta: 3.2 },
          { label: "Failed sign-ins", value: "14", delta: -22, invert: true },
          { label: "Audit events", value: "1,204" },
        ]}
      />
    ),
  },
  {
    title: "Two up in a side panel",
    description: "Override the grid with className when the strip sits in a narrow column.",
    code: `<div className="w-full max-w-sm rounded-xl border border-border bg-bg p-3">
  <AdminStatStrip
    className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"
    stats={[
      { label: "Open tickets", value: "18" },
      { label: "Paid this week", value: "$9,840", delta: 12 },
    ]}
  />
</div>`,
    node: (
      <div className="w-full max-w-sm rounded-xl border border-border bg-bg p-3">
        <AdminStatStrip
          className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"
          stats={[
            { label: "Open tickets", value: "18" },
            { label: "Paid this week", value: "$9,840", delta: 12 },
          ]}
        />
      </div>
    ),
  },
]
