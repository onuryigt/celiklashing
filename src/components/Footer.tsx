import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4">
        {/* Logo ve Şirket Bilgileri */}
        <div className="flex flex-col items-center mb-12 text-center">
          <Link to="/" onClick={scrollToTop} className="mb-4">
            <img src="/logo.png" alt="Çelik Lashing Logo" className="h-24" />
          </Link>
          <h2 className="text-2xl font-bold mb-2">ÇELİK LASHING & PORT SERVICES</h2>
          <p className="text-white/80 max-w-xl">
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kurumsal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hakkimizda" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/hizmetler" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Hizmetlerimiz */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hizmetler/gemi-proje-lashing" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Gemi & Proje Lashing
                </Link>
              </li>
              <li>
                <Link to="/hizmetler/arac-ustu-lashing" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Araç Üstü Lashing
                </Link>
              </li>
              <li>
                <Link to="/hizmetler/konteyner-lashing" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Konteyner Lashing
                </Link>
              </li>
              <li>
                <Link to="/hizmetler/vci-koruma" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  VCI Koruma
                </Link>
              </li>
              <li>
                <Link to="/hizmetler/sandiklama" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Sandıklama
                </Link>
              </li>
              <li>
                <Link to="/hizmetler/brandalama" onClick={scrollToTop} className="hover:text-primary transition-colors">
                  Brandalama
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-bold mb-4">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>
                  Yenişehir Mahallesi Osmanlı Bulvarı, Sümbül Sokak No:10 D:174, Starport Residence, Pendik/İstanbul
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="w-5 h-5 text-primary" />
                <a href="tel:+90216 592 88 65" className="hover:text-primary transition-colors">
                  +90 216 592 88 65
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-primary" />
                <a href="mailto:info@celiklashing.com" className="hover:text-primary transition-colors">
                  info@celiklashing.com
                </a>
              </li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sosyal Medya</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/people/%C3%87elik-Denizcilik-Konteyner-ve-Liman-Hizmetleri/100063509494638/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/celikdenizcilik/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://tr.linkedin.com/in/%C3%A7etin-%C3%A7elik-a65798160"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/60">
          <p>© 2025 Çelik Lashing. Tüm hakları saklıdır. Design by <a href="https://www.justgida.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Just</a></p>
          <div className="mt-2 space-x-4">
            <Link to="/kvkk" onClick={scrollToTop} className="hover:text-white transition-colors">
              KVKK Aydınlatma Metni
            </Link>
            <span>|</span>
            <Link to="/cerez-politikasi" onClick={scrollToTop} className="hover:text-white transition-colors">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer