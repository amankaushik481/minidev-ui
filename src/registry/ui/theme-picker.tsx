"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const MODES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
] as const

function ThemePicker({
  value = "system",
  onChange,
  className,
}: {
  value?: "light" | "dark" | "system"
  onChange?: (v: "light" | "dark" | "system") => void
  className?: string
}) {
  return (
    <div data-slot="theme-picker" className={cn("inline-flex rounded-lg border border-border bg-surface p-1", className)} role="radiogroup" aria-label="Theme">
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          role="radio"
          aria-checked={value === m.id}
          onClick={() => {
            onChange?.(m.id)
            if (m.id === "light") document.documentElement.classList.remove("dark")
            if (m.id === "dark") document.documentElement.classList.add("dark")
          }}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-accent",
            value === m.id ? "bg-sunken text-fg" : "text-fg-muted hover:text-fg"
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
export { ThemePicker }
