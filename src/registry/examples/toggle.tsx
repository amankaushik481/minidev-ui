"use client"
import * as React from "react"
import { BoldIcon, EyeIcon, EyeOffIcon, PinIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"
import type { Example } from "./types"

function PinDemo() {
  const [pinned, setPinned] = React.useState(false)
  return (
    <div className="flex items-center gap-3">
      <Toggle pressed={pinned} onPressedChange={setPinned} aria-label="Pin INV-2041 to the sidebar">
        <PinIcon className="size-4" /> {pinned ? "Pinned" : "Pin"}
      </Toggle>
      <p className="text-xs text-fg-muted">INV-2041 {pinned ? "shows in the sidebar" : "is not pinned"}</p>
    </div>
  )
}

function VisibilityDemo() {
  const [hidden, setHidden] = React.useState(true)
  return (
    <div className="flex w-64 items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 shadow-raised">
      <div className="min-w-0">
        <p className="text-xs text-fg-muted">API key</p>
        <p className="font-mono text-sm text-fg">{hidden ? "lm_live_••••••••••••" : "lm_live_4f9a2c7e1b"}</p>
      </div>
      <Toggle size="sm" pressed={!hidden} onPressedChange={(shown) => setHidden(!shown)} aria-label="Reveal API key">
        {hidden ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
      </Toggle>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Sizes",
    description: "Small, default and large share one radius; give icon-only toggles an aria-label.",
    code: `<Toggle size="sm" aria-label="Bold"><BoldIcon className="size-4" /></Toggle>
<Toggle aria-label="Bold"><BoldIcon className="size-4" /></Toggle>
<Toggle size="lg" aria-label="Bold"><BoldIcon className="size-4" /></Toggle>`,
    node: (
      <div className="flex items-center gap-2">
        <Toggle size="sm" aria-label="Bold"><BoldIcon className="size-4" /></Toggle>
        <Toggle aria-label="Bold"><BoldIcon className="size-4" /></Toggle>
        <Toggle size="lg" aria-label="Bold"><BoldIcon className="size-4" /></Toggle>
      </div>
    ),
  },
  {
    title: "Controlled pressed",
    description: "Hold the pressed state yourself so the label and the rest of the view follow it.",
    code: `function PinDemo() {
  const [pinned, setPinned] = React.useState(false)
  return (
    <div className="flex items-center gap-3">
      <Toggle pressed={pinned} onPressedChange={setPinned} aria-label="Pin INV-2041 to the sidebar">
        <PinIcon className="size-4" /> {pinned ? "Pinned" : "Pin"}
      </Toggle>
      <p className="text-xs text-fg-muted">INV-2041 {pinned ? "shows in the sidebar" : "is not pinned"}</p>
    </div>
  )
}`,
    node: <PinDemo />,
  },
  {
    title: "Reveal a secret",
    description: "A small toggle inside a row swaps its icon with the state it controls.",
    code: `function VisibilityDemo() {
  const [hidden, setHidden] = React.useState(true)
  return (
    <div className="flex w-64 items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 shadow-raised">
      <div className="min-w-0">
        <p className="text-xs text-fg-muted">API key</p>
        <p className="font-mono text-sm text-fg">{hidden ? "lm_live_••••••••••••" : "lm_live_4f9a2c7e1b"}</p>
      </div>
      <Toggle size="sm" pressed={!hidden} onPressedChange={(shown) => setHidden(!shown)} aria-label="Reveal API key">
        {hidden ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
      </Toggle>
    </div>
  )
}`,
    node: <VisibilityDemo />,
  },
]
