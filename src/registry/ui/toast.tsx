"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Toast({
  title,
  description,
  tone = "neutral",
  className,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  tone?: "neutral" | "success" | "danger"
  className?: string
}) {
  return (
    <div
      data-slot="toast"
      role="status"
      className={cn(
        "w-80 rounded-xl border bg-surface p-4 shadow-highlight",
        tone === "neutral" && "border-border",
        tone === "success" && "border-success/40",
        tone === "danger" && "border-danger/40",
        className
      )}
    >
      <p className="text-sm font-medium text-fg">{title}</p>
      {description ? <p className="mt-1 text-sm leading-[1.55] text-fg">{description}</p> : null}
    </div>
  )
}

function ToastStack({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="toast-stack"
      className={cn("flex flex-col gap-2", className)}
    >
      {children}
    </div>
  )
}

export { Toast, ToastStack }
