"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function LogoCloud({
  logos,
  className,
}: {
  logos: { name: string; mark?: React.ReactNode }[]
  className?: string
}) {
  return (
    <div data-slot="logo-cloud" className={cn("flex flex-wrap items-center justify-center gap-x-8 gap-y-4", className)}>
      {logos.map((l) => (
        <div key={l.name} className="flex items-center gap-2 text-sm font-medium text-fg-muted">
          {l.mark}
          {l.name}
        </div>
      ))}
    </div>
  )
}
export { LogoCloud }
