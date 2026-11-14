"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A floating cookie-consent card fixed to the bottom-right, with Reject and Accept buttons of equal reach.
 *
 * Render it only until the visitor chooses, and store the choice yourself (cookie or localStorage) in `onAccept` / `onReject`.
 * It is a labelled, non-modal region, so the page stays usable. Pass `className="static"` to place it inline.
 * For a site-wide notice bar use AnnouncementBar; for a blocking choice use AlertDialog.
 *
 * @example
 * {!consent && <CookieBanner onAccept={() => save("all")} onReject={() => save("essential")} policyHref="/privacy" />}
 */
type CookieBannerProps = {
  /** Called when the visitor accepts non-essential cookies. */
  onAccept?: () => void
  /** Called when the visitor rejects non-essential cookies. */
  onReject?: () => void
  /** The message. Defaults to a one-line analytics and preferences notice. */
  children?: React.ReactNode
  /** Link to your cookie or privacy policy, shown after the message. */
  policyHref?: string
  /** Accept button text. Defaults to "Accept". */
  acceptLabel?: string
  /** Reject button text. Defaults to "Reject". */
  rejectLabel?: string
  className?: string
}

function CookieBanner({
  onAccept,
  onReject,
  children = "We use cookies for analytics and preferences. You can accept or reject non-essential cookies.",
  policyHref,
  acceptLabel = "Accept",
  rejectLabel = "Reject",
  className,
}: CookieBannerProps) {
  return (
    <section
      data-slot="cookie-banner"
      aria-label="Cookie consent"
      className={cn("fixed right-4 bottom-4 z-50 max-w-sm rounded-xl border border-border bg-raised p-4 shadow-lg", className)}
    >
      <p className="text-sm text-fg-muted">
        {children}
        {policyHref ? (
          <>
            {" "}
            <a href={policyHref} className="rounded-sm text-accent-fg underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Cookie policy
            </a>
          </>
        ) : null}
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onReject}>
          {rejectLabel}
        </Button>
        <Button type="button" size="sm" onClick={onAccept}>
          {acceptLabel}
        </Button>
      </div>
    </section>
  )
}
export { CookieBanner }
export type { CookieBannerProps }
