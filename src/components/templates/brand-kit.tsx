"use client"
import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CopyIcon, DownloadIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Switch } from "@/registry/ui/switch"
import { StatusBadge } from "@/registry/ui/status-badge"
import type { Brand } from "@/components/templates/brands"

/*
 * BrandKit: a complete, living brand guideline for any brand config.
 * Colours are sampled from the real tokens, so the kit can never drift
 * from the product. Everything copies with a click; the tokens download.
 */

function toHex(color: string) {
  try {
    const c = document.createElement("canvas")
    c.width = c.height = 1
    const x = c.getContext("2d")!
    x.fillStyle = color
    x.fillRect(0, 0, 1, 1)
    const [r, g, b] = x.getImageData(0, 0, 1, 1).data
    return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase()
  } catch {
    return ""
  }
}

function useTokens(ref: React.RefObject<HTMLElement | null>, tokens: string[], refresh?: string) {
  const [vals, setVals] = React.useState<Record<string, { raw: string; hex: string }>>({})
  React.useEffect(() => {
    const read = () => {
      const el = ref.current
      if (!el) return
      const cs = getComputedStyle(el)
      const out: Record<string, { raw: string; hex: string }> = {}
      tokens.forEach((t) => {
        const raw = cs.getPropertyValue(t).trim()
        out[t] = { raw, hex: toHex(raw) }
      })
      setVals(out)
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-material"] })
    return () => mo.disconnect()
  }, [ref, tokens.join(), refresh]) // eslint-disable-line react-hooks/exhaustive-deps
  return vals
}

function Copy({ text, children, className }: { text: string; children: React.ReactNode; className?: string }) {
  const [ok, setOk] = React.useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text) } catch {}
        setOk(true)
        setTimeout(() => setOk(false), 1200)
      }}
      className={cn("group/copy inline-flex items-center gap-1.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent", className)}
      aria-label={`Copy ${text}`}
    >
      {children}
      {ok ? <CheckIcon className="size-3.5 text-success" /> : <CopyIcon className="size-3.5 opacity-0 transition-opacity group-hover/copy:opacity-60" />}
    </button>
  )
}

function Section({ n, title, lead, children, id }: { n: string; title: string; lead?: string; children: React.ReactNode; id?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.section
      id={id}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
      className="grid gap-10 border-t border-border py-20 lg:grid-cols-[280px_1fr]"
    >
      <div>
        <p className="font-mono text-[12px] text-accent-fg">{n}</p>
        <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] text-fg">{title}</h2>
        {lead ? <p className="mt-3 max-w-xs text-[14px] leading-[1.6] text-fg-muted">{lead}</p> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </motion.section>
  )
}

