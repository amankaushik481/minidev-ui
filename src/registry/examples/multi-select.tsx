"use client"
import * as React from "react"
import { MultiSelect } from "@/registry/ui/multi-select"
import { FormField } from "@/registry/ui/form-field"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const REGIONS = [
  { value: "us-east", label: "US East (Virginia)" },
  { value: "us-west", label: "US West (Oregon)" },
  { value: "eu-west", label: "EU West (Dublin)" },
  { value: "eu-central", label: "EU Central (Frankfurt)" },
  { value: "ap-south", label: "Asia Pacific (Mumbai)" },
]

function ControlledDemo() {
  const [approvers, setApprovers] = React.useState<string[]>(["theo-okafor"])
  return (
    <div className="flex w-72 flex-col gap-3">
      <MultiSelect value={approvers} onChange={setApprovers} placeholder="Choose approvers" />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-fg-muted">
          {approvers.length === 0 ? "INV-2041 has no approvers yet" : approvers.length + " of 6 reviewers can approve INV-2041"}
        </p>
        <Button size="sm" variant="ghost" disabled={approvers.length === 0} onClick={() => setApprovers([])}>
          Clear
        </Button>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "Pass your own items as value and label pairs, with defaultValue for the initial selection.",
    code: `const REGIONS = [
  { value: "us-east", label: "US East (Virginia)" },
  { value: "us-west", label: "US West (Oregon)" },
  { value: "eu-west", label: "EU West (Dublin)" },
  { value: "eu-central", label: "EU Central (Frankfurt)" },
  { value: "ap-south", label: "Asia Pacific (Mumbai)" },
]

<MultiSelect items={REGIONS} defaultValue={["us-east", "eu-west"]} placeholder="Deploy regions" />`,
    node: <MultiSelect items={REGIONS} defaultValue={["us-east", "eu-west"]} placeholder="Deploy regions" />,
  },
  {
    title: "Controlled value",
    description: "Own the selection in state to show a count, clear it or submit it with a form.",
    code: `function ControlledDemo() {
  const [approvers, setApprovers] = React.useState<string[]>(["theo-okafor"])
  return (
    <div className="flex w-72 flex-col gap-3">
      <MultiSelect value={approvers} onChange={setApprovers} placeholder="Choose approvers" />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-fg-muted">
          {approvers.length === 0 ? "INV-2041 has no approvers yet" : approvers.length + " of 6 reviewers can approve INV-2041"}
        </p>
        <Button size="sm" variant="ghost" disabled={approvers.length === 0} onClick={() => setApprovers([])}>
          Clear
        </Button>
      </div>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "With form field",
    description: "Wrap it in FormField for a label and a hint that explain what the selection does.",
    code: `<FormField label="Notify on failure" description="Each person gets an email when a deploy fails.">
  <MultiSelect defaultValue={["maya-chen"]} placeholder="Pick teammates" />
</FormField>`,
    node: (
      <div className="w-72">
        <FormField label="Notify on failure" description="Each person gets an email when a deploy fails.">
          <MultiSelect defaultValue={["maya-chen"]} placeholder="Pick teammates" />
        </FormField>
      </div>
    ),
  },
  {
    title: "Disabled",
    description: "The trigger cannot be opened while disabled, so the current selection stays visible as context.",
    code: `<MultiSelect disabled defaultValue={["priya-raman", "sam-lowe"]} />`,
    node: <MultiSelect disabled defaultValue={["priya-raman", "sam-lowe"]} />,
  },
]
