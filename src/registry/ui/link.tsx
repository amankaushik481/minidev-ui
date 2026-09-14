"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Link({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="link"
      className={cn(
        "text-sm font-medium text-accent underline-offset-4 outline-none",
        "hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
      {...props}
    />
  )
}
export { Link }
