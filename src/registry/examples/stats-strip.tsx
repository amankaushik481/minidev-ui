"use client"
import { StatsStrip } from "@/registry/ui/stats-strip"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Four headline figures",
    description: "value is a pre-formatted string, so units and rounding are yours: \"$4.8M\", \"11 days\", \"99.95%\".",
    code: `<StatsStrip
  stats={[
    { label: "Invoices sent in 2026", value: "184,000" },
    { label: "Collected", value: "$4.8M" },
    { label: "Average days to pay", value: "11 days" },
    { label: "API uptime, last 90 days", value: "99.95%" },
  ]}
/>`,
    node: (
      <StatsStrip
        stats={[
          { label: "Invoices sent in 2026", value: "184,000" },
          { label: "Collected", value: "$4.8M" },
          { label: "Average days to pay", value: "11 days" },
          { label: "API uptime, last 90 days", value: "99.95%" },
        ]}
      />
    ),
  },
  {
    title: "Three figures in a report header",
    description: "The grid has two columns on phones and four from sm up. Override both with className so three stats leave no empty grey cell.",
    code: `<StatsStrip
  className="grid-cols-1 sm:grid-cols-3"
  stats={[
    { label: "Revenue, Q3", value: "$612K" },
    { label: "Net revenue retention", value: "114%" },
    { label: "Gross margin", value: "78%" },
  ]}
/>`,
    node: (
      <StatsStrip
        className="grid-cols-1 sm:grid-cols-3"
        stats={[
          { label: "Revenue, Q3", value: "$612K" },
          { label: "Net revenue retention", value: "114%" },
          { label: "Gross margin", value: "78%" },
        ]}
      />
    ),
  },
]
