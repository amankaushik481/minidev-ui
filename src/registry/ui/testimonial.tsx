"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

function Testimonial({
  quote,
  name,
  role,
  src,
  className,
}: {
  quote: string
  name: string
  role?: string
  src?: string
  className?: string
}) {
  return (
    <figure
      data-slot="testimonial"
      className={cn("rounded-xl border border-border bg-surface p-6", className)}
    >
      <blockquote className="text-base leading-[1.55] text-fg">“{quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <Avatar className="size-9">
          {src ? <AvatarImage src={src} alt="" /> : null}
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
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
