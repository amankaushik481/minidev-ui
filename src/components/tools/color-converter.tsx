"use client"
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Textarea } from "@/registry/ui/textarea"
import { fmtHsl, fmtOklch, fmtRgb, inGamut, oklchToHex, parseColor } from "@/lib/color"

function Copy({ text }: { text: string }) {
  const [ok, setOk] = React.useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text) } catch {}
        setOk(true)
        setTimeout(() => setOk(false), 1000)
      }}
      className="group inline-flex max-w-full items-center gap-1.5 rounded-md px-1.5 py-0.5 text-left font-mono text-[12px] text-fg outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`Copy ${text}`}
    >
      <span className="truncate">{text}</span>
      {ok ? <CheckIcon className="size-3 shrink-0 text-success" /> : <CopyIcon className="size-3 shrink-0 opacity-0 group-hover:opacity-60" />}
    </button>
  )
}

export function ColorConverter() {
  const [input, setInput] = React.useState("#6D5BFF\nrgb(22 179 100)\nhsl(24 95% 60%)\noklch(0.55 0.1 195)\n#0F172A")
  const rows = input
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 40)
    .map((s) => ({ s, o: parseColor(s) }))
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
        <label htmlFor="cc-in" className="text-[13px] font-medium text-fg">Colors, one per line (hex, rgb, hsl or oklch)</label>
        <Textarea id="cc-in" value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="mt-2 font-mono text-[13px]" spellCheck={false} />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-raised">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead className="bg-sunken text-fg">
            <tr>
              {["", "Input", "OKLCH", "Hex", "RGB", "HSL", "Tailwind v4"].map((h) => (
                <th key={h} scope="col" className="px-3 py-2.5 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ s, o }, i) =>
              o ? (
                <tr key={i} className="border-t border-border">
                  <td className="px-3 py-2"><span className="block size-7 rounded-md border border-border" style={{ background: oklchToHex(o) }} /></td>
                  <td className="max-w-[160px] truncate px-3 py-2 font-mono text-[12px] text-fg-muted">{s}</td>
                  <td className="px-1 py-2">
                    <Copy text={fmtOklch(o)} />
                    {!inGamut(o) ? <span className="ml-1.5 text-[11px] text-warning">outside sRGB</span> : null}
                  </td>
                  <td className="px-1 py-2"><Copy text={oklchToHex(o)} /></td>
                  <td className="px-1 py-2"><Copy text={fmtRgb(o)} /></td>
                  <td className="px-1 py-2"><Copy text={fmtHsl(o)} /></td>
                  <td className="px-1 py-2"><Copy text={`bg-[${fmtOklch(o).replace(/ /g, "_")}]`} /></td>
                </tr>
              ) : (
                <tr key={i} className="border-t border-border">
                  <td />
                  <td className="px-3 py-2 font-mono text-[12px] text-fg-muted">{s}</td>
                  <td colSpan={5} className="px-3 py-2 text-[12px] text-danger">Not a color this tool understands</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
