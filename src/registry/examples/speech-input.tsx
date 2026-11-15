"use client"
import * as React from "react"
import { PromptInput } from "@/registry/ui/prompt-input"
import { SpeechInput } from "@/registry/ui/speech-input"
import type { Example } from "./types"

function DictatedPrompt() {
  const [prompt, setPrompt] = React.useState("")
  const [preview, setPreview] = React.useState("")
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <PromptInput
        value={prompt}
        onChange={setPrompt}
        onSubmit={() => setPrompt("")}
        placeholder="Ask about your invoices, or dictate"
        toolbar={
          <SpeechInput
            size="sm"
            onTranscript={(text, { final }) => {
              if (final) {
                setPrompt((p) => `${p} ${text.trim()}`.trim())
                setPreview("")
              } else setPreview(text)
            }}
          />
        }
      />
      <p aria-hidden className="min-h-5 px-4 text-[0.8125rem] text-fg-subtle italic">
        {preview}
      </p>
    </div>
  )
}

function MeetingNote() {
  const [text, setText] = React.useState("")
  const [preview, setPreview] = React.useState("")
  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-surface p-4 shadow-raised">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.8125rem] font-medium text-fg">Call notes: Northwind renewal</p>
        <SpeechInput
          lang="en-GB"
          aria-label="Dictate call notes"
          onTranscript={(chunk, { final }) => {
            if (final) {
              setText((t) => `${t} ${chunk.trim()}`.trim())
              setPreview("")
            } else setPreview(chunk)
          }}
        />
      </div>
      <p className="mt-3 min-h-16 text-sm leading-6 text-fg">
        {text || preview ? null : <span className="text-fg-subtle">Press the mic and talk. Escape stops.</span>}
        {text} <span className="text-fg-subtle">{preview}</span>
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Dictate into a prompt",
    description: "Settled text is appended to the prompt; the live guess shows in grey under it until the phrase ends.",
    code: `function DictatedPrompt() {
  const [prompt, setPrompt] = React.useState("")
  const [preview, setPreview] = React.useState("")
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <PromptInput
        value={prompt}
        onChange={setPrompt}
        onSubmit={() => setPrompt("")}
        placeholder="Ask about your invoices, or dictate"
        toolbar={
          <SpeechInput
            size="sm"
            onTranscript={(text, { final }) => {
              if (final) {
                setPrompt((p) => \`\${p} \${text.trim()}\`.trim())
                setPreview("")
              } else setPreview(text)
            }}
          />
        }
      />
      <p aria-hidden className="min-h-5 px-4 text-[0.8125rem] text-fg-subtle italic">{preview}</p>
    </div>
  )
}`,
    node: <DictatedPrompt />,
  },
  {
    title: "Notes with a set language",
    description: "lang picks the recognition language. The preview sits inline after the settled text, in a lighter colour.",
    code: `function MeetingNote() {
  const [text, setText] = React.useState("")
  const [preview, setPreview] = React.useState("")
  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-surface p-4 shadow-raised">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.8125rem] font-medium text-fg">Call notes: Northwind renewal</p>
        <SpeechInput
          lang="en-GB"
          aria-label="Dictate call notes"
          onTranscript={(chunk, { final }) => {
            if (final) {
              setText((t) => \`\${t} \${chunk.trim()}\`.trim())
              setPreview("")
            } else setPreview(chunk)
          }}
        />
      </div>
      <p className="mt-3 min-h-16 text-sm leading-6 text-fg">
        {text} <span className="text-fg-subtle">{preview}</span>
      </p>
    </div>
  )
}`,
    node: <MeetingNote />,
  },
  {
    title: "Sizes and states",
    description: "sm is 32px for composer toolbars, md is 36px. In Firefox the button is disabled and its tooltip says why.",
    code: `<SpeechInput size="sm" />
<SpeechInput />
<SpeechInput disabled />`,
    node: (
      <div className="flex items-center gap-3">
        <SpeechInput size="sm" />
        <SpeechInput />
        <SpeechInput disabled />
      </div>
    ),
  },
]
