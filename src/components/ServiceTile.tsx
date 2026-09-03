import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

type Props = {
  id: string
  title: string
  /** Küçük üst etiket: "Deniz", "Kara", "Konteyner"… */
  label: string
  /** Yoksa tipografik kare. */
  image?: string
  index?: number
}

/**
 * Sinema kaydındaki hizmet karesi.
 *
 * Kare, koyu; fotoğraf varsa kısık. Üzerine gelince ya da klavyeyle
 * odaklanınca ortadan bir kayış gerilir ve toka oturur — ışıklı sürümdeki
 * ServiceCard ile aynı hareket, aynı anlam.
 */
const ServiceTile: React.FC<Props> = ({ id, title, label, image, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.45, delay: index * 0.06, ease: [0.2, 0.85, 0.25, 1] }}
  >
    <Link
      to={`/hizmetler/${id}`}
      className="group relative block aspect-[4/3] overflow-hidden sm:aspect-square rounded-2xl border border-white/[.08] bg-night-panel text-white"
      style={
        image
          ? undefined
          : { background: 'radial-gradient(90% 80% at 80% 10%, rgba(79,182,174,.14), transparent 60%), #121719' }
      }
    >
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover brightness-[.62] contrast-[1.08] saturate-[.6] transition-[transform,filter] duration-700 ease-tension group-hover:scale-105 group-hover:brightness-[.72] group-hover:saturate-[.8] group-focus-visible:scale-105"
        />
      )}

      {/* Kayış */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 origin-left scale-x-0 bg-hazard-light shadow-[0_0_14px_rgba(240,118,63,.6)] transition-transform duration-[450ms] ease-tension group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
      {/* Toka */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-4 w-4 -ml-2 -mt-2 rotate-45 scale-0 border-2 border-night bg-hazard-light transition-transform delay-300 duration-300 ease-snap group-hover:scale-100 group-focus-visible:scale-100"
      />

      <div className="absolute inset-x-[18px] bottom-4 z-[2]">
        <div className="mb-1.5 font-mono text-[11px] uppercase tracking-label text-white/45">{label}</div>
        <h3 className={`font-display leading-tight text-white ${image ? 'text-[clamp(1.5rem,2.2vw,2rem)] font-normal' : 'text-[clamp(2rem,3vw,2.8rem)] font-light'}`}>
          {title}
        </h3>
        <div className="mt-2.5 translate-y-1.5 font-mono text-[11px] uppercase tracking-label text-secure-light opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          Detay →
        </div>
      </div>
    </Link>
  </motion.div>
)

export default ServiceTile
