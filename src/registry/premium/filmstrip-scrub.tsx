"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function FilmstripScrub({
  frames = 12,
  className,
}: {
  frames?: number
  className?: string
}) {
  const [i, setI] = React.useState(3)
  return (
    <div data-slot="filmstrip-scrub" data-tier="premium" className={cn("space-y-3", className)}>
      <div className="aspect-[16/9] overflow-hidden rounded-xl border border-border bg-sunken">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="font-mono text-xs text-fg-muted">FRAME</p>
            <p className="text-4xl font-medium tabular-nums text-fg">{String(i + 1).padStart(2, "0")}</p>
          </div>
        </div>
      </div>
      <div
        role="group"
        aria-label="Filmstrip"
        className="flex gap-1 overflow-x-auto pb-1"
      >
        {Array.from({ length: frames }, (_, n) => (
          <button
            key={n}
            type="button"
            aria-label={`Frame ${n + 1}`}
            aria-pressed={n === i}
            onClick={() => setI(n)}
            className={cn(
              "h-14 w-20 shrink-0 rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-accent",
              n === i ? "border-accent bg-accent/10" : "border-border bg-surface hover:border-fg-subtle"
            )}
          />
        ))}
      </div>
      <label className="block text-xs text-fg-muted" htmlFor="scrub">
        Scrub
      </label>
      <input
        id="scrub"
        type="range"
        min={0}
        max={frames - 1}
        value={i}
        onChange={(e) => setI(Number(e.target.value))}
        className="w-full accent-[oklch(0.48_0.17_285)]"
      />
    </div>
  )
}
export { FilmstripScrub }
