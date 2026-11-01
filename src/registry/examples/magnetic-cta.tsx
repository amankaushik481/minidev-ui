import { ArrowRightIcon, CalendarIcon } from "lucide-react"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Variants and sizes",
    description: "Every Button prop passes through, so variant, size and icons work exactly as they do on Button.",
    code: `<div className="flex flex-wrap items-center justify-center gap-3">
  <MagneticCta variant="accent" size="lg">Start free trial <ArrowRightIcon /></MagneticCta>
  <MagneticCta variant="outline" size="lg"><CalendarIcon /> Book a demo</MagneticCta>
</div>`,
    node: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <MagneticCta variant="accent" size="lg">Start free trial <ArrowRightIcon /></MagneticCta>
        <MagneticCta variant="outline" size="lg"><CalendarIcon /> Book a demo</MagneticCta>
      </div>
    ),
  },
  {
    title: "Pull strength",
    description: "strength is how far the button travels in pixels at its edge; keep it under 40 so the label stays easy to read.",
    code: `<div className="flex flex-wrap items-center justify-center gap-6">
  <MagneticCta strength={10}>Subtle pull</MagneticCta>
  <MagneticCta strength={48} variant="outline">Strong pull</MagneticCta>
</div>`,
    node: (
      <div className="flex flex-wrap items-center justify-center gap-6">
        <MagneticCta strength={10}>Subtle pull</MagneticCta>
        <MagneticCta strength={48} variant="outline">Strong pull</MagneticCta>
      </div>
    ),
  },
  {
    title: "In a hero",
    description: "One magnetic primary action next to a plain ghost button, so the pull reads as a single highlight.",
    code: `<div className="flex flex-col items-center gap-5 px-4 text-center">
  <h2 className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg sm:text-4xl">Invoices that close themselves</h2>
  <p className="max-w-sm text-sm text-fg-muted">Lumen chases, reconciles and marks every invoice paid, so the Northwind finance team never sends a reminder by hand.</p>
  <div className="flex flex-wrap items-center justify-center gap-3">
    <MagneticCta size="lg">Start free trial <ArrowRightIcon /></MagneticCta>
    <Button variant="ghost" size="lg">See pricing</Button>
  </div>
</div>`,
    node: (
      <div className="flex flex-col items-center gap-5 px-4 text-center">
        <h2 className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg sm:text-4xl">Invoices that close themselves</h2>
        <p className="max-w-sm text-sm text-fg-muted">Lumen chases, reconciles and marks every invoice paid, so the Northwind finance team never sends a reminder by hand.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <MagneticCta size="lg">Start free trial <ArrowRightIcon /></MagneticCta>
          <Button variant="ghost" size="lg">See pricing</Button>
        </div>
      </div>
    ),
  },
]
