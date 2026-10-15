"use client"
import * as React from "react"
import { TagsInput } from "@/registry/ui/tags-input"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

function LimitDemo() {
  const limit = 5
  const [tags, setTags] = React.useState(["billing", "northwind"])
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <TagsInput
        value={tags}
        onChange={(next) => {
          if (next.length <= limit) setTags(next)
        }}
        placeholder="Add a label"
        aria-label="Labels"
      />
      <p className="text-xs text-fg-muted tabular-nums">
        {tags.length} of {limit} labels used. Press Enter or comma to add one.
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Default tags",
    description: "defaultValue seeds the list; Enter, comma or blur adds the draft and Backspace removes the last tag.",
    code: `<TagsInput defaultValue={["invoicing", "northwind", "q4"]} placeholder="Add a label" aria-label="Labels" />`,
    node: (
      <div className="w-full max-w-sm">
        <TagsInput defaultValue={["invoicing", "northwind", "q4"]} placeholder="Add a label" aria-label="Labels" />
      </div>
    ),
  },
  {
    title: "Controlled with limit",
    description: "Own the list in state and ignore changes that would go past the limit.",
    code: `function LimitDemo() {
  const limit = 5
  const [tags, setTags] = React.useState(["billing", "northwind"])
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <TagsInput
        value={tags}
        onChange={(next) => {
          if (next.length <= limit) setTags(next)
        }}
        placeholder="Add a label"
        aria-label="Labels"
      />
      <p className="text-xs text-fg-muted tabular-nums">
        {tags.length} of {limit} labels used. Press Enter or comma to add one.
      </p>
    </div>
  )
}`,
    node: <LimitDemo />,
  },
  {
    title: "Error state",
    description: "aria-invalid turns the border red; FormField carries the message.",
    code: `<FormField label="Recipients" error="theo@northwind is missing a domain.">
  <TagsInput defaultValue={["maya@northwind.com", "theo@northwind"]} aria-invalid placeholder="Add an email" aria-label="Recipients" />
</FormField>`,
    node: (
      <div className="w-full max-w-sm">
        <FormField label="Recipients" error="theo@northwind is missing a domain.">
          <TagsInput defaultValue={["maya@northwind.com", "theo@northwind"]} aria-invalid placeholder="Add an email" aria-label="Recipients" />
        </FormField>
      </div>
    ),
  },
  {
    title: "Disabled",
    description: "Disabled tags stay readable and cannot be removed or added to.",
    code: `<TagsInput disabled defaultValue={["eu-west", "production"]} aria-label="Environment tags" />`,
    node: (
      <div className="w-full max-w-sm">
        <TagsInput disabled defaultValue={["eu-west", "production"]} aria-label="Environment tags" />
      </div>
    ),
  },
]
