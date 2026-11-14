import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = "Use MiniDev UI with AI agents"

export default function Image() {
  return ogImage({
    eyebrow: "AI agents",
    title: "Use MiniDev UI with AI agents",
    subtitle: "Claude Code, Cursor, Codex, Windsurf, Copilot and v0: MCP server, llms.txt, rules files.",
    footer: "claude mcp add --transport http minidev-ui https://ui.minidev.pro/mcp",
  })
}
