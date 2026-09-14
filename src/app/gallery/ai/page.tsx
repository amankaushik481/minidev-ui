"use client"
import * as React from "react"
import { ChatThread } from "@/registry/ui/chat-thread"
import { PromptInput } from "@/registry/ui/prompt-input"
import { CodeBlock } from "@/registry/ui/code-block"
import { CitationChip } from "@/registry/ui/citation-chip"
import { SourceCard } from "@/registry/ui/source-card"
import { ToolCallCard } from "@/registry/ui/tool-call-card"
import { ReasoningBlock } from "@/registry/ui/reasoning-block"
import { SuggestionChips } from "@/registry/ui/suggestion-chips"
import { TokenUsageMeter } from "@/registry/ui/token-usage-meter"
import { ModelPicker } from "@/registry/ui/model-picker"
import { FeedbackThumbs } from "@/registry/ui/feedback-thumbs"
import { StopGenerating } from "@/registry/ui/stop-generating"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

const demoCode = `export function Hello() {
  return <div>MiniDev</div>
}`

export default function Page() {
  const [prompt, setPrompt] = React.useState("")
  const [thumb, setThumb] = React.useState<"up" | "down" | null>(null)
  return (
    <GalleryPage title="AI surfaces">
      <GallerySection title="Thread">
        <div className="w-full max-w-xl space-y-3">
          <ChatThread
            messages={[
              { id: "1", role: "user", content: "Build a pricing table" },
              {
                id: "2",
                role: "assistant",
                content: (
                  <>
                    Sure — here is a starter. <CitationChip className="ml-1">1</CitationChip>
                  </>
                ),
              },
              { id: "3", role: "assistant", content: "Streaming response…", streaming: true },
            ]}
          />
          <ReasoningBlock>
            Considered layout density, Hairline borders, and tabular numbers for prices.
          </ReasoningBlock>
          <ToolCallCard name="read_file" status="done">
            DESIGN.md § Geometry
          </ToolCallCard>
          <div className="flex items-center justify-between">
            <FeedbackThumbs value={thumb} onChange={setThumb} />
            <StopGenerating />
          </div>
          <SuggestionChips items={["Add yearly toggle", "Make it responsive", "Dark mode"]} />
          <PromptInput value={prompt} onChange={setPrompt} onSubmit={() => setPrompt("")} />
        </div>
      </GallerySection>
      <GallerySection title="Sources / code / model">
        <SourceCard
          className="max-w-sm"
          title="Radix Select"
          url="https://www.radix-ui.com"
          snippet="Accessible select primitive."
        />
        <CodeBlock className="max-w-lg" code={demoCode} />
        <div className="w-56 space-y-3">
          <ModelPicker
            models={[
              { id: "gpt", label: "GPT" },
              { id: "sonnet", label: "Sonnet" },
              { id: "opus", label: "Opus" },
            ]}
            value="sonnet"
          />
          <TokenUsageMeter used={4200} limit={10000} />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
