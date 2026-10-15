"use client"
import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { NumberRoll } from "@/registry/ui/number-roll"
import type { Example } from "./types"

function BalanceDemo() {
  const [balance, setBalance] = React.useState(12840)
  return (
    <div className="flex flex-col items-center gap-4">
      <NumberRoll
        value={balance}
        trend
        format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        className="text-4xl font-medium tracking-[-0.03em]"
      />
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setBalance((b) => b - 1840)}>
          <MinusIcon /> Refund $1,840
        </Button>
        <Button variant="outline" size="sm" onClick={() => setBalance((b) => b + 2415)}>
          <PlusIcon /> Payment $2,415
        </Button>
      </div>
    </div>
  )
}

function SeatCounter() {
  const [seats, setSeats] = React.useState(12)
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-raised">
      <div className="flex-1">
        <p className="text-sm font-medium text-fg">Seats</p>
        <p className="text-xs text-fg-muted">$24 per seat per month</p>
      </div>
      <Button variant="outline" size="icon-sm" aria-label="Remove seat" onClick={() => setSeats((s) => Math.max(1, s - 1))}>
        <MinusIcon />
      </Button>
      <NumberRoll value={seats} className="w-8 justify-center text-lg font-medium" />
      <Button variant="outline" size="icon-sm" aria-label="Add seat" onClick={() => setSeats((s) => s + 1)}>
        <PlusIcon />
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Formats",
    description: "format takes Intl.NumberFormat options, so currency, percent and compact notation all work.",
    code: `<NumberRoll value={49200} format={{ style: "currency", currency: "USD" }} className="text-2xl font-medium" />
<NumberRoll value={0.184} format={{ style: "percent", maximumFractionDigits: 1 }} className="text-2xl font-medium" />
<NumberRoll value={1284000} format={{ notation: "compact" }} className="text-2xl font-medium" />`,
    node: (
      <div className="flex flex-wrap items-baseline justify-center gap-8">
        <NumberRoll value={49200} format={{ style: "currency", currency: "USD" }} className="text-2xl font-medium" />
        <NumberRoll value={0.184} format={{ style: "percent", maximumFractionDigits: 1 }} className="text-2xl font-medium" />
        <NumberRoll value={1284000} format={{ notation: "compact" }} className="text-2xl font-medium" />
      </div>
    ),
  },
  {
    title: "Controlled with trend",
    description: "Change the value from state; with trend on, the figure flashes green or red for a moment.",
    code: `function BalanceDemo() {
  const [balance, setBalance] = React.useState(12840)
  return (
    <div className="flex flex-col items-center gap-4">
      <NumberRoll
        value={balance}
        trend
        format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        className="text-4xl font-medium tracking-[-0.03em]"
      />
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setBalance((b) => b - 1840)}>
          <MinusIcon /> Refund $1,840
        </Button>
        <Button variant="outline" size="sm" onClick={() => setBalance((b) => b + 2415)}>
          <PlusIcon /> Payment $2,415
        </Button>
      </div>
    </div>
  )
}`,
    node: <BalanceDemo />,
  },
  {
    title: "Stepper",
    description: "Small integers roll one digit at a time; fix the width so the buttons do not move.",
    code: `function SeatCounter() {
  const [seats, setSeats] = React.useState(12)
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-raised">
      <div className="flex-1">
        <p className="text-sm font-medium text-fg">Seats</p>
        <p className="text-xs text-fg-muted">$24 per seat per month</p>
      </div>
      <Button variant="outline" size="icon-sm" aria-label="Remove seat" onClick={() => setSeats((s) => Math.max(1, s - 1))}>
        <MinusIcon />
      </Button>
      <NumberRoll value={seats} className="w-8 justify-center text-lg font-medium" />
      <Button variant="outline" size="icon-sm" aria-label="Add seat" onClick={() => setSeats((s) => s + 1)}>
        <PlusIcon />
      </Button>
    </div>
  )
}`,
    node: <SeatCounter />,
  },
  {
    title: "Locale",
    description: "locale changes the digit grouping and decimal separator along with the currency symbol.",
    code: `<NumberRoll value={49200.5} locale="de-DE" format={{ style: "currency", currency: "EUR" }} className="text-2xl font-medium" />
<NumberRoll value={49200.5} locale="en-IN" format={{ style: "currency", currency: "INR" }} className="text-2xl font-medium" />`,
    node: (
      <div className="flex flex-wrap items-baseline justify-center gap-8">
        <NumberRoll value={49200.5} locale="de-DE" format={{ style: "currency", currency: "EUR" }} className="text-2xl font-medium" />
        <NumberRoll value={49200.5} locale="en-IN" format={{ style: "currency", currency: "INR" }} className="text-2xl font-medium" />
      </div>
    ),
  },
]
