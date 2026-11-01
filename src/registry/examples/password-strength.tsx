"use client"
import * as React from "react"
import { PasswordStrength } from "@/registry/ui/password-strength"
import { PasswordInput } from "@/registry/ui/password-input"
import { FormField } from "@/registry/ui/form-field"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function ConfirmDemo() {
  const [password, setPassword] = React.useState("Northwind-2026")
  const [confirm, setConfirm] = React.useState("")
  const mismatch = confirm.length > 0 && confirm !== password
  const ready = password.length >= 12 && confirm === password
  return (
    <form className="flex w-full max-w-sm flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <PasswordStrength id="new-password" label="New password" value={password} onChange={setPassword} />
      <FormField id="confirm-password" label="Confirm password" error={mismatch ? "The two passwords do not match." : undefined}>
        <PasswordInput
          id="confirm-password"
          value={confirm}
          autoComplete="new-password"
          aria-invalid={mismatch ? true : undefined}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </FormField>
      <Button type="submit" disabled={!ready} className="self-start">Update password</Button>
    </form>
  )
}

const POLICY = [
  { label: "At least 10 characters", test: (v: string) => v.length >= 10 },
  { label: "No spaces", test: (v: string) => v.length > 0 && !/\s/.test(v) },
  { label: "Does not contain your name", test: (v: string) => v.length > 0 && !/maya|chen/i.test(v) },
  { label: "A number or symbol", test: (v: string) => /[^A-Za-z]/.test(v) },
]

export const examples: Example[] = [
  {
    title: "Controlled with confirm",
    description: "Hold the value in state to drive a confirm field and keep the submit button disabled until the two match.",
    code: `function ConfirmDemo() {
  const [password, setPassword] = React.useState("Northwind-2026")
  const [confirm, setConfirm] = React.useState("")
  const mismatch = confirm.length > 0 && confirm !== password
  const ready = password.length >= 12 && confirm === password
  return (
    <form className="flex w-full max-w-sm flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <PasswordStrength id="new-password" label="New password" value={password} onChange={setPassword} />
      <FormField id="confirm-password" label="Confirm password" error={mismatch ? "The two passwords do not match." : undefined}>
        <PasswordInput
          id="confirm-password"
          value={confirm}
          autoComplete="new-password"
          aria-invalid={mismatch ? true : undefined}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </FormField>
      <Button type="submit" disabled={!ready} className="self-start">Update password</Button>
    </form>
  )
}`,
    node: <ConfirmDemo />,
  },
  {
    title: "Custom rules",
    description: "rules replaces the checklist; each rule is a label and a test, and the built-in score counts how many pass.",
    code: `const POLICY = [
  { label: "At least 10 characters", test: (v: string) => v.length >= 10 },
  { label: "No spaces", test: (v: string) => v.length > 0 && !/\\s/.test(v) },
  { label: "Does not contain your name", test: (v: string) => v.length > 0 && !/maya|chen/i.test(v) },
  { label: "A number or symbol", test: (v: string) => /[^A-Za-z]/.test(v) },
]

<PasswordStrength label="Password" rules={POLICY} defaultValue="northwind" />`,
    node: <PasswordStrength label="Password" rules={POLICY} defaultValue="northwind" />,
  },
  {
    title: "Custom scorer",
    description: "score overrides the meter with your own 0 to 4 number, for example from zxcvbn; the checklist still follows the rules.",
    code: `<PasswordStrength
  label="Passphrase"
  defaultValue="correct horse battery"
  score={(v) => Math.min(4, Math.floor(v.trim().split(/\\s+/).filter(Boolean).length))}
  rules={[
    { label: "Three or more words", test: (v) => v.trim().split(/\\s+/).filter(Boolean).length >= 3 },
    { label: "At least 16 characters", test: (v) => v.length >= 16 },
  ]}
/>`,
    node: (
      <PasswordStrength
        label="Passphrase"
        defaultValue="correct horse battery"
        score={(v) => Math.min(4, Math.floor(v.trim().split(/\s+/).filter(Boolean).length))}
        rules={[
          { label: "Three or more words", test: (v) => v.trim().split(/\s+/).filter(Boolean).length >= 3 },
          { label: "At least 16 characters", test: (v) => v.length >= 16 },
        ]}
      />
    ),
  },
]
