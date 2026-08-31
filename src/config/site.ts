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

export const SITE = {
  name: 'ÇELİK LASHING & PORT SERVICES',
  shortName: 'Çelik Lashing',
  /** Kanonik adres — farklıysa yalnızca burayı değiştirmek yeterli. */
  url: 'https://www.celiklashing.com',
  description:
    'Gemi ve proje lashing, konteyner lashing, araç üstü lashing, VCI korozyon koruma, ' +
    'sandıklama ve brandalama hizmetleri. 2000’den bu yana Pendik, İstanbul.',
  phone: '+90 216 592 88 65',
  phoneHref: '+902165928865',
  whatsapp: '905462553676',
  email: 'info@celiklashing.com',
  corporateMail: 'https://mail.google.com/a/celiklashing.com',
  address: {
    street: 'Yenişehir Mahallesi Osmanlı Bulvarı, Sümbül Sokak No:10 D:174, Starport Residence',
    district: 'Pendik',
    city: 'İstanbul',
    country: 'TR',
    postalCode: '34912',
  },
  social: {
    facebook:
      'https://www.facebook.com/people/%C3%87elik-Denizcilik-Konteyner-ve-Liman-Hizmetleri/100063509494638/',
    instagram: 'https://www.instagram.com/celikdenizcilik/',
    linkedin: 'https://tr.linkedin.com/in/%C3%A7etin-%C3%A7elik-a65798160',
  },
} as const

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
