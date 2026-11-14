"use client"
import * as React from "react"
import { AuthCard } from "@/registry/ui/auth-card"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"

/**
 * ResetPasswordForm — a "set a new password" card with confirm field and a mismatch check.
 *
 * Use it on the page a password reset email links to. It checks the two fields match and meet
 * `minLength` before calling `onSubmit`; send the token and password to your server there. For
 * the "email me a link" step use a forgot password form.
 *
 * @example
 * <ResetPasswordForm onSubmit={(password) => resetPassword({ token, password })} />
 */
function ResetPasswordForm({
  onSubmit,
  minLength = 8,
  className,
}: {
  /** Called with the new password once both fields match. */
  onSubmit?: (password: string) => void
  /** Minimum password length enforced by the browser. */
  minLength?: number
  className?: string
}) {
  const id = React.useId()
  const [error, setError] = React.useState<string | null>(null)
  return (
    <div data-slot="reset-password-form" className={className}>
      <AuthCard title="Reset password">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            const password = String(data.get("password") ?? "")
            if (password !== String(data.get("confirm") ?? "")) return setError("Passwords do not match")
            setError(null)
            onSubmit?.(password)
          }}
        >
          <FormField id={`${id}-pass`} label="New password" description={`At least ${minLength} characters`}>
            <Input id={`${id}-pass`} name="password" type="password" autoComplete="new-password" required minLength={minLength} />
          </FormField>
          <FormField id={`${id}-confirm`} label="Confirm password" error={error}>
            <Input
              id={`${id}-confirm`}
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              aria-invalid={error ? true : undefined}
              onChange={() => error && setError(null)}
            />
          </FormField>
          <Button type="submit" className="w-full">Update password</Button>
        </form>
      </AuthCard>
    </div>
  )
}
export { ResetPasswordForm }
