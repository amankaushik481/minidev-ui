"use client"
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function Carousel({
  children,
  className,
  label = "Carousel",
}: {
  children: React.ReactNode
  className?: string
  label?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const scroll = (dir: -1 | 1) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" })
  }
  return (
    <div data-slot="carousel" className={cn("relative", className)}>
      <div className="mb-2 flex justify-end gap-1">
        <IconButton type="button" size="icon-sm" variant="outline" aria-label="Previous slide" onClick={() => scroll(-1)}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton type="button" size="icon-sm" variant="outline" aria-label="Next slide" onClick={() => scroll(1)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-accent [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scroll(1)
          if (e.key === "ArrowLeft") scroll(-1)
        }}
      >
        {React.Children.map(children, (child) => (
          <div className="min-w-[80%] snap-start sm:min-w-[45%] lg:min-w-[30%]">{child}</div>
        ))}
      </div>
    </div>
  )
}
export { Carousel }
