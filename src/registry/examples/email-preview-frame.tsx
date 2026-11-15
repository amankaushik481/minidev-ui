"use client"
import { EmailPreviewFrame } from "@/registry/ui/email-preview-frame"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailHeader } from "@/registry/ui/email-header"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Template preview",
    description: "Show subject and sender above the email so the whole message is reviewed together.",
    code: `<EmailPreviewFrame subject="Your Lumen trial ends in 3 days" from="hello@lumen.example" className="w-full max-w-xl">
  <EmailLayout>
    <EmailHeader brand="Lumen" />
    <div className="px-6 py-6 text-sm leading-[1.55] text-fg-muted">Add a card before Nov 18 to keep your 14 invoices and 3 automations.</div>
  </EmailLayout>
</EmailPreviewFrame>`,
    node: (
      <EmailPreviewFrame subject="Your Lumen trial ends in 3 days" from="hello@lumen.example" className="w-full max-w-xl">
        <EmailLayout>
          <EmailHeader brand="Lumen" />
          <div className="px-6 py-6 text-sm leading-[1.55] text-fg-muted">Add a card before Nov 18 to keep your 14 invoices and 3 automations.</div>
        </EmailLayout>
      </EmailPreviewFrame>
    ),
  },
  {
    title: "Notification settings",
    description: "A small preview next to a setting shows what each notification will look like.",
    code: `<div className="grid w-full max-w-2xl gap-4 sm:grid-cols-[1fr_1.4fr]">
  <div className="space-y-1">
    <p className="text-sm font-medium text-fg">Payment received</p>
    <p className="text-xs text-fg-muted">Sent to the account owner when a customer pays an invoice.</p>
  </div>
  <EmailPreviewFrame subject="Northwind paid INV-2041" from="notifications@lumen.example">
    <EmailLayout>
      <div className="px-5 py-4 text-sm text-fg-muted">$12,400.00 arrived on Nov 14. It will be in your next payout.</div>
    </EmailLayout>
  </EmailPreviewFrame>
</div>`,
    node: (
      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-[1fr_1.4fr]">
        <div className="space-y-1">
          <p className="text-sm font-medium text-fg">Payment received</p>
          <p className="text-xs text-fg-muted">Sent to the account owner when a customer pays an invoice.</p>
        </div>
        <EmailPreviewFrame subject="Northwind paid INV-2041" from="notifications@lumen.example">
          <EmailLayout>
            <div className="px-5 py-4 text-sm text-fg-muted">$12,400.00 arrived on Nov 14. It will be in your next payout.</div>
          </EmailLayout>
        </EmailPreviewFrame>
      </div>
    ),
  },
]
