#!/usr/bin/env node
/**
 * Build a publishable package tree under npm-pack/
 * Rewrites @/lib/utils and @/registry/* to relative imports.
 */
import { mkdir, rm, cp, readFile, writeFile, readdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const out = path.join(root, "npm-pack")

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...(await walk(p)))
    else if (/\.(tsx|ts|jsx|js)$/.test(e.name)) files.push(p)
  }
  return files
}

function rewrite(content, filePath, packRoot) {
  const dir = path.dirname(filePath)
  const toUtils = path.relative(dir, path.join(packRoot, "utils.ts")).replaceAll("\\", "/")
  const utilsImport = toUtils.startsWith(".") ? toUtils : `./${toUtils}`
  let out = content.replaceAll(`@/lib/utils`, utilsImport.replace(/\.ts$/, ""))

  out = out.replace(/@\/registry\/(ui|premium|blocks)\/([a-z0-9-]+)/g, (_, kind, name) => {
    const target = path.join(packRoot, kind, `${name}.tsx`)
    let rel = path.relative(dir, target).replaceAll("\\", "/")
    if (!rel.startsWith(".")) rel = `./${rel}`
    return rel.replace(/\.tsx$/, "")
  })
  return out
}

await rm(out, { recursive: true, force: true })
await mkdir(out, { recursive: true })
await cp(path.join(root, "src/lib/utils.ts"), path.join(out, "utils.ts"))
for (const kind of ["ui", "premium", "blocks"]) {
  await cp(path.join(root, "src/registry", kind), path.join(out, kind), { recursive: true })
}
await cp(path.join(root, "DESIGN.md"), path.join(out, "DESIGN.md"))
await cp(path.join(root, "src/styles/minidev.css"), path.join(out, "styles.css"))
await cp(path.join(root, "registry.json"), path.join(out, "registry.json"))
await cp(path.join(root, "llms.txt"), path.join(out, "llms.txt"))
await cp(path.join(root, "LICENSE"), path.join(out, "LICENSE"))

const files = await walk(out)
for (const f of files) {
  const raw = await readFile(f, "utf8")
  const next = rewrite(raw, f, out)
  if (next !== raw) await writeFile(f, next)
}

const pkg = {
  name: "minidev-ui-kit",
  version: "0.3.0",
  description: "500+ free React and Tailwind CSS v4 components, blocks and motion components. shadcn-compatible, built on Base UI. MIT.",
  license: "MIT",
  type: "module",
  sideEffects: ["*.css"],
  files: ["ui", "premium", "blocks", "utils.ts", "styles.css", "DESIGN.md", "registry.json", "llms.txt", "README.md", "LICENSE"],
  exports: {
    "./package.json": "./package.json",
    "./utils": "./utils.ts",
    "./registry.json": "./registry.json",
    "./styles.css": "./styles.css",
    "./ui/*": "./ui/*.tsx",
    "./premium/*": "./premium/*.tsx",
    "./blocks/*": "./blocks/*.tsx"
  },
  peerDependencies: {
    "react": ">=18",
    "react-dom": ">=18",
    "@base-ui/react": "^1.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0 || ^3.0.0",
    "lucide-react": ">=0.400.0",
    "motion": ">=11"
  },
  peerDependenciesMeta: {
    motion: { optional: true },
    "@base-ui/react": { optional: false }
  },
  keywords: ["react", "react-components", "tailwind", "tailwindcss", "tailwindcss-v4", "shadcn", "shadcn-ui", "base-ui", "nextjs", "ui", "ui-kit", "component-library", "design-system", "motion", "animation", "dashboard", "data-table", "minidev"],
  repository: { type: "git", url: "git+https://github.com/amankaushik481/minidev-ui.git" },
  bugs: { url: "https://github.com/amankaushik481/minidev-ui/issues" },
  homepage: "https://ui.minidev.pro"
}

await writeFile(path.join(out, "package.json"), JSON.stringify(pkg, null, 2) + "\n")
await writeFile(
  path.join(out, "README.md"),
  `# minidev-ui-kit

500+ free React components, blocks and motion components for real product screens: data tables, billing, settings, dashboards, command palettes and AI chat. Tailwind CSS v4, Base UI, shadcn-compatible. MIT.

- Website and docs: https://ui.minidev.pro
- Every component: https://ui.minidev.pro/components
- Source: https://github.com/amankaushik481/minidev-ui

Prefer one component at a time? Use the shadcn CLI: \`npx shadcn@latest add https://ui.minidev.pro/r/multi-select.json\`

## Install

\`\`\`bash
npm i minidev-ui-kit @base-ui/react class-variance-authority clsx tailwind-merge lucide-react motion
\`\`\`

\`\`\`css
/* app/globals.css */
@import "tailwindcss";
@import "minidev-ui-kit/styles.css";
@source "../node_modules/minidev-ui-kit";
\`\`\`

\`\`\`tsx
import { Button } from "minidev-ui-kit/ui/button"
import { HeroKineticType } from "minidev-ui-kit/premium/hero-kinetic-type"
\`\`\`

Next.js: add \`transpilePackages: ["minidev-ui-kit"]\` to next.config.

Docs: https://ui.minidev.pro · For AI agents: https://ui.minidev.pro/llms.txt
`
)

console.log("npm-pack ready", files.length, "files rewritten tree")
