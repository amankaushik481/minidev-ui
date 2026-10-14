"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

/** A quote card with the customer's avatar, name and role, for landing pages and case studies. */
type TestimonialProps = {
  quote?: string
  name?: string
  role?: string
  /** Avatar image; initials are used when absent. */
  src?: string
  className?: string
}

/** "Maya Chen" → "MC"; single words keep their first two letters. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : name.slice(0, 2)).toUpperCase()
}

function Testimonial({
  quote = "Lumen took our month-end close from six days to two. The invoice workflow is the first finance tool the whole team actually likes using.",
  name = "Maya Chen",
  role = "Head of Finance, Northwind",
  src,
  className,
}: TestimonialProps) {
  return (
    <figure
      data-slot="testimonial"
      className={cn("w-full max-w-md rounded-xl border border-border bg-surface p-6", className)}
    >
      <blockquote className="text-base leading-[1.55] text-fg">“{quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <Avatar className="size-9">
          {src ? <AvatarImage src={src} alt="" /> : null}
          <AvatarFallback>{initials(name)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium text-fg">{name}</div>
          {role ? <div className="text-xs text-fg-muted">{role}</div> : null}
        </div>
      </figcaption>
    </figure>
  )
}
export { Testimonial }
export type { TestimonialProps }
