"use client"
import * as React from "react"
import { AudioPlayer } from "@/registry/ui/audio-player"
import type { Example } from "./types"

function PlaybackDemo() {
  const [playing, setPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(36)
  React.useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 1)), 120)
    return () => clearInterval(timer)
  }, [playing])
  return (
    <AudioPlayer
      title="Voice note from Maya Chen"
      subtitle={`Invoice INV-2041 · ${Math.round((progress / 100) * 48)}s of 48s`}
      playing={playing}
      progress={progress}
      onToggle={() => setPlaying((p) => !p)}
      className="w-full max-w-sm"
    />
  )
}

export const examples: Example[] = [
  {
    title: "Controlled playback",
    description: "The player is presentational: keep playing and progress in your own state next to the audio element and flip them from onToggle.",
    code: `function PlaybackDemo() {
  const [playing, setPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(36)
  React.useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 1)), 120)
    return () => clearInterval(timer)
  }, [playing])
  return (
    <AudioPlayer
      title="Voice note from Maya Chen"
      subtitle={\`Invoice INV-2041 · \${Math.round((progress / 100) * 48)}s of 48s\`}
      playing={playing}
      progress={progress}
      onToggle={() => setPlaying((p) => !p)}
      className="w-full max-w-sm"
    />
  )
}`,
    node: <PlaybackDemo />,
  },
  {
    title: "A list of recordings",
    description: "Stack players for a call log; progress shows how far each one was listened to and subtitle carries the metadata.",
    code: `<div className="flex w-full max-w-md flex-col gap-2">
  <AudioPlayer title="Kickoff call with Northwind" subtitle="Oct 2 · 42:10 · Theo Okafor" progress={100} />
  <AudioPlayer title="Pricing follow-up" subtitle="Oct 7 · 18:34 · Priya Raman" progress={62} />
  <AudioPlayer title="Voicemail from Sam Lowe" subtitle="Oct 9 · 0:51" />
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-2">
        <AudioPlayer title="Kickoff call with Northwind" subtitle="Oct 2 · 42:10 · Theo Okafor" progress={100} />
        <AudioPlayer title="Pricing follow-up" subtitle="Oct 7 · 18:34 · Priya Raman" progress={62} />
        <AudioPlayer title="Voicemail from Sam Lowe" subtitle="Oct 9 · 0:51" />
      </div>
    ),
  },
]
