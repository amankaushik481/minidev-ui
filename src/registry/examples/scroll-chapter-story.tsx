import { ScrollChapterStory } from "@/registry/premium/scroll-chapter-story"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Narrower column",
    description: "Constrain the width with className and the chapters and the sticky progress bar follow it.",
    code: `<ScrollChapterStory className="w-full max-w-xl" />`,
    node: <ScrollChapterStory className="w-full max-w-xl" />,
  },
  {
    title: "After a section header",
    description: "A title above the story introduces the chapters; the progress bar pins once the header scrolls past.",
    code: `<section className="w-full max-w-2xl">
  <div className="mb-10">
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">The Lumen way</p>
    <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">Plan, build and measure in one place</h2>
  </div>
  <ScrollChapterStory />
</section>`,
    node: (
      <section className="w-full max-w-2xl">
        <div className="mb-10">
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">The Lumen way</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">Plan, build and measure in one place</h2>
        </div>
        <ScrollChapterStory />
      </section>
    ),
  },
]
