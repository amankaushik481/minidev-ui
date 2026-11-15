"use client"
import * as React from "react"
import { InviteMembers } from "@/registry/ui/invite-members"
import type { Example } from "./types"

function ControlledDemo() {
  const [pending, setPending] = React.useState(["ines@northwind.com"])
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <InviteMembers
        title="Invite to Northwind"
        description="Invites expire after 7 days."
        pending={pending}
        onInvite={(email) => setPending((p) => [...p, email])}
      />
      <p className="text-xs text-fg-muted tabular-nums">{pending.length} pending</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled pending list",
    description: "With pending set, the card never changes the list itself. Add the email in onInvite once your request succeeds.",
    code: `function ControlledDemo() {
  const [pending, setPending] = React.useState(["ines@northwind.com"])
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <InviteMembers
        title="Invite to Northwind"
        description="Invites expire after 7 days."
        pending={pending}
        onInvite={(email) => setPending((p) => [...p, email])}
      />
      <p className="text-xs text-fg-muted tabular-nums">{pending.length} pending</p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Onboarding step",
    description: "Start with an empty list during onboarding. Try an invalid address or the same one twice to see the errors.",
    code: `<InviteMembers
  className="w-full max-w-md"
  title="Bring your team"
  description="You can skip this and invite people from Settings later."
  defaultPending={[]}
/>`,
    node: (
      <InviteMembers
        className="w-full max-w-md"
        title="Bring your team"
        description="You can skip this and invite people from Settings later."
        defaultPending={[]}
      />
    ),
  },
]
