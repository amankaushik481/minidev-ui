"use client"
import * as React from "react"
import { ContextChip } from "@/registry/ui/context-chip"
import { PromptInput } from "@/registry/ui/prompt-input"
import type { Example } from "./types"

function ContextSources() {
  const [on, setOn] = React.useState({ page: true, invoices: false, crm: false })
  const flip = (key: keyof typeof on) => setOn((s) => ({ ...s, [key]: !s[key] }))
  return (
    <div className="flex flex-wrap gap-1.5">
      <ContextChip active={on.page} onClick={() => flip("page")}>This page</ContextChip>
      <ContextChip active={on.invoices} onClick={() => flip("invoices")}>Invoices</ContextChip>
      <ContextChip active={on.crm} onClick={() => flip("crm")}>CRM notes</ContextChip>
      <ContextChip active={false} disabled>Email (not connected)</ContextChip>
    </div>
  )
}

function ComposerWithContext() {
  const [web, setWeb] = React.useState(false)
  const [files, setFiles] = React.useState(true)
  return (
    <PromptInput
      className="w-full max-w-lg"
      placeholder="Ask about your workspace…"
      toolbar={
        <div className="flex gap-1">
          <ContextChip active={files} onClick={() => setFiles((v) => !v)}>Workspace files</ContextChip>
          <ContextChip active={web} onClick={() => setWeb((v) => !v)}>Web</ContextChip>
        </div>
      }
    />
  )
}

export const examples: Example[] = [
  {
    title: "Context sources",
    description: "Each chip toggles one source. Pass active={false}, not undefined, so it is announced as a toggle.",
    code: `function ContextSources() {
  const [on, setOn] = React.useState({ page: true, invoices: false, crm: false })
  const flip = (key: keyof typeof on) => setOn((s) => ({ ...s, [key]: !s[key] }))
  return (
    <div className="flex flex-wrap gap-1.5">
      <ContextChip active={on.page} onClick={() => flip("page")}>This page</ContextChip>
      <ContextChip active={on.invoices} onClick={() => flip("invoices")}>Invoices</ContextChip>
      <ContextChip active={on.crm} onClick={() => flip("crm")}>CRM notes</ContextChip>
      <ContextChip active={false} disabled>Email (not connected)</ContextChip>
    </div>
  )
}`,
    node: <ContextSources />,
  },
  {
    title: "In the composer toolbar",
    description: "Put the chips in PromptInput's toolbar so the sources sit next to the field they apply to.",
    code: `function ComposerWithContext() {
  const [web, setWeb] = React.useState(false)
  const [files, setFiles] = React.useState(true)
  return (
    <PromptInput
      className="w-full max-w-lg"
      placeholder="Ask about your workspace…"
      toolbar={
        <div className="flex gap-1">
          <ContextChip active={files} onClick={() => setFiles((v) => !v)}>Workspace files</ContextChip>
          <ContextChip active={web} onClick={() => setWeb((v) => !v)}>Web</ContextChip>
        </div>
      }
    />
  )
}`,
    node: <ComposerWithContext />,
  },
]
