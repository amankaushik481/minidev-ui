"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input, type InputProps } from "@/registry/ui/input"

/**
 * InputAffix — a text Input with icons or text fixed inside the field before or after the value.
 *
 * Use it for a search icon, a currency sign, a unit, a domain suffix or a
 * trailing button. For money with formatting use CurrencyInput, for a search
 * field with clear and results use SearchInput, and for a plain field use Input.
 * All Input props (value, onChange, size, aria-invalid…) pass to the inner input.
 *
 * @example
 * <InputAffix leading={<SearchIcon />} placeholder="Search invoices" aria-label="Search invoices" />
 * <InputAffix trailing=".minidev.pro" defaultValue="acme" aria-label="Subdomain" />
 */
type InputAffixProps = InputProps & {
  /** Content before the value: an icon or short text such as "$" or "https://". */
  leading?: React.ReactNode
  /** Content after the value: an icon, a unit, a suffix or a small button. */
  trailing?: React.ReactNode
  /** Classes for the outer field box; className goes to the inner input. */
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
        "flex w-full items-center rounded-lg border border-border bg-surface shadow-xs",
        "transition-[border-color,box-shadow] duration-[140ms] ease-hairline hover:border-border-strong",
        // Fields focus with the accent border and a 3px accent-soft halo, like Input.
        "has-[input:focus-visible]:border-accent has-[input:focus-visible]:shadow-[0_0_0_3px_var(--accent-soft)]",
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
          "h-full border-0 bg-transparent shadow-none focus-visible:shadow-none aria-invalid:focus-visible:shadow-none",
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
