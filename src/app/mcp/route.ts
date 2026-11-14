/**
 * Remote MCP server (Streamable HTTP, stateless, JSON responses) at https://ui.minidev.pro/mcp.
 * Same tools as `npx minidev-ui-mcp`; both run mcp/core.mjs.
 *   claude mcp add --transport http minidev-ui https://ui.minidev.pro/mcp
 * Read-only, public data, no auth or sessions, so any origin may call it.
 */
import { fail, handle, VERSION } from "../../../mcp/core.mjs"

const MAX_BODY = 64 * 1024
const MAX_BATCH = 20

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept, authorization, mcp-session-id, mcp-protocol-version, last-event-id",
  "Access-Control-Expose-Headers": "mcp-session-id",
}

type Rpc = Record<string, unknown> | null

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "content-type": "application/json" } })
const accepted = () => new Response(null, { status: 202, headers: CORS })

const run = (msg: unknown): Promise<Rpc> =>
  handle(msg).catch((e: unknown) =>
    fail((msg as { id?: unknown })?.id ?? null, -32603, `Internal error: ${e instanceof Error ? e.message : String(e)}`),
  )

export async function POST(req: Request) {
  const text = await req.text()
  if (text.length > MAX_BODY) return json(fail(null, -32600, `Request body over ${MAX_BODY} bytes`), 413)
  let body: unknown
  try {
    body = JSON.parse(text)
  } catch {
    return json(fail(null, -32700, "Parse error"), 400)
  }
  if (Array.isArray(body)) {
    if (!body.length || body.length > MAX_BATCH) return json(fail(null, -32600, `Batch must hold 1 to ${MAX_BATCH} messages`), 400)
    const out = (await Promise.all(body.map(run))).filter(Boolean)
    return out.length ? json(out) : accepted()
  }
  const res = await run(body)
  return res ? json(res) : accepted()
}

/** No server-initiated stream. MCP clients asking for SSE get 405 (per spec); people get a short how-to. */
export function GET(req: Request) {
  if (req.headers.get("accept")?.includes("text/event-stream")) return new Response(null, { status: 405, headers: { ...CORS, Allow: "POST, OPTIONS" } })
  return new Response(
    `MiniDev UI MCP server v${VERSION} (Streamable HTTP). POST JSON-RPC here from an MCP client.\n\n` +
      `Claude Code:  claude mcp add --transport http minidev-ui https://ui.minidev.pro/mcp\n` +
      `Cursor, VS Code, Windsurf: { "mcpServers": { "minidev-ui": { "url": "https://ui.minidev.pro/mcp" } } }\n\n` +
      `Setup for every agent: https://ui.minidev.pro/docs/ai\n`,
    { headers: { ...CORS, "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" } },
  )
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}
