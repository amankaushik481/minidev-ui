"use client"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailHeader } from "@/registry/ui/email-header"
import { EmailCard } from "@/registry/ui/email-card"
import { EmailButton } from "@/registry/ui/email-button"
import { EmailFooter } from "@/registry/ui/email-footer"
import { EmailPreviewFrame } from "@/registry/ui/email-preview-frame"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Password reset",
    description: "Header, body, one button and a footer: the shape of most transactional emails.",
    code: `<EmailLayout>
  <EmailHeader brand="Lumen" />
  <div className="space-y-4 px-6 py-6">
    <h1 className="text-xl font-medium text-fg">Reset your password</h1>
    <p className="text-sm leading-[1.55] text-fg-muted">Someone asked to reset the password for theo@halcyon.example. The link works for 30 minutes.</p>
    <EmailButton href="https://app.lumen.example/reset?t=5d1e">Choose a new password</EmailButton>
  </div>
  <EmailFooter address="Lumen Inc. · Portland, OR" />
</EmailLayout>`,
    node: (
      <EmailLayout>
        <EmailHeader brand="Lumen" />
        <div className="space-y-4 px-6 py-6">
          <h1 className="text-xl font-medium text-fg">Reset your password</h1>
          <p className="text-sm leading-[1.55] text-fg-muted">Someone asked to reset the password for theo@halcyon.example. The link works for 30 minutes.</p>
          <EmailButton href="https://app.lumen.example/reset?t=5d1e">Choose a new password</EmailButton>
        </div>
        <EmailFooter address="Lumen Inc. · Portland, OR" />
      </EmailLayout>
    ),
  },
  {
    title: "Invoice reminder in a frame",
    description: "Wrap the layout in EmailPreviewFrame to show the subject and sender, as in a template editor.",
    code: `<EmailPreviewFrame subject="Reminder: INV-2033 is 6 days overdue" from="billing@lumen.example" className="w-full max-w-xl">
  <EmailLayout>
    <EmailHeader brand="Lumen Billing" />
    <div className="px-6 pt-6">
      <h1 className="text-xl font-medium text-fg">A friendly reminder</h1>
    </div>
    <EmailCard title="INV-2033 · Northwind">$3,150.00, due Oct 18.</EmailCard>
    <div className="px-6 pb-6">
      <EmailButton href="https://pay.lumen.example/INV-2033">Pay $3,150.00</EmailButton>
    </div>
    <EmailFooter address="Lumen Inc. · Portland, OR" />
  </EmailLayout>
</EmailPreviewFrame>`,
    node: (
      <EmailPreviewFrame subject="Reminder: INV-2033 is 6 days overdue" from="billing@lumen.example" className="w-full max-w-xl">
        <EmailLayout>
          <EmailHeader brand="Lumen Billing" />
          <div className="px-6 pt-6">
            <h1 className="text-xl font-medium text-fg">A friendly reminder</h1>
          </div>
          <EmailCard title="INV-2033 · Northwind">$3,150.00, due Oct 18.</EmailCard>
          <div className="px-6 pb-6">
            <EmailButton href="https://pay.lumen.example/INV-2033">Pay $3,150.00</EmailButton>
          </div>
          <EmailFooter address="Lumen Inc. · Portland, OR" />
        </EmailLayout>
      </EmailPreviewFrame>
    ),
  },
]
