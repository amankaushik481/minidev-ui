"use client"
import * as React from "react"
import { CalendarIcon, GitBranchIcon, MessageSquareIcon } from "lucide-react"
import { IntegrationCard } from "@/registry/ui/integration-card"
import type { Example } from "./types"

function ConnectDemo() {
  const [connected, setConnected] = React.useState(false)
  return (
    <IntegrationCard
      className="w-full max-w-xs"
      name="Relay Chat"
      description="Post a message to a channel when an invoice is paid or overdue."
      icon={<MessageSquareIcon />}
      connected={connected}
      onConnect={() => setConnected(true)}
      onManage={() => setConnected(false)}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Integrations directory",
    description: "Lay the cards out in a responsive grid. Connected cards show a badge and a Manage button.",
    code: `<div className="grid w-full max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
  <IntegrationCard name="Codehaven" description="Link commits and pull requests to invoices." icon={<GitBranchIcon />} connected />
  <IntegrationCard name="Relay Chat" description="Post a message when an invoice is paid." icon={<MessageSquareIcon />} />
  <IntegrationCard name="Meridian Calendar" description="Add due dates to the finance team's calendar." icon={<CalendarIcon />} />
</div>`,
    node: (
      <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <IntegrationCard name="Codehaven" description="Link commits and pull requests to invoices." icon={<GitBranchIcon />} connected />
        <IntegrationCard name="Relay Chat" description="Post a message when an invoice is paid." icon={<MessageSquareIcon />} />
        <IntegrationCard name="Meridian Calendar" description="Add due dates to the finance team's calendar." icon={<CalendarIcon />} />
      </div>
    ),
  },
  {
    title: "Connect and manage",
    description: "Flip connected once your OAuth flow succeeds; the badge and the button follow. Here Manage disconnects to reset the demo.",
    code: `function ConnectDemo() {
  const [connected, setConnected] = React.useState(false)
  return (
    <IntegrationCard
      className="w-full max-w-xs"
      name="Relay Chat"
      description="Post a message to a channel when an invoice is paid or overdue."
      icon={<MessageSquareIcon />}
      connected={connected}
      onConnect={() => setConnected(true)}
      onManage={() => setConnected(false)}
    />
  )
}`,
    node: <ConnectDemo />,
  },
]
