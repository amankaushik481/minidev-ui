"use client"
import * as React from "react"
import { ReactionBar } from "@/registry/ui/reaction-bar"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import type { Example } from "./types"

function ControlledDemo() {
  const [reactions, setReactions] = React.useState([
    { emoji: "🚀", count: 8, active: true },
    { emoji: "👍", count: 3 },
    { emoji: "🙏", count: 1 },
  ])
  const toggle = (emoji: string) =>
    setReactions((list) =>
      list.map((r) => (r.emoji === emoji ? { ...r, active: !r.active, count: r.count + (r.active ? -1 : 1) } : r))
    )
  const mine = reactions.filter((r) => r.active).map((r) => r.emoji)
  return (
    <div className="flex flex-col items-start gap-3">
      <ReactionBar reactions={reactions} onToggle={toggle} />
      <p className="text-xs text-fg-muted">You reacted with {mine.length ? mine.join(" ") : "nothing yet"}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom reactions",
    description: "Pass reactions with counts and mark the ones the viewer already pressed with active; without onToggle the bar updates its own counts.",
    code: `<ReactionBar
  reactions={[
    { emoji: "✅", count: 4, active: true },
    { emoji: "👀", count: 2 },
    { emoji: "💬", count: 1 },
  ]}
/>`,
    node: (
      <ReactionBar
        reactions={[
          { emoji: "✅", count: 4, active: true },
          { emoji: "👀", count: 2 },
          { emoji: "💬", count: 1 },
        ]}
      />
    ),
  },
  {
    title: "Controlled toggles",
    description: "Provide onToggle to own the state, update the count and active flag yourself, and send the change to your API.",
    code: `function ControlledDemo() {
  const [reactions, setReactions] = React.useState([
    { emoji: "🚀", count: 8, active: true },
    { emoji: "👍", count: 3 },
    { emoji: "🙏", count: 1 },
  ])
  const toggle = (emoji: string) =>
    setReactions((list) =>
      list.map((r) => (r.emoji === emoji ? { ...r, active: !r.active, count: r.count + (r.active ? -1 : 1) } : r))
    )
  const mine = reactions.filter((r) => r.active).map((r) => r.emoji)
  return (
    <div className="flex flex-col items-start gap-3">
      <ReactionBar reactions={reactions} onToggle={toggle} />
      <p className="text-xs text-fg-muted">You reacted with {mine.length ? mine.join(" ") : "nothing yet"}</p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Under a comment",
    description: "The bar is a flex row, so it sits under a message body with a small top margin.",
    code: `<div className="flex w-full max-w-md gap-3">
  <Avatar><AvatarFallback>PR</AvatarFallback></Avatar>
  <div className="min-w-0 flex-1">
    <div className="flex items-baseline gap-2">
      <span className="text-sm font-medium text-fg">Priya Raman</span>
      <span className="text-xs text-fg-muted">2h ago</span>
    </div>
    <p className="mt-0.5 text-sm text-fg-muted">Northwind confirmed INV-2041 is in Friday's payment run, so we can stop the reminders.</p>
    <ReactionBar className="mt-2" reactions={[{ emoji: "🎉", count: 3, active: true }, { emoji: "👍", count: 2 }]} />
  </div>
</div>`,
    node: (
      <div className="flex w-full max-w-md gap-3">
        <Avatar><AvatarFallback>PR</AvatarFallback></Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-fg">Priya Raman</span>
            <span className="text-xs text-fg-muted">2h ago</span>
          </div>
          <p className="mt-0.5 text-sm text-fg-muted">Northwind confirmed INV-2041 is in Friday's payment run, so we can stop the reminders.</p>
          <ReactionBar className="mt-2" reactions={[{ emoji: "🎉", count: 3, active: true }, { emoji: "👍", count: 2 }]} />
        </div>
      </div>
    ),
  },
]
