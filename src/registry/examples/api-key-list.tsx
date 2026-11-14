"use client"
import * as React from "react"
import { ApiKeyList } from "@/registry/ui/api-key-list"
import type { Example } from "./types"

const KEYS = [
  { id: "k1", name: "Production", preview: "lm_live_••••4f8c", created: "Jan 9" },
  { id: "k2", name: "Northwind integration", preview: "lm_live_••••a21e", created: "Jun 3" },
  { id: "k3", name: "Staging", preview: "lm_test_••••0b77", created: "Sep 28" },
]

function HandlersDemo() {
  const [keys, setKeys] = React.useState([
    { id: "ci", name: "CI runner", preview: "lm_live_••••9d31", created: "Mar 2" },
    { id: "backup", name: "Nightly backup", preview: "lm_live_••••62fe", created: "Apr 18" },
  ])
  const [note, setNote] = React.useState("Rotate a key or create a new one.")
  const tail = () => Math.random().toString(16).slice(2, 6)
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ApiKeyList
        title="Service keys"
        keys={keys}
        onCreate={() => {
          const id = "key-" + (keys.length + 1)
          setKeys((k) => [...k, { id, name: "New key " + (k.length + 1), preview: "lm_live_••••" + tail(), created: "Today" }])
          setNote("Created a key. Show the full secret once, in a dialog, then only the preview.")
        }}
        onRotate={(key) => {
          setKeys((k) => k.map((x) => (x.id === key.id ? { ...x, preview: "lm_live_••••" + tail(), created: "Today" } : x)))
          setNote(`Rotated ${key.name}. The old secret stops working in 24 hours.`)
        }}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{note}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom keys",
    description: "Each key takes a name, a masked preview and a created label; the created label renders as an outline badge. Never pass the full secret.",
    code: `const KEYS = [
  { id: "k1", name: "Production", preview: "lm_live_••••4f8c", created: "Jan 9" },
  { id: "k2", name: "Northwind integration", preview: "lm_live_••••a21e", created: "Jun 3" },
  { id: "k3", name: "Staging", preview: "lm_test_••••0b77", created: "Sep 28" },
]

<ApiKeyList keys={KEYS} className="w-full max-w-lg" />`,
    node: <ApiKeyList keys={KEYS} className="w-full max-w-lg" />,
  },
  {
    title: "Create and rotate",
    description: "onCreate runs from the header button and onRotate gets the row's key; update your list and announce the result.",
    code: `function HandlersDemo() {
  const [keys, setKeys] = React.useState([
    { id: "ci", name: "CI runner", preview: "lm_live_••••9d31", created: "Mar 2" },
    { id: "backup", name: "Nightly backup", preview: "lm_live_••••62fe", created: "Apr 18" },
  ])
  const [note, setNote] = React.useState("Rotate a key or create a new one.")
  const tail = () => Math.random().toString(16).slice(2, 6)
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ApiKeyList
        title="Service keys"
        keys={keys}
        onCreate={() => {
          const id = "key-" + (keys.length + 1)
          setKeys((k) => [...k, { id, name: "New key " + (k.length + 1), preview: "lm_live_••••" + tail(), created: "Today" }])
          setNote("Created a key. Show the full secret once, in a dialog, then only the preview.")
        }}
        onRotate={(key) => {
          setKeys((k) => k.map((x) => (x.id === key.id ? { ...x, preview: "lm_live_••••" + tail(), created: "Today" } : x)))
          setNote(\`Rotated \${key.name}. The old secret stops working in 24 hours.\`)
        }}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{note}</p>
    </div>
  )
}`,
    node: <HandlersDemo />,
  },
]
