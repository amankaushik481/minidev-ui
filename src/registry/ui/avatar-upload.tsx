"use client"
import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * A profile photo picker: the current avatar with an Upload button that opens the file chooser and previews the pick.
 *
 * Use in profile and team settings. It previews locally and hands you the `File`; uploading is
 * yours. Prefer `ImageUpload` for larger images with drag and drop, and `FileDropzone` for any file.
 *
 * @example
 * <AvatarUpload name="Maya Chen" src={user.avatarUrl} onChange={(file) => uploadAvatar(file)} />
 */
type AvatarUploadProps = {
  /** Person's name, for the image alt text and the initials fallback. */
  name?: string
  /** Current photo URL, shown until a new file is picked. */
  src?: string
  /** Called with the picked image file. */
  onChange?: (file: File) => void
  /** Text on the button. */
  buttonLabel?: string
  className?: string
}

function AvatarUpload({ name = "User", src, onChange, buttonLabel = "Upload", className }: AvatarUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  // Free the previous object URL when a new one replaces it or the component unmounts.
  React.useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview)
  }, [preview])
  const shown = preview ?? src
  const initials = name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  return (
    <div data-slot="avatar-upload" className={cn("flex items-center gap-3", className)}>
      <Avatar className="size-14">
        {shown ? <AvatarImage src={shown} alt={name} /> : null}
        <AvatarFallback aria-hidden>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <Button type="button" size="sm" variant="outline" aria-label={`${buttonLabel} photo for ${name}`} onClick={() => inputRef.current?.click()}>
          {buttonLabel}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0]
            e.target.value = ""
            if (!f) return
            setPreview(URL.createObjectURL(f))
            onChange?.(f)
          }}
        />
      </div>
    </div>
  )
}
export { AvatarUpload }
export type { AvatarUploadProps }
