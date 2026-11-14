"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/registry/ui/label"

/**
 * FormField — a label, a control, and a description or error message stacked with the right spacing and wiring.
 *
 * Pass the control's `id` as `id`. When the child is a single element,
 * FormField links it to the description or error with `aria-describedby`
 * and sets `aria-invalid` while there is an error, so screen readers read
 * the message. Use around `Input`, `Textarea`, `Select` and friends. For a
 * label that floats inside the input use `FloatingLabelInput`.
 *
 * @example
 * <FormField id="email" label="Work email" description="We send invoices here." error={errors.email} required>
 *   <Input id="email" type="email" required />
 * </FormField>
 */
type FormFieldProps = {
  /** The control's id; the label points at it. */
  id?: string
  /** Visible label. */
  label?: React.ReactNode
  /** Help text under the control. Hidden while there is an error. */
  description?: React.ReactNode
  /** Error message. Replaces the description and marks the control invalid. */
  error?: React.ReactNode
  /** Adds a visual asterisk. Also set `required` on the control itself. */
  required?: boolean
  className?: string
  /** The control, usually one element with the same `id`. */
  children: React.ReactNode
}

function FormField({ id, label, description, error, required, className, children }: FormFieldProps) {
  const auto = React.useId()
  const base = id ?? auto
  const msgId = error ? `${base}-error` : description ? `${base}-description` : undefined
  const only =
    React.isValidElement(children) && children.type !== React.Fragment ? (children as React.ReactElement<Record<string, unknown>>) : null
  const control = only
    ? React.cloneElement(only, {
        "aria-describedby": [only.props["aria-describedby"], msgId].filter(Boolean).join(" ") || undefined,
        "aria-invalid": only.props["aria-invalid"] ?? (error ? true : undefined),
      })
    : children
  return (
    <div data-slot="form-field" data-invalid={error ? true : undefined} className={cn("flex w-full flex-col gap-1.5", className)}>
      {label ? (
        <Label htmlFor={id} className="text-sm font-medium tracking-[0.005em] text-fg">
          {label}
          {required ? (
            <span aria-hidden className="text-danger">
              {" "}
              *
            </span>
          ) : null}
        </Label>
      ) : null}
      {control}
      {description && !error ? (
        <p id={msgId} className="text-xs tracking-[0.01em] text-fg-muted">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={msgId} role="alert" className="text-xs tracking-[0.01em] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
export { FormField }
export type { FormFieldProps }
