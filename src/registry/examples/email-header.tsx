"use client"
import { HexagonIcon } from "lucide-react"
import { EmailHeader } from "@/registry/ui/email-header"
import { EmailLayout } from "@/registry/ui/email-layout"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Brand name",
    description: "The simplest header is the sender's name as text.",
    code: `<EmailLayout>
  <EmailHeader brand="Lumen Billing" />
  <div className="px-6 py-6 text-sm text-fg-muted">Your November statement is ready.</div>
</EmailLayout>`,
    node: (
      <EmailLayout>
        <EmailHeader brand="Lumen Billing" />
        <div className="px-6 py-6 text-sm text-fg-muted">Your November statement is ready.</div>
      </EmailLayout>
    ),
  },
  {
    title: "Custom content",
    description: "children replace the brand text. In a sent email this is usually an img with an absolute URL and alt text.",
    code: `<EmailLayout>
  <EmailHeader>
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm font-medium text-fg">
        <HexagonIcon aria-hidden className="size-4 text-accent" /> Lumen
      </span>
      <span className="text-xs text-fg-muted">Statement · Nov 2026</span>
    </div>
  </EmailHeader>
  <div className="px-6 py-6 text-sm text-fg-muted">Your November statement is ready.</div>
</EmailLayout>`,
    node: (
      <EmailLayout>
        <EmailHeader>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-fg">
              <HexagonIcon aria-hidden className="size-4 text-accent" /> Lumen
            </span>
            <span className="text-xs text-fg-muted">Statement · Nov 2026</span>
          </div>
        </EmailHeader>
        <div className="px-6 py-6 text-sm text-fg-muted">Your November statement is ready.</div>
      </EmailLayout>
    ),
  },
]
