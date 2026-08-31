import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FaShip, FaTruck, FaBox, FaShieldAlt, FaWarehouse, FaUmbrella } from 'react-icons/fa'
import LashingMark from '../components/LashingMark'
import LoadingScene from '../components/LoadingScene'
import ServiceCard from '../components/ServiceCard'
import CountUp from '../components/CountUp'
import ProofStrip from '../components/ProofStrip'
import { STATS, SITE, FOUNDED_YEAR } from '../config/site'
import { useSeo } from '../hooks/useSeo'

const services = [
  {
    id: 'gemi-proje-lashing',
    title: 'Gemi & Proje Lashing',
    description: 'Deniz taşımacılığında yüklerin güvenli şekilde bağlanması',
    Icon: FaShip,
  },
  {
    id: 'arac-ustu-lashing',
    title: 'Araç Üstü Lashing',
    description: 'Karayolu taşımacılığında yüklerin güvenli şekilde bağlanması',
    Icon: FaTruck,
  },
  {
    id: 'konteyner-lashing',
    title: 'Konteyner Lashing',
    description: 'Konteynerlerin güvenli şekilde bağlanması ve sabitlenmesi',
    Icon: FaWarehouse,
  },
  {
    id: 'vci-koruma',
    title: 'VCI Koruma',
    description: 'Metal yüzeylerin korozyona karşı korunması',
    Icon: FaShieldAlt,
  },
  {
    id: 'sandiklama',
    title: 'Sandıklama',
    description: 'Özel ürünler için güvenli paketleme çözümleri',
    Icon: FaBox,
  },
  {
    id: 'brandalama',
    title: 'Brandalama',
    description: 'Açık yüklerin hava koşullarından korunması',
    Icon: FaUmbrella,
  },
]

const heroSlides = [
  { src: '/hero1.webp', small: '/hero1-sm.webp' },
  { src: '/hero2.webp', small: '/hero2-sm.webp' },
  { src: '/hero3.webp', small: '/hero3-sm.webp' },
]

const Home: React.FC = () => {
  const [slide, setSlide] = useState(0)
  const reduce = useReducedMotion()

  useSeo({
    title: 'Gemi, Konteyner ve Araç Üstü Lashing',
    path: '/',
  })

  useEffect(() => {
    if (reduce) return
    const timer = window.setInterval(() => setSlide((p) => (p + 1) % heroSlides.length), 6000)
    return () => window.clearInterval(timer)
  }, [reduce])

  return (
    <div>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative min-h-[92vh] flex items-center text-white overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide}
            src={heroSlides[slide].src}
            srcSet={`${heroSlides[slide].small} 900w, ${heroSlides[slide].src} 1920w`}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            /* İlk kare hemen gerekiyor; sonrakiler döngüde geliyor.
               (fetchPriority prop'u React 19 ile geldi, bu proje React 18.) */
            loading={slide === 0 ? 'eager' : 'lazy'}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1 }, scale: { duration: 7, ease: 'linear' } }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Düz siyah yerine yönlü degrade — metin okunurluğu artıyor,
            fotoğraf tamamen boğulmuyor. */}
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900/90 via-steel-900/70 to-steel-900/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-steel-900/75 via-transparent to-steel-900/70" />

        <div className="container relative z-10 pt-28 pb-20">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="label text-hazard-light inline-block"
            >
              {FOUNDED_YEAR}’den beri · Pendik, İstanbul
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.85, 0.3, 1] }}
              className="text-white text-[clamp(2.5rem,6vw,4.5rem)] mt-4"
            >
              {/* Satır sonları kasıtlı: "yok." tek başına alta düşmesin. */}
              Tonlarca yük.
              <br />
              Tek bir gevşek
              <br />
              nokta yok.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed"
            >
              Gemi, konteyner ve araç üstü lashing — sertifikalı ekip, modern ekipman,
              7/24 saha operasyonu.
            </motion.p>

            {/* A1: halatlar gerilir, yük sabitlenir */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 max-w-lg"
            >
              <LashingMark tone="onDark" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link to="/iletisim" className="btn btn-primary">
                Teklif alın
              </Link>
              <Link to="/hizmetler" className="btn btn-ghost">
                Hizmetlerimiz
              </Link>
              <a href={`tel:${SITE.phoneHref}`} className="btn btn-ghost">
                {SITE.phone}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Slayt göstergesi — aynı zamanda elle geçiş düğmesi */}
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <div className="container flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`${i + 1}. görsele geç`}
                aria-current={i === slide}
                className={`h-1 rounded-full transition-all duration-500 ease-tension ${
                  i === slide ? 'w-12 bg-hazard' : 'w-6 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* İstatistikler (A2)                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white border-b border-steel-200">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-steel-200">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="px-5 py-8 md:px-8 md:py-12 first:pl-0 lg:last:pr-0">
                <div className="font-display text-5xl md:text-6xl text-secure leading-none">
                  <CountUp to={stat.value} suffix={stat.suffix} delay={i * 110} />
                </div>
                <div className="mt-3 text-sm text-steel-600">{stat.label}</div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.11, ease: [0.2, 0.8, 0.25, 1] }}
                  className="mt-4 h-0.5 bg-hazard origin-left"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Süreç + kaydırmaya bağlı sahne (A4)                              */}
      {/* ---------------------------------------------------------------- */}
      <LoadingScene />

      {/* ---------------------------------------------------------------- */}
      {/* Hizmetler (A3)                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="eyebrow">Hizmetler</span>
              <h2 className="text-3xl md:text-5xl mt-3">Yükünüz hangi yoldan giderse gitsin</h2>
            </div>
            <Link to="/hizmetler" className="btn btn-outline">
              Tüm hizmetler
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} index={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Kanıt (B4)                                                       */}
      {/* ---------------------------------------------------------------- */}
      <ProofStrip />

      {/* ---------------------------------------------------------------- */}
      {/* Kapanış                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-secure text-white">
        <div className="container">
          <div className="max-w-2xl">
            <span className="label text-white/60">Neden biz</span>
            <h2 className="text-white text-3xl md:text-5xl mt-3">
              {new Date().getFullYear() - FOUNDED_YEAR} yıldır aynı iş, her seferinde
              aynı titizlikle.
            </h2>
            <p className="mt-6 text-white/85 leading-relaxed">
              {FOUNDED_YEAR} yılından bu yana denizcilik ve yük sabitleme alanında hizmet
              veriyoruz. Uzman ekibimiz ve modern ekipmanlarımızla, yüklerinizin güvenliği
              için en uygun çözümü kuruyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/hakkimizda" className="btn bg-white text-secure hover:bg-white/90">
                Hakkımızda
              </Link>
              <Link to="/iletisim" className="btn btn-ghost">
                İletişime geçin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
