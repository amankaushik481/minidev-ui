"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CircleAlertIcon, CreditCardIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "unknown"

type BrandSpec = { brand: CardBrand; label: string; test: RegExp; gaps: number[]; lengths: number[]; cvc: number }

const BRANDS: BrandSpec[] = [
  { brand: "amex", label: "Amex", test: /^3[47]/, gaps: [4, 10], lengths: [15], cvc: 4 },
  { brand: "visa", label: "Visa", test: /^4/, gaps: [4, 8, 12], lengths: [13, 16, 19], cvc: 3 },
  { brand: "mastercard", label: "Mastercard", test: /^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/, gaps: [4, 8, 12], lengths: [16], cvc: 3 },
  { brand: "discover", label: "Discover", test: /^(6011|65|64[4-9]|622)/, gaps: [4, 8, 12], lengths: [16, 19], cvc: 3 },
]
const UNKNOWN: BrandSpec = { brand: "unknown", label: "Card", test: /^/, gaps: [4, 8, 12, 16], lengths: [12, 13, 14, 15, 16, 17, 18, 19], cvc: 3 }

const detect = (digits: string) => BRANDS.find((b) => b.test.test(digits)) ?? UNKNOWN
const maxLen = (b: BrandSpec) => Math.max(...b.lengths)

function group(digits: string, gaps: number[]) {
  let out = ""
  for (let i = 0; i < digits.length; i++) {
    if (gaps.includes(i)) out += " "
    out += digits[i]
  }
  return out
}

/** Luhn (mod 10) checksum, the check digit rule every major card number follows. */
function luhn(digits: string) {
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i])
    if (i % 2 === 1) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return digits.length > 0 && sum % 10 === 0
}

function expiryState(digits: string) {
  if (digits.length < 4) return "incomplete" as const
  const m = Number(digits.slice(0, 2))
  const y = 2000 + Number(digits.slice(2, 4))
  if (m < 1 || m > 12) return "invalid" as const
  const now = new Date()
  if (y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth() + 1)) return "expired" as const
  return "ok" as const
}

// Keeps the caret after the same number of digits once the value is reformatted.
function caretAfterDigits(formatted: string, count: number) {
  let pos = 0
  let seen = 0
  while (pos < formatted.length && seen < count) {
    if (/\d/.test(formatted[pos])) seen++
    pos++
  }
  return pos
}

type CreditCardValue = {
  /** Digits only. */
  number: string
  /** "MM/YY", or partial while typing. */
  expiry: string
  cvc: string
  brand: CardBrand
  name: string
  postalCode: string
  /** Every shown field is complete and passes its check. */
  valid: boolean
}

type Field = "name" | "number" | "expiry" | "cvc" | "postal"

/**
 * Card details fields: the number groups by brand (Visa, Mastercard and
 * Discover 4-4-4-4, Amex 4-6-5) and passes a Luhn check, the brand shows as a
 * text badge, expiry formats to MM / YY and advances on its own, and the CVC
 * expects 4 digits for Amex. Fields carry cc-* autocomplete hints and
 * aria-invalid, and errors appear once a field is left. This is UI only: it
 * formats and checks input in the browser and does not process, tokenize or
 * transmit payments. Hand the values to your payment provider's SDK.
 */
type CreditCardInputProps = {
  /** Called on every edit with the parsed values. */
  onChange?: (value: CreditCardValue) => void
  defaultValue?: Partial<Pick<CreditCardValue, "number" | "expiry" | "cvc" | "name" | "postalCode">>
  /** Show the name on card field. */
  showName?: boolean
  /** Show the postal code field. */
  showPostalCode?: boolean
  /** Show the accepted brands, the detected one highlighted. */
  showBrands?: boolean
  label?: string
  /** Helper line shown while there is no error. */
  hint?: React.ReactNode
  disabled?: boolean
  className?: string
}

