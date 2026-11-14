import type { Guide } from "../types"

const guide: Guide = {
  slug: "shadcn-registry-mcp-claude-code-cursor",
  title: "How to use shadcn registries with Claude Code and Cursor (MCP)",
  description:
    "Connect the shadcn MCP server to Claude Code, Cursor, VS Code and Codex, add namespaced and private registries, and get agents installing real components.",
  date: "2026-11-14",
  keywords: [
    "shadcn mcp",
    "shadcn mcp claude code",
    "shadcn mcp cursor",
    "shadcn registry mcp server",
    "components.json registries",
    "install shadcn components with ai",
  ],
  related: ["button", "data-table", "settings-page", "dashboard-home", "pricing-plans"],
  body: [
    {
      type: "tldr",
      items: [
        "**Claude Code:** run `npx shadcn@latest mcp init --client claude` in your project, restart, and check `/mcp` says Connected.",
        "**Cursor, VS Code, Codex:** add `npx shadcn@latest mcp` as a stdio server in `.cursor/mcp.json`, `.vscode/mcp.json` or `~/.codex/config.toml`.",
        "**Registries:** ones listed in the shadcn directory, such as `@minidev`, work with no config. Add others under `registries` in `components.json`, with headers for private ones.",
        "**Then just ask:** \"Install @minidev/data-table and build the users page with it.\" Review the diff like any dependency.",
      ],
    },
    {
      type: "p",
      text: "A shadcn registry is a set of JSON files that describe components: their source, dependencies and the other registry items they need. The shadcn CLI reads them and writes the code into your project. The shadcn MCP server exposes the same registries to an AI agent as tools, so the agent can search, read and install components instead of writing them from memory. This guide sets that up in Claude Code, Cursor, VS Code and Codex, adds third party and private registries, and covers what goes wrong.",
    },

    { type: "h2", text: "CLI or MCP: two ways an agent installs", id: "cli-or-mcp" },
    {
      type: "p",
      text: "An agent with a shell can already run `npx shadcn@latest add @minidev/button`. That is enough when you, or a rules file, tell it the exact item name. MCP helps with the step before: finding the right item. With the server connected the agent can list what a registry has, search across several registries and read an item before installing it, which stops it from guessing names like `@minidev/datatable` that do not exist.",
    },
    {
      type: "table",
      head: ["", "CLI only", "shadcn MCP server", "A library's own MCP server"],
      rows: [
        ["Install by exact name", "Yes", "Yes", "Gives the command"],
        ["Search across registries", "No", "Yes", "Its own library only"],
        ["Props, examples, design rules", "No", "Item source only", "Usually, e.g. MiniDev UI's `/mcp`"],
        ["Setup", "None", "One config entry", "One config entry"],
      ],
    },

    { type: "h2", text: "1. Start from a shadcn project", id: "init" },
    {
      type: "p",
      text: "The MCP server and the CLI both read `components.json`, so the project needs one. In an existing Next.js, Vite or React Router app with Tailwind CSS v4, run init once and commit the result.",
    },
    { type: "code", lang: "bash", code: "npx shadcn@latest init" },

    { type: "h2", text: "2. Connect the shadcn MCP server", id: "connect" },
    { type: "h3", text: "Claude Code", id: "claude-code" },
    {
      type: "p",
      text: "The CLI writes the config for you. Restart Claude Code afterwards and run `/mcp`; the shadcn server should read Connected.",
    },
    { type: "code", lang: "bash", code: "npx shadcn@latest mcp init --client claude" },
    {
      type: "p",
      text: "That creates a project-level `.mcp.json`. If you prefer to write it yourself, this is the shape:",
    },
    {
      type: "code",
      lang: "json",
      filename: ".mcp.json",
      code: '{\n  "mcpServers": {\n    "shadcn": {\n      "command": "npx",\n      "args": ["shadcn@latest", "mcp"]\n    }\n  }\n}',
    },
    { type: "h3", text: "Cursor", id: "cursor" },
    {
      type: "p",
      text: "Put the same JSON in `.cursor/mcp.json` in the project, then enable the server in Cursor's settings. Project-level config means everyone who opens the repo gets the same tools.",
    },
    { type: "h3", text: "VS Code (GitHub Copilot agent mode)", id: "vscode" },
    {
      type: "p",
      text: "VS Code uses a `servers` key instead of `mcpServers`. Save this as `.vscode/mcp.json` and press Start next to the server.",
    },
    {
      type: "code",
      lang: "json",
      filename: ".vscode/mcp.json",
      code: '{\n  "servers": {\n    "shadcn": {\n      "command": "npx",\n      "args": ["shadcn@latest", "mcp"]\n    }\n  }\n}',
    },
    { type: "h3", text: "Codex", id: "codex" },
    {
      type: "p",
      text: "Codex reads MCP servers from its global config, which the shadcn CLI does not edit. Add the block by hand and restart Codex.",
    },
    {
      type: "code",
      lang: "bash",
      filename: "~/.codex/config.toml",
      code: '[mcp_servers.shadcn]\ncommand = "npx"\nargs = ["shadcn@latest", "mcp"]',
    },

    { type: "h2", text: "3. Add registries", id: "registries" },
    {
      type: "p",
      text: "The official registry needs no setup. Registries listed in the [shadcn registry directory](https://ui.shadcn.com/docs/directory) also resolve by namespace with no config, which is why `npx shadcn@latest add @minidev/billing-page` works in any shadcn project. For anything else, map a namespace to a URL template under `registries` in your existing `components.json` (the other keys stay as `init` wrote them). `{name}` is replaced by the item name.",
    },
    {
      type: "code",
      lang: "json",
      filename: "components.json",
      code: '{\n  "registries": {\n    "@acme": "https://registry.acme.com/r/{name}.json",\n    "@internal": {\n      "url": "https://ui.internal.example.com/r/{name}.json",\n      "headers": { "Authorization": "Bearer ${REGISTRY_TOKEN}" }\n    }\n  }\n}',
    },
    {
      type: "p",
      text: "Keep the token out of the file: put `REGISTRY_TOKEN=...` in `.env.local`, which the CLI reads, and make sure that file is git-ignored. The MCP server uses the same `registries` block, so once a namespace works on the command line the agent can browse it too. If you publish your own, the [custom registry guide](/guides/shadcn-custom-registry) walks through the format.",
    },

    { type: "h2", text: "4. Add a library's own MCP server (optional)", id: "library-mcp" },
    {
      type: "p",
      text: "The shadcn server knows what is in a registry; it does not know how a library wants to be used. Several libraries ship their own server for that. MiniDev UI's hosted server (`https://ui.minidev.pro/mcp`) adds props, documented examples, install steps per framework and the design rules (tokens, shadows, springs) so the agent styles the page around the components correctly. The two servers sit side by side.",
    },
    {
      type: "code",
      lang: "bash",
      code: "claude mcp add --transport http minidev-ui https://ui.minidev.pro/mcp",
    },
    {
      type: "table",
      head: ["Tool", "What the agent gets"],
      rows: [
        ["`search_components`", "Matches for a need such as \"date range picker\" or \"pricing table with yearly toggle\""],
        ["`get_component`", "Description, install command, dependencies, props, import line, an example and the source"],
        ["`get_example`", "Documented usage examples, ready to paste"],
        ["`get_design_rules`", "Tokens, shadows, radius, motion springs and the design laws"],
        ["`get_install_instructions`", "Setup for Next.js, Vite or React Router, by shadcn CLI or npm"],
      ],
    },
    {
      type: "p",
      text: "The [AI agents page](/docs/ai) has the same server config for Cursor, VS Code, Windsurf and Codex, plus a one-click Cursor link.",
    },

    { type: "h2", text: "5. Prompts that work", id: "prompts" },
    {
      type: "p",
      text: "Name the registry and the outcome, and ask the agent to look before it writes. These prompts work well because each one forces a search or a read before any code:",
    },
    {
      type: "list",
      items: [
        "\"Search the @minidev registry for a data table with row selection and pagination. Install it and build `app/users/page.tsx` with 20 believable users.\"",
        "\"Which items in @minidev cover billing? Pick the one closest to Stripe's customer portal and add it under /settings/billing.\"",
        "\"Install @minidev/settings-page. Then replace its demo data with our `User` type from `lib/types.ts`. Do not change the component files.\"",
        "\"List the props of @minidev/agent-trace before you use it, and use only those.\"",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Ask the agent to end with the exact `npx shadcn@latest add ...` command it ran. That gives you a reproducible install in the PR description, and it is the fastest way to spot an item you did not expect.",
    },

    { type: "h2", text: "6. Check what landed", id: "verify" },
    {
      type: "p",
      text: "Registry items can add files and npm dependencies, so treat an install like a dependency upgrade. Look at the diff, then run the type checker; an invented prop or a missing import fails here before it fails in the browser.",
    },
    {
      type: "code",
      lang: "bash",
      code: "git status --short           # which files the install added or changed\ngit diff package.json         # new dependencies\nnpx tsc --noEmit             # props the agent made up",
    },

    { type: "h2", text: "Troubleshooting", id: "troubleshooting" },
    {
      type: "list",
      items: [
        "**The server is not listed.** Restart the client after editing its config. In Claude Code, `/mcp` shows each server's state and its error if it failed to start.",
        "**\"Unknown registry\" for a namespace.** It is not in the directory, so add it under `registries` in `components.json`. Check the URL by opening it with a real item name in place of `{name}`.",
        "**401 from a private registry.** The header variable is not set in the shell or `.env.local` the CLI sees. Print it with `echo $REGISTRY_TOKEN` in the same terminal.",
        "**Components install but look grey or unstyled.** The library's tokens are missing or overridden. For MiniDev UI, import its token stylesheet after Tailwind and delete the `:root`, `.dark` and `@theme inline` blocks that `shadcn init` generated.",
        "**The agent overwrote your `button.tsx`.** Several registries ship their own button. The CLI asks before overwriting; tell the agent in your rules file which version you keep.",
        "**The agent still writes components by hand.** Say so in the rules: \"Search the registry before writing any component.\" See the [AGENTS.md guide](/guides/agents-md-cursor-rules-ui).",
      ],
    },
  ],
  faq: [
    {
      q: "What does the shadcn MCP server do?",
      a: "It lets an AI agent browse, search and install components, blocks and templates from the shadcn registry and any registry configured in components.json, including private ones, through natural-language requests.",
    },
    {
      q: "How do I add the shadcn MCP server to Claude Code?",
      a: "Run npx shadcn@latest mcp init --client claude in your project. It writes .mcp.json; restart Claude Code and check /mcp shows the shadcn server as Connected.",
    },
    {
      q: "Can I use a private registry with the shadcn MCP server?",
      a: "Yes. Add it under registries in components.json as an object with url and headers, reference the token as an environment variable such as ${REGISTRY_TOKEN}, and set that variable in .env.local.",
    },
    {
      q: "Do I need both the shadcn MCP server and a library's MCP server?",
      a: "Not always. The shadcn server finds and installs items. A library server such as MiniDev UI's adds props, examples and design rules, which helps the agent use the components correctly once they are installed.",
    },
  ],
}

export default guide
