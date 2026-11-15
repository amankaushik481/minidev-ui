"use client"
import * as React from "react"
import { SplitFlap } from "@/registry/ui/split-flap"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const STATUSES = [
  { value: "ON TIME", tone: "success" },
  { value: "DELAYED", tone: "warning" },
  { value: "BOARDING", tone: "accent" },
] as const

function DepartureStatus() {
  const [i, setI] = React.useState(0)
  const s = STATUSES[i]
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <SplitFlap value="GATE B12" length={8} size="sm" />
        <SplitFlap value={s.value} length={8} size="sm" tone={s.tone} />
      </div>
      <Button variant="outline" size="sm" onClick={() => setI((n) => (n + 1) % STATUSES.length)}>
        Next status
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Status that changes",
    description: "Change value and each cell flips forward from its current letter; a fixed length keeps the board width steady.",
    code: `const STATUSES = [
  { value: "ON TIME", tone: "success" },
  { value: "DELAYED", tone: "warning" },
  { value: "BOARDING", tone: "accent" },
] as const

function DepartureStatus() {
  const [i, setI] = React.useState(0)
  const s = STATUSES[i]
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <SplitFlap value="GATE B12" length={8} size="sm" />
        <SplitFlap value={s.value} length={8} size="sm" tone={s.tone} />
      </div>
      <Button variant="outline" size="sm" onClick={() => setI((n) => (n + 1) % STATUSES.length)}>
        Next status
      </Button>
    </div>
  )
}`,
    node: <DepartureStatus />,
  },
  {
    title: "Launch headline",
    description: "A large board for one moment on a launch page; speed and stagger set how fast the ripple crosses the row.",
    code: `<SplitFlap value="LUMEN 3.0 IS LIVE" size="lg" tone="accent" speed={50} stagger={40} />`,
    node: <SplitFlap value="LUMEN 3.0 IS LIVE" size="lg" tone="accent" speed={50} stagger={40} />,
  },
]
