"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * LanguagePicker — a grid of language choices where exactly one is selected, each written in its own language.
 *
 * Works as a radio group: Tab enters at the selected language, arrow keys move
 * and select, Home and End jump to the ends. Use it in settings or onboarding
 * for a handful of languages. For long lists use Select or Combobox; for
 * regions use RegionPicker.
 *
 * @example
 * <LanguagePicker value={lang} onChange={setLang} options={[{ id: "en", label: "English" }, { id: "fr", label: "Français" }]} />
 */
type LanguageOption = {
  /** BCP 47 code, for example "en" or "pt-BR"; also sets the label's lang attribute. */
  id: string
  /** The language's name in that language, for example "Deutsch". */
  label: string
}

type LanguagePickerProps = {
  /** Selected language id (controlled). */
  value?: string
  /** Initial language id when uncontrolled. */
  defaultValue?: string
  /** Called with the chosen language id. */
  onChange?: (id: string) => void
  /** Languages to offer. Defaults to English, Spanish, German and Japanese. */
  options?: LanguageOption[]
  /** Accessible name for the group. */
  label?: string
  className?: string
}

const LANGS: LanguageOption[] = [
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
  { id: "de", label: "Deutsch" },
  { id: "ja", label: "日本語" },
]

function LanguagePicker({ value, defaultValue = "en", onChange, options = LANGS, label = "Language", className }: LanguagePickerProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const selected = value ?? inner
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const current = options.findIndex((l) => l.id === selected)
  const select = (i: number) => {
    const id = options[i].id
    if (value === undefined) setInner(id)
    onChange?.(id)
  }

  return (
    <div data-slot="language-picker" role="radiogroup" aria-label={label} className={cn("grid gap-1 sm:grid-cols-2", className)}>
      {options.map((l, i) => {
        const on = l.id === selected
        return (
          <button
            key={l.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on || (current === -1 && i === 0) ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              const n = options.length
              const to =
                e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n
                : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n
                : e.key === "Home" ? 0
                : e.key === "End" ? n - 1
                : -1
              if (to < 0) return
              e.preventDefault()
              refs.current[to]?.focus()
              select(to)
            }}
            className={cn(
              "rounded-lg border px-3 py-2 text-left text-sm text-fg outline-none transition-[border-color,background-color] duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              on ? "border-accent bg-accent-soft" : "border-border bg-surface hover:border-fg-subtle"
            )}
          >
            <span lang={l.id}>{l.label}</span>
          </button>
        )
      })}
    </div>
  )
}
export { LanguagePicker }
export type { LanguagePickerProps, LanguageOption }
