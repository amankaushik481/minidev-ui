"use client"
import { AccountSetupProgress } from "@/registry/ui/account-setup-progress"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Next step as a link",
    description: "next takes any node, so the next step can be a link straight to that task.",
    code: `<AccountSetupProgress
  className="w-full max-w-sm"
  stepsDone={3}
  stepsTotal={5}
  title="Set up payouts"
  next={<>Next: <a href="#bank" className="font-medium text-fg underline underline-offset-4">verify your bank account</a></>}
/>`,
    node: (
      <AccountSetupProgress
        className="w-full max-w-sm"
        stepsDone={3}
        stepsTotal={5}
        title="Set up payouts"
        next={<>Next: <a href="#bank" className="font-medium text-fg underline underline-offset-4">verify your bank account</a></>}
      />
    ),
  },
  {
    title: "Dashboard banner",
    description: "Next to a resume button at the top of the home page; hide the whole row once stepsDone reaches stepsTotal.",
    code: `<div className="flex w-full max-w-xl flex-wrap items-center gap-3">
  <AccountSetupProgress className="min-w-0 flex-1" stepsDone={1} stepsTotal={4} title="Workspace setup" next="Next: import your customers" />
  <Button size="sm">Continue setup</Button>
</div>`,
    node: (
      <div className="flex w-full max-w-xl flex-wrap items-center gap-3">
        <AccountSetupProgress className="min-w-0 flex-1" stepsDone={1} stepsTotal={4} title="Workspace setup" next="Next: import your customers" />
        <Button size="sm">Continue setup</Button>
      </div>
    ),
  },
]
