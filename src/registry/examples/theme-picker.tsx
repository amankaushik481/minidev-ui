"use client"
import * as React from "react"
import { ThemePicker, type ThemeMode } from "@/registry/ui/theme-picker"
import type { Example } from "./types"

function ControlledDemo() {
  const [mode, setMode] = React.useState<ThemeMode>("system")
  return (
    <div className="flex flex-col items-start gap-2">
      <ThemePicker value={mode} onChange={setMode} />
      <p className="text-xs text-fg-muted">
        Saved as <code className="font-mono text-fg">{mode}</code>. Read it in a script in your layout before first paint.
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled",
    description: "Hold the mode yourself to save it. This demo does not set applyToDocument, so the page theme stays as it is.",
    code: `function ControlledDemo() {
  const [mode, setMode] = React.useState<ThemeMode>("system")
  return (
    <div className="flex flex-col items-start gap-2">
      <ThemePicker value={mode} onChange={setMode} />
      <p className="text-xs text-fg-muted">
        Saved as <code className="font-mono text-fg">{mode}</code>. Read it in a script in your layout before first paint.
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "In a settings row",
    description: "Pair the picker with a visible heading and one line about what System means.",
    code: `<div className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3">
  <div>
    <p className="text-sm font-medium text-fg">Appearance</p>
    <p className="text-xs text-fg-muted">System follows your device setting.</p>
  </div>
  <ThemePicker defaultValue="dark" />
</div>`,
    node: (
      <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3">
        <div>
          <p className="text-sm font-medium text-fg">Appearance</p>
          <p className="text-xs text-fg-muted">System follows your device setting.</p>
        </div>
        <ThemePicker defaultValue="dark" />
      </div>
    ),
  },
]
