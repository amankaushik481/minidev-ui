import { ArrowRightIcon } from "lucide-react"
import { DotPattern } from "@/registry/premium/dot-pattern"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Grid variant",
    description: "variant grid draws hairlines instead of dots; gap is the cell size in pixels.",
    code: `<DotPattern variant="grid" gap={32} className="h-64" />`,
    node: <DotPattern variant="grid" gap={32} className="h-64" />,
  },
  {
    title: "Custom content",
    description: "Children replace the sample copy and sit above the pattern; the glow still follows the pointer behind them.",
    code: `<DotPattern className="h-72">
  <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
    <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-fg-muted shadow-xs">Lumen for agencies</span>
    <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Bill every client from one place</p>
    <Button>Start free <ArrowRightIcon /></Button>
  </div>
</DotPattern>`,
    node: (
      <DotPattern className="h-72">
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-fg-muted shadow-xs">Lumen for agencies</span>
          <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Bill every client from one place</p>
          <Button>Start free <ArrowRightIcon /></Button>
        </div>
      </DotPattern>
    ),
  },
  {
    title: "Dense, still texture",
    description: "A small gap and a light weight make a fine texture; glow false and fade false leave it flat and even behind a quiet row.",
    code: `<DotPattern gap={10} weight={0.75} glow={false} fade={false} className="h-48">
  <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
    <p className="text-xs font-medium tracking-[0.06em] text-fg-subtle uppercase">Trusted by finance teams at</p>
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-medium text-fg-muted">
      <span>Northwind</span>
      <span>Okafor and Sons</span>
      <span>Raman Studio</span>
      <span>Lowe Logistics</span>
    </div>
  </div>
</DotPattern>`,
    node: (
      <DotPattern gap={10} weight={0.75} glow={false} fade={false} className="h-48">
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
          <p className="text-xs font-medium tracking-[0.06em] text-fg-subtle uppercase">Trusted by finance teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-medium text-fg-muted">
            <span>Northwind</span>
            <span>Okafor and Sons</span>
            <span>Raman Studio</span>
            <span>Lowe Logistics</span>
          </div>
        </div>
      </DotPattern>
    ),
  },
]
