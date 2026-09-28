"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function AuthCard({
  title = "Sign in",
  description,
  footer,
  children,
  className,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="auth-card"
      className={cn(
        "mx-auto w-full max-w-sm space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-highlight",
        className
      )}
    >
      <div>
        <h2 className="text-lg font-medium tracking-[-0.014em] text-fg">{title}</h2>
        {description ? <p className="mt-1 text-sm text-fg-muted">{description}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
      {footer ? <div className="border-t border-border pt-4 text-center text-sm text-fg-muted">{footer}</div> : null}
    </div>
  )
}
export { AuthCard }
