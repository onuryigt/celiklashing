import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Gemi & Proje Lashing',
    description: 'Deniz taşımacılığında yüklerin güvenli şekilde sabitlenmesi için profesyonel lashing hizmetleri sunuyoruz. Proje kargolarınız için özel çözümler üretiyoruz.',
    image: '/services/gemi-proje-lashing.jpg',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20,21C20,21.6 19.6,22 19,22H5C4.4,22 4,21.6 4,21V9L12,3L20,9V21M6,19H18V10L12,5.5L6,10V19M8,15H16V17H8V15M8,11H16V13H8V11" />
      </svg>
    )
  },
  {
    title: 'Araç Üstü Lashing',
    description: 'Karayolu taşımacılığında araç üstü yük sabitleme hizmetleri ile yüklerinizin güvenliğini sağlıyoruz.',
    image: '/services/arac-ustu-lashing.jpg',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M19.5,9.5L21.46,12H17V9.5M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8Z" />
      </svg>
    )
  },
  {
    title: 'Konteyner Lashing',
    description: 'Konteyner taşımacılığında güvenli ve profesyonel lashing hizmetleri ile yüklerinizi emniyete alıyoruz.',
    image: '/services/konteyner-lashing.jpg',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2,21H16V19H2M20,8H16V5H20M22,3H14V13H22V3M12,9H8V5H12M14,3H6V13H14V3M5,21H7V19H5V21M8,21H10V19H8V21M11,21H13V19H11V21M14,21H16V19H14V21Z" />
      </svg>
    )
  },
  {
    title: 'VCI Koruma',
    description: 'Yüklerinizi korozyona karşı korumak için VCI (Volatile Corrosion Inhibitor) teknolojisi ile koruma hizmeti sunuyoruz.',
    image: '/services/vci-koruma.jpg',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
      </svg>
    )
  },
  {
    title: 'Sandıklama',
    description: 'Özel ürünleriniz için profesyonel sandıklama hizmetleri ile güvenli taşıma çözümleri sunuyoruz.',
    image: '/services/sandiklama.jpg',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z" />
      </svg>
    )
  },
  {
    title: 'Brandalama',
    description: 'Açık yüklerinizin hava koşullarından korunması için profesyonel brandalama hizmetleri sunuyoruz.',
    image: '/services/brandalama.jpg',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M5 19V5H19V19H5M6 16H18V18H6V16M6 11H18V13H6V11M6 6H18V8H6V6Z" />
      </svg>
    )
  }
]

