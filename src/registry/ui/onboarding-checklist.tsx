"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

/**
 * OnboardingChecklist — a "Get started" card of tickable setup tasks with a done count.
 *
 * Each task is a checkbox (role="checkbox", aria-checked) toggled by click, Space or
 * Enter; the header shows "2 of 4" progress. State is kept inside from `items`;
 * persist it with `onToggle`. Use it on empty dashboards; for a strict linear flow use
 * OnboardingWizard.
 *
 * @example
 * <OnboardingChecklist
 *   title="Set up Lumen"
 *   items={[{ id: "invite", label: "Invite your team" }, { id: "bank", label: "Connect a bank", done: true }]}
 *   onToggle={(id, done) => saveStep(id, done)}
 * />
 */
type OnboardingTask = {
  /** Stable key passed back to onToggle. */
  id: string
  label: string
  /** Starts ticked. */
  done?: boolean
}

type OnboardingChecklistProps = {
  /** Initial tasks in order. */
  items?: OnboardingTask[]
  /** Card heading. */
  title?: string
  /** Fires with the task id and its new done state. */
  onToggle?: (id: string, done: boolean) => void
  className?: string
}

const DEFAULT: OnboardingTask[] = [
  { id: "design", label: "Read DESIGN.md", done: true },
  { id: "button", label: "Paste Button into your app", done: true },
  { id: "gallery", label: "Browse the gallery", done: false },
  { id: "showcase", label: "Open /showcase for clients", done: false },
]

function OnboardingChecklist({ items = DEFAULT, title = "Get started", onToggle, className }: OnboardingChecklistProps) {
  const [state, setState] = React.useState(items)
  const headingId = React.useId()
  const doneCount = state.filter((x) => x.done).length
  return (
    <div data-slot="onboarding-checklist" className={cn("rounded-2xl border border-border bg-surface p-5 shadow-highlight", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 id={headingId} className="text-sm font-medium text-fg">{title}</h3>
        <span className="text-xs text-fg-muted tabular-nums">
          {doneCount} of {state.length}
          <span className="sr-only"> done</span>
        </span>
      </div>
      <ul aria-labelledby={headingId} className="mt-4 space-y-2">
        {state.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              role="checkbox"
              aria-checked={!!item.done}
              className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm outline-none transition-[background-color] duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => {
                setState((s) => s.map((x) => (x.id === item.id ? { ...x, done: !x.done } : x)))
                onToggle?.(item.id, !item.done)
              }}
            >
              <span
                aria-hidden
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-md border transition-[background-color,border-color,color] duration-[70ms]",
                  item.done ? "border-accent bg-accent/15 text-accent" : "border-border text-transparent"
                )}
              >
                <CheckIcon className="size-3.5" />
              </span>
              <span className={cn(item.done && "text-fg-muted line-through")}>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export { OnboardingChecklist }
export type { OnboardingChecklistProps, OnboardingTask }
