"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

// A small SVG landscape so the preview needs no network.
const SAMPLE_IMAGE = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#6d5bff'/><stop offset='.55' stop-color='#f472b6'/><stop offset='1' stop-color='#fbbf24'/></linearGradient></defs><rect width='800' height='500' fill='url(#g)'/><circle cx='620' cy='140' r='70' fill='#fff' fill-opacity='.85'/><path d='M0 400 L160 300 L300 380 L440 250 L600 360 L800 280 L800 500 L0 500 Z' fill='#111114' fill-opacity='.55'/></svg>")

function ImageLightbox({
  src = SAMPLE_IMAGE,
  alt = "Preview",
  className,
}: {
  src?: string
  alt?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div data-slot="image-lightbox" className={cn("inline-block", className)}>
      <button type="button" className="overflow-hidden rounded-xl border border-border outline-none focus-visible:ring-2 focus-visible:ring-accent" onClick={() => setOpen(true)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-28 w-44 object-cover" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-6" role="dialog" aria-modal="true" aria-label={alt}>
          <Button type="button" size="icon" variant="outline" className="absolute top-4 right-4" aria-label="Close" onClick={() => setOpen(false)}>
            <XIcon className="size-4" />
          </Button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="max-h-[80vh] max-w-full rounded-xl border border-border" />
        </div>
      ) : null}
    </div>
  )
}
export { ImageLightbox }
