"use client"
import * as React from "react"
import { AiComposer } from "@/registry/ui/ai-composer"
import { ConversationSidebar } from "@/registry/ui/conversation-sidebar"
import { ChatThread } from "@/registry/ui/chat-thread"
import { MessageActions } from "@/registry/ui/message-actions"
import { ThinkingBlock } from "@/registry/ui/thinking-block"
import { ToolResultPanel } from "@/registry/ui/tool-result-panel"
import { PromptLibrary } from "@/registry/ui/prompt-library"
import { ModelCompare } from "@/registry/ui/model-compare"
import { NotebookCell } from "@/registry/ui/notebook-cell"
import { InlineCodeDiff } from "@/registry/ui/inline-code-diff"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  const [msg, setMsg] = React.useState("")
  const [active, setActive] = React.useState("1")
  return (
    <GalleryPage title="AI studio">
      <GallerySection title="Composer shell">
        <div className="flex h-[420px] w-full max-w-4xl overflow-hidden rounded-xl border border-border">
          <ConversationSidebar
            activeId={active}
            onSelect={setActive}
            onNew={() => {}}
            items={[
              { id: "1", title: "Hairline audit plan", updatedAt: new Date(Date.now() - 3600000).toISOString() },
              { id: "2", title: "Premium hero copy", updatedAt: new Date(Date.now() - 86400000).toISOString() },
            ]}
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex-1 space-y-3 overflow-auto p-4">
              <ChatThread messages={[
                { id: "a", role: "user", content: "Draft a Premium hero for MiniDev." },
                { id: "b", role: "assistant", content: (
                  <div className="space-y-2">
                    <ThinkingBlock>Considering Hairline tokens, violet accent, and reduced motion…</ThinkingBlock>
                    <p>Here is a launch-ready hero with aurora motion and clear CTAs.</p>
                    <MessageActions />
                  </div>
                )},
              ]} />
              <ToolResultPanel name="generate_hero" output={'{\n  "variant": "aurora",\n  "cta": ["Start free", "See Premium"]\n}'} />
            </div>
            <div className="border-t border-border p-3">
              <AiComposer
                value={msg}
                onChange={setMsg}
                suggestions={["Improve contrast", "Add FAQ", "Write changelog"]}
                onSubmit={() => setMsg("")}
              />
            </div>
          </div>
        </div>
      </GallerySection>
      <GallerySection title="Prompts / models / notebook">
        <div className="w-80">
          <PromptLibrary
            prompts={[
              { id: "1", title: "Critique UI", body: "Review this screen for Hairline violations.", tag: "Design" },
              { id: "2", title: "Write changelog", body: "Summarize commits as a customer-facing changelog.", tag: "Docs" },
            ]}
          />
        </div>
        <div className="w-full max-w-xl">
          <ModelCompare rows={[
            { name: "Fast", latencyMs: 420, cost: "$0.002", quality: "Good" },
            { name: "Pro", latencyMs: 980, cost: "$0.01", quality: "Great" },
            { name: "Max", latencyMs: 1800, cost: "$0.04", quality: "Best" },
          ]} />
        </div>
        <div className="w-full max-w-xl space-y-3">
          <NotebookCell code={"const n = 42\nconsole.log(n)"} output="42" />
          <InlineCodeDiff before="color: gray" after="color: var(--fg-muted)" />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
