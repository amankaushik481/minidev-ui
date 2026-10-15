"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Stepper } from "@/registry/ui/stepper"
import type { Example } from "./types"

function ControlledDemo() {
  const steps = ["Details", "Members", "Billing", "Review"]
  const [current, setCurrent] = React.useState(1)
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Stepper steps={steps} current={current} />
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>Back</Button>
        <Button size="sm" disabled={current === steps.length - 1} onClick={() => setCurrent((c) => c + 1)}>Next</Button>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled progress",
    description: "current is a zero based index; move it from Back and Next buttons or from the form's submit handler.",
    code: `function ControlledDemo() {
  const steps = ["Details", "Members", "Billing", "Review"]
  const [current, setCurrent] = React.useState(1)
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Stepper steps={steps} current={current} />
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>Back</Button>
        <Button size="sm" disabled={current === steps.length - 1} onClick={() => setCurrent((c) => c + 1)}>Next</Button>
      </div>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Custom steps",
    description: "Steps are plain labels; each one gets an equal share of the width, so keep the names short.",
    code: `<Stepper steps={["Upload", "Map columns", "Validate", "Import"]} current={2} className="max-w-md" />`,
    node: <Stepper steps={["Upload", "Map columns", "Validate", "Import"]} current={2} className="max-w-md" />,
  },
  {
    title: "All steps done",
    description: "Set current past the last index once the flow is complete and every bar fills in.",
    code: `<Stepper steps={["Details", "Members", "Billing"]} current={3} className="max-w-sm" />`,
    node: <Stepper steps={["Details", "Members", "Billing"]} current={3} className="max-w-sm" />,
  },
]
