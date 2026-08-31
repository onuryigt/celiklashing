import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'
import emailjs from '@emailjs/browser'
import { SITE, OFFICES, mapEmbedUrl } from '../config/site'
import { useSeo } from '../hooks/useSeo'
import { PAGE_SEO } from '../config/seo'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  /** Bot tuzağı: insan bu alanı görmez, dolduran bot demektir. */
  company: string
}

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Yukarı kayan etiketli alan (A7). */
const Field: React.FC<{
  id: string
  label: string
  error?: string
  children: React.ReactNode
}> = ({ id, label, error, children }) => (
  <div className={`relative ${error ? 'motion-safe:animate-[shake_0.34s_cubic-bezier(.36,.07,.19,.97)]' : ''}`}>
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-3.5 top-4 origin-top-left text-[15px]
                    transition-transform duration-200 ease-tension
                    peer-focus:-translate-y-2.5 peer-focus:scale-[0.72]
                    peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.72]
                    ${error ? 'text-hazard' : 'text-steel-500 peer-focus:text-secure'}`}
      >
        {label}
      </label>
    </div>
    <div
      className={`overflow-hidden transition-[max-height,opacity] duration-200 ${
        error ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <p className="mt-1.5 text-[13px] text-hazard-ink">{error}</p>
    </div>
  </div>
)

const inputClass = (hasError?: boolean) =>
  `peer w-full rounded-sm border bg-white px-3.5 pb-2 pt-5 text-[15px] text-steel-900
   placeholder-transparent transition-[border-color,box-shadow] duration-200
   focus:outline-none focus:ring-4 ${
     hasError
       ? 'border-hazard focus:border-hazard focus:ring-hazard/15'
       : 'border-steel-400 focus:border-secure focus:ring-secure/15'
   }`

/**
 * EmailJS erisilemedigi ya da yapilandirilmadigi durumda, ziyaretcinin yazdigi
 * mesaj kaybolmasin diye kendi e-posta uygulamasinda acilacak bir baglanti
 * uretir. Form calismasa bile mesaj bize ulasir.
 */
