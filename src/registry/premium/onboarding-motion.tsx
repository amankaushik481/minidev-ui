"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

/**
 * A short onboarding card that slides between steps, with a segmented progress bar you can click, Back and Continue, and a magnetic finish button.
 * Each step slides in on the morph spring and leaves faster than it came.
 * The progress segments are real buttons with `aria-current="step"`, and the
 * step text is announced politely as it changes. Reduced motion swaps steps
 * instantly.
 *
 * Use it for a three-to-five step welcome on a marketing or signup page.
 * Reach for the free OnboardingWizard for multi-step forms inside a product,
 * OnboardingChecklist for a task list, and ProductTour to walk through
 * features beside a preview.
 *
 * @example
 * <OnboardingMotion
 *   steps={[{ title: "Connect your bank", body: "Transactions sync every hour." }, { title: "Send an invoice", body: "Numbering and reminders are handled." }]}
 *   finishLabel="Open Lumen"
 *   onFinish={() => router.push("/app")}
 * />
 */
type OnboardingStep = {
  title: string
  body: string
}

type OnboardingMotionProps = {
  /** Steps in order. */
  steps?: OnboardingStep[]
  /** Label of the button on the last step. */
  finishLabel?: string
  /** Called when the finish button is pressed. */
  onFinish?: () => void
  className?: string
}

const SAMPLE_STEPS: OnboardingStep[] = [
  { title: "Install the free kit", body: "Pick a template. Tokens, type and spacing are already decided." },
  { title: "Compose product UI", body: "Dashboards, AI studio, billing, admin. Stay free as long as you want." },
  { title: "Invite your team", body: "Kinetic heroes and launch kits when the first screen has to convert." },
]

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const EXIT = { duration: 0.16, ease: [0.3, 0, 0.8, 0.15] } as const
// Variants read the direction at exit time (via AnimatePresence `custom`), so Back slides the other way.
const SLIDE = {
  enter: (d: number) => ({ x: 16 * d, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: -16 * d, opacity: 0, transition: EXIT }),
  gone: { opacity: 0, transition: { duration: 0 } },
}

function OnboardingMotion({ steps = SAMPLE_STEPS, finishLabel = "Open gallery", onFinish, className }: OnboardingMotionProps) {
  const reduce = useReducedMotion()
  const [step, setStep] = React.useState(0)
  const [dir, setDir] = React.useState(1)
  const last = Math.max(0, steps.length - 1)
  const current = Math.min(step, last)
  const s = steps[current]
  const go = (to: number) => {
    const next = Math.min(last, Math.max(0, to))
    setDir(next >= current ? 1 : -1)
    setStep(next)
  }
  return (
    <div
      data-slot="onboarding-motion"
      data-tier="premium"
      className={cn("mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface", className)}
    >
      <div className="flex gap-1 border-b border-border bg-sunken px-3 py-1">
        {steps.map((st, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Step ${i + 1}: ${st.title}`}
            aria-current={i === current ? "step" : undefined}
            onClick={() => go(i)}
            className="group flex h-6 flex-1 items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span
              data-slot="onboarding-motion-segment"
              className={cn(
                "h-1 w-full rounded-full transition-colors duration-[70ms]",
                i <= current ? "bg-accent" : "bg-border group-hover:bg-border-strong"
              )}
            />
          </button>
        ))}
      </div>
      <div aria-live="polite" className="relative min-h-[220px] p-6">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          {s ? (
            <motion.div
              key={current}
              custom={dir}
              variants={SLIDE}
              initial={reduce ? false : "enter"}
              animate="center"
              exit={reduce ? "gone" : "exit"}
              transition={reduce ? { duration: 0 } : MORPH}
              className="space-y-3"
            >
              <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase tabular-nums">
                Step {current + 1} of {steps.length}
              </p>
              <h3 className="text-2xl font-medium tracking-[-0.018em] text-fg">{s.title}</h3>
              <p className="text-sm leading-[1.55] text-fg-muted">{s.body}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
        <Button type="button" variant="ghost" size="sm" disabled={current === 0} onClick={() => go(current - 1)}>
          Back
        </Button>
        {current < last ? (
          <Button type="button" size="sm" onClick={() => go(current + 1)}>
            Continue
          </Button>
        ) : (
          <MagneticCta size="sm" onClick={onFinish}>
            {finishLabel}
          </MagneticCta>
        )}
      </div>
    </div>
  )
}
export { OnboardingMotion }
export type { OnboardingMotionProps, OnboardingStep }
