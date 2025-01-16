import React from 'react';
import { motion } from 'framer-motion';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('/hero2.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl"
          >
            Çerez Politikası
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-3xl mx-auto"
          >
            Web sitemizde kullanılan çerezler hakkında bilgilendirme
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="prose prose-lg prose-gray max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                  <p className="text-gray-700 m-0">
                    İnternet sitemizden en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminizi geliştirebilmek için Cookie kullanıyoruz. Cookie kullanılmasını tercih etmezseniz tarayıcınızın ayarlarından Cookie'leri silebilir ya da engelleyebilirsiniz. Ancak bunun internet sitemizi kullanımınızı etkileyebileceğini hatırlatmak isteriz. Tarayıcınızdan Cookie ayarlarınızı değiştirmediğiniz sürece bu sitede çerez kullanımını kabul ettiğinizi varsayacağız. Toplanan verilerle ilgili düzenlemelere internet sitemizde yer alan Gizlilik Politikası'ndan ulaşabilirsiniz.
                  </p>
                </div>

                <div className="space-y-12">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">İnternet Sitesinde Kullanılan Çerezler</h2>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Çerez Nedir ve Neden Kullanılmaktadır?</h3>
                    <p className="text-gray-600 mb-4">
                      Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcılar aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.
                    </p>

                    <p className="text-gray-600 mb-6">İnternet Sitemizde çerez kullanılmasının başlıca amaçları aşağıda sıralanmaktadır:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
                      <li>İnternet sitesinin işlevselliğini ve performansını arttırmak yoluyla sizlere sunulan hizmetleri geliştirmek,</li>
                      <li>İnternet Sitesini iyileştirmek ve İnternet Sitesi üzerinden yeni özellikler sunmak ve sunulan özellikleri sizlerin tercihlerine göre kişiselleştirmek;</li>
                      <li>İnternet Sitesinin, sizin ve Şirketimizin hukuki ve ticari güvenliğinin teminini sağlamak.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">İnternet Sitemizde Kullanılan Çerez Türleri</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Oturum Çerezleri (Session Cookies)</h4>
                        <p className="text-gray-600">
                          Oturum çerezleri ziyaretçilerimizin İnternet Sitesini ziyaretleri süresince kullanılan, tarayıcı kapatıldıktan sonra silinen geçici çerezlerdir. Bu tür çerezlerin kullanılmasının temel amacı ziyaretiniz süresince İnternet Sitesinin düzgün bir biçimde çalışmasının teminini sağlamaktır. Örneğin; birden fazla sayfadan oluşan çevrimiçi formları doldurmanızın sağlanmaktadır.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Kalıcı Çerezler (Persistent Cookies)</h4>
                        <p className="text-gray-600">
                          Kalıcı çerezler İnternet Sitesinin işlevselliğini artırmak, ziyaretçilerimize daha hızlı ve iyi bir hizmet sunmak amacıyla kullanılan çerez türleridir. Bu tür çerezler tercihlerinizi hatırlamak için kullanılır ve tarayıcılar vasıtasıyla cihazınızda depolanır. Kalıcı çerezlerin bazı türleri; İnternet Sitesini kullanım amacınız gibi hususlar göz önünde bulundurarak sizlere özel öneriler sunulması için kullanılabilmektedir.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Teknik Çerezler</h4>
                        <p className="text-gray-600">
                          Teknik çerezler ile internet sitesinin çalışması sağlanmakta, internet sitesinin çalışmayan sayfaları ve alanları tespit edilmektedir.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Otantikasyon Çerezleri</h4>
                        <p className="text-gray-600">
                          Ziyaretçiler, şifrelerini kullanarak internet sitesine giriş yapmaları durumunda, bu tür çerezler ile, ziyaretçinin internet sitesinde ziyaret ettiği her bir sayfada site kullanıcısı olduğu belirlenerek, kullanıcının her sayfada şifresini yeniden girmesi önlenir.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Analitik Çerezler</h4>
                        <p className="text-gray-600">
                          Analitik çerezler ile internet sitesini ziyaret edenlerin sayıları, internet sitesinde görüntülenen sayfaların tespiti, internet sitesi ziyaret saatleri, internet sitesi sayfaları kaydırma hareketleri gibi analitik sonuçların üretimini sağlayan çerezlerdir.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy; 