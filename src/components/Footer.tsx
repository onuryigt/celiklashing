import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { SITE, FOUNDED_YEAR } from '../config/site'

const services = [
  ['gemi-proje-lashing', 'Gemi & Proje Lashing'],
  ['arac-ustu-lashing', 'Araç Üstü Lashing'],
  ['konteyner-lashing', 'Konteyner Lashing'],
  ['vci-koruma', 'VCI Koruma'],
  ['sandiklama', 'Sandıklama'],
  ['brandalama', 'Brandalama'],
]

const socials = [
  { href: SITE.social.facebook, Icon: FaFacebook, label: 'Facebook' },
  { href: SITE.social.instagram, Icon: FaInstagram, label: 'Instagram' },
  { href: SITE.social.linkedin, Icon: FaLinkedin, label: 'LinkedIn' },
]

const Footer: React.FC = () => (
  <footer className="bg-steel-900 text-white/80">
    <div className="container py-16">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Marka */}
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/logo.png" alt="" aria-hidden="true" className="h-12 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-[0.2em] text-white">ÇELİK</span>
              <span className="label text-white/50 mt-1">Lashing &amp; Port Services</span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-relaxed max-w-xs">
            {FOUNDED_YEAR} yılından bu yana gemi, konteyner ve araç üstü lashing;
            VCI koruma, sandıklama ve brandalama hizmetleri.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 grid place-items-center rounded-sm bg-white/10
                           hover:bg-hazard transition-colors duration-200"
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Kurumsal */}
        <nav aria-label="Kurumsal">
          <h2 className="label text-white/50">Kurumsal</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ['/hakkimizda', 'Hakkımızda'],
              ['/hizmetler', 'Hizmetlerimiz'],
              ['/galeri', 'Galeri'],
              ['/iletisim', 'İletişim'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hizmetler */}
        <nav aria-label="Hizmetler">
          <h2 className="label text-white/50">Hizmetler</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map(([id, label]) => (
              <li key={id}>
                <Link to={`/hizmetler/${id}`} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* İletişim */}
        <div>
          <h2 className="label text-white/50">İletişim</h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <FaMapMarkerAlt className="w-4 h-4 text-hazard shrink-0 mt-0.5" aria-hidden="true" />
              <span className="leading-relaxed">
                {SITE.address.street}, {SITE.address.district}/{SITE.address.city}
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <FaPhone className="w-4 h-4 text-hazard shrink-0" aria-hidden="true" />
              <a href={`tel:${SITE.phoneHref}`} className="hover:text-white transition-colors">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <FaEnvelope className="w-4 h-4 text-hazard shrink-0" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center text-xs text-white/50">
        <p>
          © {new Date().getFullYear()} {SITE.shortName}. Tüm hakları saklıdır. Design by{' '}
          <a
            href="https://www.justgida.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Just
          </a>
        </p>
        <div className="flex gap-5">
          <Link to="/kvkk" className="hover:text-white transition-colors">
            KVKK Aydınlatma Metni
          </Link>
          <Link to="/cerez-politikasi" className="hover:text-white transition-colors">
            Çerez Politikası
          </Link>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