function Applications({ brand }: { brand: Brand }) {
  const host = `${brand.slug}.com`
  return (
    <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
      {/* stationery */}
      <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-3xl border border-border bg-sunken p-8">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-40 [--grid-size:32px]" />
        <div className="relative h-[240px] w-[min(100%,420px)]">
          <div className="absolute top-0 right-0 aspect-[1.75] w-[78%] rotate-[7deg] rounded-xl bg-accent shadow-overlay transition-transform duration-500 hover:rotate-[3deg]">
            <span className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2">{brand.mark}</span>
          </div>
          <div className="absolute bottom-0 left-0 flex aspect-[1.75] w-[78%] -rotate-[4deg] flex-col justify-between rounded-xl border border-border bg-raised p-5 shadow-overlay transition-transform duration-500 hover:-rotate-[1deg]">
            <span className="flex items-center gap-2 text-lg text-fg">
              <span className="size-6">{brand.mark}</span>
              <span style={{ fontFamily: brand.display.css }}>{brand.wordmark}</span>
            </span>
            <div>
              <p className="text-[14px] font-medium text-fg">Sam Rivera</p>
              <p className="text-[11.5px] text-fg-muted">Founder</p>
              <p className="mt-2 font-mono text-[10.5px] text-fg-muted">sam@{host}</p>
            </div>
          </div>
        </div>
        <p className="absolute bottom-4 left-5 text-[12px] text-fg-muted">Business card · 85 × 48 mm</p>
      </div>

      {/* phone home screen */}
      <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-3xl border border-border bg-[radial-gradient(120%_80%_at_50%_0%,var(--accent),var(--accent-2)_60%,var(--ink))] p-8">
        <div className="relative w-[210px] rounded-[38px] bg-[oklch(0.17_0.006_260)] p-2 shadow-[0_30px_60px_-20px_oklch(0_0_0/0.6)]">
          <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(160deg,var(--accent),var(--accent-2))] px-4 pt-9 pb-6">
            <span className="absolute top-2 left-1/2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
            <p className="text-center text-[34px] leading-none font-light text-white/95 tabular-nums">9:41</p>
            <p className="mt-1 text-center text-[10px] text-white/75">Tuesday 14 October</p>
            <div className="mt-6 grid grid-cols-4 gap-x-2.5 gap-y-3">
              {Array.from({ length: 12 }).map((_, i) =>
                i === 5 ? (
                  <div key={i} className="text-center">
                    <span className="mx-auto block size-9 shadow-[0_6px_14px_-4px_oklch(0_0_0/0.5)] ring-2 ring-white/80 [border-radius:22%]">{brand.mark}</span>
                    <span className="mt-1 block truncate text-[8.5px] font-medium text-white">{brand.name}</span>
                  </div>
                ) : (
                  <div key={i} className="text-center">
                    <span className="mx-auto block size-9 rounded-[22%] bg-white/25 backdrop-blur-sm" />
                    <span className="mx-auto mt-1.5 block h-1 w-6 rounded-full bg-white/35" />
                  </div>
                ),
              )}
            </div>
            <div className="mt-6 flex justify-around rounded-2xl bg-white/20 p-2 backdrop-blur-sm">
              {[0, 1, 2, 3].map((i) => <span key={i} className="size-8 rounded-[22%] bg-white/35" />)}
            </div>
          </div>
        </div>
        <p className="absolute bottom-4 left-5 text-[12px] text-white/80">App icon · 1024 px master</p>
      </div>

      {/* share card */}
      <div className="lg:col-span-2">
        <div className="relative aspect-[1200/630] overflow-hidden rounded-3xl bg-[oklch(0.16_0.01_270)] text-white shadow-overlay">
          <div aria-hidden className="absolute -right-[10%] -bottom-[40%] size-[70%] rounded-full bg-accent opacity-80 blur-[80px]" />
          <div aria-hidden className="absolute right-[18%] -bottom-[30%] size-[40%] rounded-full bg-accent-2 opacity-60 blur-[70px]" />
          <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.07] [--grid-size:48px]" />
          <div className="relative flex h-full flex-col justify-between p-[5%]">
            <span className="flex items-center gap-3 text-[clamp(16px,2.4vw,30px)]">
              <span className="size-[1.6em]">{brand.mark}</span>
              <span style={{ fontFamily: brand.display.css }}>{brand.wordmark}</span>
            </span>
            <p className="max-w-[80%] text-[clamp(28px,5.2vw,72px)] leading-[0.98] tracking-[-0.045em]" style={{ fontFamily: brand.display.css }}>
              {brand.tagline}
            </p>
            <p className="font-mono text-[clamp(10px,1.1vw,14px)] text-white/60">{host} · {brand.kind}</p>
          </div>
        </div>
        <p className="mt-2 text-[12px] text-fg-muted">Social share card · 1200 × 630</p>
      </div>
    </div>
  )
}

