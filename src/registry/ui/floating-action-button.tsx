"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function FloatingActionButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="floating-action-button"
      size="lg"
      className={cn(
        "fixed right-6 bottom-6 z-50 rounded-full shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
export { FloatingActionButton }
