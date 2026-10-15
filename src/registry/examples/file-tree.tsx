"use client"
import * as React from "react"
import { FileTree, type FileTreeNode } from "@/registry/ui/file-tree"
import type { Example } from "./types"

const docs: FileTreeNode[] = [
  {
    name: "docs",
    children: [
      { name: "getting-started.md" },
      {
        name: "components",
        children: [{ name: "button.mdx", status: "M" }, { name: "dialog.mdx" }, { name: "tabs.mdx", status: "A" }],
      },
      { name: "tokens.md" },
    ],
  },
  { name: "public", children: [{ name: "logo.svg" }, { name: "og.png" }] },
  { name: "package.json" },
  { name: "README.md" },
]

function ControlledDemo() {
  const [selected, setSelected] = React.useState("app/dashboard/page.tsx")
  return (
    <div className="flex w-full max-w-72 flex-col gap-2">
      <FileTree selected={selected} onSelect={setSelected} />
      <p className="truncate font-mono text-xs text-fg-muted">{selected}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled selection",
    description: "Hold the selected path in state and sync it with onSelect, which fires for files and folders alike.",
    code: `function ControlledDemo() {
  const [selected, setSelected] = React.useState("app/dashboard/page.tsx")
  return (
    <div className="flex w-full max-w-72 flex-col gap-2">
      <FileTree selected={selected} onSelect={setSelected} />
      <p className="truncate font-mono text-xs text-fg-muted">{selected}</p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Custom project",
    description: "Pass nested data, the folders to open on first render and the file that starts selected; status letters come from each node.",
    code: `const docs: FileTreeNode[] = [
  {
    name: "docs",
    children: [
      { name: "getting-started.md" },
      {
        name: "components",
        children: [{ name: "button.mdx", status: "M" }, { name: "dialog.mdx" }, { name: "tabs.mdx", status: "A" }],
      },
      { name: "tokens.md" },
    ],
  },
  { name: "public", children: [{ name: "logo.svg" }, { name: "og.png" }] },
  { name: "package.json" },
  { name: "README.md" },
]

<FileTree data={docs} title="lumen-docs" defaultExpanded={["docs", "docs/components"]} defaultSelected="docs/components/button.mdx" />`,
    node: <FileTree data={docs} title="lumen-docs" defaultExpanded={["docs", "docs/components"]} defaultSelected="docs/components/button.mdx" />,
  },
  {
    title: "Plain tree",
    description: "Turn off the filter field, the git status and the header for a quiet picker inside a form or a sheet.",
    code: `// docs is the tree from the "Custom project" example.
<FileTree data={docs} title="" searchable={false} showStatus={false} defaultExpanded={["docs"]} defaultSelected="docs/tokens.md" />`,
    node: <FileTree data={docs} title="" searchable={false} showStatus={false} defaultExpanded={["docs"]} defaultSelected="docs/tokens.md" />,
  },
]
