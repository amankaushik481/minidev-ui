"use client"
import * as React from "react"
import { ScratchToReveal } from "@/registry/premium/scratch-to-reveal"
import type { Example } from "./types"

function ProgressDemo() {
  const [percent, setPercent] = React.useState(0)
  const [done, setDone] = React.useState(false)
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <ScratchToReveal threshold={40} onProgress={setPercent} onComplete={() => setDone(true)}>
        <div className="flex flex-col items-center gap-1 px-4 py-8 text-center">
          <p className="text-2xl font-medium tracking-[-0.018em] text-fg">A free month of Lumen Pro</p>
          <p className="text-xs text-fg-muted">Applied to your next invoice.</p>
        </div>
      </ScratchToReveal>
      <p className="text-xs text-fg-muted tabular-nums">{done ? "Revealed. The month is on your account." : `${percent}% scratched, clears at 40%`}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Your own prize",
    description: "Children are what the foil hides; gradient takes any CSS colours or tokens and label is the hint printed on top.",
    code: `<ScratchToReveal gradient={["var(--info)", "var(--chart-2)"]} label="Rub to see your seat">
  <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
    <span className="text-[11px] font-medium tracking-[0.08em] text-fg-subtle uppercase">Lumen Conf 2026</span>
    <p className="text-2xl font-medium tracking-[-0.018em] text-fg">Row C, seat 14</p>
    <p className="text-xs text-fg-muted">Doors open at 9:00, main stage.</p>
  </div>
</ScratchToReveal>`,
    node: (
      <ScratchToReveal gradient={["var(--info)", "var(--chart-2)"]} label="Rub to see your seat">
        <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
          <span className="text-[11px] font-medium tracking-[0.08em] text-fg-subtle uppercase">Lumen Conf 2026</span>
          <p className="text-2xl font-medium tracking-[-0.018em] text-fg">Row C, seat 14</p>
          <p className="text-xs text-fg-muted">Doors open at 9:00, main stage.</p>
        </div>
      </ScratchToReveal>
    ),
  },
  {
    title: "Progress and completion",
    description: "onProgress reports the scratched percent as it changes and onComplete fires once, when the rest of the foil clears itself.",
    code: `function ProgressDemo() {
  const [percent, setPercent] = React.useState(0)
  const [done, setDone] = React.useState(false)
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <ScratchToReveal threshold={40} onProgress={setPercent} onComplete={() => setDone(true)}>
        <div className="flex flex-col items-center gap-1 px-4 py-8 text-center">
          <p className="text-2xl font-medium tracking-[-0.018em] text-fg">A free month of Lumen Pro</p>
          <p className="text-xs text-fg-muted">Applied to your next invoice.</p>
        </div>
      </ScratchToReveal>
      <p className="text-xs text-fg-muted tabular-nums">{done ? "Revealed. The month is on your account." : \`\${percent}% scratched, clears at 40%\`}</p>
    </div>
  )
}`,
    node: <ProgressDemo />,
  },
  {
    title: "Big brush, low threshold",
    description: "A wide brush and a 30 percent threshold make one or two swipes enough, for a card that should not feel like work.",
    code: `<ScratchToReveal brush={40} threshold={30} label="One swipe does it" className="max-w-xs" />`,
    node: <ScratchToReveal brush={40} threshold={30} label="One swipe does it" className="max-w-xs" />,
  },
]
