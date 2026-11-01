import { TypographicMarquee } from "@/registry/premium/typographic-marquee"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom phrases",
    description: "phrases are joined with an accent dot and duplicated once, so the loop has no seam.",
    code: `<TypographicMarquee phrases={["Invoices", "Reminders", "Reconciliation", "Payouts", "Reports", "Audit trail"]} />`,
    node: <TypographicMarquee phrases={["Invoices", "Reminders", "Reconciliation", "Payouts", "Reports", "Audit trail"]} />,
  },
  {
    title: "Borderless strip",
    description: "Drop the frame with className to run the strip between two blocks of a page, for example a list of customers.",
    code: `<section className="w-full space-y-4 text-center">
  <p className="text-xs font-medium tracking-[0.06em] text-fg-subtle uppercase">Trusted by</p>
  <TypographicMarquee className="rounded-none border-0 bg-transparent py-2" phrases={["Northwind", "Atlas Freight", "Cadence Labs", "Forma Studio", "Hale and Co", "Kura Health"]} />
</section>`,
    node: (
      <section className="w-full space-y-4 text-center">
        <p className="text-xs font-medium tracking-[0.06em] text-fg-subtle uppercase">Trusted by</p>
        <TypographicMarquee className="rounded-none border-0 bg-transparent py-2" phrases={["Northwind", "Atlas Freight", "Cadence Labs", "Forma Studio", "Hale and Co", "Kura Health"]} />
      </section>
    ),
  },
]
