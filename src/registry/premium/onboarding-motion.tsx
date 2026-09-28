"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

const steps = [
  {
    title: "Install the free kit",
    body: "Pick a template. Tokens, type and spacing are already decided.",
  },
  {
    title: "Compose product UI",
    body: "Dashboards, AI studio, billing, admin. Stay free as long as you want.",
  },
  {
    title: "Invite your team",
    body: "Kinetic heroes and launch kits when the first screen has to convert.",
  },
]

function OnboardingMotion({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [step, setStep] = React.useState(0)
  const s = steps[step]
  return (
    <div
      data-slot="onboarding-motion"
      data-tier="premium"
      className={cn("mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface", className)}
    >
      <div className="flex gap-1 border-b border-border bg-sunken p-3">
        {steps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Step ${i + 1}`}
            aria-current={i === step ? "step" : undefined}
            onClick={() => setStep(i)}
            className={cn(
              "h-1 flex-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent",
              i <= step ? "bg-accent" : "bg-border"
            )}
          />
        ))}
      </div>
      <div className="relative min-h-[220px] p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduce ? false : { x: 16 }}
            animate={{ x: 0 }}
            exit={reduce ? undefined : { x: -16 }}
            transition={{ duration: 0.28 }}
            className="space-y-3"
          >
            <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">
              Step {step + 1} of {steps.length}
            </p>
            <h3 className="text-2xl font-medium tracking-[-0.018em] text-fg">{s.title}</h3>
            <p className="text-sm leading-[1.55] text-fg-muted">{s.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
        <Button type="button" variant="ghost" size="sm" disabled={step === 0} onClick={() => setStep((x) => Math.max(0, x - 1))}>
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" size="sm" onClick={() => setStep((x) => Math.min(steps.length - 1, x + 1))}>
            Continue
          </Button>
        ) : (
          <MagneticCta size="sm">Open gallery</MagneticCta>
        )}
      </div>
    </div>
  )
}
export { OnboardingMotion }
