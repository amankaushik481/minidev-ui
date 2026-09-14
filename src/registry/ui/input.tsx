"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "w-full min-w-0 rounded-lg border border-border bg-surface text-fg",
    "px-3 shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]",
    "text-sm tracking-[0.005em]",
    "outline-none",
    "placeholder:text-fg-muted",
    "transition-[color,background-color,border-color,box-shadow] duration-[70ms]",
    "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:cursor-not-allowed disabled:bg-sunken disabled:text-fg-muted",
    "aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/30",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "read-only:bg-sunken read-only:focus-visible:ring-0",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 text-[0.8125rem]",
        default: "h-9",
        lg: "h-11 text-base tracking-normal",
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
