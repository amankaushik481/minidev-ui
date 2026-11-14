"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Textarea } from "@/registry/ui/textarea"

/**
 * A comment box: a textarea and a submit button that stays disabled until there is text. ⌘/Ctrl+Enter submits.
 *
 * Use under a CommentThread or on an issue, invoice or review page. For an AI chat input use PromptInput or AiComposer;
 * for @mentions use MentionInput. It clears itself after `onSubmit` and hands you the trimmed text.
 *
 * @example
 * <CommentComposer onSubmit={(text) => addComment({ body: text })} submitLabel="Reply" />
 */
type CommentComposerProps = {
  /** Called with the trimmed text when the user submits. The box then clears. */
  onSubmit?: (value: string) => void
  placeholder?: string
  /** Accessible name for the textarea. Defaults to "Comment". */
  label?: string
  /** Submit button text. Defaults to "Comment". */
  submitLabel?: string
  disabled?: boolean
  className?: string
}

function CommentComposer({
  onSubmit,
  placeholder = "Add a comment…",
  label = "Comment",
  submitLabel = "Comment",
  disabled,
  className,
}: CommentComposerProps) {
  const [value, setValue] = React.useState("")
  const submit = () => {
    const text = value.trim()
    if (!text || disabled) return
    onSubmit?.(text)
    setValue("")
  }
  return (
    <form
      data-slot="comment-composer"
      className={cn("space-y-2", className)}
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <Textarea
        aria-label={label}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            submit()
          }
        }}
        rows={3}
      />
      <div className="flex items-center justify-end gap-3">
        <span aria-hidden className="text-2xs text-fg-subtle max-sm:hidden">⌘ Enter to send</span>
        <Button type="submit" size="sm" disabled={disabled || !value.trim()}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
export { CommentComposer }
export type { CommentComposerProps }
