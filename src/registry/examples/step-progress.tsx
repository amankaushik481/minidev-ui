"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { StepProgress } from "@/registry/ui/step-progress"
import type { Example } from "./types"

const CHECKOUT = ["Cart", "Shipping", "Payment", "Review"]

function Checkout() {
  const [step, setStep] = React.useState(1)
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <StepProgress steps={CHECKOUT} current={step} />
      <p className="text-sm text-fg">Step {step + 1}: {CHECKOUT[step]}</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>
        <Button size="sm" onClick={() => setStep((s) => Math.min(CHECKOUT.length - 1, s + 1))} disabled={step === CHECKOUT.length - 1}>
          Next
        </Button>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Checkout steps",
    description: "Keep current in state and move it with your own Back and Next buttons.",
    code: `const CHECKOUT = ["Cart", "Shipping", "Payment", "Review"]

function Checkout() {
  const [step, setStep] = React.useState(1)
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <StepProgress steps={CHECKOUT} current={step} />
      <p className="text-sm text-fg">Step {step + 1}: {CHECKOUT[step]}</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>
        <Button size="sm" onClick={() => setStep((s) => Math.min(CHECKOUT.length - 1, s + 1))} disabled={step === CHECKOUT.length - 1}>
          Next
        </Button>
      </div>
    </div>
  )
}`,
    node: <Checkout />,
  },
  {
    title: "Finished",
    description: "current equal to the number of steps marks every step done.",
    code: `<StepProgress steps={["Account", "Company", "Bank details"]} current={3} />`,
    node: (
      <StepProgress steps={["Account", "Company", "Bank details"]} current={3} />
    ),
  },
]
