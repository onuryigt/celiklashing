import { SITE, OFFICES, FOUNDED_YEAR } from './site'

/**
 * Her rotanın SEO verisi — TEK KAYNAK.
 *
 * Hem tarayıcıda `useSeo` hook'u hem de build sırasında çalışan prerender
 * eklentisi (vite.config.ts) bu dosyayı okur. Böylece bir sayfanın başlığı
 * iki ayrı yerde tutulmuyor ve birbirinden ayrışamıyor.
 *
 * Bu dosya bilerek saf veri: React, tarayıcı API'si ya da yan etkisi olan
 * hiçbir şey import etmiyor — Node tarafında da güvenle yüklenebilsin diye.
 */

export type PageSeo = {
  /** Site adı sonuna kendiliğinden eklenir. */
  title: string
  description: string
  /** Kanonik yol, örn. "/hizmetler". */
  path: string
  /** Paylaşım görseli yolu. Belirtilmezse /og-image.jpg. */
  image?: string
}

const years = new Date().getFullYear() - FOUNDED_YEAR
const cities = OFFICES.map((o) => `${o.district}/${o.city}`).join(' ve ')

/** Hizmet detay sayfaları. Anahtar = URL parçası. */
export const SERVICE_SEO: Record<string, PageSeo> = {
  'gemi-proje-lashing': {
    title: 'Gemi & Proje Lashing',
    description:
      'Deniz taşımacılığında gemi ve proje kargo lashing hizmeti. Ağır ve gabari dışı yükler için sertifikalı ekipmanla hesaplanmış sabitleme.',
    path: '/hizmetler/gemi-proje-lashing',
  },
  'arac-ustu-lashing': {
    title: 'Araç Üstü Lashing',
    description:
      'Karayolu taşımacılığında araç üstü yük sabitleme. Tır, römork ve lowbed yüklerinin güzergâh koşullarına göre bağlanması.',
    path: '/hizmetler/arac-ustu-lashing',
  },
  'konteyner-lashing': {
    title: 'Konteyner Lashing',
    description:
      'Konteyner içi yük sabitleme ve bağlama hizmeti. Yükün konteyner içinde hareket etmesini önleyen profesyonel lashing uygulaması.',
    path: '/hizmetler/konteyner-lashing',
  },
  'vci-koruma': {
    title: 'VCI Korozyon Koruma',
    description:
      'VCI (Volatile Corrosion Inhibitor) teknolojisiyle metal yüzeylerin korozyona karşı korunması. Uzun deniz yolculuklarında paslanma önleme.',
    path: '/hizmetler/vci-koruma',
  },
  sandiklama: {
    title: 'Sandıklama',
    description:
      'İhracat ve proje kargoları için ahşap sandıklama hizmeti. Hassas ve yüksek değerli ürünlere ölçüye özel koruyucu ambalaj.',
    path: '/hizmetler/sandiklama',
  },
  brandalama: {
    title: 'Brandalama',
    description:
      'Açık yüklerin hava koşullarından korunması için brandalama hizmeti. Yağmur, tuzlu su ve rüzgâra karşı örtüleme.',
    path: '/hizmetler/brandalama',
  },
}

/** Statik sayfalar. */
export const PAGE_SEO = {
  home: {
    title: 'Gemi, Konteyner ve Araç Üstü Lashing',
    description: SITE.description,
    path: '/',
  },
  services: {
    title: 'Hizmetlerimiz',
    description:
      'Gemi ve proje lashing, araç üstü lashing, konteyner lashing, VCI korozyon koruma, sandıklama ve brandalama hizmetleri.',
    path: '/hizmetler',
  },
  about: {
    title: 'Hakkımızda',
    description: `${FOUNDED_YEAR} yılında İstanbul'da kurulan ${SITE.name}, ${years} yıldır denizcilik ve yük sabitleme sektöründe hizmet veriyor.`,
    path: '/hakkimizda',
  },
  gallery: {
    title: 'Galeri',
    description:
      'Çelik Lashing saha operasyonlarından fotoğraflar: gemi, konteyner ve araç üstü lashing uygulamaları.',
    path: '/galeri',
  },
  contact: {
    title: 'İletişim',
    description: `${SITE.shortName} ile iletişime geçin. ${cities}. Telefon: ${SITE.phone}`,
    path: '/iletisim',
  },
  kvkk: {
    title: 'KVKK Aydınlatma Metni',
    description:
      'Çelik Lashing & Port Services kişisel verilerin korunması ve işlenmesi politikası.',
    path: '/kvkk',
  },
  cookies: {
    title: 'Çerez Politikası',
    description:
      'Çelik Lashing & Port Services web sitesinde kullanılan çerezler hakkında bilgilendirme.',
    path: '/cerez-politikasi',
  },
} satisfies Record<string, PageSeo>

/** Prerender edilecek tüm rotalar. Sitemap ile aynı listeyi kapsar. */
export const ALL_ROUTES: PageSeo[] = [
  ...Object.values(PAGE_SEO),
  ...Object.values(SERVICE_SEO),
]
