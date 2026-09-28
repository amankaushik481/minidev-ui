"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type ChoiceCardProps = React.ComponentProps<"button"> & {
  title: React.ReactNode
  description?: React.ReactNode
  selected?: boolean
  icon?: React.ReactNode
}

function ChoiceCard({ title, description, selected, icon, className, ...props }: ChoiceCardProps) {
  return (
    <button
      type="button"
      data-slot="choice-card"
      aria-pressed={selected || undefined}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border border-border bg-surface p-4 text-left",
        "shadow-highlight outline-none",
        "transition-[border-color,background-color,box-shadow] duration-[70ms]",
        "hover:border-fg-subtle",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        selected && "border-accent bg-surface shadow-[inset_0_0_0_1px_var(--accent)]",
        "disabled:opacity-50",
        className
      )}
      {...props}
    >
      {icon ? <span className="mt-0.5 text-fg [&_svg]:size-5">{icon}</span> : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium tracking-[0.005em] text-fg">{title}</span>
        {description ? (
          <span className="mt-1 block text-sm leading-[1.55] text-fg">{description}</span>
        ) : null}
      </span>
    </button>
  )
}
export { ChoiceCard }
