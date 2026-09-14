"use client"
import { cn } from "@/lib/utils"

function Spinner({
  className,
  size = "default",
  label = "Loading",
}: {
  className?: string
  size?: "sm" | "default" | "lg"
  label?: string
}) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      data-size={size}
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-border border-t-accent",
        size === "sm" && "size-3.5",
        size === "default" && "size-4",
        size === "lg" && "size-6 border-[2.5px]",
        className
      )}
    />
  )
}
export { Spinner }
