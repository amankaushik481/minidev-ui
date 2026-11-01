import { TreemapChart, type TreemapNode } from "@/registry/ui/treemap-chart"
import type { Example } from "./types"

const storage: TreemapNode[] = [
  { label: "Attachments", value: 48.2 },
  { label: "Invoice PDFs", value: 31.6 },
  { label: "Exports", value: 17.4 },
  { label: "Backups", value: 12.9 },
  { label: "Logos", value: 4.1 },
  { label: "Other", value: 2.3 },
]

const customers: TreemapNode[] = [
  {
    label: "North America",
    color: "var(--chart-1)",
    children: [
      { label: "Pro", value: 412 },
      { label: "Business", value: 188 },
      { label: "Starter", value: 356 },
    ],
  },
  {
    label: "Europe",
    color: "var(--chart-2)",
    children: [
      { label: "Pro", value: 264 },
      { label: "Business", value: 97 },
      { label: "Starter", value: 231 },
    ],
  },
  {
    label: "Asia Pacific",
    color: "var(--chart-4)",
    children: [
      { label: "Pro", value: 118 },
      { label: "Starter", value: 142 },
    ],
  },
  { label: "Other", color: "var(--chart-5)", value: 76 },
]

export const examples: Example[] = [
  {
    title: "Flat data",
    description: "Leaves without children render as one level; format rewrites every value so the chart can show gigabytes instead of money.",
    code: `const storage: TreemapNode[] = [
  { label: "Attachments", value: 48.2 },
  { label: "Invoice PDFs", value: 31.6 },
  { label: "Exports", value: 17.4 },
  { label: "Backups", value: 12.9 },
  { label: "Logos", value: 4.1 },
  { label: "Other", value: 2.3 },
]

<TreemapChart data={storage} title="Storage by type" caption="of 250 GB" height={240} format={(n) => \`\${n.toFixed(1)} GB\`} />`,
    node: <TreemapChart data={storage} title="Storage by type" caption="of 250 GB" height={240} format={(n) => `${n.toFixed(1)} GB`} />,
  },
  {
    title: "Group colours and counts",
    description: "A color on a group tints all of its cells; here the values are customer counts, so format drops the currency.",
    code: `const customers: TreemapNode[] = [
  {
    label: "North America",
    color: "var(--chart-1)",
    children: [
      { label: "Pro", value: 412 },
      { label: "Business", value: 188 },
      { label: "Starter", value: 356 },
    ],
  },
  {
    label: "Europe",
    color: "var(--chart-2)",
    children: [
      { label: "Pro", value: 264 },
      { label: "Business", value: 97 },
      { label: "Starter", value: 231 },
    ],
  },
  {
    label: "Asia Pacific",
    color: "var(--chart-4)",
    children: [
      { label: "Pro", value: 118 },
      { label: "Starter", value: 142 },
    ],
  },
  { label: "Other", color: "var(--chart-5)", value: 76 },
]

<TreemapChart data={customers} title="Customers by region and plan" caption="active workspaces" format={(n) => n.toLocaleString("en-US")} />`,
    node: <TreemapChart data={customers} title="Customers by region and plan" caption="active workspaces" format={(n) => n.toLocaleString("en-US")} />,
  },
]
