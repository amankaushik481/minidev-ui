"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "w-full min-w-0 rounded-lg border border-border bg-surface text-fg",
    "px-3 shadow-xs",
    "text-sm",
    "outline-none",
    "placeholder:text-fg-subtle",
    "transition-[border-color,box-shadow,background-color] duration-[140ms] ease-hairline",
    "hover:border-border-strong",
    "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
    "disabled:cursor-not-allowed disabled:bg-sunken disabled:text-fg-muted disabled:shadow-none",
    "aria-invalid:border-danger aria-invalid:focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--danger)_14%,transparent)]",
    "file:mr-3 file:h-full file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-fg",
    "read-only:bg-sunken read-only:focus-visible:shadow-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 text-[0.8125rem]",
        default: "h-9",
        lg: "h-11 px-3.5 text-[0.9375rem]",
      },
    },
    defaultVariants: { size: "default" },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size" | "prefix"> &
  VariantProps<typeof inputVariants>

function Input({ className, type, size = "default", ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
export type { InputProps }
