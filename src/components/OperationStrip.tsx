import React from 'react'
import { motion } from 'framer-motion'

/**
 * Operasyon şeridi — gerçek saha fotoğrafları, sinematik renk düzeltmesiyle.
 *
 * Yatay kaydırılan, kaydırma-kilitli (scroll-snap) beş kart: dört adım ve bir
 * sonuç kartı. Fotoğraflar canlı sitedeki gerçek çekimler; "sinema" hissi
 * yalnızca CSS filtresi ve degrade ile veriliyor, görsel dosyaları aynı.
 */
const STEPS = [
  {
    img: '/hero1-sm.webp',
    alt: 'Sahada iki Çelik Lashing çalışanı, arka planda vinç ve konteyner',
    k: 'Yük analizi',
    h: 'Ağırlık merkezi, tonaj, güzergâh.',
    p: 'Yük ve yolculuk koşulları birlikte okunur; kayış mı zincir mi, kaç nokta, hangi açı.',
  },
  {
    img: '/services/arac-ustu-lashing.webp',
    alt: 'Araç üstünde turuncu kayışlarla sabitlenmiş ağır makine parçaları',
    k: 'Bağlama planı',
    h: 'Nokta, açı, ekipman.',
    p: 'Sertifikalı kayış ve zincirler; her nokta yükün geometrisine göre yerleştirilir.',
  },
  {
    img: '/services/gemi-proje-lashing.webp',
    alt: 'Gemi ambarında lashing zincirleriyle sabitlenmiş sac rulolar',
    k: 'Sabitleme',
    h: 'Hesaplanmış gerginlik.',
    p: 'Ne gevşek ne aşırı: STF ve LC değerleri yüke göre ayarlanır.',
  },
  {
    img: '/hero2-sm.webp',
    alt: 'Konteyner sahasında saha ekibi kontrol yaparken',
    k: 'Son kontrol',
    h: 'Her nokta, tek tek.',
    p: 'Teslimden önce bağlantılar doğrulanır; kayıt altına alınır.',
  },
]

const OperationStrip: React.FC = () => (
  <section id="operasyon" className="border-t border-white/[.08] bg-night py-20 text-white md:py-32">
    <div className="container">
      <div className="mb-10 grid grid-cols-[auto_1fr] items-start gap-5 md:mb-14">
        <span className="pt-[clamp(.7em,1.6vw,1.4em)] font-mono text-[11px] tracking-[.14em] text-hazard-light">01</span>
        <div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.6rem)] font-light leading-[.98] text-white">
            Her seferinde aynı sıra.
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] text-white/65">
            Ağırlık merkezi okunur, bağlama noktaları belirlenir, hesaplanmış gerginlikte sabitlenir,
            teslimden önce her nokta tek tek kontrol edilir. Aşağıdakiler gerçek saha fotoğrafları.
          </p>
        </div>
      </div>
    </div>

    <div
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1rem,calc((100vw-80rem)/2+1rem))] pb-6 [scrollbar-color:rgba(255,255,255,.16)_transparent] [scrollbar-width:thin]"
      tabIndex={0}
      aria-label="Operasyon adımları, yatay kaydırılabilir"
    >
      {STEPS.map((s, i) => (
        <motion.article
          key={s.k}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.85, 0.25, 1] }}
          className="group relative aspect-[4/3] w-[min(78vw,520px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[.08] bg-night-panel"
        >
          <img
            src={s.img}
            alt={s.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover brightness-[.86] contrast-[1.08] saturate-[.72] transition-transform duration-700 ease-tension group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(11,15,17,.9), rgba(11,15,17,.1) 55%), linear-gradient(135deg, rgba(79,182,174,.10), rgba(240,118,63,.10))',
            }}
          />
          <span className="absolute left-4 top-3.5 font-display text-[40px] font-light leading-none text-white/35" aria-hidden="true">
            {i + 1}
          </span>
          <div className="absolute inset-x-[18px] bottom-4">
            <div className="mb-1.5 font-mono text-[11px] uppercase tracking-label text-hazard-light">{s.k}</div>
            <h3 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-normal leading-tight text-white">{s.h}</h3>
            <p className="mt-1.5 max-w-[44ch] text-[13.5px] text-white/65">{s.p}</p>
          </div>
        </motion.article>
      ))}

      {/* Sonuç kartı — tipografik */}
      <article
        className="flex aspect-[4/3] w-[min(78vw,520px)] shrink-0 snap-start items-end rounded-2xl border border-white/[.08] p-[18px]"
        style={{ background: 'radial-gradient(120% 90% at 20% 0%, rgba(240,118,63,.14), transparent 60%), #121719' }}
      >
        <div>
          <div className="mb-1.5 font-mono text-[11px] uppercase tracking-label text-hazard-light">Sonuç</div>
          <h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1] text-white">
            Yük, yola çıktığı gibi varır.
          </h3>
          <p className="mt-2 text-[13.5px] text-white/65">Gerilim; güvenin ölçülebilir hâli.</p>
        </div>
      </article>
    </div>
  </section>
)

export default OperationStrip
