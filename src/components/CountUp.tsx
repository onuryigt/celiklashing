import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type Props = {
  to: number
  suffix?: string
  /** Kart sırasına göre küçük gecikme, sayaçlar art arda başlasın diye. */
  delay?: number
  className?: string
}

/**
 * Ekrana girdiğinde 0'dan hedefe sayan rakam.
 *
 * Bir kez çalışır; kullanıcı yukarı çıkıp geri döndüğünde tekrar saymaz.
 * Hareket azaltma tercihi açıksa doğrudan son değeri gösterir.
 */
const CountUp: React.FC<Props> = ({ to, suffix = '', delay = 0, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) {
      setValue(to)
      return
    }

    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setValue(to)
      return
    }

    let frame = 0
    let timer = 0
    let done = false

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || done) continue
          done = true
          observer.disconnect()

          timer = window.setTimeout(() => {
            const duration = 1100
            let start: number | null = null

            const step = (ts: number) => {
              if (start === null) start = ts
              const p = Math.min((ts - start) / duration, 1)
              // easeOutCubic — hızlı başlar, hedefte yumuşak durur.
              setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
              if (p < 1) frame = requestAnimationFrame(step)
            }

            frame = requestAnimationFrame(step)
          }, delay)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [to, delay, reduce])

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {value}
      {suffix}
    </span>
  )
}

export default CountUp
