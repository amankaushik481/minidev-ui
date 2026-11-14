"use client"
import * as React from "react"
import { ArrowUpRightIcon, CheckIcon, CopyIcon, FileTextIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { SITE } from "@/lib/site"

/** "Copy page" puts the Markdown twin of this page on the clipboard; the links hand its URL to an AI assistant. */
export function PageActions({ name, title, md }: { name: string; title: string; md: string }) {
  const [state, setState] = React.useState<"idle" | "copied" | "failed">("idle")
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    const text = fetch(md).then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
    try {
      // A promised ClipboardItem keeps Safari's user-activation alive across the fetch.
      await navigator.clipboard.write([new ClipboardItem({ "text/plain": text.then((t) => new Blob([t], { type: "text/plain" })) })])
      setState("copied")
    } catch {
      try {
        await navigator.clipboard.writeText(await text)
        setState("copied")
      } catch {
        setState("failed")
      }
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState("idle"), 2000)
  }

  const prompt = `Read ${SITE.url}${md} and help me use the ${SITE.name} ${title} component (${name}) in my React + Tailwind app. Follow its install command, imports and props exactly.`
  const q = encodeURIComponent(prompt)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={copy}>
        {state === "copied" ? <CheckIcon /> : <CopyIcon />}
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy page"}
      </Button>
      <Button variant="ghost" size="sm" render={<a href={md} />}>
        <FileTextIcon /> Markdown
      </Button>
      <Button variant="ghost" size="sm" render={<a href={`https://chatgpt.com/?q=${q}`} target="_blank" rel="noopener noreferrer" />}>
        Open in ChatGPT <ArrowUpRightIcon /><span className="sr-only"> (opens in a new tab)</span>
      </Button>
      <Button variant="ghost" size="sm" render={<a href={`https://claude.ai/new?q=${q}`} target="_blank" rel="noopener noreferrer" />}>
        Open in Claude <ArrowUpRightIcon /><span className="sr-only"> (opens in a new tab)</span>
      </Button>
      <span className="sr-only" aria-live="polite">{state === "copied" ? "Page copied as Markdown" : state === "failed" ? "Could not copy the page" : ""}</span>
    </div>
  )
}
