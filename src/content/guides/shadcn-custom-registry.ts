import type { Guide } from "../types"

const guide: Guide = {
  slug: "shadcn-custom-registry",
  title: "How to install components from a custom shadcn registry",
  description:
    "Install shadcn components from any registry URL: what the item JSON contains, how registryDependencies resolve, components.json setup and common fixes.",
  date: "2026-09-30",
  keywords: ["shadcn registry", "shadcn add from url", "custom shadcn registry", "shadcn registry json", "shadcn registrydependencies"],
  related: ["button", "pricing-plans", "number-roll", "segmented-control"],
  body: [
    {
      type: "p",
      text: "The shadcn CLI installs from any URL that returns a registry item JSON: `npx shadcn@latest add https://ui.minidev.pro/r/button.json`. It downloads the item, installs its npm packages, follows its `registryDependencies` to fetch other items, and writes the source files into your project with imports rewritten to your aliases. All you need is a `components.json` at the project root, which `npx shadcn@latest init` creates.",
    },

    { type: "h2", text: "How shadcn add installs from a URL", id: "how-add-from-url-works" },
    {
      type: "p",
      text: "The `add` command accepts three kinds of arguments. A bare name like `button` resolves against the default shadcn registry. A namespaced name like `@minidev/button` resolves through the `registries` map in your `components.json`. A full URL is fetched as is. You can mix them and pass several at once.",
    },
    {
      type: "code",
      lang: "bash",
      code: `# one item
npx shadcn@latest add https://ui.minidev.pro/r/button.json

# several items in one run
npx shadcn@latest add \\
  https://ui.minidev.pro/r/button.json \\
  https://ui.minidev.pro/r/segmented-control.json`,
    },
    { type: "p", text: "For each argument the CLI does roughly the same work:" },
    {
      type: "list",
      ordered: true,
      items: [
        "Fetches the JSON and validates it against the registry item schema (the `$schema` field points at `https://ui.shadcn.com/schema/registry-item.json`).",
        "Walks `registryDependencies` recursively and collects every item in the tree, so shared dependencies are installed once.",
        "Installs the combined `dependencies` list with the package manager it detects from your lockfile.",
        "Writes each entry in `files` to disk and rewrites `@/` imports to match the aliases in your `components.json`.",
        "Asks before overwriting a file that already exists, unless you pass `--overwrite`.",
      ],
    },
    {
      type: "p",
      text: "Nothing is linked or bundled. The component becomes your code, which is the whole point of the shadcn model: you can read it, edit it and delete what you do not need.",
    },

    { type: "h2", text: "What is inside a registry item JSON", id: "registry-item-json" },
    {
      type: "p",
      text: "Open any MiniDev item in the browser, for example [button.json](https://ui.minidev.pro/r/button.json). With the file content shortened, it looks like this:",
    },
    {
      type: "code",
      lang: "json",
      filename: "https://ui.minidev.pro/r/button.json",
      code: String.raw`{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "The Hairline keycap.",
  "dependencies": ["@base-ui/react", "class-variance-authority"],
  "registryDependencies": ["utils"],
  "files": [
    {
      "path": "registry/ui/button.tsx",
      "type": "registry:ui",
      "target": "components/ui/button.tsx",
      "content": "\"use client\"\nimport * as React from \"react\"\n..."
    }
  ]
}`,
    },
    {
      type: "table",
      head: ["Field", "What the CLI does with it"],
      rows: [
        ["`name`", "The item's id. Other items refer to it by this name or by its URL."],
        ["`type`", "What kind of item it is: `registry:ui` for primitives, `registry:component` for composed pieces, plus types like `registry:block`, `registry:hook` and `registry:lib`."],
        ["`dependencies`", "npm packages to install. Versions are allowed (`motion@12`), bare names get the latest."],
        ["`registryDependencies`", "Other registry items to install first, by name or URL."],
        ["`files[].content`", "The full source, as a JSON string. This is what gets written to disk."],
        ["`files[].target`", "Where the file goes, relative to the project root."],
        ["`cssVars` / `css`", "Optional theme variables and CSS rules merged into your stylesheet. MiniDev items leave these out and ship tokens as one stylesheet instead."],
      ],
    },
    {
      type: "p",
      text: "MiniDev sets `target` to `components/ui/<name>.tsx` for every item, blocks included, so everything you add lands in one folder. The source in the repo imports siblings as `@/registry/ui/button`; the build script rewrites those to `@/components/ui/button` before writing the JSON, and the CLI then maps `@/components/ui` and `@/lib/utils` onto whatever aliases your project uses.",
    },

    { type: "h2", text: "How registryDependencies pull in other items", id: "registry-dependencies" },
    {
      type: "p",
      text: "A block is just an item with more dependencies. Here is the metadata for [pricing-plans](/docs/pricing-plans), which imports three other MiniDev components:",
    },
    {
      type: "code",
      lang: "json",
      filename: "https://ui.minidev.pro/r/pricing-plans.json",
      code: `{
  "name": "pricing-plans",
  "type": "registry:component",
  "dependencies": ["lucide-react"],
  "registryDependencies": [
    "https://ui.minidev.pro/r/button.json",
    "https://ui.minidev.pro/r/number-roll.json",
    "https://ui.minidev.pro/r/segmented-control.json",
    "utils"
  ]
}`,
    },
    {
      type: "p",
      text: "The CLI fetches each URL, reads that item's own dependencies, and keeps going until the tree is complete. `button` needs `@base-ui/react` and `class-variance-authority`; `number-roll` and `segmented-control` need `motion`. The bare `utils` entry resolves against the default shadcn registry and writes `lib/utils.ts` with the `cn()` helper, which pulls in `clsx` and `tailwind-merge`. One command therefore produces:",
    },
    {
      type: "list",
      items: [
        "`components/ui/pricing-plans.tsx`, `button.tsx`, `number-roll.tsx` and `segmented-control.tsx`",
        "`lib/utils.ts` (skipped if you already have it)",
        "npm installs for `lucide-react`, `@base-ui/react`, `class-variance-authority`, `motion`, `clsx` and `tailwind-merge`",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "A bare name in `registryDependencies` always means the default shadcn registry. If a third party registry lists `\"button\"` instead of its own URL, you get shadcn's button, not theirs. That is why every MiniDev dependency except `utils` is a full URL.",
    },

    { type: "h2", text: "Set up components.json first", id: "components-json" },
    {
      type: "p",
      text: "Run `npx shadcn@latest init` once per project. It detects your framework and Tailwind version and writes `components.json`. For Tailwind CSS v4 the `tailwind.config` field is empty, because configuration lives in CSS. The aliases must match the `paths` in your `tsconfig.json`, or the rewritten imports will not resolve.",
    },
    {
      type: "code",
      lang: "json",
      filename: "components.json",
      code: `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@minidev": "https://ui.minidev.pro/r/{name}.json"
  }
}`,
    },
    { type: "h3", text: "Namespaced registries" },
    {
      type: "p",
      text: "The `registries` map is optional. With it, the CLI replaces `{name}` in the template, so `npx shadcn@latest add @minidev/pricing-plans` fetches `https://ui.minidev.pro/r/pricing-plans.json`. Namespaces need shadcn CLI 3.0 or newer. Full URLs work in every version and in projects you do not control, which is why the MiniDev docs show them.",
    },

    { type: "h2", text: "Add the design tokens", id: "add-the-tokens" },
    {
      type: "p",
      text: "Component files reference semantic classes like `bg-surface`, `text-fg-muted` and `shadow-raised`. Those come from one stylesheet, not from the item JSON. Either install the npm package and import it, or download [styles.css](https://ui.minidev.pro/r/styles.css) next to your global CSS and import the local copy.",
    },
    {
      type: "code",
      lang: "css",
      filename: "app/globals.css",
      code: `@import "tailwindcss";

/* Option A: the npm package */
@import "minidev-ui-kit/styles.css";
@source "../node_modules/minidev-ui-kit";

/* Option B: a local copy of https://ui.minidev.pro/r/styles.css */
/* @import "./minidev.css"; */`,
    },
    {
      type: "callout",
      tone: "note",
      text: "The stylesheet also defines the standard shadcn variables (`--background`, `--primary`, `--ring` and so on), mapped onto MiniDev tokens, so stock shadcn components pick up the theme. Delete the `:root` and `.dark` blocks that `init` generated, or they will override the import. One difference to know: in MiniDev `accent` is the brand violet, while stock shadcn uses `accent` as a neutral hover fill.",
    },
    {
      type: "p",
      text: "For how the tokens are built and how dark mode swaps them, see [OKLCH colors in Tailwind CSS v4](/guides/oklch-colors-tailwind-v4).",
    },

    { type: "h2", text: "Installing blocks and full pages", id: "installing-blocks" },
    {
      type: "p",
      text: "Blocks and page sections use the same URL scheme and the same command. After the install, import from the folder the CLI wrote to:",
    },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest add https://ui.minidev.pro/r/pricing-plans.json`,
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/pricing/page.tsx",
      code: `import { PricingPlans } from "@/components/ui/pricing-plans"

export default function PricingPage() {
  return (
    <PricingPlans
      currency="EUR"
      onSelect={(plan, period) => console.log(plan, period)}
    />
  )
}`,
    },
    {
      type: "p",
      text: "Every prop on `PricingPlans` has a default, so it renders with sample plans before you pass your own. The [React pricing page guide](/guides/react-pricing-page) covers wiring it to real plan data.",
    },

    { type: "h2", text: "Troubleshooting", id: "troubleshooting" },
    { type: "h3", text: "The CLI cannot find components.json" },
    {
      type: "p",
      text: "Run the command from the project root, or point it at the right folder with `--cwd` (short form `-c`). In a monorepo, each app that receives components needs its own `components.json`.",
    },
    { type: "h3", text: "The URL returns an error or HTML" },
    {
      type: "p",
      text: "The CLI needs raw JSON. Check the URL with `curl -s <url> | head`. Common causes are a missing `.json` extension, a trailing slash, a redirect to a login page, or a registry that serves its index at `registry.json` rather than per item files.",
    },
    {
      type: "code",
      lang: "bash",
      code: `curl -s https://ui.minidev.pro/r/pricing-plans.json \\
  | jq '{name, dependencies, registryDependencies, files: [.files[] | .target]}'`,
    },
    { type: "h3", text: "A file already exists" },
    {
      type: "p",
      text: "Two registries can both ship `components/ui/button.tsx`. If you already have shadcn's button and install a MiniDev block, the CLI asks whether to overwrite it. Keeping yours only works if the block uses props your version supports: `pricing-plans` renders `<Button variant=\"accent\">`, which stock shadcn does not define. Use `--overwrite` only after committing, so you can review the diff.",
    },
    { type: "h3", text: "Updating a component you already installed" },
    {
      type: "p",
      text: "There is no lockfile for registry items. To pick up a newer version, run the same `add` command again with `--overwrite`, then review the change with `git diff` and restore any local edits you want to keep. Because the code is yours, updates are merges you control, not upgrades that happen to you.",
    },
    { type: "h3", text: "Imports do not resolve" },
    {
      type: "p",
      text: "If TypeScript cannot find `@/lib/utils` or `@/components/ui/button`, the aliases in `components.json` and the `paths` in `tsconfig.json` disagree. Fix the aliases, then reinstall the item so the imports are rewritten again.",
    },
    { type: "h3", text: "Components render unstyled" },
    {
      type: "p",
      text: "Classes like `bg-surface` compile to nothing if the tokens are not imported, because Tailwind v4 only generates utilities for colors defined in `@theme`. Confirm the stylesheet import comes after `@import \"tailwindcss\"`. If you use the npm package, also keep the `@source` line so Tailwind scans the package files.",
    },

    { type: "h2", text: "Start with MiniDev UI", id: "start-with-minidev-ui" },
    {
      type: "p",
      text: "Every MiniDev component and block is a public registry item under `https://ui.minidev.pro/r/`. Each docs page shows the exact install command. Two good first installs: the button, which most blocks depend on, and a full block to see dependency resolution at work.",
    },
    { type: "component", name: "button" },
    { type: "component", name: "pricing-plans" },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest add https://ui.minidev.pro/r/button.json
npx shadcn@latest add https://ui.minidev.pro/r/pricing-plans.json`,
    },
  ],
  faq: [
    {
      q: "What is a shadcn registry?",
      a: "A set of JSON files that follow the shadcn registry item schema, served over HTTP. Each file holds a component's source plus its npm and registry dependencies, and the shadcn CLI copies it into your project.",
    },
    {
      q: "Can shadcn add install from a URL?",
      a: "Yes. `npx shadcn@latest add https://example.com/r/item.json` works with any URL that returns a valid registry item. You can also register a namespace in `components.json` and use `@namespace/item`.",
    },
    {
      q: "What does registryDependencies do?",
      a: "It lists other registry items the component needs. The CLI installs them first, recursively. Bare names resolve to the default shadcn registry, and full URLs are fetched directly.",
    },
    {
      q: "Do I need components.json to install from a custom registry?",
      a: "Yes. The CLI reads it to know where to write files, which aliases to use in imports and where your global CSS lives. Run `npx shadcn@latest init` to create it.",
    },
    {
      q: "How do I host my own shadcn registry?",
      a: "Describe your items in a `registry.json` and run `npx shadcn@latest build`, which writes one JSON file per item to `public/r`. Deploy that folder to any static host and install with the URLs.",
    },
  ],
}

export default guide
