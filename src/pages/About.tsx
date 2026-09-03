import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheckIcon, ClockIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import CountUp from '../components/CountUp'
import { SITE, FOUNDED_YEAR, yearsInBusiness } from '../config/site'
import { useSeo } from '../hooks/useSeo'
import { PAGE_SEO } from '../config/seo'

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Güvenilir Hizmet',
    description:
      'İSG standartlarına uygun ekipman ve uzman kadromuzla güvenli taşımacılık hizmeti sunuyoruz.',
  },
  {
    icon: ClockIcon,
    title: '7/24 Hizmet',
    description: 'Kesintisiz hizmet anlayışımızla her an yanınızdayız.',
  },
  {
    icon: TruckIcon,
    title: 'Profesyonel Ekipman',
    description:
      'Modern ve bakımlı ekipmanlarımızla en zorlu projelerde bile çözüm üretiyoruz.',
  },
  {
    icon: UserGroupIcon,
    title: 'Uzman Ekip',
    description: 'Deneyimli ve sertifikalı personelimizle kaliteli hizmet garantisi sunuyoruz.',
  },
]

const milestones = [
  ['2000', 'İstanbul’da şirketimizin kuruluşu ve ilk lashing operasyonlarımız'],
  ['2010', 'Türkiye’nin önde gelen limanlarında hizmet ağımızın genişlemesi'],
  ['2018', 'ÇELİK LASHING & PORT SERVICES markasıyla yeniden yapılanma ve modern ekipman yatırımları'],
  ['2023', 'Dijital dönüşüm ve sürdürülebilirlik odaklı yeni dönem başlangıcı'],
]

