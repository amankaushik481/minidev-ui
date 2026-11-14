"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { InvoiceList } from "@/registry/ui/invoice-list"
import { PageHeader } from "@/registry/ui/page-header"
import { PlanCard } from "@/registry/ui/plan-card"
import { UsageMeter } from "@/registry/ui/usage-meter"

/**
 * BillingPage — a subscription page: plan cards with the current plan highlighted, seat usage, then recent invoices.
 *
 * Use inside an app's settings for an existing customer. For a public pricing section with a monthly/yearly
 * switch use PricingPlans; for paying for a cart use CommerceCheckout. Composes PlanCard, UsageMeter and InvoiceList.
 *
 * @example
 * <BillingPage onChangePlan={(plan) => openCheckout(plan)} />
 */
type BillingPageProps = {
  /** Called with the plan name when a plan's button is pressed. */
  onChangePlan?: (plan: string) => void
  className?: string
}

function BillingPage({ onChangePlan, className }: BillingPageProps) {
  const id = React.useId()
  return (
    <div data-slot="billing-page" className={cn("space-y-8", className)}>
      <PageHeader title="Billing" description="Your plan, seats and invoices for the Halcyon workspace." />
      <section aria-labelledby={`${id}-plans`} className="space-y-3">
        <h2 id={`${id}-plans`} className="text-sm font-medium text-fg">
          Plan
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <PlanCard name="Starter" price="$0" features={["1 workspace", "3 data sources", "Weekly digest"]} cta="Downgrade" onCta={() => onChangePlan?.("Starter")} />
          <PlanCard name="Team" price="$49" period="seat / mo" highlighted features={["All 40+ data sources", "Ask Lumen, unlimited", "Real-time alerts"]} cta="Current plan" />
          <PlanCard name="Scale" price="$129" period="seat / mo" features={["SSO, SCIM, audit log", "EU or US residency", "Dedicated analyst"]} cta="Upgrade" onCta={() => onChangePlan?.("Scale")} />
        </div>
      </section>
      <section aria-labelledby={`${id}-usage`} className="space-y-3">
        <h2 id={`${id}-usage`} className="text-sm font-medium text-fg">
          Usage
        </h2>
        <div className="grid gap-4 rounded-xl border border-border bg-surface p-4 sm:grid-cols-2">
          <UsageMeter label="Seats" used={18} limit={25} />
          <UsageMeter label="Data sources" used={7} limit={40} />
        </div>
      </section>
      <section aria-labelledby={`${id}-invoices`} className="space-y-3">
        <h2 id={`${id}-invoices`} className="text-sm font-medium text-fg">
          Invoices
        </h2>
        <InvoiceList
          className="max-w-none"
          items={[
            { id: "INV-2041", date: "Nov 1, 2026", amount: "$882.00", status: "open" },
            { id: "INV-1987", date: "Oct 1, 2026", amount: "$882.00", status: "paid" },
            { id: "INV-1932", date: "Sep 1, 2026", amount: "$784.00", status: "paid" },
            { id: "INV-1880", date: "Aug 1, 2026", amount: "$784.00", status: "void" },
          ]}
        />
      </section>
    </div>
  )
}

export { BillingPage }
export type { BillingPageProps }
