"use client"
import * as React from "react"
import { SmilePlusIcon } from "lucide-react"
import { EmojiPicker } from "@/registry/ui/emoji-picker"
import { Button } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import type { Example } from "./types"

function ReactionDemo() {
  const [counts, setCounts] = React.useState<Record<string, number>>({ "👍": 2, "🎉": 1 })
  const react = (emoji: string) => setCounts((c) => ({ ...c, [emoji]: (c[emoji] ?? 0) + 1 }))
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-3 text-sm">
        <p className="font-medium text-fg">Maya Chen</p>
        <p className="mt-0.5 text-fg-muted">Invoice INV-2041 went out to Northwind this morning.</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {Object.entries(counts).map(([emoji, n]) => (
            <button key={emoji} type="button" onClick={() => react(emoji)} className="inline-flex h-6 items-center gap-1 rounded-full border border-border bg-bg px-2 text-xs text-fg tabular-nums hover:border-border-strong">
              {emoji} {n}
            </button>
          ))}
        </div>
      </div>
      <EmojiPicker onSelect={react} />
    </div>
  )
}

function PopoverDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <SmilePlusIcon /> {last ? `Reacted ${last}` : "Add reaction"}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit border-0 bg-transparent p-0 shadow-none">
        <EmojiPicker onSelect={setLast} />
      </PopoverContent>
    </Popover>
  )
}

export const examples: Example[] = [
  {
    title: "Reactions with callback",
    description: "onSelect gets the emoji string; here it bumps a count on the message above, which is all a reaction bar is.",
    code: `function ReactionDemo() {
  const [counts, setCounts] = React.useState<Record<string, number>>({ "👍": 2, "🎉": 1 })
  const react = (emoji: string) => setCounts((c) => ({ ...c, [emoji]: (c[emoji] ?? 0) + 1 }))
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-3 text-sm">
        <p className="font-medium text-fg">Maya Chen</p>
        <p className="mt-0.5 text-fg-muted">Invoice INV-2041 went out to Northwind this morning.</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {Object.entries(counts).map(([emoji, n]) => (
            <button key={emoji} type="button" onClick={() => react(emoji)} className="inline-flex h-6 items-center gap-1 rounded-full border border-border bg-bg px-2 text-xs text-fg tabular-nums hover:border-border-strong">
              {emoji} {n}
            </button>
          ))}
        </div>
      </div>
      <EmojiPicker onSelect={react} />
    </div>
  )
}`,
    node: <ReactionDemo />,
  },
  {
    title: "Custom set",
    description: "Pass your own emojis; a grid-cols class on className changes the column count to suit a shorter list.",
    code: `<EmojiPicker emojis={["🙂", "😐", "🙁", "🤩", "😤", "😴", "🤔", "👋"]} className="grid-cols-4" />`,
    node: <EmojiPicker emojis={["🙂", "😐", "🙁", "🤩", "😤", "😴", "🤔", "👋"]} className="grid-cols-4" />,
  },
  {
    title: "In a popover",
    description: "The picker already draws its own panel, so strip the popover's chrome and let it open from a small button.",
    code: `function PopoverDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <SmilePlusIcon /> {last ? \`Reacted \${last}\` : "Add reaction"}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit border-0 bg-transparent p-0 shadow-none">
        <EmojiPicker onSelect={setLast} />
      </PopoverContent>
    </Popover>
  )
}`,
    node: <PopoverDemo />,
  },
]
