import type { Guide } from "../types"

const guide: Guide = {
  slug: "ai-agent-ui-react",
  title: "AI agent UI in React: tool calls, approvals, run traces and streaming",
  description:
    "Build the UI for an AI agent in React: a live run trace, tool call results, human approval before risky tools, token usage and a stop button. Provider agnostic.",
  date: "2026-11-14",
  keywords: [
    "ai agent ui react",
    "agent ui components",
    "human in the loop ui",
    "tool call approval ui",
    "agent run trace ui",
    "react components for ai agents",
  ],
  related: [
    "agent-trace",
    "approval-card",
    "tool-call-card",
    "tool-result-panel",
    "ai-composer",
    "token-usage-meter",
    "inline-code-diff",
    "artifact-preview",
    "citation-chip",
  ],
  body: [
    {
      type: "tldr",
      items: [
        "**Model the run, not the chat.** An agent run is a list of steps (tool calls) plus final text. Keep it in one reducer fed by streamed events.",
        "**Show the steps as a trace** with [AgentTrace](/docs/agent-trace): status per step, time taken, and arguments and output on demand.",
        "**Pause for approval** before tools that spend money, send messages or delete things. Render an [ApprovalCard](/docs/approval-card) and resume the run with the decision.",
        "**Always offer stop**, show token use, and announce waits and completion to screen readers.",
      ],
    },
    {
      type: "p",
      text: "A chat UI shows a conversation. An agent UI shows work: the agent searches, reads, calls tools, sometimes asks before it acts, and finishes with a result. People need to see what it did, stop it when it goes wrong and approve the steps that matter. This guide builds that interface in React with free MiniDev UI components and plain `fetch`, so it works with any model provider or agent framework. If you are building a conversational assistant, start with the [AI chat UI guide](/guides/ai-chat-ui-react) instead; the two share the streaming approach.",
    },
    { type: "example", name: "agent-trace", caption: "AgentTrace: each step reports its status and time; details fold out." },

    { type: "h2", text: "The components and what each one does", id: "anatomy" },
    {
      type: "table",
      head: ["Component", "Job in an agent UI", "Key props"],
      rows: [
        ["[AgentTrace](/docs/agent-trace)", "The whole run as a timeline of steps", "`steps` (`id`, `name`, `status`, `duration`, `detail`), `title`, `meta`"],
        ["[ApprovalCard](/docs/approval-card)", "Human-in-the-loop decision before a tool runs", "`title`, `requester`, `summary`, `onApprove`, `onReject`, labels"],
        ["[ToolCallCard](/docs/tool-call-card)", "One tool call inside a chat turn", "`name`, `args`, `status`, `duration`, `children`"],
        ["[ToolResultPanel](/docs/tool-result-panel)", "A tool's output as formatted JSON", "`name`, `status`, `output`"],
        ["[InlineCodeDiff](/docs/inline-code-diff)", "A single edit the agent made", "`before`, `after`"],
        ["[ArtifactPreview](/docs/artifact-preview)", "Something the agent produced, framed with copy and expand", "`title`, `copyValue`, `onExpand`"],
        ["[CitationChip](/docs/citation-chip)", "An inline source for a claim in the answer", "`index`, `href`"],
        ["[AiComposer](/docs/ai-composer)", "The task input; its send button becomes stop while running", "`value`, `onSubmit`, `streaming`, `onStop`"],
        ["[TokenUsageMeter](/docs/token-usage-meter)", "Tokens used against a budget", "`used`, `limit`, `label`, `note`"],
      ],
    },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add @minidev/agent-trace @minidev/approval-card @minidev/tool-result-panel @minidev/inline-code-diff @minidev/ai-composer @minidev/token-usage-meter",
    },
    {
      type: "p",
      text: "Files land in `components/ui`. The components read MiniDev's semantic tokens, so add the [token stylesheet](https://ui.minidev.pro/r/styles.css) to your global CSS once.",
    },

    { type: "h2", text: "Model the run as events", id: "events" },
    {
      type: "p",
      text: "The server streams one JSON object per line (NDJSON). There are five event types: a tool started, a tool finished, the agent needs approval, some answer text, and a token count. The client folds them into a `Run` with a pure reducer, which is easy to test and replays the same way every time. Steps are upserted by id, so a step that waited for approval turns into the running step without a duplicate row.",
    },
    { type: "code", lang: "ts", filename: "lib/agent-run.ts", code: "export type StepStatus = \"pending\" | \"running\" | \"done\" | \"error\"\nexport type ToolStep = { id: string; name: string; args: string; status: StepStatus; ms?: number; output?: unknown }\nexport type Approval = { id: string; title: string; summary: string }\n\nexport type RunEvent =\n  | { type: \"tool_start\"; id: string; name: string; args: string }\n  | { type: \"tool_end\"; id: string; ok: boolean; ms: number; output: unknown }\n  | { type: \"approval\"; id: string; name: string; args: string; title: string; summary: string }\n  | { type: \"text\"; delta: string }\n  | { type: \"usage\"; tokens: number }\n\nexport type Run = {\n  status: \"running\" | \"waiting\" | \"done\" | \"error\"\n  steps: ToolStep[]\n  approval: Approval | null\n  text: string\n  tokens: number\n}\n\nexport const emptyRun: Run = { status: \"running\", steps: [], approval: null, text: \"\", tokens: 0 }\n\n// Upsert by id: a step that waited for approval becomes the running step with the same id.\nconst upsert = (steps: ToolStep[], step: ToolStep) =>\n  steps.some((s) => s.id === step.id) ? steps.map((s) => (s.id === step.id ? step : s)) : [...steps, step]\n\nexport function reduce(run: Run, e: RunEvent): Run {\n  switch (e.type) {\n    case \"tool_start\":\n      return { ...run, steps: upsert(run.steps, { id: e.id, name: e.name, args: e.args, status: \"running\" }) }\n    case \"tool_end\":\n      return {\n        ...run,\n        steps: run.steps.map((s) => (s.id === e.id ? { ...s, status: e.ok ? \"done\" : \"error\", ms: e.ms, output: e.output } : s)),\n      }\n    case \"approval\":\n      return {\n        ...run,\n        status: \"waiting\",\n        approval: { id: e.id, title: e.title, summary: e.summary },\n        steps: upsert(run.steps, { id: e.id, name: e.name, args: e.args, status: \"pending\" }),\n      }\n    case \"text\":\n      return { ...run, text: run.text + e.delta }\n    case \"usage\":\n      return { ...run, tokens: e.tokens }\n  }\n}\n\nexport async function* readEvents(res: Response): AsyncGenerator<RunEvent> {\n  const reader = res.body!.getReader()\n  const decoder = new TextDecoder()\n  let buf = \"\"\n  for (;;) {\n    const { done, value } = await reader.read()\n    if (done) break\n    buf += decoder.decode(value, { stream: true })\n    const lines = buf.split(\"\\n\")\n    buf = lines.pop() ?? \"\"\n    for (const line of lines) if (line.trim()) yield JSON.parse(line) as RunEvent\n  }\n  if (buf.trim()) yield JSON.parse(buf) as RunEvent\n}" },
    {
      type: "callout",
      tone: "note",
      text: "The switch has no `default` branch on purpose: with `strict` on, TypeScript reports a missing return if you add an event type and forget to handle it.",
    },

    { type: "h2", text: "A hook with start, approve and stop", id: "hook" },
    {
      type: "p",
      text: "The hook owns one `AbortController` per request and remembers the run id the server returns in a header. Starting a run and answering an approval are the same call with a different body, because both stream the rest of the run back. A stopped run ends as `done`, a failed request as `error`, and partial steps stay on screen either way.",
    },
    { type: "code", lang: "ts", filename: "hooks/use-agent-run.ts", code: "\"use client\"\nimport * as React from \"react\"\nimport { emptyRun, readEvents, reduce, type Run } from \"@/lib/agent-run\"\n\nexport function useAgentRun() {\n  const [run, setRun] = React.useState<Run | null>(null)\n  const runId = React.useRef<string | null>(null)\n  const ctrl = React.useRef<AbortController | null>(null)\n\n  const stream = React.useCallback(async (body: Record<string, unknown>) => {\n    ctrl.current = new AbortController()\n    setRun((r) => ({ ...(r ?? emptyRun), status: \"running\", approval: null }))\n    try {\n      const res = await fetch(\"/api/agent\", {\n        method: \"POST\",\n        headers: { \"content-type\": \"application/json\" },\n        body: JSON.stringify(body),\n        signal: ctrl.current.signal,\n      })\n      if (!res.ok) throw new Error(`Agent request failed: ${res.status}`)\n      runId.current = res.headers.get(\"x-run-id\") ?? runId.current\n      for await (const e of readEvents(res)) setRun((r) => reduce(r ?? emptyRun, e))\n      // The stream ended: the run is finished unless it paused for an approval.\n      setRun((r) => (r && r.status === \"running\" ? { ...r, status: \"done\" } : r))\n    } catch {\n      setRun((r) => (r ? { ...r, status: ctrl.current?.signal.aborted ? \"done\" : \"error\" } : r))\n    }\n  }, [])\n\n  const start = (goal: string) => {\n    runId.current = null\n    setRun(emptyRun)\n    return stream({ goal })\n  }\n  const decide = (approvalId: string, approved: boolean) => stream({ runId: runId.current, approvalId, approved })\n  const stop = () => ctrl.current?.abort()\n\n  return { run, start, decide, stop }\n}" },

    { type: "h2", text: "The page: trace, approval, answer", id: "page" },
    {
      type: "p",
      text: "`AgentTrace` gets the steps directly; their statuses (`pending`, `running`, `done`, `error`) match its own. `detail` holds the arguments and, once the tool returns, its output, which the trace shows in a disclosure. The approval card appears under the trace only while the run is waiting.",
    },
    { type: "code", lang: "tsx", filename: "app/agent/page.tsx", code: "\"use client\"\nimport * as React from \"react\"\nimport { AgentTrace } from \"@/components/ui/agent-trace\"\nimport { ApprovalCard } from \"@/components/ui/approval-card\"\nimport { AiComposer } from \"@/components/ui/ai-composer\"\nimport { TokenUsageMeter } from \"@/components/ui/token-usage-meter\"\nimport { useAgentRun } from \"@/hooks/use-agent-run\"\nimport type { ToolStep } from \"@/lib/agent-run\"\n\nconst seconds = (ms?: number) => (ms == null ? undefined : `${(ms / 1000).toFixed(1)}s`)\nconst detail = (s: ToolStep) => (s.output === undefined ? s.args : `${s.args}\\n\\n${JSON.stringify(s.output, null, 2)}`)\n\nexport default function AgentPage() {\n  const { run, start, decide, stop } = useAgentRun()\n  const [draft, setDraft] = React.useState(\"\")\n\n  return (\n    <div className=\"mx-auto grid max-w-3xl gap-4 p-4\">\n      {run ? (\n        <>\n          <AgentTrace\n            className=\"max-w-none\"\n            meta={`${run.steps.filter((s) => s.status === \"done\").length}/${run.steps.length} tools`}\n            steps={run.steps.map((s) => ({ id: s.id, name: s.name, status: s.status, duration: seconds(s.ms), detail: detail(s) }))}\n          />\n          {run.approval ? (\n            <ApprovalCard\n              className=\"max-w-none\"\n              title={run.approval.title}\n              requester=\"Your agent\"\n              summary={run.approval.summary}\n              approveLabel=\"Run it\"\n              rejectLabel=\"Skip\"\n              onApprove={() => decide(run.approval!.id, true)}\n              onReject={() => decide(run.approval!.id, false)}\n            />\n          ) : null}\n          {run.text ? <p className=\"whitespace-pre-wrap text-sm text-fg\">{run.text}</p> : null}\n          {run.status === \"error\" ? <p className=\"text-sm text-danger\">The run failed. Try again.</p> : null}\n          <TokenUsageMeter used={run.tokens} limit={200_000} label=\"Tokens this run\" note=\"of the per-run budget\" />\n        </>\n      ) : null}\n      <p aria-live=\"polite\" className=\"sr-only\">\n        {run?.status === \"waiting\" ? \"The agent is waiting for your approval.\" : run?.status === \"done\" ? \"The agent finished.\" : \"\"}\n      </p>\n      <AiComposer\n        label=\"Task for the agent\"\n        placeholder=\"Find unpaid invoices over 30 days and draft reminders\"\n        value={draft}\n        onChange={setDraft}\n        streaming={run?.status === \"running\"}\n        onStop={stop}\n        onSubmit={(goal) => {\n          start(goal)\n          setDraft(\"\")\n        }}\n      />\n    </div>\n  )\n}" },
    {
      type: "list",
      items: [
        "Always pass `requester` to `ApprovalCard`; it shows who is asking, and here that is the agent, not a person.",
        "Approval labels should name the action (\"Send 12 emails\", \"Run it\") rather than a bare OK. The summary says what will happen and what it touches.",
        "The `aria-live` line tells screen reader users when the run pauses or finishes without moving their focus. Do not move focus to the approval card automatically; people may be reading the trace.",
        "`AiComposer` turns its send button into a stop button while `streaming` is true and calls `onStop`, which aborts the request.",
      ],
    },
    { type: "component", name: "approval-card" },

    { type: "h2", text: "Show tool output by kind", id: "tool-output" },
    {
      type: "p",
      text: "A raw JSON dump is fine for debugging and poor for everyone else. Map known tools to a better view and fall back to [ToolResultPanel](/docs/tool-result-panel) for the rest. A file edit reads best as a diff; a generated document or chart as an [ArtifactPreview](/docs/artifact-preview).",
    },
    { type: "code", lang: "tsx", filename: "components/agent/step-output.tsx", code: "import { InlineCodeDiff } from \"@/components/ui/inline-code-diff\"\nimport { ToolResultPanel } from \"@/components/ui/tool-result-panel\"\nimport type { ToolStep } from \"@/lib/agent-run\"\n\ntype Edit = { before: string; after: string }\nconst isEdit = (v: unknown): v is Edit =>\n  typeof v === \"object\" && v !== null && typeof (v as Edit).before === \"string\" && typeof (v as Edit).after === \"string\"\n\nexport function StepOutput({ step }: { step: ToolStep }) {\n  if (step.name === \"edit_file\" && isEdit(step.output)) return <InlineCodeDiff before={step.output.before} after={step.output.after} />\n  const status = step.status === \"error\" ? \"error\" : step.status === \"done\" ? \"success\" : \"running\"\n  return <ToolResultPanel name={step.name} status={status} output={step.output} />\n}" },
    {
      type: "p",
      text: "For answers built from retrieved documents, put a [CitationChip](/docs/citation-chip) after each sentence it supports, with `href` set to the source. Agents that cite are easier to check, and the chip is a real link or button, so it is reachable by keyboard.",
    },

    { type: "h2", text: "The server route", id: "server" },
    {
      type: "p",
      text: "The route streams whatever your agent loop emits. `runAgent` is your code: it calls the model, runs tools and calls `send` for each event. When a tool needs approval it saves the run state under `runId`, sends an `approval` event and returns, which ends the stream. The next request carries the decision; `runAgent` loads the state and continues from there.",
    },
    { type: "code", lang: "ts", filename: "app/api/agent/route.ts", code: "import { runAgent } from \"@/lib/agent\"\nimport type { RunEvent } from \"@/lib/agent-run\"\n\nexport async function POST(req: Request) {\n  const body = await req.json()\n  const runId: string = body.runId ?? crypto.randomUUID()\n  const encoder = new TextEncoder()\n\n  const stream = new ReadableStream({\n    async start(controller) {\n      const send = (e: RunEvent) => controller.enqueue(encoder.encode(JSON.stringify(e) + \"\\n\"))\n      try {\n        await runAgent({\n          runId,\n          goal: body.goal,\n          decision: body.approvalId ? { id: String(body.approvalId), approved: body.approved === true } : undefined,\n          send,\n          signal: req.signal,\n        })\n      } finally {\n        controller.close()\n      }\n    },\n  })\n\n  return new Response(stream, { headers: { \"content-type\": \"application/x-ndjson\", \"x-run-id\": runId } })\n}" },
    {
      type: "callout",
      tone: "warning",
      text: "Treat the approval request as untrusted input. On the server, check that the run belongs to the signed-in user and that `approvalId` is the step actually waiting, before running the tool. Otherwise anyone who can call the endpoint can approve anything.",
    },

    { type: "h2", text: "Which steps should ask first", id: "approval-policy" },
    {
      type: "table",
      head: ["Tool does", "Ask first?", "Why"],
      rows: [
        ["Reads data the user can already see", "No", "Asking for every read makes people approve on autopilot"],
        ["Writes a draft (not sent, not published)", "No", "Easy to review and undo afterwards"],
        ["Sends email, messages or notifications", "Yes", "Cannot be unsent"],
        ["Moves money, changes a plan, refunds", "Yes", "Financial and often irreversible"],
        ["Deletes or overwrites records or files", "Yes", "Data loss"],
        ["Runs code or shell commands", "Yes, or sandbox it", "Arbitrary side effects"],
      ],
    },
    {
      type: "p",
      text: "Keep the list short and explicit in your tool definitions, not in a prompt. If approvals pile up, batch them: one card that says \"Send 12 reminder emails\" with the list in the summary is better than twelve cards.",
    },

    { type: "h2", text: "Finishing touches", id: "finishing" },
    {
      type: "list",
      items: [
        "Show the run's cost or tokens with `TokenUsageMeter`, or put a short summary in `AgentTrace`'s `meta`, for example \"4 tools · 3.1s\".",
        "Keep finished runs. Persist the event list and replay it through the same reducer to show history; no second renderer needed.",
        "Collapse long traces: after a run completes, show the final answer first and the trace folded under it.",
        "Inside a chat, render each tool call with [ToolCallCard](/docs/tool-call-card) in the assistant turn instead of a separate trace; the [chat guide](/guides/ai-chat-ui-react) shows that layout.",
        "Respect reduced motion. MiniDev's spinners and pulses already do; anything you add should too.",
      ],
    },
  ],
  faq: [
    {
      q: "What is human-in-the-loop UI for AI agents?",
      a: "An interface that pauses the agent before a consequential action, such as sending email or issuing a refund, shows what it is about to do and waits for a person to approve or reject it. The agent then continues with that decision.",
    },
    {
      q: "How do I show AI tool calls in a React UI?",
      a: "Stream an event when each tool starts and finishes, keep the calls in state by id, and render them as a trace or as cards with name, arguments, status and duration. Put outputs behind a disclosure so the run stays readable.",
    },
    {
      q: "Do these components work with the Vercel AI SDK, LangGraph or the Claude Agent SDK?",
      a: "Yes. They are presentational React components with plain props. Map the events or message parts your framework produces to the step shape AgentTrace expects and to ApprovalCard's callbacks.",
    },
    {
      q: "How do I let users stop an AI agent?",
      a: "Create an AbortController per request, pass its signal to fetch, and call abort from a stop button. On the server, pass the request's signal into your agent loop so it stops calling the model and tools too.",
    },
  ],
}

export default guide
