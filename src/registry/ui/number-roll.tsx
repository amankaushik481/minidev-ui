"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/*
 * NumberRoll: an odometer. Each digit is a strip of 0-9 that springs to its
 * place, so changing $1,284 to $1,391 rolls only the digits that changed.
 * Digits keep their identity from the right, so 999 → 1,000 grows a column
 * instead of reshuffling. Screen readers get the plain formatted value.
 */

type NumberRollProps = {
  value?: number
  /** Intl.NumberFormat options, e.g. { style: "currency", currency: "USD" }. */
  format?: Intl.NumberFormatOptions
  locale?: string
  /** Briefly tint up/down changes with success/danger. */
  trend?: boolean
  className?: string
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const SPRING = { type: "spring", stiffness: 260, damping: 28, mass: 0.9 } as const

function Digit({ d, reduce }: { d: number; reduce: boolean | null }) {
  return (
    <span className="relative -my-[0.14em] inline-block py-[0.14em] [mask-image:linear-gradient(transparent,black_0.16em,black_calc(100%_-_0.16em),transparent)]">
      <span className="invisible">0</span>
      <motion.span
        className="absolute inset-x-0 top-[0.14em] flex flex-col"
        initial={false}
        animate={{ y: `${-d * 10}%` }}
        transition={reduce ? { duration: 0 } : SPRING}
      >
        {DIGITS.map((n) => (
          <span key={n} className="block text-center">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function NumberRoll({ value = 1284, format, locale = "en-US", trend, className }: NumberRollProps) {
  const reduce = useReducedMotion()
  const fmt = React.useMemo(() => new Intl.NumberFormat(locale, format), [locale, JSON.stringify(format)]) // eslint-disable-line react-hooks/exhaustive-deps
  const text = fmt.format(value)
  const prev = React.useRef(value)
  const [dir, setDir] = React.useState<0 | 1 | -1>(0)

  React.useEffect(() => {
    if (!trend || value === prev.current) return
    setDir(value > prev.current ? 1 : -1)
    prev.current = value
    const t = setTimeout(() => setDir(0), 900)
    return () => clearTimeout(t)
  }, [value, trend])

  // Key characters from the right so columns keep identity as length changes.
  const chars = text.split("")
  let digitPos = 0
  const keyed = chars
    .map((c, i) => ({ c, i }))
    .reverse()
    .map(({ c, i }) => {
      const isDigit = c >= "0" && c <= "9"
      const key = isDigit ? `d${digitPos++}` : `s${chars.length - i}-${c}`
      return { c, key, isDigit }
    })
    .reverse()

  return (
    <span
      data-slot="number-roll"
      className={cn(
        "relative inline-flex items-baseline tabular-nums transition-colors duration-500 ease-hairline", // craft-check-ignore: slow fade back after a trend flash
        dir === 1 && "text-success duration-[70ms]",
        dir === -1 && "text-danger duration-[70ms]",
        className
      )}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex items-baseline">
        <AnimatePresence initial={false} mode="popLayout">
          {keyed.map(({ c, key, isDigit }) => (
            <motion.span
              key={key}
              layout={reduce ? false : "position"}
              initial={reduce ? false : { opacity: 0, y: "0.35em", filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.35em", filter: "blur(3px)" }}
              transition={reduce ? { duration: 0 } : SPRING}
              className="inline-block"
            >
              {isDigit ? <Digit d={Number(c)} reduce={reduce} /> : <span className="inline-block whitespace-pre">{c}</span>}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    </span>
  )
}

export { NumberRoll }
export type { NumberRollProps }
