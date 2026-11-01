import { SparklineSet, type SparklineItem } from "@/registry/ui/sparkline-set"
import type { Example } from "./types"

const growth: SparklineItem[] = [
  { label: "Signups", value: "2,418", delta: 8.2, data: [140, 162, 158, 171, 190, 184, 203, 221, 219, 236, 248, 262] },
  { label: "Trial conversions", value: "31.4%", delta: 2.7, data: [24, 25, 25.5, 26, 27.2, 27, 28.1, 29, 29.6, 30.2, 30.9, 31.4] },
  { label: "Seats added", value: "386", delta: 14.9, data: [18, 22, 21, 26, 29, 31, 30, 34, 38, 41, 44, 52] },
]

const billing: SparklineItem[] = [
  { label: "MRR", value: "$84,200", delta: 5.6, data: [61, 63, 66, 68, 71, 72, 75, 77, 79, 81, 83, 84.2] },
  { label: "Paid on time", value: "92%", delta: 1.8, data: [84, 85, 87, 86, 88, 89, 89, 90, 90, 91, 91, 92] },
]

export const examples: Example[] = [
  {
    title: "Custom metrics",
    description: "Each item carries a formatted value, a delta in percent and the raw series for the sparkline; deltas colour by sign, so pick metrics where up is good.",
    code: `const growth: SparklineItem[] = [
  { label: "Signups", value: "2,418", delta: 8.2, data: [140, 162, 158, 171, 190, 184, 203, 221, 219, 236, 248, 262] },
  { label: "Trial conversions", value: "31.4%", delta: 2.7, data: [24, 25, 25.5, 26, 27.2, 27, 28.1, 29, 29.6, 30.2, 30.9, 31.4] },
  { label: "Seats added", value: "386", delta: 14.9, data: [18, 22, 21, 26, 29, 31, 30, 34, 38, 41, 44, 52] },
]

<SparklineSet items={growth} />`,
    node: <SparklineSet items={growth} />,
  },
  {
    title: "Two columns",
    description: "The grid is three columns on large screens by default; override it through className when you have fewer cards.",
    code: `const billing: SparklineItem[] = [
  { label: "MRR", value: "$84,200", delta: 5.6, data: [61, 63, 66, 68, 71, 72, 75, 77, 79, 81, 83, 84.2] },
  { label: "Paid on time", value: "92%", delta: 1.8, data: [84, 85, 87, 86, 88, 89, 89, 90, 90, 91, 91, 92] },
]

<SparklineSet items={billing} className="max-w-xl lg:grid-cols-2" />`,
    node: <SparklineSet items={billing} className="max-w-xl lg:grid-cols-2" />,
  },
]
