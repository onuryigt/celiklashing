import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShip, FaTruck, FaBox, FaShieldAlt, FaWarehouse, FaUmbrella } from 'react-icons/fa'

const services = [
  {
    id: 'gemi-proje-lashing',
    title: 'Gemi & Proje Lashing',
    description: 'Deniz taşımacılığında yüklerin güvenli şekilde bağlanması',
    Icon: FaShip
  },
  {
    id: 'arac-ustu-lashing',
    title: 'Araç Üstü Lashing',
    description: 'Karayolu taşımacılığında yüklerin güvenli şekilde bağlanması',
    Icon: FaTruck
  },
  {
    id: 'konteyner-lashing',
    title: 'Konteyner Lashing',
    description: 'Konteynerlerin güvenli şekilde bağlanması ve sabitlenmesi',
    Icon: FaWarehouse
  },
  {
    id: 'vci-koruma',
    title: 'VCI Koruma',
    description: 'Metal yüzeylerin korozyona karşı korunması',
    Icon: FaShieldAlt
  },
  {
    id: 'sandiklama',
    title: 'Sandıklama',
    description: 'Özel ürünler için güvenli paketleme çözümleri',
    Icon: FaBox
  },
  {
    id: 'brandalama',
    title: 'Brandalama',
    description: 'Açık yüklerin hava koşullarından korunması',
    Icon: FaUmbrella
  }
]

const stats = [
  { label: 'Yıllık Deneyim', value: '25+' },
  { label: 'Başarılı Proje', value: '1000+' },
  { label: 'Mutlu Müşteri', value: '600+' },
  { label: 'Uzman Ekip', value: '20+' },
]

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = ['bg-[url("/hero1.jpg")]', 'bg-[url("/hero2.jpg")]', 'bg-[url("/hero3.jpg")]']

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={"absolute inset-0 " + images[currentImageIndex] + " bg-cover bg-center bg-no-repeat"}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full container mx-auto flex flex-col justify-center items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-7xl font-bold mb-6"
          >
            Lashing Hizmeti için<br />Birebir Çözümler
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl"
          >
            2000 yılından bu yana denizcilik ve yük sabitleme alanında profesyonel hizmet veriyoruz
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link to="/iletisim" className="w-[280px] sm:w-auto btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3">
              Bizimle İletişime Geçin
            </Link>
            <Link to="/hizmetler" className="w-[280px] sm:w-auto btn bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3">
              Hizmetlerimiz
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path d="M0,32L60,37.3C120,43,240,53,360,48C480,43,600,21,720,26.7C840,32,960,64,1080,69.3C1200,75,1320,53,1380,42.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Yeni Görsel */}
      <div className="relative pointer-events-none">
        <img
          src="/container12.png"
          alt="Container Image"
          className="absolute hidden md:block"
          style={{
            top: '650px',
            left: '20px',
            zIndex: 10,
            width: '1100px',
            height: 'auto'
          }}
        />
        <img
          src="/container12.png"
          alt="Container Image"
          className="absolute block md:hidden"
          style={{
            top: '3050px',
            left: '33%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '300px',
            height: 'auto'
          }}
        />
      </div>
      {/* Yeni Görsel */}
      <div className="relative pointer-events-none">
        <img
          src="/strap.png"
          alt="strap Image"
          className="absolute hidden md:block"
          style={{
            top: '1037px',
            left: '1380px',
            zIndex: 10,
            width: '1170px',
            height: 'auto'
          }}
        />
        <img
          src="/strap.png"
          alt="strap Image"
          className="absolute block md:hidden"
          style={{
            top: '3080px',
            left: '26%',
            transform: 'translateX(-90%)',
            zIndex: 0,
            width: '10px',
            height: 'auto'
          }}
        />
      </div>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300" />
                <div className="relative bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-blue-400 rounded-xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300" />
                  <div className="absolute -top-3 -right-3 w-14 h-14 bg-white rounded-xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    {index === 0 && (
                      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="text-5xl font-bold text-primary mb-4 font-['Bebas_Neue'] tracking-wider">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      {stat.value}
                    </motion.span>
                  </div>
                  <div className="text-gray-600 text-lg font-medium">
                    {stat.label}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Hizmetlerimiz
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={`/services/${service.id}.jpg`}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <service.Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                    <p className="text-white/90 mb-4 line-clamp-2">{service.description}</p>
                    <Link
                      to={`/hizmetler/${service.id}`}
                      className="inline-flex items-center text-sm font-medium text-white/90 hover:text-white group/link"
                    >
                      Detaylı Bilgi
                      <svg 
                        className="w-4 h-4 ml-1 transform transition-transform group-hover/link:translate-x-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Neden Biz?</h2>
              <p className="text-lg mb-8 opacity-90">
                Çelik Denizcilik olarak, 2000 yılından bu yana denizcilik ve yük sabitleme alanında profesyonel hizmet vermekteyiz. 
                Uzman ekibimiz ve modern ekipmanlarımızla, yüklerinizin güvenliği için en iyi çözümleri sunuyoruz.
              </p>
              <Link 
                to="/hakkimizda"
                onClick={() => window.scrollTo(0, 0)}
                className="btn bg-white text-primary hover:bg-white/90 text-lg px-8 py-3"
              >
                Daha Fazla Bilgi
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 