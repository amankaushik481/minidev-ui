"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/registry/ui/label"

type FormFieldProps = {
  id?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  className?: string
  children: React.ReactNode
}

function FormField({ id, label, description, error, required, className, children }: FormFieldProps) {
  return (
    <div data-slot="form-field" className={cn("flex w-full flex-col gap-1.5", className)}>
      {label ? (
        <Label htmlFor={id} className="text-sm font-medium tracking-[0.005em] text-fg">
          {label}
          {required ? <span className="text-danger"> *</span> : null}
        </Label>
      ) : null}
      {children}
      {description && !error ? (
        <p className="text-xs tracking-[0.01em] text-fg-muted">{description}</p>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs tracking-[0.01em] text-danger">{error}</p>
      ) : null}
    </div>
  )
}
export { FormField }
