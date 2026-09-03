import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { SITE, FOUNDED_YEAR } from '../config/site'

/** 0–1 arası bir ilerlemenin [a,b] dilimini 0–1'e çeker. */
const seg = (p: number, a: number, b: number) => Math.max(0, Math.min(1, (p - a) / (b - a)))
/** Hızlı başlayıp yumuşak duran eğri. */
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

const EASE_T = [0.2, 0.85, 0.25, 1] as const

/**
 * Gerilim sekansı — sinema kaydının açılış sahnesi.
 *
 * Tek pinlenmiş sahne: sayfa açılınca yük gelmiş ama bağlanmamış. Ziyaretçi
 * kaydırdıkça üç kayış sırayla gerilir, tokalar oturur, cam karttaki
 * telemetri dolar ve durum "Geldi → Bağlandı → Yola çıktı" olur.
 *
 * Hareket tamamen kaydırma ilerlemesine bağlı (framer `useScroll`), sabit
 * zamanlı animasyon yok. Hareket azaltma tercihi açıksa sahne son hâlinde
 * durur: kayışlar gergin, telemetri dolu.
 *
 * Kayış çizgileri görsel üzerindeki boyalı kayışların koordinatlarında;
 * SVG `preserveAspectRatio="xMidYMid slice"` ile `object-fit: cover` aynı
 * kırpmayı yaptığı için her ekran oranında üst üste düşerler.
 */