export function BrandKit({ brand, back, refresh, embedded }: { brand: Brand; back: { href: string; label: string }; /** Change to re-read tokens after the parent restyles. */ refresh?: string; /** Inside another page: the wordmark becomes an h2. */ embedded?: boolean }) {
  const Title = embedded ? "h2" : "h1"
  const ref = React.useRef<HTMLDivElement>(null)
  const extra = ["--success", "--warning", "--danger", "--info", "--on-accent", "--border", "--fg"]
  const vals = useTokens(ref, [...brand.palette.map((p) => p.token), ...extra], refresh)
  React.useEffect(() => {
    const el = document.documentElement
    const prev = el.getAttribute("data-material")
    el.setAttribute("data-material", brand.material)
    return () => {
      if (prev) el.setAttribute("data-material", prev)
    }
  }, [brand.material])

  const css = `/* ${brand.name} brand tokens, generated by MiniDev UI */\n:root {\n${[...brand.palette.map((p) => p.token), ...extra]
    .map((t) => `  ${t}: ${vals[t]?.raw || "…"}; /* ${vals[t]?.hex || ""} */`)
    .join("\n")}\n}\n/* material: ${brand.material} · display: ${brand.display.family} · text: ${brand.text.family} */\n`
  const download = () => {
    const blob = new Blob([css], { type: "text/css" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `${brand.slug}-tokens.css`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div ref={ref} className={cn(brand.className, "min-h-full bg-bg text-fg")}>
      {/* cover */}
      <header className="relative isolate overflow-hidden">
        <div aria-hidden className="light-spot absolute inset-0 -z-10" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-6 sm:px-6 lg:px-8">
          <Link href={back.href} className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-fg-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
            <ArrowLeftIcon className="size-4" /> {back.label}
          </Link>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={download}>
              <DownloadIcon /> Tokens
            </Button>
            <Button size="sm" render={<Link href="/studio" />}>
              Get a brand like this
            </Button>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl items-end gap-12 px-4 pt-20 pb-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8 lg:pt-28">
          <div>
            <p className="font-mono text-[12px] tracking-[0.14em] text-fg-muted uppercase">Brand kit · v1.0 · {brand.kind}</p>
            <Title className="mt-5 text-[4rem] leading-[0.9] text-fg sm:text-[7rem] lg:text-[9rem]" style={{ fontFamily: brand.display.css, letterSpacing: "-0.05em" }}>
              {brand.wordmark}
            </Title>
            <p className="mt-6 max-w-xl text-xl leading-[1.5] text-fg-muted">{brand.tagline}</p>
          </div>
          <div className="size-28 shadow-overlay [border-radius:22%] sm:size-52" style={{ transform: "rotate(-6deg) translate3d(calc(var(--sx) * -6px), calc(var(--sy) * -6px), 0)" }}>
            {brand.mark}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Section n="01" title="Logo" lead="The mark and wordmark always travel together at hero sizes. Below 24px, use the mark alone.">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { bg: "bg-bg border border-border", fg: "text-fg", label: "On canvas" },
              { bg: "bg-ink", fg: "text-on-ink", label: "On ink" },
              { bg: "bg-accent", fg: "", label: "On accent" },
            ].map((v) => (
              <figure key={v.label}>
                <div
                  className={cn("grid aspect-[16/9] place-items-center rounded-3xl shadow-raised [container-type:inline-size] md:aspect-[4/3]", v.bg)}
                  style={v.label === "On accent" && vals["--accent"]?.raw ? ({ "--accent": vals["--on-accent"]?.raw, "--on-accent": vals["--accent"]?.raw, background: vals["--accent"]?.raw, color: vals["--on-accent"]?.raw } as React.CSSProperties) : undefined}
                >
                  <span className={cn("flex max-w-[88%] items-center gap-[0.35em] whitespace-nowrap", v.fg)} style={{ fontSize: "min(2.25rem, 9cqw)" }}>
                    <span className="size-[1.35em] shrink-0">{brand.mark}</span>
                    <span style={{ fontFamily: brand.display.css }}>{brand.wordmark}</span>
                  </span>
                </div>
                <figcaption className="mt-2 text-[12.5px] text-fg-muted">{v.label}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <div className="relative grid aspect-[16/9] place-items-center overflow-hidden rounded-3xl border border-border bg-surface bg-grid [--grid-size:24px]">
              <div className="relative p-10">
                <span aria-hidden className="absolute inset-0 border border-dashed border-accent" />
                {["top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2", "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"].map((pos) => (
                  <span key={pos} className={cn("absolute rounded bg-accent px-1.5 font-mono text-[10px] text-on-accent", pos)}>x</span>
                ))}
                <span className="flex items-center gap-3 text-4xl text-fg">
                  <span className="size-12">{brand.mark}</span>
                  <span style={{ fontFamily: brand.display.css }}>{brand.wordmark}</span>
                </span>
              </div>
              <p className="absolute bottom-3 left-4 text-[12px] text-fg-muted">Clear space: x = the height of the mark</p>
            </div>
            <div className="grid grid-cols-3 items-end gap-4 rounded-3xl border border-border bg-surface p-6">
              {[64, 32, 16].map((s) => (
                <div key={s} className="text-center">
                  <span className="mx-auto block" style={{ width: s, height: s }}>{brand.mark}</span>
                  <p className="mt-3 font-mono text-[11px] text-fg-muted">{s}px</p>
                </div>
              ))}
              <p className="col-span-3 text-[12px] text-fg-muted">16px is the minimum. Never stretch, recolour or outline the mark.</p>
            </div>
          </div>
        </Section>

        <Section n="02" title="Colour" lead="Sampled live from the product's tokens. Click any value to copy it.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {brand.palette.map((p, i) => (
              <div key={p.token} className={cn("flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-raised", i === 0 && "sm:col-span-2 lg:col-span-1 lg:row-span-3")}>
                <div className={cn("relative", i === 0 ? "h-64 lg:h-auto lg:flex-1" : "h-24")} style={{ background: `var(${p.token})` }}>
                  {i === 0 ? (
                    <>
                      <span className="absolute top-5 left-5 font-mono text-[11px] tracking-[0.1em] uppercase opacity-70" style={{ color: "var(--on-accent)" }}>Primary</span>
                      <span className="absolute bottom-4 left-5 text-7xl font-medium tracking-[-0.05em]" style={{ color: "var(--on-accent)", fontFamily: brand.display.css }}>Aa</span>
                    </>
                  ) : null}
                </div>
                <div className="p-4">
                  <p className="text-[15px] font-medium text-fg">{p.name}</p>
                  <p className="mt-0.5 text-[12.5px] leading-[1.5] text-fg-muted">{p.role}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11.5px] text-fg">
                    <Copy text={vals[p.token]?.hex || ""}>{vals[p.token]?.hex || "…"}</Copy>
                    <Copy text={`var(${p.token})`} className="text-fg-muted">{p.token}</Copy>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col justify-between rounded-3xl border border-dashed border-border-strong p-4">
              <div>
                <p className="text-[15px] font-medium text-fg">Proportion</p>
                <p className="mt-0.5 text-[12.5px] leading-[1.5] text-fg-muted">How much of each colour a typical screen uses.</p>
              </div>
              <div>
                <div className="mt-4 flex h-9 gap-1">
                  <span className="flex-[60] rounded-l-lg border border-border bg-bg" />
                  <span className="flex-[30] border border-border bg-surface" />
                  <span className="flex-[7] bg-ink" />
                  <span className="flex-[3] min-w-2 rounded-r-lg bg-accent" />
                </div>
                <p className="mt-2 font-mono text-[11px] text-fg-muted">60 · 30 · 7 · 3</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["--success", "Success"],
              ["--warning", "Warning"],
              ["--danger", "Danger"],
              ["--info", "Info"],
            ].map(([t, n]) => (
              <div key={t} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
                <span className="size-9 rounded-xl" style={{ background: `var(${t})` }} />
                <div>
                  <p className="text-[13px] font-medium text-fg">{n}</p>
                  <Copy text={vals[t]?.hex || ""} className="font-mono text-[11px] text-fg-muted">{vals[t]?.hex || "…"}</Copy>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section n="03" title="Typography" lead={`${brand.display.family} for display, ${brand.text.family} for text. Tracking tightens as size grows.`}>
          <div className="overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-raised">
            <div className="flex items-end justify-between gap-6">
              <p className="text-[9rem] leading-[0.8] text-fg sm:text-[12rem]" style={{ fontFamily: brand.display.css, letterSpacing: "-0.05em" }}>Aa</p>
              <div className="pb-4 text-right">
                <p className="text-lg font-medium text-fg">{brand.display.family}</p>
                <p className="mt-1 font-mono text-[11.5px] text-fg-muted">Display · 400 to 600</p>
              </div>
            </div>
            <p className="mt-6 text-[13px] break-all text-fg-muted" style={{ fontFamily: brand.display.css }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 &amp;@£$₹€%?!
            </p>
          </div>
          <div className="mt-4 divide-y divide-border rounded-3xl border border-border bg-surface">
            {[
              ["Display", "72 / 72 · -0.05em", "text-[3.2rem] leading-[1] sm:text-7xl", brand.display.sample, brand.display.css],
              ["Heading", "40 / 44 · -0.04em", "text-4xl leading-[1.1]", brand.tagline, brand.display.css],
              ["Body", "17 / 28 · 0", "text-[17px] leading-[1.65] text-fg-muted", "Clear sentences, one idea each. Numbers in tabular figures. No exclamation marks.", "inherit"],
              ["Label", "12 / 16 · +0.08em", "font-mono text-[12px] tracking-[0.08em] uppercase text-fg-muted", "Status · Updated 16:04", "inherit"],
            ].map(([n, spec, cls, txt, fam]) => (
              <div key={n} className="grid items-baseline gap-2 p-6 sm:grid-cols-[140px_1fr]">
                <div>
                  <p className="text-[13px] font-medium text-fg">{n}</p>
                  <p className="font-mono text-[11px] text-fg-muted">{spec}</p>
                </div>
                <p className={cn("text-fg", cls)} style={{ fontFamily: fam, letterSpacing: n === "Display" ? "-0.05em" : n === "Heading" ? "-0.04em" : undefined }}>
                  {txt}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section n="04" title="Voice" lead="How the brand sounds. Read it out loud; if it sounds like a brochure, rewrite it.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-surface p-7 shadow-raised">
              <p className="text-[13px] font-medium text-success">We are</p>
              <ul className="mt-4 space-y-2">
                {brand.voice.are.map((v) => (
                  <li key={v} className="flex items-center gap-3 text-3xl font-medium tracking-[-0.04em] text-fg">
                    <CheckIcon className="size-5 text-success" strokeWidth={3} /> {v}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-surface p-7 shadow-raised">
              <p className="text-[13px] font-medium text-danger">We are not</p>
              <ul className="mt-4 space-y-2">
                {brand.voice.not.map((v) => (
                  <li key={v} className="flex items-center gap-3 text-3xl font-medium tracking-[-0.04em] text-fg-subtle line-through decoration-danger/50 decoration-2">
                    <XIcon className="size-5 text-danger" strokeWidth={3} /> {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <blockquote className="rounded-3xl bg-ink p-7 text-2xl leading-[1.3] tracking-[-0.02em] text-on-ink shadow-ink">&ldquo;{brand.voice.say}&rdquo;<p className="mt-4 font-mono text-[11px] tracking-[0.1em] opacity-60 uppercase">Say it like this</p></blockquote>
            <blockquote className="rounded-3xl border border-dashed border-border-strong p-7 text-2xl leading-[1.3] tracking-[-0.02em] text-fg-subtle"><span className="line-through decoration-danger/60 decoration-1">&ldquo;{brand.voice.never}&rdquo;</span><p className="mt-4 font-mono text-[11px] tracking-[0.1em] text-danger uppercase">Never like this</p></blockquote>
          </div>
        </Section>

        <Section n="05" title="In the product" lead={`Material: ${brand.material}. Every component below is the real kit, in this brand.`}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4 rounded-3xl border border-border bg-surface p-7 shadow-raised">
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <Input placeholder="you@company.com" aria-label="Sample input" />
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone="success">Active</StatusBadge>
                <StatusBadge tone="warning">Pending</StatusBadge>
                <StatusBadge tone="danger">Overdue</StatusBadge>
                <StatusBadge tone="accent">New</StatusBadge>
                <span className="ml-auto flex items-center gap-2 text-[13px] text-fg-muted">
                  Notifications <Switch defaultChecked aria-label="Notifications" />
                </span>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-raised p-7 shadow-overlay">
              <div className="flex items-center gap-3">
                <span className="size-10">{brand.mark}</span>
                <div>
                  <p className="text-[15px] font-medium text-fg">{brand.name}</p>
                  <p className="text-[12.5px] text-fg-muted">{brand.kind}</p>
                </div>
              </div>
              <p className="mt-5 text-2xl leading-[1.2] tracking-[-0.03em] text-fg" style={{ fontFamily: brand.display.css }}>
                {brand.tagline}
              </p>
              <Button className="mt-6 w-full" variant="accent">
                Get started <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </Section>

        <Section n="06" title="Out in the world" lead="The same system on the things people actually touch: a card, a phone, a link someone shares.">
          <Applications brand={brand} />
        </Section>

        <Section n="07" title="Take it with you" lead="The tokens as CSS variables, ready to drop into any Tailwind or plain CSS project.">
          <div className="overflow-hidden rounded-3xl border border-border bg-[oklch(0.17_0.01_270)] text-[oklch(0.96_0.005_270)] shadow-ink">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[12px] opacity-80">
              {brand.slug}-tokens.css
              <div className="flex gap-2">
                <Copy text={css} className="rounded-md bg-white/10 px-2.5 py-1 text-[12px]">Copy</Copy>
                <button type="button" onClick={download} className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[12px] outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-accent">
                  <DownloadIcon className="size-3.5" /> Download
                </button>
              </div>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-6 opacity-90">{css}</pre>
          </div>
        </Section>

        <section className="my-20 flex flex-col items-start justify-between gap-6 rounded-[32px] bg-accent p-10 text-on-accent shadow-ink sm:flex-row sm:items-center sm:p-14">
          <div>
            <h2 className="text-4xl leading-[1.02] font-medium tracking-[-0.045em] sm:text-5xl">Want a brand kit like this?</h2>
            <p className="mt-3 max-w-lg text-[16px] opacity-80">MiniDev builds the brand, the product and the site as one system, with a kit like this one at the end.</p>
          </div>
          <Button size="xl" className="bg-on-accent text-accent hover:bg-on-accent/90" render={<Link href="/studio" />}>
            Talk to MiniDev <ArrowRightIcon />
          </Button>
        </section>
      </main>
    </div>
  )
}
