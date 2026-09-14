"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "sm" | "default" | "lg" | "full" }) {
  return (
    <div
      data-slot="container"
      data-size={size}
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        size === "sm" && "max-w-2xl",
        size === "default" && "max-w-5xl",
        size === "lg" && "max-w-7xl",
        size === "full" && "max-w-none",
        className
      )}
      {...props}
    />
  )
}
export { Container }
