"use client"
import * as React from "react"
import { PaperclipIcon } from "lucide-react"
import { PromptInput } from "@/registry/ui/prompt-input"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * PromptInputWithAttachments — a PromptInput with an attach row above it for file uploads.
 *
 * Use it when attachments are a first-class part of the prompt and deserve their own row.
 * Otherwise pass `onAttach` to PromptInput and use its built-in paperclip. Takes every
 * PromptInput prop; `onAttach` goes to the top button only, so the inner PromptInput shows no paperclip.
 *
 * @example
 * <PromptInputWithAttachments value={prompt} onChange={setPrompt} onSubmit={send} onAttach={() => fileInput.current?.click()} hint="PDF or CSV, up to 10 MB" />
 */
function PromptInputWithAttachments({
  className,
  onAttach,
  hint = "Attachments optional",
  ...rest
}: React.ComponentProps<typeof PromptInput> & {
  /** Short note next to the attach button, read as its description. */
  hint?: React.ReactNode
}) {
  const hintId = React.useId()
  return (
    <div data-slot="prompt-input-attachments" className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Button type="button" size="icon-sm" variant="outline" aria-label="Attach file" aria-describedby={hint ? hintId : undefined} disabled={rest.disabled} onClick={onAttach}>
          <PaperclipIcon aria-hidden />
        </Button>
        {hint ? <span id={hintId} className="text-xs text-fg-muted">{hint}</span> : null}
      </div>
      <PromptInput {...rest} />
    </div>
  )
}
// alias: the house rule says exports are PascalCase of the file name
export { PromptInputWithAttachments, PromptInputWithAttachments as PromptInputAttachments }
