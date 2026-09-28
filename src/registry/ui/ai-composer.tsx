"use client"
import * as React from "react"
import { ArrowUpIcon, PaperclipIcon, SquareIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"
import { ModelPicker } from "@/registry/ui/model-picker"
import { SuggestionChips } from "@/registry/ui/suggestion-chips"

const DEFAULT_MODELS = [
  { id: "gpt", label: "GPT" },
  { id: "claude", label: "Claude" },
  { id: "gemini", label: "Gemini" },
]

function AiComposer({
  value,
  onChange,
  onSubmit,
  onStop,
  streaming,
  suggestions,
  models = DEFAULT_MODELS,
  model,
  onModelChange,
  className,
}: {
  value?: string
  onChange?: (v: string) => void
  onSubmit?: () => void
  onStop?: () => void
  streaming?: boolean
  suggestions?: string[]
  models?: { id: string; label: string }[]
  model?: string
  onModelChange?: (v: string) => void
  className?: string
}) {
  return (
    <div data-slot="ai-composer" className={cn("space-y-2 rounded-2xl border border-border bg-surface p-3 shadow-highlight", className)}>
      {suggestions?.length ? (
        <SuggestionChips items={suggestions} onSelect={(s) => onChange?.(s)} />
      ) : null}
      <textarea
        aria-label="Message"
        rows={3}
        value={value}
        placeholder="Ask anything…"
        className="w-full resize-none bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted"
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            onSubmit?.()
          }
        }}
      />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Attach"><PaperclipIcon /></IconButton>
          <ModelPicker models={models} value={model} onChange={onModelChange} className="w-36" />
        </div>
        {streaming ? (
          <IconButton type="button" size="icon" variant="outline" aria-label="Stop" onClick={onStop}><SquareIcon /></IconButton>
        ) : (
          <IconButton type="button" size="icon" aria-label="Send" onClick={onSubmit} disabled={!value?.trim()}><ArrowUpIcon /></IconButton>
        )}
      </div>
    </div>
  )
}
export { AiComposer }
