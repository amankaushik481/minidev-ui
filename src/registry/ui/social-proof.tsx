"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

/** A stack of up to five customer avatars beside a short trust line, for hero and signup sections. */
type SocialProofProps = {
  /** The trust line shown next to the avatars. */
  countLabel?: string
  /** People to show; only the first five are rendered. */
  people?: { name: string; src?: string }[]
  className?: string
}

const SAMPLE_PEOPLE = [
  { name: "Maya Chen" },
  { name: "Theo Okafor" },
  { name: "Priya Raman" },
  { name: "Sam Lowe" },
  { name: "Ada Novak" },
]

/** "Maya Chen" → "MC"; single words keep their first two letters. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : name.slice(0, 2)).toUpperCase()
}

function SocialProof({
  countLabel = "Trusted by 2,400+ finance teams",
  people = SAMPLE_PEOPLE,
  className,
}: SocialProofProps) {
  const shown = people.slice(0, 5)
  return (
    <div data-slot="social-proof" className={cn("inline-flex items-center gap-3", className)}>
      <div className="flex -space-x-2">
        {shown.map((p) => (
          <Avatar key={p.name} className="size-8 ring-2 ring-bg">
            {p.src ? <AvatarImage src={p.src} alt="" /> : null}
            <AvatarFallback>{initials(p.name)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <p className="text-sm text-fg-muted">{countLabel}</p>
    </div>
  )
}
export { SocialProof }
export type { SocialProofProps }
