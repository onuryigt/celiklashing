import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Kaydırmaya bağlı yükleme sahnesi.
 *
 * Eski ana sayfada bu bölgedeki konteyner ve halat görselleri
 * `top: 3050px`, `left: 1380px` gibi elle yazılmış koordinatlarla duruyordu;
 * metin bir satır uzayınca ya da ekran genişliği değişince yerinden kayıyordu.
 *
 * Burada hareket, bölümün ekrandaki kaydırma ilerlemesine bağlı. Hiçbir sabit
 * piksel değeri yok, dolayısıyla her ekran boyutunda kendini hizalıyor.
 */
const LoadingScene: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Konteyner yığını aşağı iner ve yerine oturur.
  const stackY = useTransform(scrollYProgress, [0, 0.55], ['-14%', '0%'])
  const stackScale = useTransform(scrollYProgress, [0, 0.55], [0.94, 1])
  // Kayışlar yığın oturduktan sonra gerilir.
  const strapScale = useTransform(scrollYProgress, [0.3, 0.62], [0, 1])
  const bandOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])

  return (
    <section ref={ref} className="relative bg-steel-100 py-20 md:py-28 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <span className="eyebrow">Nasıl çalışıyoruz</span>
            <h2 className="text-3xl md:text-5xl mt-3">
              Yük yerine oturur,
              <br />
              sonra <span className="text-hazard">gerilir.</span>
            </h2>
            <p className="mt-5 text-steel-600 leading-relaxed">
              Her operasyonda sıra aynı: yükün ağırlık merkezi ve yolculuk koşulları
              değerlendirilir, uygun bağlama noktaları belirlenir, ardından sertifikalı
              kayış ve zincirlerle hesaplanmış gerginlikte sabitlenir. Teslimden önce
              her bağlantı noktası tek tek kontrol edilir.
            </p>

            <ol className="mt-8 space-y-4">
              {[
                ['01', 'Yük analizi', 'Ağırlık merkezi, tonaj ve güzergâh koşulları.'],
                ['02', 'Bağlama planı', 'Uygun ekipman ve bağlantı noktalarının belirlenmesi.'],
                ['03', 'Sabitleme', 'Hesaplanmış gerginlikte kayış, zincir ve gergi uygulaması.'],
                ['04', 'Son kontrol', 'Her bağlantının teslim öncesi tek tek doğrulanması.'],
              ].map(([n, title, desc], i) => (
                <motion.li
                  key={n}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0.85, 0.3, 1] }}
                  className="flex gap-4"
                >
                  <span className="label text-hazard pt-1 shrink-0">{n}</span>
                  <span>
                    <strong className="block text-steel-900 font-semibold text-[15px]">{title}</strong>
                    <span className="text-sm text-steel-600">{desc}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Sahne */}
          <div className="relative aspect-[815/860] max-w-md w-full mx-auto lg:mx-0 lg:ml-auto">
            {/* Güverte */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: reduce ? 1 : bandOpacity }}
              className="absolute inset-x-0 bottom-8 h-px bg-steel-400"
            />

            <motion.img
              src="/container-stack.webp"
              alt="Çelik Lashing markalı konteyner yığını"
              loading="lazy"
              decoding="async"
              width={815}
              height={860}
              style={reduce ? undefined : { y: stackY, scale: stackScale }}
              className="relative z-10 w-full h-full object-contain object-bottom"
            />

            {/* Yığının üzerinden geçen kayışlar — yığın oturduktan sonra gerilir */}
            <div aria-hidden="true" className="absolute inset-0 z-20 pointer-events-none">
              {[
                { top: '38%', delayScale: strapScale },
                { top: '62%', delayScale: strapScale },
              ].map((s, i) => (
                <motion.span
                  key={i}
                  style={{ top: s.top, scaleX: reduce ? 1 : s.delayScale }}
                  className="absolute left-[7%] right-[7%] h-2.5 bg-hazard origin-left rounded-[1px] shadow-sm"
                />
              ))}
              {/* Tokalar */}
              {['38%', '62%'].map((top) => (
                <motion.span
                  key={top}
                  style={{ top, scale: reduce ? 1 : strapScale }}
                  className="absolute left-1/2 w-5 h-5 -ml-2.5 -mt-1.5 bg-hazard border-2 border-white rotate-45"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoadingScene
