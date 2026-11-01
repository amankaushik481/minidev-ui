import { UsageBreakdown } from "@/registry/ui/usage-breakdown"
import { Button } from "@/registry/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import { Badge } from "@/registry/ui/badge"
import type { Example } from "./types"

const AI_USAGE = [
  { label: "Assistant messages", used: 6420, limit: 10000 },
  { label: "Documents indexed", used: 1180, limit: 1500 },
  { label: "Scheduled agents", used: 4, limit: 5 },
]

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "Each item is a label with used and limit; the bar width is the ratio and the numbers print as given.",
    code: `const AI_USAGE = [
  { label: "Assistant messages", used: 6420, limit: 10000 },
  { label: "Documents indexed", used: 1180, limit: 1500 },
  { label: "Scheduled agents", used: 4, limit: 5 },
]

<UsageBreakdown items={AI_USAGE} />`,
    node: <UsageBreakdown items={AI_USAGE} />,
  },
  {
    title: "In a billing card",
    description: "Wrap it in a Card with the plan name, the reset date and an upgrade action in the footer.",
    code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Growth plan</CardTitle>
    <CardDescription>Usage resets on Nov 1, 2026.</CardDescription>
    <CardAction>
      <Badge variant="accent">Annual</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    <UsageBreakdown
      items={[
        { label: "Invoices sent", used: 1840, limit: 2500 },
        { label: "Seats", used: 18, limit: 25 },
        { label: "Customer portal logins", used: 912, limit: 1000 },
      ]}
    />
  </CardContent>
  <CardFooter className="justify-between">
    <span className="text-xs text-fg-muted">Need more? Scale starts at $249/mo.</span>
    <Button size="sm" variant="outline">Upgrade</Button>
  </CardFooter>
</Card>`,
    node: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Growth plan</CardTitle>
          <CardDescription>Usage resets on Nov 1, 2026.</CardDescription>
          <CardAction>
            <Badge variant="accent">Annual</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <UsageBreakdown
            items={[
              { label: "Invoices sent", used: 1840, limit: 2500 },
              { label: "Seats", used: 18, limit: 25 },
              { label: "Customer portal logins", used: 912, limit: 1000 },
            ]}
          />
        </CardContent>
        <CardFooter className="justify-between">
          <span className="text-xs text-fg-muted">Need more? Scale starts at $249/mo.</span>
          <Button size="sm" variant="outline">Upgrade</Button>
        </CardFooter>
      </Card>
    ),
  },
]
