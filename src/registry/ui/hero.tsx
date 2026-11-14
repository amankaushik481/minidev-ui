"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * Hero — a centred marketing headline with an optional eyebrow, description and up to two calls to action.
 *
 * Use it at the top of a landing or product page. For an in-app page title use
 * PageHeader, for a mid-page section intro use SectionHeader, and for a closing
 * call to action use CtaBanner.
 *
 * @example
 * <Hero
 *   eyebrow="New in 2.4"
 *   title="Invoices that chase themselves"
 *   description="Reminders, retries and receipts on autopilot."
 *   primaryAction={{ label: "Start free", href: "/signup" }}
 *   secondaryAction={{ label: "Book a demo", onClick: openDemo }}
 * />
 */
type HeroAction = {
  /** Button text. */
  label: string
  /** Renders the action as a link to this URL. */
  href?: string
  /** Click handler, for actions that are not navigation. */
  onClick?: () => void
}

type HeroProps = {
  /** Short line above the title, for example a release or category. */
  eyebrow?: string
  /** The headline, rendered as the page's h1. */
  title: string
  /** One or two sentences under the headline. */
  description?: string
  /** Solid ink button. */
  primaryAction?: HeroAction
  /** Outline button beside the primary one. */
  secondaryAction?: HeroAction
  className?: string
}

function HeroButton({ action, variant }: { action: HeroAction; variant: "default" | "outline" }) {
  return (
    <Button size="lg" variant={variant} onClick={action.onClick} render={action.href ? <a href={action.href} /> : undefined}>
      {action.label}
    </Button>
  )
}

function Hero({ eyebrow, title, description, primaryAction, secondaryAction, className }: HeroProps) {
  return (
    <section data-slot="hero" className={cn("mx-auto max-w-3xl py-16 text-center", className)}>
      {eyebrow ? <p className="mb-3 text-xs font-medium tracking-[0.01em] text-accent-fg uppercase">{eyebrow}</p> : null}
      <h1 className="text-4xl font-medium tracking-[-0.026em] text-balance text-fg sm:text-5xl sm:tracking-[-0.030em]">{title}</h1>
      {description ? <p className="mx-auto mt-4 max-w-xl text-base leading-[1.55] text-pretty text-fg-muted">{description}</p> : null}
      {primaryAction || secondaryAction ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {primaryAction ? <HeroButton action={primaryAction} variant="default" /> : null}
          {secondaryAction ? <HeroButton action={secondaryAction} variant="outline" /> : null}
        </div>
      ) : null}
    </section>
  )
}
export { Hero }
export type { HeroProps, HeroAction }
