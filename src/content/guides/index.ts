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
import dataTable from "./react-data-table-tanstack"
import sidebar from "./shadcn-sidebar-layout"
import otp from "./react-otp-input"
import kanban from "./react-kanban-board-drag-drop"
import cmdk from "./react-command-palette"
import billing from "./nextjs-billing-page-stripe"
import settings from "./saas-settings-page"
import toasts from "./nextjs-toast-notifications"
import tw4 from "./tailwind-v4-migration"
import upload from "./react-file-upload-dropzone"
import dateRange from "./react-date-range-picker"
import wizard from "./react-onboarding-wizard"
import charts from "./react-charts-tailwind"
import tour from "./react-product-tour"
import panels from "./react-resizable-panels"
import gantt from "./react-gantt-chart"
import qr from "./react-qr-code"
import states from "./react-empty-states-skeletons"
import heroes from "./tailwind-hero-section-examples"
import modal from "./react-accessible-modal"
import reactUiLibs from "./best-free-react-ui-libraries-2026"
import tailwindLibs from "./best-tailwind-component-libraries"
import animationLibs from "./best-react-animation-libraries"
import chartLibs from "./best-react-chart-libraries"
import saasTemplates from "./free-nextjs-saas-templates"
import shadcnBlocks from "./best-shadcn-blocks-and-registries"

export const GUIDES: Guide[] = [
  roundup, landing, dashboard, dataTable, aiChat, pricing, billing, sidebar, settings, cmdk,
  kanban, otp, upload, toasts, shadcnRegistry, tw4, darkMode, oklch, glass, shadows, splitFlap,
  dateRange, wizard, charts, tour, panels, gantt, qr, states, heroes, modal,
  reactUiLibs, tailwindLibs, animationLibs, chartLibs, saasTemplates, shadcnBlocks,
]

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug)
