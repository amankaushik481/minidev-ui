"use client"
import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
function AvatarUpload({ name = "User", className }: { name?: string; className?: string }) {
  const [src, setSrc] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <div data-slot="avatar-upload" className={cn("flex items-center gap-3", className)}>
      <Avatar className="size-14">
        {src ? <AvatarImage src={src} alt={name} /> : null}
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <Button type="button" size="sm" variant="outline" onClick={() => inputRef.current?.click()}>
          Upload
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) setSrc(URL.createObjectURL(f))
          }}
        />
      </div>
    </div>
  )
}
export { AvatarUpload }
