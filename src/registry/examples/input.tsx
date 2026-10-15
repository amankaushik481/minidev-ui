"use client"
import * as React from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/registry/ui/input"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

function SlugDemo() {
  const [name, setName] = React.useState("Northwind Traders")
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  return (
    <FormField id="workspace" label="Workspace name" description={slug ? "Available at lumen.app/" + slug : "Type a name to get a URL"}>
      <Input id="workspace" value={name} onChange={(e) => setName(e.target.value)} />
    </FormField>
  )
}

export const examples: Example[] = [
  {
    title: "Sizes",
    description: "sm, default and lg line up with Button and Select at the same size.",
    code: `<Input size="sm" placeholder="Small" aria-label="Small" />
<Input placeholder="Default" aria-label="Default" />
<Input size="lg" placeholder="Large" aria-label="Large" />`,
    node: (
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Input size="sm" placeholder="Small" aria-label="Small" />
        <Input placeholder="Default" aria-label="Default" />
        <Input size="lg" placeholder="Large" aria-label="Large" />
      </div>
    ),
  },
  {
    title: "With leading icon",
    description: "Position the icon over the field and pad the input so text starts after it.",
    code: `<div className="relative w-full max-w-xs">
  <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle" />
  <Input type="search" placeholder="Search customers" className="pl-9" aria-label="Search customers" />
</div>`,
    node: (
      <div className="relative w-full max-w-xs">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle" />
        <Input type="search" placeholder="Search customers" className="pl-9" aria-label="Search customers" />
      </div>
    ),
  },
  {
    title: "Controlled value",
    description: "Read e.target.value in onChange and derive anything else, like a slug, from state.",
    code: `function SlugDemo() {
  const [name, setName] = React.useState("Northwind Traders")
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  return (
    <FormField id="workspace" label="Workspace name" description={slug ? "Available at lumen.app/" + slug : "Type a name to get a URL"}>
      <Input id="workspace" value={name} onChange={(e) => setName(e.target.value)} />
    </FormField>
  )
}`,
    node: (
      <div className="w-full max-w-xs">
        <SlugDemo />
      </div>
    ),
  },
  {
    title: "Disabled, read-only, invalid",
    description: "Disabled and read-only fields sink into the surface; aria-invalid turns the border red and FormField shows the message.",
    code: `<Input disabled defaultValue="Locked while a deploy runs" aria-label="Disabled" />
<Input readOnly defaultValue="cus_8Hd2k1Qp" aria-label="Customer ID" />
<FormField id="work-email" label="Work email" error="Use your company address, not a personal one.">
  <Input id="work-email" type="email" aria-invalid defaultValue="maya@gmail.com" />
</FormField>`,
    node: (
      <div className="flex w-full max-w-xs flex-col gap-4">
        <Input disabled defaultValue="Locked while a deploy runs" aria-label="Disabled" />
        <Input readOnly defaultValue="cus_8Hd2k1Qp" aria-label="Customer ID" />
        <FormField id="work-email" label="Work email" error="Use your company address, not a personal one.">
          <Input id="work-email" type="email" aria-invalid defaultValue="maya@gmail.com" />
        </FormField>
      </div>
    ),
  },
]
