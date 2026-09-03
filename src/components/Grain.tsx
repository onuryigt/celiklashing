import React, { useEffect } from 'react'

/**
 * Sinema kaydının film greni + karanlık html zemini.
 *
 * Yalnızca sinema kaydındaki sayfalarda (şimdilik ana sayfa) render edilir.
 * Bileşen bağlanınca <html> öğesine `cine` sınıfını ekler, ayrılınca kaldırır;
 * böylece iOS'taki elastik kaydırma boşluğu da karanlık kalır. Gren ve
 * animasyon stilleri index.css'te; hareket azaltma tercihinde gren sabit durur.
 */
const Grain: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('cine')
    return () => document.documentElement.classList.remove('cine')
  }, [])

  return <div className="grain" aria-hidden="true" />
}

export default Grain
