import { COMPONENT_INDEX } from "@/lib/component-index"
import { componentMarkdown } from "../markdown"

// Every page is prerendered at build, so the example and source files are read once there, never at request time.
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return COMPONENT_INDEX.map((c) => ({ name: c.name }))
}

/** The docs page as Markdown, for AI agents and "Copy page". */
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const entry = COMPONENT_INDEX.find((c) => c.name === name)
  if (!entry) return new Response("Not found", { status: 404 })
  return new Response(componentMarkdown(entry), {
    headers: { "content-type": "text/markdown; charset=utf-8", "x-robots-tag": "noindex" },
  })
}
