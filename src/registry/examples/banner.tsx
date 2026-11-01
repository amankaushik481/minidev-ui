"use client"
import * as React from "react"
import { Banner } from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function TrialDemo() {
  const [shown, setShown] = React.useState(true)
  if (!shown) {
    return <Button variant="outline" size="sm" onClick={() => setShown(true)}>Show the banner again</Button>
  }
  return (
    <Banner
      tone="warning"
      className="w-full max-w-2xl rounded-lg"
      action={<Button size="sm">Add payment method</Button>}
      onDismiss={() => setShown(false)}
    >
      Your trial ends in 3 days. Add a card to keep sending invoices from the Northwind workspace.
    </Banner>
  )
}

export const examples: Example[] = [
  {
    title: "Tones",
    description: "accent informs, warning asks for attention soon and danger means something is already broken; the text colour stays the same.",
    code: `<Banner className="w-full rounded-lg">Lumen 2.4 adds scheduled payouts. Turn them on under Settings, Payouts.</Banner>
<Banner tone="warning" className="w-full rounded-lg">Your card ending 4242 expires this month.</Banner>
<Banner tone="danger" className="w-full rounded-lg">Payment for INV-2041 failed. Northwind has been notified.</Banner>`,
    node: (
      <div className="flex w-full max-w-2xl flex-col gap-3">
        <Banner className="w-full rounded-lg">Lumen 2.4 adds scheduled payouts. Turn them on under Settings, Payouts.</Banner>
        <Banner tone="warning" className="w-full rounded-lg">Your card ending 4242 expires this month.</Banner>
        <Banner tone="danger" className="w-full rounded-lg">Payment for INV-2041 failed. Northwind has been notified.</Banner>
      </div>
    ),
  },
  {
    title: "With action and dismiss",
    description: "action takes any node, usually one button, and onDismiss adds the close control; hide the banner yourself when it fires.",
    code: `function TrialDemo() {
  const [shown, setShown] = React.useState(true)
  if (!shown) {
    return <Button variant="outline" size="sm" onClick={() => setShown(true)}>Show the banner again</Button>
  }
  return (
    <Banner
      tone="warning"
      className="w-full max-w-2xl rounded-lg"
      action={<Button size="sm">Add payment method</Button>}
      onDismiss={() => setShown(false)}
    >
      Your trial ends in 3 days. Add a card to keep sending invoices from the Northwind workspace.
    </Banner>
  )
}`,
    node: <TrialDemo />,
  },
]
