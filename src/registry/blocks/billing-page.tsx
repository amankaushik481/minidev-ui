"use client"
import { PlanCard } from "@/registry/ui/plan-card"
import { InvoiceList } from "@/registry/ui/invoice-list"
import { UsageMeter } from "@/registry/ui/usage-meter"

function BillingPage() {
  return (
    <div data-slot="billing-page" className="space-y-8">
      <div>
        <h3 className="text-xl font-medium tracking-[-0.014em] text-fg">Billing</h3>
        <p className="mt-1 text-sm text-fg-muted">Plans, usage, and invoices for this workspace.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <PlanCard name="Free" price="$0" features={["3 projects", "Community support", "Basic analytics"]} />
        <PlanCard name="Pro" price="$49" highlighted features={["Unlimited projects", "Advanced analytics", "Priority support"]} />
        <PlanCard name="Team" price="$149" features={["Seats", "SSO", "Support"]} />
      </div>
      <div className="rounded-xl border border-border bg-surface p-4">
        <UsageMeter label="Seats used" used={18} limit={25} />
      </div>
      <InvoiceList items={[
        { id: "INV-1842", date: "Sep 1", amount: "$49", status: "paid" },
        { id: "INV-1830", date: "Aug 1", amount: "$49", status: "paid" },
        { id: "INV-1811", date: "Jul 1", amount: "$49", status: "void" },
      ]} />
    </div>
  )
}
export { BillingPage }
