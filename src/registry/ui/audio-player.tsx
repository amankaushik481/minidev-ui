"use client"
import * as React from "react"
import { PauseIcon, PlayIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function AudioPlayer({
  title,
  subtitle,
  playing,
  onToggle,
  progress = 0,
  className,
}: {
  title: string
  subtitle?: string
  playing?: boolean
  onToggle?: () => void
  progress?: number
  className?: string
}) {
  return (
    <div
      data-slot="audio-player"
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5",
        className
      )}
    >
      <IconButton type="button" variant="outline" size="icon" aria-label={playing ? "Pause" : "Play"} onClick={onToggle}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </IconButton>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{title}</p>
        {subtitle ? <p className="truncate text-xs text-fg-muted">{subtitle}</p> : null}
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-sunken" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Audio progress">
          <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
export { AudioPlayer }
