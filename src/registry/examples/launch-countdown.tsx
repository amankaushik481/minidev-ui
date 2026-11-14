"use client"
import * as React from "react"
import { AuroraBackground } from "@/registry/premium/aurora-background"
import { LaunchCountdown } from "@/registry/premium/launch-countdown"
import type { Example } from "./types"

function CompleteDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-3">
      <LaunchCountdown
        title="Beta invites unlock in"
        targetOffsetMs={1000 * 12}
        cta={open ? "Claim your invite" : null}
        onComplete={() => setOpen(true)}
        className="w-full"
      />
      <p aria-live="polite" className="text-sm text-fg-muted">{open ? "Invites are open. 200 seats left." : "The button appears at zero."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom title and target",
    description: "title is the line above the digits; targetOffsetMs is how far ahead the launch is, here nine days. For a fixed moment pass target a Date or ISO string instead.",
    code: `<LaunchCountdown title="Lumen 3.0 ships in" targetOffsetMs={1000 * 60 * 60 * 24 * 9} cta="Get notified" className="w-full" />`,
    node: <LaunchCountdown title="Lumen 3.0 ships in" targetOffsetMs={1000 * 60 * 60 * 24 * 9} cta="Get notified" className="w-full" />,
  },
  {
    title: "When it hits zero",
    description: "onComplete fires once at zero; pass cta={null} to hide the button until then and swap it in from state.",
    code: `function CompleteDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-3">
      <LaunchCountdown
        title="Beta invites unlock in"
        targetOffsetMs={1000 * 12}
        cta={open ? "Claim your invite" : null}
        onComplete={() => setOpen(true)}
        className="w-full"
      />
      <p aria-live="polite" className="text-sm text-fg-muted">{open ? "Invites are open. 200 seats left." : "The button appears at zero."}</p>
    </div>
  )
}`,
    node: <CompleteDemo />,
  },
  {
    title: "On an aurora",
    description: "Drop the border and background with className and place it inside AuroraBackground set to auto height.",
    code: `<AuroraBackground className="h-auto">
  <LaunchCountdown title="Northwind summit opens in" targetOffsetMs={1000 * 60 * 60 * 72} className="border-0 bg-transparent" />
</AuroraBackground>`,
    node: (
      <AuroraBackground className="h-auto">
        <LaunchCountdown title="Northwind summit opens in" targetOffsetMs={1000 * 60 * 60 * 72} className="border-0 bg-transparent" />
      </AuroraBackground>
    ),
  },
]
