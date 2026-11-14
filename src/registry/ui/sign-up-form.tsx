"use client"
import * as React from "react"
import { AuthCard } from "@/registry/ui/auth-card"
import { SocialAuthRow } from "@/registry/ui/social-auth-row"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"

/**
 * A complete sign-up card: GitHub and Google buttons, then name, email and password fields and a submit button.
 *
 * Fields use browser autofill tokens (`new-password` for the password) and native required checks.
 * Use AuthCard to build your own variant; use SocialAuthRow alone for OAuth-only sign-in.
 *
 * @example
 * <SignUpForm onSubmit={({ name, email, password }) => signUp(name, email, password)} signInHref="/login" />
 */
type SignUpValues = { name: string; email: string; password: string }

type SignUpFormProps = {
  /** Called with the field values on submit; the native submit is prevented. */
  onSubmit?: (values: SignUpValues) => void
  /** Link target for "Sign in". */
  signInHref?: string
  /** Called by "Continue with GitHub". */
  onGithub?: () => void
  /** Called by "Continue with Google". */
  onGoogle?: () => void
  className?: string
}

function SignUpForm({ onSubmit, signInHref = "#", onGithub, onGoogle, className }: SignUpFormProps) {
  const id = React.useId()
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    onSubmit?.({ name: String(f.get("name") ?? ""), email: String(f.get("email") ?? ""), password: String(f.get("password") ?? "") })
  }
  return (
    <div data-slot="sign-up-form" className={className}>
      <AuthCard title="Create account" footer={<>Have an account? <a className="rounded-sm text-accent-fg underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-accent" href={signInHref}>Sign in</a></>}>
        <SocialAuthRow onGithub={onGithub} onGoogle={onGoogle} />
        <form onSubmit={submit} className="space-y-3">
          <FormField id={`${id}-name`} label="Name" required>
            <Input id={`${id}-name`} name="name" autoComplete="name" required />
          </FormField>
          <FormField id={`${id}-email`} label="Email" required>
            <Input id={`${id}-email`} name="email" type="email" autoComplete="email" required />
          </FormField>
          <FormField id={`${id}-password`} label="Password" required>
            <Input id={`${id}-password`} name="password" type="password" autoComplete="new-password" required />
          </FormField>
          <Button type="submit" className="w-full">Create account</Button>
        </form>
      </AuthCard>
    </div>
  )
}
export { SignUpForm }
export type { SignUpFormProps, SignUpValues }
