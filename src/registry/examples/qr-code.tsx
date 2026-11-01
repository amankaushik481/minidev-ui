import { WifiIcon } from "lucide-react"
import { QrCode } from "@/registry/ui/qr-code"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "With a logo",
    description: "Level H clears a well in the middle for whatever you pass as children; the code still scans because 30 percent of it is redundant.",
    code: `<QrCode value="https://lumen.app/pay/INV-2041" level="H" caption="Pay invoice INV-2041" fileName="inv-2041-qr.svg">
  <span className="grid size-full place-items-center rounded-md bg-ink text-sm font-semibold text-on-ink">L</span>
</QrCode>`,
    node: (
      <QrCode value="https://lumen.app/pay/INV-2041" level="H" caption="Pay invoice INV-2041" fileName="inv-2041-qr.svg">
        <span className="grid size-full place-items-center rounded-md bg-ink text-sm font-semibold text-on-ink">L</span>
      </QrCode>
    ),
  },
  {
    title: "Error correction levels",
    description: "L to H trade density for damage tolerance; the same URL needs more modules at each step.",
    code: `<QrCode value="https://ui.minidev.pro" level="L" size={112} caption="Level L, 7%" download={false} />
<QrCode value="https://ui.minidev.pro" level="M" size={112} caption="Level M, 15%" download={false} />
<QrCode value="https://ui.minidev.pro" level="Q" size={112} caption="Level Q, 25%" download={false} />
<QrCode value="https://ui.minidev.pro" level="H" size={112} caption="Level H, 30%" download={false} />`,
    node: (
      <div className="flex flex-wrap items-start justify-center gap-4">
        <QrCode value="https://ui.minidev.pro" level="L" size={112} caption="Level L, 7%" download={false} />
        <QrCode value="https://ui.minidev.pro" level="M" size={112} caption="Level M, 15%" download={false} />
        <QrCode value="https://ui.minidev.pro" level="Q" size={112} caption="Level Q, 25%" download={false} />
        <QrCode value="https://ui.minidev.pro" level="H" size={112} caption="Level H, 30%" download={false} />
      </div>
    ),
  },
  {
    title: "Bare in your own card",
    description: "bare drops the card, caption and button so the SVG can sit in a layout of yours, here a guest Wi-Fi string phones join on scan.",
    code: `<div className="flex items-center gap-5 rounded-xl border border-border bg-surface p-4 shadow-raised">
  <QrCode bare size={112} value="WIFI:T:WPA;S:Northwind Guest;P:welcome-2026;;" title="Join the Northwind Guest network" />
  <div className="min-w-0">
    <p className="flex items-center gap-1.5 text-sm font-medium text-fg"><WifiIcon className="size-4 text-fg-muted" /> Northwind Guest</p>
    <p className="mt-1 text-xs text-fg-muted">Scan with your phone camera to join. No password to type.</p>
    <p className="mt-2 font-mono text-xs text-fg-subtle">WPA2 · 2.4 and 5 GHz</p>
  </div>
</div>`,
    node: (
      <div className="flex items-center gap-5 rounded-xl border border-border bg-surface p-4 shadow-raised">
        <QrCode bare size={112} value="WIFI:T:WPA;S:Northwind Guest;P:welcome-2026;;" title="Join the Northwind Guest network" />
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-medium text-fg"><WifiIcon className="size-4 text-fg-muted" /> Northwind Guest</p>
          <p className="mt-1 text-xs text-fg-muted">Scan with your phone camera to join. No password to type.</p>
          <p className="mt-2 font-mono text-xs text-fg-subtle">WPA2 · 2.4 and 5 GHz</p>
        </div>
      </div>
    ),
  },
]
