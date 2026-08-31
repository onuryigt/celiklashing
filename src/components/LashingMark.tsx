import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  /** Koyu fotoğraf üzerinde mi, açık zeminde mi duruyor. */
  tone?: 'onDark' | 'onLight'
  className?: string
}

/**
 * Yükün lashing halatlarıyla sabitlenmesi: halatlar sırayla gerilir, tokalar
 * yerine oturur, yük bir kez oturup sabitlenir.
 *
 * Tamamen SVG — hiçbir görsel dosyası indirilmiyor. Sabit en-boy oranlı bir
 * kutu içinde yaşadığı için her ekran genişliğinde kendini ölçekliyor;
 * eski ana sayfadaki `top: 3050px` türü elle konumlandırmaya ihtiyaç yok.
 */
const LashingMark: React.FC<Props> = ({ tone = 'onDark', className = '' }) => {
  const reduce = useReducedMotion()

  const strap = tone === 'onDark' ? 'rgba(255,255,255,.92)' : '#146A64'
  const anchor = '#BF3F09'
  const deck = tone === 'onDark' ? 'rgba(255,255,255,.34)' : '#B5C0BF'
  const loadFill = tone === 'onDark' ? 'rgba(255,255,255,.10)' : '#E3E8E7'
  const loadLine = tone === 'onDark' ? 'rgba(255,255,255,.55)' : '#7A858B'
  const cell = tone === 'onDark' ? 'rgba(255,255,255,.18)' : '#B5C0BF'

  // [x1, y1, x2, y2, uzunluk] — uzunluk stroke-dasharray için, ölçülmüş değer.
  const straps: Array<[number, number, number, number, number]> = [
    [70, 160, 330, 60, 279],
    [830, 160, 570, 60, 279],
    [70, 160, 330, 128, 262],
    [830, 160, 570, 128, 262],
    [450, 16, 450, 52, 36],
  ]

  const anchors: Array<[number, number]> = [
    [70, 160],
    [830, 160],
    [450, 16],
    [330, 52],
    [570, 52],
    [330, 128],
    [570, 128],
  ]

  return (
    <svg
      viewBox="0 0 900 180"
      className={`w-full h-auto ${className}`}
      role="img"
      aria-label="Yükün lashing halatlarıyla güverteye sabitlenmesini gösteren animasyon"
    >
      {/* Güverte çizgisi */}
      <line x1="30" y1="160" x2="870" y2="160" stroke={deck} strokeWidth="2" strokeDasharray="6 7" />

      {/* Halatlar — sırayla gerilir */}
      {straps.map(([x1, y1, x2, y2, len], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={strap}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={len}
          initial={reduce ? { strokeDashoffset: 0 } : { strokeDashoffset: len }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: reduce ? 0 : 0.7,
            delay: reduce ? 0 : 0.15 + i * 0.12,
            ease: [0.2, 0.85, 0.3, 1],
          }}
        />
      ))}

      {/* Yük — halatlar gerildikten sonra bir kez oturur */}
      <motion.g
        initial={reduce ? false : { y: -5, scale: 1.015 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.9, ease: [0.3, 1.4, 0.5, 1] }}
        style={{ transformOrigin: '450px 90px' }}
      >
        <rect x="330" y="52" width="240" height="76" rx="3" fill={loadFill} stroke={loadLine} strokeWidth="2" />
        {/* Konteyner içi yük gözleri */}
        {[0, 1, 2].map((c) =>
          [0, 1].map((r) => (
            <rect
              key={`${c}-${r}`}
              x={346 + c * 70}
              y={66 + r * 30}
              width="58"
              height="22"
              rx="2"
              fill={cell}
            />
          )),
        )}
      </motion.g>

      {/* Tokalar */}
      {anchors.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="6"
          fill={anchor}
          initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: reduce ? 0 : 0.4,
            delay: reduce ? 0 : 0.85 + i * 0.07,
            ease: [0.3, 1.5, 0.5, 1],
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
    </svg>
  )
}

export default LashingMark
