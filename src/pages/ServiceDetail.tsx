import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSeo } from '../hooks/useSeo';
import { SERVICE_SEO } from '../config/seo';

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
    longDescription:
      'Proje kargo, ağır ve gabari dışı yüklerin gemi güvertesinde ya da ambarda sabitlenmesi. ' +
      'Yükün ağırlık merkezi, seferin süresi ve beklenen deniz koşulları birlikte değerlendirilir; ' +
      'bağlama noktaları, zincir ve kayış sayısı ile gerginlik değerleri buna göre hesaplanır. ' +
      'Uygulama sonrası her nokta kontrol edilir ve teslim öncesi kayıt altına alınır.',
    image: '/services/gemi-proje-lashing.webp',
    features: [
      'Zincir, gergi (turnbuckle), kayış ve D-ring noktalarıyla sabitleme',
      'Ağırlık merkezi ve deniz koşullarına göre bağlama planı',
      'Takoz, kızak ve kaymaz mat ile yük altı destek',
      'Proje bazlı ekip ve ekipman planlaması',
    ],
    benefits: [
      'Yük seyir boyunca yerinde kalır',
      'Tahliye sırasında güvenli ve hızlı çözme',
      'Teslim öncesi kontrol kaydı',
      'Liman ve gemi programına uyumlu operasyon',
    ],
  },
  'arac-ustu-lashing': {
    id: 'arac-ustu-lashing',
    title: 'Araç Üstü Lashing',
    description: 'Karayolu taşımacılığında yüklerin güvenli şekilde bağlanması',
    longDescription:
      'Tır, römork ve lowbed üzerindeki yüklerin karayolu koşullarına göre sabitlenmesi. ' +
      'Fren, viraj ve kalkış ivmeleri yükün ağırlığı ve sürtünme yüzeyiyle birlikte hesaba katılır; ' +
      'kayış sayısı, bağlama açısı ve ön gerilim (STF) buna göre belirlenir. ' +
      'Köşe koruyucular yükü ve kayışı korur; kaymaz mat sürtünmeyi artırarak gereken kayış sayısını düşürür.',
    image: '/services/arac-ustu-lashing.webp',
    features: [
      'Cırcırlı (ratchet) kayış ve zincir ile üstten bastırma / doğrudan bağlama',
      'Kaymaz mat ve köşe koruyucu kullanımı',
      'Yüke ve araca göre hesaplanmış kayış sayısı ve açısı',
      'Yükleme sahasında ya da limanda, 7/24 uygulama',
    ],
    benefits: [
      'Yol boyunca kayma ve devrilme riski azalır',
      'Yol denetimlerinde yük emniyeti eksikliği yaşanmaz',
      'Yük ve araç hasarı önlenir',
      'Kısa uygulama süresi, aracın bekleme süresi azalır',
    ],
  },
  'konteyner-lashing': {
    id: 'konteyner-lashing',
    title: 'Konteyner Lashing',
    description: 'Konteynerlerin güvenli şekilde bağlanması ve sabitlenmesi',
    longDescription:
      'Konteyner içine yüklenen makine, palet ve düzensiz parçaların konteynerin bağlama halkalarına sabitlenmesi. ' +
      'Amaç, yükün konteyner içinde deniz ve kara yolculuğu boyunca hareket etmemesi. ' +
      'Kayış, zincir, ahşap takoz ve şişme hava yastığı (dunnage bag) birlikte kullanılır; ' +
      'boşluklar doldurulur, ağırlık dağılımı konteyner tabanına dengeli yayılır.',
    image: '/services/konteyner-lashing.webp',
    features: [
      'Bağlama halkalarına kayış ve zincir ile sabitleme',
      'Ahşap takoz, destek ve hava yastığı ile boşluk doldurma',
      'Ağırlık dağılımı ve taban yükü kontrolü',
      'Flat-rack ve open-top konteynerlerde özel bağlama',
    ],
    benefits: [
      'Yük konteyner içinde yer değiştirmez',
      'Varışta kapı açıldığında yük düşme riski önlenir',
      'Konteyner ve yük hasarı azalır',
      'Yükleme raporuyla belgelenmiş operasyon',
    ],
  },
  'vci-koruma': {
    id: 'vci-koruma',
    title: 'VCI Koruma',
    description: 'Metal yüzeylerin korozyona karşı korunması',
    longDescription:
      'VCI (Volatile Corrosion Inhibitor) buharlaşan korozyon önleyici teknolojisiyle metal parçaların paslanmaya karşı korunması. ' +
      'VCI film, kâğıt ve emitörler kapalı ambalaj içinde koruyucu bir buhar tabakası oluşturur; ' +
      'yağlama gerektirmez, varışta temizlik istemez. Uzun deniz yolculukları ve depolama süreleri için tercih edilir.',
    image: '/services/vci-koruma.webp',
    features: [
      'VCI film, torba, kâğıt ve emitör uygulaması',
      'Parçanın metal türüne göre uygun VCI seçimi',
      'Sandıklama ve konteyner yüklemesiyle birlikte uygulama',
      'Nem alıcı (desikant) ile birlikte kullanım',
    ],
    benefits: [
      'Deniz yolculuğunda tuzlu nemden korunma',
      'Varışta yağ temizliği gerektirmez',
      'İşlenmiş yüzeyler ve hassas parçalar korunur',
      'Depolama süresince paslanma önlenir',
    ],
  },
  'sandiklama': {
    id: 'sandiklama',
    title: 'Sandıklama',
    description: 'Özel ürünler için güvenli paketleme çözümleri',
    longDescription:
      'Makine, ekipman ve hassas parçalar için ölçüye göre ahşap sandık ve kasa imalatı. ' +
      'Sandık, yükün ağırlığına ve taşıma şekline göre tasarlanır; forklift girişi, kaldırma noktaları ve istifleme dayanımı baştan planlanır. ' +
      'İhracat için ısıl işlem görmüş (ISPM 15) ahşap kullanılır; iç sabitleme, VCI koruma ve nem alıcı ile tamamlanır.',
    image: '/services/sandiklama.webp',
    features: [
      'Ölçüye özel ahşap sandık, kasa ve palet imalatı',
      'İhracata uygun ısıl işlemli (ISPM 15) ahşap',
      'Sandık içi sabitleme ve destek',
      'VCI ve nem alıcı ile birlikte paketleme',
    ],
    benefits: [
      'Taşıma ve istiflemede darbe koruması',
      'Gümrük ve ihracat ahşap kurallarına uyum',
      'Forklift ve vinçle güvenli elleçleme',
      'Uzun süreli depolamaya uygun ambalaj',
    ],
  },
  'brandalama': {
    id: 'brandalama',
    title: 'Brandalama',
    description: 'Açık yüklerin hava koşullarından korunması',
    longDescription:
      'Açık araç, vagon ve güverte yüklerinin yağmur, tuzlu su, toz ve güneşe karşı brandayla örtülmesi. ' +
      'Branda yükün formuna göre kesilir ve gerdirilir; rüzgârda çırpmayı önleyecek şekilde bağlanır, ' +
      'su birikmeyecek eğim verilir. Lashing uygulamasıyla birlikte tek seferde tamamlanır.',
    image: '/services/brandalama.webp',
    features: [
      'Yükün ölçüsüne göre kesilmiş, gerdirilmiş branda',
      'Rüzgâr ve su birikmesine karşı bağlama düzeni',
      'Lashing ile birlikte uygulama',
      'Kara, demiryolu ve gemi güvertesi yüklerinde',
    ],
    benefits: [
      'Yağmur ve tuzlu su hasarı önlenir',
      'Toz ve güneşten korunma',
      'Yolda çırpma ve yırtılma riski azalır',
      'Varışta temiz ve kuru yük',
    ],
  },
};

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const service = serviceId ? serviceDetails[serviceId] : null;

  const seo = serviceId ? SERVICE_SEO[serviceId] : undefined;
  useSeo(
    seo ?? {
      title: 'Hizmet bulunamadı',
      path: `/hizmetler/${serviceId ?? ''}`,
    },
  );

  // Kaydırmanın başa alınması artık PageTransition'da merkezi olarak yapılıyor.

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-steel-900 mb-4">Hizmet bulunamadı</h2>
          <button
            onClick={() => navigate('/hizmetler')}
            className="text-secure hover:text-secure/80"
          >
            Hizmetler sayfasına dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-steel-50">
      {/* Hero Section */}
      <section className="relative bg-steel-900 text-white pt-36 pb-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-steel-900/70 via-steel-900/60 to-steel-900/90" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
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
            <div className="bg-white rounded-sm shadow-xl p-8 md:p-12 space-y-12">
              {/* Detaylı Açıklama */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none"
              >
                <p className="text-steel-600">{service.longDescription}</p>
              </motion.div>

              {/* Özellikler */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-steel-900 mb-6">Özellikler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <svg className="w-6 h-6 text-secure flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-steel-600">{feature}</span>
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
                <h2 className="text-2xl font-bold text-steel-900 mb-6">Faydalar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <svg className="w-6 h-6 text-secure flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-steel-600">{benefit}</span>
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
                className="bg-secure/5 rounded-sm p-8 text-center"
              >
                <h3 className="text-xl font-bold text-steel-900 mb-4">
                  Profesyonel Lashing Hizmetleri
                </h3>
                <p className="text-steel-600 mb-6">
                  Yüklerinizin güvenli taşınması için uzman ekibimizle hizmetinizdeyiz
                </p>
                <button
                  onClick={() => navigate('/iletisim')}
                  className="bg-secure text-white px-8 py-3 rounded-sm hover:bg-secure/90 transition-colors"
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