/**
 * Kanıt bölümünün verisi.
 *
 * ÖNEMLİ: `clients` ve `cases` bilerek BOŞ bırakıldı. Buraya yalnızca
 * gerçekten çalıştığınız firmalar ve gerçekten yaptığınız işler yazılmalı;
 * uydurma referans hem yanıltıcı olur hem de sorulduğunda firmayı zor durumda
 * bırakır. Doldurulmayan bloklar sitede hiç görünmüyor, boş çerçeve kalmıyor.
 *
 * Nasıl doldurulur:
 *   clients: [{ name: 'Firma Adı', logo: '/clients/firma.webp' }, ...]
 *            (logo isteğe bağlı; yoksa yalnızca isim yazı olarak görünür)
 *   cases:   [{ title, cargo, port, solution }, ...]
 */

export type Client = { name: string; logo?: string }
export type CaseStudy = {
  title: string
  /** Taşınan yük, örn. "420 ton jeneratör gövdesi". */
  cargo: string
  /** Liman veya güzergâh, örn. "Ambarlı → Cezayir". */
  port: string
  /** Uygulanan çözüm, örn. "Zincir lashing + VCI koruma". */
  solution: string
}

/** Çalışılan firmalar. Doldurulana kadar bu bölüm sitede görünmez. */
export const CLIENTS: Client[] = []

/** Örnek projeler. Doldurulana kadar bu bölüm sitede görünmez. */
export const CASES: CaseStudy[] = []

/**
 * Yetkinlik ve standartlar — bu maddeler Hakkımızda sayfasında zaten
 * beyan edilen bilgilerden alındı, yeni bir iddia eklenmedi.
 */
export const STANDARDS = [
  {
    title: 'ISO kalite standartları',
    description:
      'Yönetim sistemlerimiz uluslararası ISO kalite standartları çerçevesinde yapılandırılmıştır.',
  },
  {
    title: 'İSG politikaları',
    description:
      'Saha operasyonları kapsamlı iş sağlığı ve güvenliği politikaları çerçevesinde yürütülür.',
  },
  {
    title: 'Çevre yönetimi',
    description:
      'Sürdürülebilir çevre yönetimi yaklaşımı tüm operasyon süreçlerimize dahildir.',
  },
  {
    title: 'Sertifikalı ekipman',
    description:
      'Kayış, zincir ve gergi ekipmanları düzenli bakım ve kontrol altında tutulur.',
  },
] as const
