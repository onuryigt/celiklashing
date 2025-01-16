import React from 'react';
import { motion } from 'framer-motion';

const KVKK: React.FC = () => {
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
            KVKK Aydınlatma Metni
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-3xl mx-auto"
          >
            Kişisel verilerinizin güvenliği ve gizliliği bizim için önemlidir
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
                    Çelik Lashing Konteyner Denizcilik Ve Liman Hizmeti LTD. ŞTİ. ("Şirket") olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, Şirket olarak ürün ve hizmetlerimizden faydalanan kişiler dahil, Şirket ile ilişkili tüm şahıslara ait her türlü kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVK Kanunu")'na uygun olarak işlenerek, muhafaza edilmesine büyük önem atfetmekteyiz.
                  </p>
                </div>

                <div className="space-y-12">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Kişisel Verilerin Korunması ve İşlenmesi Politikasının Amacı</h2>
                    <p className="text-gray-600 mb-6">
                      Kişisel verilerin işlenmesinde başta özel hayatın gizliliği olmak üzere, kişilerin temel hak ve özgürlüklerini korumak ve kişisel verileri işleyen gerçek ve tüzel kişilerin yükümlülükleri ile uyacakları usul ve esasları düzenlemek amacıyla hazırlanmıştır.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Kişisel Verilerin İşlenme İlkeleri</h2>
                    <div className="space-y-4">
                      <p className="text-gray-600">Kişisel veriler aşağıdaki ilkeler doğrultusunda işlenmektedir:</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Hukuka ve dürüstlük kurallarına uygun olma</li>
                        <li>Doğru ve gerektiğinde güncel olma</li>
                        <li>Belirli, açık ve meşru amaçlar için işlenme</li>
                        <li>İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olma</li>
                        <li>İlgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza edilme</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
                    <div className="space-y-4">
                      <p className="text-gray-600">Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması</li>
                        <li>Şirketimiz tarafından sunulan ürün ve hizmetlerin sizlerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi</li>
                        <li>Şirketimizin insan kaynakları politikalarının yürütülmesinin temini</li>
                        <li>Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini</li>
                        <li>Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Kişisel Verilerin Aktarılması</h2>
                    <p className="text-gray-600 mb-6">
                      Kişisel verileriniz, Kanun ve sair mevzuat kapsamında ve açıklanan amaçlarla;
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>İş ortaklarımıza, tedarikçilerimize, hissedarlarımıza, iştiraklerimize,</li>
                      <li>Kanunen yetkili kamu kurumları ve özel kişilere yurtiçinde ve yurtdışında aktarılabilecektir.</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Kişisel Veri Sahibinin Hakları</h2>
                    <p className="text-gray-600 mb-6">
                      Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi aşağıda düzenlenen yöntemlerle Şirketimize iletmeniz durumunda Şirketimiz talebin niteliğine göre talebi en kısa sürede ve en geç otuz gün içinde sonuçlandıracaktır.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                      <p className="text-gray-600">Bu kapsamda kişisel veri sahipleri;</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                        <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                        <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                        <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                        <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
                        <li>KVK Kanunu'nun 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
                        <li>Kişisel verilerin düzeltilmesi, silinmesi ya da yok edilmesi halinde bu işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                        <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
                        <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme haklarına sahiptir.</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">6. İletişim</h2>
                    <p className="text-gray-600">
                      Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit edici gerekli bilgiler ve kullanmak istediğiniz hakkınıza yönelik açıklamalarınızla birlikte talebinizi KVK Kanunu'nun 11. maddesinde belirtilen hangi hakkınızın kullanımına ilişkin olduğunu da belirterek şirketimize iletebilirsiniz.
                    </p>
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

export default KVKK; 