"use client"
import { MetricTickerBoard } from "@/registry/premium/metric-ticker-board"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Quarter in numbers",
    description: "format goes to Intl.NumberFormat and suffix is appended, so currency, plain counts and percentages sit side by side.",
    code: `<MetricTickerBoard
  metrics={[
    { label: "Revenue settled", value: 482300, format: { style: "currency", currency: "USD", maximumFractionDigits: 0 } },
    { label: "Invoices sent", value: 9214 },
    { label: "Paid on time", value: 91, suffix: "%" },
    { label: "Average days to pay", value: 12 },
  ]}
/>`,
    node: (
      <MetricTickerBoard
        metrics={[
          { label: "Revenue settled", value: 482300, format: { style: "currency", currency: "USD", maximumFractionDigits: 0 } },
          { label: "Invoices sent", value: 9214 },
          { label: "Paid on time", value: 91, suffix: "%" },
          { label: "Average days to pay", value: 12 },
        ]}
      />
    ),
  },
  {
    title: "Three metrics with decimals",
    description: "Override the grid with className for three cards; maximumFractionDigits keeps one decimal while the digits roll.",
    code: `<MetricTickerBoard
  className="lg:grid-cols-3"
  metrics={[
    { label: "Uptime last 90 days", value: 99.94, suffix: "%", format: { maximumFractionDigits: 2 } },
    { label: "Median response", value: 1.8, suffix: "h", format: { maximumFractionDigits: 1 } },
    { label: "Open tickets", value: 7 },
  ]}
/>`,
    node: (
      <MetricTickerBoard
        className="lg:grid-cols-3"
        metrics={[
          { label: "Uptime last 90 days", value: 99.94, suffix: "%", format: { maximumFractionDigits: 2 } },
          { label: "Median response", value: 1.8, suffix: "h", format: { maximumFractionDigits: 1 } },
          { label: "Open tickets", value: 7 },
        ]}
      />
    ),
  },
]
