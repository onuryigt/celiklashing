import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheckIcon, ClockIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Güvenilir Hizmet',
    description: 'ISG standartlarına uygun ekipman ve uzman kadromuzla güvenli taşımacılık hizmeti sunuyoruz.'
  },
  {
    icon: ClockIcon,
    title: '7/24 Hizmet',
    description: 'Kesintisiz hizmet anlayışımızla her an yanınızdayız.'
  },
  {
    icon: TruckIcon,
    title: 'Profesyonel Ekipman',
    description: 'Modern ve bakımlı ekipmanlarımızla en zorlu projelerde bile çözüm üretiyoruz.'
  },
  {
    icon: UserGroupIcon,
    title: 'Uzman Ekip',
    description: 'Deneyimli ve sertifikalı personelimizle kaliteli hizmet garantisi sunuyoruz.'
  }
]

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 overflow-hidden mt-20">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/about-hero.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 44%',
          }}
        />
        <div className="relative container mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Hakkımızda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-3xl mx-auto"
          >
            2000 yılından bu yana güvenli taşımacılık ve liman hizmetlerinde öncü
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8 px-4 md:px-0"
            >
              <div className="border-l-4 border-primary pl-4 md:pl-6">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Kurumsal Tarihçemiz</h2>
                <p className="text-base md:text-lg text-primary mt-2">23 yıllık güven ve tecrübe</p>
              </div>
              <div className="prose prose-sm md:prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                ÇELİK LASHING PORT & SERVICES, 2000 yılında İstanbul'da kurulduğu günden bu yana, 
  denizcilik ve yük sabitleme sektöründe güvenilirliğin ve kalitenin öncüsü konumuna gelmiştir. 
  Köklü kurumsal yapımız, sektördeki derin tecrübemiz ve yenilikçi yaklaşımımız sayesinde, 
  şirketimiz sürdürülebilir büyüme stratejisi ile her geçen gün hizmet kalitesini artırarak 
  yolculuğuna devam etmektedir. Uluslararası standartlarda sunduğumuz hizmetler ve 
  müşteri odaklı çözümlerimizle, sektörün güvenilir iş ortağı olarak konumumuzu 
  güçlendirmekteyiz.
                </p>
                <div className="my-6 md:my-8 bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg md:text-xl font-semibold mb-4 text-primary">Dönüm Noktalarımız</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-start">
                      <div className="w-14 md:w-16 font-bold text-primary">2000</div>
                      <p className="flex-1 text-sm md:text-base">İstanbul'da şirketimizin kuruluşu ve ilk lashing operasyonlarımız</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-14 md:w-16 font-bold text-primary">2010</div>
                      <p className="flex-1 text-sm md:text-base">Türkiye'nin önde gelen limanlarında hizmet ağımızın genişlemesi</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-14 md:w-16 font-bold text-primary">2018</div>
                      <p className="flex-1 text-sm md:text-base">ÇELİK LASHING PORT & SERVICES markasıyla yeniden yapılanma ve modern ekipman yatırımları</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-14 md:w-16 font-bold text-primary">2023</div>
                      <p className="flex-1 text-sm md:text-base">Dijital dönüşüm ve sürdürülebilirlik odaklı yeni dönem başlangıcı</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Şirketimiz, alanında uzman profesyonel kadrosu ve teknolojik altyapısı ile 
  kesintisiz hizmet sunmaktadır. Uluslararası ISO kalite standartları çerçevesinde 
  yapılandırılmış yönetim sistemlerimiz, kapsamlı İSG politikalarımız ve 
  sürdürülebilir çevre yönetimi yaklaşımımız ile sektörde öncü kuruluşlar 
  arasında yer almaktayız. Bu entegre yönetim anlayışımız, hizmet kalitemizin 
  ve kurumsal güvenilirliğimizin temelini oluşturmaktadır.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 my-6 md:my-8">
                  <div className="bg-primary/5 p-3 md:p-4 rounded-lg text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">1000+</div>
                    <div className="text-xs md:text-sm text-gray-600">Başarılı Proje</div>
                  </div>
                  <div className="bg-primary/5 p-3 md:p-4 rounded-lg text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">20+</div>
                    <div className="text-xs md:text-sm text-gray-600">Uzman Personel</div>
                  </div>
                  <div className="bg-primary/5 p-3 md:p-4 rounded-lg text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">%100</div>
                    <div className="text-xs md:text-sm text-gray-600">Müşteri Memnuniyeti</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative mt-8 lg:mt-0"
            >
              <img
                src="/about-image.jpg"
                alt="Çelik Lashing Ekipmanları"
                className="rounded-xl shadow-xl w-full"
              />
              <div className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 bg-primary text-white p-4 md:p-6 rounded-xl shadow-lg">
                <p className="text-3xl md:text-4xl font-bold">23+</p>
                <p className="text-xs md:text-sm opacity-90">Yıllık Deneyim</p>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.05)"
                }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative">
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-6 md:w-8 h-6 md:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animasyonlu Lashing İkonu */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -5, 5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -right-16 top-1/2 transform -translate-y-1/2 opacity-5"
          >
            <svg className="w-64 h-64 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10,2H14V4H16V6H14V8H12V6H10V4H12V2M23,13V15H21V13H23M19,13V15H17V13H19M15,13V15H13V13H15M11,13V15H9V13H11M7,13V15H5V13H7M3,13V15H1V13H3M21,17V19H19V17H21M17,17V19H15V17H17M13,17V19H11V17H13M9,17V19H7V17H9M5,17V19H3V17H5M1,17V19H0V20H1V22H3V20H5V22H7V20H9V22H11V20H13V22H15V20H17V22H19V20H21V22H23V20H24V19H23V17H21V19H19V17H17V19H15V17H13V19H11V17H9V19H7V17H5V19H3V17H1Z" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Misyonumuz</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Denizcilik ve lojistik sektöründe güvenilir, yenilikçi ve sürdürülebilir çözümler sunarak, 
                  müşterilerimizin başarısına katkıda bulunmak.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>En yüksek güvenlik standartlarında hizmet sunmak</li>
                  <li>Müşteri memnuniyetini her zaman ön planda tutmak</li>
                  <li>Çevreye duyarlı ve sürdürülebilir operasyonlar yürütmek</li>
                  <li>Sektörde öncü ve yenilikçi çözümler geliştirmek</li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Vizyonumuz</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Türkiye'nin ve bölgenin en güvenilir ve tercih edilen lashing ve liman hizmetleri sağlayıcısı olmak.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Sektörde teknoloji ve inovasyon lideri olmak</li>
                  <li>Uluslararası standartlarda hizmet kalitesi sunmak</li>
                  <li>Çalışanlarımızın sürekli gelişimini desteklemek</li>
                  <li>Sürdürülebilir büyüme ile değer yaratmak</li>
                </ul>
                <p className="mt-4 font-medium">
                  "Güvenli taşımacılık, mutlu müşteriler, sürdürülebilir gelecek"
                </p>
              </div>
            </motion.div>
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
              Firmamız ile kurmuş olduğunuz iş birlikteliği için teşekkür ederiz. 
              Yeni projeleriniz için 7/24 hizmetinizdeyiz.
            </p>
            <button className="btn bg-white text-primary hover:bg-white/90 text-lg px-8 py-3">
              Bizimle İletişime Geçin
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About 