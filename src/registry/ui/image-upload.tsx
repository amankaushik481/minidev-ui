"use client"
import * as React from "react"
import { ImageIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { FileDropzone } from "@/registry/ui/file-dropzone"

type ImageUploadProps = {
  value?: string | null
  onChange?: (url: string | null, file?: File | null) => void
  disabled?: boolean
  className?: string
}

function ImageUpload({ value, onChange, disabled, className }: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(value ?? null)
  React.useEffect(() => { setPreview(value ?? null) }, [value])
  return (
    <div data-slot="image-upload" className={cn("relative w-full", className)}>
      {preview ? (
        <div className="relative overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Upload preview" className="h-48 w-full object-cover" />
          <button
            type="button"
            aria-label="Remove image"
            disabled={disabled}
            className="absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-lg border border-border bg-surface text-fg"
            onClick={() => { setPreview(null); onChange?.(null, null) }}
          >
            <XIcon className="size-4" />
          </button>
        </div>
      ) : (
        <FileDropzone
          disabled={disabled}
          accept="image/*"
          label="Drop an image"
          hint="PNG, JPG up to 5MB"
          onFiles={(files) => {
            const file = Array.from(files)[0]
            if (!file) return
            const url = URL.createObjectURL(file)
            setPreview(url)
            onChange?.(url, file)
          }}
        />
      )}
      {!preview ? <ImageIcon className="pointer-events-none absolute top-4 left-4 size-4 text-fg-subtle opacity-0" /> : null}
    </div>
  )
}
export { ImageUpload }
