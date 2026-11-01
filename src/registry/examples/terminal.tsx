"use client"
import * as React from "react"
import { ArrowRightIcon } from "lucide-react"
import { Terminal } from "@/registry/premium/terminal"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function InstallDemo() {
  const [done, setDone] = React.useState(false)
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-4">
      <Terminal
        title="Install the Lumen CLI"
        replay={false}
        onComplete={() => setDone(true)}
        lines={[
          { kind: "command", text: "npm install -g @lumen/cli" },
          { kind: "success", text: "added 1 package in 2s" },
          { kind: "command", text: "lumen login" },
          { kind: "success", text: "Signed in as maya@northwind.com" },
        ]}
      />
      <Button disabled={!done}>Open the dashboard <ArrowRightIcon /></Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Deploy transcript",
    description: "Commands type out and every other kind prints whole; error lines turn red and a per line delay adds a pause before a retry.",
    code: `<Terminal
  title="northwind-api · deploy"
  lines={[
    { kind: "command", text: "lumen deploy --env production" },
    { kind: "info", text: "Building northwind-api@4.2.0" },
    { kind: "success", text: "Compiled 212 modules in 3.1s" },
    { kind: "success", text: "Ran 48 tests, 48 passed" },
    { kind: "error", text: "Migration 0042_add_payout_index timed out after 30s" },
    { kind: "command", text: "lumen deploy --env production --skip-migrations", delay: 900 },
    { kind: "success", text: "Live at https://api.northwind.com" },
  ]}
/>`,
    node: (
      <Terminal
        title="northwind-api · deploy"
        lines={[
          { kind: "command", text: "lumen deploy --env production" },
          { kind: "info", text: "Building northwind-api@4.2.0" },
          { kind: "success", text: "Compiled 212 modules in 3.1s" },
          { kind: "success", text: "Ran 48 tests, 48 passed" },
          { kind: "error", text: "Migration 0042_add_payout_index timed out after 30s" },
          { kind: "command", text: "lumen deploy --env production --skip-migrations", delay: 900 },
          { kind: "success", text: "Live at https://api.northwind.com" },
        ]}
      />
    ),
  },
  {
    title: "Light theme, looping",
    description: "appearance=\"auto\" follows the page theme; loop starts over after a pause and a faster typingSpeed suits short commands.",
    code: `<Terminal
  appearance="auto"
  loop
  replay={false}
  prompt="$"
  typingSpeed={14}
  title="zsh"
  lines={[
    { kind: "command", text: "lumen invoices list --status overdue" },
    { kind: "output", text: "INV-2038  Theo Okafor     $2,415  12 days" },
    { kind: "output", text: "INV-2035  Atlas Freight   $1,120   4 days" },
    { kind: "command", text: "lumen remind INV-2038" },
    { kind: "success", text: "Reminder sent to theo@atlasfreight.com" },
  ]}
/>`,
    node: (
      <Terminal
        appearance="auto"
        loop
        replay={false}
        prompt="$"
        typingSpeed={14}
        title="zsh"
        lines={[
          { kind: "command", text: "lumen invoices list --status overdue" },
          { kind: "output", text: "INV-2038  Theo Okafor     $2,415  12 days" },
          { kind: "output", text: "INV-2035  Atlas Freight   $1,120   4 days" },
          { kind: "command", text: "lumen remind INV-2038" },
          { kind: "success", text: "Reminder sent to theo@atlasfreight.com" },
        ]}
      />
    ),
  },
  {
    title: "On complete",
    description: "onComplete fires once the last line has printed, so the next step can unlock when the transcript is done.",
    code: `function InstallDemo() {
  const [done, setDone] = React.useState(false)
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-4">
      <Terminal
        title="Install the Lumen CLI"
        replay={false}
        onComplete={() => setDone(true)}
        lines={[
          { kind: "command", text: "npm install -g @lumen/cli" },
          { kind: "success", text: "added 1 package in 2s" },
          { kind: "command", text: "lumen login" },
          { kind: "success", text: "Signed in as maya@northwind.com" },
        ]}
      />
      <Button disabled={!done}>Open the dashboard <ArrowRightIcon /></Button>
    </div>
  )
}`,
    node: <InstallDemo />,
  },
]
