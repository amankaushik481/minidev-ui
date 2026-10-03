import Script from "next/script"

/** GA4 measurement IDs look like G-XXXXXXXXXX */
function gaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim()
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return undefined
  return id
}

/**
 * Production-only, opt-in analytics. IDs live in host env (e.g. Netlify), never in the repo.
 * Clones and local `npm run dev` do not load tags unless you set vars and run a production build.
 */
export function SiteAnalytics() {
  if (process.env.NODE_ENV !== "production") return null

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim()
  const gaId = gaMeasurementId()

  if (!plausibleDomain && !gaId) return null

  return (
    <>
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.outbound-links.js"
          strategy="afterInteractive"
        />
      ) : null}
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}</Script>
        </>
      ) : null}
    </>
  )
}
