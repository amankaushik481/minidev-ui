"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function MaskedGradientHeadline({
  children = "Details that make it feel inevitable.",
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.h2
      data-slot="masked-gradient-headline"
      data-tier="premium"
      initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "text-4xl font-medium tracking-[-0.030em] sm:text-5xl",
        "bg-[linear-gradient(100deg,var(--fg)_0%,var(--accent)_60%,var(--accent-2)_100%)]",
        "bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </motion.h2>
  )
}
export { MaskedGradientHeadline }
