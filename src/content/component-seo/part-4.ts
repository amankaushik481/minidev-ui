import type { ComponentSeo } from "../types"

/** Components added after the first pass. */
export const PART_4: Record<string, ComponentSeo> = {
  "shimmer-button": {
    description: "A React call to action with a slow band of light sweeping across it, a lit top edge and a press state. Ink or accent tone, renders as a button or a link.",
    category: "animation",
    keywords: ["shimmer button react", "animated button tailwind", "shiny cta button"],
  },
  "border-beam": {
    description: "Wrap any card with a beam of light that travels around its border. A masked conic gradient in your accent colors, with pricing card demo, pauses for reduced motion.",
    category: "animation",
    keywords: ["border beam react", "animated border tailwind", "glowing border card"],
  },
  "gradient-text": {
    description: "Headline text filled with a slowly drifting gradient built from your accent tokens. A real text node for SEO and screen readers, still for reduced motion.",
    category: "animation",
    keywords: ["animated gradient text react", "tailwind gradient text", "gradient headline"],
  },
  "word-rotate": {
    description: "Rotates words inside a sentence: the old word lifts and blurs away as the next rises in. The slot keeps the widest word's width so the line never jumps.",
    category: "animation",
    keywords: ["word rotate react", "rotating text animation", "animated hero headline"],
  },
  dock: {
    description: "A macOS style dock for React: icons magnify under the pointer with spring physics and show a label. Real buttons or links, keyboard reachable and labelled.",
    category: "navigation",
    keywords: ["macos dock react", "floating dock tailwind", "magnification dock"],
  },
  "orbiting-circles": {
    description: "Icons orbit a central hub on hairline rings for integration sections. Set radius, speed and direction per ring; icons stay upright while they travel.",
    category: "animation",
    keywords: ["orbiting circles react", "integrations animation", "orbit icons tailwind"],
  },
  "animated-beam": {
    description: "Light travels along curved paths from sources into a hub and out to a result, measured from the real DOM. Includes a Beam primitive to connect any two elements.",
    category: "animation",
    keywords: ["animated beam react", "connect elements svg path", "workflow diagram animation"],
  },
  "typing-text": {
    description: "A React typewriter that types a phrase, holds, deletes and moves on, with a blinking accent caret. Starts in view and gives screen readers the plain text.",
    category: "animation",
    keywords: ["typewriter effect react", "typing animation tailwind", "typed text component"],
  },
  "dot-pattern": {
    description: "A dot or grid background drawn as one SVG pattern, faded at the edges, with an optional accent glow that follows the pointer and lights the dots beneath it.",
    category: "layout",
    keywords: ["dot pattern background react", "grid pattern tailwind", "svg background pattern"],
  },
  "animated-list": {
    description: "A live feed where new items drop in at the top with a spring and older ones slide down. Ideal for activity streams, notifications and happening now sections.",
    category: "animation",
    keywords: ["animated list react", "notification feed animation", "live activity feed"],
  },
  "password-strength": {
    description: "A React password field with a four step strength meter and a live rule checklist. Announces the score politely and accepts your own scorer such as zxcvbn.",
    category: "forms",
    keywords: ["password strength meter react", "password strength indicator tailwind", "password validation ui"],
  },
  "signature-pad": {
    description: "Draw a signature with mouse, pen or finger on a canvas with pressure aware strokes, undo and clear, a typed name fallback and PNG export for forms.",
    category: "forms",
    keywords: ["signature pad react", "e signature component", "canvas signature input"],
  },
  "masonry-grid": {
    description: "A masonry layout for React that keeps source order: a CSS grid with measured row spans, so keyboard and screen reader order match the visual flow.",
    category: "layout",
    keywords: ["masonry grid react", "pinterest layout tailwind", "masonry layout css grid"],
  },
  "bento-grid": {
    description: "A responsive bento grid for feature sections: tiles with icon, title, copy and a visual slot on a six column grid that collapses to one column on phones.",
    category: "marketing",
    keywords: ["bento grid react", "bento grid tailwind", "feature grid layout"],
  },
  "back-to-top": {
    description: "A back to top button that appears after scrolling, with a ring that fills as the reader progresses. Smooth scroll that respects reduced motion.",
    category: "navigation",
    keywords: ["back to top button react", "scroll to top tailwind", "scroll progress button"],
  },
  "sortable-list": {
    description: "Drag to reorder a list in React with Motion Reorder, plus Arrow key reordering from the handle and polite announcements of every move for screen readers.",
    category: "workflow",
    keywords: ["react sortable list", "drag and drop reorder list", "reorder list motion"],
  },
  "infinite-scroll": {
    description: "Load the next page when a sentinel scrolls into view, with a loading row, an end of list message and a Load more button as the accessible fallback.",
    category: "data-tables",
    keywords: ["react infinite scroll", "intersection observer infinite scroll", "load more list react"],
  },
  "animated-tabs": {
    description: "Tabs with a sliding pill indicator and panels that fade in the direction of travel. Full WAI-ARIA tabs keyboard support with Arrow keys, Home and End.",
    category: "navigation",
    keywords: ["animated tabs react", "sliding tab indicator", "framer motion tabs"],
  },
  "confetti-button": {
    description: "A React button that bursts confetti from itself on click, with gravity, drag and spin on a temporary canvas. No library, and skipped for reduced motion.",
    category: "animation",
    keywords: ["confetti button react", "confetti animation", "celebration button"],
  },
  "sparkles-text": {
    description: "Headline text with four point stars that twinkle around it in your accent colors. The sparkles are decorative and hidden; the text stays plain and readable.",
    category: "animation",
    keywords: ["sparkles text react", "sparkle text effect", "animated text tailwind"],
  },
  "text-reveal": {
    description: "A paragraph that lights up word by word as it scrolls through the viewport, from muted to full ink, using Motion scroll progress. Still text for reduced motion.",
    category: "animation",
    keywords: ["text reveal on scroll react", "scroll text animation", "word by word reveal"],
  },
  "image-cropper": { description: "React image cropper with drag to pan, wheel and pinch zoom, aspect presets, a circular avatar mask and 90 degree rotation that returns the crop in source pixels.", category: "media", keywords: ["react image crop", "image cropper component", "react avatar crop"] },
  "credit-card-input": { description: "React credit card input that groups the number by brand, runs a Luhn check, formats expiry as MM / YY and sizes the CVC for Amex. A UI only form, no payment processing.", category: "billing", keywords: ["react credit card input", "credit card form component", "card number input mask"] },
  "masked-input": { description: "React masked input that formats phone numbers, dates, plates and IBANs as you type from a mask, keeps the caret steady on edits and pastes, and returns masked and raw values.", category: "forms", keywords: ["react input mask", "masked input component", "react phone number input mask"] },
  "floating-label-input": { description: "React floating label input and textarea where the label springs from inside the field onto the top border on focus or fill, with helper text, error state and leading icon.", category: "forms", keywords: ["react floating label input", "floating label textarea", "material outlined text field react"] },
  "avatar-group": { description: "React avatar group that stacks overlapping avatars with tooltips, lifts one on hover, collapses extras into a +N chip with a popover list and falls back to tinted initials.", category: "layout", keywords: ["react avatar group", "avatar stack component", "overlapping avatars"] },
  "file-tree": { description: "A React file tree for code editor sidebars with icons by file type, git status letters, spring folder animation, a filter that expands matches and full keyboard support.", category: "developer-tools", keywords: ["react file tree", "file explorer component", "react tree view files"] },
  "event-calendar": { description: "A React week and day calendar scheduler with events placed by time, side by side overlap layout, an all-day row, a live time line and click or keyboard to create events.", category: "dashboard", keywords: ["react event calendar", "react week view calendar", "react scheduler component"] },
  "pie-chart": { description: "A React SVG pie chart with outside labels on leader lines, a legend and slices that pull out on hover or focus to show value and share, plus a hidden data table.", category: "charts", keywords: ["react pie chart", "svg pie chart component", "pie chart with labels react"] },
  "radial-chart": { description: "A React radial bar chart of concentric progress rings with ring labels, a legend and a rolling center total that animate on data change, or a single radial progress ring.", category: "charts", keywords: ["react radial bar chart", "radial progress chart", "react progress ring chart"] },
  "meteors": { description: "Meteors is a React background effect that sends accent colored streaks with fading tails falling diagonally behind your content, with count, angle and speed props.", category: "animation", keywords: ["react meteors effect", "meteor shower background", "shooting stars animation css"] },
  "retro-grid": { description: "Retro Grid is a React background that draws a perspective grid floor receding to a glowing horizon and scrolling slowly toward the viewer, with angle and cell size props.", category: "animation", keywords: ["react retro grid", "perspective grid background", "synthwave grid css"] },
  "ripple": { description: "Ripple is a React background of concentric rings that pulse outward from the center or any point, staggered and fading, with an extra ripple sent from each click or tap.", category: "animation", keywords: ["react ripple background", "concentric circles animation", "pulse rings effect"] },
  "particles": { description: "Particles is a React canvas background of drifting points that repel or attract around the pointer, colored from your accent token and sharp on high density screens.", category: "animation", keywords: ["react particles background", "canvas particle animation", "interactive particles react"] },
  "flickering-grid": { description: "Flickering Grid is a React canvas background of small squares whose opacity flickers at random, with square size, gap, flicker chance, color and radial fade mask props.", category: "animation", keywords: ["react flickering grid", "animated grid background", "canvas grid animation"] },
}
