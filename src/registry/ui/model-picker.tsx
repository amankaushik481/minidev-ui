"use client"
import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

/** ModelPicker — a select for choosing an AI model, controlled or uncontrolled. */

type Model = { id: string; label: string }

// Models available to the Lumen assistant.
const SAMPLE_MODELS: Model[] = [
  { id: "lumen-mini", label: "Lumen Mini" },
  { id: "lumen-pro", label: "Lumen Pro" },
  { id: "lumen-ultra", label: "Lumen Ultra" },
  { id: "atlas-8b", label: "Atlas 8B (self-hosted)" },
]

type ModelPickerProps = {
  /** Controlled model id. */
  value?: string
  /** Initial model id when uncontrolled; pass null to start on the placeholder. */
  defaultValue?: string | null
  onChange?: (v: string) => void
  models?: Model[]
  className?: string
}

function ModelPicker({ models = SAMPLE_MODELS, value, defaultValue = models[0]?.id, onChange, className }: ModelPickerProps) {
  const items = models.map((m) => ({ value: m.id, label: m.label }))
  return (
    <div data-slot="model-picker">
      <Select
        items={items}
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        onValueChange={(v) => onChange?.(v as string)}
      >
      <SelectTrigger className={className ?? "w-56"} aria-label="Model">
        <SelectValue placeholder="Select model" />
      </SelectTrigger>
      <SelectContent>
        {models.map(m => <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>)}
      </SelectContent>
    </Select>
    </div>
  )
}
export { ModelPicker }
export type { ModelPickerProps, Model }
