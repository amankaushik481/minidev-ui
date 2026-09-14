"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const LANGS = [
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
  { id: "de", label: "Deutsch" },
  { id: "ja", label: "日本語" },
]

function LanguagePicker({
  value = "en",
  onChange,
  className,
}: {
  value?: string
  onChange?: (id: string) => void
  className?: string
}) {
  return (
    <div data-slot="language-picker" role="listbox" aria-label="Language" className={cn("grid gap-1 sm:grid-cols-2", className)}>
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          role="option"
          aria-selected={value === l.id}
          onClick={() => onChange?.(l.id)}
          className={cn(
            "rounded-lg border px-3 py-2 text-left text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent",
            value === l.id ? "border-accent bg-surface shadow-[inset_0_0_0_1px_var(--accent)]" : "border-border bg-surface hover:border-fg-subtle"
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
export { LanguagePicker }
