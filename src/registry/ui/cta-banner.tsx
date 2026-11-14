"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A full-width call-to-action band: a heading, an optional line of copy and one primary action, stacked on mobile.
 *
 * Use at the end of a marketing page or section. Pass `action.href` for navigation (renders a link) or `action.onClick` for an in-page action.
 * For a hero use Hero; for a dismissible notice use Banner or AnnouncementBar; for an in-app upsell use UpgradePrompt.
 *
 * @example
 * <CtaBanner title="Ship your UI today" description="Install any component with one command." action={{ label: "Get started", href: "/docs" }} />
 */
type CtaBannerProps = {
  /** Heading, rendered as an h3. */
  title: string
  /** One supporting line. */
  description?: string
  /** The single primary action. `href` renders a link; otherwise a button calling `onClick`. */
  action?: { label: string; onClick?: () => void; href?: string }
  className?: string
}

function CtaBanner({ title, description, action, className }: CtaBannerProps) {
  return (
    <div
      data-slot="cta-banner"
      className={cn(
        "flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-sunken p-6 sm:flex-row sm:items-center",
        className
      )}
    >
      <div className="min-w-0">
        <h3 className="text-base font-medium text-balance text-fg">{title}</h3>
        {description ? <p className="mt-1 text-sm text-pretty text-fg-muted">{description}</p> : null}
      </div>
      {action ? (
        action.href ? (
          <Button className="shrink-0" render={<a href={action.href} />} onClick={action.onClick}>
            {action.label}
          </Button>
        ) : (
          <Button type="button" className="shrink-0" onClick={action.onClick}>
            {action.label}
          </Button>
        )
      ) : null}
    </div>
  )
}
export { CtaBanner }
export type { CtaBannerProps }
