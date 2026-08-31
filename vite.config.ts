import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { ALL_ROUTES, type PageSeo } from './src/config/seo'
import { SITE } from './src/config/site'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Build sonrası her rota için gerçek statik HTML üretir.
 *
 * Neden gerekli: site tek sayfa uygulaması, yani başlık ve paylaşım
 * etiketlerini JavaScript yazıyor. WhatsApp, Facebook, LinkedIn ve X'in
 * önizleme botları JavaScript ÇALIŞTIRMAZ — hangi sayfa paylaşılırsa
 * paylaşılsın hepsi ana sayfanın etiketlerini görüyordu. Ham HTML'deki
 * canonical de her adreste "/" gösteriyordu.
 *
 * Neden tarayıcısız: yaygın prerender eklentileri build sırasında Chromium
 * indirir; Vercel'in build ortamında tarayıcı yok ve bu adım kırılgan olur.
 * Etiketleri doğrudan HTML'e yazmak botların ihtiyaç duyduğu her şeyi
 * karşılıyor, hiçbir ek bağımlılık gerektirmiyor.
 *
 * Rota verisi src/config/seo.ts'ten geliyor — tarayıcıdaki useSeo hook'u ile
 * aynı kaynak, dolayısıyla ikisi birbirinden ayrışamıyor.
 */
function prerenderPlugin(): Plugin {
  return {
    name: 'celik-prerender',
    apply: 'build',
    closeBundle() {
      const outDir = resolve(process.cwd(), 'dist')
      const shell = readFileSync(join(outDir, 'index.html'), 'utf8')

      /**
       * Bir eşleşmeyi değiştirir; bulamazsa build'i KIRAR.
       *
       * İlk sürümde etiketler `index.html` içinde çok satırlı yazıldığı için
       * regex eşleşmemiş ve açıklamalar sessizce tüm rotalarda aynı kalmıştı.
       * Sessiz başarısızlık, yanlış sonuçtan daha kötü — o yüzden artık patlıyor.
       */
      const replaceOnce = (html: string, re: RegExp, to: string, label: string) => {
        if (!re.test(html)) {
          throw new Error(
            `prerender: "${label}" etiketi index.html icinde bulunamadi. ` +
              `Etiket silindiyse ya da bicimi degistiyse vite.config.ts guncellenmeli.`,
          )
        }
        return html.replace(re, to)
      }

      /** Nitelikler arasi bosluk ve satir sonlarina toleransli meta deseni. */
      const metaRe = (attr: 'name' | 'property', key: string) =>
        new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[\\s\\S]*?(")`)

      const render = (page: PageSeo) => {
        const title = `${page.title} | ${SITE.shortName}`
        const url = `${SITE.url}${page.path === '/' ? '/' : page.path}`
        const image = `${SITE.url}${page.image ?? '/og-image.jpg'}`

        let html = shell
        html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`, 'title')
        html = replaceOnce(html, metaRe('name', 'description'), `$1${esc(page.description)}$2`, 'description')
        html = replaceOnce(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${esc(url)}$2`, 'canonical')
        html = replaceOnce(html, metaRe('property', 'og:url'), `$1${esc(url)}$2`, 'og:url')
        html = replaceOnce(html, metaRe('property', 'og:title'), `$1${esc(title)}$2`, 'og:title')
        html = replaceOnce(html, metaRe('property', 'og:description'), `$1${esc(page.description)}$2`, 'og:description')
        html = replaceOnce(html, metaRe('property', 'og:image'), `$1${esc(image)}$2`, 'og:image')

        // JavaScript çalıştırmayan ziyaretçi ve botlar için sayfanın özeti.
        // İçerik, sayfanın kendi başlığı ve açıklamasıyla birebir aynı.
        const nav = ALL_ROUTES.filter((r) => r.path !== page.path)
          .map((r) => `<li><a href="${r.path}">${esc(r.title)}</a></li>`)
          .join('')
        const noscript =
          `<noscript><h1>${esc(page.title)}</h1><p>${esc(page.description)}</p>` +
          `<p>${esc(SITE.name)} — ${esc(SITE.phone)} — ${esc(SITE.email)}</p>` +
          `<nav><ul>${nav}</ul></nav></noscript>`

        return html.replace('<div id="root"></div>', `<div id="root"></div>${noscript}`)
      }

      let count = 0
      for (const page of ALL_ROUTES) {
        // Ana sayfa dist/index.html'in kendisi; digerleri kendi klasorune.
        const file =
          page.path === '/'
            ? join(outDir, 'index.html')
            : join(outDir, page.path.replace(/^\//, ''), 'index.html')
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, render(page), 'utf8')
        count++
      }

      // Sitemap de ayni rota listesinden uretiliyor; elle tutulan bir kopya
      // olmadigi icin rotalarla arasi acilamaz.
      const priority = (p: string) =>
        p === '/' ? '1.0' : ['/hizmetler', '/iletisim'].includes(p) ? '0.9' : '0.7'
      const today = new Date().toISOString().slice(0, 10)
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...ALL_ROUTES.map((r) =>
          [
            '  <url>',
            `    <loc>${SITE.url}${r.path === '/' ? '/' : r.path}</loc>`,
            `    <lastmod>${today}</lastmod>`,
            '    <changefreq>monthly</changefreq>',
            `    <priority>${priority(r.path)}</priority>`,
            '  </url>',
          ].join('\n'),
        ),
        '</urlset>',
        '',
      ].join('\n')
      writeFileSync(join(outDir, 'sitemap.xml'), sitemap, 'utf8')

      this.info?.(`prerender: ${count} rota + sitemap yazildi`)
      console.log(`\n  prerender: ${count} rota icin statik HTML + sitemap.xml uretildi`)
    },
  }
}

// Not: daha önce hem `vite.config.js` hem `vite.config.ts` vardı ve farklı
// ayarlar içeriyorlardı (biri alias, diğeri `external`). `.js` olan silindi;
// geçerli yapılandırma yalnızca bu dosya.
export default defineConfig({
  plugins: [react(), prerenderPlugin()],
  build: {
    // Firebase SDK'sı tek başına paketin yarısından fazlasıydı. Ayrı parçalara
    // bölününce ana sayfa Firebase'i beklemeden açılıyor.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
