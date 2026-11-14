"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A terminal-styled waitlist card with a monospace email field and a Join button that springs into view as it scrolls on screen.
 *
 * Handles its own pending, success and error states and announces them to
 * screen readers. Pass `onSubmit` to send the address anywhere; it may return
 * a promise, and a thrown error shows `errorMessage` and keeps the address so
 * nothing typed is lost. Use it for a launch or beta waitlist; for a
 * newsletter row in a footer use a plain Input and Button.
 *
 * @example
 * <CommandWaitlist product="Lumen 2.0" onSubmit={(email) => fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) })} />
 */
type CommandWaitlistProps = {
  /** Product name in the title bar. */
  product?: string
  /** Called with the trimmed email. Return a promise to show a pending state; throw to show the error. */
  onSubmit?: (email: string) => void | Promise<unknown>
  /** Line shown after a successful submit. */
  successMessage?: string
  /** Line shown when onSubmit throws. */
  errorMessage?: string
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function CommandWaitlist({
  product = "Lumen 2.0",
  onSubmit,
  successMessage = "Queued. We will ping you.",
  errorMessage = "Could not join. Check the address and try again.",
  className,
}: CommandWaitlistProps) {
  const reduce = useReducedMotion()
  const id = React.useId()
  const [email, setEmail] = React.useState("")
  const [state, setState] = React.useState<"idle" | "pending" | "done" | "error">("idle")
  return (
    <motion.div
      data-slot="command-waitlist"
      data-tier="premium"
      initial={reduce ? false : { y: 16, scale: 0.98 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={reduce ? { duration: 0 } : MORPH}
      className={cn("mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-raised", className)}
    >
      <div className="flex items-center justify-between border-b border-border bg-sunken px-4 py-2.5">
        <p className="text-xs font-medium text-fg-muted">Waitlist · {product}</p>
        <kbd aria-hidden className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-fg-muted">
          ⌘K
        </kbd>
      </div>
      <form
        className="space-y-3 p-4"
        onSubmit={async (e) => {
          e.preventDefault()
          if (state === "pending" || state === "done") return
          setState("pending")
          try {
            await onSubmit?.(email.trim())
            setState("done")
          } catch {
            setState("error")
          }
        }}
      >
        <label className="block font-mono text-xs text-fg-muted" htmlFor={`${id}-email`}>
          join --email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          readOnly={state === "done"}
          aria-invalid={state === "error" || undefined}
          aria-describedby={`${id}-status`}
          onChange={(e) => {
            setEmail(e.target.value)
            if (state === "error") setState("idle")
          }}
          placeholder="you@company.com"
          className="h-10 w-full rounded-lg border border-border bg-bg px-3 font-mono text-sm text-fg shadow-xs transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-fg-subtle focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)] aria-invalid:border-danger"
        />
        <div className="flex items-center justify-between gap-3">
          <p id={`${id}-status`} role="status" className={cn("text-xs", state === "error" ? "text-danger" : "text-fg-muted")}>
            {state === "done" ? successMessage : state === "error" ? errorMessage : "No spam. Launch notes only."}
          </p>
          <Button type="submit" size="sm" disabled={state === "done"} aria-busy={state === "pending" || undefined}>
            {state === "done" ? "Joined" : state === "pending" ? "Joining…" : "Join"}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
export { CommandWaitlist }
export type { CommandWaitlistProps }
