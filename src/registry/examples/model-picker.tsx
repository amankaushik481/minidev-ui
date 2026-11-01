"use client"
import * as React from "react"
import { ModelPicker } from "@/registry/ui/model-picker"
import type { Example } from "./types"

const MODELS = [
  { id: "lumen-mini", label: "Lumen Mini" },
  { id: "lumen-pro", label: "Lumen Pro" },
  { id: "lumen-ultra", label: "Lumen Ultra" },
]

const PRICING: Record<string, string> = {
  "lumen-mini": "$0.40 per million tokens, fastest",
  "lumen-pro": "$3.00 per million tokens, best for most tasks",
  "lumen-ultra": "$15.00 per million tokens, long reasoning",
}

function ControlledDemo() {
  const [model, setModel] = React.useState("lumen-pro")
  return (
    <div className="flex flex-col gap-2">
      <ModelPicker models={MODELS} value={model} onChange={setModel} />
      <p className="text-xs text-fg-muted">{PRICING[model]}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom models",
    description: "Pass your own id and label pairs; the first one is selected unless defaultValue says otherwise.",
    code: `<ModelPicker
  models={[
    { id: "atlas-8b", label: "Atlas 8B (self-hosted)" },
    { id: "atlas-70b", label: "Atlas 70B (self-hosted)" },
    { id: "lumen-pro", label: "Lumen Pro (cloud)" },
  ]}
  defaultValue="atlas-70b"
/>`,
    node: (
      <ModelPicker
        models={[
          { id: "atlas-8b", label: "Atlas 8B (self-hosted)" },
          { id: "atlas-70b", label: "Atlas 70B (self-hosted)" },
          { id: "lumen-pro", label: "Lumen Pro (cloud)" },
        ]}
        defaultValue="atlas-70b"
      />
    ),
  },
  {
    title: "Controlled value",
    description: "Hold the model id in state to show pricing or limits for the current choice and send it with the next request.",
    code: `const MODELS = [
  { id: "lumen-mini", label: "Lumen Mini" },
  { id: "lumen-pro", label: "Lumen Pro" },
  { id: "lumen-ultra", label: "Lumen Ultra" },
]

const PRICING: Record<string, string> = {
  "lumen-mini": "$0.40 per million tokens, fastest",
  "lumen-pro": "$3.00 per million tokens, best for most tasks",
  "lumen-ultra": "$15.00 per million tokens, long reasoning",
}

function ControlledDemo() {
  const [model, setModel] = React.useState("lumen-pro")
  return (
    <div className="flex flex-col gap-2">
      <ModelPicker models={MODELS} value={model} onChange={setModel} />
      <p className="text-xs text-fg-muted">{PRICING[model]}</p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Start on the placeholder",
    description: "defaultValue null leaves the trigger on Select model until someone picks; className sets the trigger width.",
    code: `<ModelPicker defaultValue={null} className="w-72" />`,
    node: <ModelPicker defaultValue={null} className="w-72" />,
  },
]
