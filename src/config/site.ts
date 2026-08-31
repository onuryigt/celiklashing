/**
 * Firmaya ait tüm sabit bilgilerin tek kaynağı.
 *
 * Daha önce "25+ yıl" (Ana Sayfa) ve "23+ yıl" (Hakkımızda) gibi elle yazılmış
 * ve birbirini tutmayan değerler vardı. Deneyim yılı artık kuruluş yılından
 * hesaplanıyor, dolayısıyla her yıl kendiliğinden güncelleniyor.
 */

export const FOUNDED_YEAR = 2000

/** Kuruluşundan bugüne geçen tam yıl. */
export const yearsInBusiness = (): number =>
  new Date().getFullYear() - FOUNDED_YEAR

export type Office = {
  id: string
  /** Kartlarda gorunen ad, orn. "Merkez Ofis" / "Ankara Sube". */
  label: string
  street: string
  district: string
  city: string
  postalCode?: string
  /** Bu ofise ait numara. Bos birakilirsa SITE.phone kullanilir. */
  phone?: string
}

/**
 * Ofisler. İlk sıradaki kayıt "merkez" sayılır; yapılandırılmış veride,
 * footer'da ve iletişim sayfasında bu sıra kullanılır.
 *
 * Bir adres değiştiğinde yalnızca burası güncellenir: footer, iletişim
 * sayfası, harita gömmesi ve Google yapılandırılmış verisi kendiliğinden
 * takip eder.
 */
export const OFFICES: Office[] = [
  {
    id: 'merkez',
    label: 'Merkez Ofis',
    street: 'Kurtköy Mahallesi, Düzenli Sokak No:4/B',
    district: 'Pendik',
    city: 'İstanbul',
  },
  {
    id: 'ankara',
    label: 'Ankara Şubesi',
    street: 'Yunus Emre Mahallesi, Canlı Sokak, Akşen Sitesi J/7 Blok No:12',
    district: 'Fatih Sincan',
    city: 'Ankara',
  },
]

/** Bir ofisin tek satırlık, haritada aranabilir tam adresi. */
export const formatAddress = (o: Office): string =>
  `${o.street}, ${o.district}/${o.city}${o.postalCode ? ' ' + o.postalCode : ''}, Türkiye`

/** API anahtarı gerektirmeyen Google Haritalar gömme adresi. */
export const mapEmbedUrl = (o: Office): string =>
  `https://maps.google.com/maps?q=${encodeURIComponent(formatAddress(o))}&hl=tr&z=16&output=embed`

export const SITE = {
  name: 'ÇELİK LASHING & PORT SERVICES',
  shortName: 'Çelik Lashing',
  /** Kanonik adres — farklıysa yalnızca burayı değiştirmek yeterli. */
  url: 'https://www.celiklashing.com',
  description:
    'Gemi ve proje lashing, konteyner lashing, araç üstü lashing, VCI korozyon koruma, ' +
    'sandıklama ve brandalama hizmetleri. 2000’den bu yana İstanbul ve Ankara’da.',
  phone: '+90 216 592 88 65',
  phoneHref: '+902165928865',
  whatsapp: '905462553676',
  email: 'info@celiklashing.com',
  corporateMail: 'https://mail.google.com/a/celiklashing.com',

  social: {
    facebook:
      'https://www.facebook.com/people/%C3%87elik-Denizcilik-Konteyner-ve-Liman-Hizmetleri/100063509494638/',
    instagram: 'https://www.instagram.com/celikdenizcilik/',
    linkedin: 'https://tr.linkedin.com/in/%C3%A7etin-%C3%A7elik-a65798160',
  },
} as const

/** Merkez ofis — OFFICES listesinin ilk kaydı. */
export const HQ = OFFICES[0]

/** Ana sayfadaki sayaçlar. `value` sayısal, sayaç animasyonu bunu sayıyor. */
export const STATS = [
  { label: 'Yıllık Deneyim', value: yearsInBusiness(), suffix: '+' },
  { label: 'Başarılı Proje', value: 1000, suffix: '+' },
  { label: 'Mutlu Müşteri', value: 600, suffix: '+' },
  { label: 'Uzman Ekip', value: 20, suffix: '+' },
] as const

export const SERVICE_IDS = [
  'gemi-proje-lashing',
  'arac-ustu-lashing',
  'konteyner-lashing',
  'vci-koruma',
  'sandiklama',
  'brandalama',
] as const

export type ServiceId = (typeof SERVICE_IDS)[number]
