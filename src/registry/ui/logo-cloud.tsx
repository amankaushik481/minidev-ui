"use client"
import * as React from "react"
import { AnchorIcon, ApertureIcon, FeatherIcon, HexagonIcon, OrbitIcon, WavesIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * LogoCloud — a wrapping, centred row of customer names and marks for social proof.
 *
 * Use it under a hero or above pricing. Only list real customers you have
 * permission to name. For quotes use Testimonial or PressQuote, and for a
 * scrolling strip wrap it in Marquee.
 *
 * @example
 * <LogoCloud label="Customers" logos={[{ name: "Northwind", mark: <NorthwindMark /> }, { name: "Globex" }]} />
 */

type Logo = {
  /** Company name, always shown as text so it is readable and indexable. */
  name: string
  /** Small decorative mark before the name: an icon or inline SVG. */
  mark?: React.ReactNode
}

// Customers on the Lumen marketing site: a name and a small mark each.
const SAMPLE_LOGOS: Logo[] = [
  { name: "Northwind", mark: <HexagonIcon className="size-4" /> },
  { name: "Halcyon", mark: <WavesIcon className="size-4" /> },
  { name: "Fathom", mark: <AnchorIcon className="size-4" /> },
  { name: "Meridian", mark: <OrbitIcon className="size-4" /> },
  { name: "Quill", mark: <FeatherIcon className="size-4" /> },
  { name: "Tessel", mark: <ApertureIcon className="size-4" /> },
]

type LogoCloudProps = {
  /** Customer names with an optional mark (an icon or an inline SVG). */
  logos?: Logo[]
  /** Accessible name for the list, for example "Customers". */
  label?: string
  className?: string
}

function LogoCloud({ logos = SAMPLE_LOGOS, label = "Customers", className }: LogoCloudProps) {
  return (
    <ul data-slot="logo-cloud" aria-label={label} className={cn("flex flex-wrap items-center justify-center gap-x-8 gap-y-4", className)}>
      {logos.map((l) => (
        <li key={l.name} className="flex items-center gap-2 text-sm font-medium text-fg-muted">
          {l.mark ? <span aria-hidden className="contents">{l.mark}</span> : null}
          {l.name}
        </li>
      ))}
    </ul>
  )
}
export { LogoCloud }
export type { LogoCloudProps, Logo }
