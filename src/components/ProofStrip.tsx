import React from 'react'
import { motion } from 'framer-motion'
import { CLIENTS, CASES, STANDARDS } from '../config/proof'

type Props = {
  /** Ana sayfa sinema kaydında koyu, diğer sayfalarda ışıklı. */
  tone?: 'light' | 'dark'
}

/**
 * Kanıt bölümü: standartlar, çalışılan firmalar ve örnek projeler.
 *
 * Referans ve proje listeleri `src/config/proof.ts` dosyasından geliyor ve
 * boşken hiç render edilmiyor — böylece doldurulana kadar sitede boş çerçeve
 * ya da uydurma isim görünmüyor.
 */
const ProofStrip: React.FC<Props> = ({ tone = 'light' }) => {
  const dark = tone === 'dark'
  const c = dark
    ? {
        section: 'border-t border-white/[.08] bg-night text-white',
        eyebrow: 'text-hazard-light',
        h2: 'text-white',
        grid: 'bg-white/[.08] border-white/[.08]',
        cell: 'bg-night',
        num: 'text-hazard-light',
        h3: 'text-white',
        p: 'text-white/65',
        label: 'text-white/45',
        client: 'text-white/45',
        card: 'border border-white/[.08] bg-night-panel',
        dt: 'text-white/45',
        dd: 'text-white/80',
      }
    : {
        section: 'bg-steel-100 border-y border-steel-200',
        eyebrow: 'text-hazard',
        h2: '',
        grid: 'bg-steel-300 border-steel-300',
        cell: 'bg-white',
        num: 'text-hazard',
        h3: '',
        p: 'text-steel-600',
        label: 'text-steel-500',
        client: 'text-steel-500',
        card: 'card',
        dt: 'text-steel-500',
        dd: 'text-steel-700',
      }

  return (
    <section className={`py-20 md:py-28 ${c.section}`}>
      <div className="container">
        <div className="max-w-xl">
          <span className={`label ${c.eyebrow}`}>Standartlar</span>
          <h2 className={`mt-3 text-3xl md:text-5xl ${dark ? 'font-display font-light text-white' : ''}`}>
            Neye göre çalışıyoruz
          </h2>
        </div>

        <div className={`mt-12 grid gap-px overflow-hidden rounded-sm border sm:grid-cols-2 lg:grid-cols-4 ${c.grid} ${dark ? 'rounded-2xl' : ''}`}>
          {STANDARDS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.42, delay: i * 0.07, ease: [0.2, 0.85, 0.3, 1] }}
              className={`p-6 md:p-7 ${c.cell}`}
            >
              <span className={`label ${c.num}`}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={`mt-3 text-xl ${c.h3}`}>{item.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${c.p}`}>{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Çalışılan firmalar — proof.ts doldurulunca görünür. */}
        {CLIENTS.length > 0 && (
          <div className="mt-16">
            <span className={`label ${c.label}`}>Birlikte çalıştığımız firmalar</span>
            <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
              {CLIENTS.map((client) =>
                client.logo ? (
                  <img
                    key={client.name}
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    className={`h-9 w-auto object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 ${dark ? 'brightness-0 invert' : ''}`}
                  />
                ) : (
                  <span key={client.name} className={`font-display text-xl ${c.client}`}>
                    {client.name}
                  </span>
                ),
              )}
            </div>
          </div>
        )}

        {/* Örnek projeler — proof.ts doldurulunca görünür. */}
        {CASES.length > 0 && (
          <div className="mt-16">
            <span className={`label ${c.label}`}>Örnek projeler</span>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CASES.map((cs) => (
                <article key={cs.title} className={`rounded-sm p-6 ${c.card}`}>
                  <h3 className={`text-xl ${c.h3}`}>{cs.title}</h3>
                  <dl className="mt-4 space-y-2 text-sm">
                    {[
                      ['Yük', cs.cargo],
                      ['Güzergâh', cs.port],
                      ['Çözüm', cs.solution],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-3">
                        <dt className={`label w-24 shrink-0 pt-0.5 ${c.dt}`}>{k}</dt>
                        <dd className={c.dd}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProofStrip
