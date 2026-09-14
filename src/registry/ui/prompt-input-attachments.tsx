"use client"
import * as React from "react"
import { PaperclipIcon } from "lucide-react"
import { PromptInput } from "@/registry/ui/prompt-input"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
function PromptInputWithAttachments({ className, ...props }: React.ComponentProps<typeof PromptInput> & { onAttach?: () => void }) {
  const { onAttach, ...rest } = props as React.ComponentProps<typeof PromptInput> & { onAttach?: () => void }
  return (
    <div data-slot="prompt-input-attachments" className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Button type="button" size="icon-sm" variant="outline" aria-label="Attach file" onClick={onAttach}><PaperclipIcon /></Button>
        <span className="text-xs text-fg-muted">Attachments optional</span>
      </div>
      <PromptInput {...rest} />
    </div>
  )
}
export { PromptInputWithAttachments }
