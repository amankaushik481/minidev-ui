"use client"
import * as React from "react"
import { CheckIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { PasswordInput } from "@/registry/ui/password-input"

/**
 * PasswordStrength — a new-password field with a four segment strength meter and a live checklist of rules.
 *
 * The score is announced politely as it changes, rules are plain text for screen
 * readers ("(met)" / "(not met)"), and nothing blocks typing. Swap in your own scorer
 * (for example zxcvbn) with the `score` prop and your own policy with `rules`. Use it
 * on sign-up and change-password forms; on sign-in use PasswordInput alone.
 *
 * @example
 * <PasswordStrength
 *   label="New password"
 *   onChange={setPassword}
 *   rules={[{ label: "At least 12 characters", test: (v) => v.length >= 12 }]}
 * />
 */
type Rule = {
  /** Shown in the checklist. */
  label: string
  /** Returns true when the password satisfies the rule. */
  test: (value: string) => boolean
}

type PasswordStrengthProps = {
  /** Controlled password. */
  value?: string
  /** Initial password when uncontrolled. */
  defaultValue?: string
  /** Fires with the password on every edit. */
  onChange?: (value: string) => void
  /** Rules shown in the checklist. */
  rules?: Rule[]
  /** Override the built in 0 to 4 score. */
  score?: (value: string) => number
  /** Visible label above the field. */
  label?: string
  /** Input id; also prefixes the meter and checklist ids. */
  id?: string
  /** Form field name. */
  name?: string
  className?: string
}

const DEFAULT_RULES: Rule[] = [
  { label: "At least 12 characters", test: (v) => v.length >= 12 },
  { label: "Upper and lower case letters", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { label: "A number", test: (v) => /\d/.test(v) },
  { label: "A symbol", test: (v) => /[^A-Za-z0-9]/.test(v) },
]

const LEVELS = [
  { label: "Too weak", tone: "bg-danger", text: "text-danger" },
  { label: "Weak", tone: "bg-danger", text: "text-danger" },
  { label: "Fair", tone: "bg-warning", text: "text-[color-mix(in_oklch,var(--warning)_70%,var(--fg))]" },
  { label: "Good", tone: "bg-success", text: "text-success" },
  { label: "Strong", tone: "bg-success", text: "text-success" },
]

function defaultScore(v: string, rules: Rule[]) {
  if (!v) return 0
  const passed = rules.filter((r) => r.test(v)).length
  const long = v.length >= 16 ? 1 : 0
  return Math.max(1, Math.min(4, passed - (v.length < 8 ? 1 : 0) + long))
}

function PasswordStrength({ value, defaultValue = "", onChange, rules = DEFAULT_RULES, score, label = "Password", id, name, className }: PasswordStrengthProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const v = value ?? inner
  const s = score ? Math.max(0, Math.min(4, Math.round(score(v)))) : defaultScore(v, rules)
  const level = LEVELS[s]
  const auto = React.useId()
  const fieldId = id ?? auto
  return (
    <div data-slot="password-strength" className={cn("w-full max-w-sm space-y-2.5", className)}>
      <label htmlFor={fieldId} className="text-sm font-medium text-fg">
        {label}
      </label>
      <PasswordInput
        id={fieldId}
        name={name}
        value={v}
        autoComplete="new-password"
        aria-describedby={`${fieldId}-strength ${fieldId}-rules`}
        onChange={(e) => {
          if (value === undefined) setInner(e.target.value)
          onChange?.(e.target.value)
        }}
      />
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1" aria-hidden>
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className={cn("h-1.5 flex-1 rounded-full transition-[background-color] duration-[140ms] ease-hairline", v && n <= s ? level.tone : "bg-border")} />
          ))}
        </div>
        <span id={`${fieldId}-strength`} aria-live="polite" className={cn("min-w-14 text-right text-xs font-medium", v ? level.text : "text-fg-subtle")}>
          {v ? level.label : "Empty"}
        </span>
      </div>
      <ul id={`${fieldId}-rules`} className="space-y-1">
        {rules.map((r) => {
          const ok = r.test(v)
          return (
            <li key={r.label} className={cn("flex items-center gap-2 text-xs transition-[color] duration-[70ms]", ok ? "text-fg" : "text-fg-muted")}>
              <span aria-hidden className={cn("grid size-4 shrink-0 place-items-center rounded-full", ok ? "bg-success/15 text-success" : "bg-sunken text-fg-subtle")}>
                {ok ? <CheckIcon className="size-3" strokeWidth={3} /> : <XIcon className="size-2.5" strokeWidth={3} />}
              </span>
              {r.label}
              <span className="sr-only">{ok ? "(met)" : "(not met)"}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { PasswordStrength }
export type { PasswordStrengthProps }
