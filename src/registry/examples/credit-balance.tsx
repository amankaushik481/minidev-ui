"use client"
import * as React from "react"
import { CreditBalance } from "@/registry/ui/credit-balance"
import { NumberRoll } from "@/registry/ui/number-roll"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

function SpendDemo() {
  const [credits, setCredits] = React.useState(1240)
  return (
    <div className="flex items-center gap-3">
      <CreditBalance label="AI credits" balance={<NumberRoll value={credits} />} />
      <Button size="sm" variant="outline" disabled={credits < 40} onClick={() => setCredits((c) => c - 40)}>
        Run report (40)
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "In an app header",
    description: "Format the number yourself with a fixed locale, then sit the readout next to the action that tops it up.",
    code: `<div className="flex w-full max-w-lg items-center justify-between rounded-xl border border-border bg-surface px-4 py-2">
  <span className="text-sm font-medium text-fg">Halcyon Studio</span>
  <div className="flex items-center gap-2">
    <CreditBalance label="AI credits" balance={new Intl.NumberFormat("en-US").format(1240)} />
    <Button size="sm">Buy credits</Button>
  </div>
</div>`,
    node: (
      <div className="flex w-full max-w-lg items-center justify-between rounded-xl border border-border bg-surface px-4 py-2">
        <span className="text-sm font-medium text-fg">Halcyon Studio</span>
        <div className="flex items-center gap-2">
          <CreditBalance label="AI credits" balance={new Intl.NumberFormat("en-US").format(1240)} />
          <Button size="sm">Buy credits</Button>
        </div>
      </div>
    ),
  },
  {
    title: "Prepaid wallet",
    description: "Pass a currency string and a label for money balances.",
    code: `const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

<CreditBalance label="Wallet" balance={usd.format(18.4)} />`,
    node: <CreditBalance label="Wallet" balance={usd.format(18.4)} />,
  },
  {
    title: "Rolls when credits are spent",
    description: "balance takes any node, so a NumberRoll animates the change; CreditBalance itself stays static.",
    code: `function SpendDemo() {
  const [credits, setCredits] = React.useState(1240)
  return (
    <div className="flex items-center gap-3">
      <CreditBalance label="AI credits" balance={<NumberRoll value={credits} />} />
      <Button size="sm" variant="outline" disabled={credits < 40} onClick={() => setCredits((c) => c - 40)}>
        Run report (40)
      </Button>
    </div>
  )
}`,
    node: <SpendDemo />,
  },
]
