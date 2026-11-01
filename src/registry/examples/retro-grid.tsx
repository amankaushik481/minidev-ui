import { ArrowRightIcon, PlayIcon } from "lucide-react"
import { RetroGrid } from "@/registry/premium/retro-grid"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Flatter and faster",
    description: "A higher angle lays the floor flatter and longer; cellSize widens the squares and speed is cells per second.",
    code: `<RetroGrid angle={78} cellSize={64} speed={1.4} horizon={50} />`,
    node: <RetroGrid angle={78} cellSize={64} speed={1.4} horizon={50} />,
  },
  {
    title: "Low horizon",
    description: "horizon is the percent from the top where the floor meets the sky; push it down and keep the content in the upper part.",
    code: `<RetroGrid horizon={70} speed={0.35} cellSize={40} className="h-72">
  <div className="flex h-full flex-col items-center gap-3 px-6 pt-12 text-center">
    <p className="font-mono text-xs tracking-[0.18em] text-accent-fg uppercase">Lumen Conf · 12 Nov 2026</p>
    <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">The future of closing the books</p>
  </div>
</RetroGrid>`,
    node: (
      <RetroGrid horizon={70} speed={0.35} cellSize={40} className="h-72">
        <div className="flex h-full flex-col items-center gap-3 px-6 pt-12 text-center">
          <p className="font-mono text-xs tracking-[0.18em] text-accent-fg uppercase">Lumen Conf · 12 Nov 2026</p>
          <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">The future of closing the books</p>
        </div>
      </RetroGrid>
    ),
  },
  {
    title: "Hero with two actions",
    description: "Children replace the sample content; a steeper angle keeps the floor short under a taller hero.",
    code: `<RetroGrid className="h-[400px]" angle={62}>
  <div className="flex h-full flex-col items-center gap-5 px-6 pt-12 text-center">
    <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-fg-muted">Lumen 3.0 ships 14 October</span>
    <p className="max-w-[22ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg sm:text-4xl">Invoices that close themselves</p>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Start free trial <ArrowRightIcon /></Button>
      <Button variant="outline">Watch the keynote <PlayIcon /></Button>
    </div>
  </div>
</RetroGrid>`,
    node: (
      <RetroGrid className="h-[400px]" angle={62}>
        <div className="flex h-full flex-col items-center gap-5 px-6 pt-12 text-center">
          <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-fg-muted">Lumen 3.0 ships 14 October</span>
          <p className="max-w-[22ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg sm:text-4xl">Invoices that close themselves</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button>Start free trial <ArrowRightIcon /></Button>
            <Button variant="outline">Watch the keynote <PlayIcon /></Button>
          </div>
        </div>
      </RetroGrid>
    ),
  },
]
