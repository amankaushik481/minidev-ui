"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { FileDropzone } from "@/registry/ui/file-dropzone"

/**
 * ImageUpload — a single-image picker: a drop zone that turns into a preview with a remove button.
 *
 * Use it for one cover, logo or photo. For a round profile picture use
 * AvatarUpload, for several files of any type use FileDropzone, and to let the
 * user frame the picture before saving use ImageCropper.
 *
 * The preview uses an object URL that the component revokes when the image is
 * replaced, removed or unmounted; upload the File from onChange, not the URL.
 *
 * @example
 * <ImageUpload value={coverUrl} onChange={(url, file) => { setCoverUrl(url); if (file) upload(file) }} />
 */
type ImageUploadProps = {
  /** Current image URL (controlled). Pass null to show the drop zone. */
  value?: string | null
  /** Called with a local preview URL and the File when an image is chosen, and with (null, null) when it is removed. */
  onChange?: (url: string | null, file?: File | null) => void
  /** Largest accepted file in bytes. Defaults to 5 MB. */
  maxSize?: number
  /** Alt text for the preview image. */
  alt?: string
  disabled?: boolean
  className?: string
}

const MB = 1024 * 1024

function ImageUpload({ value, onChange, maxSize = 5 * MB, alt = "Upload preview", disabled, className }: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(value ?? null)
  const owned = React.useRef<string | null>(null)
  // Follow a new value from the parent during render, not in an effect.
  const [seen, setSeen] = React.useState(value)
  if (seen !== value) {
    setSeen(value)
    setPreview(value ?? null)
  }
  // Revoke the object URL we created once it is no longer shown.
  React.useEffect(() => {
    const url = owned.current
    if (url && url !== preview) {
      URL.revokeObjectURL(url)
      owned.current = null
    }
  }, [preview])
  React.useEffect(() => () => {
    if (owned.current) URL.revokeObjectURL(owned.current)
  }, [])

  return (
    <div data-slot="image-upload" className={cn("relative w-full", className)}>
      {preview ? (
        <div className="relative overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt={alt} className="h-48 w-full object-cover" />
          <button
            type="button"
            aria-label="Remove image"
            disabled={disabled}
            className="absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-lg border border-border bg-surface text-fg shadow-xs outline-none transition-colors duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50"
            onClick={() => {
              setPreview(null)
              onChange?.(null, null)
            }}
          >
            <XIcon className="size-4" aria-hidden />
          </button>
        </div>
      ) : (
        <FileDropzone
          disabled={disabled}
          accept="image/*"
          multiple={false}
          maxSize={maxSize}
          label="Drop an image"
          onFiles={(files) => {
            const file = files[0]
            if (!file) return
            const url = URL.createObjectURL(file)
            owned.current = url
            setPreview(url)
            onChange?.(url, file)
          }}
        />
      )}
    </div>
  )
}
export { ImageUpload }
export type { ImageUploadProps }
