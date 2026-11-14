# minidev-ui-mcp

An MCP server that gives AI coding agents direct access to [MiniDev UI](https://ui.minidev.pro): 500+ free React + Tailwind CSS v4 components on Base UI, shadcn compatible. Your agent can search the library, read a component's source, props and examples, follow the design rules, and install components with one command.

No dependencies, no API key. Two ways to run it, same tools:

- **Hosted** (nothing to install): `https://ui.minidev.pro/mcp`, Streamable HTTP.
- **Local** (stdio, Node 18.17+): `npx -y minidev-ui-mcp`, or `node mcp/server.mjs` from a clone of this repo.

## Hosted

```bash
# Claude Code
claude mcp add --transport http minidev-ui https://ui.minidev.pro/mcp
```

Cursor (`.cursor/mcp.json`): `{ "mcpServers": { "minidev-ui": { "url": "https://ui.minidev.pro/mcp" } } }`
VS Code (`.vscode/mcp.json`): `{ "servers": { "minidev-ui": { "type": "http", "url": "https://ui.minidev.pro/mcp" } } }`
Windsurf: `{ "mcpServers": { "minidev-ui": { "serverUrl": "https://ui.minidev.pro/mcp" } } }`
Codex (`~/.codex/config.toml`): `[mcp_servers.minidev-ui]` then `url = "https://ui.minidev.pro/mcp"`

## Local (stdio)

### Claude Code

```bash
claude mcp add minidev-ui -- npx -y minidev-ui-mcp
```

### Cursor

`.cursor/mcp.json` in your project (or `~/.cursor/mcp.json` for all projects):

```json
{
  "mcpServers": {
    "minidev-ui": {
      "command": "npx",
      "args": ["-y", "minidev-ui-mcp"]
    }
  }
}
```

### VS Code (GitHub Copilot agent mode)

`.vscode/mcp.json`:

```json
{
  "servers": {
    "minidev-ui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "minidev-ui-mcp"]
    }
  }
}
```

### Windsurf

`~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "minidev-ui": {
      "command": "npx",
      "args": ["-y", "minidev-ui-mcp"]
    }
  }
}
```

### Codex CLI

`~/.codex/config.toml`:

```toml
[mcp_servers.minidev-ui]
command = "npx"
args = ["-y", "minidev-ui-mcp"]
```

### Claude Desktop and other clients

Any client that runs stdio servers works with command `npx` and args `["-y", "minidev-ui-mcp"]`.

## Tools

| Tool | What it does |
|---|---|
| `search_components` | Fuzzy search by need ("date range picker", "pricing table with yearly toggle"). Typo tolerant. |
| `list_components` | Every component name by kind (`ui`, `block`, `motion`), or filtered by `category` (forms, charts, billing, ai-chat, ...) and `query`. |
| `get_component` | Description, install commands, npm and registry dependencies, props, import line, an example and the full source. |
| `get_example` | The documented usage examples for a component, ready to paste. |
| `get_design_rules` | Tokens, shadows, radius, motion springs, materials and the five laws. `topic`: all, tokens, materials, motion, laws. |
| `get_install_instructions` | Setup for `next`, `vite` or `remix` (React Router v7), with `method` `shadcn` (default) or `npm`. |

A typical agent run: `search_components` → `get_component` → `npx shadcn@latest add @minidev/<name>` → write the page following `get_design_rules`.

## Data and privacy

The server reads public files only: the registry at `https://ui.minidev.pro/r/*.json` and examples and design docs from the public GitHub repo. It sends nothing about your project. Responses are cached in memory for the session.

| Variable | Default | Meaning |
|---|---|---|
| `MINIDEV_UI_URL` | `https://ui.minidev.pro` | Registry host. |
| `MINIDEV_UI_SOURCE` | remote, then local | `local` reads only the repo files (when run inside the MiniDev UI repo); `remote` never reads local files. |

## Develop

From the MiniDev UI repo root:

```bash
node mcp/test.mjs                                   # self-test against public/r
claude mcp add minidev-ui-dev -- node "$PWD/mcp/server.mjs"   # use your working copy
```

`props-parser.mjs` is a copy of `tools/props-parser.mjs`; keep them in sync.
