"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A large selectable card button with an optional icon, a title and a description.
 *
 * Use for onboarding and plan or workspace-type choices where each option needs a sentence of explanation.
 * Pass `selected` to make it a toggle button (`aria-pressed`); wrap a set in a `role="group"` with an `aria-label`.
 * For compact single choice use RadioGroup or SegmentedControl; for pricing use PlanCard.
 *
 * @example
 * <div role="group" aria-label="Workspace type" className="grid gap-2">
 *   <ChoiceCard title="Personal" description="Just you." selected={type === "solo"} onClick={() => setType("solo")} />
 *   <ChoiceCard title="Team" description="Invite up to 10 people." selected={type === "team"} onClick={() => setType("team")} />
 * </div>
 */
type ChoiceCardProps = React.ComponentProps<"button"> & {
  /** Bold first line. */
  title: React.ReactNode
  /** Supporting sentence under the title. */
  description?: React.ReactNode
  /** Selected state. When defined the card is a toggle button and announces pressed or not pressed. */
  selected?: boolean
  /** Leading icon, sized to 20px. */
  icon?: React.ReactNode
}

function ChoiceCard({ title, description, selected, icon, className, ...props }: ChoiceCardProps) {
  return (
    <button
      type="button"
      data-slot="choice-card"
      data-selected={selected || undefined}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border border-border bg-surface p-4 text-left",
        "shadow-highlight outline-none",
        "transition-[border-color,background-color,box-shadow] duration-[70ms] ease-hairline",
        "hover:border-fg-subtle",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        selected && "border-accent inset-ring inset-ring-accent hover:border-accent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {icon ? <span aria-hidden className="mt-0.5 text-fg [&_svg]:size-5">{icon}</span> : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium tracking-[0.005em] text-fg">{title}</span>
        {description ? <span className="mt-1 block text-sm leading-[1.55] text-fg-muted">{description}</span> : null}
      </span>
    </button>
  )
}
export { ChoiceCard }
export type { ChoiceCardProps }
