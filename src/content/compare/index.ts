import type { Comparison } from "../types"
import shadcn from "./shadcn-ui"
import aceternity from "./aceternity-ui"
import magic from "./magic-ui"
import tailwindPlus from "./tailwind-plus"
import coss from "./coss-ui"
import heroui from "./heroui"
import mantine from "./mantine"
import daisyui from "./daisyui"
import flowbite from "./flowbite"
import chakra from "./chakra-ui"

export const COMPARISONS: Comparison[] = [shadcn, aceternity, magic, tailwindPlus, heroui, mantine, daisyui, flowbite, chakra, coss]

export const comparisonBySlug = (slug: string) => COMPARISONS.find((c) => c.slug === slug)
