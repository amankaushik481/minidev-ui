"use client"
import * as React from "react"
import { PauseIcon, PlayIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * A compact, controlled audio row: play/pause button, title, subtitle and a progress bar.
 *
 * It renders no `<audio>` element: you own playback and pass `playing` and `progress`. Use it for
 * podcast lists, voice notes and call recordings. Prefer `AudioRecorder` to capture audio, and
 * `VideoPlayerChrome` for video.
 *
 * @example
 * const ref = React.useRef<HTMLAudioElement>(null)
 * <audio ref={ref} src={url} onTimeUpdate={(e) => setPct((e.currentTarget.currentTime / e.currentTarget.duration) * 100)} />
 * <AudioPlayer title="Northwind kickoff" subtitle="12 min" playing={playing}
 *   progress={pct} onToggle={() => (playing ? ref.current?.pause() : ref.current?.play())} />
 */
type AudioPlayerProps = {
  /** Track name. Also used in the button's label ("Play Northwind kickoff"). */
  title: string
  subtitle?: string
  /** Whether audio is playing; switches the icon and label. */
  playing?: boolean
  /** Called by the play/pause button. */
  onToggle?: () => void
  /** Playback position in percent, 0 to 100. Clamped. */
  progress?: number
  className?: string
}

function AudioPlayer({ title, subtitle, playing, onToggle, progress = 0, className }: AudioPlayerProps) {
  const pct = Math.min(100, Math.max(0, Number.isFinite(progress) ? progress : 0))
  return (
    <div
      data-slot="audio-player"
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5",
        className
      )}
    >
      <IconButton type="button" variant="outline" size="icon" aria-label={`${playing ? "Pause" : "Play"} ${title}`} onClick={onToggle}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </IconButton>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{title}</p>
        {subtitle ? <p className="truncate text-xs text-fg-muted">{subtitle}</p> : null}
        <div
          className="mt-1.5 h-1 overflow-hidden rounded-full bg-sunken"
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${Math.round(pct)}% played`}
          aria-label={`${title} progress`}
        >
          <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
      </div>
    </div>
  )
}
export { AudioPlayer }
export type { AudioPlayerProps }
