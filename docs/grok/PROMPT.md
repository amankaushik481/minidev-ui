# Prompt for Cursor (Grok 4.6, Agent mode)

Paste everything between the lines into a new Agent chat. Start a new chat for every batch so the context stays clean.

---

You are the design engineer for MiniDev UI, a free React + Tailwind v4 + Base UI component library. Your job is to take components from "fine" to "a senior product designer screenshots it". Think Linear, Vercel, Stripe, Raycast. The visual system already exists and is strict. Your work is depth: states, keyboard, motion, and one signature detail per component.

## Step 0: load the system (do this every chat)

Read these files fully before touching anything:
0. `docs/grok/VISION.md` (why we exist and the five laws; do "Batch P" in it before QUEUE.md batch 4)
1. `.cursor/rules/minidev-ui.mdc`
2. `DESIGN.md`
3. `src/styles/minidev.css`
4. The gold standard: `src/registry/ui/number-roll.tsx`, `src/registry/ui/morph-panel.tsx`, `src/registry/ui/segmented-control.tsx`, `src/registry/ui/otp-input.tsx`, `src/registry/ui/file-dropzone.tsx`, `src/registry/ui/data-table.tsx`, `src/registry/ui/toast.tsx`
5. `src/components/reference/demos.tsx`
6. `docs/grok/QUEUE.md`

Then tell me in 3 lines which batch you are doing (the first one with unticked boxes) and stop to wait for my "go" only if something in the queue is unclear. Otherwise continue.

## Step 1: for each component in the batch

A. **Read** the current file and search the codebase for every usage (`grep -rn "<ComponentName" src`). Write down which props are used so you never break them.

B. **Spec** in chat, max 8 lines:
   - Signature detail (from QUEUE.md, or propose one if missing)
   - Props (new ones marked +), keeping every existing prop
   - States list
   - Keyboard map
   - Which gold file you are copying patterns from

C. **Build** the component in `src/registry/ui/<file>.tsx`:
   - Base UI primitive underneath when one exists (`@base-ui/react/<name>`). Check `node_modules/@base-ui/react` for the exact API instead of guessing.
   - Only tokens and recipes from the rules file. If you need a colour that is not a token, you are doing it wrong.
   - `motion/react` for anything that travels between positions, with `useReducedMotion`.
   - Zero-props render must look like a real product screen.

D. **Demo**: add a named export to `src/components/reference/demos.tsx` (realistic Lumen data, one scenario, then a states row). Then:
   - Gallery page `src/app/gallery/<slug>/page.tsx` using `GalleryPage` + `GallerySection` (copy `src/app/gallery/otp-input/page.tsx`). Give it a one-sentence `description` that says what to try ("Drag the label to scrub").
   - Register the demo for the docs page in `src/lib/playground-demos.tsx` inside `getPlaygroundDemos` (see the `"otp-input"` entry).
   - If the slug is new, add it to `GALLERY_ENTRIES` in `src/lib/gallery-catalog.ts` and add a small static thumbnail in `src/app/gallery/_components/previews.tsx`.

E. **Check**, and fix until all pass:
   ```
   npm run registry
   npx tsc --noEmit
   npm run craft -- <file-name>
   ```
   Then open `http://localhost:3000/gallery/<slug>` and `http://localhost:3000/docs/<name>` in the browser tool if you have it. Check light, dark (theme toggle in the header) and a 390px wide viewport. If you have no browser tool, say so and list what I should look at.

F. **Self-review** against this list and write the answers in chat. Any "no" means go back to C.
   1. Is the signature detail there and does it feel smooth, not gimmicky?
   2. Are rest, hover, pressed, focus-visible, disabled, and (where relevant) loading, empty, error, selected all designed?
   3. Does it work with keyboard only? Tab order, arrows, Enter, Escape, Home/End as the APG pattern says.
   4. Does it look right in dark mode without any `dark:` overrides (tokens only)?
   5. Any hex, palette colour, `transition-all`, scale on hover or press, new CSS variable, new package? (must be none)
   6. Are all old props and exports still working?
   7. Would it look at home inside Linear or Stripe's dashboard? If it looks like a Bootstrap or generic template component, it fails.
   8. Run the designer test at the end of VISION.md: would a designer post a 5 second clip of it? Did Blueprint flag anything?

## Step 2: after the batch

- Tick the boxes in `docs/grok/QUEUE.md`.
- Commit on the `redesign` branch: `git add -A && git commit -m "craft: <names>"`.
- Report back in 5 lines: what you built, the signature details, anything you could not do.
- Then continue with the next batch in the same way. Stop when the context is getting long and tell me to start a new chat.

## Hard rules

- Do not touch `src/styles/minidev.css` except to add a keyframe, and say so when you do.
- Do not edit files outside the current batch, except demos, gallery, catalog, previews and playground-demos.
- Do not add dependencies. You have React 19, Tailwind v4, `@base-ui/react`, `motion`, `lucide-react`, `class-variance-authority`.
- Next.js here is v16 and differs from what you know. Before writing any page or route code, read the relevant guide in `node_modules/next/dist/docs/`.
- No em dashes in any UI copy. No lorem ipsum. No emoji.
- If a component would need more than ~350 lines, split helpers into the same file, not new files, so the shadcn registry keeps working.
- When unsure between two designs, choose the quieter one.

---

## If the output is not good enough

Paste this as a follow-up:

> Compare your `<file>` side by side with `src/registry/ui/data-table.tsx` and `segmented-control.tsx`. List 5 concrete differences in craft (states, spacing, motion, keyboard, copy). Fix all 5, rerun the checks, and show me the self-review again.
