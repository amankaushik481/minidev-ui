import { InvoiceList, type InvoiceItem } from "@/registry/ui/invoice-list"
import { Button } from "@/registry/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

const northwind: InvoiceItem[] = [
  { id: "INV-2041", date: "Sep 24, 2026", amount: "$12,400.00", status: "open" },
  { id: "INV-2033", date: "Aug 24, 2026", amount: "$12,400.00", status: "paid" },
  { id: "INV-2027", date: "Jul 24, 2026", amount: "$11,900.00", status: "paid" },
  { id: "INV-2019", date: "Jun 24, 2026", amount: "$11,900.00", status: "void" },
]

export const examples: Example[] = [
  {
    title: "Custom invoices",
    description: "items are plain records with a formatted amount and one of three statuses; the badge tone follows the status.",
    code: `const northwind: InvoiceItem[] = [
  { id: "INV-2041", date: "Sep 24, 2026", amount: "$12,400.00", status: "open" },
  { id: "INV-2033", date: "Aug 24, 2026", amount: "$12,400.00", status: "paid" },
  { id: "INV-2027", date: "Jul 24, 2026", amount: "$11,900.00", status: "paid" },
  { id: "INV-2019", date: "Jun 24, 2026", amount: "$11,900.00", status: "void" },
]

<InvoiceList items={northwind} />`,
    node: <InvoiceList items={northwind} />,
  },
  {
    title: "In a card with a header",
    description: "Drop the list's own border and radius so it sits flush inside a Card that carries the title and a view all action.",
    code: `<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Northwind Traders</CardTitle>
    <CardDescription>4 invoices this quarter, $12,400.00 outstanding.</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm">View all</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <InvoiceList items={northwind} className="max-w-none rounded-none border-0 border-t border-border" />
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Northwind Traders</CardTitle>
          <CardDescription>4 invoices this quarter, $12,400.00 outstanding.</CardDescription>
          <CardAction>
            <Button variant="outline" size="sm">View all</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <InvoiceList items={northwind} className="max-w-none rounded-none border-0 border-t border-border" />
        </CardContent>
      </Card>
    ),
  },
]
