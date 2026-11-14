"use client"
import * as React from "react"
import { Stepper } from "@/registry/ui/stepper"
import { Button } from "@/registry/ui/button"
import { WorkspaceCreate } from "@/registry/ui/workspace-create"
import { InviteMembers } from "@/registry/ui/invite-members"
import { cn } from "@/lib/utils"

/**
 * OnboardingWizard — a three-step first-run flow: create a workspace, invite members, done.
 *
 * A Stepper shows progress; when the step changes, focus moves to the new step so
 * keyboard and screen reader users land on the fresh content. Use it as a starting
 * point for a linear setup flow; for optional tasks in any order use OnboardingChecklist.
 *
 * @example
 * <OnboardingWizard onComplete={() => router.push("/dashboard")} />
 */
type OnboardingWizardProps = {
  /** Called when the user reaches the final step. */
  onComplete?: () => void
  className?: string
}

const STEPS = ["Workspace", "Invite", "Done"]

function OnboardingWizard({ onComplete, className }: OnboardingWizardProps) {
  const [step, setStep] = React.useState(0)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const go = (next: number) => {
    setStep(next)
    if (next === STEPS.length - 1) onComplete?.()
    requestAnimationFrame(() => panelRef.current?.focus())
  }
  return (
    <div data-slot="onboarding-wizard" className={cn("space-y-6", className)}>
      <Stepper steps={STEPS} current={step} />
      <div ref={panelRef} tabIndex={-1} role="group" aria-label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`} className="rounded-lg outline-none">
        {step === 0 ? <WorkspaceCreate onCreate={() => go(1)} /> : null}
        {step === 1 ? (
          <div className="space-y-3">
            <InviteMembers />
            <Button onClick={() => go(2)}>Continue</Button>
          </div>
        ) : null}
        {step === 2 ? <p className="text-sm text-fg">You are all set.</p> : null}
      </div>
    </div>
  )
}
export { OnboardingWizard }
export type { OnboardingWizardProps }
