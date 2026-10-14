"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

/** A square-tile image grid, two columns on phones and three from the small breakpoint up. */
type GalleryImage = { src: string; alt: string }

/* Sample tiles are tiny inline SVG landscapes, so the demo needs no network and no image files. */
const scene = (top: string, bottom: string, near: string, far: string, sun: string, sx: number, sy: number) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><circle cx="${sx}" cy="${sy}" r="44" fill="${sun}"/><path d="M0 250C80 200 140 300 220 240S340 200 400 260V400H0Z" fill="${far}"/><path d="M0 320C100 280 180 340 260 300S360 290 400 320V400H0Z" fill="${near}"/></svg>`
  )}`

const SAMPLE_IMAGES: GalleryImage[] = [
  { src: scene("hsl(262 45% 32%)", "hsl(16 90% 70%)", "hsl(266 40% 24%)", "hsl(276 35% 40%)", "hsl(32 100% 80%)", 300, 190), alt: "Sunset over rolling hills" },
  { src: scene("hsl(212 50% 45%)", "hsl(200 55% 78%)", "hsl(220 40% 24%)", "hsl(214 35% 38%)", "hsl(45 100% 88%)", 110, 120), alt: "Mountain lake at dawn" },
  { src: scene("hsl(36 70% 62%)", "hsl(28 85% 72%)", "hsl(22 55% 36%)", "hsl(30 60% 50%)", "hsl(40 100% 92%)", 280, 140), alt: "Sand dunes at noon" },
  { src: scene("hsl(232 50% 12%)", "hsl(250 40% 28%)", "hsl(236 40% 10%)", "hsl(240 35% 18%)", "hsl(48 90% 88%)", 90, 100), alt: "Moonlit valley" },
  { src: scene("hsl(195 60% 72%)", "hsl(170 45% 70%)", "hsl(160 45% 26%)", "hsl(150 40% 42%)", "hsl(50 100% 88%)", 330, 110), alt: "Green meadow in spring" },
  { src: scene("hsl(205 70% 60%)", "hsl(185 60% 55%)", "hsl(205 55% 22%)", "hsl(195 55% 36%)", "hsl(40 100% 86%)", 200, 150), alt: "Coastline at midday" },
]

type ImageGalleryProps = {
  /** Images to tile, each with alt text. Defaults to six illustrated landscapes. */
  images?: GalleryImage[]
  className?: string
}

function ImageGallery({
  images = SAMPLE_IMAGES,
  className,
}: ImageGalleryProps) {
  return (
    <div data-slot="image-gallery" className={cn("grid w-full max-w-2xl grid-cols-2 gap-2 sm:grid-cols-3", className)}>
      {images.map((img) => (
        <AspectRatio key={img.src} ratio={1} className="rounded-xl border border-border bg-sunken">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt={img.alt} className="absolute inset-0 size-full object-cover" />
        </AspectRatio>
      ))}
    </div>
  )
}
export { ImageGallery }
export type { ImageGalleryProps, GalleryImage }
