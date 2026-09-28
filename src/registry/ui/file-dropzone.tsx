"use client"
import * as React from "react"
import { ArrowUpIcon, CheckIcon, RotateCwIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * GOLD STANDARD COMPONENT.
 * A drop target with four designed states (rest, hover, drag-accept,
 * drag-reject), a hairline dashed border drawn in SVG so the dashes stay crisp
 * and can march while dragging, and a file list with progress, error, retry.
 */

type UploadStatus = "uploading" | "done" | "error"

type UploadFile = {
  id: string
  file: File
  progress: number
  status: UploadStatus
  error?: string
  /** Failed validation (type/size), so retry makes no sense. */
  invalid?: boolean
  preview?: string
}

type FileDropzoneProps = {
  /** Called with accepted files every time files are added. */
  onFiles?: (files: File[]) => void
  /**
   * Optional uploader. Call onProgress(0..1) as bytes go out; throw to fail.
   * Without it, files are listed as done immediately.
   */
  upload?: (file: File, onProgress: (p: number) => void) => Promise<void>
  accept?: string
  multiple?: boolean
  /** Bytes. */
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  /** Show the file list under the zone. */
  showList?: boolean
  label?: string
  hint?: string
  className?: string
}

const fmt = (b: number) =>
  b < 1024 ? `${b} B` : b < 1024 ** 2 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1024 ** 2).toFixed(1)} MB`

function matches(accept: string | undefined, type: string, name = "") {
  if (!accept) return true
  return accept.split(",").some((raw) => {
    const a = raw.trim().toLowerCase()
    if (!a) return false
    if (a.startsWith(".")) return name.toLowerCase().endsWith(a)
    if (a.endsWith("/*")) return type.toLowerCase().startsWith(a.slice(0, -1))
    return type.toLowerCase() === a
  })
}

function describeAccept(accept?: string) {
  if (!accept) return null
  return accept
    .split(",")
    .map((a) => a.trim().replace(/^\./, "").replace("image/*", "images").replace(/^.*\//, "").toUpperCase())
    .join(", ")
}

function extOf(name: string) {
  const e = name.split(".").pop()
  return e && e !== name ? e.slice(0, 4).toUpperCase() : "FILE"
}

function FileDropzone({
  onFiles,
  upload,
  accept,
  multiple = true,
  maxSize,
  maxFiles,
  disabled,
  showList = true,
  label = "Drop files to upload",
  hint,
  className,
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const depth = React.useRef(0)
  const [drag, setDrag] = React.useState<"idle" | "accept" | "reject">("idle")
  const [files, setFiles] = React.useState<UploadFile[]>([])
  const [announce, setAnnounce] = React.useState("")
  const id = React.useId()
  const hintText =
    hint ??
    [describeAccept(accept), maxSize ? `up to ${fmt(maxSize)}` : null].filter(Boolean).join(" · ") ??
    ""

  // Revoke object URLs on unmount.
  const filesRef = React.useRef(files)
  filesRef.current = files
  React.useEffect(() => () => filesRef.current.forEach((f) => f.preview && URL.revokeObjectURL(f.preview)), [])

  const patch = (fid: string, p: Partial<UploadFile>) =>
    setFiles((list) => list.map((f) => (f.id === fid ? { ...f, ...p } : f)))

  const run = React.useCallback(
    async (u: UploadFile) => {
      if (!upload) return patch(u.id, { progress: 1, status: "done" })
      patch(u.id, { status: "uploading", progress: 0, error: undefined })
      try {
        await upload(u.file, (p) => patch(u.id, { progress: Math.max(0, Math.min(1, p)) }))
        patch(u.id, { progress: 1, status: "done" })
      } catch (err) {
        patch(u.id, { status: "error", error: err instanceof Error ? err.message : "Upload failed" })
      }
    },
    [upload]
  )

  const add = (list: FileList | File[]) => {
    const incoming = Array.from(list).slice(0, multiple ? undefined : 1)
    const room = maxFiles ? Math.max(0, maxFiles - files.length) : incoming.length
    const next: UploadFile[] = incoming.slice(0, room).map((file) => {
      const bad = !matches(accept, file.type, file.name)
        ? `${extOf(file.name)} files aren't accepted`
        : maxSize && file.size > maxSize
          ? `Larger than ${fmt(maxSize)}`
          : undefined
      return {
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        progress: 0,
        status: bad ? "error" : "uploading",
        error: bad,
        invalid: !!bad,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }
    })
    if (!next.length) return
    setFiles((l) => (multiple ? [...l, ...next] : next))
    const ok = next.filter((f) => !f.error)
    if (ok.length) onFiles?.(ok.map((f) => f.file))
    setAnnounce(`${next.length} file${next.length > 1 ? "s" : ""} added`)
    ok.forEach(run)
  }

  const remove = (fid: string) =>
    setFiles((l) => {
      const f = l.find((x) => x.id === fid)
      if (f?.preview) URL.revokeObjectURL(f.preview)
      return l.filter((x) => x.id !== fid)
    })

  const open = () => !disabled && inputRef.current?.click()

  const dragKind = (e: React.DragEvent): "accept" | "reject" => {
    const items = Array.from(e.dataTransfer.items ?? []).filter((i) => i.kind === "file")
    if (!items.length) return "accept"
    if (!multiple && items.length > 1) return "reject"
    return items.every((i) => !i.type || matches(accept, i.type)) ? "accept" : "reject"
  }

  const over = drag !== "idle"
  const reject = drag === "reject"

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
        onChange={(e) => {
          if (e.target.files) add(e.target.files)
          e.target.value = ""
        }}
      />
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-describedby={`${id}-hint`}
        data-drag={drag}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            open()
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault()
          if (disabled) return
          depth.current += 1
          setDrag(dragKind(e))
        }}
        onDragOver={(e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = reject || disabled ? "none" : "copy"
        }}
        onDragLeave={() => {
          depth.current = Math.max(0, depth.current - 1)
          if (depth.current === 0) setDrag("idle")
        }}
        onDrop={(e) => {
          e.preventDefault()
          depth.current = 0
          setDrag("idle")
          if (!disabled && e.dataTransfer.files?.length) add(e.dataTransfer.files)
        }}
        className={cn(
          "group/drop relative isolate flex w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl px-6 py-10 text-center outline-none",
          "bg-surface transition-[background-color] duration-[140ms] ease-hairline",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          !over && "hover:bg-sunken/60",
          over && !reject && "bg-accent-soft",
          reject && "bg-[color-mix(in_oklch,var(--danger)_6%,var(--surface))]",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        {/* Hairline dashed border: crisp at any size, marches while dragging. */}
        <svg aria-hidden className="pointer-events-none absolute inset-[0.5px] size-[calc(100%-1px)] overflow-visible">
          <rect
            width="100%"
            height="100%"
            rx="11.5"
            fill="none"
            strokeWidth="1"
            strokeDasharray="6 5"
            className={cn(
              "transition-[stroke] duration-[140ms]",
              reject ? "stroke-danger" : over ? "stroke-accent" : "stroke-border-strong group-hover/drop:stroke-fg-subtle",
              over && !reject && "animate-[dash-march_0.6s_linear_infinite]"
            )}
          />
        </svg>
        {/* Soft dot field that appears under the cursor while dragging. */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 bg-dots opacity-0 transition-opacity duration-200 [mask-image:radial-gradient(60%_70%_at_50%_45%,black,transparent)]",
            over && "opacity-100"
          )}
        />
        <span
          className={cn(
            "grid size-10 place-items-center rounded-[10px] border shadow-key transition-[transform,background-color,border-color,color] duration-200 ease-hairline",
            reject
              ? "border-danger/40 bg-surface text-danger"
              : over
                ? "-translate-y-1 border-accent bg-accent text-on-accent shadow-ink"
                : "border-border bg-raised text-fg-muted group-hover/drop:-translate-y-0.5 group-hover/drop:text-fg"
          )}
        >
          {reject ? <XIcon className="size-4" /> : <ArrowUpIcon className="size-4" />}
        </span>
        <div className="space-y-1">
          <p className="text-sm font-medium text-fg">
            {reject ? "That file type won't work" : over ? "Release to upload" : label}
          </p>
          <p id={`${id}-hint`} className="text-xs text-fg-muted">
            {reject ? (
              describeAccept(accept) ? `Only ${describeAccept(accept)}` : "Try one file at a time"
            ) : (
              <>
                <span className="font-medium text-fg underline decoration-border-strong underline-offset-[3px] transition-colors group-hover/drop:decoration-fg-subtle">
                  Browse
                </span>{" "}
                or drag here{hintText ? ` · ${hintText}` : ""}
              </>
            )}
          </p>
        </div>
      </div>

      {showList && files.length > 0 ? (
        <ul className="mt-3 space-y-2" aria-label="Files">
          {files.map((f) => (
            <FileRow key={f.id} f={f} onRemove={() => remove(f.id)} onRetry={f.status === "error" && !f.invalid && upload ? () => run(f) : undefined} />
          ))}
        </ul>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {announce}
      </span>
    </div>
  )
}

function FileRow({ f, onRemove, onRetry }: { f: UploadFile; onRemove: () => void; onRetry?: () => void }) {
  const pct = Math.round(f.progress * 100)
  const error = f.status === "error"
  const done = f.status === "done"
  return (
    <li
      data-status={f.status}
      className={cn(
        "group/file relative flex animate-[rise-in_220ms_var(--ease-hairline)_both] items-center gap-3 overflow-hidden rounded-xl border bg-surface p-2.5 pr-3 shadow-raised",
        error ? "border-[color-mix(in_oklch,var(--danger)_40%,transparent)]" : "border-border"
      )}
    >
      <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-sunken">
        {f.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={f.preview} alt="" className="size-full object-cover" />
        ) : (
          <span className="font-mono text-[9px] font-semibold tracking-[0.04em] text-fg-muted">{extOf(f.file.name)}</span>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[0.8125rem] font-medium text-fg">{f.file.name}</p>
          {done ? (
            <span className="grid size-4 shrink-0 animate-[pop-in_280ms_var(--ease-hairline)_both] place-items-center rounded-full bg-success text-white">
              <CheckIcon className="size-2.5" strokeWidth={3} />
            </span>
          ) : null}
        </div>
        <p className={cn("mt-0.5 text-xs tabular-nums", error ? "text-danger" : "text-fg-muted")}>
          {error ? f.error : `${fmt(f.file.size)}${f.status === "uploading" ? ` · ${pct}%` : " · Uploaded"}`}
        </p>
      </div>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          aria-label={`Retry ${f.file.name}`}
          className="grid size-7 place-items-center rounded-md text-fg-muted outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
        >
          <RotateCwIcon className="size-3.5" />
        </button>
      ) : null}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${f.file.name}`}
        className="grid size-7 place-items-center rounded-md text-fg-subtle outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
      >
        <XIcon className="size-3.5" />
      </button>
      {f.status === "uploading" ? (
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-sunken">
          <span
            className="block h-full origin-left bg-accent transition-transform duration-200 ease-hairline"
            style={{ transform: `scaleX(${f.progress})` }}
          />
        </span>
      ) : null}
    </li>
  )
}

export { FileDropzone }
export type { FileDropzoneProps, UploadFile }
