"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function MaskedGradientHeadline({
  children = "Premium moments, free primitives.",
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
        "bg-[linear-gradient(100deg,oklch(0.22_0.03_250)_0%,oklch(0.32_0.15_285)_55%,oklch(0.26_0.10_300)_100%)]",
        "bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </motion.h2>
  )
}
export { MaskedGradientHeadline }
