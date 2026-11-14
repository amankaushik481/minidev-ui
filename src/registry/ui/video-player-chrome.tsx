"use client"
import * as React from "react"
import { PauseIcon, PlayIcon, Volume2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * Presentational video-player chrome: a 16:9 stage with a play/pause button and a bottom bar with progress and title.
 *
 * It draws the controls only; wire `playing`, `onToggle` and `progress` to your `<video>` element, or put the video in `children`. Uncontrolled, the button just toggles its own state. Use `AudioPlayer` for audio.
 *
 * @example
 * <VideoPlayerChrome title="Q3 close walkthrough" playing={playing} onToggle={() => (playing ? ref.current.pause() : ref.current.play())} progress={pct}><video ref={ref} src="/q3.mp4" /></VideoPlayerChrome>
 */
type VideoPlayerChromeProps = {
  /** Shown in the bottom bar. */
  title?: string
  /** Controlled playing state. Pair with `onToggle`. */
  playing?: boolean
  /** Initial state for the uncontrolled player. */
  defaultPlaying?: boolean
  /** Called with the next playing state when the button is pressed. */
  onToggle?: (playing: boolean) => void
  /** Playback position, 0–100. */
  progress?: number
  /** The media, e.g. a `<video>`; it fills the stage behind the button. */
  children?: React.ReactNode
  className?: string
}

function VideoPlayerChrome({ title, playing: playingProp, defaultPlaying = false, onToggle, progress = 0, children, className }: VideoPlayerChromeProps) {
  const [internal, setInternal] = React.useState(defaultPlaying)
  const playing = playingProp ?? internal
  const pct = Math.max(0, Math.min(100, progress))
  return (
    <div data-slot="video-player-chrome" className={cn("overflow-hidden rounded-xl border border-border bg-sunken", className)}>
      <div className="relative grid aspect-video place-items-center [&>video]:absolute [&>video]:inset-0 [&>video]:size-full [&>video]:object-cover">
        {children}
        <IconButton
          type="button"
          variant="secondary"
          size="icon-lg"
          className="relative"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => {
            if (playingProp === undefined) setInternal(!playing)
            onToggle?.(!playing)
          }}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
      </div>
      <div className="flex items-center gap-3 border-t border-border bg-surface px-3 py-2">
        <Volume2Icon className="size-4 text-fg-muted" aria-hidden />
        <div
          className="h-1 flex-1 overflow-hidden rounded-full bg-sunken"
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Playback progress"
        >
          <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
        {title ? <span className="truncate text-xs text-fg-muted">{title}</span> : null}
      </div>
    </div>
  )
}
export { VideoPlayerChrome }
export type { VideoPlayerChromeProps }
