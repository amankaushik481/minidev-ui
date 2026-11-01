import { PinScrollGallery } from "@/registry/premium/pin-scroll-gallery"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Shorter scroll run",
    description: "The height is the distance you scroll to move through the three frames; 150vh is a brisk pass, the default 220vh is leisurely.",
    code: `<PinScrollGallery className="h-[150vh] w-full" />`,
    node: <PinScrollGallery className="h-[150vh] w-full" />,
  },
  {
    title: "With a section header",
    description: "Put the eyebrow and title above the gallery; they scroll away as the frames pin and slide.",
    code: `<section className="w-full">
  <div className="mb-8 max-w-xl">
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">How it works</p>
    <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">Three steps from draft to published</h2>
  </div>
  <PinScrollGallery className="h-[160vh]" />
</section>`,
    node: (
      <section className="w-full">
        <div className="mb-8 max-w-xl">
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">How it works</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">Three steps from draft to published</h2>
        </div>
        <PinScrollGallery className="h-[160vh]" />
      </section>
    ),
  },
]
