"use client"
import * as React from "react"
import { ArrowUpIcon, PaperclipIcon, SquareIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"
import { ModelPicker } from "@/registry/ui/model-picker"
import { SuggestionChips } from "@/registry/ui/suggestion-chips"

/**
 * A chat input for AI apps: multiline prompt, suggestion chips, model picker, attach, and a send button that becomes stop while streaming.
 *
 * Use as the input of a chat or assistant panel. Prefer `PromptInput` for a composer that grows
 * with its text and takes your own `toolbar`, and `Textarea` for plain forms. Enter sends, Shift+Enter adds a line,
 * and Enter during IME composition is left alone. Works controlled (`value` + `onChange`) or
 * uncontrolled (`defaultValue`; it clears itself after `onSubmit`).
 *
 * @example
 * const [msg, setMsg] = React.useState("")
 * <AiComposer value={msg} onChange={setMsg} onSubmit={(text) => { send(text); setMsg("") }}
 *   streaming={isStreaming} onStop={stop} suggestions={["Summarize INV-2041"]} />
 */
type AiComposerModel = { id: string; label: string }

type AiComposerProps = {
  /** Controlled prompt text. */
  value?: string
  /** Initial text when uncontrolled. */
  defaultValue?: string
  /** Called on every edit and when a suggestion chip is picked. */
  onChange?: (value: string) => void
  /** Called on Enter or the send button with the trimmed prompt. Not called when empty or streaming. */
  onSubmit?: (value: string) => void
  /** Called by the stop button while `streaming`. */
  onStop?: () => void
  /** While true the send button becomes a stop button. */
  streaming?: boolean
  /** Prompt starters shown above the input; picking one fills the input. */
  suggestions?: string[]
  /** Models offered in the picker. */
  models?: AiComposerModel[]
  /** Controlled model id. */
  model?: string
  onModelChange?: (id: string) => void
  /** Called by the paperclip button, which only renders when this is set. Wire it to a file input or picker. */
  onAttach?: () => void
  placeholder?: string
  /** Accessible name for the text area. */
  label?: string
  disabled?: boolean
  className?: string
}

const DEFAULT_MODELS: AiComposerModel[] = [
  { id: "gpt", label: "GPT" },
  { id: "claude", label: "Claude" },
  { id: "gemini", label: "Gemini" },
]

function AiComposer({
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  onStop,
  streaming,
  suggestions,
  models = DEFAULT_MODELS,
  model,
  onModelChange,
  onAttach,
  placeholder = "Ask anything…",
  label = "Message",
  disabled,
  className,
}: AiComposerProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const controlled = value !== undefined
  const text = controlled ? value : inner
  const canSend = !disabled && !streaming && text.trim().length > 0
  const set = (v: string) => {
    if (!controlled) setInner(v)
    onChange?.(v)
  }
  const submit = () => {
    if (!canSend) return
    onSubmit?.(text.trim())
    if (!controlled) setInner("")
  }
  return (
    <div
      data-slot="ai-composer"
      className={cn(
        "space-y-2 rounded-2xl border border-border bg-surface p-3 shadow-highlight transition-[border-color,box-shadow] duration-[140ms]",
        "has-[textarea:focus]:border-accent has-[textarea:focus]:ring-3 has-[textarea:focus]:ring-accent-soft",
        disabled && "opacity-60",
        className
      )}
    >
      {suggestions?.length ? <SuggestionChips items={suggestions} onSelect={set} /> : null}
      <textarea
        aria-label={label}
        rows={3}
        value={text}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full resize-none bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted disabled:cursor-not-allowed"
        onChange={(e) => set(e.target.value)}
        onKeyDown={(e) => {
          // keyCode 229 covers Safari, which ends composition before keydown fires.
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
            e.preventDefault()
            submit()
          }
        }}
      />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {onAttach ? (
            <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Attach a file" onClick={onAttach} disabled={disabled}>
              <PaperclipIcon />
            </IconButton>
          ) : null}
          <ModelPicker models={models} value={model} onChange={onModelChange} className="w-36" />
        </div>
        {streaming ? (
          <IconButton type="button" size="icon" variant="outline" aria-label="Stop generating" onClick={onStop}>
            <SquareIcon />
          </IconButton>
        ) : (
          <IconButton type="button" size="icon" aria-label="Send" onClick={submit} disabled={!canSend}>
            <ArrowUpIcon />
          </IconButton>
        )}
      </div>
    </div>
  )
}
export { AiComposer }
export type { AiComposerProps, AiComposerModel }
