"use client"
import { TerminalWindow } from "@/registry/ui/terminal-window"
import { ConsoleOutput } from "@/registry/ui/console-output"
import { StackTrace } from "@/registry/ui/stack-trace"
import { JsonViewer } from "@/registry/ui/json-viewer"
import { CodeEditorFrame } from "@/registry/ui/code-editor-frame"
import { LatencyBadge } from "@/registry/ui/latency-badge"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="System / developer">
      <GallerySection title="Terminal">
        <TerminalWindow>{`$ npm run audit\nAUDIT PASS`}</TerminalWindow>
        <ConsoleOutput lines={[{ text: "ready on :3000" }, { level: "warn", text: "deprecated API" }, { level: "error", text: "failed to fetch" }]} />
        <LatencyBadge ms={48} />
      </GallerySection>
      <GallerySection title="Inspect">
        <JsonViewer value={{ name: "minidev-ui", items: 300 }} />
        <CodeEditorFrame filename="button.tsx">{`export function Button() {\n  return <button />\n}`}</CodeEditorFrame>
        <StackTrace stack={"Error: boom\n    at render (app.tsx:12)\n    at main (index.tsx:4)"} />
      </GallerySection>
    </GalleryPage>
  )
}
