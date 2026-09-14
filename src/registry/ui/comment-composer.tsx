"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Textarea } from "@/registry/ui/textarea"

function CommentComposer({
  onSubmit,
  placeholder = "Add a comment…",
  className,
}: {
  onSubmit?: (value: string) => void
  placeholder?: string
  className?: string
}) {
  const [value, setValue] = React.useState("")
  return (
    <div data-slot="comment-composer" className={cn("space-y-2", className)}>
      <Textarea
        aria-label="Comment"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
      />
      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          disabled={!value.trim()}
          onClick={() => {
            onSubmit?.(value.trim())
            setValue("")
          }}
        >
          Comment
        </Button>
      </div>
    </div>
  )
}
export { CommentComposer }
