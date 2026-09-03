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

/** Sinema kaydındaki sayfalar: menü koyu zemin üstünde cam şerit olur. */
const CINE_PATHS = new Set(['/'])

/**
 * Üst menü — iki kayıt.
 *
 * Ana sayfada (sinema kaydı) şeffaf başlar, kaydırınca koyu cama döner.
 * İçerik sayfalarında (ofis kaydı) beyaz zemin. Aynı bileşen, aynı yerleşim;
 * yalnızca renk sınıfları `dark` bayrağına göre değişir.
 */
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const dark = CINE_PATHS.has(location.pathname)

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

  const c = dark
    ? {
        nav: scrolled ? 'bg-night/85 border-white/[.08] shadow-[0_10px_30px_-16px_rgba(0,0,0,.8)]' : 'bg-transparent border-transparent',
        word: 'text-white',
        sub: 'text-white/45',
        link: 'text-white/65 hover:text-white',
        linkOn: 'text-white font-semibold',
        pill: 'bg-white/10',
        list: 'border border-white/[.13] bg-night/60 backdrop-blur-xl rounded-full p-1',
        mail: 'border-white/25 text-white hover:bg-white hover:text-night',
        burger: 'text-white hover:bg-white/10',
        panel: 'border-white/[.08] bg-night/95',
        mLink: 'text-white/70 hover:bg-white/5',
        mLinkOn: 'border-hazard-light text-white font-semibold bg-white/10',
        mMail: 'text-secure-light',
      }
    : {
        nav: scrolled ? 'bg-white/95 border-steel-300 shadow-card' : 'bg-white/95 border-transparent',
        word: 'text-steel-900',
        sub: 'text-steel-500',
        link: 'text-steel-600 hover:text-secure',
        linkOn: 'text-steel-900 font-semibold',
        pill: 'bg-steel-100',
        list: '',
        mail: 'border-secure text-secure hover:bg-secure hover:text-white',
        burger: 'text-steel-700 hover:bg-steel-100',
        panel: 'border-steel-200 bg-white',
        mLink: 'text-steel-600 hover:bg-steel-50',
        mLinkOn: 'border-hazard text-steel-900 font-semibold bg-steel-100',
        mMail: 'text-secure',
      }

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-sm transition-[background-color,box-shadow,border-color] duration-300 ease-tension ${c.nav}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-[height] duration-300 ease-tension ${
            scrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
          }`}
        >
          {/* Logo — kırpılmış işaret; eski dosyadaki boş kenarlar ve
              translate-x hack'leri artık yok. */}
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo-mark.png"
              alt=""
              aria-hidden="true"
              width={236}
              height={257}
              className={`w-auto object-contain transition-[height] duration-300 ease-tension ${
                scrolled ? 'h-9 md:h-10' : 'h-10 md:h-12'
              } ${dark ? 'drop-shadow-[0_1px_6px_rgba(0,0,0,.5)]' : ''}`}
            />
            <span className="flex min-w-0 flex-col leading-none">
              <span
                className={`font-display tracking-[0.2em] transition-[font-size] duration-300 ease-tension ${c.word} ${
                  scrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                }`}
              >
                ÇELİK
              </span>
              <span className={`label mt-0.5 truncate ${c.sub}`}>Lashing &amp; Port Services</span>
            </span>
          </Link>

          {/* Masaüstü menüsü */}
          <div ref={listRef} className={`relative hidden items-center md:flex ${c.list}`}>
            {pill && (
              <motion.span
                aria-hidden="true"
                className={`absolute inset-y-0 rounded-full ${c.pill}`}
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
                  `relative z-10 rounded-full px-3.5 py-2 text-sm transition-colors ${isActive ? c.linkOn : c.link}`
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
              className={`btn hidden border bg-transparent lg:inline-flex ${c.mail}`}
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

            <motion.button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className={`rounded-sm p-2.5 transition-colors md:hidden ${c.burger}`}
              whileTap={{ scale: 0.94 }}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
              className="overflow-hidden md:hidden"
            >
              <div className={`flex flex-col border-t py-2 ${c.panel}`}>
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `rounded-sm border-l-2 px-3 py-3 text-sm transition-colors ${
                        isActive ? c.mLinkOn : `border-transparent ${c.mLink}`
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
                  className={`border-l-2 border-transparent px-3 py-3 text-sm ${c.mMail}`}
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
