import type { NextConfig } from "next";

/* Files agents fetch directly: readable as text, from any origin, briefly cached. */
const agentText = (type: string) => [
  { key: "Content-Type", value: `${type}; charset=utf-8` },
  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "Cache-Control", value: "public, max-age=600, stale-while-revalidate=86400" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Social card fonts are read from disk at request time; ship them with every route.
  outputFileTracingIncludes: {
    "/**": ["./assets/fonts/**"],
  },
  async rewrites() {
    // afterFiles: runs before dynamic routes, so /docs/button.md never reaches /docs/[name].
    return [{ source: "/docs/:name([a-z0-9-]+)\\.md", destination: "/docs/:name/md" }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // SAMEORIGIN, not DENY, so our own pages can still preview each other in an iframe.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), payment=(), usb=()" },
        ],
      },
      // Mirrored in netlify.toml: on Netlify, public/ files are served by the CDN and skip these.
      { source: "/:file(llms|llms-full)\\.txt", headers: agentText("text/plain") },
      { source: "/AGENTS.md", headers: agentText("text/markdown") },
      { source: "/skill/:path(.+\\.md)", headers: agentText("text/markdown") },
      { source: "/rules/:file(.+\\.mdc)", headers: agentText("text/markdown") },
      {
        source: "/r/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=600, stale-while-revalidate=86400" },
          // Registry JSON is for the shadcn CLI, not search results.
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
      { source: "/docs/:name([a-z0-9-]+)\\.md", headers: [{ key: "Access-Control-Allow-Origin", value: "*" }] },
      { source: "/docs/:name/md", headers: [{ key: "Access-Control-Allow-Origin", value: "*" }] },
    ];
  },
};

export default nextConfig;
