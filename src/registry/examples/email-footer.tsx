"use client"
import { EmailFooter } from "@/registry/ui/email-footer"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailHeader } from "@/registry/ui/email-header"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Marketing footer",
    description: "Pass a real postal address and working unsubscribe and preferences URLs.",
    code: `<EmailLayout>
  <EmailHeader brand="Lumen" />
  <div className="px-6 py-6 text-sm leading-[1.55] text-fg-muted">Recurring invoices now support net-60 terms. Turn them on per customer.</div>
  <EmailFooter
    address="Lumen Inc. · 548 Harbor St, Suite 300, Portland, OR 97204"
    unsubscribeHref="https://app.lumen.example/unsubscribe?t=c71a"
    preferencesHref="https://app.lumen.example/settings/email"
  />
</EmailLayout>`,
    node: (
      <EmailLayout>
        <EmailHeader brand="Lumen" />
        <div className="px-6 py-6 text-sm leading-[1.55] text-fg-muted">Recurring invoices now support net-60 terms. Turn them on per customer.</div>
        <EmailFooter
          address="Lumen Inc. · 548 Harbor St, Suite 300, Portland, OR 97204"
          unsubscribeHref="https://app.lumen.example/unsubscribe?t=c71a"
          preferencesHref="https://app.lumen.example/settings/email"
        />
      </EmailLayout>
    ),
  },
  {
    title: "On its own",
    description: "The footer is a full-width band; className can tighten it for transactional mail.",
    code: `<div className="w-full max-w-[560px] overflow-hidden rounded-xl border border-border">
  <EmailFooter
    className="py-4"
    address="Lumen Inc. · Portland, OR"
    unsubscribeHref="https://app.lumen.example/unsubscribe?t=c71a"
    preferencesHref="https://app.lumen.example/settings/email"
  />
</div>`,
    node: (
      <div className="w-full max-w-[560px] overflow-hidden rounded-xl border border-border">
        <EmailFooter
          className="py-4"
          address="Lumen Inc. · Portland, OR"
          unsubscribeHref="https://app.lumen.example/unsubscribe?t=c71a"
          preferencesHref="https://app.lumen.example/settings/email"
        />
      </div>
    ),
  },
]
