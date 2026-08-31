import { useEffect } from 'react'
import { SITE } from '../config/site'

type SeoOptions = {
  /** Sayfaya özel başlık. Site adı sonuna kendiliğinden eklenir. */
  title: string
  description?: string
  /** Kanonik yol, örn. "/hizmetler". */
  path?: string
  /** Paylaşım görseli yolu, örn. "/og-image.jpg". */
  image?: string
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Sayfa başlığını ve paylaşım etiketlerini route'a göre günceller.
 *
 * Site tek sayfa uygulaması olduğu için `index.html`'deki etiketler her yolda
 * aynı kalıyordu; Google ve WhatsApp her sayfayı ana sayfa sanıyordu.
 */
export function useSeo({ title, description, path, image }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE.shortName}`
    const desc = description ?? SITE.description
    const url = `${SITE.url}${path ?? window.location.pathname}`
    const img = `${SITE.url}${image ?? '/og-image.jpg'}`

    document.title = fullTitle

    setMeta('meta[name="description"]', 'name', 'description', desc)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:image"]', 'property', 'og:image', img)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, path, image])
}