const About: React.FC = () => {
  const years = yearsInBusiness()

  useSeo(PAGE_SEO.about)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-steel-900 text-white pt-36 pb-20 overflow-hidden">
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: 'url("/about-hero.webp")', backgroundPosition: 'center 44%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900/85 to-steel-900/40" />
        <div className="container relative">
          <span className="eyebrow">Hakkımızda</span>
          <h1 className="text-white text-4xl md:text-6xl mt-3 max-w-3xl">
            {years} yıldır aynı iş, her seferinde aynı titizlikle.
          </h1>
          <p className="mt-5 text-white/85 text-lg max-w-2xl">
            {FOUNDED_YEAR} yılından bu yana güvenli taşımacılık ve liman hizmetlerinde
            çalışıyoruz.
          </p>
        </div>
      </section>

      {/* Tarihçe */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="border-l-2 border-hazard pl-5">
                <span className="eyebrow">Kurumsal tarihçemiz</span>
                <h2 className="text-3xl md:text-4xl mt-2">
                  {years} yıllık güven ve tecrübe
                </h2>
              </div>

              <p className="mt-8 text-steel-600 leading-relaxed">
                {SITE.name}, {FOUNDED_YEAR} yılında İstanbul’da kurulduğu günden bu yana
                denizcilik ve yük sabitleme sektöründe güvenilirliğin ve kalitenin öncüsü
                konumuna gelmiştir. Köklü kurumsal yapımız, sektördeki derin tecrübemiz ve
                yenilikçi yaklaşımımız sayesinde şirketimiz sürdürülebilir büyüme
                stratejisiyle her geçen gün hizmet kalitesini artırarak yoluna devam
                etmektedir.
              </p>

              {/* Dönüm noktaları */}
              <div className="mt-10 border border-steel-300 rounded-sm overflow-hidden">
                <h3 className="label text-steel-500 bg-steel-100 px-5 py-3 border-b border-steel-300">
                  Dönüm noktalarımız
                </h3>
                <ol className="divide-y divide-steel-200">
                  {milestones.map(([year, text], i) => (
                    <motion.li
                      key={year}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex gap-5 px-5 py-4"
                    >
                      <span className="font-display text-xl text-hazard w-14 shrink-0 tabular">
                        {year}
                      </span>
                      <span className="text-sm text-steel-600 leading-relaxed">{text}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              <p className="mt-8 text-steel-600 leading-relaxed">
                Şirketimiz, alanında uzman profesyonel kadrosu ve teknolojik altyapısıyla
                kesintisiz hizmet sunmaktadır. Uluslararası ISO kalite standartları
                çerçevesinde yapılandırılmış yönetim sistemlerimiz, kapsamlı İSG
                politikalarımız ve sürdürülebilir çevre yönetimi yaklaşımımız hizmet
                kalitemizin temelini oluşturmaktadır.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-px bg-steel-300 border border-steel-300 rounded-sm overflow-hidden">
                {[
                  { to: 1000, suffix: '+', label: 'Başarılı proje' },
                  { to: 20, suffix: '+', label: 'Uzman personel' },
                  { to: years, suffix: ' yıl', label: 'Sektör tecrübesi' },
                ].map((s, i) => (
                  <div key={s.label} className="bg-white px-4 py-6 text-center">
                    <div className="font-display text-3xl md:text-4xl text-secure">
                      <CountUp to={s.to} suffix={s.suffix} delay={i * 110} />
                    </div>
                    <div className="mt-2 text-xs text-steel-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative lg:sticky lg:top-28"
            >
              <img
                src="/about-image.webp"
                alt="Çelik Lashing saha ekipmanları"
                loading="lazy"
                decoding="async"
                className="w-full rounded-sm border border-steel-300"
              />
              <div className="absolute -bottom-5 -right-3 md:-right-5 bg-hazard text-white px-6 py-4 rounded-sm shadow-lift">
                <p className="font-display text-4xl leading-none tabular">{years}+</p>
                <p className="label mt-1 text-white/85">Yıllık deneyim</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Öne çıkanlar */}
      <section className="py-20 bg-steel-100 border-y border-steel-200">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-steel-300 border border-steel-300 rounded-sm overflow-hidden">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.42, delay: i * 0.07 }}
                className="bg-white p-7"
              >
                <span className="w-11 h-11 grid place-items-center rounded-sm bg-secure-soft">
                  <feature.icon className="w-5 h-5 text-secure" aria-hidden="true" />
                </span>
                <h3 className="text-xl mt-4">{feature.title}</h3>
                <p className="mt-2 text-sm text-steel-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Misyon & vizyon */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Misyonumuz',
              lead: 'Denizcilik ve lojistik sektöründe güvenilir, yenilikçi ve sürdürülebilir çözümler sunarak müşterilerimizin başarısına katkıda bulunmak.',
              items: [
                'En yüksek güvenlik standartlarında hizmet sunmak',
                'Müşteri memnuniyetini her zaman ön planda tutmak',
                'Çevreye duyarlı ve sürdürülebilir operasyonlar yürütmek',
                'Sektörde öncü ve yenilikçi çözümler geliştirmek',
              ],
            },
            {
              title: 'Vizyonumuz',
              lead: 'Türkiye’nin ve bölgenin en güvenilir ve tercih edilen lashing ve liman hizmetleri sağlayıcısı olmak.',
              items: [
                'Sektörde teknoloji ve inovasyon lideri olmak',
                'Uluslararası standartlarda hizmet kalitesi sunmak',
                'Çalışanlarımızın sürekli gelişimini desteklemek',
                'Sürdürülebilir büyüme ile değer yaratmak',
              ],
            },
          ].map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="card p-7 md:p-9"
            >
              <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="text-2xl md:text-3xl mt-2">{block.title}</h2>
              <p className="mt-4 text-steel-600 leading-relaxed">{block.lead}</p>
              <ul className="mt-6 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-steel-600">
                    <span className="text-hazard shrink-0" aria-hidden="true">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Kapanış */}
      <section className="py-20 bg-secure text-white">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-white text-3xl md:text-4xl">Projeleriniz için yanınızdayız</h2>
            <p className="mt-5 text-white/85 leading-relaxed">
              Firmamızla kurduğunuz iş birlikteliği için teşekkür ederiz. Yeni
              projeleriniz için 7/24 hizmetinizdeyiz.
            </p>
            <Link to="/iletisim" className="btn bg-white text-secure hover:bg-white/90 mt-8">
              Bizimle iletişime geçin
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
