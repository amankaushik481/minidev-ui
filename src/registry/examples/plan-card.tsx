"use client"
import * as React from "react"
import { PlanCard } from "@/registry/ui/plan-card"
import type { Example } from "./types"

function ChooseDemo() {
  const [chosen, setChosen] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-3">
      <PlanCard
        name="Business"
        price="$1,490"
        period="yr"
        features={["Everything in Pro", "Unlimited seats", "SSO and audit log", "Dedicated manager"]}
        cta={chosen ? "Selected" : "Choose Business"}
        highlighted={chosen === "Business"}
        onCta={() => setChosen("Business")}
        className="w-72"
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{chosen ? `${chosen} selected, billed yearly.` : "Nothing selected yet."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Highlighted beside a plain tier",
    description: "highlighted swaps the outline button for the solid one and adds the accent ring; give cards a width so they line up.",
    code: `<PlanCard name="Starter" price="$0" features={["5 invoices a month", "1 seat", "Email support"]} cta="Start free" className="w-64" />
<PlanCard highlighted className="w-64" />`,
    node: (
      <div className="flex flex-wrap items-stretch justify-center gap-4">
        <PlanCard name="Starter" price="$0" features={["5 invoices a month", "1 seat", "Email support"]} cta="Start free" className="w-64" />
        <PlanCard highlighted className="w-64" />
      </div>
    ),
  },
  {
    title: "Yearly price with a handler",
    description: "period changes the suffix after the price and onCta runs when the button is pressed, here marking the card as the chosen one.",
    code: `function ChooseDemo() {
  const [chosen, setChosen] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-3">
      <PlanCard
        name="Business"
        price="$1,490"
        period="yr"
        features={["Everything in Pro", "Unlimited seats", "SSO and audit log", "Dedicated manager"]}
        cta={chosen ? "Selected" : "Choose Business"}
        highlighted={chosen === "Business"}
        onCta={() => setChosen("Business")}
        className="w-72"
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{chosen ? \`\${chosen} selected, billed yearly.\` : "Nothing selected yet."}</p>
    </div>
  )
}`,
    node: <ChooseDemo />,
  },
]
