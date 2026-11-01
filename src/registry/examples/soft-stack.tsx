import { ArrowRightIcon } from "lucide-react"
import { SoftStack } from "@/registry/premium/soft-stack"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Wider and shorter",
    description: "The cards are absolutely placed, so the box height is yours to set; h-40 hugs the three cards and max-w-md widens them.",
    code: `<SoftStack className="h-40 max-w-md" />`,
    node: <SoftStack className="h-40 max-w-md" />,
  },
  {
    title: "Beside copy",
    description: "Copy on the left and the stack on the right; the cards settle as the section scrolls into view.",
    code: `<div className="grid w-full max-w-3xl items-center gap-8 md:grid-cols-2">
  <div>
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">One workspace</p>
    <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">Inbox, board and billing in one place</h2>
    <p className="mt-3 text-sm leading-[1.6] text-fg-muted">Northwind runs support, planning and invoicing from a single Lumen workspace.</p>
    <Button variant="outline" className="mt-5">See how it fits <ArrowRightIcon /></Button>
  </div>
  <SoftStack className="h-40" />
</div>`,
    node: (
      <div className="grid w-full max-w-3xl items-center gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">One workspace</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">Inbox, board and billing in one place</h2>
          <p className="mt-3 text-sm leading-[1.6] text-fg-muted">Northwind runs support, planning and invoicing from a single Lumen workspace.</p>
          <Button variant="outline" className="mt-5">See how it fits <ArrowRightIcon /></Button>
        </div>
        <SoftStack className="h-40" />
      </div>
    ),
  },
]
