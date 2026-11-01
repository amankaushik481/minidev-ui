import { ArrowRightIcon } from "lucide-react"
import { WavyBackground } from "@/registry/premium/wavy-background"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your colours",
    description: "colors are the waves back to front; a larger amplitude and coverage bring the swell higher up the panel.",
    code: `<WavyBackground colors={["var(--accent)", "var(--accent-2)"]} amplitude={40} coverage={0.6} className="h-72">
  <div className="flex h-full flex-col items-center gap-3 px-6 pt-10 text-center">
    <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Payouts every Friday</p>
    <p className="max-w-sm text-sm text-fg-muted">Northwind pays 40 suppliers a week and Lumen files the remittance advice.</p>
  </div>
</WavyBackground>`,
    node: (
      <WavyBackground colors={["var(--accent)", "var(--accent-2)"]} amplitude={40} coverage={0.6} className="h-72">
        <div className="flex h-full flex-col items-center gap-3 px-6 pt-10 text-center">
          <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Payouts every Friday</p>
          <p className="max-w-sm text-sm text-fg-muted">Northwind pays 40 suppliers a week and Lumen files the remittance advice.</p>
        </div>
      </WavyBackground>
    ),
  },
  {
    title: "Crisp and slow",
    description: "blur={0} draws hard edges, a low opacity keeps them quiet, and speed below 1 slows the roll.",
    code: `<WavyBackground blur={0} speed={0.4} opacity={0.3} coverage={0.4} colors={["var(--success)", "var(--info)", "var(--chart-2)"]} className="h-64">
  <div className="flex items-start justify-between gap-4 px-8 pt-8">
    <div>
      <p className="text-xs font-medium tracking-[0.06em] text-fg-subtle uppercase">Cash on hand</p>
      <p className="mt-1 text-3xl font-medium tracking-[-0.035em] text-fg tabular-nums">$412,800</p>
    </div>
    <Badge variant="accent">+8.2% this month</Badge>
  </div>
</WavyBackground>`,
    node: (
      <WavyBackground blur={0} speed={0.4} opacity={0.3} coverage={0.4} colors={["var(--success)", "var(--info)", "var(--chart-2)"]} className="h-64">
        <div className="flex items-start justify-between gap-4 px-8 pt-8">
          <div>
            <p className="text-xs font-medium tracking-[0.06em] text-fg-subtle uppercase">Cash on hand</p>
            <p className="mt-1 text-3xl font-medium tracking-[-0.035em] text-fg tabular-nums">$412,800</p>
          </div>
          <Badge variant="accent">+8.2% this month</Badge>
        </div>
      </WavyBackground>
    ),
  },
  {
    title: "Call to action",
    description: "Keep the content in the top part with pt-10 and a lower coverage, so the buttons sit above the swell.",
    code: `<WavyBackground amplitude={18} coverage={0.42} opacity={0.6} className="h-72">
  <div className="flex h-full flex-col items-center gap-4 px-6 pt-10 text-center">
    <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Ready when you are</p>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Start free trial <ArrowRightIcon /></Button>
      <Button variant="outline">Talk to sales</Button>
    </div>
  </div>
</WavyBackground>`,
    node: (
      <WavyBackground amplitude={18} coverage={0.42} opacity={0.6} className="h-72">
        <div className="flex h-full flex-col items-center gap-4 px-6 pt-10 text-center">
          <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Ready when you are</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button>Start free trial <ArrowRightIcon /></Button>
            <Button variant="outline">Talk to sales</Button>
          </div>
        </div>
      </WavyBackground>
    ),
  },
]
