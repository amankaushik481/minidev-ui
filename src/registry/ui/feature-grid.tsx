"use client"
import * as React from "react"
import { BellIcon, GlobeIcon, LockIcon, ReceiptIcon, RefreshCwIcon, WebhookIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** A responsive grid of feature cards, each with an optional icon, a title and a short description. */
type Feature = { title: string; description: string; icon?: React.ReactNode }

const SAMPLE_FEATURES: Feature[] = [
  { title: "Invoices in seconds", description: "Draft, send and track invoices from one screen. Lumen fills in customer details and tax rates for you.", icon: <ReceiptIcon className="size-5" /> },
  { title: "Automatic reminders", description: "Polite nudges go out before and after the due date, and stop the moment a payment lands.", icon: <BellIcon className="size-5" /> },
  { title: "Multi-currency", description: "Bill in 135 currencies with daily rates, and settle to your base currency without spreadsheets.", icon: <GlobeIcon className="size-5" /> },
  { title: "Bank reconciliation", description: "Transactions match to invoices as they clear, so your books stay closed every day, not every quarter.", icon: <RefreshCwIcon className="size-5" /> },
  { title: "Webhooks and API", description: "Every invoice, payment and refund fires an event. Build on the same API Lumen's own apps use.", icon: <WebhookIcon className="size-5" /> },
  { title: "Audit-ready by default", description: "Every change is logged with who, when and what. Export the trail for your auditors in one click.", icon: <LockIcon className="size-5" /> },
]

type FeatureGridProps = {
  /** Cards to show. Defaults to six Lumen features with icons. */
  features?: Feature[]
  className?: string
}

function FeatureGrid({
  features = SAMPLE_FEATURES,
  className,
}: FeatureGridProps) {
  return (
    <div data-slot="feature-grid" className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {features.map((f) => (
        <div key={f.title} className="rounded-xl border border-border bg-surface p-5 shadow-highlight">
          {f.icon ? <div className="mb-3 text-accent">{f.icon}</div> : null}
          <h3 className="text-sm font-medium text-fg">{f.title}</h3>
          <p className="mt-1.5 text-sm leading-[1.55] text-fg-muted">{f.description}</p>
        </div>
      ))}
    </div>
  )
}
export { FeatureGrid }
export type { FeatureGridProps, Feature }
