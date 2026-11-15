"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { InlineAlert } from "@/registry/ui/inline-alert"
import { ResetPasswordForm } from "@/registry/ui/reset-password-form"
import type { Example } from "./types"

function ResetFlow() {
  const [done, setDone] = React.useState(false)
  if (done) {
    return (
      <div className="mx-auto w-full max-w-sm space-y-3">
        <InlineAlert tone="success" title="Password updated">Sign in with your new password. Other devices were signed out.</InlineAlert>
        <Button variant="outline" size="sm" onClick={() => setDone(false)}>Reset again</Button>
      </div>
    )
  }
  // In a real page, read the token from the URL and send it with the password.
  return <ResetPasswordForm className="w-full" minLength={12} onSubmit={() => setDone(true)} />
}

export const examples: Example[] = [
  {
    title: "Reset and confirm",
    description: "The form checks the two fields match and the browser enforces minLength; show your own result when onSubmit runs.",
    code: `function ResetFlow() {
  const [done, setDone] = React.useState(false)
  if (done) {
    return (
      <div className="mx-auto w-full max-w-sm space-y-3">
        <InlineAlert tone="success" title="Password updated">Sign in with your new password. Other devices were signed out.</InlineAlert>
        <Button variant="outline" size="sm" onClick={() => setDone(false)}>Reset again</Button>
      </div>
    )
  }
  // In a real page, read the token from the URL and send it with the password.
  return <ResetPasswordForm className="w-full" minLength={12} onSubmit={() => setDone(true)} />
}`,
    node: <ResetFlow />,
  },
  {
    title: "Link expired",
    description: "Check the token before rendering the form, and show the next step when it is no longer valid.",
    code: `<div className="mx-auto w-full max-w-sm space-y-3">
  <InlineAlert tone="danger" title="This reset link has expired">Links work for 1 hour. Request a new one to continue.</InlineAlert>
  <Button size="sm" render={<a href="#forgot-password" />}>Send a new link</Button>
</div>`,
    node: (
      <div className="mx-auto w-full max-w-sm space-y-3">
        <InlineAlert tone="danger" title="This reset link has expired">Links work for 1 hour. Request a new one to continue.</InlineAlert>
        <Button size="sm" render={<a href="#forgot-password" />}>Send a new link</Button>
      </div>
    ),
  },
]
