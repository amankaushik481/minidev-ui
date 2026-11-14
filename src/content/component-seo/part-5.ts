import type { ComponentSeo } from "../types"

/** Components added in October 2026 (wave 3). */
export const PART_5: Record<string, ComponentSeo> = {
  "qr-code": {
    description:
      "React QR code component with its own encoder: versions 1 to 40, four error correction levels, crisp SVG in currentColor, a logo well and an SVG download.",
    category: "media",
    keywords: ["react qr code generator", "qr code svg component", "qr code react no dependencies"],
  },
  "resizable-panels": {
    description:
      "React split panes with draggable handles in both directions, min and max sizes, snap to collapse, keyboard resizing, double click reset and nested groups.",
    category: "layout",
    keywords: ["react resizable panels", "shadcn resizable", "draggable split pane react"],
  },
  "json-viewer": {
    description:
      "Collapsible JSON tree for React with colored values, counts on folded nodes, copy value and copy path buttons, search highlighting and arrow key navigation.",
    category: "developer-tools",
    keywords: ["react json viewer", "json tree component", "collapsible json react"],
  },
  "table-of-contents": {
    description:
      "Sticky React table of contents that reads h2 and h3 headings, marks the section in view with a sliding accent bar and smooth scrolls to a heading on click.",
    category: "navigation",
    keywords: ["react table of contents", "scroll spy react", "sticky toc component"],
  },
  "gantt-chart": {
    description:
      "React Gantt chart for project timelines with day and week scales, a today line, progress fills, dependency arrows, a fixed task column and focusable bars.",
    category: "charts",
    keywords: ["react gantt chart", "gantt chart component", "project timeline react"],
  },
  "org-chart": {
    description:
      "Collapsible React org chart with CSS connector lines, initials avatars, team colour stripes, report counts on each manager and arrow key navigation.",
    category: "dashboard",
    keywords: ["react org chart", "organization chart component", "collapsible org chart"],
  },
  "virtual-list": {
    description:
      "React virtual list that renders only rows in view, with fixed or measured row heights, overscan, arrow key and Page Up/Down navigation and scrollToIndex.",
    category: "data-tables",
    keywords: ["react virtual list", "virtualized list component", "windowed list react"],
  },
  "audio-recorder": {
    description:
      "React audio recorder on MediaRecorder with start, pause and stop, an elapsed timer, live waveform bars, playback with a scrubber, download and a max length.",
    category: "media",
    keywords: ["react audio recorder", "mediarecorder react component", "voice recorder ui"],
  },
  "treemap-chart": {
    description:
      "React squarified SVG treemap with grouped cells under header strips, labels that hide in small cells, a value tooltip on hover or focus and a data table.",
    category: "charts",
    keywords: ["react treemap chart", "svg treemap component", "squarified treemap react"],
  },
  "sankey-chart": {
    description:
      "React SVG sankey diagram: node columns laid out from the links, gradient ribbons, a node's flows lit on hover or focus, and a hidden data table.",
    category: "charts",
    keywords: ["react sankey chart", "sankey diagram component", "svg flow diagram react"],
  },
  "funnel-chart": {
    description:
      "React funnel chart with horizontal or vertical stages, conversion and drop-off between stages, an optional comparison outline and bars that spring to new data.",
    category: "charts",
    keywords: ["react funnel chart", "conversion funnel component", "funnel visualization tailwind"],
  },
  "markdown-editor": {
    description:
      "React markdown editor with a toolbar that wraps the selection, shortcuts, write, split and preview modes, a live preview without innerHTML and a word count.",
    category: "forms",
    keywords: ["react markdown editor", "markdown editor with preview", "textarea markdown toolbar"],
  },
  "aurora-background": {
    description:
      "React aurora background that drifts soft, blurred bands of accent colour behind a hero, with intensity, speed, blur and colour props. Pauses off screen.",
    category: "animation",
    keywords: ["aurora background react", "animated gradient background", "northern lights css background"],
  },
  "lamp-effect": {
    description:
      "A React lamp effect for dark hero panels: a thin bright line at the top switches on and widens, casting a soft cone of light on the headline beneath it.",
    category: "animation",
    keywords: ["lamp effect react", "spotlight hero section", "glowing line hero"],
  },
  "wavy-background": {
    description:
      "React canvas background of layered sine waves rolling behind your content, with colour, speed, amplitude and blur props, sharp on retina and paused off screen.",
    category: "animation",
    keywords: ["wavy background react", "animated wave background canvas", "sine wave background"],
  },
  "globe": {
    description:
      "React dotted globe drawn on a plain canvas without WebGL, with auto rotation, drag with inertia, keyboard control and labelled markers joined by arcs.",
    category: "animation",
    keywords: ["react globe component", "canvas globe without webgl", "dotted globe animation"],
  },
  "tracing-beam": {
    description:
      "A React tracing beam that draws a glowing SVG line beside long content as the reader scrolls, with a bright tip and a node that lights up for each entry.",
    category: "animation",
    keywords: ["tracing beam react", "scroll progress line", "animated timeline beam"],
  },
  "background-boxes": {
    description:
      "React background of skewed hairline boxes: the box under the pointer lights up in colour and fades out, driven by one pointer handler and CSS transitions.",
    category: "animation",
    keywords: ["background boxes react", "hover grid background", "interactive grid background"],
  },
  "tilt-card": {
    description:
      "React card that tilts toward the pointer in 3D with a moving glare and parallax children marked data-depth. Springs flat on leave, still for reduced motion.",
    category: "animation",
    keywords: ["3d tilt card react", "react tilt effect", "hover tilt card component"],
  },
  "morphing-text": {
    description:
      "React headline that cycles through phrases by blurring one into the next on two stacked layers, pauses off screen and shows the first phrase for reduced motion.",
    category: "animation",
    keywords: ["morphing text react", "text morph animation", "animated headline words"],
  },
  "hyper-text": {
    description:
      "A React text effect that scrambles characters through random glyphs and settles them left to right on mount or hover, in monospace so the width never jumps.",
    category: "animation",
    keywords: ["hyper text react", "text scramble effect", "decode text animation"],
  },
  "blur-fade": {
    description:
      "React reveal wrapper that fades, unblurs and lifts children into place as they scroll into view, with delay, duration, direction and once props.",
    category: "animation",
    keywords: ["blur fade react", "scroll reveal animation", "fade in on scroll component"],
  },
  "shine-border": {
    description:
      "React shine border: a conic gradient sweeps around a card's edge, masked to the border ring so content stays untouched. Colors, duration and width props.",
    category: "animation",
    keywords: ["shine border react", "animated gradient border", "glowing card border css"],
  },
  "scroll-progress": {
    description:
      "React scroll progress indicator with a thin top bar and a circular percent ring, spring smoothed, tracking the window or any scroll container you pass.",
    category: "animation",
    keywords: ["scroll progress bar react", "reading progress indicator", "scroll percentage circle"],
  },
  "terminal": {
    description:
      "React animated terminal window that types commands and prints output lines in sequence, with colored line kinds, a blinking cursor and a replay button.",
    category: "developer-tools",
    keywords: ["react terminal component", "animated terminal ui", "typing terminal animation react"],
  },
  "browser-mockup": {
    description:
      "React browser mockup: a window frame with traffic lights, an address bar and optional tabs around a screenshot or children, plus a matching PhoneMockup.",
    category: "marketing",
    keywords: ["browser mockup react", "browser window frame component", "phone mockup component react"],
  },
  "icon-cloud": {
    description:
      "React 3D sphere of icons that rotates on its own, spins with inertia when dragged, scales and fades items by depth and pauses when it leaves the screen.",
    category: "animation",
    keywords: ["icon cloud react", "3d rotating icon sphere", "tag cloud sphere animation"],
  },
  "scratch-to-reveal": {
    description:
      "React scratch card with a gradient foil you rub away by pointer or touch to show the content beneath, clearing itself once past a set threshold.",
    category: "animation",
    keywords: ["scratch card react", "scratch to reveal component", "canvas scratch off effect"],
  },
  "animated-tooltip": {
    description:
      "React row of overlapping avatars where hovering or focusing one pops up a name and role card that tilts and slides with the pointer on springs.",
    category: "overlays",
    keywords: ["animated tooltip react", "avatar hover tooltip", "team avatars tooltip component"],
  },
  "keyboard-shortcuts": {
    description:
      "React keyboard shortcuts cheat sheet: a searchable dialog of grouped shortcuts opened with the ? key or a button, with Command glyphs on Mac and Ctrl elsewhere.",
    category: "overlays",
    keywords: ["keyboard shortcuts dialog react", "shortcut cheat sheet component", "hotkey help modal"],
  },
}
