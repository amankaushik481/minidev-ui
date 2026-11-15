"use client"
import * as React from "react"
import { AuthCard } from "@/registry/ui/auth-card"
import { Button } from "@/registry/ui/button"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { SocialAuthRow } from "@/registry/ui/social-auth-row"
import type { Example } from "./types"

function ProviderDemo() {
  const [provider, setProvider] = React.useState("")
  return (
    <div className="w-full max-w-sm space-y-2">
      <SocialAuthRow onGithub={() => setProvider("GitHub")} onGoogle={() => setProvider("Google")} />
      <p role="status" className="text-center text-xs text-fg-muted">
        {provider ? "Redirecting to " + provider + "…" : ""}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Above an email form",
    description: "The row goes first in the card, then an \"or\" divider and the email form. Its buttons are type=\"button\", so they never submit the form.",
    code: `<AuthCard title="Sign in to Lumen">
  <SocialAuthRow onGithub={() => {}} onGoogle={() => {}} />
  <div className="flex items-center gap-3 text-xs text-fg-subtle">
    <span aria-hidden className="h-px flex-1 bg-border" />
    or
    <span aria-hidden className="h-px flex-1 bg-border" />
  </div>
  <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
    <FormField id="social-email" label="Email">
      <Input id="social-email" name="email" type="email" autoComplete="email" required />
    </FormField>
    <Button type="submit" className="w-full">Continue with email</Button>
  </form>
</AuthCard>`,
    node: (
      <AuthCard title="Sign in to Lumen">
        <SocialAuthRow onGithub={() => {}} onGoogle={() => {}} />
        <div className="flex items-center gap-3 text-xs text-fg-subtle">
          <span aria-hidden className="h-px flex-1 bg-border" />
          or
          <span aria-hidden className="h-px flex-1 bg-border" />
        </div>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <FormField id="social-email" label="Email">
            <Input id="social-email" name="email" type="email" autoComplete="email" required />
          </FormField>
          <Button type="submit" className="w-full">Continue with email</Button>
        </form>
      </AuthCard>
    ),
  },
  {
    title: "Starting the OAuth redirect",
    description: "Each handler starts its provider's flow; here a status line stands in for the redirect.",
    code: `function ProviderDemo() {
  const [provider, setProvider] = React.useState("")
  return (
    <div className="w-full max-w-sm space-y-2">
      <SocialAuthRow onGithub={() => setProvider("GitHub")} onGoogle={() => setProvider("Google")} />
      <p role="status" className="text-center text-xs text-fg-muted">
        {provider ? "Redirecting to " + provider + "…" : ""}
      </p>
    </div>
  )
}`,
    node: <ProviderDemo />,
  },
]
