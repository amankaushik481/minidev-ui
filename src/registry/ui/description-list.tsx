"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * DescriptionList — label and value pairs in a two-column grid, for record details like a customer or an invoice.
 *
 * Renders a semantic <dl>. Use for read-only record details. For editable
 * settings use `FormField` rows; for tabular data with many records use `Table`.
 *
 * @example
 * <DescriptionList items={[{ label: "Plan", value: "Growth" }, { label: "Seats", value: 12 }]} />
 */
type DescriptionItem = {
  /** Term, rendered in a <dt>. */
  label: React.ReactNode
  /** Detail, rendered in a <dd>. */
  value: React.ReactNode
}

const SAMPLE_ITEMS: DescriptionItem[] = [
  { label: "Customer", value: "Northwind Labs" },
  { label: "Billing contact", value: "Maya Chen" },
  { label: "Plan", value: "Growth, annual" },
  { label: "Next invoice", value: "Nov 1, 2026" },
  { label: "Payment method", value: <span className="font-mono text-xs">Visa •••• 4242</span> },
  { label: "Region", value: "eu-west-1" },
]

type DescriptionListProps = {
  /** Pairs to show, in order. Defaults to a Lumen customer record. */
  items?: DescriptionItem[]
  className?: string
}

function DescriptionList({ items = SAMPLE_ITEMS, className }: DescriptionListProps) {
  return (
    <dl data-slot="description-list" className={cn("grid w-full max-w-xl gap-3 sm:grid-cols-2", className)}>
      {items.map((item, i) => (
        <div key={i} className="border-b border-border pb-3">
          <dt className="text-xs font-medium tracking-[0.01em] text-fg-muted">{item.label}</dt>
          <dd className="mt-1 text-sm text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
export { DescriptionList }
export type { DescriptionListProps, DescriptionItem }
