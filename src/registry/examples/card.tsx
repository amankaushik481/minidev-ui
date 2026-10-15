import { MoreHorizontalIcon } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import { Switch } from "@/registry/ui/switch"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Basic",
    description: "Header with a title and description, then content; spacing comes from one card variable.",
    code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Northwind Traders</CardTitle>
    <CardDescription>Customer since March 2024, 12 seats on Lumen Pro.</CardDescription>
  </CardHeader>
  <CardContent>
    <dl className="grid grid-cols-2 gap-y-2 text-sm">
      <dt className="text-fg-muted">Open invoices</dt>
      <dd className="text-right font-medium tabular-nums">3</dd>
      <dt className="text-fg-muted">Outstanding</dt>
      <dd className="text-right font-medium tabular-nums">$4,120.00</dd>
      <dt className="text-fg-muted">Last payment</dt>
      <dd className="text-right font-medium">Oct 2</dd>
    </dl>
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Northwind Traders</CardTitle>
          <CardDescription>Customer since March 2024, 12 seats on Lumen Pro.</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-fg-muted">Open invoices</dt>
            <dd className="text-right font-medium tabular-nums">3</dd>
            <dt className="text-fg-muted">Outstanding</dt>
            <dd className="text-right font-medium tabular-nums">$4,120.00</dd>
            <dt className="text-fg-muted">Last payment</dt>
            <dd className="text-right font-medium">Oct 2</dd>
          </dl>
        </CardContent>
      </Card>
    ),
  },
  {
    title: "Action and footer",
    description: "CardAction pins to the top right of the header; CardFooter sits on a sunken strip for buttons.",
    code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>INV-2041</CardTitle>
    <CardDescription>Due October 24, net 30</CardDescription>
    <CardAction>
      <Badge variant="outline">Pending</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-medium tracking-[-0.025em] text-fg tabular-nums">$1,840.00</p>
    <p className="mt-1 text-fg-muted">12 seats, Lumen Pro, October</p>
  </CardContent>
  <CardFooter className="justify-end">
    <Button variant="outline" size="sm">Download PDF</Button>
    <Button size="sm">Send reminder</Button>
  </CardFooter>
</Card>`,
    node: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>INV-2041</CardTitle>
          <CardDescription>Due October 24, net 30</CardDescription>
          <CardAction>
            <Badge variant="outline">Pending</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-medium tracking-[-0.025em] text-fg tabular-nums">$1,840.00</p>
          <p className="mt-1 text-fg-muted">12 seats, Lumen Pro, October</p>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="outline" size="sm">Download PDF</Button>
          <Button size="sm">Send reminder</Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    title: "Small size",
    description: "size sm tightens the padding and title for dense grids of stat tiles.",
    code: `<Card size="sm" className="w-44">
  <CardHeader>
    <CardDescription>Paid this month</CardDescription>
    <CardTitle className="text-xl tracking-[-0.02em] tabular-nums">$61,400</CardTitle>
  </CardHeader>
</Card>
<Card size="sm" className="w-44">
  <CardHeader>
    <CardDescription>Overdue</CardDescription>
    <CardTitle className="text-xl tracking-[-0.02em] text-danger tabular-nums">$3,210</CardTitle>
  </CardHeader>
</Card>`,
    node: (
      <div className="flex flex-wrap justify-center gap-3">
        <Card size="sm" className="w-44">
          <CardHeader>
            <CardDescription>Paid this month</CardDescription>
            <CardTitle className="text-xl tracking-[-0.02em] tabular-nums">$61,400</CardTitle>
          </CardHeader>
        </Card>
        <Card size="sm" className="w-44">
          <CardHeader>
            <CardDescription>Overdue</CardDescription>
            <CardTitle className="text-xl tracking-[-0.02em] text-danger tabular-nums">$3,210</CardTitle>
          </CardHeader>
        </Card>
      </div>
    ),
  },
  {
    title: "Settings card",
    description: "Switch rows inside the content area make a settings group; the header carries a menu button.",
    code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>What Lumen emails you about.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon-sm" aria-label="More options">
        <MoreHorizontalIcon />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent className="flex flex-col gap-4">
    <Switch defaultChecked label="Payment received" description="When a customer pays an invoice." />
    <Switch defaultChecked label="Invoice overdue" description="Three days after the due date." />
    <Switch label="Weekly digest" description="A summary every Monday morning." />
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>What Lumen emails you about.</CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon-sm" aria-label="More options">
              <MoreHorizontalIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Switch defaultChecked label="Payment received" description="When a customer pays an invoice." />
          <Switch defaultChecked label="Invoice overdue" description="Three days after the due date." />
          <Switch label="Weekly digest" description="A summary every Monday morning." />
        </CardContent>
      </Card>
    ),
  },
]
