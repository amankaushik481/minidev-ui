"use client"
import * as React from "react"
import { MailIcon } from "lucide-react"
import { FloatingLabelInput } from "@/registry/ui/floating-label-input"
import type { Example } from "./types"

function ControlledDemo() {
  const [email, setEmail] = React.useState("maya@northwind")
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  return (
    <FloatingLabelInput
      label="Work email"
      type="email"
      icon={<MailIcon />}
      value={email}
      onChange={setEmail}
      error={email && !valid ? "That email looks incomplete." : undefined}
      hint="We send the Lumen invite here."
      autoComplete="email"
      required
    />
  )
}

export const examples: Example[] = [
  {
    title: "Single field",
    description: "Pass label to render one field; the label floats as soon as there is a value or focus.",
    code: `<FloatingLabelInput label="Company" defaultValue="Northwind Traders" hint="Shown on every invoice you send." />`,
    node: <FloatingLabelInput label="Company" defaultValue="Northwind Traders" hint="Shown on every invoice you send." />,
  },
  {
    title: "Controlled with validation",
    description: "Control the value, add a leading icon and pass error to replace the hint and mark the field invalid.",
    code: `function ControlledDemo() {
  const [email, setEmail] = React.useState("maya@northwind")
  const valid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
  return (
    <FloatingLabelInput
      label="Work email"
      type="email"
      icon={<MailIcon />}
      value={email}
      onChange={setEmail}
      error={email && !valid ? "That email looks incomplete." : undefined}
      hint="We send the Lumen invite here."
      autoComplete="email"
      required
    />
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Multiline",
    description: "multiline renders a textarea with the same floating label; rows sets the starting height.",
    code: `<FloatingLabelInput label="Notes for finance" multiline rows={3} hint="Optional, a sentence or two is plenty." />`,
    node: <FloatingLabelInput label="Notes for finance" multiline rows={3} hint="Optional, a sentence or two is plenty." />,
  },
  {
    title: "Disabled and error",
    description: "A disabled field keeps its value readable; error shows the message with an icon and sets aria-invalid.",
    code: `<FloatingLabelInput label="Plan" defaultValue="Business, annual" disabled hint="Change plans from Billing." />
<FloatingLabelInput label="Invoice number" defaultValue="INV-20" error="Invoice numbers have four digits." required />`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <FloatingLabelInput label="Plan" defaultValue="Business, annual" disabled hint="Change plans from Billing." />
        <FloatingLabelInput label="Invoice number" defaultValue="INV-20" error="Invoice numbers have four digits." required />
      </div>
    ),
  },
]
