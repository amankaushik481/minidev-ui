import { SankeyChart, type SankeyLink, type SankeyNodeInput } from "@/registry/ui/sankey-chart"
import type { Example } from "./types"

const budgetLinks: SankeyLink[] = [
  { source: "revenue", target: "payroll", value: 420 },
  { source: "revenue", target: "infra", value: 160 },
  { source: "revenue", target: "marketing", value: 110 },
  { source: "revenue", target: "profit", value: 90 },
  { source: "payroll", target: "eng", value: 260 },
  { source: "payroll", target: "sales", value: 100 },
  { source: "payroll", target: "support", value: 60 },
  { source: "infra", target: "cloud", value: 120 },
  { source: "infra", target: "tooling", value: 40 },
]

const budgetNodes: SankeyNodeInput[] = [
  { id: "revenue", label: "Revenue", color: "var(--chart-1)" },
  { id: "payroll", label: "Payroll", color: "var(--chart-2)" },
  { id: "infra", label: "Infrastructure", color: "var(--chart-3)" },
  { id: "marketing", label: "Marketing", color: "var(--chart-4)" },
  { id: "profit", label: "Profit", color: "var(--chart-5)" },
  { id: "eng", label: "Engineering" },
  { id: "sales", label: "Sales" },
  { id: "support", label: "Support" },
  { id: "cloud", label: "Cloud" },
  { id: "tooling", label: "Tooling" },
]

export const examples: Example[] = [
  {
    title: "Custom flows and labels",
    description: "links reference node ids; nodes adds display labels and colours, and format and unit rewrite every number for a budget in thousands.",
    code: `const budgetLinks: SankeyLink[] = [
  { source: "revenue", target: "payroll", value: 420 },
  { source: "revenue", target: "infra", value: 160 },
  { source: "revenue", target: "marketing", value: 110 },
  { source: "revenue", target: "profit", value: 90 },
  { source: "payroll", target: "eng", value: 260 },
  { source: "payroll", target: "sales", value: 100 },
  { source: "payroll", target: "support", value: 60 },
  { source: "infra", target: "cloud", value: 120 },
  { source: "infra", target: "tooling", value: 40 },
]

const budgetNodes: SankeyNodeInput[] = [
  { id: "revenue", label: "Revenue", color: "var(--chart-1)" },
  { id: "payroll", label: "Payroll", color: "var(--chart-2)" },
  { id: "infra", label: "Infrastructure", color: "var(--chart-3)" },
  { id: "marketing", label: "Marketing", color: "var(--chart-4)" },
  { id: "profit", label: "Profit", color: "var(--chart-5)" },
  { id: "eng", label: "Engineering" },
  { id: "sales", label: "Sales" },
  { id: "support", label: "Support" },
  { id: "cloud", label: "Cloud" },
  { id: "tooling", label: "Tooling" },
]

<SankeyChart
  links={budgetLinks}
  nodes={budgetNodes}
  title="Where October revenue went"
  caption="Northwind, in thousands"
  unit="USD"
  format={(n) => \`$\${n}k\`}
  height={300}
/>`,
    node: (
      <SankeyChart
        links={budgetLinks}
        nodes={budgetNodes}
        title="Where October revenue went"
        caption="Northwind, in thousands"
        unit="USD"
        format={(n) => `$${n}k`}
        height={300}
      />
    ),
  },
  {
    title: "Justified columns",
    description: "align justify pushes nodes with no outgoing flow to the last column, so visitors who left line up with the plans instead of sitting mid chart.",
    code: `<SankeyChart align="justify" nodeWidth={14} nodePadding={18} caption="Last 30 days, dead ends pushed right" />`,
    node: <SankeyChart align="justify" nodeWidth={14} nodePadding={18} caption="Last 30 days, dead ends pushed right" />,
  },
]
