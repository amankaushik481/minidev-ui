"use client"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"

const ASSETS = [
  { name: "hero-pitch.png", type: "image", size: "240 KB" },
  { name: "os-mock.mp4", type: "video", size: "1.2 MB" },
  { name: "logo-mark.svg", type: "vector", size: "4 KB" },
  { name: "audit-sheet.pdf", type: "doc", size: "88 KB" },
]

function MediaLibrary() {
  return (
    <div data-slot="media-library" className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-highlight">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium tracking-[-0.014em] text-fg">Media library</h3>
          <p className="text-sm text-fg-muted">Assets used across marketing kits and docs.</p>
        </div>
        <Button size="sm">Upload</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {ASSETS.map((a) => (
          <div key={a.name} className="flex items-center justify-between rounded-xl border border-border bg-bg px-3 py-3">
            <div>
              <p className="text-sm font-medium text-fg">{a.name}</p>
              <p className="font-mono text-xs text-fg-muted">{a.size}</p>
            </div>
            <Badge variant="outline">{a.type}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
export { MediaLibrary }
