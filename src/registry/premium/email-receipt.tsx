"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { EmailPreviewFrame } from "@/registry/ui/email-preview-frame"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailHeader } from "@/registry/ui/email-header"
import { EmailFooter } from "@/registry/ui/email-footer"
import { Separator } from "@/registry/ui/separator"

/**
 * A payment receipt email preview: brand header, "Payment received", line items with a computed total, and a footer, inside an email client frame.
 *
 * Pass `items` as amounts in major units (49 means $49.00); the total and the
 * subject line are computed and formatted with Intl for `currency`. Use it
 * for receipts and invoices paid; for onboarding use EmailWelcome.
 *
 * @example
 * <EmailReceipt brand="Lumen Billing" items={[{ label: "Team plan", amount: 96 }, { label: "Tax", amount: 9.6 }]} currency="USD" />
 */
type ReceiptItem = {
  /** Line label, e.g. "Premium" or "Tax". */
  label: string
  /** Amount in major units (dollars, euros …). */
  amount: number
}

type EmailReceiptProps = {
  /** Sender name in the email header. */
  brand?: string
  items?: ReceiptItem[]
  /** ISO 4217 currency code. */
  currency?: string
  /** BCP 47 locale for number formatting. */
  locale?: string
  className?: string
}

function EmailReceipt({
  brand = "MiniDev Billing",
  items = [
    { label: "Premium", amount: 49 },
    { label: "Tax", amount: 0 },
  ],
  currency = "USD",
  locale = "en-US",
  className,
}: EmailReceiptProps) {
  const money = new Intl.NumberFormat(locale, { style: "currency", currency })
  const total = money.format(items.reduce((sum, it) => sum + it.amount, 0))
  return (
    <div data-slot="email-receipt" data-tier="premium" className={cn(className)}>
      <EmailPreviewFrame subject={`Receipt for ${items[0]?.label ?? "your order"} — ${total}`}>
        <EmailLayout>
          <EmailHeader brand={brand} />
          <div className="space-y-4 px-6 py-6">
            <h1 className="text-xl font-medium text-fg">Payment received</h1>
            <p className="text-sm text-fg-muted">Thanks for upgrading. Here is your receipt.</p>
            <div className="rounded-xl border border-border bg-bg p-4 text-sm">
              {items.map((it, i) => (
                <div key={`${it.label}-${i}`} className={cn("flex justify-between", i > 0 && "mt-2")}>
                  <span className="text-fg-muted">{it.label}</span>
                  <span className="text-fg tabular-nums">{money.format(it.amount)}</span>
                </div>
              ))}
              <Separator className="my-3" />
              <div className="flex justify-between font-medium">
                <span className="text-fg">Total</span>
                <span className="text-fg tabular-nums">{total}</span>
              </div>
            </div>
          </div>
          <EmailFooter />
        </EmailLayout>
      </EmailPreviewFrame>
    </div>
  )
}
export { EmailReceipt }
export type { EmailReceiptProps, ReceiptItem as EmailReceiptItem }
