"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * CtaBand — the closing call to action of a landing page: a big lit panel, a headline that catches the light, and an email field whose button morphs into a confirmation.
 *
 * Use as the last section before the footer when the ask is "leave your email". For a plain row with one button use
 * CtaBanner; for a premium glow panel use CtaGlow. `onSubmit` may return a promise: the button shows "Sending…" until
 * it settles, "Check your inbox" on success, and an error line if it throws. Result is announced to screen readers.
 *
 * @example
 * <CtaBand title="Ship it this week." onSubmit={(email) => fetch("/api/waitlist", { method: "POST", body: email })} />
 */
type CtaBandProps = {
  /** Headline (rendered as h2). Wrap a phrase in `<span className="text-lit">` to make it catch the light. */
  title?: React.ReactNode
  /** One or two sentences under the headline. */
  description?: React.ReactNode
  /** Email input placeholder. */
  placeholder?: string
  /** Submit button label at rest. */
  button?: string
  /** Button label after a successful submit. */
  success?: string
  /** Called with the email on submit. Return a promise to show the busy state; throw to show the error line. */
  onSubmit?: (email: string) => void | Promise<void>
  /** Small print under the form. */
  note?: React.ReactNode
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function CtaBand({
  title = (
    <>
      Know what changed
      <br />
      <span className="text-lit">before your coffee.</span>
    </>
  ),
  description = "Connect a source and get your first digest tomorrow morning. Free for 14 days.",
  placeholder = "you@company.com",
  button = "Start free",
  success = "Check your inbox",
  onSubmit,
  note = "No card. Cancel in one click.",
  className,
}: CtaBandProps) {
  const [email, setEmail] = React.useState("")
  const [state, setState] = React.useState<"idle" | "busy" | "done" | "error">("idle")
  const reduce = useReducedMotion()
  const titleId = React.useId()
  const valid = /.+@.+\..+/.test(email)
  return (
    <section data-slot="cta-band" aria-labelledby={titleId} className={cn("mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8", className)}>
      <div className="relative isolate overflow-hidden rounded-[32px] border border-border bg-surface px-6 py-16 text-center shadow-raised sm:px-16 sm:py-24">
        <div aria-hidden className="light-spot absolute inset-0 -z-10" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-70 [--grid-size:40px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]" />
        <div aria-hidden className="absolute -bottom-40 left-1/2 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-accent opacity-20 blur-[120px]" />
        <h2 id={titleId} className="mx-auto max-w-3xl text-4xl leading-[1.02] font-medium tracking-[-0.045em] text-balance text-fg sm:text-6xl">{title}</h2>
        {description ? <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.6] text-fg-muted">{description}</p> : null}
        <form
          className="mx-auto mt-9 flex max-w-md items-center gap-1.5 rounded-2xl border border-border bg-raised p-1.5 shadow-key focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-soft)]"
          onSubmit={async (e) => {
            e.preventDefault()
            if (!valid || state === "busy" || state === "done") return
            setState("busy")
            try {
              await (onSubmit?.(email) ?? new Promise((r) => setTimeout(r, 700)))
              setState("done")
            } catch {
              setState("error")
            }
          }}
        >
          <input
            type="email"
            required
            value={email}
            disabled={state === "done"}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === "error") setState("idle")
            }}
            placeholder={placeholder}
            aria-label="Work email"
            autoComplete="email"
            className="h-11 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-fg outline-none placeholder:text-fg-subtle"
          />
          <motion.button
            layout
            type="submit"
            disabled={state === "busy" || state === "done"}
            transition={reduce ? { duration: 0 } : MORPH}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-2 overflow-hidden rounded-xl px-5 text-[14px] font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-raised",
              state === "done" ? "bg-success text-on-accent" : "bg-ink text-on-ink shadow-ink hover:bg-ink-hover"
            )}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={state}
                initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2"
              >
                {state === "done" ? <CheckIcon aria-hidden className="size-4" strokeWidth={2.5} /> : null}
                {state === "done" ? success : state === "busy" ? "Sending…" : button}
                {state === "idle" || state === "error" ? <ArrowRightIcon aria-hidden className="size-4" /> : null}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </form>
        <p role="status" className={state === "error" ? "mt-3 text-[13px] text-danger" : "sr-only"}>
          {state === "done" ? success : state === "error" ? "That did not go through. Try again in a moment." : ""}
        </p>
        {note ? <p className="mt-4 text-[12.5px] text-fg-subtle">{note}</p> : null}
      </div>
    </section>
  )
}

export { CtaBand }
export type { CtaBandProps }
