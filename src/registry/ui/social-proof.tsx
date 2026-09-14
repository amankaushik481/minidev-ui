"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

function SocialProof({
  countLabel,
  people,
  className,
}: {
  countLabel: string
  people: { name: string; src?: string }[]
  className?: string
}) {
  const shown = people.slice(0, 5)
  return (
    <div data-slot="social-proof" className={cn("inline-flex items-center gap-3", className)}>
      <div className="flex -space-x-2">
        {shown.map((p) => (
          <Avatar key={p.name} className="size-8 ring-2 ring-bg">
            {p.src ? <AvatarImage src={p.src} alt="" /> : null}
            <AvatarFallback>{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <p className="text-sm text-fg-muted">{countLabel}</p>
    </div>
  )
}
export { SocialProof }
