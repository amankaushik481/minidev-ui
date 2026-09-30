import type { Guide } from "../types"
import shadcnRegistry from "./shadcn-custom-registry"
import glass from "./glassmorphism-tailwind-css"
import shadows from "./css-shadows-light-source"
import oklch from "./oklch-colors-tailwind-v4"
import splitFlap from "./react-split-flap-display"
import pricing from "./react-pricing-page"
import aiChat from "./ai-chat-ui-react"
import dashboard from "./nextjs-saas-dashboard"
import landing from "./nextjs-landing-page"
import darkMode from "./nextjs-dark-mode-no-flash"
import roundup from "./free-shadcn-component-libraries"

export const GUIDES: Guide[] = [roundup, landing, dashboard, aiChat, pricing, shadcnRegistry, darkMode, oklch, glass, shadows, splitFlap]

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug)
