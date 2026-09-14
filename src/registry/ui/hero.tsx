"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  primaryAction?: { label: string; onClick?: () => void }
  secondaryAction?: { label: string; onClick?: () => void }
  className?: string
}) {
  return (
    <section data-slot="hero" className={cn("mx-auto max-w-3xl py-16 text-center", className)}>
      {eyebrow ? <p className="mb-3 text-xs font-medium tracking-[0.01em] text-accent uppercase">{eyebrow}</p> : null}
      <h1 className="text-4xl font-medium tracking-[-0.026em] text-fg sm:text-5xl sm:tracking-[-0.030em]">{title}</h1>
      {description ? <p className="mx-auto mt-4 max-w-xl text-base leading-[1.55] text-fg-muted">{description}</p> : null}
      {(primaryAction || secondaryAction) ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {primaryAction ? <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button> : null}
          {secondaryAction ? <Button variant="outline" onClick={secondaryAction.onClick}>{secondaryAction.label}</Button> : null}
        </div>
      ) : null}
    </section>
  )
}
export { Hero }
