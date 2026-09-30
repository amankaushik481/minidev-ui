"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, BotIcon, FileTextIcon, PackageIcon, TerminalSquareIcon } from "lucide-react"
import { COMPONENT_INDEX } from "@/lib/component-index"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CodeBlock } from "@/registry/ui/code-block"
import { Switch } from "@/registry/ui/switch"
import { Checkbox } from "@/registry/ui/checkbox"
import { StatusBadge } from "@/registry/ui/status-badge"
import { DocsH2, DocsShell, Tabbed } from "./_components/docs-shell"
import { CATEGORIES } from "@/content/categories"
import { useTheme } from "@/components/theme-toggle"

const TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "installation", label: "Installation" },
  { id: "browse", label: "Browse by category" },
  { id: "usage", label: "Usage" },
  { id: "theming", label: "Theming" },
  { id: "dark-mode", label: "Dark mode" },
  { id: "ai", label: "For AI agents" },
  { id: "principles", label: "Principles" },
]

const count = (k: string) => COMPONENT_INDEX.filter((c) => c.kind === k).length

const HUES = [
  { h: 283, name: "Violet" },
  { h: 255, name: "Indigo" },
  { h: 230, name: "Blue" },
  { h: 160, name: "Emerald" },
  { h: 45, name: "Amber" },
  { h: 20, name: "Coral" },
]

