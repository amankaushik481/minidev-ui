import { EmailWelcome } from "@/registry/premium/email-welcome"
import { EmailButton } from "@/registry/ui/email-button"
import { EmailCard } from "@/registry/ui/email-card"
import { EmailFooter } from "@/registry/ui/email-footer"
import { EmailHeader } from "@/registry/ui/email-header"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailPreviewFrame } from "@/registry/ui/email-preview-frame"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your own welcome",
    description: "The email is EmailPreviewFrame, EmailLayout, EmailHeader, a body with EmailButton, an EmailCard and EmailFooter; rebuild it with your copy.",
    code: `<EmailPreviewFrame subject="Welcome to Lumen, Maya" from="hello@lumen.dev" className="w-full max-w-2xl">
  <EmailLayout>
    <EmailHeader brand="Lumen" />
    <div className="space-y-4 px-6 py-6">
      <h1 className="text-xl font-medium tracking-[-0.014em] text-fg">Your books are ready</h1>
      <p className="text-sm leading-[1.55] text-fg-muted">
        Northwind Traders is set up with two bank feeds and 14 open invoices imported. Send your first reminder today and watch it land.
      </p>
      <EmailButton href="#open">Open Lumen</EmailButton>
    </div>
    <EmailCard title="Next steps">
      Invite Theo and Priya from Settings, connect your card processor, then turn on automatic reminders.
    </EmailCard>
    <EmailFooter address="Lumen, Inc. · 548 Market St, San Francisco" />
  </EmailLayout>
</EmailPreviewFrame>`,
    node: (
      <EmailPreviewFrame subject="Welcome to Lumen, Maya" from="hello@lumen.dev" className="w-full max-w-2xl">
        <EmailLayout>
          <EmailHeader brand="Lumen" />
          <div className="space-y-4 px-6 py-6">
            <h1 className="text-xl font-medium tracking-[-0.014em] text-fg">Your books are ready</h1>
            <p className="text-sm leading-[1.55] text-fg-muted">
              Northwind Traders is set up with two bank feeds and 14 open invoices imported. Send your first reminder today and watch it land.
            </p>
            <EmailButton href="#open">Open Lumen</EmailButton>
          </div>
          <EmailCard title="Next steps">
            Invite Theo and Priya from Settings, connect your card processor, then turn on automatic reminders.
          </EmailCard>
          <EmailFooter address="Lumen, Inc. · 548 Market St, San Francisco" />
        </EmailLayout>
      </EmailPreviewFrame>
    ),
  },
  {
    title: "Phone width",
    description: "Cap the width with className to check how the email reads in a phone inbox.",
    code: `<EmailWelcome className="w-full max-w-sm" />`,
    node: <EmailWelcome className="w-full max-w-sm" />,
  },
]
