import { RadarChart } from "@/registry/ui/radar-chart"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom axes",
    description: "labels and values line up by index; values run from 0 to 1, here a team skills review with eight axes.",
    code: `<RadarChart
  labels={["Frontend", "Backend", "Infra", "Design", "Product", "Data", "QA", "Writing"]}
  values={[0.9, 0.72, 0.55, 0.68, 0.8, 0.46, 0.6, 0.84]}
  label="Priya Raman's skills review"
/>`,
    node: (
      <RadarChart
        labels={["Frontend", "Backend", "Infra", "Design", "Product", "Data", "QA", "Writing"]}
        values={[0.9, 0.72, 0.55, 0.68, 0.8, 0.46, 0.6, 0.84]}
        label="Priya Raman's skills review"
      />
    ),
  },
  {
    title: "Side by side comparison",
    description: "The polygon takes currentColor, so a text colour class on each chart tells two vendors apart; size classes scale the whole SVG.",
    code: `<figure className="flex flex-col items-center">
  <RadarChart values={[0.92, 0.78, 0.64, 0.86, 0.7, 0.95]} label="Northwind scorecard" className="size-40 text-accent" />
  <figcaption className="mt-1 text-xs font-medium text-fg">Northwind</figcaption>
</figure>
<figure className="flex flex-col items-center">
  <RadarChart values={[0.74, 0.88, 0.9, 0.52, 0.62, 0.7]} label="Acme Robotics scorecard" className="size-40 text-info" />
  <figcaption className="mt-1 text-xs font-medium text-fg">Acme Robotics</figcaption>
</figure>`,
    node: (
      <div className="flex flex-wrap items-start justify-center gap-6">
        <figure className="flex flex-col items-center">
          <RadarChart values={[0.92, 0.78, 0.64, 0.86, 0.7, 0.95]} label="Northwind scorecard" className="size-40 text-accent" />
          <figcaption className="mt-1 text-xs font-medium text-fg">Northwind</figcaption>
        </figure>
        <figure className="flex flex-col items-center">
          <RadarChart values={[0.74, 0.88, 0.9, 0.52, 0.62, 0.7]} label="Acme Robotics scorecard" className="size-40 text-info" />
          <figcaption className="mt-1 text-xs font-medium text-fg">Acme Robotics</figcaption>
        </figure>
      </div>
    ),
  },
]
