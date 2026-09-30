import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-file-upload-dropzone",
  title: "File upload in React: dropzone, progress and previews",
  description:
    "Build file upload in React with a drag and drop dropzone, accept rules, real upload progress, presigned S3 URLs, cancel and retry, and image previews.",
  date: "2026-09-30",
  keywords: [
    "react file upload",
    "drag and drop file upload react",
    "react dropzone tailwind",
    "react upload progress bar",
    "presigned url upload react",
  ],
  related: ["file-dropzone", "image-upload", "avatar-upload", "file-list", "file-row", "progress", "button"],
  body: [
    {
      type: "p",
      text: "File upload in React comes down to a drop target that also opens the file picker, client-side checks for type and size, an upload function that reports progress (XMLHttpRequest, because `fetch` has no upload progress event), and a list that shows each file's state with cancel and retry. For anything larger than a few megabytes, upload straight to object storage with a presigned URL instead of through your server. MiniDev UI's free `FileDropzone` handles the drop target, validation, progress, retry and image previews; this guide shows how to plug real uploads into it.",
    },

    { type: "h2", text: "The components", id: "components-overview" },
    {
      type: "list",
      items: [
        "[FileDropzone](/docs/file-dropzone): the drop target with rest, hover, drag-accept and drag-reject states, plus a file list with thumbnails, progress bars, errors, retry and remove.",
        "[ImageUpload](/docs/image-upload): a single-image field that swaps the dropzone for a 192px-tall preview with a remove button.",
        "[AvatarUpload](/docs/avatar-upload): an avatar with an Upload button. It is a visual demo: it shows the picked image but has no `onChange`, so copy it and add one.",
        "[FileList](/docs/file-list) and [FileRow](/docs/file-row): rows for files that are already stored, with an optional download button.",
      ],
    },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/file-dropzone.json https://ui.minidev.pro/r/image-upload.json https://ui.minidev.pro/r/file-list.json https://ui.minidev.pro/r/progress.json",
    },

    { type: "h2", text: "Accept rules, size limits and multiple files", id: "accept-rules" },
    {
      type: "code",
      lang: "tsx",
      code: '<FileDropzone\n  accept="image/*,application/pdf,text/csv,.csv"\n  maxSize={10 * 1024 * 1024}\n  maxFiles={5}\n  onFiles={(files) => console.log(files)}\n/>',
    },
    {
      type: "list",
      items: [
        "`accept` uses the same syntax as the input's `accept` attribute: MIME types (`application/pdf`), wildcards (`image/*`) and extensions (`.csv`). It is passed to the native input, so the picker filters too.",
        "While dragging, the zone reads the MIME types from `dataTransfer.items` and switches to a red reject state before the user lets go. Browsers do not expose file names during a drag, so an extension-only rule such as `.csv` cannot match yet and the zone shows the reject state even though the drop would succeed. List the MIME type next to the extension (`text/csv,.csv`) to avoid that.",
        "`maxSize` is in bytes. Files that fail type or size stay in the list with a reason (\"PDF files aren't accepted\", \"Larger than 10.0 MB\") and no retry button, since retrying cannot fix them.",
        "`multiple` defaults to `true`. With `multiple={false}` a new file replaces the previous one. `maxFiles` caps the list; extra files are ignored.",
        "`onFiles` receives only the files that passed validation, every time files are added.",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "Client-side checks are for feedback, not security. Anyone can send any bytes to your endpoint. Check size and type again on the server, inspect the file's content rather than trusting its extension or declared MIME type, and store uploads under keys you generate, never under the user's file name.",
    },

    { type: "h2", text: "Real progress with XMLHttpRequest", id: "xhr-progress" },
    {
      type: "p",
      text: "Pass an `upload` function and the dropzone runs it for each accepted file. It receives the `File` and an `onProgress` callback that takes a number from 0 to 1. Resolve when done; throw to mark the file as failed. `fetch` cannot report upload progress, so use XMLHttpRequest, whose `upload.onprogress` event reports bytes sent:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/put-with-progress.ts",
      code: 'export function putWithProgress(\n  url: string,\n  file: File,\n  onProgress: (p: number) => void,\n  signal?: AbortSignal,\n) {\n  return new Promise<void>((resolve, reject) => {\n    if (signal?.aborted) return reject(new DOMException("Upload canceled", "AbortError"))\n    const xhr = new XMLHttpRequest()\n    xhr.open("PUT", url)\n    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream")\n    xhr.upload.onprogress = (e) => {\n      if (e.lengthComputable) onProgress(e.loaded / e.total)\n    }\n    xhr.onload = () =>\n      xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error("Upload failed (" + xhr.status + ")"))\n    xhr.onerror = () => reject(new Error("Network error, check your connection"))\n    xhr.onabort = () => reject(new DOMException("Upload canceled", "AbortError"))\n    signal?.addEventListener("abort", () => xhr.abort(), { once: true })\n    xhr.send(file)\n  })\n}',
    },
    {
      type: "p",
      text: "The error message you throw is what the row shows, so write it for people. A failed row gets a retry button that runs your `upload` function again for the same file.",
    },

    { type: "h2", text: "Direct to S3 with presigned URLs", id: "presigned-urls" },
    {
      type: "p",
      text: "Sending files through your own server wastes bandwidth and hits limits: Next.js server actions accept 1 MB request bodies by default, and serverless platforms cap request size. Instead, your server signs a short-lived URL and the browser uploads straight to storage. A route handler that signs an S3 `PUT` with the AWS SDK v3:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "app/api/uploads/route.ts",
      code: 'import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"\nimport { getSignedUrl } from "@aws-sdk/s3-request-presigner"\n\nconst s3 = new S3Client({ region: process.env.AWS_REGION })\nconst ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "application/pdf"])\nconst MAX_BYTES = 10 * 1024 * 1024\n\nexport async function POST(req: Request) {\n  const user = await requireUser()\n  const { type, size } = (await req.json()) as { type: string; size: number }\n  if (!ALLOWED.has(type) || typeof size !== "number" || size > MAX_BYTES) {\n    return Response.json({ error: "This file type or size is not allowed." }, { status: 400 })\n  }\n  const key = "uploads/" + user.id + "/" + crypto.randomUUID()\n  const url = await getSignedUrl(\n    s3,\n    new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key, ContentType: type }),\n    { expiresIn: 60 },\n  )\n  return Response.json({ url, key })\n}',
    },
    {
      type: "p",
      text: "On the client, the `upload` function asks for a URL, uploads with progress, then tells your server the upload finished so it can record the file:",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'async function uploadToS3(file: File, onProgress: (p: number) => void, signal?: AbortSignal) {\n  const res = await fetch("/api/uploads", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ type: file.type, size: file.size }),\n    signal,\n  })\n  if (!res.ok) throw new Error((await res.json()).error ?? "Could not start the upload")\n  const { url, key } = await res.json()\n  await putWithProgress(url, file, onProgress, signal)\n  await fetch("/api/uploads/complete", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ key, name: file.name }),\n  })\n}\n\n<FileDropzone accept="image/png,image/jpeg,image/webp,application/pdf" maxSize={10 * 1024 * 1024} upload={uploadToS3} />',
    },
    {
      type: "list",
      items: [
        "The bucket needs a CORS rule that allows `PUT` from your origin with the `Content-Type` header, or the browser blocks the request before it starts.",
        "The `Content-Type` header on the upload must match the `ContentType` you signed, or S3 rejects the signature.",
        "A presigned `PUT` cannot enforce a maximum size by itself. In the complete handler, read the object's real size with `HeadObjectCommand` and delete anything that breaks your rules, or use a presigned POST policy with a `content-length-range` condition when you need a hard limit.",
        "The same pattern works with S3-compatible stores such as Cloudflare R2 and MinIO.",
      ],
    },

    { type: "h2", text: "Cancel and retry", id: "cancel-retry" },
    {
      type: "p",
      text: "Retry comes free with the built-in list. Cancel does not: the `upload` function gets no abort signal, and removing a row takes it off the list without stopping a request in flight. When you need a Cancel button, turn the list off with `showList={false}`, take files from `onFiles`, and render your own rows with an `AbortController` per file:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/uploader.tsx",
      code: '"use client"\nimport * as React from "react"\nimport { FileDropzone } from "@/components/ui/file-dropzone"\nimport { Progress } from "@/components/ui/progress"\nimport { Button } from "@/components/ui/button"\n\ntype Item = { id: string; file: File; progress: number; status: "uploading" | "done" | "error" | "canceled"; error?: string }\n\nexport function Uploader() {\n  const [items, setItems] = React.useState<Item[]>([])\n  const controllers = React.useRef(new Map<string, AbortController>())\n  const patch = (id: string, p: Partial<Item>) => setItems((l) => l.map((i) => (i.id === id ? { ...i, ...p } : i)))\n\n  async function start(item: Item) {\n    const ac = new AbortController()\n    controllers.current.set(item.id, ac)\n    patch(item.id, { status: "uploading", progress: 0, error: undefined })\n    try {\n      await uploadToS3(item.file, (p) => patch(item.id, { progress: p }), ac.signal)\n      patch(item.id, { status: "done", progress: 1 })\n    } catch (err) {\n      if (ac.signal.aborted) patch(item.id, { status: "canceled" })\n      else patch(item.id, { status: "error", error: err instanceof Error ? err.message : "Upload failed" })\n    } finally {\n      controllers.current.delete(item.id)\n    }\n  }\n\n  return (\n    <div>\n      <FileDropzone\n        accept="image/*,application/pdf"\n        showList={false}\n        onFiles={(files) => {\n          const next = files.map((file): Item => ({ id: crypto.randomUUID(), file, progress: 0, status: "uploading" }))\n          setItems((l) => [...l, ...next])\n          next.forEach(start)\n        }}\n      />\n      <ul className="mt-3 space-y-2" aria-label="Uploads">\n        {items.map((i) => (\n          <li key={i.id} className="rounded-xl border border-border bg-surface p-3">\n            <div className="flex items-center gap-3 text-sm">\n              <span className="min-w-0 flex-1 truncate text-fg">{i.file.name}</span>\n              <span className="text-xs text-fg-muted">{i.status === "uploading" ? Math.round(i.progress * 100) + "%" : i.status}</span>\n              {i.status === "uploading" ? (\n                <Button size="xs" variant="ghost" onClick={() => controllers.current.get(i.id)?.abort()}>Cancel</Button>\n              ) : null}\n              {i.status === "error" || i.status === "canceled" ? (\n                <Button size="xs" variant="outline" onClick={() => start(i)}>Retry</Button>\n              ) : null}\n            </div>\n            {i.status === "uploading" ? (\n              <Progress className="mt-2" value={Math.round(i.progress * 100)} aria-label={"Uploading " + i.file.name} />\n            ) : null}\n            {i.error ? <p className="mt-1 text-xs text-danger">{i.error}</p> : null}\n          </li>\n        ))}\n      </ul>\n    </div>\n  )\n}',
    },
    {
      type: "p",
      text: "With the built-in list off, files rejected by `accept` or `maxSize` never reach `onFiles` and nothing on screen says why. Keep `accept` on the zone for the picker filter and the drag-reject state, and check sizes yourself in `onFiles` so you can show a message for files that are too large.",
    },

    { type: "h2", text: "Previews with object URLs", id: "previews" },
    {
      type: "p",
      text: "`URL.createObjectURL(file)` returns a `blob:` URL you can put in an `img` immediately, without reading the file into memory as a data URL. Each URL keeps the file alive until you call `URL.revokeObjectURL` or the page unloads. `FileDropzone` creates a thumbnail URL for every `image/*` file and revokes it when the row is removed and when the component unmounts. In your own components, tie the URL to an effect:",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'function useObjectUrl(file: File | null) {\n  const [url, setUrl] = React.useState<string | null>(null)\n  React.useEffect(() => {\n    if (!file) return setUrl(null)\n    const next = URL.createObjectURL(file)\n    setUrl(next)\n    return () => URL.revokeObjectURL(next)\n  }, [file])\n  return url\n}',
    },
    {
      type: "p",
      text: "`ImageUpload` calls `onChange(url, file)` with a new object URL when an image is picked and `onChange(null, null)` when it is removed. It does not revoke those URLs, so do it in your handler when the value changes. Two more quirks to know: it takes the first file even if several are dropped, and its hint says \"PNG, JPG up to 5MB\" without enforcing a size, so edit the hint or add `maxSize` to the inner dropzone in your copy.",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'const [cover, setCover] = React.useState<string | null>(project.coverUrl)\nconst [coverFile, setCoverFile] = React.useState<File | null>(null)\n\n<ImageUpload\n  value={cover}\n  onChange={(url, file) => {\n    if (cover?.startsWith("blob:")) URL.revokeObjectURL(cover)\n    setCover(url)\n    setCoverFile(file ?? null)\n  }}\n/>',
    },

    { type: "h2", text: "Accessibility", id: "accessibility" },
    {
      type: "list",
      items: [
        "Drag and drop is never the only way in. The zone is a `role=\"button\"` element in the tab order that opens the file picker on click, Enter or Space. The native input stays in the DOM, visually hidden and out of the tab order, so there is one tab stop, not two.",
        "The hint text (accepted types and size) is linked with `aria-describedby`, so screen readers read the rules along with the control.",
        "A polite [live region](/glossary/aria) announces \"3 files added\". Each row's retry and remove buttons are labeled with the file name, such as \"Remove report.pdf\".",
        "Progress in rows is shown as a percentage in text; the thin bar is decorative. In custom lists, give `Progress` an `aria-label` as in the uploader above.",
        "Visible focus uses the kit's 2px accent ring, and the drag states change the border, icon and text, not only color.",
      ],
    },

    { type: "h2", text: "Showing stored files", id: "stored-files" },
    {
      type: "p",
      text: "After upload, list stored files with `FileList`. It takes `files: { id, name, meta }[]` and an optional `onDownload(id)`; with it, each row shows a labeled download button. Generate a short-lived download URL on the server when the button is pressed, rather than rendering permanent public links:",
    },
    {
      type: "code",
      lang: "tsx",
      code: '<FileList\n  files={attachments.map((a) => ({ id: a.id, name: a.name, meta: formatBytes(a.size) + " · " + a.uploadedAt }))}\n  onDownload={async (id) => {\n    const { url } = await getDownloadUrl(id)\n    window.location.assign(url)\n  }}\n/>',
    },
    {
      type: "p",
      text: "When the list is empty, show an [empty state](/glossary/empty-state) with the dropzone in it rather than an empty box.",
    },

    { type: "h2", text: "Components used", id: "components" },
    {
      type: "p",
      text: "FileDropzone and ImageUpload are in the [forms category](/components/forms); FileList and FileRow are in [media](/components/media); AvatarUpload is in [settings](/components/settings), next to the profile form from the [settings page guide](/guides/saas-settings-page). All are free under MIT. For a whole product with uploads, storage and permissions wired end to end, the [MiniDev studio](https://minidev.pro) builds on this kit.",
    },
    { type: "component", name: "file-dropzone" },
    { type: "component", name: "image-upload" },
    { type: "component", name: "file-list" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json",
    },
  ],
  faq: [
    {
      q: "How do I show upload progress in React?",
      a: "Use XMLHttpRequest and listen to `xhr.upload.onprogress`, which reports `loaded` and `total` bytes. `fetch` has no upload progress event. Pass the ratio to your UI, for example through `FileDropzone`'s `onProgress` callback.",
    },
    {
      q: "Do I need react-dropzone for drag and drop uploads?",
      a: "No. Drag and drop needs a handful of events (`dragenter`, `dragover`, `dragleave`, `drop`) and a hidden file input. `FileDropzone` implements them in one file you own, with accept rules, size limits and keyboard support.",
    },
    {
      q: "Should files go through my Next.js server or straight to S3?",
      a: "Straight to storage with a presigned URL for anything beyond small files. Server actions default to a 1 MB body limit and serverless functions cap request size. Your server only signs the URL and records the result.",
    },
    {
      q: "How do I preview an image before uploading it?",
      a: "Call `URL.createObjectURL(file)` and use the result as the `img` source. Revoke it with `URL.revokeObjectURL` when the file is removed or the component unmounts, or the browser keeps the file in memory.",
    },
  ],
}

export default guide
