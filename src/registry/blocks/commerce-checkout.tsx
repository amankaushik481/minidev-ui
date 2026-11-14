"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CartLineItem } from "@/registry/ui/cart-line-item"
import { OrderSummary } from "@/registry/ui/order-summary"
import { PageHeader } from "@/registry/ui/page-header"
import { ShippingAddress } from "@/registry/ui/shipping-address"

/**
 * CommerceCheckout — a two-column checkout: line items and billing address on the left, a live order summary and Pay on the right.
 *
 * Use for a one-page checkout of a few items or seats. Totals recompute as quantity changes. On small screens
 * the summary stacks under the form. For plan selection before checkout use PricingPlans; for an existing
 * subscription use BillingPage.
 *
 * @example
 * <CommerceCheckout onPay={(total) => createPaymentIntent(total)} />
 */
type CommerceCheckoutProps = {
  /** Called by "Pay" with the total in cents. */
  onPay?: (totalCents: number) => void
  className?: string
}

const SEAT_CENTS = 4900
const TAX_RATE = 0.08
const usd = (cents: number) => (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })

function CommerceCheckout({ onPay, className }: CommerceCheckoutProps) {
  const [seats, setSeats] = React.useState(5)
  const subtotal = seats * SEAT_CENTS
  const tax = Math.round(subtotal * TAX_RATE)
  const total = subtotal + tax
  return (
    <form
      data-slot="commerce-checkout"
      className={cn("mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_320px]", className)}
      onSubmit={(e) => {
        e.preventDefault()
        onPay?.(total)
      }}
    >
      <div className="min-w-0 space-y-6">
        <PageHeader title="Checkout" description="Lumen Team, billed monthly. Change seats any time; we prorate to the day." />
        <CartLineItem title="Lumen Team seat" price={`${usd(SEAT_CENTS)} / mo`} quantity={seats} min={1} max={250} onQuantityChange={setSeats} />
        <ShippingAddress legend="Billing address" />
      </div>
      <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <OrderSummary
          lines={[
            { label: `Subtotal (${seats} ${seats === 1 ? "seat" : "seats"})`, value: usd(subtotal) },
            { label: "Tax (8%)", value: usd(tax) },
          ]}
          total={usd(total)}
        />
        <Button type="submit" size="lg" className="w-full tabular-nums">
          Pay {usd(total)}
        </Button>
        <p className="text-center text-xs text-fg-muted">Cancel any time. Invoices go to your billing email.</p>
      </div>
    </form>
  )
}

export { CommerceCheckout }
export type { CommerceCheckoutProps }
