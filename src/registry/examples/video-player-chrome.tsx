"use client"
import * as React from "react"
import { VideoPlayerChrome } from "@/registry/ui/video-player-chrome"
import type { Example } from "./types"

// Stands in for a <video>: progress advances while "playing", the way onTimeUpdate would drive it.
function SimulatedPlayback() {
  const [playing, setPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(18)
  React.useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 100)
    return () => clearInterval(id)
  }, [playing])
  return (
    <VideoPlayerChrome
      className="w-full max-w-md"
      title="Q3 close walkthrough · 4 min"
      playing={playing}
      onToggle={setPlaying}
      progress={progress}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Controlled playback",
    description: "onToggle receives the next playing state; with a real video, call play() or pause() there and feed progress from onTimeUpdate.",
    code: `function SimulatedPlayback() {
  const [playing, setPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(18)
  React.useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 100)
    return () => clearInterval(id)
  }, [playing])
  return (
    <VideoPlayerChrome
      className="w-full max-w-md"
      title="Q3 close walkthrough · 4 min"
      playing={playing}
      onToggle={setPlaying}
      progress={progress}
    />
  )
}`,
    node: <SimulatedPlayback />,
  },
  {
    title: "Poster before playback",
    description: "Children fill the stage behind the button, so a poster image or a <video> without controls sits underneath.",
    code: `<VideoPlayerChrome className="w-full max-w-md" title="Onboarding: send your first invoice">
  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--accent-soft),transparent_60%)]" />
</VideoPlayerChrome>`,
    node: (
      <VideoPlayerChrome className="w-full max-w-md" title="Onboarding: send your first invoice">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--accent-soft),transparent_60%)]" />
      </VideoPlayerChrome>
    ),
  },
]
