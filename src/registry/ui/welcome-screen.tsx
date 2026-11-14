"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * A first-run welcome card: eyebrow, headline, one sentence, numbered next steps and two actions.
 *
 * Show it on an empty dashboard after sign-up. Use `OnboardingChecklist` when the steps should tick off as they are done, `OnboardingWizard` for a guided multi-step flow, and `EmptyState` for an empty list.
 *
 * @example
 * <WelcomeScreen title="Welcome to Lumen, Maya" steps={["Connect your bank", "Invite your finance team", "Send your first invoice"]} actions={<Button>Connect bank</Button>} />
 */
type WelcomeScreenProps = {
  /** Small accent label above the headline. */
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  /** Next steps, rendered as a numbered list. */
  steps?: string[]
  /** Buttons under the steps. Defaults to two sample buttons. */
  actions?: React.ReactNode
  className?: string
}

function WelcomeScreen({
  eyebrow = "Welcome",
  title = "Set up your Lumen workspace",
  description = "Three steps and your invoices, payments and cash flow live in one place.",
  steps = ["Connect your bank account", "Invite your finance team", "Send your first invoice"],
  actions,
  className,
}: WelcomeScreenProps) {
  return (
    <div data-slot="welcome-screen" className={cn("rounded-xl border border-border bg-surface p-8 shadow-highlight", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.01em] text-accent-fg">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-medium text-balance text-fg">{title}</h2>
      {description ? <p className="mt-2 max-w-md text-sm leading-[1.55] text-pretty text-fg-muted">{description}</p> : null}
      {steps.length ? (
        <ol className="mt-6 space-y-2 text-sm text-fg-muted">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-2">
              <span aria-hidden className="tabular-nums text-fg-subtle">
                {i + 1}.
              </span>
              {step}
            </li>
          ))}
        </ol>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-2">
        {actions ?? (
          <>
            <Button>Connect bank</Button>
            <Button variant="outline">Read the guide</Button>
          </>
        )}
      </div>
    </div>
  )
}
export { WelcomeScreen }
export type { WelcomeScreenProps }
