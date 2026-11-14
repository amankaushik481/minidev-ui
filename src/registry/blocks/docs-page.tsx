"use client"
import { cn } from "@/lib/utils"
import { Callout } from "@/registry/ui/callout"
import { CodeBlock } from "@/registry/ui/code-block"
import { Prose } from "@/registry/ui/prose"
import { Toc } from "@/registry/ui/toc"

/**
 * DocsPage — a documentation article: a sticky table of contents beside prose, code samples and a callout.
 *
 * Use for guides and how-tos. Every Toc entry points at a heading id in the article. For endpoint reference with
 * methods and a curl sample use ApiDocsPage; for release notes use ChangelogPage. On small screens the Toc stacks
 * above the article.
 *
 * @example
 * <DocsPage />
 */
type DocsPageProps = {
  className?: string
}

function DocsPage({ className }: DocsPageProps) {
  return (
    <div data-slot="docs-page" className={cn("mx-auto grid max-w-5xl gap-10 lg:grid-cols-[200px_1fr]", className)}>
      <Toc
        className="lg:sticky lg:top-6 lg:self-start"
        items={[
          { id: "quickstart", title: "Quickstart", level: 1 },
          { id: "install", title: "Install the SDK", level: 2 },
          { id: "authenticate", title: "Authenticate", level: 2 },
          { id: "first-query", title: "Your first query", level: 1 },
        ]}
      />
      <article className="min-w-0 space-y-6">
        <Prose>
          <h1 id="quickstart">Quickstart</h1>
          <p>Ask Lumen a question about your revenue from code in about five minutes. You need a workspace and an API key.</p>
          <h2 id="install">Install the SDK</h2>
          <p>The SDK works in Node 20+ and any edge runtime.</p>
        </Prose>
        <CodeBlock code="npm install @lumen/sdk" language="bash" />
        <Prose>
          <h2 id="authenticate">Authenticate</h2>
          <p>Create a read-only key in Settings → API keys and keep it on the server.</p>
        </Prose>
        <Callout title="Keys are read-only" tone="info">
          Lumen never writes to your systems. A leaked key can read aggregates, so rotate it from the same page.
        </Callout>
        <Prose>
          <h2 id="first-query">Your first query</h2>
        </Prose>
        <CodeBlock
          language="ts"
          filename="mrr.ts"
          code={`import { Lumen } from "@lumen/sdk"\n\nconst lumen = new Lumen({ apiKey: process.env.LUMEN_KEY })\nconst { value, reason } = await lumen.ask("MRR change this week")\nconsole.log(value, reason) // "+3.1%", "Two Team upgrades"`}
        />
      </article>
    </div>
  )
}

export { DocsPage }
export type { DocsPageProps }
