import { ArrowRightIcon } from "lucide-react"
import { MaskedGradientHeadline } from "@/registry/premium/masked-gradient-headline"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom copy",
    description: "Pass the headline as children; it wipes in from the left the first time it scrolls into view.",
    code: `<MaskedGradientHeadline className="text-center">Invoices that close themselves.</MaskedGradientHeadline>`,
    node: <MaskedGradientHeadline className="text-center">Invoices that close themselves.</MaskedGradientHeadline>,
  },
  {
    title: "Your own gradient",
    description: "Override the background image with a bg-[linear-gradient(...)] class to change the colours, and the size with text classes.",
    code: `<MaskedGradientHeadline className="text-center text-3xl sm:text-4xl bg-[linear-gradient(100deg,var(--accent)_0%,var(--accent-2)_55%,var(--info)_100%)]">
  Trusted by 4,000 finance teams.
</MaskedGradientHeadline>`,
    node: (
      <MaskedGradientHeadline className="text-center text-3xl sm:text-4xl bg-[linear-gradient(100deg,var(--accent)_0%,var(--accent-2)_55%,var(--info)_100%)]">
        Trusted by 4,000 finance teams.
      </MaskedGradientHeadline>
    ),
  },
  {
    title: "In a hero",
    description: "An eyebrow, the gradient headline and a plain paragraph; keep the gradient to the one line you want remembered.",
    code: `<div className="flex max-w-2xl flex-col items-center gap-5 px-4 text-center">
  <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen 3.0</p>
  <MaskedGradientHeadline className="text-center">Every invoice, accounted for.</MaskedGradientHeadline>
  <p className="max-w-md text-sm leading-[1.6] text-fg-muted">Lumen matches payments to open invoices, sends reminders in your voice and posts the rest to the ledger while you sleep.</p>
  <Button>Start free trial <ArrowRightIcon /></Button>
</div>`,
    node: (
      <div className="flex max-w-2xl flex-col items-center gap-5 px-4 text-center">
        <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen 3.0</p>
        <MaskedGradientHeadline className="text-center">Every invoice, accounted for.</MaskedGradientHeadline>
        <p className="max-w-md text-sm leading-[1.6] text-fg-muted">Lumen matches payments to open invoices, sends reminders in your voice and posts the rest to the ledger while you sleep.</p>
        <Button>Start free trial <ArrowRightIcon /></Button>
      </div>
    ),
  },
]
