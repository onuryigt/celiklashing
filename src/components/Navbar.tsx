import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hizmetler', href: '/hizmetler' },
  { name: 'Galeri', href: '/galeri' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'İletişim', href: '/iletisim' },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-[1920px] mx-auto px-2 md:px-8">
        <div className="flex justify-between items-center h-14 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 md:space-x-40 group">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-10 md:w-24 h-10 md:h-24 bg-white rounded-full shadow-lg translate-x-[10px] translate-y-[2px] md:translate-x-[207px] md:translate-y-[17px]" />
              <img 
                src="/logo-symbol.png" 
                alt="Çelik Lashing Logo" 
                className="w-[100px] md:w-[250px] h-[60px] md:h-[250px] relative object-contain z-20 translate-x-[10px] translate-y-[2px] md:translate-x-[210px] md:translate-y-[20px]"
              />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-lg md:text-4xl font-['Bebas_Neue'] tracking-[0.2em] text-gray-900">ÇELİK</span>
              <span className="text-[10px] md:text-base font-['Bebas_Neue'] tracking-[0.15em] text-gray-600">LASHING & PORT SERVICES</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-[#4B9CD3] text-sm font-medium tracking-wide transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </motion.svg>
          </motion.button>

          <div className="flex items-center gap-4">
            <a
              href="https://mail.google.com/a/celiklashing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-lg font-medium"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              Kurumsal E-posta
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-white"
            >
              <div className="py-1 space-y-0.5 border-t border-gray-100">
                {navigation.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all rounded-lg"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar 