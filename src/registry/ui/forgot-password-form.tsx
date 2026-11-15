"use client"
import * as React from "react"
import { AuthCard } from "@/registry/ui/auth-card"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"

/**
 * ForgotPasswordForm — an auth card asking for an email address to send a password reset link to.
 *
 * A real <form>: Enter submits, the browser checks the email format, and
 * `onSubmit` receives the trimmed address. For setting the new password use
 * `ResetPasswordForm`; for passwordless sign-in use `MagicLinkForm`.
 *
 * @example
 * <ForgotPasswordForm onSubmit={async (email) => await sendResetLink(email)} />
 */
type ForgotPasswordFormProps = {
  /** Called with the email address on submit. Return a promise to show a pending state until it settles; if it rejects, the form shows "Something went wrong. Try again." */
  onSubmit?: (email: string) => void | Promise<void>
  /** Card heading. */
  title?: React.ReactNode
  /** Line under the heading. */
  description?: React.ReactNode
  className?: string
}

function ForgotPasswordForm({
  onSubmit,
  title = "Forgot password",
  description = "We'll email you a link to reset it.",
  className,
}: ForgotPasswordFormProps) {
  const id = React.useId()
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState("")
  return (
    <form
      data-slot="forgot-password-form"
      className={className}
      onSubmit={async (e) => {
        e.preventDefault()
        const email = String(new FormData(e.currentTarget).get("email") ?? "").trim()
        if (!onSubmit || pending) return
        setPending(true)
        setError("")
        try {
          await onSubmit(email)
        } catch {
          setError("Something went wrong. Try again.")
        } finally {
          setPending(false)
        }
      }}
    >
      <AuthCard title={title} description={description}>
        <FormField id={id} label="Email">
          <Input id={id} name="email" type="email" autoComplete="email" required />
        </FormField>
        {error ? (
          <p role="alert" className="text-xs tracking-[0.01em] text-danger">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={pending} aria-busy={pending || undefined}>
          {pending ? "Sending…" : "Send reset email"}
        </Button>
      </AuthCard>
    </form>
  )
}
export { ForgotPasswordForm }
export type { ForgotPasswordFormProps }
