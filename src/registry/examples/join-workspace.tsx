"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { JoinWorkspace } from "@/registry/ui/join-workspace"
import type { Example } from "./types"

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

function JoinFlow() {
  const [joined, setJoined] = React.useState(false)
  if (joined) {
    return (
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-sm text-fg shadow-highlight">
        <p className="font-medium">You joined Northwind.</p>
        <p className="mt-1 text-fg-muted">Taking you to the dashboard…</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => setJoined(false)}>Start over</Button>
      </div>
    )
  }
  return (
    <div className="w-full space-y-2">
      <JoinWorkspace
        onJoin={async (code) => {
          await wait(700)
          if (code.toLowerCase() === "md-team-4821") return setJoined(true)
          if (code.toLowerCase().startsWith("md-team-")) throw new Error("That invite has expired. Ask your admin for a new one.")
          throw new Error("We don't recognise that code. Codes look like md-team-1234.")
        }}
      />
      <p className="text-center text-xs text-fg-muted">Try md-team-4821, md-team-0001 or anything else.</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Errors and success",
    description: "Throw an Error from onJoin to show its message under the field; redirect inside onJoin when it works.",
    code: `const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

function JoinFlow() {
  const [joined, setJoined] = React.useState(false)
  if (joined) {
    return (
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-sm text-fg shadow-highlight">
        <p className="font-medium">You joined Northwind.</p>
        <p className="mt-1 text-fg-muted">Taking you to the dashboard…</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => setJoined(false)}>Start over</Button>
      </div>
    )
  }
  return (
    <div className="w-full space-y-2">
      <JoinWorkspace
        onJoin={async (code) => {
          await wait(700)
          if (code.toLowerCase() === "md-team-4821") return setJoined(true)
          if (code.toLowerCase().startsWith("md-team-")) throw new Error("That invite has expired. Ask your admin for a new one.")
          throw new Error("We don't recognise that code. Codes look like md-team-1234.")
        }}
      />
      <p className="text-center text-xs text-fg-muted">Try md-team-4821, md-team-0001 or anything else.</p>
    </div>
  )
}`,
    node: <JoinFlow />,
  },
  {
    title: "Join or create",
    description: "On an onboarding step, offer creating a workspace as the way out for people without a code.",
    code: `<div className="w-full space-y-3">
  <JoinWorkspace onJoin={async (code) => console.log("join", code)} />
  <p className="text-center text-sm text-fg-muted">
    No invite? <a href="#create-workspace" className="font-medium text-accent-fg underline-offset-4 hover:underline">Create a workspace</a>
  </p>
</div>`,
    node: (
      <div className="w-full space-y-3">
        <JoinWorkspace onJoin={async (code) => console.log("join", code)} />
        <p className="text-center text-sm text-fg-muted">
          No invite? <a href="#create-workspace" className="font-medium text-accent-fg underline-offset-4 hover:underline">Create a workspace</a>
        </p>
      </div>
    ),
  },
]
