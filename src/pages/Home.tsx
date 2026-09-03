import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Grain from '../components/Grain'
import TensionHero from '../components/TensionHero'
import OperationStrip from '../components/OperationStrip'
import ServiceTile from '../components/ServiceTile'
import CountUp from '../components/CountUp'
import ProofStrip from '../components/ProofStrip'
import { STATS, OFFICES } from '../config/site'
import { PAGE_SEO } from '../config/seo'
import { useSeo } from '../hooks/useSeo'

/** Ana sayfadaki altı hizmet. Fotoğrafı olmayanlar tipografik kare. */
const TILES = [
  { id: 'gemi-proje-lashing', label: 'Deniz', title: 'Gemi & Proje Lashing', image: '/services/gemi-proje-lashing.webp' },
  { id: 'arac-ustu-lashing', label: 'Kara', title: 'Araç Üstü Lashing', image: '/services/arac-ustu-lashing.webp' },
  { id: 'konteyner-lashing', label: 'Konteyner', title: 'Konteyner Lashing', image: '/services/konteyner-lashing.webp' },
  { id: 'vci-koruma', label: 'Koruma', title: 'VCI Korozyon Koruma' },
  { id: 'sandiklama', label: 'Ambalaj', title: 'Sandıklama' },
  { id: 'brandalama', label: 'Örtü', title: 'Brandalama', image: '/services/brandalama.webp' },
]

/** Bölüm başlığı — sinema kaydı. Numara, içerik gerçekten sıralı olduğu için var. */
const Head: React.FC<{ n: string; title: string; text?: string }> = ({ n, title, text }) => (
  <div className="mb-10 grid grid-cols-[auto_1fr] items-start gap-5 md:mb-14">
    <span className="pt-[clamp(.7em,1.6vw,1.4em)] font-mono text-[11px] tracking-[.14em] text-hazard-light">{n}</span>
    <div>
      <h2 className="font-display text-[clamp(2.2rem,5vw,4.6rem)] font-light leading-[.98] text-white">{title}</h2>
      {text && <p className="mt-3 max-w-[62ch] text-[15.5px] text-white/65">{text}</p>}
    </div>
  </div>
)

/**
 * Ana sayfa — sinema kaydı.
 *
 * Karanlık liman zemini, tek doygun renk (emniyet turuncusu), kaydırmayla
 * ilerleyen gerilim sahnesi. İçerik sayfaları (hizmet detayı, iletişim, KVKK)
 * ışıklı "ofis" kaydında kalır; fontlar, turuncu ve bileşenler ortak.
 */
const Home: React.FC = () => {
  useSeo(PAGE_SEO.home)

  return (
    <div className="bg-night text-white">
      <Grain />

      {/* 00 · Hero + gerilim sekansı */}
      <TensionHero />

      {/* 01 · Operasyon */}
      <OperationStrip />

      {/* 02 · Sayılar */}
      <section className="border-t border-white/[.08] bg-night py-20 md:py-32">
        <div className="container">
          <Head n="02" title="Rakamlar sessiz konuşur." />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.08] lg:grid-cols-4">
            {[
              ...STATS.slice(0, 3).map((s) => ({ v: s.value, suf: s.suffix, k: s.label, sub: '' })),
              { v: OFFICES.length, suf: '', k: 'Ofis', sub: OFFICES.map((o) => `${o.city}`).join(' · ') },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-night p-6 md:p-7"
              >
                <div className="font-display text-[clamp(3rem,7vw,6rem)] font-light leading-[.95] tabular text-white">
                  <CountUp to={s.v} delay={i * 110} />
                  {s.suf && <span className="ml-0.5 align-top text-[.5em] text-hazard-light">{s.suf}</span>}
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-label text-white/45">{s.k}</div>
                {s.sub && <div className="mt-1 text-[13px] text-white/65">{s.sub}</div>}
                <motion.i
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: [0.2, 0.8, 0.25, 1] }}
                  className="mt-4 block h-0.5 origin-left bg-hazard-light"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · Hizmetler */}
      <section className="border-t border-white/[.08] bg-night py-20 md:py-32">
        <div className="container">
          <Head
            n="03"
            title="Yükünüz hangi yoldan giderse gitsin."
            text="Altı hizmet, tek amaç. Karenin üstüne gelin — kayış gerilir, toka oturur."
          />
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {TILES.map((t, i) => (
              <ServiceTile key={t.id} index={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* 04 · Saha — gerçek fotoğraf */}
      <section className="border-t border-white/[.08] bg-night py-20 md:py-32">
        <div className="container">
          <div className="relative flex min-h-[min(72vh,720px)] items-end overflow-hidden rounded-[18px] border border-white/[.08]">
            <img
              src="/hero3.webp"
              alt="Çelik Lashing saha ekibi liman sahasında"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover brightness-[.8] contrast-[1.1] saturate-[.7]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(11,15,17,.95), rgba(11,15,17,.15) 50%, rgba(11,15,17,.3))' }}
            />
            <span className="absolute right-4 top-4 z-[2] rounded-full border border-white/15 bg-night/60 px-3 py-2 font-mono text-[11px] uppercase tracking-label text-secure-light backdrop-blur-md">
              Gerçek fotoğraf · Pendik
            </span>
            <div className="relative z-[2] max-w-[720px] p-[clamp(24px,4vw,48px)]">
              <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-hazard-light">
                <span className="h-px w-8 bg-hazard-light" aria-hidden="true" />
                Saha
              </div>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[.98] text-white">
                Ekran değil, iskele.
              </h2>
              <p className="mt-3.5 max-w-[56ch] text-[15.5px] text-white/65">
                Üstteki illüstrasyon fikri anlatır; güveni bu fotoğraflar kurar. Gerçek ekip, gerçek
                operasyon — sadece ışığı ve rengi liman gecesine çekildi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · Standartlar (kanıt) */}
      <ProofStrip tone="dark" />

      {/* Kapanış */}
      <section
        className="border-t border-white/[.08] py-20 md:py-32"
        style={{ background: 'radial-gradient(80% 60% at 50% 100%, rgba(240,118,63,.12), transparent 60%), #0B0F11' }}
      >
        <div className="container">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-hazard-light">
              <span className="h-px w-8 bg-hazard-light" aria-hidden="true" />
              Teklif
            </div>
            <h2 className="font-display text-[clamp(2.6rem,7vw,6.4rem)] font-light leading-[.98] text-white">
              Yükünüzü anlatın.
            </h2>
            <p className="mt-4 max-w-[60ch] text-white/65">
              Tonaj, güzergâh, tarih. Gerisini biz hesaplarız. Aciliyeti olan operasyonlar için telefon en hızlısı.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link
                to="/iletisim"
                className="inline-flex items-center gap-2 rounded-full bg-hazard-light px-5 py-3 font-mono text-[11.5px] uppercase tracking-label text-[#160A05] transition-transform hover:-translate-y-px"
              >
                Teklif alın <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/hakkimizda"
                className="inline-flex items-center rounded-full border border-white/15 bg-night/60 px-5 py-3 font-mono text-[11.5px] uppercase tracking-label text-white backdrop-blur-md transition-transform hover:-translate-y-px"
              >
                Hakkımızda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
