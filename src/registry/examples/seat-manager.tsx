"use client"
import * as React from "react"
import { SeatManager, type Seat } from "@/registry/ui/seat-manager"
import type { Example } from "./types"

const INVITES: Seat[] = [
  { name: "Ines Duarte", email: "ines@halcyon.studio", role: "Member" },
  { name: "Ravi Menon", email: "ravi@halcyon.studio", role: "Member" },
]

function InviteDemo() {
  const [seats, setSeats] = React.useState<Seat[]>([
    { name: "Maya Chen", email: "maya@halcyon.studio", role: "Owner" },
    { name: "Theo Okafor", email: "theo@halcyon.studio", role: "Admin" },
  ])
  return (
    <SeatManager
      className="w-full max-w-sm"
      seats={seats}
      limit={4}
      onInvite={() => setSeats((s) => [...s, INVITES[s.length - 2]])}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Invite until the plan is full",
    description: "The count comes from seats and limit, and Invite disables itself once the last seat is taken.",
    code: `const INVITES: Seat[] = [
  { name: "Ines Duarte", email: "ines@halcyon.studio", role: "Member" },
  { name: "Ravi Menon", email: "ravi@halcyon.studio", role: "Member" },
]

function InviteDemo() {
  const [seats, setSeats] = React.useState<Seat[]>([
    { name: "Maya Chen", email: "maya@halcyon.studio", role: "Owner" },
    { name: "Theo Okafor", email: "theo@halcyon.studio", role: "Admin" },
  ])
  return (
    <SeatManager
      className="w-full max-w-sm"
      seats={seats}
      limit={4}
      onInvite={() => setSeats((s) => [...s, INVITES[s.length - 2]])}
    />
  )
}`,
    node: <InviteDemo />,
  },
  {
    title: "Full plan with an explanation",
    description: "A disabled button does not say why, so add a line that tells people how to get more seats.",
    code: `<div className="flex w-full max-w-sm flex-col gap-2">
  <SeatManager
    limit={2}
    seats={[
      { name: "Lee Park", email: "lee@northwind.dev", role: "Owner" },
      { name: "Sam Lowe", email: "sam@northwind.dev", role: "Member" },
    ]}
  />
  <p className="text-xs text-fg-muted">Both seats on Starter are used. Upgrade to Pro for up to 10.</p>
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <SeatManager
          limit={2}
          seats={[
            { name: "Lee Park", email: "lee@northwind.dev", role: "Owner" },
            { name: "Sam Lowe", email: "sam@northwind.dev", role: "Member" },
          ]}
        />
        <p className="text-xs text-fg-muted">Both seats on Starter are used. Upgrade to Pro for up to 10.</p>
      </div>
    ),
  },
]
