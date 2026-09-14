"use client"
import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
function ModelPicker({ value, onChange, models, className }: { value?: string; onChange?: (v: string)=>void; models: { id: string; label: string }[]; className?: string }) {
  return (
    <div data-slot="model-picker">
      <Select value={value} onValueChange={onChange as never}>
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
