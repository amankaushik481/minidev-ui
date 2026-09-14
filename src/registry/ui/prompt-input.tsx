"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Textarea } from "@/registry/ui/textarea"
function PromptInput({ value, onChange, onSubmit, disabled, className, placeholder="Message…" }: {
  value?: string; onChange?: (v: string)=>void; onSubmit?: ()=>void; disabled?: boolean; className?: string; placeholder?: string
}) {
  return (
    <div data-slot="prompt-input" className={cn("rounded-xl border border-border bg-surface p-2 shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]", className)}>
      <Textarea
        aria-label="Prompt"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className="min-h-20 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e)=>onChange?.(e.target.value)}
        onKeyDown={(e)=>{ if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); onSubmit?.() } }}
      />
      <div className="mt-2 flex justify-end"><Button size="sm" disabled={disabled || !value?.trim()} onClick={onSubmit}>Send</Button></div>
    </div>
  )
}
export { PromptInput }
