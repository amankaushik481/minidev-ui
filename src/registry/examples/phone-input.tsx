"use client"
import * as React from "react"
import { PhoneInput } from "@/registry/ui/phone-input"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

function ControlledDemo() {
  const [phone, setPhone] = React.useState("+1 (415) 555-0142")
  const digits = phone.replace(/\D/g, "")
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <PhoneInput value={phone} onChange={setPhone} aria-label="Mobile number" />
      <p className="text-xs text-fg-muted tabular-nums">
        {digits.length >= 10 ? "Stored as +" + digits : "Enter at least 10 digits"}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled value",
    description: "Keep the formatted string in state and strip it to digits when you save it.",
    code: `function ControlledDemo() {
  const [phone, setPhone] = React.useState("+1 (415) 555-0142")
  const digits = phone.replace(/\\D/g, "")
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <PhoneInput value={phone} onChange={setPhone} aria-label="Mobile number" />
      <p className="text-xs text-fg-muted tabular-nums">
        {digits.length >= 10 ? "Stored as +" + digits : "Enter at least 10 digits"}
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "With form field",
    description: "Share an id between FormField and the input so the label focuses it.",
    code: `<FormField id="mobile" label="Mobile number" description="Only used for sign-in codes.">
  <PhoneInput id="mobile" />
</FormField>`,
    node: (
      <div className="w-full max-w-xs">
        <FormField id="mobile" label="Mobile number" description="Only used for sign-in codes.">
          <PhoneInput id="mobile" />
        </FormField>
      </div>
    ),
  },
  {
    title: "Custom placeholder",
    description: "Swap the placeholder to match the format you expect from your customers.",
    code: `<PhoneInput placeholder="+44 20 0000 0000" aria-label="UK phone number" />`,
    node: (
      <div className="w-full max-w-xs">
        <PhoneInput placeholder="+44 20 0000 0000" aria-label="UK phone number" />
      </div>
    ),
  },
  {
    title: "Disabled and error",
    description: "A disabled input keeps its number readable; FormField's error prop shows the message after validation.",
    code: `<PhoneInput disabled value="+1 (415) 555-0142" aria-label="Phone number" />

<FormField id="phone-error" label="Phone number" error="Enter a number we can send a text to.">
  <PhoneInput id="phone-error" />
</FormField>`,
    node: (
      <div className="flex w-full max-w-xs flex-col gap-4">
        <PhoneInput disabled value="+1 (415) 555-0142" aria-label="Phone number" />
        <FormField id="phone-error" label="Phone number" error="Enter a number we can send a text to.">
          <PhoneInput id="phone-error" />
        </FormField>
      </div>
    ),
  },
]
