"use client"
import * as React from "react"
import { Stepper } from "@/registry/ui/stepper"
import { Button } from "@/registry/ui/button"
import { WorkspaceCreate } from "@/registry/ui/workspace-create"
import { InviteMembers } from "@/registry/ui/invite-members"
import { cn } from "@/lib/utils"
function OnboardingWizard({ className }: { className?: string }) {
  const [step, setStep] = React.useState(0)
  return (
    <div data-slot="onboarding-wizard" className={cn("space-y-6", className)}>
      <Stepper steps={["Workspace", "Invite", "Done"]} current={step} />
      {step === 0 ? <WorkspaceCreate onCreate={() => setStep(1)} /> : null}
      {step === 1 ? (
        <div className="space-y-3">
          <InviteMembers />
          <Button onClick={() => setStep(2)}>Continue</Button>
        </div>
      ) : null}
      {step === 2 ? <p className="text-sm text-fg">You are all set.</p> : null}
    </div>
  )
}
export { OnboardingWizard }
