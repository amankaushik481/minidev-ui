"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

function ImageLightbox({
  src = "https://placehold.co/800x500/png",
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
