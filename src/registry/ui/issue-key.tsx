"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function IssueKey({
  value,
  className,
  href,
}: {
  value: string
  className?: string
  href?: string
}) {
  const Comp = href ? "a" : "span"
  return (
    <Comp
      data-slot="issue-key"
      href={href}
      className={cn(
        "font-mono text-xs font-medium tracking-[0.01em] text-fg-muted",
        href && "hover:text-accent hover:underline underline-offset-4",
        className
      )}
    >
      {value}
    </Comp>
  )
}
export { IssueKey }
