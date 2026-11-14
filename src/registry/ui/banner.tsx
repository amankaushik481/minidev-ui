"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * A full-width, tinted notice bar for in-app messages, with an optional action and dismiss button.
 *
 * Use at the top of an app or a page section for state the user should know about (trial ending,
 * degraded service, unpaid invoice). Prefer `AnnouncementBar` for marketing news, `InlineAlert` or
 * `Callout` inside content, and `Toast` for transient feedback. It is a polite live region, so a
 * banner that appears later is announced. `danger` uses `role="alert"` and interrupts.
 *
 * @example
 * <Banner tone="warning" action={<Button size="sm" variant="outline">Update card</Button>} onDismiss={hide}>
 *   Your card ending 4242 expires this month.
 * </Banner>
 */
type BannerTone = "accent" | "info" | "success" | "warning" | "danger"

type BannerProps = {
  /** The message. Keep it to one sentence. */
  children: React.ReactNode
  /** Colour and urgency. `danger` is announced assertively. */
  tone?: BannerTone
  className?: string
  /** A button or link shown before the dismiss button. */
  action?: React.ReactNode
  /** Shows a dismiss button and is called when it is pressed. */
  onDismiss?: () => void
}

const TONES: Record<BannerTone, string> = {
  accent: "border-accent-line bg-accent-soft",
  info: "border-info/30 bg-info/10",
  success: "border-success/30 bg-success/10",
  warning: "border-warning/40 bg-warning/15",
  danger: "border-danger/40 bg-danger/10",
}

function Banner({ children, tone = "accent", className, action, onDismiss }: BannerProps) {
  return (
    <div
      data-slot="banner"
      data-tone={tone}
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "flex items-center justify-between gap-3 border px-4 py-2.5 text-sm text-fg shadow-highlight",
        TONES[tone],
        className
      )}
    >
      <div className="min-w-0 flex-1">{children}</div>
      {action || onDismiss ? (
        <div className="flex shrink-0 items-center gap-2">
          {action}
          {onDismiss ? (
            <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Dismiss" onClick={onDismiss}>
              <XIcon />
            </IconButton>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
export { Banner }
export type { BannerProps, BannerTone }
