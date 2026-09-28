"use client"
import * as React from "react"
import { Toc } from "@/registry/ui/toc"
import { Prose } from "@/registry/ui/prose"
import { Callout } from "@/registry/ui/callout"
import { CodeBlock } from "@/registry/ui/code-block"

function DocsPage() {
  return (
    <div data-slot="docs-page" className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[200px_1fr]">
      <Toc
        items={[
          { id: "intro", title: "Introduction" },
          { id: "install", title: "Install", level: 2 },
          { id: "tokens", title: "Tokens", level: 2 },
        ]}
        activeId="intro"
      />
      <div className="space-y-6">
        <Prose>
          <h1 id="intro">Introduction</h1>
          <p>Everything you need to integrate Lumen, from first request to production.</p>
          <h2 id="install">Install</h2>
          <p>Add components from the registry into your Next.js app.</p>
        </Prose>
        <CodeBlock code="npx shadcn@latest add @minidev/button" language="bash" />
        <Callout title="Tip" tone="info">Start with the quickstart, then explore the API reference.</Callout>
      </div>
    </div>
  )
}
export { DocsPage }
