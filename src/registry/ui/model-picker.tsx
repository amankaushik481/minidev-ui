"use client"
import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

/**
 * ModelPicker — a select for choosing an AI model, controlled or uncontrolled.
 *
 * Built on the kit's Select (Base UI): full keyboard support, typeahead and a
 * labelled trigger. Use it in chat composers and AI settings; to compare models
 * side by side use ModelCompare.
 *
 * @example
 * const [model, setModel] = React.useState("lumen-pro")
 * <ModelPicker value={model} onChange={setModel} models={[{ id: "lumen-pro", label: "Lumen Pro" }]} />
 */

type Model = {
  /** Value passed to onChange. */
  id: string
  /** Text shown in the list and the trigger. */
  label: string
}

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
  /** Fires with the chosen model id. */
  onChange?: (v: string) => void
  /** Options in display order. */
  models?: Model[]
  /** Trigger text when nothing is selected. */
  placeholder?: string
  disabled?: boolean
  /** Form field name; when set, the chosen model id is submitted with the form. */
  name?: string
  /** Accessible name for the trigger. Defaults to "Model". */
  "aria-label"?: string
  /** Classes for the trigger. Defaults to a 224px width. */
  className?: string
}

function ModelPicker({
  models = SAMPLE_MODELS,
  value,
  defaultValue = models[0]?.id,
  onChange,
  placeholder = "Select model",
  disabled,
  name,
  "aria-label": ariaLabel = "Model",
  className,
}: ModelPickerProps) {
  const items = models.map((m) => ({ value: m.id, label: m.label }))
  return (
    <div data-slot="model-picker">
      <Select
        items={items}
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        onValueChange={(v) => {
          if (typeof v === "string") onChange?.(v)
        }}
        disabled={disabled}
        name={name}
      >
      <SelectTrigger className={className ?? "w-56"} aria-label={ariaLabel}>
        <SelectValue placeholder={placeholder} />
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
