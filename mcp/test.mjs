// Self-test: spawns the server against the local public/r files and checks the MCP handshake and core tools.
// Run from inside the MiniDev UI repo: node mcp/test.mjs
import { spawn } from "node:child_process"
import assert from "node:assert/strict"
import { fileURLToPath } from "node:url"
import { readFileSync } from "node:fs"
import { VERSION } from "./core.mjs"

assert.equal(VERSION, JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")).version, "core.mjs VERSION must match package.json")

const server = spawn(process.execPath, [fileURLToPath(new URL("./server.mjs", import.meta.url))], {
  env: { ...process.env, MINIDEV_UI_SOURCE: "local" },
  stdio: ["pipe", "pipe", "inherit"],
})

const waiting = new Map()
let buf = ""
server.stdout.setEncoding("utf8")
server.stdout.on("data", (chunk) => {
  buf += chunk
  let nl
  while ((nl = buf.indexOf("\n")) !== -1) {
    const msg = JSON.parse(buf.slice(0, nl))
    buf = buf.slice(nl + 1)
    waiting.get(msg.id)?.(msg)
    waiting.delete(msg.id)
  }
})

let nextId = 1
function rpc(method, params) {
  const id = nextId++
  server.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n")
  return new Promise((resolve) => waiting.set(id, resolve))
}
const call = async (name, args) => (await rpc("tools/call", { name, arguments: args })).result

const timer = setTimeout(() => {
  console.error("FAIL: timed out")
  server.kill()
  process.exit(1)
}, 15_000)

try {
  const init = await rpc("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "self-test", version: "0" } })
  assert.equal(init.jsonrpc, "2.0")
  assert.equal(init.result.protocolVersion, "2025-06-18")
  assert.equal(init.result.serverInfo.name, "minidev-ui")
  assert.ok(init.result.capabilities.tools)
  server.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n")

  const list = await rpc("tools/list", {})
  const names = list.result.tools.map((t) => t.name).sort()
  assert.deepEqual(names, ["get_component", "get_design_rules", "get_example", "get_install_instructions", "list_components", "search_components"])
  for (const t of list.result.tools) assert.equal(t.inputSchema.type, "object", `${t.name} has an object inputSchema`)

  const button = await call("get_component", { name: "button" })
  assert.equal(button.isError, false)
  const text = button.content[0].text
  assert.match(text, /npx shadcn@latest add @minidev\/button/)
  assert.match(text, /import \{ Button[^}]*\} from "@\/components\/ui\/button"/)
  assert.match(text, /`variant\?: "default"/, "props include the cva variant")
  assert.match(text, /@base-ui\/react/, "lists npm dependencies")
  assert.match(text, /const buttonVariants = cva\(/, "includes source")

  const bad = await call("get_component", { name: "../package" })
  assert.equal(bad.isError, true, "rejects names outside /^[a-z0-9-]+$/")
  const typo = await call("get_component", { name: "buton" })
  assert.equal(typo.isError, true)
  assert.match(typo.content[0].text, /Did you mean: button/)

  const search = await call("search_components", { query: "date range pikcer" })
  assert.match(search.content[0].text.split("\n")[1], /date-range-picker/, "typo-tolerant search ranks the exact component first")

  const unknown = await rpc("does/not/exist", {})
  assert.equal(unknown.error.code, -32601)

  console.log("ok: initialize, tools/list, get_component(button), validation, search")
  clearTimeout(timer)
  server.stdin.end()
} catch (e) {
  console.error("FAIL:", e.message)
  server.kill()
  process.exit(1)
}
