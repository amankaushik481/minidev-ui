"use client"
import * as React from "react"
import { ArrowUpIcon, PaperclipIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * PromptInput — the AI chat composer: grows with content, sends on Enter, Shift+Enter for a newline.
 *
 * The whole shell takes the focus halo.
 *
 * Use it at the bottom of any AI chat. Controlled (`value` + `onChange`) or uncontrolled
 * (`defaultValue`); either way `onSubmit` receives the current text. Enter while an IME is
 * composing does not send. For a plain multi-line field use Textarea.
 *
 * @example
 * const [prompt, setPrompt] = React.useState("")
 * <PromptInput value={prompt} onChange={setPrompt} onSubmit={(text) => { send(text); setPrompt("") }} />
 */
function PromptInput({
  value,
  defaultValue,
  onChange,
  onSubmit,
  onAttach,
  disabled,
  className,
  placeholder = "Message…",
  toolbar,
  "aria-label": ariaLabel = "Prompt",
}: {
  /** Controlled text. */
  value?: string
  /** Starting text when uncontrolled. */
  defaultValue?: string
  /** Fires with the new text on every keystroke. */
  onChange?: (v: string) => void
  /** Fires with the text on Enter or the Send button, only when it is not blank. */
  onSubmit?: (value: string) => void
  /** Fires when the paperclip button is pressed. Open your file picker here. */
  onAttach?: () => void
  disabled?: boolean
  className?: string
  placeholder?: string
  /** Optional left-side toolbar content (model picker, chips…). */
  toolbar?: React.ReactNode
  /** Accessible name of the text area. */
  "aria-label"?: string
}) {
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const [inner, setInner] = React.useState(defaultValue ?? "")
  const text = value ?? inner
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "0px"
    el.style.height = Math.min(el.scrollHeight, 240) + "px"
  }, [text])
  const canSend = !disabled && !!text.trim()
  const submit = () => {
    if (!canSend) return
    onSubmit?.(text)
    if (value === undefined) setInner("")
  }
  return (
    <div
      data-slot="prompt-input"
      className={cn(
        "group/prompt rounded-2xl border border-border bg-surface shadow-md",
        "transition-[border-color,box-shadow] duration-[140ms] ease-hairline",
        "focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-soft),var(--sh-md)]",
        disabled && "opacity-60",
        className
      )}
    >
      <textarea
        ref={ref}
        aria-label={ariaLabel}
        rows={1}
        value={text}
        disabled={disabled}
        placeholder={placeholder}
        enterKeyHint="send"
        className="block max-h-60 min-h-[52px] w-full resize-none bg-transparent px-4 pt-3.5 pb-1 text-[0.9375rem] leading-[1.55] text-fg outline-none placeholder:text-fg-subtle"
        onChange={(e) => {
          if (value === undefined) setInner(e.target.value)
          onChange?.(e.target.value)
        }}
        onKeyDown={(e) => {
          // keyCode 229 covers Safari, which ends composition before keydown fires.
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
            e.preventDefault()
            submit()
          }
        }}
      />
      <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5">
        <div className="flex min-w-0 items-center gap-1">
          <button
            type="button"
            aria-label="Attach file"
            disabled={disabled}
            onClick={onAttach}
            className="inline-flex size-8 items-center justify-center rounded-lg text-fg-subtle outline-none transition-colors hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none"
          >
            <PaperclipIcon className="size-4" aria-hidden />
          </button>
          {toolbar}
        </div>
        <button
          type="button"
          aria-label="Send"
          disabled={!canSend}
          onClick={submit}
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-full outline-none",
            "transition-[background-color,color,transform,box-shadow] duration-[140ms] ease-hairline",
            "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            canSend ? "bg-ink text-on-ink shadow-ink hover:bg-ink-hover active:translate-y-[0.5px]" : "bg-sunken text-fg-subtle"
          )}
        >
          <ArrowUpIcon className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
export { PromptInput }
