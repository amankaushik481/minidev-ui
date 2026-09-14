"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function PaymentMethodCard({
  brand = "Visa",
  last4 = "4242",
  exp = "09/28",
  className,
}: {
  brand?: string
  last4?: string
  exp?: string
  className?: string
}) {
  return (
    <div data-slot="payment-method-card" className={cn("flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <div>
        <p className="text-sm font-medium text-fg">{brand} ···· {last4}</p>
        <p className="mt-0.5 font-mono text-xs text-fg-muted">Exp {exp}</p>
      </div>
      <Button size="sm" variant="outline">Edit</Button>
    </div>
  )
}
export { PaymentMethodCard }
