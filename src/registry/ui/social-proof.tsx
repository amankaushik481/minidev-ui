"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

/**
 * A stack of up to five customer avatars beside a short trust line, for hero and signup sections.
 *
 * The avatars are decorative; the trust line is what screen readers hear. Only claim numbers you can back up.
 * For quotes use Testimonial; for a row of logos use LogoCloud.
 *
 * @example
 * <SocialProof countLabel="Used by 40 teams in our beta" people={[{ name: "Maya Chen", src: "/maya.jpg" }]} />
 */
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
      <div aria-hidden className="flex -space-x-2">
        {shown.map((p, i) => (
          <Avatar key={`${p.name}-${i}`} className="size-8 ring-2 ring-bg">
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
