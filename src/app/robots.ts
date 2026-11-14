import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"

/** AI crawlers and agent fetchers, named so the welcome is explicit rather than implied by `*`. */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Meta-ExternalAgent",
  "MistralAI-User",
  "DuckAssistBot",
  "cohere-ai",
]

export default function robots(): MetadataRoute.Robots {
  // The playground mirrors /docs; keep crawlers on the canonical pages.
  // A crawler that matches a named group ignores `*`, so each group repeats the rule.
  const disallow = ["/playground/"]
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      {
        userAgent: AI_AGENTS,
        allow: "/",
        disallow,
        // robots.txt has no llms.txt field; a comment line points agents at it without confusing parsers.
        other: { "# Docs for LLMs": [`${SITE.url}/llms.txt`, `${SITE.url}/llms-full.txt`, `${SITE.url}/docs/<name>.md`] },
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
