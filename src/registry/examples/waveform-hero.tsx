"use client"
import { WaveformHero } from "@/registry/premium/waveform-hero"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Voice product",
    description: "The bars are decoration for audio and call products; the title renders as an h2.",
    code: `<WaveformHero
  className="w-full"
  title="Every supplier call, logged"
  description="Lumen transcribes calls with suppliers and pulls out every promise to pay, with the date and amount."
  cta="Try it on a call"
/>`,
    node: (
      <WaveformHero
        className="w-full"
        title="Every supplier call, logged"
        description="Lumen transcribes calls with suppliers and pulls out every promise to pay, with the date and amount."
        cta="Try it on a call"
      />
    ),
  },
  {
    title: "Section divider without a CTA",
    description: "cta={null} hides the button and fewer bars make a quieter strip between two content sections.",
    code: `<WaveformHero
  className="w-full"
  title="Listen back to any meeting"
  description="Recordings are kept for 90 days and searchable by speaker."
  cta={null}
  bars={28}
/>`,
    node: (
      <WaveformHero
        className="w-full"
        title="Listen back to any meeting"
        description="Recordings are kept for 90 days and searchable by speaker."
        cta={null}
        bars={28}
      />
    ),
  },
]
