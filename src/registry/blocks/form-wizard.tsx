"use client"
import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { DescriptionList } from "@/registry/ui/description-list"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Stepper } from "@/registry/ui/stepper"

/**
 * FormWizard — a multi-step form: a stepper, one group of fields per step, Back/Next, a review step and a done state.
 *
 * Use when a form is long enough to split (connect a data source, create an account). Each step validates with the
 * browser's own `required` checks before moving on, and focus moves to the new step's heading so screen readers hear
 * where they are. For a first-run checklist with progress use OnboardingFlow; for one short form use FormField.
 *
 * @example
 * <FormWizard onComplete={(v) => api.sources.create(v)} />
 */
type FormWizardValues = { name: string; host: string; key: string }

type FormWizardProps = {
  /** Called with every field's value when the review step is submitted. */
  onComplete?: (values: FormWizardValues) => void
  className?: string
}

const STEPS = ["Source", "Credentials", "Review"]

function FormWizard({ onComplete, className }: FormWizardProps) {
  const id = React.useId()
  const [step, setStep] = React.useState(0)
  const [done, setDone] = React.useState(false)
  const [values, setValues] = React.useState<FormWizardValues>({ name: "Production Postgres", host: "", key: "" })
  const heading = React.useRef<HTMLHeadingElement>(null)
  const shown = React.useRef(`${step}-${done}`)
  React.useEffect(() => {
    // Focus only when the step actually changed, never on mount (StrictMode-safe).
    const key = `${step}-${done}`
    if (shown.current !== key) heading.current?.focus()
    shown.current = key
  }, [step, done])
  const set = (k: keyof FormWizardValues) => (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [k]: e.target.value }))

  if (done)
    return (
      <div data-slot="form-wizard" className={cn("mx-auto max-w-md space-y-3 text-center", className)}>
        <span className="mx-auto grid size-10 place-items-center rounded-full bg-success text-on-accent">
          <CheckIcon aria-hidden className="size-5" />
        </span>
        <h2 ref={heading} tabIndex={-1} className="text-lg font-medium text-fg outline-none">
          {values.name} is connected
        </h2>
        <p className="text-sm text-fg-muted">Lumen is reading your tables now. Baselines are ready tomorrow morning.</p>
      </div>
    )

  return (
    <form
      data-slot="form-wizard"
      aria-labelledby={`${id}-title`}
      className={cn("mx-auto max-w-md space-y-6", className)}
      onSubmit={(e) => {
        e.preventDefault()
        if (step < STEPS.length - 1) return setStep(step + 1)
        onComplete?.(values)
        setDone(true)
      }}
    >
      <Stepper steps={STEPS} current={step} />
      <h2 id={`${id}-title`} ref={heading} tabIndex={-1} className="text-lg font-medium text-fg outline-none">
        <span className="sr-only">
          Step {step + 1} of {STEPS.length}:{" "}
        </span>
        {["Name the source", "Read-only access", "Check and connect"][step]}
      </h2>
      {step === 0 ? (
        <FormField id={`${id}-name`} label="Source name" description="Shown in reports and alerts.">
          <Input id={`${id}-name`} required value={values.name} onChange={set("name")} />
        </FormField>
      ) : null}
      {step === 1 ? (
        <div className="space-y-4">
          <FormField id={`${id}-host`} label="Host">
            <Input id={`${id}-host`} required placeholder="db.northwind.internal:5432" autoComplete="off" value={values.host} onChange={set("host")} />
          </FormField>
          <FormField id={`${id}-key`} label="Read-only password" description="We encrypt it at rest and never write to your database.">
            <Input id={`${id}-key`} type="password" required autoComplete="new-password" value={values.key} onChange={set("key")} />
          </FormField>
        </div>
      ) : null}
      {step === 2 ? (
        <DescriptionList
          items={[
            { label: "Source", value: values.name },
            { label: "Host", value: <span className="font-mono text-xs">{values.host}</span> },
            { label: "Password", value: "••••••••" },
          ]}
        />
      ) : null}
      <div className="flex justify-between gap-2">
        <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          Back
        </Button>
        <Button type="submit">{step === STEPS.length - 1 ? "Connect" : "Next"}</Button>
      </div>
    </form>
  )
}

export { FormWizard }
export type { FormWizardProps, FormWizardValues }
