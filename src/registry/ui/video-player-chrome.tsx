"use client"
import * as React from "react"
import { PauseIcon, PlayIcon, Volume2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function VideoPlayerChrome({
  title,
  playing,
  onToggle,
  progress = 0,
  className,
}: {
  title?: string
  playing?: boolean
  onToggle?: () => void
  progress?: number
  className?: string
}) {
  return (
    <div
      data-slot="video-player-chrome"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-sunken",
        className
      )}
    >
      <div className="grid aspect-video place-items-center bg-fg/5">
        <IconButton type="button" variant="secondary" size="icon-lg" aria-label={playing ? "Pause" : "Play"} onClick={onToggle}>
          {playing ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
      </div>
      <div className="flex items-center gap-3 border-t border-border bg-surface px-3 py-2">
        <Volume2Icon className="size-4 text-fg-muted" aria-hidden />
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-sunken" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Playback progress">
          <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
        {title ? <span className="truncate text-xs text-fg-muted">{title}</span> : null}
      </div>
    </div>
  )
}
export { VideoPlayerChrome }
