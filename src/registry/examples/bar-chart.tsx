import { BarChart } from "@/registry/ui/bar-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Weekly data",
    description: "Any list of label and value pairs works; the peak is marked until you hover another bar.",
    code: `<BarChart
  label="Deploys this week"
  data={[
    { label: "Mon", value: 14 },
    { label: "Tue", value: 22 },
    { label: "Wed", value: 18 },
    { label: "Thu", value: 31 },
    { label: "Fri", value: 26 },
    { label: "Sat", value: 6 },
    { label: "Sun", value: 3 },
  ]}
  className="w-full max-w-md"
/>`,
    node: (
      <BarChart
        label="Deploys this week"
        data={[
          { label: "Mon", value: 14 },
          { label: "Tue", value: 22 },
          { label: "Wed", value: 18 },
          { label: "Thu", value: 31 },
          { label: "Fri", value: 26 },
          { label: "Sat", value: 6 },
          { label: "Sun", value: 3 },
        ]}
        className="w-full max-w-md"
      />
    ),
  },
  {
    title: "Currency format",
    description: "format shapes the value tag above the active bar; here it rounds to thousands.",
    code: `<BarChart
  label="Monthly revenue"
  format={(n) => \`$\${(n / 1000).toFixed(1)}k\`}
  className="w-full max-w-md"
/>`,
    node: (
      <BarChart
        label="Monthly revenue"
        format={(n) => `$${(n / 1000).toFixed(1)}k`}
        className="w-full max-w-md"
      />
    ),
  },
  {
    title: "In a card",
    description: "A header with the total and a chart that fills the card width underneath.",
    code: `<Card className="w-full max-w-md">
  <CardHeader>
    <CardDescription>Invoices sent</CardDescription>
    <CardTitle className="text-2xl tracking-[-0.025em] tabular-nums">1,284</CardTitle>
  </CardHeader>
  <CardContent>
    <BarChart
      label="Invoices sent by month"
      data={[
        { label: "May", value: 164 },
        { label: "Jun", value: 191 },
        { label: "Jul", value: 212 },
        { label: "Aug", value: 198 },
        { label: "Sep", value: 243 },
        { label: "Oct", value: 276 },
      ]}
      className="h-36"
    />
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription>Invoices sent</CardDescription>
          <CardTitle className="text-2xl tracking-[-0.025em] tabular-nums">1,284</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            label="Invoices sent by month"
            data={[
              { label: "May", value: 164 },
              { label: "Jun", value: 191 },
              { label: "Jul", value: 212 },
              { label: "Aug", value: 198 },
              { label: "Sep", value: 243 },
              { label: "Oct", value: 276 },
            ]}
            className="h-36"
          />
        </CardContent>
      </Card>
    ),
  },
]
