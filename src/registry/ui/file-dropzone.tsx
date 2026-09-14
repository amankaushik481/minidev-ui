"use client"
import * as React from "react"
import { UploadIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type FileDropzoneProps = {
  onFiles?: (files: FileList | File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  className?: string
  label?: string
  hint?: string
}

function FileDropzone({ onFiles, accept, multiple, disabled, className, label = "Drop files here", hint = "or click to browse" }: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [over, setOver] = React.useState(false)
  const id = React.useId()
  return (
    <div data-slot="file-dropzone" className={cn("w-full", className)}>
      <input
        id={id}
        ref={inputRef}
        type="file"
        className="sr-only"
        tabIndex={-1}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => e.target.files && onFiles?.(e.target.files)}
      />
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-controls={id}
        aria-label={`${label}. ${hint}`}
        onClick={() => { if (!disabled) inputRef.current?.click() }}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault(); setOver(false)
          if (!disabled && e.dataTransfer.files?.length) onFiles?.(e.dataTransfer.files)
        }}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-sunken px-6 py-10 text-center",
          "outline-none transition-[border-color,background-color] duration-[70ms]",
          "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          over && "border-accent bg-accent/5",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <UploadIcon className="size-5 text-fg-muted" aria-hidden />
        <span className="text-sm font-medium text-fg">{label}</span>
        <span className="text-xs text-fg-muted">{hint}</span>
      </div>
    </div>
  )
}
export { FileDropzone }
