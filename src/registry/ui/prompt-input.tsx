"use client"
import * as React from "react"
import { ArrowUpIcon, PaperclipIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * PromptInput — the composer. Grows with content, submits on Enter,
 * Shift+Enter for a newline. The whole shell takes the focus halo.
 */
function PromptInput({
  value,
  onChange,
  onSubmit,
  disabled,
  className,
  placeholder = "Message…",
  toolbar,
}: {
  value?: string
  onChange?: (v: string) => void
  onSubmit?: () => void
  disabled?: boolean
  className?: string
  placeholder?: string
  /** Optional left-side toolbar content (model picker, chips…). */
  toolbar?: React.ReactNode
}) {
  const ref = React.useRef<HTMLTextAreaElement>(null)
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "0px"
    el.style.height = Math.min(el.scrollHeight, 240) + "px"
  }, [value])
  const canSend = !disabled && !!value?.trim()
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
        aria-label="Prompt"
        rows={1}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className="block max-h-60 min-h-[52px] w-full resize-none bg-transparent px-4 pt-3.5 pb-1 text-[0.9375rem] leading-[1.55] text-fg outline-none placeholder:text-fg-subtle"
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (canSend) onSubmit?.()
          }
        }}
      />
      <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5">
        <div className="flex min-w-0 items-center gap-1">
          <button
            type="button"
            aria-label="Attach file"
            className="inline-flex size-8 items-center justify-center rounded-lg text-fg-subtle outline-none transition-colors hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
          >
            <PaperclipIcon className="size-4" />
          </button>
          {toolbar}
        </div>
        <button
          type="button"
          aria-label="Send"
          disabled={!canSend}
          onClick={onSubmit}
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-full outline-none",
            "transition-[background-color,color,transform,box-shadow] duration-[140ms] ease-hairline",
            "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            canSend ? "bg-ink text-on-ink shadow-ink hover:bg-ink-hover active:translate-y-[0.5px]" : "bg-sunken text-fg-subtle"
          )}
        >
          <ArrowUpIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
export { PromptInput }
