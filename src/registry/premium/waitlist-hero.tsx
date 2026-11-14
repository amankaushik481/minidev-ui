"use client"
import * as React from "react"
import { CheckIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { inputVariants } from "@/registry/ui/input"
import { SocialProof } from "@/registry/ui/social-proof"

/**
 * A "coming soon" hero with a breathing accent glow, a one-field email form that handles loading, success and error, and a social-proof row.
 * `onSubmit` may return a promise: the button shows progress, success
 * replaces the form with a confirmation, and a thrown error keeps the typed
 * email and shows the message. Results are announced to screen readers. The
 * glow holds still for reduced motion.
 *
 * Use it for a pre-launch page or a gated beta. Reach for CommandWaitlist
 * for a command-palette styled signup, the free NewsletterSignup for a small
 * inline form, and LaunchCountdown to add a clock.
 *
 * @example
 * <WaitlistHero
 *   title="Lumen 3.0 is almost here"
 *   onSubmit={async (email) => { await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) }) }}
 *   proof={null}
 * />
 */
type WaitlistHeroProps = {
  /** Called with the email. Return a promise to show progress; throw to show an error. */
  onSubmit?: (email: string) => void | Promise<void>
  /** Small label above the title. */
  eyebrow?: string
  title?: string
  description?: string
  /** Submit button label. */
  submitLabel?: string
  /** Shown in place of the form after a successful submit. */
  successMessage?: string
  /** Social proof under the form. Defaults to a sample avatar row; pass null to hide it. Never invent numbers. */
  proof?: React.ReactNode
  className?: string
}

type Status = "idle" | "loading" | "done" | "error"

function WaitlistHero({
  onSubmit,
  eyebrow = "Coming soon",
  title = "Join the waitlist",
  description = "Be first to the motion pack, landing templates, and launch kits.",
  submitLabel = "Request access",
  successMessage = "You are on the list. We will email you when it opens.",
  proof,
  className,
}: WaitlistHeroProps) {
  const reduce = useReducedMotion()
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<Status>("idle")
  const [error, setError] = React.useState("")
  const errorId = React.useId()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "loading") return
    setStatus("loading")
    setError("")
    try {
      await onSubmit?.(email.trim())
      setStatus("done")
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  return (
    <section
      data-slot="waitlist-hero"
      data-tier="premium"
      data-state={status}
      className={cn("relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-24 text-center", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--accent)_25%,transparent),transparent_70%)]"
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-xl">
        <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.026em] text-balance text-fg">{title}</h1>
        <p className="mt-3 text-sm text-pretty text-fg-muted">{description}</p>
        <div aria-live="polite" className="mt-6">
          {status === "done" ? (
            <p className="inline-flex items-center gap-2 rounded-lg border border-border bg-sunken px-4 py-2.5 text-sm text-fg">
              <CheckIcon aria-hidden className="size-4 text-success" />
              {successMessage}
            </p>
          ) : (
            <form className="flex flex-col gap-2 sm:flex-row" onSubmit={submit}>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                aria-label="Email"
                aria-invalid={status === "error" || undefined}
                aria-describedby={status === "error" ? errorId : undefined}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(inputVariants({ size: "default" }), "flex-1")}
              />
              <Button type="submit" disabled={status === "loading"} aria-busy={status === "loading" || undefined}>
                {status === "loading" ? "Sending…" : submitLabel}
              </Button>
            </form>
          )}
          {status === "error" ? (
            <p id={errorId} className="mt-2 text-left text-xs text-danger">
              {error}
            </p>
          ) : null}
        </div>
        {proof !== null ? (
          <div className="mt-6 flex justify-center">
            {proof ?? (
              <SocialProof
                countLabel="1,800+ already waiting"
                people={[{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }]}
              />
            )}
          </div>
        ) : null}
      </div>
    </section>
  )
}
export { WaitlistHero }
export type { WaitlistHeroProps }
