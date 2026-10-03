"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { CircleAlertIcon, MailIcon, UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const

type FloatingLabelField = {
  name: string
  label: string
  type?: string
  multiline?: boolean
  icon?: React.ReactNode
  hint?: string
  autoComplete?: string
  defaultValue?: string
  required?: boolean
  /** Return an error message, or nothing when valid. Runs on submit and after the first error. */
  validate?: (value: string) => string | undefined
}

const FIELDS: FloatingLabelField[] = [
  { name: "name", label: "Full name", icon: <UserIcon />, autoComplete: "name", defaultValue: "Maya Chen", required: true },
  {
    name: "email",
    label: "Work email",
    type: "email",
    icon: <MailIcon />,
    autoComplete: "email",
    hint: "We send your Lumen invite here.",
    required: true,
    validate: (v) => (!v ? "Enter your work email." : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? undefined : "That email looks incomplete."),
  },
  { name: "message", label: "What will Northwind use Lumen for?", multiline: true, hint: "Optional, a sentence or two is plenty." },
]

/**
 * A text field whose label rests inside the input and floats up onto the top
 * border on focus or once filled, on a snappy spring (instant with reduced
 * motion). Input and textarea variants, helper text, an error state wired to
 * aria-invalid and aria-describedby, and an optional leading icon. The label
 * is a real <label> bound to the field. Pass `label` for a single field;
 * without it the component renders a small sign-up form from `fields`.
 */
type FloatingLabelInputProps = {
  /** The field label. When omitted, the `fields` form is rendered instead. */
  label?: string
  /** Render a textarea instead of an input. */
  multiline?: boolean
  rows?: number
  type?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** Icon shown at the start of the field (inputs only). */
  icon?: React.ReactNode
  hint?: React.ReactNode
  /** Error message. Marks the field invalid and replaces the hint. */
  error?: React.ReactNode
  disabled?: boolean
  required?: boolean
  id?: string
  name?: string
  autoComplete?: string
  /** Fields of the sample form rendered when no `label` is passed. */
  fields?: FloatingLabelField[]
  /** Called with the form values when the sample form is submitted and valid. */
  onSubmit?: (values: Record<string, string>) => void
  className?: string
}

function FloatingLabelInput({
  label,
  multiline = false,
  rows = 4,
  type = "text",
  value,
  defaultValue = "",
  onChange,
  icon,
  hint,
  error,
  disabled = false,
  required = false,
  id,
  name,
  autoComplete,
  fields = FIELDS,
  onSubmit,
  className,
}: FloatingLabelInputProps) {
  if (label === undefined) return <SampleForm fields={fields} onSubmit={onSubmit} className={className} />
  return (
    <FloatingField
      label={label}
      multiline={multiline}
      rows={rows}
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      icon={icon}
      hint={hint}
      error={error}
      disabled={disabled}
      required={required}
      id={id}
      name={name}
      autoComplete={autoComplete}
      className={cn("w-full max-w-sm", className)}
    />
  )
}

type FieldProps = Omit<FloatingLabelInputProps, "fields" | "onSubmit" | "label"> & { label: string; onBlur?: () => void }

