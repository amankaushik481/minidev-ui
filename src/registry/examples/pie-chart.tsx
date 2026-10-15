import { PieChart } from "@/registry/ui/pie-chart"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom data and format",
    description: "Pass label and value pairs and a format function; the readout, legend and labels all use it.",
    code: `<PieChart
  title="Customers by region"
  caption="Active accounts"
  format={(n) => n.toLocaleString("en-US")}
  data={[
    { label: "North America", value: 1240 },
    { label: "Europe", value: 860 },
    { label: "Asia Pacific", value: 540 },
    { label: "Latin America", value: 210 },
  ]}
/>`,
    node: (
      <PieChart
        title="Customers by region"
        caption="Active accounts"
        format={(n) => n.toLocaleString("en-US")}
        data={[
          { label: "North America", value: 1240 },
          { label: "Europe", value: 860 },
          { label: "Asia Pacific", value: 540 },
          { label: "Latin America", value: 210 },
        ]}
      />
    ),
  },
  {
    title: "Compact without labels",
    description: "Hide the leader line labels and the legend for a small tile; hover still shows each slice.",
    code: `<PieChart
  title="Payment methods"
  caption="This month"
  showLabels={false}
  showLegend={false}
  className="max-w-xs"
  data={[
    { label: "Card", value: 61200 },
    { label: "Bank transfer", value: 28400 },
    { label: "Wallet", value: 9100 },
  ]}
/>`,
    node: (
      <PieChart
        title="Payment methods"
        caption="This month"
        showLabels={false}
        showLegend={false}
        className="max-w-xs"
        data={[
          { label: "Card", value: 61200 },
          { label: "Bank transfer", value: 28400 },
          { label: "Wallet", value: 9100 },
        ]}
      />
    ),
  },
  {
    title: "Semantic colours",
    description: "Each datum can carry its own colour; use the status tokens when the slices mean something.",
    code: `<PieChart
  title="Invoice status"
  caption="This quarter"
  format={(n) => \`\${n} invoices\`}
  pullOut={10}
  data={[
    { label: "Paid", value: 296, color: "var(--success)" },
    { label: "Pending", value: 84, color: "var(--warning)" },
    { label: "Overdue", value: 32, color: "var(--danger)" },
  ]}
/>`,
    node: (
      <PieChart
        title="Invoice status"
        caption="This quarter"
        format={(n) => `${n} invoices`}
        pullOut={10}
        data={[
          { label: "Paid", value: 296, color: "var(--success)" },
          { label: "Pending", value: 84, color: "var(--warning)" },
          { label: "Overdue", value: 32, color: "var(--danger)" },
        ]}
      />
    ),
  },
]
