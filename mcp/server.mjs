#!/usr/bin/env node
/**
 * MiniDev UI MCP server. Zero dependencies, Node >= 18, stdio transport,
 * newline-delimited JSON-RPC 2.0 per the Model Context Protocol.
 * The tools live in core.mjs; the same core serves https://ui.minidev.pro/mcp over HTTP.
 *
 * Data: https://ui.minidev.pro/r/*.json (registry), the public GitHub repo
 * (examples, DESIGN.md), with a fallback to local files when this folder
 * sits inside the MiniDev UI repo.
 *
 * Env: MINIDEV_UI_SOURCE=local|remote (default: remote, then local)
 *      MINIDEV_UI_URL (default https://ui.minidev.pro)
 */
import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { fail, handle, setLocalReader } from "./core.mjs"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
if (existsSync(path.join(ROOT, "public/r/registry.json"))) setLocalReader((rel) => readFile(path.join(ROOT, rel), "utf8"))

const send = (msg) => msg && process.stdout.write(JSON.stringify(msg) + "\n")

let buffer = ""
const pending = new Set()
process.stdin.setEncoding("utf8")
process.stdin.on("data", (chunk) => {
  buffer += chunk
  let nl
  while ((nl = buffer.indexOf("\n")) !== -1) {
    const raw = buffer.slice(0, nl).trim()
    buffer = buffer.slice(nl + 1)
    if (!raw) continue
    let msg
    try {
      msg = JSON.parse(raw)
    } catch {
      send(fail(null, -32700, "Parse error"))
      continue
    }
    const job = handle(msg)
      .catch((e) => fail(msg?.id ?? null, -32603, `Internal error: ${e?.message ?? e}`))
      .then(send)
    pending.add(job)
    job.finally(() => pending.delete(job))
  }
})
// Client closed stdin: finish in-flight calls, then exit (open fetch sockets would otherwise keep us alive).
process.stdin.on("end", () => Promise.allSettled([...pending]).then(() => process.exit(0)))