const buildMailto = (d: FormData) => {
  const subject = d.subject?.trim() || 'Web sitesi teklif talebi'
  const body = [
    `Ad Soyad: ${d.name}`,
    `E-posta: ${d.email}`,
    d.phone ? `Telefon: ${d.phone}` : null,
    '',
    d.message,
  ]
    .filter((l) => l !== null)
    .join('\n')
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const Contact: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  /** Gonderim basarisizsa ziyaretciye sunulan yedek e-posta baglantisi. */
  const [fallbackHref, setFallbackHref] = useState<string | null>(null)

  useSeo(PAGE_SEO.contact)

  // EmailJS artık npm paketinden geliyor. Daha önce hem CDN <script> etiketi
  // hem npm paketi yükleniyordu ve kod `window.emailjs` kullanıyordu; CDN
  // erişilemediğinde form tamamen çalışmaz hâle geliyordu.
  useEffect(() => {
    if (PUBLIC_KEY) emailjs.init(PUBLIC_KEY)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: 'onTouched' })

  const onSubmit = async (data: FormData) => {
    // Tuzak alan doluysa sessizce başarı göster; bot geri bildirim almasın.
    if (data.company) {
      setStatus('sent')
      reset()
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error')
      setFallbackHref(buildMailto(data))
      setErrorMsg('Formu şu anda buradan gönderemiyoruz. Yazdıklarınız duruyor —')
      return
    }

    setStatus('sending')
    setErrorMsg(null)
    setFallbackHref(null)

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: data.name,
        reply_to: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      })
      setStatus('sent')
      reset()
      window.setTimeout(() => setStatus('idle'), 6000)
    } catch (err) {
      console.error('E-posta gönderilemedi:', err)
      setStatus('error')
      setFallbackHref(buildMailto(data))
      setErrorMsg('Mesajınız gönderilemedi. Yazdıklarınız duruyor —')
    }
  }

  const contactCards = [
    ...OFFICES.map((office) => ({
      Icon: MapPinIcon,
      title: office.label,
      body: (
        <>
          {office.street}
          <br />
          {office.district} / {office.city}
        </>
      ),
    })),
    {
      Icon: PhoneIcon,
      title: 'Telefon',
      body: (
        <a href={`tel:${SITE.phoneHref}`} className="hover:text-secure transition-colors">
          {SITE.phone}
        </a>
      ),
    },
    {
      Icon: EnvelopeIcon,
      title: 'E-posta',
      body: (
        <a href={`mailto:${SITE.email}`} className="hover:text-secure transition-colors">
          {SITE.email}
        </a>
      ),
    },
    { Icon: ClockIcon, title: 'Çalışma Saatleri', body: <>7/24 hizmetinizdeyiz</> },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-steel-900 text-white pt-36 pb-20 overflow-hidden">
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: 'url("/contact-bg.webp")', backgroundPosition: 'center 74%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900/85 to-steel-900/40" />
        <div className="container relative">
          <span className="eyebrow">İletişim</span>
          <h1 className="text-white text-4xl md:text-6xl mt-3 max-w-2xl">
            Yükünüzü anlatın, çözümü birlikte kuralım.
          </h1>
          <p className="mt-5 text-white/85 text-lg max-w-2xl">
            Saha ekibimiz 7/24 ulaşılabilir. Aciliyeti olan operasyonlar için telefonla
            aramanız en hızlısı.
          </p>
        </div>
      </section>

      {/* İletişim + form */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 content-start">
              {contactCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card p-6"
                >
                  <div className="flex gap-4">
                    <card.Icon className="w-5 h-5 text-hazard shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="text-lg">{card.title}</h3>
                      <p className="mt-1.5 text-sm text-steel-600 leading-relaxed">{card.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 card p-6 md:p-9"
            >
              <span className="eyebrow">Teklif formu</span>
              <h2 className="text-2xl md:text-3xl mt-2">Bize ulaşın</h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
                {/* Bot tuzağı — ekranda ve ekran okuyucuda görünmez. */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  {...register('company')}
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id="name" label="Ad Soyad *" error={errors.name?.message}>
                    <input
                      id="name"
                      type="text"
                      placeholder=" "
                      aria-invalid={!!errors.name}
                      className={inputClass(!!errors.name)}
                      {...register('name', { required: 'Adınızı yazar mısınız?' })}
                    />
                  </Field>

                  <Field id="email" label="E-posta *" error={errors.email?.message}>
                    <input
                      id="email"
                      type="email"
                      placeholder=" "
                      aria-invalid={!!errors.email}
                      className={inputClass(!!errors.email)}
                      {...register('email', {
                        required: 'Size dönebilmemiz için e-posta gerekli.',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Bu adres eksik görünüyor — örnek: ad@firma.com',
                        },
                      })}
                    />
                  </Field>

                  <Field id="phone" label="Telefon" error={errors.phone?.message}>
                    <input
                      id="phone"
                      type="tel"
                      placeholder=" "
                      className={inputClass(!!errors.phone)}
                      {...register('phone')}
                    />
                  </Field>

                  <Field id="subject" label="Konu" error={errors.subject?.message}>
                    <input
                      id="subject"
                      type="text"
                      placeholder=" "
                      className={inputClass(!!errors.subject)}
                      {...register('subject')}
                    />
                  </Field>
                </div>

                <Field id="message" label="Yükünüzü ve güzergâhı kısaca anlatın *" error={errors.message?.message}>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder=" "
                    aria-invalid={!!errors.message}
                    className={`${inputClass(!!errors.message)} resize-y`}
                    {...register('message', { required: 'Kısa bir açıklama yazar mısınız?' })}
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-primary min-w-[190px] py-3 disabled:opacity-80 disabled:cursor-wait"
                  >
                    {status === 'sending' ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                        />
                        Gönderiliyor
                      </>
                    ) : status === 'sent' ? (
                      'İletildi ✓'
                    ) : (
                      'Gönder'
                    )}
                  </button>
                  <p className="text-xs text-steel-500">* işaretli alanlar zorunlu</p>
                </div>

                {/* Durum bildirimi — ekran okuyucuya da duyurulur. */}
                <div aria-live="polite">
                  <AnimatePresence mode="wait">
                    {status === 'sent' && (
                      <motion.p
                        key="sent"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-sm bg-secure-soft text-secure-ink px-4 py-3 text-sm"
                      >
                        Mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.
                      </motion.p>
                    )}
                    {status === 'error' && errorMsg && (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-sm bg-hazard-soft text-hazard-ink px-4 py-3 text-sm"
                      >
                        {errorMsg}{' '}
                        {fallbackHref && (
                          <a href={fallbackHref} className="underline font-semibold">
                            e-posta uygulamanızla gönderin
                          </a>
                        )}
                        {fallbackHref && <> ya da </>}
                        <a href={`tel:${SITE.phoneHref}`} className="underline font-semibold">
                          {SITE.phone}
                        </a>{' '}
                        numarasından bize ulaşın.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Harita */}
      <section className="py-20 bg-steel-100 border-t border-steel-200">
        <div className="container">
          <div className="max-w-2xl">
            <span className="eyebrow">Ofisler</span>
            <h2 className="text-3xl md:text-4xl mt-3">Bizi ziyaret edin</h2>
            <p className="mt-4 text-steel-600">
              {SITE.name} olarak {OFFICES.map((o) => o.city).join(' ve ')} ofislerimizde
              sizi bekliyoruz. Ekibimizle tanışın, ihtiyaçlarınızı birlikte
              değerlendirelim.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {OFFICES.map((office) => (
              <div key={office.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-xl">{office.label}</h3>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${office.street}, ${office.district}/${office.city}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label text-secure"
                  >
                    Yol tarifi al →
                  </a>
                </div>
                <p className="mt-2 text-sm text-steel-600">
                  {office.street}, {office.district}/{office.city}
                </p>
                <div className="mt-4 h-[320px] rounded-sm overflow-hidden border border-steel-300">
                  <iframe
                    title={`${office.label} konumu — Google Haritalar`}
                    src={mapEmbedUrl(office)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
