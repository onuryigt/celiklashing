import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ServiceDetailType {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  features: string[];
  benefits: string[];
}

const serviceDetails: Record<string, ServiceDetailType> = {
  'gemi-proje-lashing': {
    id: 'gemi-proje-lashing',
    title: 'Gemi & Proje Lashing',
    description: 'Deniz taşımacılığında yüklerin güvenli şekilde bağlanması',
    longDescription: 'Gemi ve proje yüklerinin uluslararası standartlara uygun olarak bağlanması ve emniyete alınması hizmetleri. Profesyonel ekibimiz ve modern ekipmanlarımızla her türlü yükün güvenli taşınmasını sağlıyoruz.',
    image: '/services/gemi-proje-lashing.jpg',
    features: [
      'Uluslararası standartlara uygun bağlama sistemleri',
      'Deneyimli uzman ekip',
      'Modern ekipman ve malzemeler',
      'Proje bazlı özel çözümler'
    ],
    benefits: [
      'Maksimum yük güvenliği',
      'Hasarsız teslimat',
      'Zaman ve maliyet tasarrufu',
      'Risk minimizasyonu'
    ]
  },
  'arac-ustu-lashing': {
    id: 'arac-ustu-lashing',
    title: 'Araç Üstü Lashing',
    description: 'Karayolu taşımacılığında yüklerin güvenli şekilde bağlanması',
    longDescription: 'Karayolu taşımacılığında araç üstü yüklerin güvenli ve standartlara uygun şekilde bağlanması hizmetleri. Özel ekipmanlarımız ve uzman kadromuzla güvenli taşıma garantisi sunuyoruz.',
    image: '/services/arac-ustu-lashing.jpg',
    features: [
      'Araç tipine özel bağlama sistemleri',
      'Sertifikalı ekipmanlar',
      'Hızlı ve güvenli uygulama',
      '7/24 hizmet'
    ],
    benefits: [
      'Güvenli taşıma',
      'Yasal uyumluluk',
      'Profesyonel hizmet',
      'Hızlı çözüm'
    ]
  },
  'konteyner-lashing': {
    id: 'konteyner-lashing',
    title: 'Konteyner Lashing',
    description: 'Konteynerlerin güvenli şekilde bağlanması ve sabitlenmesi',
    longDescription: 'Konteyner taşımacılığında güvenli ve standartlara uygun bağlama hizmetleri. Uzman ekibimiz ve özel ekipmanlarımızla konteynerlerinizin güvenli taşınmasını sağlıyoruz.',
    image: '/services/konteyner-lashing.jpg',
    features: [
      'Standart ve özel konteyner bağlama sistemleri',
      'Sertifikalı ekipmanlar',
      'Uzman ekip',
      'Hızlı operasyon'
    ],
    benefits: [
      'Yük güvenliği',
      'Operasyonel verimlilik',
      'Maliyet optimizasyonu',
      'Sürdürülebilir çözümler'
    ]
  },
  'vci-koruma': {
    id: 'vci-koruma',
    title: 'VCI Koruma',
    description: 'Metal yüzeylerin korozyona karşı korunması',
    longDescription: 'Metal yüzeylerin korozyona karşı etkin korunması için profesyonel VCI koruma hizmetleri sunuyoruz. İleri teknoloji ürünlerimiz ve uzman kadromuzla ekipmanlarınızın uzun ömürlü olmasını sağlıyoruz.',
    image: '/services/vci-koruma.jpg',
    features: [
      'İleri teknoloji VCI ürünleri',
      'Uzun süreli koruma garantisi',
      'Profesyonel uygulama',
      'Çevre dostu çözümler'
    ],
    benefits: [
      'Ekipman ömrünü uzatma',
      'Korozyon hasarını önleme',
      'Maliyet tasarrufu',
      'Sürdürülebilir koruma'
    ]
  },
  'sandiklama': {
    id: 'sandiklama',
    title: 'Sandıklama',
    description: 'Özel ürünler için güvenli paketleme çözümleri',
    longDescription: 'Hassas ve değerli ürünleriniz için özel tasarım sandıklama hizmetleri sunuyoruz. Yüksek kaliteli malzemeler ve profesyonel ekibimizle ürünlerinizin güvenle paketlenmesini sağlıyoruz.',
    image: '/services/sandiklama.jpg',
    features: [
      'Özel tasarım sandıklar',
      'Yüksek kaliteli malzeme',
      'Profesyonel paketleme',
      'Güvenli taşıma çözümleri'
    ],
    benefits: [
      'Maksimum ürün koruması',
      'Güvenli depolama',
      'Hasarsız teslimat',
      'Kolay taşıma'
    ]
  },
  'brandalama': {
    id: 'brandalama',
    title: 'Brandalama',
    description: 'Açık yüklerin hava koşullarından korunması',
    longDescription: 'Açık yüklerinizin hava koşullarından etkin korunması için profesyonel brandalama hizmetleri sunuyoruz. Yüksek kaliteli brandalar ve uzman kadromuzla yüklerinizin güvenliğini sağlıyoruz.',
    image: '/services/brandalama.jpg',
    features: [
      'Yüksek kaliteli brandalar',
      'Profesyonel uygulama',
      'Hava koşullarına dayanıklılık',
      'Hızlı servis'
    ],
    benefits: [
      'Yük koruması',
      'UV dayanımı',
      'Su geçirmezlik',
      'Uzun ömürlü kullanım'
    ]
  }
};

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const service = serviceId ? serviceDetails[serviceId] : null;

  useEffect(() => {
    // Sayfa yüklendiğinde en üste scroll
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hizmet bulunamadı</h2>
          <button
            onClick={() => navigate('/hizmetler')}
            className="text-primary hover:text-primary/80"
          >
            Hizmetler sayfasına dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-3xl mx-auto"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-12">
              {/* Detaylı Açıklama */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none"
              >
                <p className="text-gray-600">{service.longDescription}</p>
              </motion.div>

              {/* Özellikler */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Özellikler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Faydalar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Faydalar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-primary/5 rounded-xl p-8 text-center"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Profesyonel Lashing Hizmetleri
                </h3>
                <p className="text-gray-600 mb-6">
                  Yüklerinizin güvenli taşınması için uzman ekibimizle hizmetinizdeyiz
                </p>
                <button
                  onClick={() => navigate('/iletisim')}
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Bizimle İletişime Geçin
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail; 