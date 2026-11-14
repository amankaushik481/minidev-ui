"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { inputVariants } from "@/registry/ui/input"

/**
 * NewsletterSignup — an email field and Subscribe button that stack on phones and sit in one row from sm up.
 *
 * Uses native email validation. If `onSubmit` returns a promise the button shows
 * "Subscribing…" until it settles, then a polite status line confirms success or
 * reports the error; a rejected promise keeps the email so the user can retry.
 * Use it in footers and blog sidebars; for a full sign-up flow use a form block.
 *
 * @example
 * <NewsletterSignup onSubmit={(email) => fetch("/api/subscribe", { method: "POST", body: email })} />
 */
type NewsletterSignupProps = {
  /** Receives the email. Return a promise to show the pending and success states. */
  onSubmit?: (email: string) => void | Promise<unknown>
  /** Status text after a successful submit. */
  successMessage?: string
  /** Button label. */
  buttonLabel?: string
  /** Placeholder in the field. */
  placeholder?: string
  className?: string
}

function NewsletterSignup({
  onSubmit,
  successMessage = "Thanks. Check your inbox to confirm.",
  buttonLabel = "Subscribe",
  placeholder = "you@company.com",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = React.useState("")
  const [phase, setPhase] = React.useState<"idle" | "pending" | "done" | "error">("idle")
  const statusId = React.useId()
  return (
    <form
      data-slot="newsletter-signup"
      className={cn("w-full max-w-md", className)}
      onSubmit={async (e) => {
        e.preventDefault()
        if (phase === "pending") return
        setPhase("pending")
        try {
          await onSubmit?.(email)
          setPhase("done")
          setEmail("")
        } catch {
          setPhase("error")
        }
      }}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          aria-label="Email"
          aria-describedby={statusId}
          aria-invalid={phase === "error" || undefined}
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (phase !== "pending") setPhase("idle")
          }}
          className={cn(inputVariants({ size: "default" }), "flex-1")}
        />
        <Button type="submit" disabled={phase === "pending"}>
          {phase === "pending" ? "Subscribing…" : buttonLabel}
        </Button>
      </div>
      <p
        id={statusId}
        role="status"
        // Stays mounted (not display:none) so the live region announces reliably.
        className={cn("mt-2 text-xs empty:mt-0", phase === "error" ? "text-danger" : "text-fg-muted")}
      >
        {phase === "done" ? successMessage : phase === "error" ? "Something went wrong. Try again." : ""}
      </p>
    </form>
  )
}
export { NewsletterSignup }
export type { NewsletterSignupProps }
