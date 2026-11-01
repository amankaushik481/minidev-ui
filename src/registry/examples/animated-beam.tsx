"use client"
import * as React from "react"
import { BanknoteIcon, BookOpenIcon, CreditCardIcon, LandmarkIcon, ReceiptIcon, RefreshCwIcon, ZapIcon } from "lucide-react"
import { AnimatedBeam, Beam } from "@/registry/premium/animated-beam"
import type { Example } from "./types"

function SingleBeamDemo() {
  const box = React.useRef<HTMLDivElement>(null)
  const from = React.useRef<HTMLDivElement>(null)
  const to = React.useRef<HTMLDivElement>(null)
  return (
    <div ref={box} className="relative flex w-full max-w-sm items-center justify-between px-4 py-8">
      <div ref={from} className="relative z-10 grid size-12 place-items-center rounded-2xl border border-border bg-raised text-fg shadow-raised">
        <ReceiptIcon className="size-5" strokeWidth={1.75} />
      </div>
      <div ref={to} className="relative z-10 grid size-12 place-items-center rounded-2xl border border-border bg-ink text-on-ink shadow-ink">
        <LandmarkIcon className="size-5" strokeWidth={1.75} />
      </div>
      <Beam container={box} from={from} to={to} curvature={48} duration={2.5} />
    </div>
  )
}

function TwoWayDemo() {
  const box = React.useRef<HTMLDivElement>(null)
  const ledger = React.useRef<HTMLDivElement>(null)
  const bank = React.useRef<HTMLDivElement>(null)
  return (
    <div ref={box} className="relative flex w-full max-w-sm items-center justify-between px-4 py-10">
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <div ref={ledger} className="grid size-12 place-items-center rounded-2xl border border-border bg-raised text-fg shadow-raised">
          <BookOpenIcon className="size-5" strokeWidth={1.75} />
        </div>
        <span className="text-[11px] text-fg-muted">Lumen ledger</span>
      </div>
      <RefreshCwIcon className="relative z-10 size-4 text-fg-subtle" aria-hidden />
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <div ref={bank} className="grid size-12 place-items-center rounded-2xl border border-border bg-raised text-fg shadow-raised">
          <LandmarkIcon className="size-5" strokeWidth={1.75} />
        </div>
        <span className="text-[11px] text-fg-muted">Bank feed</span>
      </div>
      <Beam container={box} from={ledger} to={bank} curvature={40} duration={3} />
      <Beam container={box} from={ledger} to={bank} curvature={-40} duration={3} delay={1.5} reverse />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom nodes",
    description: "inputs, hub and output each take a lucide icon and a label; the paths are measured from the DOM, so any count of inputs works.",
    code: `<AnimatedBeam
  inputs={[
    { icon: CreditCardIcon, label: "Cards" },
    { icon: BanknoteIcon, label: "Transfers" },
    { icon: ReceiptIcon, label: "Invoices" },
  ]}
  hub={{ icon: ZapIcon, label: "Lumen" }}
  output={{ icon: BookOpenIcon, label: "Ledger" }}
/>`,
    node: (
      <AnimatedBeam
        inputs={[
          { icon: CreditCardIcon, label: "Cards" },
          { icon: BanknoteIcon, label: "Transfers" },
          { icon: ReceiptIcon, label: "Invoices" },
        ]}
        hub={{ icon: ZapIcon, label: "Lumen" }}
        output={{ icon: BookOpenIcon, label: "Ledger" }}
      />
    ),
  },
  {
    title: "Beam primitive",
    description: "Connect any two refs inside a relative container; curvature bends the path upward in pixels and duration sets one pass.",
    code: `function SingleBeamDemo() {
  const box = React.useRef<HTMLDivElement>(null)
  const from = React.useRef<HTMLDivElement>(null)
  const to = React.useRef<HTMLDivElement>(null)
  return (
    <div ref={box} className="relative flex w-full max-w-sm items-center justify-between px-4 py-8">
      <div ref={from} className="relative z-10 grid size-12 place-items-center rounded-2xl border border-border bg-raised text-fg shadow-raised">
        <ReceiptIcon className="size-5" strokeWidth={1.75} />
      </div>
      <div ref={to} className="relative z-10 grid size-12 place-items-center rounded-2xl border border-border bg-ink text-on-ink shadow-ink">
        <LandmarkIcon className="size-5" strokeWidth={1.75} />
      </div>
      <Beam container={box} from={from} to={to} curvature={48} duration={2.5} />
    </div>
  )
}`,
    node: <SingleBeamDemo />,
  },
  {
    title: "Two-way sync",
    description: "Two beams between the same refs with opposite curvature and reverse on one of them read as data flowing both ways.",
    code: `function TwoWayDemo() {
  const box = React.useRef<HTMLDivElement>(null)
  const ledger = React.useRef<HTMLDivElement>(null)
  const bank = React.useRef<HTMLDivElement>(null)
  return (
    <div ref={box} className="relative flex w-full max-w-sm items-center justify-between px-4 py-10">
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <div ref={ledger} className="grid size-12 place-items-center rounded-2xl border border-border bg-raised text-fg shadow-raised">
          <BookOpenIcon className="size-5" strokeWidth={1.75} />
        </div>
        <span className="text-[11px] text-fg-muted">Lumen ledger</span>
      </div>
      <RefreshCwIcon className="relative z-10 size-4 text-fg-subtle" aria-hidden />
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <div ref={bank} className="grid size-12 place-items-center rounded-2xl border border-border bg-raised text-fg shadow-raised">
          <LandmarkIcon className="size-5" strokeWidth={1.75} />
        </div>
        <span className="text-[11px] text-fg-muted">Bank feed</span>
      </div>
      <Beam container={box} from={ledger} to={bank} curvature={40} duration={3} />
      <Beam container={box} from={ledger} to={bank} curvature={-40} duration={3} delay={1.5} reverse />
    </div>
  )
}`,
    node: <TwoWayDemo />,
  },
]
