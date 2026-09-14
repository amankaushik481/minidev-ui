"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function ScrollReveal({
  children,
  className,
  y = 18,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  y?: number
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      data-slot="scroll-reveal"
      data-tier="premium"
      initial={reduce ? false : { y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
export { ScrollReveal }
