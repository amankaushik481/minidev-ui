"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AuthCard } from "@/registry/ui/auth-card"
import { Button } from "@/registry/ui/button"
import { FormField } from "@/registry/ui/form-field"
import { InlineAlert } from "@/registry/ui/inline-alert"
import { Input } from "@/registry/ui/input"
import { SocialAuthRow } from "@/registry/ui/social-auth-row"

/**
 * SignInPage — a centred sign-in screen: GitHub and Google buttons, an "or" divider, then email and password in a real form.
 *
 * Use as the whole /sign-in route. Fields carry `autoComplete` so password managers fill them, and Enter submits.
 * For just the card use AuthCard; for one-time codes use OtpInput. Wire `onSubmit` to your auth call.
 *
 * @example
 * <SignInPage onSubmit={({ email, password }) => signIn(email, password)} />
 */
type SignInPageProps = {
  /** Called with the entered credentials when the form is submitted. If the promise rejects, a danger InlineAlert shows above the button. */
  onSubmit?: (values: { email: string; password: string }) => void | Promise<void>
  className?: string
}

function SignInPage({ onSubmit, className }: SignInPageProps) {
  const id = React.useId()
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState(false)
  return (
    <div data-slot="sign-in-page" className={cn("flex min-h-[480px] items-center justify-center p-4 sm:p-6", className)}>
      <AuthCard
        title="Sign in to Lumen"
        description="Welcome back. Your morning digest is waiting."
        footer={
          <>
            No account?{" "}
            <a className="rounded-sm text-accent-fg underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-accent" href="#">
              Start free
            </a>
          </>
        }
      >
        <SocialAuthRow />
        <div className="flex items-center gap-3 text-xs text-fg-subtle">
          <span aria-hidden className="h-px flex-1 bg-border" />
          or
          <span aria-hidden className="h-px flex-1 bg-border" />
        </div>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            const f = new FormData(e.currentTarget)
            setBusy(true)
            setError(false)
            try {
              await onSubmit?.({ email: String(f.get("email") ?? ""), password: String(f.get("password") ?? "") })
            } catch {
              setError(true)
            } finally {
              setBusy(false)
            }
          }}
        >
          <FormField id={`${id}-email`} label="Email">
            <Input id={`${id}-email`} name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
          </FormField>
          <FormField id={`${id}-password`} label="Password">
            <Input id={`${id}-password`} name="password" type="password" autoComplete="current-password" required />
          </FormField>
          {error ? (
            <InlineAlert tone="danger" title="Could not sign you in">
              Check your email and password, then try again.
            </InlineAlert>
          ) : null}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </AuthCard>
    </div>
  )
}

export { SignInPage }
export type { SignInPageProps }
