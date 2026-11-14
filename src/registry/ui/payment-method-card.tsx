"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * PaymentMethodCard — a saved card on file: brand, masked last four digits, expiry and an Edit button.
 *
 * Screen readers hear "Visa ending in 4242, expires 09/28" instead of the dots.
 * Never pass a full card number; only the last four. Use it on billing settings
 * pages; to collect a new card use your payment provider's hosted fields.
 *
 * @example
 * <PaymentMethodCard brand="Mastercard" last4="4444" exp="11/27" onEdit={openBillingPortal} />
 */
type PaymentMethodCardProps = {
  /** Card network, e.g. "Visa". */
  brand?: string
  /** Last four digits only. */
  last4?: string
  /** Expiry as MM/YY. */
  exp?: string
  /** Called by the Edit button. */
  onEdit?: () => void
  className?: string
}

function PaymentMethodCard({ brand = "Visa", last4 = "4242", exp = "09/28", onEdit, className }: PaymentMethodCardProps) {
  return (
    <div data-slot="payment-method-card" className={cn("flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="min-w-0">
        <p className="text-sm font-medium text-fg">
          <span aria-hidden>{brand} ···· <span className="tabular-nums">{last4}</span></span>
          <span className="sr-only">{brand} ending in {last4}</span>
        </p>
        <p className="mt-0.5 font-mono text-xs text-fg-muted tabular-nums">
          <span aria-hidden>Exp</span>
          <span className="sr-only">Expires</span> {exp}
        </p>
      </div>
      <Button size="sm" variant="outline" aria-label={`Edit ${brand} ending in ${last4}`} onClick={onEdit}>
        Edit
      </Button>
    </div>
  )
}
export { PaymentMethodCard }
export type { PaymentMethodCardProps }
