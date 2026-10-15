import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Meteors } from "@/registry/premium/meteors"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom content",
    description: "Children sit above the streaks and keep the pointer; the panel fills its container width.",
    code: `<Meteors className="h-72">
  <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="max-w-[20ch] text-2xl font-medium tracking-[-0.03em] text-balance text-fg">Northwind closed the quarter in 4 days</p>
    <p className="max-w-sm text-sm text-fg-muted">Read how a 40 person finance team moved 1,200 invoices to Lumen.</p>
    <Button variant="outline">Read the story <ArrowRightIcon /></Button>
  </div>
</Meteors>`,
    node: (
      <Meteors className="h-72">
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-[20ch] text-2xl font-medium tracking-[-0.03em] text-balance text-fg">Northwind closed the quarter in 4 days</p>
          <p className="max-w-sm text-sm text-fg-muted">Read how a 40 person finance team moved 1,200 invoices to Lumen.</p>
          <Button variant="outline">Read the story <ArrowRightIcon /></Button>
        </div>
      </Meteors>
    ),
  },
  {
    title: "Angle and speed",
    description: "angle is degrees of travel, 90 is straight down; speed multiplies the pace and count adds streaks.",
    code: `<Meteors angle={110} speed={1.6} count={28} className="h-64" />`,
    node: <Meteors angle={110} speed={1.6} count={28} className="h-64" />,
  },
  {
    title: "Sparse and slow",
    description: "A handful of long, slow meteors reads as weather behind a quiet section.",
    code: `<Meteors count={6} speed={0.6} tail={180} className="h-64">
  <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
    <span className="flex items-center gap-2 text-sm text-fg-muted">
      <span className="size-2 rounded-full bg-success" aria-hidden /> All systems operational
    </span>
    <p className="text-xl font-medium tracking-[-0.02em] text-fg">Lumen status</p>
    <p className="text-xs text-fg-subtle">Last incident 42 days ago</p>
  </div>
</Meteors>`,
    node: (
      <Meteors count={6} speed={0.6} tail={180} className="h-64">
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="flex items-center gap-2 text-sm text-fg-muted">
            <span className="size-2 rounded-full bg-success" aria-hidden /> All systems operational
          </span>
          <p className="text-xl font-medium tracking-[-0.02em] text-fg">Lumen status</p>
          <p className="text-xs text-fg-subtle">Last incident 42 days ago</p>
        </div>
      </Meteors>
    ),
  },
]