function FloatingField({
  label,
  multiline,
  rows = 4,
  type = "text",
  value,
  defaultValue = "",
  onChange,
  onBlur,
  icon,
  hint,
  error,
  disabled,
  required,
  id,
  name,
  autoComplete,
  className,
}: FieldProps) {
  const reduce = useReducedMotion()
  const auto = React.useId()
  const fieldId = id ?? auto
  const [inner, setInner] = React.useState(defaultValue)
  const [focused, setFocused] = React.useState(false)
  const [autofilled, setAutofilled] = React.useState(false)
  const ref = React.useRef<HTMLInputElement & HTMLTextAreaElement>(null)
  const v = value ?? inner
  const floated = focused || v.length > 0 || autofilled
  const withIcon = Boolean(icon) && !multiline
  const invalid = Boolean(error)
  const describedBy = error || hint ? `${fieldId}-help` : undefined

  React.useEffect(() => {
    // Browsers autofill without firing change; float the label so it never sits on the text.
    const el = ref.current
    if (!el) return
    const check = () => {
      try {
        setAutofilled(el.matches(":autofill"))
      } catch {
        /* selector unsupported */
      }
    }
    const t = window.setTimeout(check, 400)
    el.addEventListener("animationstart", check)
    return () => {
      window.clearTimeout(t)
      el.removeEventListener("animationstart", check)
    }
  }, [])

  const restY = 12
  const shared = {
    id: fieldId,
    name,
    value: v,
    disabled,
    required,
    autoComplete,
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy,
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false)
      onBlur?.()
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (value === undefined) setInner(e.target.value)
      setAutofilled(false)
      onChange?.(e.target.value)
    },
    className: cn(
      "peer block w-full min-w-0 rounded-lg border border-border bg-surface px-3 text-sm text-fg shadow-xs outline-none",
      "transition-[border-color,box-shadow] duration-[140ms] ease-hairline",
      "hover:border-border-strong",
      "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
      "aria-invalid:border-danger aria-invalid:focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--danger)_14%,transparent)]",
      "disabled:cursor-not-allowed disabled:bg-sunken disabled:text-fg-muted disabled:shadow-none",
      multiline ? "min-h-28 resize-y py-3 leading-5" : "h-11",
      withIcon && "pl-9"
    ),
  }

  return (
    <div data-slot="floating-label-input" className={cn("flex flex-col gap-1.5", className)}>
      <div className="relative">
        {multiline ? <textarea ref={ref} rows={rows} {...shared} /> : <input ref={ref} type={type} {...shared} />}
        {withIcon ? (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-0 left-3 flex h-11 items-center transition-colors duration-[70ms] [&_svg]:size-4",
              invalid ? "text-danger" : focused ? "text-accent-fg" : "text-fg-subtle"
            )}
          >
            {icon}
          </span>
        ) : null}
        <motion.label
          htmlFor={fieldId}
          initial={false}
          animate={floated ? { x: 8, y: -10, scale: 0.85 } : { x: withIcon ? 32 : 8, y: restY, scale: 1 }}
          transition={reduce ? { duration: 0 } : SNAPPY}
          style={{ transformOrigin: "0% 50%" }}
          className={cn(
            "pointer-events-none absolute top-0 left-0 max-w-[calc(100%-1.5rem)] truncate rounded-md px-1 text-sm leading-5 select-none",
            "bg-[linear-gradient(to_bottom,transparent_45%,var(--surface)_45%)]",
            "transition-colors duration-[70ms]",
            invalid ? "text-danger" : focused ? "text-accent-fg" : floated ? "text-fg-muted" : "text-fg-subtle",
            disabled && "bg-[linear-gradient(to_bottom,transparent_45%,var(--sunken)_45%)]"
          )}
        >
          {label}
          {required ? (
            <span aria-hidden className="ml-0.5 text-fg-subtle">
              *
            </span>
          ) : null}
        </motion.label>
      </div>
      {error || hint ? (
        <p id={describedBy} aria-live="polite" className={cn("flex items-start gap-1.5 px-1 text-xs", invalid ? "text-danger" : "text-fg-subtle")}>
          {invalid ? <CircleAlertIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" /> : null}
          <span>{error ?? hint}</span>
        </p>
      ) : null}
    </div>
  )
}

function SampleForm({ fields, onSubmit, className }: { fields: FloatingLabelField[]; onSubmit?: (values: Record<string, string>) => void; className?: string }) {
  const [values, setValues] = React.useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""])))
  const [errors, setErrors] = React.useState<Record<string, string | undefined>>({})
  const [sent, setSent] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)

  const check = (f: FloatingLabelField, v: string) => f.validate?.(v) ?? (f.required && !v.trim() ? `Enter your ${f.label.toLowerCase()}.` : undefined)

  return (
    <form
      ref={formRef}
      noValidate
      data-slot="floating-label-input"
      aria-label="Join the Lumen beta"
      className={cn("flex w-full max-w-sm flex-col gap-4", className)}
      onSubmit={(e) => {
        e.preventDefault()
        const next = Object.fromEntries(fields.map((f) => [f.name, check(f, values[f.name] ?? "")]))
        setErrors(next)
        const first = fields.find((f) => next[f.name])
        if (first) {
          formRef.current?.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus()
          setSent(false)
          return
        }
        setSent(true)
        onSubmit?.(values)
      }}
    >
      <div className="flex flex-col gap-0.5">
        <p className="text-lg font-semibold tracking-tight text-fg">Join the Lumen beta</p>
        <p className="text-sm text-fg-muted">Northwind gets early access to invoicing and payouts.</p>
      </div>
      {fields.map((f) => (
        <FloatingField
          key={f.name}
          name={f.name}
          label={f.label}
          type={f.type}
          multiline={f.multiline}
          rows={3}
          icon={f.icon}
          hint={f.hint}
          autoComplete={f.autoComplete}
          required={f.required}
          value={values[f.name] ?? ""}
          error={errors[f.name]}
          onChange={(v) => {
            setValues((s) => ({ ...s, [f.name]: v }))
            setSent(false)
            if (errors[f.name]) setErrors((s) => ({ ...s, [f.name]: check(f, v) }))
          }}
        />
      ))}
      <div className="flex items-center justify-between gap-3 pt-1">
        <p aria-live="polite" className={cn("text-xs", sent ? "text-success" : "text-fg-subtle")}>
          {sent ? "Request sent. Watch your inbox." : "Takes about a minute."}
        </p>
        <Button type="submit">Request access</Button>
      </div>
    </form>
  )
}

export { FloatingLabelInput }
export type { FloatingLabelInputProps, FloatingLabelField }
