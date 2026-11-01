import { RadialChart } from "@/registry/ui/radial-chart"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Single ring",
    description: "One item turns the chart into a full radial progress ring with the value and its max written under the percentage.",
    code: `<RadialChart
  title="Storage"
  data={[{ label: "Used", value: 164, max: 250, format: (n) => \`\${n} GB\` }]}
/>`,
    node: (
      <RadialChart
        title="Storage"
        data={[{ label: "Used", value: 164, max: 250, format: (n) => `${n} GB` }]}
      />
    ),
  },
  {
    title: "Fixed data with a custom centre",
    description: "Passing data removes the period switcher; centerValue and centerLabel replace the average when a count reads better.",
    code: `<RadialChart
  title="Quarter goals"
  centerValue="3 of 4"
  centerLabel="on track"
  data={[
    { label: "New ARR", value: 1.84, max: 2, format: (n) => \`$\${n}M\` },
    { label: "Net retention", value: 112, max: 110, format: (n) => \`\${n}%\` },
    { label: "Hires", value: 9, max: 12 },
    { label: "Uptime", value: 99.97, max: 99.95, format: (n) => \`\${n}%\` },
  ]}
/>`,
    node: (
      <RadialChart
        title="Quarter goals"
        centerValue="3 of 4"
        centerLabel="on track"
        data={[
          { label: "New ARR", value: 1.84, max: 2, format: (n) => `$${n}M` },
          { label: "Net retention", value: 112, max: 110, format: (n) => `${n}%` },
          { label: "Hires", value: 9, max: 12 },
          { label: "Uptime", value: 99.97, max: 99.95, format: (n) => `${n}%` },
        ]}
      />
    ),
  },
  {
    title: "Thin rings, no legend",
    description: "thickness and gap shrink the rings and showLegend false leaves a compact widget for a dashboard tile.",
    code: `<RadialChart
  title="Team capacity"
  centerLabel="allocated"
  thickness={12}
  gap={4}
  showLegend={false}
  data={[
    { label: "Design", value: 86 },
    { label: "Platform", value: 72 },
    { label: "Payments", value: 94 },
    { label: "Support", value: 58 },
  ]}
  className="max-w-64"
/>`,
    node: (
      <RadialChart
        title="Team capacity"
        centerLabel="allocated"
        thickness={12}
        gap={4}
        showLegend={false}
        data={[
          { label: "Design", value: 86 },
          { label: "Platform", value: 72 },
          { label: "Payments", value: 94 },
          { label: "Support", value: 58 },
        ]}
        className="max-w-64"
      />
    ),
  },
]
