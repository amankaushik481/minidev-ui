"use client"
import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

type Token = { kind: "slot"; test: RegExp } | { kind: "lit"; ch: string }

const SLOT: Record<string, RegExp> = { "9": /^\d$/, A: /^\p{L}$/u, "*": /^[\p{L}\d]$/u }

// "9" digit, "A" letter, "*" letter or digit. Anything else is a literal; "\\9" escapes a token.
function parseMask(mask: string): Token[] {
  const out: Token[] = []
  for (let i = 0; i < mask.length; i++) {
    const c = mask[i]
    if (c === "\\" && i + 1 < mask.length) out.push({ kind: "lit", ch: mask[++i] })
    else if (SLOT[c]) out.push({ kind: "slot", test: SLOT[c] })
    else out.push({ kind: "lit", ch: c })
  }
  return out
}

// Fits characters into slots in order, dropping any that do not fit.
function fit(tokens: Token[], chars: string, upper: boolean) {
  const slots = tokens.filter((t): t is Extract<Token, { kind: "slot" }> => t.kind === "slot")
  let raw = ""
  for (const ch0 of chars) {
    if (raw.length >= slots.length) break
    const ch = upper ? ch0.toUpperCase() : ch0
    if (slots[raw.length].test.test(ch)) raw += ch
  }
  return raw
}

// Literals are written only when a character follows them (or, while typing, right after the last one).
function render(tokens: Token[], raw: string, eager: boolean) {
  let out = ""
  let r = 0
  for (const t of tokens) {
    if (t.kind === "lit") {
      if (r < raw.length || (eager && raw.length > 0)) out += t.ch
      else break
    } else {
      if (r >= raw.length) break
      out += raw[r++]
    }
  }
  return out
}

/** Formats a value with a mask, e.g. applyMask("(999) 999-9999", "5550102030") gives "(555) 010-2030". */
function applyMask(mask: string, value: string, uppercase = false) {
  const tokens = parseMask(mask)
  return render(tokens, fit(tokens, value, uppercase), false)
}

type MaskedValue = { masked: string; raw: string; complete: boolean }

type MaskedInputExample = {
  label: string
  mask: string
  guide?: boolean | string
  defaultValue?: string
  uppercase?: boolean
  hint?: string
  autoComplete?: string
}

const EXAMPLES: MaskedInputExample[] = [
  { label: "Phone", mask: "(999) 999-9999", defaultValue: "4155550142", autoComplete: "tel-national", hint: "US numbers only" },
  { label: "Invoice date", mask: "99/99/9999", guide: "MM/DD/YYYY", defaultValue: "0918" },
  { label: "Fleet plate", mask: "AAA-9999", guide: "ABC-1234", uppercase: true, hint: "Letters are capitalised for you" },
  { label: "IBAN", mask: "AA99 **** 9999 9999 9999 99", uppercase: true, hint: "Paste it with or without spaces" },
]

/**
 * A text input that formats as you type from a mask such as "(999) 999-9999"
 * ("9" digit, "A" letter, "*" letter or digit, "\\" escapes). The caret stays
 * where you expect on insert, delete and paste, pasted text is refitted to the
 * mask, and an optional guide shows the characters still to come. onChange
 * returns the masked string, the raw characters and whether the mask is full.
 * Pass `mask` for a single field; without it the component renders `examples`.
 */
type MaskedInputProps = {
  /** The mask. When omitted, the `examples` list is rendered instead. */
  mask?: string
  label?: React.ReactNode
  /** Raw value (slot characters only), for a controlled field. */
  value?: string
  defaultValue?: string
  onChange?: (value: MaskedValue) => void
  /** Show the remaining mask while typing. `true` uses `guideChar`; a string is a template as long as the mask, e.g. "MM/DD/YYYY". */
  guide?: boolean | string
  guideChar?: string
  /** Capitalise letters as they are typed. */
  uppercase?: boolean
  placeholder?: string
  hint?: React.ReactNode
  /** Show a check once every slot is filled. */
  showComplete?: boolean
  /** Show the raw value (slot characters only) under the field. */
  showRaw?: boolean
  invalid?: boolean
  disabled?: boolean
  required?: boolean
  id?: string
  name?: string
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
  /** Fields rendered when no `mask` is passed. */
  examples?: MaskedInputExample[]
  className?: string
}

