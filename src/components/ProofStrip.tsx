import React from 'react'
import { motion } from 'framer-motion'
import { CLIENTS, CASES, STANDARDS } from '../config/proof'

/**
 * Kanıt bölümü: standartlar, çalışılan firmalar ve örnek projeler.
 *
 * Referans ve proje listeleri `src/config/proof.ts` dosyasından geliyor ve
 * boşken hiç render edilmiyor — böylece doldurulana kadar sitede boş çerçeve
 * ya da uydurma isim görünmüyor.
 */
const ProofStrip: React.FC = () => (
  <section className="py-20 md:py-28 bg-steel-100 border-y border-steel-200">
    <div className="container">
      <div className="max-w-xl">
        <span className="eyebrow">Standartlar</span>
        <h2 className="text-3xl md:text-5xl mt-3">Neye göre çalışıyoruz</h2>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-steel-300 border border-steel-300 rounded-sm overflow-hidden">
        {STANDARDS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.42, delay: i * 0.07, ease: [0.2, 0.85, 0.3, 1] }}
            className="bg-white p-6 md:p-7"
          >
            <span className="label text-hazard">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-xl mt-3">{item.title}</h3>
            <p className="mt-2 text-sm text-steel-600 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Çalışılan firmalar — proof.ts doldurulunca görünür. */}
      {CLIENTS.length > 0 && (
        <div className="mt-16">
          <span className="label text-steel-500">Birlikte çalıştığımız firmalar</span>
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
            {CLIENTS.map((client) =>
              client.logo ? (
                <img
                  key={client.name}
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className="h-9 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              ) : (
                <span key={client.name} className="font-display text-xl text-steel-500">
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
          <span className="label text-steel-500">Örnek projeler</span>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASES.map((c) => (
              <article key={c.title} className="card p-6">
                <h3 className="text-xl">{c.title}</h3>
                <dl className="mt-4 space-y-2 text-sm">
                  {[
                    ['Yük', c.cargo],
                    ['Güzergâh', c.port],
                    ['Çözüm', c.solution],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                      <dt className="label text-steel-500 w-24 shrink-0 pt-0.5">{k}</dt>
                      <dd className="text-steel-700">{v}</dd>
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

export default ProofStrip
