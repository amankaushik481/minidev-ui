"use client"
import * as React from "react"
import { SlashCommandMenu } from "@/registry/ui/slash-command-menu"
import { Textarea } from "@/registry/ui/textarea"
import type { Example } from "./types"

function Composer() {
  const [text, setText] = React.useState("Following up on INV-2041 /re")
  const [closed, setClosed] = React.useState(false)
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const match = /\/(\w*)$/.exec(text)
  return (
    <div className="relative w-full max-w-md">
      <Textarea
        ref={ref}
        aria-label="Message"
        rows={3}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setClosed(false)
        }}
      />
      {match && !closed ? (
        <SlashCommandMenu
          query={match[1]}
          className="absolute top-full left-0 z-10 mt-1.5"
          onSelect={(c) => {
            setText(text.slice(0, match.index) + "/" + c.label + " ")
            ref.current?.focus()
          }}
          onClose={() => {
            setClosed(true)
            ref.current?.focus()
          }}
        />
      ) : null}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Filtered by the query",
    description: "Pass the text typed after the slash; matching is a case-insensitive substring.",
    code: `<SlashCommandMenu query="re" onSelect={(c) => console.log(c.id)} />`,
    node: <SlashCommandMenu query="re" onSelect={(c) => console.log(c.id)} />,
  },
  {
    title: "Opened from a textarea",
    description: "You own the editor: show the menu while the text ends in a slash command, and give focus back to it after a pick or Escape.",
    code: `function Composer() {
  const [text, setText] = React.useState("Following up on INV-2041 /re")
  const [closed, setClosed] = React.useState(false)
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const match = /\\/(\\w*)$/.exec(text)
  return (
    <div className="relative w-full max-w-md">
      <Textarea
        ref={ref}
        aria-label="Message"
        rows={3}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setClosed(false)
        }}
      />
      {match && !closed ? (
        <SlashCommandMenu
          query={match[1]}
          className="absolute top-full left-0 z-10 mt-1.5"
          onSelect={(c) => {
            setText(text.slice(0, match.index) + "/" + c.label + " ")
            ref.current?.focus()
          }}
          onClose={() => {
            setClosed(true)
            ref.current?.focus()
          }}
        />
      ) : null}
    </div>
  )
}`,
    node: (
      <div className="pb-40">
        <Composer />
      </div>
    ),
  },
]
