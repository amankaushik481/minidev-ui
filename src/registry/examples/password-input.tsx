"use client"
import * as React from "react"
import { PasswordInput } from "@/registry/ui/password-input"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

function ConfirmDemo() {
  const [password, setPassword] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const mismatch = confirm.length > 0 && confirm !== password
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <FormField id="new-password" label="New password" description="At least 12 characters.">
        <PasswordInput id="new-password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormField>
      <FormField id="confirm-password" label="Confirm password" error={mismatch ? "Passwords do not match." : undefined}>
        <PasswordInput
          id="confirm-password"
          autoComplete="new-password"
          aria-invalid={mismatch || undefined}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </FormField>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Sizes",
    description: "sm, default and lg match the Input sizes, and the eye button scales with them.",
    code: `<PasswordInput size="sm" placeholder="Small" aria-label="Small" />
<PasswordInput placeholder="Default" aria-label="Default" />
<PasswordInput size="lg" placeholder="Large" aria-label="Large" />`,
    node: (
      <div className="flex w-full max-w-xs flex-col gap-3">
        <PasswordInput size="sm" placeholder="Small" aria-label="Small" />
        <PasswordInput placeholder="Default" aria-label="Default" />
        <PasswordInput size="lg" placeholder="Large" aria-label="Large" />
      </div>
    ),
  },
  {
    title: "With form field",
    description: "Share an id with FormField for the label, and set autoComplete so password managers fill the right field.",
    code: `<FormField id="current-password" label="Current password" description="Needed before you can change your email.">
  <PasswordInput id="current-password" autoComplete="current-password" />
</FormField>`,
    node: (
      <div className="w-full max-w-xs">
        <FormField id="current-password" label="Current password" description="Needed before you can change your email.">
          <PasswordInput id="current-password" autoComplete="current-password" />
        </FormField>
      </div>
    ),
  },
  {
    title: "Confirm password",
    description: "Control both fields and mark the second one invalid as soon as it stops matching.",
    code: `function ConfirmDemo() {
  const [password, setPassword] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const mismatch = confirm.length > 0 && confirm !== password
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <FormField id="new-password" label="New password" description="At least 12 characters.">
        <PasswordInput id="new-password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormField>
      <FormField id="confirm-password" label="Confirm password" error={mismatch ? "Passwords do not match." : undefined}>
        <PasswordInput
          id="confirm-password"
          autoComplete="new-password"
          aria-invalid={mismatch || undefined}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </FormField>
    </div>
  )
}`,
    node: <ConfirmDemo />,
  },
  {
    title: "Disabled",
    description: "Disabled turns off the field and the reveal button together.",
    code: `<PasswordInput disabled defaultValue="correct-horse-battery" aria-label="Password" />`,
    node: (
      <div className="w-full max-w-xs">
        <PasswordInput disabled defaultValue="correct-horse-battery" aria-label="Password" />
      </div>
    ),
  },
]
