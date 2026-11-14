"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * IssueKey — a monospace tracker key such as LUM-412, as text or as a link to the issue.
 *
 * Use it in commit rows, comments and tables wherever an issue is referenced.
 * For the whole issue use IssueCard; for copyable IDs use CopyId.
 *
 * @example
 * <IssueKey value="LUM-412" href="/issues/LUM-412" />
 */
type IssueKeyProps = {
  /** The key text. */
  value: string
  /** Makes the key a link. */
  href?: string
  className?: string
}

function IssueKey({ value, className, href }: IssueKeyProps) {
  const Comp = href ? "a" : "span"
  return (
    <Comp
      data-slot="issue-key"
      href={href}
      className={cn(
        "font-mono text-xs font-medium tracking-[0.01em] text-fg-muted",
        href && "rounded-sm underline-offset-4 outline-none transition-colors duration-[70ms] hover:text-accent-fg hover:underline focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      {value}
    </Comp>
  )
}
export { IssueKey }
export type { IssueKeyProps }