const Services: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 overflow-hidden mt-20">
        {/* Animasyonlu Arka Plan */}
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/services/hero-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative container mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Hizmetlerimiz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-3xl mx-auto"
          >
            Profesyonel ekibimiz ve modern ekipmanlarımızla güvenli taşımacılık çözümleri sunuyoruz
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto">
          {/* Lashing Animasyon Bölümü */}
          <div className="mb-20">
            <div className="relative h-[700px] md:h-[500px] max-w-4xl mx-auto bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-lg overflow-hidden">
              {/* Güvensiz Konteyner */}
              <motion.div
                initial={{ x: -200 }}
                animate={{ x: 50, y: 0 }}
                className="absolute top-16 md:top-20 w-40 md:w-64 h-28 md:h-40"
                transition={{ duration: 1 }}
              >
                <div className="relative w-full h-full bg-red-500/20 border-2 border-red-500/30 rounded-lg shadow-xl">
                  {/* Konteyner İç Çerçevesi */}
                  <div className="absolute inset-2 border-2 border-red-500/20 rounded-lg">
                    {/* Konteyner İçindeki Yük */}
                    <motion.div
                      animate={{
                        x: [-45, -20, -45],
                        y: [-38, -48, -38],
                        rotate: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20"
                    >
                      {/* Yük Gövdesi */}
                      <div className="w-full h-full bg-red-500/30 rounded-lg border-2 border-red-500/40">
                        {/* Yük Deseni */}
                        <div className="grid grid-cols-3 grid-rows-2 gap-1 p-2 h-full">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-red-500/20 rounded" />
                          ))}
                        </div>
                      </div>        
                      
                      {/* Çarpma Efekti */}
                      <motion.div
                        animate={{
                          opacity: [0, 0.6, 0],
                          scale: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                          duration: .5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-red-500/20 rounded-lg"
                      />
                    </motion.div>
                  </div>

                  {/* Uyarı İşareti */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute -top-16 -right-16 w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl z-30"
                  >
                    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 5.99L19.53 19H4.47L12,5.99M12,2L1,21h22L12,2zm1,14h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
                    </svg>
                  </motion.div>

                  {/* Sallanan Yük Efekti */}
                  <motion.div
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-red-500/10 rounded-lg"
                  />
                </div>
              </motion.div>

              {/* Güvenli Konteyner */}
              <motion.div
                initial={{ x: 400 }}
                animate={{ x: 50, y: 200 }}
                className="absolute top-16 md:top-20 w-40 md:w-64 h-28 md:h-40"
                transition={{ duration: 1 }}
              >
                <div className="relative w-full h-full bg-blue-500/20 border-2 border-blue-500/30 rounded-lg shadow-xl">
                  {/* Konteyner İç Çerçevesi */}
                  <div className="absolute inset-2 border-2 border-blue-500/20 rounded-lg">
                    {/* Sabit Yük */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20">
                      {/* Yük Gövdesi */}
                      <div className="relative w-full h-full bg-blue-500/30 rounded-lg border-2 border-blue-500/40">
                        {/* Yük Deseni */}
                        <div className="grid grid-cols-3 grid-rows-2 gap-1 p-2 h-full">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-blue-500/20 rounded" />
                          ))}
                        </div>

                        {/* Yük Üzerindeki Bağlantı Noktaları */}
                        {[
                          { x: -2, y: -4 }, { x: 99, y: -3 }, { x: 50, y: -3 },
                          { x: -2, y: 40 }, { x: 99, y: 50 },
                          { x: -2, y: 90 }, { x: 99, y: 90 }, { x: 50, y: 97 }
                        ].map((point, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                            className="absolute w-1.5 h-1.5 bg-blue-600 rounded-full"
                            style={{
                              left: `${point.x}%`,
                              top: `${point.y}%`,
                              transform: 'translate(-50%, -50%)',
                              zIndex: 25
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Konteyner Duvarlarındaki Bağlantı Noktaları */}
                  {[
                    { x: 0, y: 0 }, { x: 45, y: 0 }, { x: 99, y: 0 },
                    { x: 0, y: 95 }, { x: 45, y: 95 }, { x: 99, y: 95 },
                    { x: 0, y: 45 }, { x:99, y: 42 },
           
                  ].map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5 + index * 0.1 }}
                      className="absolute w-2 h-2 bg-primary rounded-full"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 20
                      }}
                    />
                  ))}

                  {/* Lashing Halatları */}
                  {[
                    // Üst Halatlar
                    { startX: 0, startY: 47, endX: 0, endY: 20, rotate: 0 },
                    { startX: 0, startY: 0, endX: 0, endY: 30, rotate: 30 },
                    { startX: 0, startY: 99, endX: 0, endY: 67, rotate: -35 },
                    
                    // Alt Halatlar
                    { startX: 47, startY: 95, endX: 59, endY: 99, rotate: -70 },
                    { startX: 99, startY: 95, endX: 71, endY: 99, rotate: -147 },
                    
                    // Yan Halatlar
                    { startX: 47, startY: 0, endX: 30, endY: 0, rotate: 75 },
                    { startX: 99, startY: 0, endX: 70, endY: 0, rotate: 147 },
                    { startX: 99, startY: 45, endX: 99, endY: 20, rotate: 170 }
                  ].map((halat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.15 }}
                      style={{
                        position: 'absolute',
                        left: `${halat.startX}%`,
                        top: `${halat.startY}%`,
                        width: `${Math.sqrt(
                          Math.pow(halat.endX - halat.startX, 2) +
                          Math.pow(halat.endY - halat.startY, 2)
                        )}%`,
                        height: '2px',
                        background: 'linear-gradient(90deg, #1a56db 95%, rgba(26,86,219,0.3) 100%)',
                        transformOrigin: '0 50%',
                        transform: `rotate(${halat.rotate}deg)`,
                        borderRadius: '1px',
                        zIndex: 15,
                      }}
                    >
                      {/* Gerilme Efekti */}
                      <motion.div
                        animate={{
                          scaleX: [1, 1.02, 0.98, 1],
                          opacity: [1, 0.8, 1]
                        }}
                        transition={{
                          duration: 1.2,
                          delay: index * 0.15 + 0.3,
                          repeat: 1
                        }}
                        className="w-full h-full rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, rgba(26,86,219,0.9) 0%, rgba(26,86,219,0.3) 100%)',
                          boxShadow: '0 0 8px rgba(26,86,219,0.6)'
                        }}
                      />

                      {/* Parıldama Efekti */}
                      <motion.div
                        animate={{
                          x: ['0%', '100%']
                        }}
                        transition={{
                          duration: 1,
                          delay: index * 0.15 + 0.5,
                          ease: "easeInOut"
                        }}
                        className="absolute top-0 left-0 w-6 h-full"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                          transform: 'skewX(-20deg)'
                        }}
                      />
                    </motion.div>
                  ))}

                  {/* Onay İşareti */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 3.5 }}
                    className="absolute -top-16 -right-16 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl z-30"
                  >
                    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </motion.div>

                  {/* Güvenlik Halkası Efekti */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0.8, 1.1, 0.8],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 border-4 border-blue-500/30 rounded-lg"
                  />
                </div>
              </motion.div>

              {/* Güvenlik Mesajı */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5 }}
                className="absolute bottom-10 md:top-[200px] left-1/2 -translate-x-1/2 text-center w-[55%] md:w-full px-2 md:px-4 max-w-[200px] md:max-w-[400px] mx-auto bg-white/80 backdrop-blur-sm py-2 md:py-4 rounded-xl shadow-lg"
              >
                <h3 className="text-[11px] md:text-xl font-bold text-primary mb-1 md:mb-3">
                  Lashing ile Güvenli Taşıma
                </h3>
                <p className="text-[9px] md:text-sm text-gray-600 leading-tight md:leading-normal">
                  Yükünüz bizimle güvende
                </p>
                <div className="flex items-center justify-center gap-3 md:gap-6 mt-1.5 md:mt-3">
                  <div className="flex items-center text-red-500 text-[7px] md:text-sm whitespace-nowrap">
                    <svg className="w-2.5 h-2.5 md:w-5 md:h-5 mr-0.5 md:mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                    </svg>
                    Riskli Taşıma
                  </div>
                  <div className="flex items-center text-green-500 text-[7px] md:text-sm whitespace-nowrap">
                    <svg className="w-2.5 h-2.5 md:w-5 md:h-5 mr-0.5 md:mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                    </svg>
                    Güvenli Taşıma
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Servis Görseli */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/90 rounded-lg">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Servis Açıklaması */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    to="/iletisim"
                    className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                  >
                    Detaylı Bilgi
                    <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

                {/* Hover Efekti */}
                <div className="absolute inset-0 border-2 border-primary/0 rounded-2xl group-hover:border-primary/50 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 -mb-16 bg-primary text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Projeleriniz İçin Yanınızdayız</h2>
            <p className="text-lg mb-8 opacity-90">
              7/24 hizmet anlayışımızla tüm lashing ihtiyaçlarınız için profesyonel çözümler sunuyoruz.
            </p>
            <Link
              to="/iletisim"
              className="inline-block bg-white text-primary hover:bg-white/90 text-lg px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Bizimle İletişime Geçin
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services 