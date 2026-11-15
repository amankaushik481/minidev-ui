"use client"
import { EmailButton } from "@/registry/ui/email-button"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailHeader } from "@/registry/ui/email-header"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Call to action in an email",
    description: "One EmailButton per email, with an absolute URL and text that says where it goes.",
    code: `<EmailLayout>
  <EmailHeader brand="Lumen" />
  <div className="space-y-4 px-6 py-6">
    <p className="text-sm leading-[1.55] text-fg-muted">Invoice INV-2041 for $12,400.00 is due on Nov 30.</p>
    <EmailButton href="https://app.lumen.example/invoices/INV-2041">View invoice INV-2041</EmailButton>
  </div>
</EmailLayout>`,
    node: (
      <EmailLayout>
        <EmailHeader brand="Lumen" />
        <div className="space-y-4 px-6 py-6">
          <p className="text-sm leading-[1.55] text-fg-muted">Invoice INV-2041 for $12,400.00 is due on Nov 30.</p>
          <EmailButton href="https://app.lumen.example/invoices/INV-2041">View invoice INV-2041</EmailButton>
        </div>
      </EmailLayout>
    ),
  },
  {
    title: "Full width on narrow screens",
    description: "className widens the button, which is easier to tap in a phone mail app.",
    code: `<div className="w-full max-w-xs">
  <EmailButton href="https://app.lumen.example/verify?t=8f2c" className="w-full">Confirm your email</EmailButton>
</div>`,
    node: (
      <div className="w-full max-w-xs">
        <EmailButton href="https://app.lumen.example/verify?t=8f2c" className="w-full">Confirm your email</EmailButton>
      </div>
    ),
  },
]
