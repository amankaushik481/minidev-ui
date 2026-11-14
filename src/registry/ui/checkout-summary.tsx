"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * A compact checkout panel: line items, a total and one pay button.
 *
 * Use beside a payment form (CreditCardInput) at the last step of checkout. For a full order breakdown with tax and discounts use OrderSummary.
 * Prices are pre-formatted strings, so format money with Intl.NumberFormat before passing it in.
 *
 * @example
 * <CheckoutSummary
 *   items={[{ name: "Pro · monthly", price: "$49" }]}
 *   total="$49"
 *   onPay={submit}
 *   payLabel="Pay $49"
 * />
 */
type CheckoutSummaryProps = {
  /** Line items. `name` is the React key, so keep names unique. */
  items?: { name: string; price: string }[]
  /** Pre-formatted total, e.g. "$61". */
  total?: string
  /** Heading. Defaults to "Order summary". */
  title?: string
  /** Pay button text. Defaults to "Pay now". */
  payLabel?: string
  /** Called when the pay button is pressed. Set `payType="submit"` instead to submit the surrounding form. */
  onPay?: () => void
  /** Button type. Use "submit" inside a `<form>`. */
  payType?: "button" | "submit"
  /** Disables the pay button, e.g. while card details are invalid or a payment is in flight. */
  disabled?: boolean
  className?: string
}

const SAMPLE_ITEMS = [
  { name: "Pro · monthly", price: "$49" },
  { name: "Seat add-on", price: "$12" },
]

function CheckoutSummary({
  items = SAMPLE_ITEMS,
  total = "$61",
  title = "Order summary",
  payLabel = "Pay now",
  onPay,
  payType = "button",
  disabled,
  className,
}: CheckoutSummaryProps) {
  const id = React.useId()
  return (
    <section
      data-slot="checkout-summary"
      aria-labelledby={id}
      className={cn("space-y-4 rounded-xl border border-border bg-surface p-5 shadow-highlight", className)}
    >
      <h3 id={id} className="text-sm font-medium text-fg">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.name} className="flex justify-between gap-4 text-sm">
            <span className="text-fg-muted">{i.name}</span>
            <span className="tabular-nums text-fg">{i.price}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between border-t border-border pt-3 text-sm font-medium text-fg">
        <span>Total</span>
        <span className="tabular-nums">{total}</span>
      </div>
      <Button type={payType} className="w-full" disabled={disabled} onClick={onPay}>
        {payLabel}
      </Button>
    </section>
  )
}
export { CheckoutSummary }
export type { CheckoutSummaryProps }
