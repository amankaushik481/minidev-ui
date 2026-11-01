import { TypingText } from "@/registry/premium/typing-text"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom phrases",
    description: "phrases are typed, held, deleted and replaced in order; the loop restarts after the last one.",
    code: `<TypingText phrases={["Send the invoice.", "Chase it for you.", "Close the books."]} />`,
    node: <TypingText phrases={["Send the invoice.", "Chase it for you.", "Close the books."]} />,
  },
  {
    title: "Type once",
    description: "loop={false} types the last phrase and leaves it with the caret blinking; speed is milliseconds per character.",
    code: `<TypingText phrases={["Welcome back, Maya."]} loop={false} speed={40} />`,
    node: <TypingText phrases={["Welcome back, Maya."]} loop={false} speed={40} />,
  },
  {
    title: "Inside a headline",
    description: "Set the static words beside it and colour the typed slot with className; hold keeps each finished phrase on screen.",
    code: `<h2 className="flex flex-wrap items-baseline justify-center gap-x-2 text-3xl font-medium tracking-[-0.04em] text-fg sm:text-4xl">
  <span>Lumen is for</span>
  <TypingText phrases={["agencies", "consultants", "studios", "freelancers"]} speed={70} hold={1800} className="text-accent-fg" />
</h2>`,
    node: (
      <h2 className="flex flex-wrap items-baseline justify-center gap-x-2 text-3xl font-medium tracking-[-0.04em] text-fg sm:text-4xl">
        <span>Lumen is for</span>
        <TypingText phrases={["agencies", "consultants", "studios", "freelancers"]} speed={70} hold={1800} className="text-accent-fg" />
      </h2>
    ),
  },
]
