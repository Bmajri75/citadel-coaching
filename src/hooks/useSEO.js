import { useEffect } from 'react'

export function useSEO({ title, description, canonical, structuredData }) {
  useEffect(() => {
    document.title = title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)

    if (canonical) {
      const link = document.querySelector('link[rel="canonical"]')
      if (link) link.setAttribute('href', canonical)
    }

    if (structuredData) {
      let sd = document.querySelector('script[data-page-schema]')
      if (!sd) {
        sd = document.createElement('script')
        sd.type = 'application/ld+json'
        sd.setAttribute('data-page-schema', '')
        document.head.appendChild(sd)
      }
      sd.textContent = JSON.stringify(structuredData)
    }

    return () => {
      const sd = document.querySelector('script[data-page-schema]')
      if (sd) sd.remove()
    }
  }, [title, description, canonical, structuredData])
}
