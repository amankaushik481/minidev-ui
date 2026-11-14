"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * ImpersonationBanner — a full-width strip that tells a support agent whose account they are viewing, with an Exit button.
 *
 * Mount it at the very top of the app shell while impersonating. For system
 * incidents use IncidentBanner, for trials use TrialBanner, and for general
 * announcements use AnnouncementBar.
 *
 * @example
 * <ImpersonationBanner user="maya@northwind.com" onExit={stopImpersonating} />
 */
type ImpersonationBannerProps = {
  /** Name or email of the account being viewed. */
  user: string
  /** Called when the Exit button is pressed; end the impersonation session here. */
  onExit?: () => void
  /** Text of the exit button. */
  exitLabel?: string
  className?: string
}

function ImpersonationBanner({ user, onExit, exitLabel = "Exit", className }: ImpersonationBannerProps) {
  return (
    <div
      data-slot="impersonation-banner"
      role="region"
      aria-label="Impersonation"
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 border-b border-border bg-surface px-4 py-2 text-sm text-fg shadow-highlight",
        className
      )}
    >
      <span>
        You are viewing as <strong className="font-medium">{user}</strong>
      </span>
      <Button type="button" size="sm" variant="outline" onClick={onExit}>
        {exitLabel}
      </Button>
    </div>
  )
}
export { ImpersonationBanner }
export type { ImpersonationBannerProps }
