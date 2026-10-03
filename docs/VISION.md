# MiniDev UI: the vision

The ideas behind every component in MiniDev UI. Read this before you build or change one.

## The problem

AI writes a component in seconds. There are thousands of libraries and most of them look the same. In 2026 nobody browses a component library unless it gives them something their AI cannot produce on its own. "Clean and accessible" is not an edge any more. It is the floor.

## Our edge: four things AI cannot fake

0. **Light and Material. Every other UI kit is flat. This one is lit.**
   One light source (the cursor, or a slow drift on phones) crosses the whole page. Every shadow falls away from it, every raised edge catches it, glass sheens under it, metal glints. And the whole kit comes in four materials: `hairline` (unlit, quiet), `glass`, `metal`, `paper`. A material is one attribute, `data-material="metal"`, on `<html>` or on any element, and it nests. Same markup, four finishes. Nobody else ships this.

1. **Blueprint. The spec ships with the component.**
   Every value is a token and every size sits on the grid, and we prove it live. Hold Option (Alt) on any page of the site and hover anything: box, padding, gaps, radius, type, and the exact token classes. Off-grid values get flagged. AI agents read the same spec from llms.txt. Designers can check our work. Nobody else lets them.

2. **Physics. Things that move have mass.**
   Springs, not durations. Nothing teleports. Elements keep their identity while they change (a digit rolls, a button stretches into a panel, a thumb glides). This is the part AI gets wrong every time, and the part people feel before they notice it.

3. **Composition. One real product, never floating demos.**
   Every component is shown inside Lumen, our fictional finance app, with real data. The landing page takes a Lumen screen apart into five layers and puts it back together. If a component only looks good alone on a dotted background, it is not done.

Tagline: **Every pixel, accounted for.**

## The material law (read this twice)

Materials only reach a component through tokens. So:

- Surfaces use exactly `bg-bg`, `bg-surface`, `bg-raised`, `bg-sunken`, `bg-ink`, `bg-accent`. No `bg-white`, no `bg-black`, no opacity variants like `bg-surface/80` on cards (the material cannot reach those classes).
- Depth uses exactly `shadow-xs`, `shadow-sm`, `shadow-raised`, `shadow-key`, `shadow-ink`, `shadow-md`, `shadow-lg`, `shadow-overlay`. These follow the light. A hand-written `shadow-[...]` does not, so it looks dead in glass and metal. Only exception: the inset 1px ring and the 3px focus halo.
- Never add `backdrop-blur` to a surface. Glass adds it.
- Thumbs and knobs get `data-slot="<name>-thumb"`, so metal can machine them (add the slot to the knob list in minidev.css if it is new).
- Check every component in all four: add `?material=glass`, `?material=metal`, `?material=paper` to the URL, light and dark. That is eight looks. All eight must be good.

## The five laws (every component, no exceptions)

1. **One signature detail.** Name it in five words before you write code ("digits roll, not swap", "button becomes the panel"). If you cannot name one, you are not ready to build it.
2. **Things that move have mass.** Anything that changes position, size or shape uses a spring preset below. Keep identity with `layoutId`, `layout`, or stable keys. Exits are faster than entrances. With reduced motion, everything is instant.
3. **Blueprint-clean.** Every height, padding and gap is an even number (2px grid). Radius comes from the scale. Every colour is a token class on the element, so the Blueprint card can name it. Turn Blueprint on and hover every part of your component before you call it done.
4. **Shown in context.** The demo is a slice of Lumen with believable data (customers, invoices, revenue, deploys). Then a states row.
5. **Quiet at rest, rich on intent.** Nothing animates on page load in product components. Richness appears on hover, press, drag, type, and on data changes.

## Spring presets (copy exactly, do not invent new ones)

| Name | Use for | Value |
|---|---|---|
| snappy | thumbs, indicators, toggles, tabs | `{ type: "spring", bounce: 0.18, duration: 0.42 }` |
| morph | size or shape changes, panels, dialogs from triggers | `{ type: "spring", bounce: 0.16, duration: 0.5 }` |
| roll | numbers, counters, odometers | `{ type: "spring", stiffness: 260, damping: 28, mass: 0.9 }` |
| release | after a drag (sheets, cards, swipes): pass the drag velocity | `{ type: "spring", stiffness: 400, damping: 40 }` |
| data | chart lines and areas changing shape | `{ type: "spring", bounce: 0.12, duration: 0.7 }` |

Always: `const reduce = useReducedMotion()` and `transition={reduce ? { duration: 0 } : PRESET}`.
Rubber band past limits: `dragElastic={0.12}`. Never bounce above 0.25.

## Reference implementations

Read these, copy their patterns:

- `src/registry/ui/number-roll.tsx`: identity-keyed digits, roll spring, trend flash, screen reader text.
- `src/registry/ui/morph-panel.tsx`: one surface morphing from trigger to panel with `layout`, border radius on style, blur crossfade, focus return.
- `src/registry/ui/segmented-control.tsx`: `layoutId` thumb, roving keyboard.
- `src/registry/ui/otp-input.tsx`, `file-dropzone.tsx`, `data-table.tsx`, `toast.tsx`: states, keyboard, async.
- `src/components/landing/exploded.tsx`: how we show composition.
- `src/components/blueprint/blueprint.tsx`: the spec engine. Do not modify it. Make your components read well in it.
- `src/registry/ui/light-provider.tsx` and the LIGHT & MATERIAL section of `src/styles/minidev.css`: the light and the materials. Do not modify them without asking. If a component looks wrong in a material, fix the component's classes first.
- `src/components/landing/materials.tsx`: the same markup in four materials side by side.

## Never

- Effects without a job: glowing borders, particles, gradient text in product UI, glass blur on cards.
- Hover that moves layout. Scale on press. Bounce above 0.25.
- Animation on load inside product components.
- A demo without Lumen data.

## The designer test (run it on every component)

1. Record five seconds of using it. Would a designer post that clip? If not, the signature detail is missing or too weak.
2. Turn Blueprint on and hover every part. Token classes are named, nothing is flagged off-grid.
3. Switch to dark mode in the middle of an interaction. Nothing breaks. Then switch material (glass, metal, paper). Nothing looks flat or dead.
4. Use it with the keyboard only.
5. Turn on reduced motion (DevTools, Rendering, prefers-reduced-motion). Everything still works, instantly.
