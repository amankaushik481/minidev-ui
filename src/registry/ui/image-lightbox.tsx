"use client"
import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * ImageLightbox — a thumbnail that opens the full image in a modal viewer.
 *
 * Built on Base UI Dialog: focus moves into the viewer and returns to the
 * thumbnail on close, Escape and a click on the backdrop close it, and the page
 * behind does not scroll. Use it to enlarge one image; for a grid of tiles use
 * ImageGallery, and for paging through many images use Carousel.
 *
 * @example
 * <ImageLightbox src="/receipt.png" alt="Scanned receipt for INV-2041" />
 */
type ImageLightboxProps = {
  /** Image URL or data URI, used for both the thumbnail and the full view. */
  src?: string
  /** Describes the image; also names the viewer for screen readers. */
  alt?: string
  /** Controlled open state. */
  open?: boolean
  /** Called when the viewer opens or closes. */
  onOpenChange?: (open: boolean) => void
  /** Classes for the thumbnail wrapper. */
  className?: string
}

// A small SVG landscape so the preview needs no network.
const SAMPLE_IMAGE = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#6d5bff'/><stop offset='.55' stop-color='#f472b6'/><stop offset='1' stop-color='#fbbf24'/></linearGradient></defs><rect width='800' height='500' fill='url(#g)'/><circle cx='620' cy='140' r='70' fill='#fff' fill-opacity='.85'/><path d='M0 400 L160 300 L300 380 L440 250 L600 360 L800 280 L800 500 L0 500 Z' fill='#111114' fill-opacity='.55'/></svg>")

function ImageLightbox({ src = SAMPLE_IMAGE, alt = "Preview", open, onOpenChange, className }: ImageLightboxProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange ? (o) => onOpenChange(o) : undefined}>
      <div data-slot="image-lightbox" className={cn("inline-block", className)}>
        <DialogPrimitive.Trigger
          className="block cursor-zoom-in overflow-hidden rounded-xl border border-border outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="h-28 w-44 object-cover" />
          <span className="sr-only">, open larger</span>
        </DialogPrimitive.Trigger>
      </div>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          data-slot="image-lightbox-backdrop"
          className="fixed inset-0 z-50 cursor-zoom-out bg-bg/90 duration-200 data-closed:duration-[160ms] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 motion-reduce:animate-none"
        />
        {/* The popup fills the screen but lets clicks through, so a click beside the image lands on the backdrop and closes. */}
        <DialogPrimitive.Popup
          data-slot="image-lightbox-content"
          aria-label={alt}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-6 pt-16 outline-none duration-200 ease-hairline data-closed:duration-[160ms] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.97] data-closed:animate-out data-closed:fade-out-0 motion-reduce:animate-none sm:p-16"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="pointer-events-auto max-h-full max-w-full rounded-xl border border-border object-contain shadow-overlay" />
          <DialogPrimitive.Close
            data-slot="image-lightbox-close"
            render={<Button type="button" size="icon" variant="outline" className="pointer-events-auto absolute top-4 right-4" aria-label="Close" />}
          >
            <XIcon className="size-4" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
export { ImageLightbox }
export type { ImageLightboxProps }
