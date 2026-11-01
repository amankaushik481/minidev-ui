import { StackedBarChart } from "@/registry/ui/stacked-bar-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

const tickets = [
  { label: "Mon", values: [14, 9, 4, 1] },
  { label: "Tue", values: [18, 11, 6, 2] },
  { label: "Wed", values: [12, 13, 5, 0] },
  { label: "Thu", values: [21, 8, 7, 3] },
  { label: "Fri", values: [16, 10, 3, 1] },
  { label: "Sat", values: [6, 4, 2, 0] },
  { label: "Sun", values: [4, 3, 1, 0] },
]

export const examples: Example[] = [
  {
    title: "Custom series",
    description: "Each stack lists its values in the order of seriesLabels, bottom to top; up to four series get a distinct chart colour.",
    code: `const tickets = [
  { label: "Mon", values: [14, 9, 4, 1] },
  { label: "Tue", values: [18, 11, 6, 2] },
  { label: "Wed", values: [12, 13, 5, 0] },
  { label: "Thu", values: [21, 8, 7, 3] },
  { label: "Fri", values: [16, 10, 3, 1] },
  { label: "Sat", values: [6, 4, 2, 0] },
  { label: "Sun", values: [4, 3, 1, 0] },
]

<StackedBarChart data={tickets} seriesLabels={["Low", "Medium", "High", "Urgent"]} label="Support tickets by priority, this week" />`,
    node: <StackedBarChart data={tickets} seriesLabels={["Low", "Medium", "High", "Urgent"]} label="Support tickets by priority, this week" />,
  },
  {
    title: "In a card",
    description: "Give the chart a heading and a total with Card; max-w-none lets it fill the card width.",
    code: `<Card className="w-full max-w-lg">
  <CardHeader>
    <CardTitle>Revenue mix</CardTitle>
    <CardDescription>Eight months of subscriptions, usage and services, in thousands.</CardDescription>
  </CardHeader>
  <CardContent>
    <StackedBarChart label="Revenue mix by month" className="max-w-none" />
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Revenue mix</CardTitle>
          <CardDescription>Eight months of subscriptions, usage and services, in thousands.</CardDescription>
        </CardHeader>
        <CardContent>
          <StackedBarChart label="Revenue mix by month" className="max-w-none" />
        </CardContent>
      </Card>
    ),
  },
]
