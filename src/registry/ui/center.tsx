"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Center({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div data-slot="center" className={cn("mx-auto flex w-full max-w-lg flex-col items-center justify-center text-center", className)}>
      {children}
    </div>
  )
}
export { Center }