function ThemeLab() {
  const [hue, setHue] = React.useState(283)
  const [on, setOn] = React.useState(true)
  const { dark, setDark } = useTheme()
  const vars = {
    "--accent": dark ? `oklch(0.7 0.165 ${hue})` : `oklch(0.53 0.215 ${hue})`,
    "--accent-hover": dark ? `oklch(0.76 0.15 ${hue})` : `oklch(0.48 0.215 ${hue})`,
    "--accent-fg": dark ? `oklch(0.78 0.13 ${hue})` : `oklch(0.47 0.2 ${hue})`,
    "--accent-soft": dark ? `oklch(0.7 0.165 ${hue} / 0.13)` : `oklch(0.53 0.215 ${hue} / 0.09)`,
    "--accent-line": dark ? `oklch(0.7 0.165 ${hue} / 0.35)` : `oklch(0.53 0.215 ${hue} / 0.28)`,
  } as React.CSSProperties
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-raised">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <span className="mr-auto text-[0.8125rem] font-medium text-fg">Try it: one hue, the whole system follows</span>
        {HUES.map((x) => (
          <button
            key={x.h}
            type="button"
            aria-label={`${x.name} accent`}
            aria-pressed={hue === x.h}
            onClick={() => setHue(x.h)}
            className={cn("size-6 rounded-full border border-black/10 outline-none transition-transform duration-[140ms] ease-hairline hover:scale-110 focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2 focus-visible:ring-offset-surface", hue === x.h && "ring-2 ring-fg ring-offset-2 ring-offset-surface")}
            style={{ background: `oklch(0.6 0.19 ${x.h})` }}
          />
        ))}
        <span className="mx-1 h-5 w-px bg-border" />
        <button type="button" onClick={() => setDark(!dark)} className="h-7 rounded-md border border-border bg-surface px-2 text-xs font-medium text-fg-muted shadow-key hover:text-fg">
          {dark ? "Light" : "Dark"}
        </button>
      </div>
      <div style={vars} className="relative grid gap-6 bg-bg p-6 sm:grid-cols-2 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots [--grid-size:14px] opacity-60" />
        <div className="relative space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="accent">Upgrade plan</Button>
            <Button variant="outline">Invite</Button>
            <Button variant="soft">Share</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone="accent">Beta</StatusBadge>
            <StatusBadge tone="success">Live</StatusBadge>
            <a href="#theming" className="text-[0.8125rem] font-medium text-accent-fg underline decoration-accent-line underline-offset-4">A link, tinted</a>
          </div>
          <label className="flex items-center gap-3 text-[0.8125rem] text-fg">
            <Switch checked={on} onCheckedChange={setOn} /> Weekly digest
          </label>
          <label className="flex items-center gap-3 text-[0.8125rem] text-fg">
            <Checkbox defaultChecked /> Remember this device
          </label>
        </div>
        <div className="relative rounded-xl border border-border bg-surface p-4 shadow-raised">
          <p className="text-[0.8125rem] text-fg-muted">Monthly revenue</p>
          <p className="mt-1 text-2xl font-medium tracking-[-0.025em] tabular-nums text-fg">$84,210</p>
          <div className="mt-4 flex h-20 items-end gap-1.5">
            {[40, 55, 48, 70, 62, 86, 78].map((v, i) => (
              <span key={i} className={cn("flex-1 rounded-t-[4px] transition-colors duration-300", i === 5 ? "bg-accent" : "bg-accent/30")} style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border bg-sunken/50 px-4 py-2.5 font-mono text-[11.5px] text-fg-muted">
        --accent: oklch(0.53 0.215 <span className="text-accent-fg">{hue}</span>);
      </div>
    </div>
  )
}

export default function DocsPage() {
  const pick = (names: string[]) => names.map((n) => COMPONENT_INDEX.find((c) => c.name === n)).filter(Boolean) as typeof COMPONENT_INDEX
  const start = pick(["button", "input", "data-table", "dialog", "chat-thread", "pricing-table"])
  return (
    <DocsShell toc={TOC}>
      <article className="max-w-3xl">
        <section id="introduction" className="scroll-mt-24">
          <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">Getting started</p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.035em] text-fg sm:text-5xl">Get started with MiniDev UI</h1>
          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-fg-muted">
            MiniDev UI is a free collection of {COMPONENT_INDEX.length} React components for the parts of a product people spend their day in: tables,
            forms, billing, settings, dashboards and AI chat. They are built on Tailwind CSS v4 and Base UI, drawn to one design language, and
            shipped as single files you own.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { n: count("ui"), l: "Components", href: "/gallery", icon: PackageIcon },
              { n: count("block"), l: "Page blocks", href: "/gallery/blocks", icon: FileTextIcon },
              { n: count("premium"), l: "Motion pieces", href: "/gallery/premium-motion", icon: TerminalSquareIcon },
            ].map((x) => (
              <Link key={x.l} href={x.href} className="group rounded-xl border border-border bg-surface p-4 shadow-raised outline-none transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                <x.icon className="size-4 text-fg-subtle" />
                <p className="mt-3 text-2xl font-medium tracking-[-0.025em] tabular-nums text-fg">{x.n}</p>
                <p className="flex items-center justify-between text-[0.8125rem] text-fg-muted">{x.l}<ArrowRightIcon className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" /></p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="installation">Installation</DocsH2>
          <p className="text-[0.9375rem] leading-[1.7] text-fg-muted">
            You need React 18 or newer and Tailwind CSS v4. Pick whichever way of adding components you prefer. They all produce the same code.
          </p>
          <Tabbed
            tabs={[
              {
                label: "npm package",
                content: (
                  <div className="space-y-3">
                    <CodeBlock language="bash" code={`npm i ${SITE.npmPackage} @base-ui/react class-variance-authority clsx tailwind-merge lucide-react`} />
                    <p className="text-[0.8125rem] text-fg-muted">In Next.js, let the bundler compile the package:</p>
                    <CodeBlock language="ts" filename="next.config.ts" code={`const nextConfig = {\n  transpilePackages: ["${SITE.npmPackage}"],\n}\n\nexport default nextConfig`} />
                  </div>
                ),
              },
              {
                label: "shadcn CLI",
                content: (
                  <div className="space-y-3">
                    <p className="text-[0.8125rem] text-fg-muted">Every component is a registry item. The CLI copies the file and installs its dependencies.</p>
                    <CodeBlock language="bash" code={`npx shadcn@latest add ${SITE.url}/r/button.json`} />
                  </div>
                ),
              },
              {
                label: "Copy the file",
                content: (
                  <p className="text-[0.9375rem] leading-[1.7] text-fg-muted">
                    Open any component&apos;s docs page, switch to <span className="font-medium text-fg">Code</span>, and paste it into your project. Each file
                    imports only <code className="rounded bg-sunken px-1 font-mono text-[12.5px] text-fg">cn</code> and, where needed, other MiniDev files.
                  </p>
                ),
              },
            ]}
          />
          <p className="text-[0.9375rem] leading-[1.7] text-fg-muted">Then add the tokens to your global stylesheet. If you copy files instead of installing the package, copy <span className="font-mono text-[13px] text-fg">styles.css</span> from any component&apos;s docs page.</p>
          <CodeBlock
            language="css"
            filename="app/globals.css"
            code={`@import "tailwindcss";\n@import "${SITE.npmPackage}/styles.css";\n\n/* Let Tailwind see the classes inside the package */\n@source "../node_modules/${SITE.npmPackage}";`}
          />
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="browse">Browse by category</DocsH2>
          <p className="text-[0.9375rem] leading-[1.7] text-fg-muted">Every component lives in one category hub with install commands, notes and answers to common questions.</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link key={c.id} href={`/components/${c.id}`} className="rounded-lg border border-border bg-surface px-3 py-2 text-[0.8125rem] text-fg shadow-key outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                {c.label}
              </Link>
            ))}
          </div>
          <p className="text-[0.875rem] text-fg-muted">
            New to the stack? Start with the <Link href="/guides/shadcn-custom-registry" className="text-accent-fg underline decoration-accent-line underline-offset-4">custom shadcn registry guide</Link> or build a <Link href="/guides/nextjs-landing-page" className="text-accent-fg underline decoration-accent-line underline-offset-4">landing page in Next.js</Link>.
          </p>
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="usage">Usage</DocsH2>
          <CodeBlock
            language="tsx"
            filename="app/billing/page.tsx"
            code={`import { Button } from "${SITE.npmPackage}/ui/button"\nimport { PlanCard } from "${SITE.npmPackage}/ui/plan-card"\n\nexport default function Billing() {\n  return (\n    <section className="grid gap-4 sm:grid-cols-2">\n      <PlanCard />\n      <Button size="lg">Upgrade to Team</Button>\n    </section>\n  )\n}`}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {start.map((c) => (
              <Link key={c.name} href={`/docs/${c.name}`} className="group flex items-center justify-between rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[0.8125rem] shadow-xs outline-none transition-[border-color] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent">
                <span className="font-medium text-fg">{c.title.replace(/([a-z])([A-Z])/g, "$1 $2")}</span>
                <ArrowRightIcon className="size-3.5 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="theming">Theming</DocsH2>
          <p className="text-[0.9375rem] leading-[1.7] text-fg-muted">
            Components never reference a colour directly. They speak in semantic tokens like <code className="rounded bg-sunken px-1 font-mono text-[12.5px] text-fg">surface</code>,{" "}
            <code className="rounded bg-sunken px-1 font-mono text-[12.5px] text-fg">fg-muted</code> and <code className="rounded bg-sunken px-1 font-mono text-[12.5px] text-fg">accent</code>, defined once in CSS.
            Change a variable and everything that uses it updates, with no rebuild.
          </p>
          <ThemeLab />
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="dark-mode">Dark mode</DocsH2>
          <p className="text-[0.9375rem] leading-[1.7] text-fg-muted">
            Dark mode is the <code className="rounded bg-sunken px-1 font-mono text-[12.5px] text-fg">dark</code> class on the root element. Tokens are redefined, components are not.
            To avoid a flash on load, set the class before first paint:
          </p>
          <CodeBlock
            language="tsx"
            filename="app/layout.tsx"
            code={`<html lang="en" suppressHydrationWarning>\n  <head>\n    <script dangerouslySetInnerHTML={{ __html: \`(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()\` }} />\n  </head>\n  <body>{children}</body>\n</html>`}
          />
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="ai">For AI agents</DocsH2>
          <div className="flex gap-4 rounded-2xl border border-border bg-surface p-5 shadow-raised">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent-line bg-accent-soft text-accent-fg">
              <BotIcon className="size-5" />
            </span>
            <div className="space-y-2 text-[0.9375rem] leading-[1.7] text-fg-muted">
              <p>
                Give your coding agent <a className="font-mono text-[13px] text-accent-fg underline decoration-accent-line underline-offset-4" href="/llms.txt">/llms.txt</a> for the rules and{" "}
                <a className="font-mono text-[13px] text-accent-fg underline decoration-accent-line underline-offset-4" href="/llms-full.txt">/llms-full.txt</a> for every component and its import.
              </p>
              <p>
                The machine-readable registry lives at <a className="font-mono text-[13px] text-accent-fg underline decoration-accent-line underline-offset-4" href="/r/registry.json">/r/registry.json</a>, one JSON file per component under <span className="font-mono text-[13px] text-fg">/r</span>.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-5">
          <DocsH2 id="principles">Principles</DocsH2>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {[
              ["Hairline structure", "1px lines and a top highlight draw every surface. Blur shadows are reserved for overlays."],
              ["Tokens, not hex", "Semantic OKLCH tokens only. The same file works in any brand and both themes."],
              ["Every state, designed", "Hover, focus, pressed, busy, invalid and disabled are drawn, and none of them shift layout."],
              ["Accessible by default", "Behaviour comes from Base UI: focus management, keyboard support and ARIA are handled."],
            ].map(([t, d]) => (
              <div key={t} className="bg-surface p-5">
                <dt className="text-[0.9375rem] font-medium text-fg">{t}</dt>
                <dd className="mt-1.5 text-[0.8125rem] leading-[1.6] text-fg-muted">{d}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button render={<Link href="/gallery" />}>Browse components <ArrowRightIcon /></Button>
            <Button variant="outline" render={<Link href="/docs/button" />}>Read the Button docs</Button>
          </div>
        </section>
      </article>
    </DocsShell>
  )
}
