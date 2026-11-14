# Security

If you find a security issue in MiniDev UI, please email **aman@minidev.pro** instead of opening a public issue. Include steps to reproduce. You will get a reply within a few days.

In scope:

- Component source in `src/registry` (for example XSS through a prop that renders HTML, or unsafe URL handling).
- The npm package `minidev-ui-kit` and the MCP server in `mcp/` (`minidev-ui-mcp`).
- The registry and agent files served from ui.minidev.pro: `/r/*.json`, `/llms.txt`, `/llms-full.txt`, `/AGENTS.md`, `/docs/<name>.md`. Agents and the shadcn CLI install code from these, so tampered or injected content there is a security issue.
- The site ui.minidev.pro itself.

Fixes land in the latest version of each package and on the site.
