"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function CheckoutSummary({
  items = [
    { name: "Pro · monthly", price: "$49" },
    { name: "Seat add-on", price: "$12" },
  ],
  total = "$61",
  className,
}: {
  items?: { name: string; price: string }[]
  total?: string
  className?: string
}) {
  return (
    <div data-slot="checkout-summary" className={cn("space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-highlight", className)}>
      <h3 className="text-sm font-medium text-fg">Order summary</h3>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.name} className="flex justify-between text-sm">
            <span className="text-fg-muted">{i.name}</span>
            <span className="tabular-nums text-fg">{i.price}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between border-t border-border pt-3 text-sm font-medium">
        <span>Total</span>
        <span className="tabular-nums">{total}</span>
      </div>
      <Button className="w-full">Pay now</Button>
    </div>
  )
}
export { CheckoutSummary }
