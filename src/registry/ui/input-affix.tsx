"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input, type InputProps } from "@/registry/ui/input"

type InputAffixProps = InputProps & {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  containerClassName?: string
}

function InputAffix({
  className,
  containerClassName,
  leading,
  trailing,
  size = "default",
  disabled,
  ...props
}: InputAffixProps) {
  return (
    <div
      data-slot="input-affix"
      className={cn(
        "flex w-full items-center rounded-lg border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]",
        "transition-[border-color,box-shadow] duration-[70ms]",
        "focus-within:border-accent focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-bg",
        "has-[[aria-invalid=true]]:border-danger",
        disabled && "opacity-50",
        size === "sm" && "h-8",
        size === "default" && "h-9",
        size === "lg" && "h-11",
        containerClassName
      )}
    >
      {leading ? (
        <span className="flex shrink-0 items-center pl-3 text-fg-muted [&_svg]:size-4">
          {leading}
        </span>
      ) : null}
      <Input
        disabled={disabled}
        size={size}
        className={cn(
          "h-full border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
          leading && "pl-2",
          trailing && "pr-2",
          className
        )}
        {...props}
      />
      {trailing ? (
        <span className="flex shrink-0 items-center pr-3 text-fg-muted [&_svg]:size-4">
          {trailing}
        </span>
      ) : null}
    </div>
  )
}

export { InputAffix }
