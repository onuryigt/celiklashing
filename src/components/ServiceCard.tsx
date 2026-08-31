import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'

type Props = {
  id: string
  title: string
  description: string
  Icon: IconType
  index?: number
}

/**
 * Hizmet kartı: üzerine gelindiğinde görselin üzerinden bir kayış geçip
 * ortada toka kilitleniyor. Kartın tıklanabilir olduğunu da netleştiriyor.
 *
 * Hareket salt CSS ile (`group-hover` / `group-focus-within`) yapıldığı için
 * klavyeyle Tab'layan kullanıcıda da aynı şekilde çalışıyor.
 */
const ServiceCard: React.FC<Props> = ({ id, title, description, Icon, index = 0 }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.45, delay: index * 0.07, ease: [0.2, 0.85, 0.3, 1] }}
    className="group relative bg-white border border-steel-300 rounded-sm overflow-hidden
               shadow-card transition-[transform,box-shadow] duration-300 ease-tension
               hover:-translate-y-1 hover:shadow-lift focus-within:-translate-y-1 focus-within:shadow-lift"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-steel-200">
      <img
        src={`/services/${id}.webp`}
        alt={title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 ease-tension
                   group-hover:scale-105 group-focus-within:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-steel-900/75 via-steel-900/20 to-transparent" />

      {/* Kayış: soldan sağa gerilir */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 bg-hazard origin-left scale-x-0
                   transition-transform duration-[420ms] ease-tension
                   group-hover:scale-x-100 group-focus-within:scale-x-100"
      />
      {/* Toka: kayış oturduktan sonra kilitlenir */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 w-5 h-5 -ml-2.5 -mt-2.5 bg-hazard border-2 border-white
                   rotate-45 scale-0 transition-transform duration-300 ease-snap delay-300
                   group-hover:scale-100 group-focus-within:scale-100"
      />

      <div className="absolute left-4 bottom-4 flex items-center gap-2.5 text-white">
        <span className="w-9 h-9 grid place-items-center rounded-sm bg-white/15 backdrop-blur-sm">
          <Icon className="w-4 h-4" aria-hidden="true" />
        </span>
        <h3 className="text-lg text-white">{title}</h3>
      </div>
    </div>

    <div className="p-5">
      <p className="text-sm text-steel-600 leading-relaxed">{description}</p>
      <Link
        to={`/hizmetler/${id}`}
        className="label text-secure mt-4 inline-flex items-center gap-1.5
                   after:absolute after:inset-0 after:content-['']"
      >
        Detaylı Bilgi
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-tension group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  </motion.article>
)

export default ServiceCard
