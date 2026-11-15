"use client"
import * as React from "react"
import { CalendarIcon, GitBranchIcon, MessageSquareIcon } from "lucide-react"
import { ConnectedAccount } from "@/registry/ui/connected-account"
import type { Example } from "./types"

function ToggleDemo() {
  const [linked, setLinked] = React.useState(true)
  return (
    <ConnectedAccount
      className="w-full max-w-md"
      provider="Codehaven"
      account={linked ? "@maya-chen" : "Not connected"}
      icon={<GitBranchIcon />}
      actionLabel={linked ? "Disconnect" : "Reconnect"}
      onDisconnect={() => setLinked((l) => !l)}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Connected accounts list",
    description: "One row per provider under a heading. The icon is decorative; the provider name is always written out.",
    code: `<section aria-labelledby="linked" className="flex w-full max-w-md flex-col gap-2">
  <h3 id="linked" className="text-sm font-medium text-fg">Connected accounts</h3>
  <ConnectedAccount provider="Codehaven" account="@maya-chen" icon={<GitBranchIcon />} />
  <ConnectedAccount provider="Relay Chat" account="maya@northwind.com" icon={<MessageSquareIcon />} />
  <ConnectedAccount provider="Meridian Calendar" account="maya.chen@northwind.com" icon={<CalendarIcon />} />
</section>`,
    node: (
      <section aria-labelledby="linked" className="flex w-full max-w-md flex-col gap-2">
        <h3 id="linked" className="text-sm font-medium text-fg">Connected accounts</h3>
        <ConnectedAccount provider="Codehaven" account="@maya-chen" icon={<GitBranchIcon />} />
        <ConnectedAccount provider="Relay Chat" account="maya@northwind.com" icon={<MessageSquareIcon />} />
        <ConnectedAccount provider="Meridian Calendar" account="maya.chen@northwind.com" icon={<CalendarIcon />} />
      </section>
    ),
  },
  {
    title: "Disconnect and reconnect",
    description: "actionLabel changes the visible text and the accessible name, so the same row can offer Reconnect after unlinking.",
    code: `function ToggleDemo() {
  const [linked, setLinked] = React.useState(true)
  return (
    <ConnectedAccount
      className="w-full max-w-md"
      provider="Codehaven"
      account={linked ? "@maya-chen" : "Not connected"}
      icon={<GitBranchIcon />}
      actionLabel={linked ? "Disconnect" : "Reconnect"}
      onDisconnect={() => setLinked((l) => !l)}
    />
  )
}`,
    node: <ToggleDemo />,
  },
]
