"use client"
import * as React from "react"
import { AuthCard } from "@/registry/ui/auth-card"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"

/**
 * MagicLinkForm — a passwordless sign-in card: one email field that sends a sign-in link, then confirms where it went.
 *
 * Use it as the whole sign-in step for passwordless apps. For email and
 * password use SignUpForm or AuthCard with your own fields, for OAuth buttons
 * use SocialAuthRow, and for entering a one-time code use OtpInput.
 *
 * @example
 * <MagicLinkForm onSend={async (email) => { await auth.sendMagicLink(email) }} />
 */
type MagicLinkFormProps = {
  /** Called with the trimmed email on submit. Return a promise to show the pending state; throw an Error to show its message. */
  onSend?: (email: string) => void | Promise<void>
  /** Card title. */
  title?: string
  className?: string
}

function MagicLinkForm({ onSend, title = "Email magic link", className }: MagicLinkFormProps) {
  const id = React.useId()
  const [email, setEmail] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState("")
  const [sentTo, setSentTo] = React.useState("")

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const v = email.trim()
    if (!v || !e.currentTarget.checkValidity()) return setError("Enter a valid email address.")
    setError("")
    setPending(true)
    try {
      await onSend?.(v)
      setSentTo(v)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the link. Try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <div data-slot="magic-link-form" className={className}>
      <AuthCard title={title}>
        <form noValidate onSubmit={submit} className="flex flex-col gap-4">
          <FormField id={`${id}-email`} label="Email" error={error || undefined}>
            <Input
              id={`${id}-email`}
              type="email"
              name="email"
              required
              autoComplete="email"
              inputMode="email"
              value={email}
              aria-invalid={error ? true : undefined}
              onChange={(e) => {
                setEmail(e.target.value)
                if (sentTo) setSentTo("")
              }}
            />
          </FormField>
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Sending…" : sentTo ? "Resend link" : "Send link"}
          </Button>
          <p role="status" className="text-center text-xs text-fg-muted empty:hidden">
            {sentTo ? `Check ${sentTo} for a sign-in link.` : ""}
          </p>
        </form>
      </AuthCard>
    </div>
  )
}
export { MagicLinkForm }
export type { MagicLinkFormProps }
