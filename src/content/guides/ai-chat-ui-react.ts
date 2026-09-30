import type { Guide } from "../types"

const guide: Guide = {
  slug: "ai-chat-ui-react",
  title: "AI chat UI in React: streaming messages, tool calls and reasoning",
  description:
    "Build an AI chat UI in React: stream tokens with a ReadableStream reader, render reasoning and tool calls, auto scroll, stop and retry. Works with any provider.",
  date: "2026-09-30",
  keywords: [
    "ai chat ui react",
    "chatgpt ui clone react",
    "streaming chat component",
    "react llm chat interface",
    "tool call ui react",
  ],
  related: [
    "chat-thread",
    "message-bubble",
    "streaming-message",
    "prompt-input",
    "reasoning-block",
    "thinking-block",
    "tool-call-card",
    "suggestion-chips",
    "stop-generating",
    "model-picker",
    "retry-block",
    "message-actions",
  ],
  body: [
    {
      type: "p",
      text: "An AI chat UI in React comes down to three parts: a message list that renders text, reasoning and tool calls as they stream in, a composer that submits on Enter and turns into a stop button while the model is working, and a small hook that reads the response body chunk by chunk with a `ReadableStream` reader. None of it depends on a specific model provider. This guide builds all three with free MiniDev UI components and plain `fetch`.",
    },

    { type: "h2", text: "The components and what each one does", id: "anatomy" },
    {
      type: "table",
      head: ["Component", "Role", "Key props"],
      rows: [
        ["[ChatThread](/docs/chat-thread)", "Scrollable message log", "`messages`, `empty`, `className`"],
        ["[MessageBubble](/docs/message-bubble)", "One turn: user capsule, assistant prose, system rule", "`role`, `streaming`"],
        ["[PromptInput](/docs/prompt-input)", "Auto-growing composer, Enter to send", "`value`, `onChange`, `onSubmit`, `disabled`, `toolbar`"],
        ["[ReasoningBlock](/docs/reasoning-block)", "Folded model thinking with a live shimmer", "`active`, `duration`, `title`, `defaultOpen`"],
        ["[ToolCallCard](/docs/tool-call-card)", "One tool invocation with status and output", "`name`, `args`, `status`, `duration`, `children`"],
        ["[StopGenerating](/docs/stop-generating)", "Outline button with a stop icon", "`onClick`"],
        ["[SuggestionChips](/docs/suggestion-chips)", "Starter prompts for the empty state", "`items`, `onSelect`"],
        ["[ModelPicker](/docs/model-picker)", "Select for the model", "`models`, `value`, `onChange`"],
      ],
    },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/chat-thread.json https://ui.minidev.pro/r/prompt-input.json https://ui.minidev.pro/r/reasoning-block.json https://ui.minidev.pro/r/tool-call-card.json https://ui.minidev.pro/r/stop-generating.json https://ui.minidev.pro/r/suggestion-chips.json https://ui.minidev.pro/r/model-picker.json https://ui.minidev.pro/r/retry-block.json",
    },
    {
      type: "p",
      text: "`chat-thread` brings `message-bubble` and `streaming-cursor` with it. The files land in `components/ui`, so everything below imports from `@/components/ui/*`. The components style themselves with MiniDev's semantic tokens, so include the [token stylesheet](https://ui.minidev.pro/r/styles.css) in your global CSS once.",
    },

    { type: "h2", text: "Model the message as parts", id: "message-model" },
    {
      type: "p",
      text: "A modern assistant turn is not one string. It can start with reasoning, call two tools, then write an answer. Store each turn as an ordered list of parts and let rendering decide how each part looks. This also makes the stream easy to apply: every incoming event either appends to the last part or adds a new one.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/chat-types.ts",
      code: 'export type Part =\n  | { kind: "text"; text: string }\n  | { kind: "reasoning"; text: string; ms?: number }\n  | { kind: "tool"; id: string; name: string; status: "running" | "done" | "error"; args?: string; output?: string }\n\nexport type ChatMessage = {\n  id: string\n  role: "user" | "assistant"\n  parts: Part[]\n  status?: "streaming" | "done" | "stopped" | "error"\n}\n\n/** What the server sends, one JSON object per line. */\nexport type ChatEvent =\n  | { type: "text"; delta: string }\n  | { type: "reasoning"; delta: string }\n  | { type: "reasoning-end"; ms: number }\n  | { type: "tool"; id: string; name: string; status: "running" | "done" | "error"; args?: string; output?: string }\n  | { type: "error"; message: string }',
    },
    {
      type: "p",
      text: "The wire format is newline-delimited JSON (NDJSON). It is provider-agnostic on purpose: your server route translates whatever your model SDK emits into these five event types, and the client never changes when you switch providers.",
    },

    { type: "h2", text: "Read the stream with a ReadableStream reader", id: "streaming-fetch" },
    {
      type: "p",
      text: "`fetch` exposes the response body as a `ReadableStream` of bytes. Read it with `getReader()`, decode with a `TextDecoder` in streaming mode, and split on newlines. Network chunks do not respect line boundaries, so keep a buffer and only parse complete lines.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/read-events.ts",
      code: 'import type { ChatEvent } from "./chat-types"\n\nexport async function* readEvents(res: Response): AsyncGenerator<ChatEvent> {\n  if (!res.body) throw new Error("Response has no body")\n  const reader = res.body.getReader()\n  const decoder = new TextDecoder()\n  let buffer = ""\n  while (true) {\n    const { value, done } = await reader.read()\n    if (done) break\n    // stream: true keeps multi-byte characters split across chunks intact\n    buffer += decoder.decode(value, { stream: true })\n    let nl: number\n    while ((nl = buffer.indexOf("\\n")) !== -1) {\n      const line = buffer.slice(0, nl).trim()\n      buffer = buffer.slice(nl + 1)\n      if (line) yield JSON.parse(line) as ChatEvent\n    }\n  }\n  buffer += decoder.decode()\n  if (buffer.trim()) yield JSON.parse(buffer) as ChatEvent\n}',
    },
    {
      type: "callout",
      tone: "tip",
      text: "If your endpoint speaks Server-Sent Events instead, the loop is the same. Split the buffer on blank lines (`\"\\n\\n\"`), strip the `data: ` prefix from each line, and skip comments and `[DONE]` sentinels.",
    },
    {
      type: "p",
      text: "Applying an event to a message is a pure function. Text and reasoning deltas extend the last part of the same kind; tool events upsert by `id` so a card moves from running to done in place.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/apply-event.ts",
      code: 'import type { ChatEvent, Part } from "./chat-types"\n\nexport function applyEvent(parts: Part[], ev: ChatEvent): Part[] {\n  const last = parts[parts.length - 1]\n  switch (ev.type) {\n    case "text":\n      if (last?.kind === "text") return [...parts.slice(0, -1), { ...last, text: last.text + ev.delta }]\n      return [...parts, { kind: "text", text: ev.delta }]\n    case "reasoning":\n      if (last?.kind === "reasoning") return [...parts.slice(0, -1), { ...last, text: last.text + ev.delta }]\n      return [...parts, { kind: "reasoning", text: ev.delta }]\n    case "reasoning-end":\n      return parts.map((p) => (p.kind === "reasoning" && p.ms == null ? { ...p, ms: ev.ms } : p))\n    case "tool": {\n      const next: Part = { kind: "tool", id: ev.id, name: ev.name, status: ev.status, args: ev.args, output: ev.output }\n      const i = parts.findIndex((p) => p.kind === "tool" && p.id === ev.id)\n      return i === -1 ? [...parts, next] : parts.map((p, j) => (j === i ? next : p))\n    }\n    default:\n      return parts\n  }\n}',
    },

    { type: "h2", text: "A useChat hook with stop and retry", id: "use-chat-hook" },
    {
      type: "p",
      text: "The hook owns the message list, one `AbortController` per request, and a `streaming` flag. Stop aborts the controller; the partial answer stays on screen marked as stopped. Retry drops everything after the last user message and runs the request again.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "hooks/use-chat.ts",
      code: '"use client"\nimport * as React from "react"\nimport type { ChatMessage } from "@/lib/chat-types"\nimport { readEvents } from "@/lib/read-events"\nimport { applyEvent } from "@/lib/apply-event"\n\nconst toWire = (m: ChatMessage) => ({\n  role: m.role,\n  content: m.parts.map((p) => (p.kind === "text" ? p.text : "")).join(""),\n})\n\nexport function useChat({ endpoint = "/api/chat", model }: { endpoint?: string; model?: string } = {}) {\n  const [messages, setMessages] = React.useState<ChatMessage[]>([])\n  const [streaming, setStreaming] = React.useState(false)\n  const controller = React.useRef<AbortController | null>(null)\n\n  const run = React.useCallback(async (history: ChatMessage[]) => {\n    const id = crypto.randomUUID()\n    const update = (fn: (m: ChatMessage) => ChatMessage) =>\n      setMessages((all) => all.map((m) => (m.id === id ? fn(m) : m)))\n    setMessages([...history, { id, role: "assistant", parts: [], status: "streaming" }])\n    setStreaming(true)\n    const ac = new AbortController()\n    controller.current = ac\n    try {\n      const res = await fetch(endpoint, {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify({ model, messages: history.map(toWire) }),\n        signal: ac.signal,\n      })\n      if (!res.ok) throw new Error("HTTP " + res.status)\n      for await (const ev of readEvents(res)) {\n        if (ev.type === "error") throw new Error(ev.message)\n        update((m) => ({ ...m, parts: applyEvent(m.parts, ev) }))\n      }\n      update((m) => ({ ...m, status: "done" }))\n    } catch {\n      update((m) => ({ ...m, status: ac.signal.aborted ? "stopped" : "error" }))\n    } finally {\n      setStreaming(false)\n      controller.current = null\n    }\n  }, [endpoint, model])\n\n  const send = (text: string) => {\n    if (!text.trim() || streaming) return\n    run([...messages, { id: crypto.randomUUID(), role: "user", parts: [{ kind: "text", text }] }])\n  }\n  const stop = () => controller.current?.abort()\n  const retry = () => {\n    const i = messages.findLastIndex((m) => m.role === "user")\n    if (i !== -1 && !streaming) run(messages.slice(0, i + 1))\n  }\n\n  return { messages, streaming, send, stop, retry }\n}',
    },
    {
      type: "p",
      text: "React batches the per-chunk state updates, which is fine for typical token rates. If a fast model sends hundreds of tiny chunks per second, collect deltas in a ref and flush them once per `requestAnimationFrame` so you render at most once per frame.",
    },

    { type: "h2", text: "Render reasoning, tool calls and text", id: "render-parts" },
    {
      type: "p",
      text: "`ChatThread` takes `messages` shaped as `{ id, role, content, streaming }`, where `content` is any React node. Map each part to a component and pass the result as `content`. Text parts render as inline spans so the [StreamingCursor](/docs/streaming-cursor) that `MessageBubble` appends while `streaming` is true sits right after the last word.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/chat/render-message.tsx",
      code: 'import { ReasoningBlock } from "@/components/ui/reasoning-block"\nimport { ToolCallCard } from "@/components/ui/tool-call-card"\nimport { RetryBlock } from "@/components/ui/retry-block"\nimport type { ChatMessage } from "@/lib/chat-types"\n\nexport function renderMessage(m: ChatMessage, onRetry: () => void) {\n  const live = m.status === "streaming"\n  return (\n    <>\n      {m.parts.map((p, i) => {\n        if (p.kind === "reasoning")\n          return (\n            <ReasoningBlock\n              key={i}\n              className="mb-3"\n              active={live && p.ms == null}\n              duration={p.ms != null ? Math.max(1, Math.round(p.ms / 1000)) + "s" : undefined}\n            >\n              {p.text}\n            </ReasoningBlock>\n          )\n        if (p.kind === "tool")\n          return (\n            <ToolCallCard key={i} className="mb-3" name={p.name} args={p.args} status={p.status} defaultOpen={false}>\n              {p.output}\n            </ToolCallCard>\n          )\n        return <span key={i} className="whitespace-pre-wrap">{p.text}</span>\n      })}\n      {m.status === "stopped" ? <p className="mt-2 text-xs text-fg-subtle">Stopped</p> : null}\n      {m.status === "error" ? <RetryBlock className="mt-3" onRetry={onRetry} /> : null}\n    </>\n  )\n}',
    },
    {
      type: "p",
      text: "`ReasoningBlock` is folded by default. While `active` is true its label shimmers as \"Thinking…\"; once you pass `duration` it reads \"Thought for 4s\". `ToolCallCard` shows a spinner and \"Running\" for `status=\"running\"`, a check for `done` and a cross for `error`. When `children` is empty it renders without a disclosure, so a tool that returns nothing does not show an empty panel.",
    },
    {
      type: "p",
      text: "[ThinkingBlock](/docs/thinking-block) is the simpler alternative: a bordered box with a fixed \"Thinking\" label that mounts its content only when opened. Use it where you do not track timing. [StreamingMessage](/docs/streaming-message) is a static bubble with a cursor, useful for skeleton states and demos.",
    },
    { type: "component", name: "reasoning-block" },
    { type: "component", name: "tool-call-card" },

    { type: "h2", text: "Put the page together", id: "chat-page" },
    {
      type: "p",
      text: "The thread must own the scroll, so give it the remaining height in a flex column with `min-h-0 flex-1`. The composer sits below. While the model is streaming, show `StopGenerating` above the input and ignore submits; the textarea stays enabled so people can type their next message.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/chat/page.tsx",
      code: '"use client"\nimport * as React from "react"\nimport { ChatThread } from "@/components/ui/chat-thread"\nimport { PromptInput } from "@/components/ui/prompt-input"\nimport { StopGenerating } from "@/components/ui/stop-generating"\nimport { SuggestionChips } from "@/components/ui/suggestion-chips"\nimport { ModelPicker } from "@/components/ui/model-picker"\nimport { useChat } from "@/hooks/use-chat"\nimport { renderMessage } from "@/components/chat/render-message"\n\nconst MODELS = [{ id: "fast", label: "Fast" }, { id: "deep", label: "Deep reasoning" }]\n\nexport default function ChatPage() {\n  const [model, setModel] = React.useState("fast")\n  const [draft, setDraft] = React.useState("")\n  const { messages, streaming, send, stop, retry } = useChat({ model })\n\n  return (\n    <div className="mx-auto flex h-dvh max-w-3xl flex-col">\n      <ChatThread\n        className="min-h-0 flex-1 px-4 py-6"\n        messages={messages.map((m) => ({\n          id: m.id,\n          role: m.role,\n          streaming: m.status === "streaming",\n          content: renderMessage(m, retry),\n        }))}\n        empty={\n          <div className="grid flex-1 place-items-center content-center gap-4 py-16 text-center">\n            <p className="text-lg font-medium text-fg">What are we working on?</p>\n            <SuggestionChips items={["Summarize this PR", "Draft a release note", "Explain this error"]} onSelect={send} />\n          </div>\n        }\n      />\n      <div className="space-y-2 p-3">\n        {streaming ? <div className="flex justify-center"><StopGenerating onClick={stop} /></div> : null}\n        <PromptInput\n          value={draft}\n          onChange={setDraft}\n          onSubmit={() => {\n            if (streaming) return\n            send(draft)\n            setDraft("")\n          }}\n          toolbar={<ModelPicker models={MODELS} value={model} onChange={setModel} className="h-8 w-44" />}\n        />\n      </div>\n    </div>\n  )\n}',
    },
    {
      type: "p",
      text: "`PromptInput` grows with its content up to 240px, submits on Enter, inserts a newline on Shift+Enter, and only enables the send button when the trimmed value is non-empty. The `toolbar` slot sits to the right of the attach button, which is where a model picker or context chips belong.",
    },

    { type: "h2", text: "Auto scroll that respects the reader", id: "auto-scroll" },
    {
      type: "p",
      text: "Out of the box, `ChatThread` sets `scrollTop = scrollHeight` whenever `messages` changes, which keeps a streaming answer in view. If you want people to be able to scroll up and read while the answer keeps streaming, only follow the bottom when the reader is already near it. Since the file is in your repo, replace its effect:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/chat-thread.tsx",
      code: 'const stick = React.useRef(true)\nconst count = React.useRef(0)\n\nReact.useEffect(() => {\n  const el = ref.current\n  if (!el) return\n  // A new turn snaps back to the bottom; token updates follow only if the reader is there.\n  if (messages.length > count.current) stick.current = true\n  count.current = messages.length\n  if (stick.current) el.scrollTop = el.scrollHeight\n}, [messages])\n\n// on the scrolling div:\nonScroll={(e) => {\n  const el = e.currentTarget\n  stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48\n}}',
    },
    {
      type: "p",
      text: "Streaming tokens update the same message, so the list length only grows when a turn starts. That is the signal to snap back down. A \"Jump to latest\" button that appears while the reader is scrolled away completes the pattern; keep `stick` in state instead of a ref if you render one.",
    },
    {
      type: "callout",
      tone: "note",
      text: "The thread is a `role=\"log\"` with `aria-live=\"polite\"`, so screen readers announce new content. Token-level updates can be noisy; setting `aria-busy` on the log while `streaming` is true asks assistive technology to wait until the answer settles.",
    },

    { type: "h2", text: "The server route", id: "server-route" },
    {
      type: "p",
      text: "Keep API keys on the server. A Next.js route handler calls your provider, translates its stream into `ChatEvent` lines, and forwards `req.signal` so a stop in the browser also cancels the upstream request.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "app/api/chat/route.ts",
      code: 'import { streamModel } from "@/lib/model" // your adapter: yields ChatEvent objects\n\nexport async function POST(req: Request) {\n  const { messages, model } = await req.json()\n  const encoder = new TextEncoder()\n  const stream = new ReadableStream({\n    async start(controller) {\n      const push = (ev: unknown) => controller.enqueue(encoder.encode(JSON.stringify(ev) + "\\n"))\n      try {\n        for await (const ev of streamModel({ messages, model, signal: req.signal })) push(ev)\n      } catch {\n        if (!req.signal.aborted) push({ type: "error", message: "The model request failed." })\n      } finally {\n        try { controller.close() } catch {}\n      }\n    },\n  })\n  return new Response(stream, {\n    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" },\n  })\n}',
    },
    {
      type: "p",
      text: "`streamModel` is the only provider-specific code in the whole stack: an async generator that calls your SDK and yields `{ type: \"text\", delta }` for content tokens, `reasoning` deltas for thinking, and `tool` events when the model calls and finishes a function.",
    },

    { type: "h3", text: "Why NDJSON over a POST" },
    {
      type: "p",
      text: "`EventSource` only issues GET requests, so it cannot carry a chat history in the body. A plain `fetch` POST that returns NDJSON can, it works through the same reader loop as SSE, and it needs no client library. Two operational details: make sure nothing between the server and the browser buffers the response (for example, nginx needs `X-Accel-Buffering: no`), and never cache the route. If the stream arrives in one lump at the end, buffering is almost always the reason.",
    },

    { type: "h2", text: "Finishing touches", id: "finishing-touches" },
    {
      type: "list",
      items: [
        "Put [MessageActions](/docs/message-actions) under finished assistant turns for copy, retry and feedback. Its `onRetry` can call the same `retry` from the hook.",
        "Render markdown in text parts with a parser of your choice once the stream is complete, and plain text while streaming, to avoid half-open code fences flickering.",
        "Persist the thread on the server after `status` becomes `done`, not per chunk.",
        "Limit what you send back: trim old turns or summarize them before the history exceeds the model context.",
        "Errors can arrive mid-answer. The hook keeps the partial text and marks the turn `error`, so the reader sees what arrived plus a `RetryBlock` instead of losing everything.",
        "Show per-turn usage or cost with [TokenUsageMeter](/docs/token-usage-meter) when people pay by the token.",
      ],
    },

    { type: "h2", text: "Components and install", id: "components" },
    {
      type: "p",
      text: "All of these are free and MIT licensed in MiniDev UI's AI chat set. The [SaaS dashboard guide](/guides/nextjs-saas-dashboard) shows how to host a chat panel inside an app shell, and the [MiniDev studio](https://minidev.pro) builds complete AI products on the same kit if you want a team to ship it.",
    },
    { type: "component", name: "chat-thread" },
    { type: "component", name: "prompt-input" },
    { type: "component", name: "stop-generating" },
    { type: "component", name: "suggestion-chips" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json",
    },
  ],
  faq: [
    {
      q: "How do I stream a chat response in React without a provider SDK?",
      a: "Call `fetch`, read `res.body.getReader()` in a loop, decode each chunk with `TextDecoder` using `{ stream: true }`, and split complete lines out of a buffer. Update the assistant message in state as each event arrives.",
    },
    {
      q: "How do I add a stop button to a streaming chat?",
      a: "Create an `AbortController` per request, pass its `signal` to `fetch`, and call `abort()` from the stop button. The read loop throws, and you mark the partial message as stopped instead of failed by checking `signal.aborted`.",
    },
    {
      q: "How should tool calls appear in a chat UI?",
      a: "As compact cards inside the assistant turn that show the tool name, a short argument preview and a running, done or failed status, with the output collapsed. Upsert them by call id so the same card updates in place.",
    },
    {
      q: "Can I build a ChatGPT style UI with shadcn components?",
      a: "Yes. MiniDev UI is a shadcn-compatible registry, so `npx shadcn@latest add https://ui.minidev.pro/r/chat-thread.json` installs the thread, bubble and cursor into your project alongside any shadcn components you already use.",
    },
  ],
}

export default guide
