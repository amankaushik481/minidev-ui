"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { StepProgress } from "@/registry/ui/step-progress"

/**
 * OnboardingFlow — a first-run setup card: progress, one short question per step (workspace, team, digest), Back/Continue, then Finish.
 *
 * Use right after sign-up to collect the three things the product needs. Steps validate with `required` before
 * moving on. For a long, multi-field form use FormWizard; for an empty screen with one action use EmptyWorkspace.
 *
 * @example
 * <OnboardingFlow onFinish={(v) => api.workspace.create(v)} />
 */
type OnboardingValues = { workspace: string; invites: string; digest: "daily" | "weekly" }

type OnboardingFlowProps = {
  /** Called with the answers when the last step is submitted. */
  onFinish?: (values: OnboardingValues) => void
  className?: string
}

const STEPS = ["Workspace", "Team", "Digest"]

function OnboardingFlow({ onFinish, className }: OnboardingFlowProps) {
  const id = React.useId()
  const [step, setStep] = React.useState(0)
  const [v, setV] = React.useState<OnboardingValues>({ workspace: "", invites: "", digest: "daily" })
  const last = step === STEPS.length - 1
  const heading = React.useRef<HTMLHeadingElement>(null)
  const shown = React.useRef(step)
  React.useEffect(() => {
    // Focus only when the step actually changed, never on mount (StrictMode-safe).
    if (shown.current !== step) heading.current?.focus()
    shown.current = step
  }, [step])
  return (
    <form
      data-slot="onboarding-flow"
      aria-labelledby={`${id}-title`}
      className={cn("mx-auto max-w-lg space-y-6 rounded-2xl border border-border bg-surface p-4 shadow-raised sm:p-6", className)}
      onSubmit={(e) => {
        e.preventDefault()
        if (last) onFinish?.(v)
        else setStep(step + 1)
      }}
    >
      <div>
        <h2 ref={heading} tabIndex={-1} className="text-lg font-medium tracking-[-0.014em] text-fg outline-none">
          <span id={`${id}-title`}>Set up Lumen</span>
          {/* Read when focus lands here after Continue or Back; the form's name stays "Set up Lumen". */}
          <span className="sr-only">
            , step {step + 1} of {STEPS.length}: {STEPS[step]}
          </span>
        </h2>
        <p className="mt-1 text-sm text-fg-muted">Three questions. You can change any of this later.</p>
      </div>
      <StepProgress steps={STEPS} current={step} />
      {step === 0 ? (
        <FormField id={`${id}-ws`} label="Workspace name" description="Usually your company name.">
          <Input id={`${id}-ws`} required autoComplete="organization" placeholder="Northwind Traders" value={v.workspace} onChange={(e) => setV({ ...v, workspace: e.target.value })} />
        </FormField>
      ) : null}
      {step === 1 ? (
        <FormField id={`${id}-team`} label="Invite teammates" description="Comma-separated emails. Optional.">
          <Input id={`${id}-team`} type="email" multiple placeholder="priya@northwind.com, tom@northwind.com" value={v.invites} onChange={(e) => setV({ ...v, invites: e.target.value })} />
        </FormField>
      ) : null}
      {step === 2 ? (
        <div className="space-y-2">
          <p aria-hidden className="text-sm font-medium text-fg">
            How often should Lumen send the digest?
          </p>
          <SegmentedControl
            aria-label="How often should Lumen send the digest?"
            value={v.digest}
            onChange={(d) => setV({ ...v, digest: d as OnboardingValues["digest"] })}
            options={[
              { value: "daily", label: "Every morning" },
              { value: "weekly", label: "Mondays" },
            ]}
          />
        </div>
      ) : null}
      <div className="flex justify-between gap-2">
        <Button type="button" variant="outline" size="sm" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          Back
        </Button>
        <Button type="submit" size="sm">
          {last ? "Finish" : "Continue"}
        </Button>
      </div>
    </form>
  )
}

export { OnboardingFlow }
export type { OnboardingFlowProps, OnboardingValues }
