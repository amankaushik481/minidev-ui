"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function CtaBanner({
  title,
  description,
  action,
  className,
}: {
  title: string
  description?: string
  action?: { label: string; onClick?: () => void }
  className?: string
}) {
  return (
    <div
      data-slot="cta-banner"
      className={cn(
        "flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-sunken p-6 sm:flex-row sm:items-center",
        className
      )}
    >
      <div>
        <h3 className="text-base font-medium text-fg">{title}</h3>
        {description ? <p className="mt-1 text-sm text-fg-muted">{description}</p> : null}
      </div>
      {action ? <Button onClick={action.onClick}>{action.label}</Button> : null}
    </div>
  )
}
export { CtaBanner }
