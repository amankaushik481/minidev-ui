import { SparklineSet, type SparklineItem } from "@/registry/ui/sparkline-set"
import type { Example } from "./types"

const growth: SparklineItem[] = [
  { label: "Signups", value: "2,418", delta: 8.2, data: [140, 162, 158, 171, 190, 184, 203, 221, 219, 236, 248, 262] },
  { label: "Trial conversions", value: "31.4%", delta: 2.7, data: [24, 25, 25.5, 26, 27.2, 27, 28.1, 29, 29.6, 30.2, 30.9, 31.4] },
  { label: "Seats added", value: "386", delta: 14.9, data: [18, 22, 21, 26, 29, 31, 30, 34, 38, 41, 44, 52] },
]

const billing: SparklineItem[] = [
  { label: "MRR", value: "$84,200", delta: 5.6, data: [61, 63, 66, 68, 71, 72, 75, 77, 79, 81, 83, 84.2] },
  { label: "Failed payments", value: "1.4%", delta: -12.5, invert: true, data: [2.6, 2.4, 2.5, 2.2, 2.1, 1.9, 1.9, 1.8, 1.7, 1.6, 1.6, 1.4] },
]

export const examples: Example[] = [
  {
    title: "Custom metrics",
    description: "Each item carries a formatted value, a delta in percent and the raw series for the sparkline; a rise shows green and a fall red.",
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
    description: "Set `invert` on a metric where down is good, so the fall in failed payments shows green. Override the three-column grid through className when you have fewer cards.",
    code: `const billing: SparklineItem[] = [
  { label: "MRR", value: "$84,200", delta: 5.6, data: [61, 63, 66, 68, 71, 72, 75, 77, 79, 81, 83, 84.2] },
  { label: "Failed payments", value: "1.4%", delta: -12.5, invert: true, data: [2.6, 2.4, 2.5, 2.2, 2.1, 1.9, 1.9, 1.8, 1.7, 1.6, 1.6, 1.4] },
]

<SparklineSet items={billing} className="max-w-xl lg:grid-cols-2" />`,
    node: <SparklineSet items={billing} className="max-w-xl lg:grid-cols-2" />,
  },
]
