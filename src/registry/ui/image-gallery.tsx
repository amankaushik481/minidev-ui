"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

function ImageGallery({
  images,
  className,
}: {
  images: { src: string; alt: string }[]
  className?: string
}) {
  return (
    <div data-slot="image-gallery" className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3", className)}>
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
