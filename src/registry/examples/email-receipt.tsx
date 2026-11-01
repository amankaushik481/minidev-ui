import { EmailReceipt } from "@/registry/premium/email-receipt"
import { EmailButton } from "@/registry/ui/email-button"
import { EmailFooter } from "@/registry/ui/email-footer"
import { EmailHeader } from "@/registry/ui/email-header"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailPreviewFrame } from "@/registry/ui/email-preview-frame"
import { Separator } from "@/registry/ui/separator"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your own line items",
    description: "The receipt is EmailPreviewFrame, EmailLayout, EmailHeader, a totals box and EmailFooter; rebuild it with your sender, items and a download link.",
    code: `<EmailPreviewFrame subject="Receipt for INV-2041" from="billing@lumen.dev" className="w-full max-w-2xl">
  <EmailLayout>
    <EmailHeader brand="Lumen" />
    <div className="space-y-4 px-6 py-6">
      <h1 className="text-xl font-medium text-fg">Thanks, Northwind Traders</h1>
      <p className="text-sm text-fg-muted">We received your payment for INV-2041 on 30 September 2026.</p>
      <div className="rounded-xl border border-border bg-bg p-4 text-sm">
        <div className="flex justify-between"><span className="text-fg-muted">Lumen Pro, 4 seats</span><span className="tabular-nums text-fg">$3,200.00</span></div>
        <div className="mt-2 flex justify-between"><span className="text-fg-muted">Automatic reminders</span><span className="tabular-nums text-fg">$300.00</span></div>
        <div className="mt-2 flex justify-between"><span className="text-fg-muted">VAT 20%</span><span className="tabular-nums text-fg">$700.00</span></div>
        <Separator className="my-3" />
        <div className="flex justify-between font-medium"><span className="text-fg">Total paid</span><span className="tabular-nums text-fg">$4,200.00</span></div>
      </div>
      <EmailButton href="#receipt">Download PDF</EmailButton>
    </div>
    <EmailFooter address="Lumen, Inc. · 548 Market St, San Francisco" />
  </EmailLayout>
</EmailPreviewFrame>`,
    node: (
      <EmailPreviewFrame subject="Receipt for INV-2041" from="billing@lumen.dev" className="w-full max-w-2xl">
        <EmailLayout>
          <EmailHeader brand="Lumen" />
          <div className="space-y-4 px-6 py-6">
            <h1 className="text-xl font-medium text-fg">Thanks, Northwind Traders</h1>
            <p className="text-sm text-fg-muted">We received your payment for INV-2041 on 30 September 2026.</p>
            <div className="rounded-xl border border-border bg-bg p-4 text-sm">
              <div className="flex justify-between"><span className="text-fg-muted">Lumen Pro, 4 seats</span><span className="tabular-nums text-fg">$3,200.00</span></div>
              <div className="mt-2 flex justify-between"><span className="text-fg-muted">Automatic reminders</span><span className="tabular-nums text-fg">$300.00</span></div>
              <div className="mt-2 flex justify-between"><span className="text-fg-muted">VAT 20%</span><span className="tabular-nums text-fg">$700.00</span></div>
              <Separator className="my-3" />
              <div className="flex justify-between font-medium"><span className="text-fg">Total paid</span><span className="tabular-nums text-fg">$4,200.00</span></div>
            </div>
            <EmailButton href="#receipt">Download PDF</EmailButton>
          </div>
          <EmailFooter address="Lumen, Inc. · 548 Market St, San Francisco" />
        </EmailLayout>
      </EmailPreviewFrame>
    ),
  },
  {
    title: "Phone width",
    description: "Cap the width with className to check how the receipt reads in a phone inbox.",
    code: `<EmailReceipt className="w-full max-w-sm" />`,
    node: <EmailReceipt className="w-full max-w-sm" />,
  },
]
