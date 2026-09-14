"use client"
import * as React from "react"
import { Stepper } from "@/registry/ui/stepper"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
function FormWizard() {
  const [step, setStep] = React.useState(0)
  return (
    <div data-slot="form-wizard" className="mx-auto max-w-md space-y-6">
      <Stepper steps={["Basics", "Details", "Review"]} current={step} />
      {step === 0 ? (
        <FormField id="fw-name" label="Name">
          <Input id="fw-name" />
        </FormField>
      ) : null}
      {step === 1 ? (
        <FormField id="fw-url" label="URL">
          <Input id="fw-url" />
        </FormField>
      ) : null}
      {step === 2 ? <p className="text-sm text-fg-muted">Ready to submit.</p> : null}
      <div className="flex gap-2">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Back
        </Button>
        <Button onClick={() => setStep((s) => Math.min(2, s + 1))}>{step === 2 ? "Submit" : "Next"}</Button>
      </div>
    </div>
  )
}
export { FormWizard }