function MaskedInput({
  mask,
  label,
  value,
  defaultValue = "",
  onChange,
  guide = true,
  guideChar = "_",
  uppercase = false,
  placeholder,
  hint,
  showComplete = true,
  showRaw = true,
  invalid = false,
  disabled = false,
  required = false,
  id,
  name,
  autoComplete = "off",
  inputMode,
  examples = EXAMPLES,
  className,
}: MaskedInputProps) {
  if (mask === undefined) {
    return (
      <div data-slot="masked-input" className={cn("flex w-full max-w-sm flex-col gap-5", className)}>
        {examples.map((ex) => (
          <MaskedField key={ex.label} guide={guide} guideChar={guideChar} {...ex} />
        ))}
      </div>
    )
  }
  return (
    <MaskedField
      mask={mask}
      label={label}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      guide={guide}
      guideChar={guideChar}
      uppercase={uppercase}
      placeholder={placeholder}
      hint={hint}
      showComplete={showComplete}
      showRaw={showRaw}
      invalid={invalid}
      disabled={disabled}
      required={required}
      id={id}
      name={name}
      autoComplete={autoComplete}
      inputMode={inputMode}
      className={cn("w-full max-w-sm", className)}
    />
  )
}

type FieldProps = Omit<MaskedInputProps, "mask" | "examples"> & { mask: string }

