import { HorizontalBarChart } from "@/registry/ui/horizontal-bar-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

const sources = [
  { label: "Organic", value: 4820 },
  { label: "Direct", value: 3110 },
  { label: "Referral", value: 1940 },
  { label: "Newsletter", value: 1260 },
  { label: "Paid social", value: 880 },
]

export const examples: Example[] = [
  {
    title: "Custom data",
    description: "Bars keep the order you pass and scale to the largest value; sort first if you want a ranking.",
    code: `const sources = [
  { label: "Organic", value: 4820 },
  { label: "Direct", value: 3110 },
  { label: "Referral", value: 1940 },
  { label: "Newsletter", value: 1260 },
  { label: "Paid social", value: 880 },
]

<HorizontalBarChart data={sources} label="Signups by source, last 30 days" />`,
    node: <HorizontalBarChart data={sources} label="Signups by source, last 30 days" />,
  },
  {
    title: "In a card",
    description: "A heading and a one line summary turn the bars into a dashboard tile; max-w-none fills the card.",
    code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Invoices per customer</CardTitle>
    <CardDescription>Northwind sends the most, 124 so far this year.</CardDescription>
  </CardHeader>
  <CardContent>
    <HorizontalBarChart label="Invoices per customer" className="max-w-none" />
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Invoices per customer</CardTitle>
          <CardDescription>Northwind sends the most, 124 so far this year.</CardDescription>
        </CardHeader>
        <CardContent>
          <HorizontalBarChart label="Invoices per customer" className="max-w-none" />
        </CardContent>
      </Card>
    ),
  },
]
