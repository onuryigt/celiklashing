import React, { useState, useEffect } from 'react'
import { useForm, FieldError } from 'react-hook-form'
import { motion } from 'framer-motion'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

// .env dosyasından değerleri alın
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

// TypeScript için tip tanımlaması
declare global {
  interface Window {
    emailjs: any;
  }
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const loadEmailJS = async () => {
      try {
        if (PUBLIC_KEY) {
          await window.emailjs.init(PUBLIC_KEY);
          console.log('EmailJS initialized successfully');
        }
      } catch (error) {
        console.error('EmailJS initialization error:', error);
      }
    };

    loadEmailJS();
  }, []);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    if (!SERVICE_ID || !TEMPLATE_ID) {
      setError('Email servisi yapılandırması eksik!');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      };

      const response = await window.emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      if (response.status === 200) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error('E-posta gönderilemedi');
      }
    } catch (err) {
      console.error('Email gönderirken hata:', err);
      setError('Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (error?: FieldError) => 
    "w-full px-4 py-2 rounded-lg border " + 
    (error ? "border-red-500" : "border-gray-300") + 
    " focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"

  const getButtonClassName = () =>
    "w-full btn btn-primary py-3 relative " + 
    (isSubmitting ? "opacity-80" : "")

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 overflow-hidden mt-20">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 object-cover object-bottom"
          style={{
            backgroundImage: 'url("/contact-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 74%',
          }}
        />
        <div className="relative container mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            İletişime Geçin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-3xl mx-auto"
          >
            7/24 hizmetinizdeyiz. Bizimle iletişime geçin, uzman ekibimiz size yardımcı olsun.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Adres</h3>
                    <p className="text-gray-600">
                      Starport Residence, Yenişehir Mah. Dedepaşa Cad. No:19 Kat:23 D:115
                      <br />
                      Pendik/İstanbul
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <PhoneIcon className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Telefon</h3>
                    <p className="text-gray-600">+90 (216) 999 88 77</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <EnvelopeIcon className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">E-posta</h3>
                    <p className="text-gray-600">info@celiklashing.com</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <ClockIcon className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Çalışma Saatleri</h3>
                    <p className="text-gray-600">7/24 Hizmetinizdeyiz</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Bize Ulaşın</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Ad Soyad zorunludur" })}
                    className={getInputClassName(errors.name)}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "E-posta zorunludur",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Geçerli bir e-posta adresi giriniz",
                      },
                    })}
                    className={getInputClassName(errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Telefon numarası zorunludur",
                      pattern: {
                        value: /^[0-9\s+()-]+$/,
                        message: "Geçerli bir telefon numarası giriniz",
                      },
                    })}
                    className={getInputClassName(errors.phone)}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Konu
                  </label>
                  <input
                    type="text"
                    {...register("subject", { required: "Konu zorunludur" })}
                    className={getInputClassName(errors.subject)}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mesaj
                  </label>
                  <textarea
                    {...register("message", { required: "Mesaj zorunludur" })}
                    rows={4}
                    className={getInputClassName(errors.message)}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={getButtonClassName()}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    "Gönder"
                  )}
                </button>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-center font-medium"
                  >
                    {error}
                  </motion.div>
                )}

                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-center font-medium"
                  >
                    Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Bizi Ziyaret Edin
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              Starport Residence'taki ofisimize bekliyoruz. Profesyonel ekibimizle tanışın, ihtiyaçlarınızı dinleyelim.
            </motion.p>
          </div>

          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.847145973634!2d29.23324187668457!3d40.87654997136689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad0f41e9c3925%3A0x42c2e8c8c2140c13!2sStarport%20Residence!5e0!3m2!1str!2str!4v1710775044407!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
