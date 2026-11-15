"use client"
import * as React from "react"
import { ProductTour, type TourStep } from "@/registry/premium/product-tour"
import type { Example } from "./types"

const STEPS: TourStep[] = [
  { title: "Import your customers", body: "Upload a CSV or connect your payment provider. Duplicates are merged by email." },
  { title: "Set payment terms", body: "Net 15, Net 30 or a custom rule per customer. Lumen dates every invoice for you." },
  { title: "Turn on reminders", body: "Pick the tone and timing once. Reminders stop the moment an invoice is paid." },
]

function TrackedTour() {
  const [seen, setSeen] = React.useState(0)
  const [done, setDone] = React.useState(false)
  return (
    <div className="w-full space-y-2">
      <ProductTour steps={STEPS} onStepChange={(i) => setSeen((s) => Math.max(s, i))} onFinish={() => setDone(true)} />
      <p aria-live="polite" className="text-xs text-fg-muted tabular-nums">
        {done ? "Tour finished." : `Furthest step viewed: ${seen + 1} of ${STEPS.length}`}
      </p>
    </div>
  )
}

function Mock({ rows }: { rows: [string, string][] }) {
  return (
    <ul className="space-y-1.5">
      {rows.map(([a, b]) => (
        <li key={a} className="flex justify-between rounded-lg border border-border bg-surface px-3 py-2 text-xs">
          <span className="text-fg">{a}</span>
          <span className="text-fg-muted tabular-nums">{b}</span>
        </li>
      ))}
    </ul>
  )
}

export const examples: Example[] = [
  {
    title: "Track how far visitors get",
    description: "The tour keeps its own step; onStepChange reports each move and onFinish fires on Done, which is enough for analytics or a resume prompt.",
    code: `function TrackedTour() {
  const [seen, setSeen] = React.useState(0)
  const [done, setDone] = React.useState(false)
  return (
    <div className="w-full space-y-2">
      <ProductTour steps={STEPS} onStepChange={(i) => setSeen((s) => Math.max(s, i))} onFinish={() => setDone(true)} />
      <p aria-live="polite" className="text-xs text-fg-muted tabular-nums">
        {done ? "Tour finished." : \`Furthest step viewed: \${seen + 1} of \${STEPS.length}\`}
      </p>
    </div>
  )
}`,
    node: <TrackedTour />,
  },
  {
    title: "A visual per step",
    description: "Each step's media renders on the stage under its text; a small mock of the real screen works as well as a screenshot.",
    code: `<ProductTour
  className="w-full"
  steps={[
    {
      title: "Review the matches",
      body: "Bank lines are paired with invoices by amount and reference.",
      media: <Mock rows={[["INV-2041 · Northwind", "$4,200.00"], ["INV-2043 · Halcyon", "$1,180.00"]]} />,
    },
    {
      title: "Approve the exceptions",
      body: "Anything that did not match waits for one click.",
      media: <Mock rows={[["Unmatched deposit", "$312.50"], ["Partial payment · Fathom", "$900.00"]]} />,
    },
  ]}
/>`,
    node: (
      <ProductTour
        className="w-full"
        steps={[
          {
            title: "Review the matches",
            body: "Bank lines are paired with invoices by amount and reference.",
            media: <Mock rows={[["INV-2041 · Northwind", "$4,200.00"], ["INV-2043 · Halcyon", "$1,180.00"]]} />,
          },
          {
            title: "Approve the exceptions",
            body: "Anything that did not match waits for one click.",
            media: <Mock rows={[["Unmatched deposit", "$312.50"], ["Partial payment · Fathom", "$900.00"]]} />,
          },
        ]}
      />
    ),
  },
]
