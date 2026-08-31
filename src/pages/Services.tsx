import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaShip, FaTruck, FaWarehouse, FaShieldAlt, FaBox, FaUmbrella } from 'react-icons/fa'
import ServiceCard from '../components/ServiceCard'
import SecuringCompare from '../components/SecuringCompare'
import { useSeo } from '../hooks/useSeo'

const services = [
  {
    id: 'gemi-proje-lashing',
    title: 'Gemi & Proje Lashing',
    description:
      'Deniz taşımacılığında yüklerin güvenli şekilde sabitlenmesi için profesyonel lashing hizmetleri. Proje kargolarınız için özel çözümler üretiyoruz.',
    Icon: FaShip,
  },
  {
    id: 'arac-ustu-lashing',
    title: 'Araç Üstü Lashing',
    description:
      'Karayolu taşımacılığında araç üstü yük sabitleme hizmetleri ile yüklerinizin güvenliğini sağlıyoruz.',
    Icon: FaTruck,
  },
  {
    id: 'konteyner-lashing',
    title: 'Konteyner Lashing',
    description:
      'Konteyner taşımacılığında güvenli ve profesyonel lashing hizmetleri ile yüklerinizi emniyete alıyoruz.',
    Icon: FaWarehouse,
  },
  {
    id: 'vci-koruma',
    title: 'VCI Koruma',
    description:
      'Yüklerinizi korozyona karşı korumak için VCI (Volatile Corrosion Inhibitor) teknolojisi ile koruma hizmeti sunuyoruz.',
    Icon: FaShieldAlt,
  },
  {
    id: 'sandiklama',
    title: 'Sandıklama',
    description:
      'Özel ürünleriniz için profesyonel sandıklama hizmetleri ile güvenli taşıma çözümleri sunuyoruz.',
    Icon: FaBox,
  },
  {
    id: 'brandalama',
    title: 'Brandalama',
    description:
      'Açık yüklerinizin hava koşullarından korunması için profesyonel brandalama hizmetleri sunuyoruz.',
    Icon: FaUmbrella,
  },
]

const Services: React.FC = () => {
  useSeo({
    title: 'Hizmetlerimiz',
    description:
      'Gemi ve proje lashing, araç üstü lashing, konteyner lashing, VCI korozyon koruma, sandıklama ve brandalama hizmetleri.',
    path: '/hizmetler',
  })

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-steel-900 text-white pt-36 pb-20 overflow-hidden">
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/services/hero-bg.webp")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900/85 to-steel-900/40" />
        <div className="container relative">
          <span className="eyebrow">Hizmetler</span>
          <h1 className="text-white text-4xl md:text-6xl mt-3 max-w-3xl">
            Altı hizmet, tek bir amaç: yük yerinden kımıldamasın.
          </h1>
          <p className="mt-5 text-white/85 text-lg max-w-2xl">
            Profesyonel ekibimiz ve modern ekipmanlarımızla deniz, kara ve konteyner
            taşımacılığında güvenli sabitleme çözümleri sunuyoruz.
          </p>
        </div>
      </section>

      {/* Neden lashing */}
      <section className="py-20 md:py-24 bg-steel-100 border-b border-steel-200">
        <div className="container">
          <div className="max-w-2xl">
            <span className="eyebrow">Neden gerekli</span>
            <h2 className="text-3xl md:text-4xl mt-3">Aradaki fark, tek bir bağlantı noktası</h2>
            <p className="mt-4 text-steel-600 leading-relaxed">
              Yük hasarlarının büyük bölümü taşıma sırasındaki hareketten kaynaklanır.
              Doğru hesaplanmış bir lashing uygulaması, yükü güzergâh boyunca yerinde tutar.
            </p>
          </div>
          <div className="mt-12">
            <SecuringCompare />
          </div>
        </div>
      </section>

      {/* Hizmet kartları */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">Ne yapıyoruz</span>
            <h2 className="text-3xl md:text-5xl mt-3">Hizmetlerimiz</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} index={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Kapanış */}
      <section className="py-20 bg-secure text-white">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-white text-3xl md:text-4xl">Projeniz için yanınızdayız</h2>
            <p className="mt-5 text-white/85 leading-relaxed">
              7/24 hizmet anlayışımızla tüm lashing ihtiyaçlarınız için çözüm üretiyoruz.
              Yükünüzü ve güzergâhı anlatın, uygun yöntemi birlikte belirleyelim.
            </p>
            <Link to="/iletisim" className="btn bg-white text-secure hover:bg-white/90 mt-8">
              Teklif alın
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
