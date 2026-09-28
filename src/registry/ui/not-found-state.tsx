"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function NotFoundState({ className }: { className?: string }) {
  return (
    <div data-slot="not-found-state" className={cn("flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-14 text-center shadow-highlight", className)}>
      <p className="font-mono text-sm tabular-nums text-accent">404</p>
      <h2 className="mt-3 text-xl font-medium tracking-[-0.014em] text-fg">Page not found</h2>
      <p className="mt-2 max-w-sm text-sm leading-[1.55] text-fg-muted">That route is not in the registry. Try gallery search or jump back home.</p>
      <div className="mt-6 flex gap-2">
        <Button size="sm">Go home</Button>
        <Button size="sm" variant="outline">Open gallery</Button>
      </div>
    </div>
  )
}
export { NotFoundState }
