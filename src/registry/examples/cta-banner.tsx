"use client"
import * as React from "react"
import { CtaBanner } from "@/registry/ui/cta-banner"
import type { Example } from "./types"

function DemoRequestBanner() {
  const [requested, setRequested] = React.useState(false)
  return (
    <CtaBanner
      className="w-full"
      title={requested ? "Thanks, we will email you a time" : "Want a walkthrough?"}
      description="A 20 minute call with someone from the Lumen team, on your own data."
      action={requested ? undefined : { label: "Book a demo", onClick: () => setRequested(true) }}
    />
  )
}

export const examples: Example[] = [
  {
    title: "End of a pricing page",
    description: "action.href renders the button as a link; keep one clear ask.",
    code: `<CtaBanner
  className="w-full"
  title="Still comparing plans?"
  description="Start on Starter for free and upgrade when your team grows."
  action={{ label: "Start free", href: "#" }}
/>`,
    node: (
      <CtaBanner
        className="w-full"
        title="Still comparing plans?"
        description="Start on Starter for free and upgrade when your team grows."
        action={{ label: "Start free", href: "#" }}
      />
    ),
  },
  {
    title: "In-page action",
    description: "Without href the action is a button that calls onClick, for opening a form or dialog on the same page.",
    code: `function DemoRequestBanner() {
  const [requested, setRequested] = React.useState(false)
  return (
    <CtaBanner
      className="w-full"
      title={requested ? "Thanks, we will email you a time" : "Want a walkthrough?"}
      description="A 20 minute call with someone from the Lumen team, on your own data."
      action={requested ? undefined : { label: "Book a demo", onClick: () => setRequested(true) }}
    />
  )
}`,
    node: <DemoRequestBanner />,
  },
]
