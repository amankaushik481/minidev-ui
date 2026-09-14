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
await cp(path.join(root, "registry.json"), path.join(out, "registry.json"))
await cp(path.join(root, "llms.txt"), path.join(out, "llms.txt"))

const files = await walk(out)
for (const f of files) {
  const raw = await readFile(f, "utf8")
  const next = rewrite(raw, f, out)
  if (next !== raw) await writeFile(f, next)
}

const pkg = {
  name: "minidev-ui",
  version: "0.1.0",
  description: "MiniDev UI — Hairline React + Tailwind components (free) + Premium motion blocks",
  license: "MIT",
  type: "module",
  sideEffects: false,
  files: ["ui", "premium", "blocks", "utils.ts", "DESIGN.md", "registry.json", "llms.txt", "README.md"],
  exports: {
    "./package.json": "./package.json",
    "./utils": "./utils.ts",
    "./registry.json": "./registry.json",
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
  keywords: ["react", "tailwind", "ui", "components", "minidev", "hairline"],
  repository: { type: "git", url: "git+https://github.com/amankaushik481/minidev-ui.git" },
  bugs: { url: "https://github.com/amankaushik481/minidev-ui/issues" },
  homepage: "https://ui.minidev.pro"
}

await writeFile(path.join(out, "package.json"), JSON.stringify(pkg, null, 2) + "\n")
await writeFile(
  path.join(out, "README.md"),
  `# minidev-ui

Hairline React + Tailwind registry from MiniDev.

## Install

\`\`\`bash
npm install minidev-ui
\`\`\`

Peer deps: \`react\`, \`react-dom\`, \`@base-ui/react\`, \`class-variance-authority\`, \`clsx\`, \`tailwind-merge\`, \`lucide-react\`. Premium motion blocks also need \`motion\`.

## Import

\`\`\`tsx
import { Button } from "minidev-ui/ui/button"
import { HeroKineticType } from "minidev-ui/premium/hero-kinetic-type"
\`\`\`

Your bundler must transpile the package (Next.js: \`transpilePackages: ["minidev-ui"]\`).

Site + docs: https://ui.minidev.pro  
Design law: see \`DESIGN.md\` in this package.

MIT for free UI. Premium blocks are included for evaluation; commercial soft-gate may apply later.
`
)

console.log("npm-pack ready", files.length, "files rewritten tree")
