"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { StepProgress } from "@/registry/ui/step-progress"

const STEPS = ["Workspace", "Team", "Theme"]

function OnboardingFlow() {
  const [step, setStep] = React.useState(0)
  return (
    <div data-slot="onboarding-flow" className="mx-auto max-w-lg space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]">
      <div>
        <h3 className="text-lg font-medium tracking-[-0.014em] text-fg">Set up MiniDev</h3>
        <p className="mt-1 text-sm text-fg-muted">Three steps. Keep Hairline defaults or swap tokens later.</p>
      </div>
      <StepProgress steps={STEPS} current={step} />
      {step === 0 && (
        <div className="space-y-3">
          <label className="block text-sm text-fg">Workspace name
            <Input className="mt-1.5" placeholder="Acme Design" />
          </label>
        </div>
      )}
      {step === 1 && (
        <div className="space-y-3">
          <label className="block text-sm text-fg">Invite emails
            <Input className="mt-1.5" placeholder="you@team.com, design@team.com" />
          </label>
        </div>
      )}
      {step === 2 && (
        <div className="rounded-xl border border-border bg-sunken p-4 text-sm text-fg-muted">
          Accent hue 285 · Geist Sans · Hairline depth. You can tune later in DESIGN.md.
        </div>
      )}
      <div className="flex justify-between gap-2">
        <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
        <Button size="sm" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>
          {step === STEPS.length - 1 ? "Finish" : "Continue"}
        </Button>
      </div>
    </div>
  )
}
export { OnboardingFlow }
