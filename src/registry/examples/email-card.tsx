"use client"
import { EmailCard } from "@/registry/ui/email-card"
import { EmailLayout } from "@/registry/ui/email-layout"
import { EmailHeader } from "@/registry/ui/email-header"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Sign-in code",
    description: "Group the one thing the reader needs in a card. Its margins line up with the header.",
    code: `<EmailLayout>
  <EmailHeader brand="Lumen" />
  <EmailCard title="Your sign-in code">
    <span className="block font-mono text-2xl tracking-[0.2em] text-fg tabular-nums">482 913</span>
    <span className="mt-1 block">It expires in 10 minutes. If you did not try to sign in, you can ignore this email.</span>
  </EmailCard>
</EmailLayout>`,
    node: (
      <EmailLayout>
        <EmailHeader brand="Lumen" />
        <EmailCard title="Your sign-in code">
          <span className="block font-mono text-2xl tracking-[0.2em] text-fg tabular-nums">482 913</span>
          <span className="mt-1 block">It expires in 10 minutes. If you did not try to sign in, you can ignore this email.</span>
        </EmailCard>
      </EmailLayout>
    ),
  },
  {
    title: "Order summary",
    description: "Children can be any markup, such as rows of amounts with tabular numbers.",
    code: `<EmailLayout>
  <EmailCard title="Order LM-10482">
    <span className="flex justify-between"><span>Team plan, 12 seats</span><span className="text-fg tabular-nums">$288.00</span></span>
    <span className="mt-1 flex justify-between"><span>Tax</span><span className="text-fg tabular-nums">$23.04</span></span>
    <span className="mt-2 flex justify-between border-t border-border pt-2 font-medium text-fg"><span>Total</span><span className="tabular-nums">$311.04</span></span>
  </EmailCard>
</EmailLayout>`,
    node: (
      <EmailLayout>
        <EmailCard title="Order LM-10482">
          <span className="flex justify-between"><span>Team plan, 12 seats</span><span className="text-fg tabular-nums">$288.00</span></span>
          <span className="mt-1 flex justify-between"><span>Tax</span><span className="text-fg tabular-nums">$23.04</span></span>
          <span className="mt-2 flex justify-between border-t border-border pt-2 font-medium text-fg"><span>Total</span><span className="tabular-nums">$311.04</span></span>
        </EmailCard>
      </EmailLayout>
    ),
  },
]
