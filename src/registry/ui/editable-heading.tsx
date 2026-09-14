"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type EditableHeadingProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
  placeholder?: string
  "aria-label"?: string
}

function EditableHeading({
  value,
  defaultValue = "",
  onChange,
  className,
  placeholder = "Untitled",
  ...a11y
}: EditableHeadingProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal
  return (
    <input
      data-slot="editable-heading"
      aria-label={a11y["aria-label"] ?? "Title"}
      value={current}
      placeholder={placeholder}
      className={cn(
        "w-full bg-transparent text-2xl font-medium tracking-[-0.018em] text-fg outline-none",
        "placeholder:text-fg-subtle focus-visible:ring-0",
        className
      )}
      onChange={(e) => {
        if (value === undefined) setInternal(e.target.value)
        onChange?.(e.target.value)
      }}
    />
  )
}
export { EditableHeading }
