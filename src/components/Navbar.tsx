import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '../config/site'

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hizmetler', href: '/hizmetler' },
  { name: 'Galeri', href: '/galeri' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'İletişim', href: '/iletisim' },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Aktif bağlantının altında kayan zemin.
  const listRef = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Route değişince mobil menüyü kapat.
  useEffect(() => setIsOpen(false), [location.pathname])

  useEffect(() => {
    const place = () => {
      const active = listRef.current?.querySelector<HTMLElement>('a[aria-current="page"]')
      if (!active) {
        setPill(null)
        return
      }
      setPill({ left: active.offsetLeft, width: active.offsetWidth })
    }

    place()
    window.addEventListener('resize', place)
    // Fontlar yüklenince bağlantı genişlikleri değişiyor; sonrasında tekrar ölç.
    document.fonts?.ready.then(place).catch(() => {})
    return () => window.removeEventListener('resize', place)
  }, [location.pathname])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm transition-[padding,box-shadow,border-color] duration-300 ease-tension border-b ${
        scrolled ? 'border-steel-300 shadow-card' : 'border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-[height] duration-300 ease-tension ${
            scrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
          }`}
        >
          {/* Logo — daha önce translate-x-[207px] gibi elle verilmiş
              kaydırmalarla yerine oturtulmuştu; artık normal akışta. */}
          <Link to="/" className="flex items-center gap-3 min-w-0 group">
            <img
              src="/logo-symbol.png"
              alt=""
              aria-hidden="true"
              className={`w-auto object-contain transition-[height] duration-300 ease-tension ${
                scrolled ? 'h-9 md:h-11' : 'h-11 md:h-14'
              }`}
            />
            <span className="flex flex-col leading-none min-w-0">
              <span
                className={`font-display tracking-[0.2em] text-steel-900 transition-[font-size] duration-300 ease-tension ${
                  scrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                }`}
              >
                ÇELİK
              </span>
              <span className="label text-steel-500 mt-0.5 truncate">
                Lashing &amp; Port Services
              </span>
            </span>
          </Link>

          {/* Masaüstü menüsü */}
          <div ref={listRef} className="hidden md:flex items-center relative">
            {pill && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 rounded-sm bg-steel-100"
                initial={false}
                animate={{ x: pill.left, width: pill.width }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                style={{ left: 0 }}
              />
            )}
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  `relative z-10 px-3.5 py-2 text-sm rounded-sm transition-colors ${
                    isActive
                      ? 'text-steel-900 font-semibold'
                      : 'text-steel-600 hover:text-secure'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={SITE.corporateMail}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex btn btn-outline"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Kurumsal E-posta
            </a>

            {/* Mobil menü düğmesi — daha önce erişilebilirlik etiketi yoktu. */}
            <motion.button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2.5 rounded-sm text-steel-700 hover:bg-steel-100 transition-colors"
              whileTap={{ scale: 0.94 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobil menü */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.85, 0.3, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-2 border-t border-steel-200 flex flex-col">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `px-3 py-3 text-sm rounded-sm border-l-2 transition-colors ${
                        isActive
                          ? 'border-hazard text-steel-900 font-semibold bg-steel-100'
                          : 'border-transparent text-steel-600 hover:bg-steel-50'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <a
                  href={SITE.corporateMail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-3 text-sm text-secure border-l-2 border-transparent"
                >
                  Kurumsal E-posta →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
