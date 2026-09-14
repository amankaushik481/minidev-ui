"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

const DEFAULT = [
  { id: "design", label: "Read DESIGN.md", done: true },
  { id: "button", label: "Paste Button into your app", done: true },
  { id: "gallery", label: "Browse the gallery", done: false },
  { id: "showcase", label: "Open /showcase for clients", done: false },
]

function OnboardingChecklist({
  items = DEFAULT,
  className,
}: {
  items?: { id: string; label: string; done?: boolean }[]
  className?: string
}) {
  const [state, setState] = React.useState(items)
  return (
    <div data-slot="onboarding-checklist" className={cn("rounded-2xl border border-border bg-surface p-5 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <h3 className="text-sm font-medium text-fg">Get started</h3>
      <ul className="mt-4 space-y-2">
        {state.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setState((s) => s.map((x) => x.id === item.id ? { ...x, done: !x.done } : x))}
            >
              <span className={cn("flex size-5 items-center justify-center rounded-md border", item.done ? "border-accent bg-accent/15 text-accent" : "border-border text-transparent")}>
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
