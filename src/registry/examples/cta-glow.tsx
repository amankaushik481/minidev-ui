"use client"
import { CtaGlow } from "@/registry/premium/cta-glow"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your own actions",
    description: "Pass the buttons as children to replace the default pair, which has no links or handlers.",
    code: `<CtaGlow className="w-full max-w-2xl" title="Close your books today" description="Connect your bank in two minutes. Free for 14 days, no card needed.">
  <Button render={<a href="#" />}>Start free</Button>
  <Button variant="outline" render={<a href="#" />}>Talk to sales</Button>
</CtaGlow>`,
    node: (
      <CtaGlow className="w-full max-w-2xl" title="Close your books today" description="Connect your bank in two minutes. Free for 14 days, no card needed.">
        <Button render={<a href="#" />}>Start free</Button>
        <Button variant="outline" render={<a href="#" />}>Talk to sales</Button>
      </CtaGlow>
    ),
  },
  {
    title: "Single action",
    description: "One button for a quieter close, for example at the end of a docs page.",
    code: `<CtaGlow className="w-full max-w-2xl" title="Ready to send your first invoice?">
  <Button render={<a href="#" />}>Create an invoice</Button>
</CtaGlow>`,
    node: (
      <CtaGlow className="w-full max-w-2xl" title="Ready to send your first invoice?">
        <Button render={<a href="#" />}>Create an invoice</Button>
      </CtaGlow>
    ),
  },
]
