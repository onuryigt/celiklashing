import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { SITE } from '../config/site'

const MainLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-white">
    {/* Klavye ve ekran okuyucu kullanıcıları menüyü atlayabilsin. */}
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70]
                 focus:bg-secure focus:text-white focus:px-4 focus:py-2 focus:rounded-sm"
    >
      İçeriğe geç
    </a>

    <Navbar />

    <main id="main" className="flex-grow">
      <PageTransition />
    </main>

    <Footer />

    {/* WhatsApp — metni artık hover'da genişleyip içeriği örtmüyor. */}
    <motion.a
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp üzerinden iletişime geçin"
      className="fixed bottom-5 right-5 z-40 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lift">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 motion-safe:animate-ping"
        />
        <FaWhatsapp className="relative w-7 h-7" aria-hidden="true" />
      </span>
      <span
        className="pointer-events-none absolute right-full mr-3 top-1/2 hidden -translate-y-1/2 whitespace-nowrap md:block
                   rounded-sm bg-steel-900 px-2.5 py-1.5 text-xs text-white opacity-0
                   transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        7/24 destek hattı
      </span>
    </motion.a>
  </div>
)

export default MainLayout