function CreditCardInput({
  onChange,
  defaultValue = {},
  showName = true,
  showPostalCode = true,
  showBrands = true,
  label = "Card details",
  hint = "Test with 4242 4242 4242 4242 and any future date.",
  disabled = false,
  className,
}: CreditCardInputProps) {
  const reduce = useReducedMotion()
  const uid = React.useId()
  const [name, setName] = React.useState(defaultValue.name ?? "")
  const [number, setNumber] = React.useState(() => (defaultValue.number ?? "").replace(/\D/g, ""))
  const [expiry, setExpiry] = React.useState(() => (defaultValue.expiry ?? "").replace(/\D/g, "").slice(0, 4))
  const [expiryEager, setExpiryEager] = React.useState(false)
  const [cvcRaw, setCvc] = React.useState(defaultValue.cvc ?? "")
  const [postal, setPostal] = React.useState(defaultValue.postalCode ?? "")
  const [touched, setTouched] = React.useState<Partial<Record<Field, boolean>>>({})
  const refs = React.useRef<Partial<Record<Field, HTMLInputElement | null>>>({})
  const caret = React.useRef<{ field: Field; pos: number } | null>(null)
  const [, force] = React.useReducer((n: number) => n + 1, 0)

  const spec = detect(number)
  const brand = number ? spec.brand : "unknown"
  const cvc = cvcRaw.slice(0, spec.cvc)
  const numberFull = spec.lengths.includes(number.length)
  const numberAtMax = number.length === maxLen(spec)
  const exp = expiryState(expiry)

  const issues: Record<Field, string | null> = {
    name: showName && !name.trim() ? "Enter the name on the card." : null,
    number: !number
      ? "Enter a card number."
      : !numberFull
        ? "Your card number is incomplete."
        : !luhn(number)
          ? "Your card number is invalid."
          : null,
    expiry:
      exp === "incomplete" ? "Your card's expiry date is incomplete." : exp === "invalid" ? "Your card's expiry month is invalid." : exp === "expired" ? "Your card's expiry date is in the past." : null,
    cvc: cvc.length < spec.cvc ? `Your card's security code is ${spec.cvc} digits.` : null,
    postal: showPostalCode && postal.trim().length < 3 ? "Enter a postal code." : null,
  }
  // A full-length number that fails Luhn is flagged right away; everything else waits for blur.
  const shown = (f: Field) => Boolean(issues[f]) && (touched[f] || (f === "number" && numberAtMax && !luhn(number)) || (f === "expiry" && expiry.length === 4))
  const order: Field[] = ["name", "number", "expiry", "cvc", "postal"]
  const firstError = order.find((f) => shown(f))
  const valid = order.every((f) => !issues[f])

  const latest = React.useRef(onChange)
  latest.current = onChange
  const first = React.useRef(true)
  React.useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const ex = expiry.length > 2 ? `${expiry.slice(0, 2)}/${expiry.slice(2)}` : expiry
    latest.current?.({ number, expiry: ex, cvc, brand, name, postalCode: postal, valid })
  }, [number, expiry, cvc, brand, name, postal, valid])

  React.useLayoutEffect(() => {
    const c = caret.current
    if (!c) return
    const el = refs.current[c.field]
    if (el && document.activeElement === el) el.setSelectionRange(c.pos, c.pos)
    caret.current = null
  })

  const advance = (to: Field) => {
    const el = refs.current[to]
    if (el) {
      el.focus()
      el.select()
    }
  }
  const backTo = (to: Field) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && e.currentTarget.value === "" && refs.current[to]) {
      e.preventDefault()
      const el = refs.current[to]!
      el.focus()
      el.setSelectionRange(el.value.length, el.value.length)
    }
  }
  const blur = (f: Field) => () => setTouched((t) => (t[f] ? t : { ...t, [f]: true }))

  const onNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target
    const type = (e.nativeEvent as InputEvent).inputType ?? ""
    const sel = el.selectionStart ?? el.value.length
    let before = el.value.slice(0, sel).replace(/\D/g, "").length
    let digits = el.value.replace(/\D/g, "")
    if (digits === number && type === "deleteContentBackward" && before > 0) {
      // Backspace on a group space removes the digit before it.
      digits = digits.slice(0, before - 1) + digits.slice(before)
      before -= 1
    }
    const next = detect(digits)
    digits = digits.slice(0, maxLen(next))
    before = Math.min(before, digits.length)
    caret.current = { field: "number", pos: caretAfterDigits(group(digits, next.gaps), before) }
    setNumber(digits)
    force()
    const inserting = type.startsWith("insert")
    const done = digits.length === maxLen(next) || (digits.length === 16 && next.lengths.includes(16))
    if (inserting && before === digits.length && done && luhn(digits)) advance("expiry")
  }

  const onExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target
    const type = (e.nativeEvent as InputEvent).inputType ?? ""
    const deleting = type.startsWith("delete")
    const sel = el.selectionStart ?? el.value.length
    let before = el.value.slice(0, sel).replace(/\D/g, "").length
    let digits = el.value.replace(/\D/g, "")
    const atEnd = sel >= el.value.length
    if (digits === expiry && deleting && !atEnd && before > 0) {
      digits = digits.slice(0, before - 1) + digits.slice(before)
      before -= 1
    }
    if (digits.length >= 1 && Number(digits[0]) > 1) {
      digits = "0" + digits
      before += 1
    }
    if (digits.length >= 2 && digits[0] === "1" && Number(digits[1]) > 2) {
      digits = digits[0] + digits.slice(2)
      before = Math.min(before, 1)
    }
    digits = digits.slice(0, 4)
    before = Math.min(before, digits.length)
    const eager = !deleting && digits.length === 2 && before === 2
    const text = formatExpiry(digits, eager)
    caret.current = { field: "expiry", pos: eager ? text.length : caretAfterDigits(text, before) }
    setExpiry(digits)
    setExpiryEager(eager)
    force()
    if (!deleting && digits.length === 4 && before === 4) advance("cvc")
  }

  const onCvc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, spec.cvc)
    setCvc(digits)
    const type = (e.nativeEvent as InputEvent).inputType ?? ""
    if (type.startsWith("insert") && digits.length === spec.cvc && showPostalCode) advance("postal")
  }

  const fieldCls = cn(
    "h-11 w-full min-w-0 bg-transparent px-3 font-mono text-sm text-fg tabular-nums outline-none placeholder:font-sans placeholder:text-fg-subtle",
    "aria-invalid:text-danger disabled:cursor-not-allowed disabled:text-fg-muted"
  )
  const errId = `${uid}-error`
  const described = (f: Field) => (shown(f) && firstError === f ? errId : undefined)
  const anyShown = order.some((f) => shown(f) && f !== "name")

  return (
    <div data-slot="credit-card-input" className={cn("flex w-full max-w-sm min-w-0 flex-col gap-4", className)}>
      {showName ? (
        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-name`} className="text-sm font-medium text-fg">
            Name on card
          </label>
          <input
            id={`${uid}-name`}
            ref={(el) => {
              refs.current.name = el
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={blur("name")}
            autoComplete="cc-name"
            placeholder="Maya Chen"
            spellCheck={false}
            disabled={disabled}
            aria-invalid={shown("name") || undefined}
            aria-describedby={described("name")}
            className={inputVariants({ size: "default" })}
          />
        </div>
      ) : null}

      <div role="group" aria-labelledby={`${uid}-label`} className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span id={`${uid}-label`} className="text-sm font-medium text-fg">
            {label}
          </span>
          {showBrands ? (
            <ul aria-label="Accepted cards" className="flex items-center gap-1">
              {BRANDS.map((b) => (
                <li
                  key={b.brand}
                  aria-current={brand === b.brand || undefined}
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-2xs font-semibold tracking-wide transition-[color,background-color,opacity] duration-[140ms] ease-hairline",
                    brand === b.brand ? "bg-accent-soft text-accent-fg" : "text-fg-subtle",
                    brand !== "unknown" && brand !== b.brand && "opacity-50"
                  )}
                >
                  {b.label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div
          className={cn(
            "overflow-hidden rounded-lg border bg-surface shadow-xs transition-[border-color,box-shadow] duration-[140ms] ease-hairline",
            anyShown ? "border-danger" : "border-border hover:border-border-strong",
            anyShown
              ? "focus-within:shadow-[0_0_0_3px_color-mix(in_oklch,var(--danger)_14%,transparent)]"
              : "focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-soft)]",
            disabled && "bg-sunken shadow-none"
          )}
        >
          <div className="relative">
            <label htmlFor={`${uid}-number`} className="sr-only">
              Card number
            </label>
            <input
              id={`${uid}-number`}
              ref={(el) => {
                refs.current.number = el
              }}
              value={group(number, spec.gaps)}
              onChange={onNumber}
              onBlur={blur("number")}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder={spec.brand === "amex" ? "1234 123456 12345" : "1234 1234 1234 1234"}
              spellCheck={false}
              disabled={disabled}
              aria-invalid={shown("number") || undefined}
              aria-describedby={described("number")}
              className={cn(fieldCls, "pr-28")}
            />
            <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={brand}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6, scale: 0.9, transition: { duration: 0.12 } }}
                  transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.18, duration: 0.42 }}
                  className="flex"
                >
                  {brand === "unknown" ? (
                    <CreditCardIcon aria-hidden className="size-4 text-fg-subtle" />
                  ) : (
                    <span className="rounded-md border border-border bg-sunken px-1.5 py-0.5 text-2xs font-semibold tracking-wide text-fg uppercase">
                      {spec.label}
                    </span>
                  )}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="sr-only" aria-live="polite">
              {brand === "unknown" ? "" : `${spec.label} detected`}
            </span>
          </div>

          <div className={cn("grid border-t border-border", showPostalCode ? "grid-cols-3" : "grid-cols-2")}>
            <div className="min-w-0">
              <label htmlFor={`${uid}-exp`} className="sr-only">
                Expiry date, month and year
              </label>
              <input
                id={`${uid}-exp`}
                ref={(el) => {
                  refs.current.expiry = el
                }}
                value={formatExpiry(expiry, expiryEager)}
                onChange={onExpiry}
                onKeyDown={backTo("number")}
                onBlur={() => {
                  blur("expiry")()
                  setExpiryEager(false)
                }}
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                spellCheck={false}
                disabled={disabled}
                aria-invalid={shown("expiry") || undefined}
                aria-describedby={described("expiry")}
                className={fieldCls}
              />
            </div>
            <div className="min-w-0 border-l border-border">
              <label htmlFor={`${uid}-cvc`} className="sr-only">
                Security code
              </label>
              <input
                id={`${uid}-cvc`}
                ref={(el) => {
                  refs.current.cvc = el
                }}
                value={cvc}
                onChange={onCvc}
                onKeyDown={backTo("expiry")}
                onBlur={blur("cvc")}
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder={spec.cvc === 4 ? "CVC 4" : "CVC"}
                spellCheck={false}
                disabled={disabled}
                aria-invalid={shown("cvc") || undefined}
                aria-describedby={described("cvc")}
                className={fieldCls}
              />
            </div>
            {showPostalCode ? (
              <div className="min-w-0 border-l border-border">
                <label htmlFor={`${uid}-zip`} className="sr-only">
                  Postal code
                </label>
                <input
                  id={`${uid}-zip`}
                  ref={(el) => {
                    refs.current.postal = el
                  }}
                  value={postal}
                  onChange={(e) => setPostal(e.target.value.toUpperCase().replace(/[^A-Z0-9 -]/g, "").slice(0, 10))}
                  onKeyDown={backTo("cvc")}
                  onBlur={blur("postal")}
                  autoComplete="postal-code"
                  placeholder="ZIP"
                  spellCheck={false}
                  disabled={disabled}
                  aria-invalid={shown("postal") || undefined}
                  aria-describedby={described("postal")}
                  className={fieldCls}
                />
              </div>
            ) : null}
          </div>
        </div>

        <p id={errId} aria-live="polite" className={cn("flex min-h-5 items-start gap-1.5 text-xs", firstError ? "text-danger" : "text-fg-subtle")}>
          {firstError ? (
            <>
              <CircleAlertIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
              <span>{issues[firstError]}</span>
            </>
          ) : valid ? (
            <span className="text-success">Card details look complete.</span>
          ) : (
            <span>{hint}</span>
          )}
        </p>
      </div>
    </div>
  )
}

function formatExpiry(digits: string, eager: boolean) {
  if (digits.length < 2) return digits
  if (digits.length === 2) return eager ? `${digits} / ` : digits
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`
}

export { CreditCardInput, luhn }
export type { CreditCardInputProps, CreditCardValue, CardBrand }
