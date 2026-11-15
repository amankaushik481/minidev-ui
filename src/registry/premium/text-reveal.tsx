"use client"
import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A paragraph that lights up word by word, from muted to full ink, as it scrolls through the viewport.
 * The words are real text in order, so search engines and screen readers
 * read it normally. Reduced motion renders the paragraph at full ink.
 *
 * Use it for one manifesto or mission paragraph on a long page. Reach for
 * MaskedGradientHeadline for a headline wipe, and BlurFade or ScrollReveal to
 * bring whole blocks in.
 *
 * @example
 * <TextReveal text="Lumen closes the books so your team can open the next quarter." />
 */
type TextRevealProps = {
  text?: string
  className?: string
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  // The space sits outside the inline-block so copied text gets a normal space and lines can wrap there.
  return (
    <>
      <motion.span style={{ opacity }} className="inline-block">
        {word}
      </motion.span>{" "}
    </>
  )
}

function TextReveal({
  text = "Most interfaces are assembled. The good ones are drawn: every border, shadow and word placed on purpose, so the product feels calm even when the work is hard.",
  className,
}: TextRevealProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] })
  const words = text.split(" ")
  return (
    <p ref={ref} data-slot="text-reveal" className={cn("max-w-2xl text-2xl leading-[1.35] font-medium tracking-[-0.03em] text-fg sm:text-3xl", className)}>
      {reduce
        ? text
        : words.map((w, i) => <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}
    </p>
  )
}

export { TextReveal }
export type { TextRevealProps }
