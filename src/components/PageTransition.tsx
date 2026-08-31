import React, { useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/** Kapağın kapanıp açılması bu kadar sürer (sn). */
const DOOR = 0.46

/**
 * Sayfa geçişi: gemi ambar kapağını andıran kısa bir örtme.
 *
 * İki işi birden yapıyor:
 *  1. Route değişiminde içeriğin aniden yer değiştirmesini yumuşatıyor.
 *  2. Kaydırmayı başa alıyor. Daha önce bu iş bazı `Link`'lere elle eklenmiş
 *     `onClick={() => window.scrollTo(0, 0)}` ile yapılıyordu; menüden veya
 *     tarayıcı geri tuşundan gelindiğinde sayfa ortadan açılıyordu.
 */
const PageTransition: React.FC = () => {
  const location = useLocation()
  const outlet = useOutlet()
  const reduce = useReducedMotion()
  const [doorKey, setDoorKey] = useState(0)

  useEffect(() => {
    if (reduce) {
      window.scrollTo(0, 0)
      return
    }

    setDoorKey((k) => k + 1)
    // Kapak tam kapalıyken kaydır ki sıçrama görünmesin.
    const t = window.setTimeout(() => window.scrollTo(0, 0), DOOR * 1000 * 0.45)
    return () => window.clearTimeout(t)
  }, [location.pathname, reduce])

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduce ? 0 : 0.34, ease: [0.2, 0.85, 0.3, 1] }}
        >
          {outlet}
        </motion.div>
      </AnimatePresence>

      {!reduce && doorKey > 0 && (
        <div
          key={doorKey}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] grid grid-cols-2"
        >
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="bg-secure"
              style={{ transformOrigin: i === 0 ? 'top' : 'bottom' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1, 1, 0] }}
              transition={{
                duration: DOOR,
                times: [0, 0.45, 0.55, 1],
                ease: [0.5, 0, 0.3, 1],
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default PageTransition