function MaskedField({
  mask,
  label,
  value,
  defaultValue = "",
  onChange,
  guide = true,
  guideChar = "_",
  uppercase = false,
  placeholder,
  hint,
  showComplete = true,
  showRaw = true,
  invalid,
  disabled,
  required,
  id,
  name,
  autoComplete = "off",
  inputMode,
  className,
}: FieldProps) {
  const tokens = React.useMemo(() => parseMask(mask), [mask])
  const slotPos = React.useMemo(() => tokens.flatMap((t, i) => (t.kind === "slot" ? [i] : [])), [tokens])
  const [inner, setInner] = React.useState(() => fit(tokens, defaultValue, uppercase))
  const raw = value !== undefined ? fit(tokens, value, uppercase) : inner
  const [eager, setEager] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [, force] = React.useReducer((n: number) => n + 1, 0)
  const ref = React.useRef<HTMLInputElement>(null)
  const caret = React.useRef<number | null>(null)
  const auto = React.useId()
  const fieldId = id ?? auto
  const display = render(tokens, raw, eager)
  const complete = raw.length === slotPos.length

  const template = React.useMemo(() => {
    const t = tokens.map((tk) => (tk.kind === "lit" ? tk.ch : guideChar)).join("")
    return typeof guide === "string" && guide.length === t.length ? guide : t
  }, [tokens, guide, guideChar])
  const showGuide = guide !== false && (focused || raw.length > 0)
  const numeric = tokens.every((t) => t.kind === "lit" || t.test === SLOT["9"])

  React.useLayoutEffect(() => {
    const el = ref.current
    if (caret.current === null || !el || document.activeElement !== el) return
    el.setSelectionRange(caret.current, caret.current)
    caret.current = null
  })

  // Raw index of a position in the displayed string (display is always a prefix of the mask).
  const rawAt = (pos: number) => Math.min(raw.length, slotPos.filter((p) => p < pos).length)

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    const prev = display
    const sel = e.target.selectionStart ?? next.length
    const type = (e.nativeEvent as InputEvent).inputType ?? ""
    let p = 0
    while (p < prev.length && p < next.length && p < sel && prev[p] === next[p]) p++
    let q = 0
    while (q < prev.length - p && q < next.length - Math.max(p, sel) && prev[prev.length - 1 - q] === next[next.length - 1 - q]) q++
    const inserted = next.slice(p, next.length - q)
    const removed = prev.slice(p, prev.length - q)
    let rs = rawAt(p)
    let re = rawAt(prev.length - q)
    if (!inserted && removed && rs === re && re < raw.length) {
      // Only literals were removed in the middle: remove the neighbouring character instead.
      if (type.includes("Forward")) re += 1
      else rs = Math.max(0, rs - 1)
    }
    const accepted: string[] = []
    let m = p
    for (const ch0 of inserted) {
      while (m < tokens.length && tokens[m].kind === "lit" && (tokens[m] as { ch: string }).ch !== ch0) m++
      if (m >= tokens.length) break
      const t = tokens[m]
      if (t.kind === "lit") {
        m++
        continue
      }
      const ch = uppercase ? ch0.toUpperCase() : ch0
      if (t.test.test(ch)) {
        accepted.push(ch)
        m++
      }
    }
    const nextRaw = fit(tokens, raw.slice(0, rs) + accepted.join("") + raw.slice(re), uppercase)
    const rc = Math.min(nextRaw.length, rs + accepted.length)
    const nextEager = inserted.length > 0 && rc >= nextRaw.length
    const shown = render(tokens, nextRaw, nextEager)
    if (inserted) caret.current = rc >= nextRaw.length ? shown.length : slotPos[rc]
    else caret.current = rc === 0 ? (nextRaw.length ? slotPos[0] : 0) : slotPos[rc - 1] + 1
    setEager(nextEager)
    if (value === undefined) setInner(nextRaw)
    force()
    if (nextRaw !== raw) onChange?.({ masked: render(tokens, nextRaw, false), raw: nextRaw, complete: nextRaw.length === slotPos.length })
  }

  const hintId = hint ? `${fieldId}-hint` : undefined

  return (
    <div data-slot="masked-input-field" className={cn("flex flex-col gap-2", className)}>
      {label ? (
        <label htmlFor={fieldId} className="text-sm font-medium text-fg">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          ref={ref}
          id={fieldId}
          name={name}
          type="text"
          value={display}
          onChange={handle}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            setEager(false)
          }}
          placeholder={showGuide ? undefined : (placeholder ?? template)}
          inputMode={inputMode ?? (numeric ? "numeric" : "text")}
          autoComplete={autoComplete}
          autoCapitalize={uppercase ? "characters" : "off"}
          autoCorrect="off"
          spellCheck={false}
          disabled={disabled}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={hintId}
          data-complete={complete || undefined}
          className={cn(inputVariants({ size: "default" }), "pr-9 font-mono tabular-nums")}
        />
        {showGuide ? (
          <span aria-hidden className="pointer-events-none absolute inset-y-0 right-px left-px flex items-center overflow-hidden px-3 font-mono text-sm whitespace-pre tabular-nums">
            <span className="invisible">{display}</span>
            <span className="text-fg-subtle opacity-70">{template.slice(display.length)}</span>
          </span>
        ) : null}
        {showComplete ? (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-1/2 right-2.5 grid size-4 -translate-y-1/2 place-items-center rounded-full bg-success text-on-accent",
              "transition-[opacity,transform] duration-[140ms] ease-hairline",
              complete && !invalid ? "scale-100 opacity-100" : "scale-75 opacity-0"
            )}
          >
            <CheckIcon className="size-2.5" strokeWidth={3.5} />
          </span>
        ) : null}
      </div>
      {hint || showRaw ? (
        <div className="flex min-h-5 items-baseline justify-between gap-3">
          {hint ? (
            <p id={hintId} className={cn("text-xs", invalid ? "text-danger" : "text-fg-subtle")}>
              {hint}
            </p>
          ) : (
            <span />
          )}
          {showRaw && raw ? (
            <span className="shrink-0 truncate font-mono text-2xs text-fg-subtle tabular-nums">
              <span className="sr-only">Raw value </span>
              {raw}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export { MaskedInput, applyMask }
export type { MaskedInputProps, MaskedValue, MaskedInputExample }
