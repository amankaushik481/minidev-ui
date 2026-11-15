"use client"
import * as React from "react"
import { FeatureFlagToggle } from "@/registry/ui/feature-flag-toggle"
import type { Example } from "./types"

function ControlledDemo() {
  const [on, setOn] = React.useState(false)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <FeatureFlagToggle
        name="new-invoice-editor"
        description="Roll out the v2 invoice editor to the Northwind workspace."
        checked={on}
        onCheckedChange={setOn}
        className="[&_label]:font-mono"
      />
      <p className="text-xs text-fg-muted" aria-live="polite">
        {on ? "On for 38 members. Saved." : "Off. Members keep the current editor."}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled",
    description: "Hold the value yourself when it comes from your server, so a failed save can flip it back.",
    code: `function ControlledDemo() {
  const [on, setOn] = React.useState(false)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <FeatureFlagToggle
        name="new-invoice-editor"
        description="Roll out the v2 invoice editor to the Northwind workspace."
        checked={on}
        onCheckedChange={setOn}
        className="[&_label]:font-mono"
      />
      <p className="text-xs text-fg-muted" aria-live="polite">
        {on ? "On for 38 members. Saved." : "Off. Members keep the current editor."}
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Locked flag",
    description: "disabled stops the switch from changing. Say why in the description, because a dimmed switch gives no reason.",
    code: `<div className="flex w-full max-w-md flex-col gap-2">
  <FeatureFlagToggle name="Usage-based billing" description="Bill seats by active days instead of monthly." defaultChecked />
  <FeatureFlagToggle
    name="EU data residency"
    description="Only workspace owners can change where data is stored."
    defaultChecked
    disabled
  />
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-2">
        <FeatureFlagToggle name="Usage-based billing" description="Bill seats by active days instead of monthly." defaultChecked />
        <FeatureFlagToggle
          name="EU data residency"
          description="Only workspace owners can change where data is stored."
          defaultChecked
          disabled
        />
      </div>
    ),
  },
]