const TensionHero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // --- Kayışlar: her biri ilerlemenin kendi diliminde çizilir --------------
  const s1 = useTransform(scrollYProgress, [0.18, 0.38], [0, 1])
  const s2 = useTransform(scrollYProgress, [0.34, 0.54], [0, 1])
  const s3 = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
  const b1 = useTransform(scrollYProgress, [0.34, 0.44], [0, 1])
  const b2 = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
  const b3 = useTransform(scrollYProgress, [0.66, 0.76], [0, 1])
  const scan = useTransform(scrollYProgress, [0.1, 0.22, 0.78, 0.9], [0, 1, 1, 0])
  const copyO = useTransform(scrollYProgress, [0.22, 0.46], [1, 0])
  const copyY = useTransform(scrollYProgress, [0.22, 0.46], [0, 24])
  const hintO = useTransform(scrollYProgress, [0.02, 0.1], [1, 0])

  // --- Telemetri: sayı metinleri state ile, yalnızca değer değişince -------
  const [tele, setTele] = useState({ k: 0, stage: 0 })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const k = Math.round(ease(seg(p, 0.18, 0.74)) * 100) / 100
    const stage = p < 0.3 ? 0 : p < 0.78 ? 1 : 2
    setTele((prev) => (prev.k === k && prev.stage === stage ? prev : { k, stage }))
  })
  useEffect(() => {
    if (reduce) setTele({ k: 1, stage: 2 })
  }, [reduce])

  const fin = (mv: MotionValue<number>, v: number) => (reduce ? v : mv)
  const done = tele.stage === 2
  const lc = Math.round(2500 * tele.k)
  const stf = Math.round(500 * tele.k)
  const pts = Math.round(6 * tele.k)

  return (
    <div ref={ref} className="relative h-[330vh]">
      <section
        className="sticky top-0 h-screen max-h-[960px] overflow-hidden bg-night text-white"
        aria-label="Yükün sabitlenmesi"
      >
        {/* Sahne görseli */}
        <motion.img
          src="/hero-cine.webp"
          width={1280}
          height={714}
          alt="Alacakaranlıkta bir limanda, tır dorsesi üzerindeki konteyneri turuncu kayışlarla sabitleyen iki işçi (illüstrasyon)"
          loading="eager"
          decoding="async"
          initial={reduce ? false : { scale: 1.02 }}
          animate={{ scale: reduce ? 1 : 1.07 }}
          transition={{ duration: 16, ease: 'easeOut' }}
          className="absolute inset-0 h-full w-full object-cover object-center saturate-[.92] contrast-[1.05]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(11,15,17,.86) 0%, rgba(11,15,17,.42) 42%, rgba(11,15,17,.05) 70%),' +
              'linear-gradient(to top, rgba(11,15,17,.92) 0%, rgba(11,15,17,.25) 38%, rgba(11,15,17,.35) 100%)',
          }}
        />

        {/* Kayış vurguları — görselle aynı kırpma */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1280 714"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <motion.path
            d="M470 232 L836 232 L836 500 L470 500 Z"
            fill="none"
            stroke="rgba(255,255,255,.35)"
            strokeWidth="1"
            strokeDasharray="3 6"
            style={{ opacity: fin(scan, 0) }}
          />
          {(
            [
              [549, 236, 537, 496, s1],
              [663, 230, 663, 500, s2],
              [787, 238, 802, 496, s3],
            ] as const
          ).map(([x1, y1, x2, y2, mv], i) => (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#F0763F"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ pathLength: fin(mv, 1), filter: 'drop-shadow(0 0 6px rgba(240,118,63,.75))' }}
            />
          ))}
          {(
            [
              [538, 486, b1],
              [663, 490, b2],
              [801, 486, b3],
            ] as const
          ).map(([cx, cy, mv], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="7"
              fill="#F0763F"
              style={{ scale: fin(mv, 1), opacity: fin(mv, 1), transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ))}
        </svg>

        {/* İllüstrasyon notu — dürüstlük */}
        <p className="absolute left-[clamp(18px,4vw,56px)] top-[clamp(84px,14vh,140px)] z-10 hidden max-w-[30ch] font-mono text-[11px] leading-relaxed text-white/45 xl:block">
          <span className="text-white/70">İllüstrasyon</span> — bu sahne yapay zekâ ile üretildi, saha fotoğrafı
          değil. Gerçek ekip aşağıda. Telemetri örnektir.
        </p>

        {/* Cam telemetri kartı */}
        <aside
          aria-label="Örnek operasyon telemetrisi"
          className="absolute right-[clamp(18px,4vw,56px)] top-[clamp(84px,14vh,140px)] z-10 hidden w-[340px] rounded-2xl border border-white/15 bg-night/60 p-[18px] shadow-[0_20px_60px_-20px_rgba(0,0,0,.8)] backdrop-blur-xl lg:block"
        >
          <div className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-label text-white/45">
            <span>Operasyon · örnek</span>
            <span className="inline-flex items-center gap-1.5 text-secure-light">
              <i className="h-1.5 w-1.5 rounded-full bg-secure-light motion-safe:animate-ping" />
              canlı
            </span>
          </div>
          <h3 className="mb-3 font-sans text-[15px] font-medium leading-snug text-white">
            Araç üstü sabitleme — 20′ konteyner, 3 kayış
          </h3>
          <dl className="grid gap-2 text-[12.5px] text-white/65">
            {(
              [
                ['LC · bağ kapasitesi', lc.toLocaleString('tr-TR'), 'daN'],
                ['STF · ön gerilim', stf.toLocaleString('tr-TR'), 'daN'],
                ['Bağlantı noktası', String(pts), '/ 6'],
                ['Son kontrol', done ? '✓ tamam' : tele.stage === 1 ? 'sürüyor' : '—', ''],
              ] as const
            ).map(([k, v, u]) => (
              <div key={k} className="flex items-baseline justify-between gap-3">
                <dt>{k}</dt>
                <dd className="font-mono text-[13px] font-medium tabular text-white">
                  {v}
                  {u && <span className="ml-1 font-normal text-white/45">{u}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 h-[3px] overflow-hidden rounded bg-white/10" aria-hidden="true">
            <div
              className="h-full bg-gradient-to-r from-hazard to-hazard-light transition-[width] duration-200 ease-linear"
              style={{ width: `${tele.k * 100}%` }}
            />
          </div>
          <div className="mt-2.5 flex justify-between border-t border-white/10 pt-2.5 font-mono text-[11px] uppercase tracking-label text-white/45">
            <span>Durum</span>
            <span className={`transition-colors duration-500 ${done ? 'text-secure-light' : 'text-hazard-light'}`}>
              {done ? 'Yola hazır' : tele.stage === 1 ? 'Sabitleniyor' : 'Yükleniyor'}
            </span>
          </div>
        </aside>

        {/* Başlık — sekans ilerledikçe çekilir */}
        <motion.div
          style={{ opacity: fin(copyO, 1), y: fin(copyY, 0) }}
          className="absolute bottom-[clamp(28px,6vh,72px)] left-[clamp(18px,4vw,56px)] right-[clamp(18px,4vw,56px)] z-10 max-w-[880px]"
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-hazard-light">
            <span className="h-px w-8 bg-hazard-light" aria-hidden="true" />
            {FOUNDED_YEAR}’den beri · İstanbul &amp; Ankara
          </div>
          <h1 className="font-display text-[clamp(3rem,8.6vw,8.2rem)] font-light leading-[.98] text-white">
            {['Tonlarca yük.', 'Tek bir gevşek nokta yok.'].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE_T }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-[56ch] text-[clamp(15px,1.4vw,19px)] text-white/70">
            Gemi, konteyner ve araç üstü lashing. Sertifikalı ekip, hesaplanmış gerginlik, 7/24 saha operasyonu.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-2 rounded-full bg-hazard-light px-5 py-3 font-mono text-[11.5px] uppercase tracking-label text-[#160A05] transition-transform hover:-translate-y-px"
            >
              Teklif alın <span aria-hidden="true">→</span>
            </Link>
            <a
              href="#operasyon"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-night/60 px-5 py-3 font-mono text-[11.5px] uppercase tracking-label text-white backdrop-blur-md transition-transform hover:-translate-y-px"
            >
              Operasyonu izleyin
            </a>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="inline-flex items-center rounded-full border border-white/15 bg-night/60 px-5 py-3 font-mono text-[11.5px] tracking-label text-white backdrop-blur-md"
            >
              {SITE.phone}
            </a>
          </div>
        </motion.div>

        {/* Durum kelimeleri — sağdaki 76px, sabit WhatsApp düğmesine çarpmasın diye */}
        <div className="absolute bottom-[clamp(28px,6vh,72px)] right-[calc(clamp(18px,4vw,56px)+76px)] z-10 hidden text-right lg:block" aria-live="polite">
          <div className="mb-2 font-mono text-[11px] uppercase tracking-label text-white/45">Yükün durumu</div>
          <div className="relative h-[1.05em] font-display text-[clamp(2rem,4.2vw,4rem)] font-light leading-none">
            {['Geldi.', 'Bağlandı.', 'Yola çıktı.'].map((w, i) => (
              <span
                key={w}
                className={`absolute right-0 top-0 whitespace-nowrap transition-all duration-500 ${
                  tele.stage === i ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                } ${i === 2 ? 'text-secure-light' : 'text-white'}`}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Kaydırma ipucu */}
        <motion.div
          style={{ opacity: fin(hintO, 0) }}
          className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[11px] uppercase tracking-label text-white/45"
          aria-hidden="true"
        >
          <span>kaydır</span>
          <i className="h-7 w-px bg-gradient-to-b from-white/45 to-transparent" />
        </motion.div>
      </section>
    </div>
  )
}

export default TensionHero
