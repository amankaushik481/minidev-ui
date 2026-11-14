"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A small accent ring that spins while something loads; announced once as a status with its label.
 *
 * Use it inside a button or beside text for short waits. Use Skeleton when the layout of the
 * incoming content is known, and a Progress bar when you know how far along it is.
 *
 * @example
 * <Button disabled><Spinner size="sm" label="Saving" /> Saving</Button>
 */
type SpinnerProps = Omit<React.ComponentProps<"span">, "children"> & {
  /** 14px, 16px or 24px. */
  size?: "sm" | "default" | "lg"
  /** Accessible name read by screen readers. */
  label?: string
}

function Spinner({ className, size = "default", label = "Loading", ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      data-size={size}
      className={cn(
        "inline-block shrink-0 animate-spin rounded-full border-2 border-border border-t-accent",
        size === "sm" && "size-3.5",
        size === "default" && "size-4",
        size === "lg" && "size-6",
        className
      )}
      {...props}
    />
  )
}
export { Spinner }
export type { SpinnerProps }
