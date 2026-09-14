"use client"
import * as React from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { InputAffix } from "@/registry/ui/input-affix"
import { cn } from "@/lib/utils"

type SearchInputProps = Omit<React.ComponentProps<"input">, "size" | "prefix" | "type"> & {
  size?: "sm" | "default" | "lg"
  onClear?: () => void
  containerClassName?: string
}

function SearchInput({ className, containerClassName, onClear, value, defaultValue, onChange, size="default", ...props }: SearchInputProps) {
  const [internal, setInternal] = React.useState(defaultValue?.toString() ?? "")
  const controlled = value !== undefined
  const current = controlled ? String(value ?? "") : internal
  return (
    <div data-slot="search-input">
      <InputAffix
      type="search"
      size={size}
      leading={<SearchIcon />}
      trailing={
        current ? (
          <button
            type="button"
            aria-label="Clear search"
            className="rounded-md p-0.5 text-fg-muted transition-[color] duration-[70ms] hover:text-fg"
            onClick={() => {
              if (!controlled) setInternal("")
              onClear?.()
              onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
            }}
          >
            <XIcon className="size-3.5" />
          </button>
        ) : null
      }
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => {
        if (!controlled) setInternal(e.target.value)
        onChange?.(e)
      }}
      containerClassName={cn(containerClassName)}
      className={className}
      {...props}
    />
    </div>
  )
}
export { SearchInput }
