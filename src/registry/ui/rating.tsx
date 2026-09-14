"use client"
import * as React from "react"
import { StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type RatingProps = {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  max?: number
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

function Rating({
  value,
  defaultValue = 0,
  onChange,
  max = 5,
  disabled,
  className,
  ...a11y
}: RatingProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal
  const set = (n: number) => {
    if (value === undefined) setInternal(n)
    onChange?.(n)
  }
  return (
    <div
      data-slot="rating"
      role="radiogroup"
      aria-label={a11y["aria-label"] ?? "Rating"}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1
        const on = n <= current
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={n === current}
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            disabled={disabled}
            className={cn(
              "rounded-md p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-accent",
              disabled && "opacity-50"
            )}
            onClick={() => set(n)}
          >
            <StarIcon
              className={cn(
                "size-4",
                on ? "fill-warning text-warning" : "text-fg-subtle"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
export { Rating }
