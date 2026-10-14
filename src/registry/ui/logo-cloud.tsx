"use client"
import * as React from "react"
import { AnchorIcon, ApertureIcon, FeatherIcon, HexagonIcon, OrbitIcon, WavesIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** LogoCloud — a wrapping, centred row of customer names and marks for social proof. */

type Logo = { name: string; mark?: React.ReactNode }

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
  className?: string
}

function LogoCloud({ logos = SAMPLE_LOGOS, className }: LogoCloudProps) {
  return (
    <div data-slot="logo-cloud" className={cn("flex flex-wrap items-center justify-center gap-x-8 gap-y-4", className)}>
      {logos.map((l) => (
        <div key={l.name} className="flex items-center gap-2 text-sm font-medium text-fg-muted">
          {l.mark}
          {l.name}
        </div>
      ))}
    </div>
  )
}
export { LogoCloud }
export type { LogoCloudProps, Logo }
