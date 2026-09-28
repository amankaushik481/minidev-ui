"use client"
import * as React from "react"
import { RotateCcwIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { AgentTrace } from "@/registry/ui/agent-trace"
import { InteractiveAreaChart } from "@/registry/ui/interactive-area-chart"
import { NotificationInbox } from "@/registry/ui/notification-inbox"
import { Toaster, toast } from "@/registry/ui/toast"
import { PromptInput } from "@/registry/ui/prompt-input"
import { ReasoningBlock } from "@/registry/ui/reasoning-block"
import { ToolCallCard } from "@/registry/ui/tool-call-card"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

const STEPS = [
  { name: "read_file(\"pricing-table.tsx\")", duration: "0.2s", detail: "182 lines · PlanCard × 3, no billing toggle" },
  { name: "search_docs(\"segmented control\")", duration: "0.6s", detail: "Found SegmentedControl in registry/ui" },
  { name: "edit_file(\"pricing-table.tsx\")", duration: "0.9s", detail: "+ <SegmentedControl items={[\"Monthly\", \"Yearly\"]} />" },
  { name: "run_checks()", duration: "2.1s", detail: "tsc ✓  axe ✓  contrast ✓ (light + dark)" },
]

function LiveAgent() {
  const [k, setK] = React.useState(0)
  React.useEffect(() => {
    if (k >= STEPS.length) return
    const t = window.setTimeout(() => setK((x) => x + 1), 1100)
    return () => window.clearTimeout(t)
  }, [k])
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <AgentTrace
        steps={STEPS.map((s, i) => ({ id: String(i), name: s.name, duration: s.duration, detail: s.detail, status: i < k ? "done" : i === k ? "running" : "pending" }))}
        meta={k >= STEPS.length ? "4 tools · 3.8s · $0.006" : "running…"}
      />
      <Button size="sm" variant="outline" onClick={() => setK(0)}><RotateCcwIcon /> Run again</Button>
    </div>
  )
}

export default function NewGallery() {
  const [prompt, setPrompt] = React.useState("")
  return (
    <GalleryPage title="New in 0.2" description="Interactive charts, a stacked toast system, agent runs and an inbox. All free, all one file each.">
      <Toaster />
      <GallerySection title="Interactive area chart" description="Hover, or focus and use the arrow keys" className="justify-center">
        <InteractiveAreaChart />
      </GallerySection>
      <GallerySection title="Agent run" description="Live: steps advance on their own" className="justify-center">
        <LiveAgent />
      </GallerySection>
      <GallerySection title="Toasts" description="toast(), toast.success(), toast.error(), toast.promise()" className="justify-center">
        <Button variant="outline" onClick={() => toast("Draft saved", { description: "Autosaved 2 seconds ago." })}>Default</Button>
        <Button variant="outline" onClick={() => toast.success("Invoice sent", { description: "Northwind Labs will get it by email.", action: { label: "View invoice", onClick: () => {} } })}>Success</Button>
        <Button variant="outline" onClick={() => toast.warning("Seat limit almost reached", { description: "18 of 20 seats used." })}>Warning</Button>
        <Button variant="outline" onClick={() => toast.error("Payment failed", { description: "The card was declined. Try another method." })}>Error</Button>
        <Button onClick={() => toast.promise(new Promise((r) => setTimeout(r, 1600)), { loading: "Deploying web@4.2.0…", success: "Deployed to production", error: "Deploy failed" })}>Promise</Button>
      </GallerySection>
      <GallerySection title="Notification inbox" description="Tabs, unread state, mark all read" className="justify-center">
        <NotificationInbox />
      </GallerySection>
      <GallerySection title="Composer, reasoning, tool calls" description="The AI primitives, restyled" className="justify-center">
        <div className="w-full max-w-xl space-y-3">
          <ReasoningBlock duration="4s" defaultOpen>
            Checked the pricing table, found three PlanCards without a billing toggle. A SegmentedControl above them keeps the toggle on the heading baseline.
          </ReasoningBlock>
          <ToolCallCard name="edit_file" args={'"pricing-table.tsx"'} status="done" duration="0.9s">
            + {"<SegmentedControl items={[\"Monthly\", \"Yearly\"]} />"}
          </ToolCallCard>
          <ToolCallCard name="run_checks" status="running" />
          <PromptInput value={prompt} onChange={setPrompt} onSubmit={() => setPrompt("")} placeholder="Ask for a change…" />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
