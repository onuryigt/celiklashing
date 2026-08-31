import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Sabitlenmemiş yük ile lashing uygulanmış yükün yan yana karşılaştırması.
 *
 * Eskiden bu bölüm 300 satırın üzerinde, `left: 47%`, `rotate: -147deg` gibi
 * elle hesaplanmış yüzde ve açı değerleriyle kuruluyordu; her ekran boyutunda
 * halatlar yükün dışına taşıyordu. Artık iki sabit en-boy oranlı SVG.
 */

const Crate: React.FC<{ x: number; y: number; tone: string }> = ({ x, y, tone }) => (
  <g>
    <rect x={x} y={y} width="150" height="86" rx="3" fill={tone} fillOpacity="0.18" stroke={tone} strokeWidth="2" />
    {[0, 1, 2].map((c) =>
      [0, 1].map((r) => (
        <rect
          key={`${c}-${r}`}
          x={x + 12 + c * 44}
          y={y + 14 + r * 32}
          width="34"
          height="22"
          rx="2"
          fill={tone}
          fillOpacity="0.22"
        />
      )),
    )}
  </g>
)

const Panel: React.FC<{
  variant: 'loose' | 'secured'
  title: string
  note: string
}> = ({ variant, title, note }) => {
  const reduce = useReducedMotion()
  const tone = variant === 'loose' ? '#BF3F09' : '#146A64'

  return (
    <div className="card p-5 md:p-7">
      <div className="flex items-center gap-2.5">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: tone }}
          aria-hidden="true"
        />
        <h3 className="text-xl">{title}</h3>
      </div>

      <svg
        viewBox="0 0 320 200"
        className="w-full h-auto mt-5"
        role="img"
        aria-label={variant === 'loose' ? 'Sabitlenmemiş yük konteyner içinde savruluyor' : 'Lashing uygulanmış yük yerinde sabit duruyor'}
      >
        {/* Konteyner gövdesi */}
        <rect x="20" y="26" width="280" height="150" rx="4" fill="none" stroke="#B5C0BF" strokeWidth="2" />
        <line x1="20" y1="176" x2="300" y2="176" stroke="#7A858B" strokeWidth="3" />

        {variant === 'loose' ? (
          // Sabitlenmemiş: yük konteyner içinde savruluyor
          <motion.g
            animate={reduce ? undefined : { x: [-16, 16, -16], rotate: [-2.5, 2.5, -2.5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '160px 130px' }}
          >
            <Crate x={85} y={86} tone={tone} />
          </motion.g>
        ) : (
          <>
            <Crate x={85} y={86} tone={tone} />
            {/* Lashing halatları — konteyner köşelerinden yükün köşelerine */}
            {[
              [24, 172, 85, 86, 105],
              [296, 172, 235, 86, 105],
              [24, 172, 85, 172, 61],
              [296, 172, 235, 172, 61],
              [160, 30, 160, 86, 56],
            ].map(([x1, y1, x2, y2, len], i) => (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={tone}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={len}
                initial={reduce ? { strokeDashoffset: 0 } : { strokeDashoffset: len }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.12, ease: [0.2, 0.85, 0.3, 1] }}
              />
            ))}
            {/* Tokalar */}
            {[
              [24, 172],
              [296, 172],
              [160, 30],
              [85, 86],
              [235, 86],
            ].map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r="5"
                fill="#BF3F09"
                initial={reduce ? { scale: 1 } : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.6 + i * 0.08, ease: [0.3, 1.5, 0.5, 1] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            ))}
          </>
        )}
      </svg>

      <p className="mt-4 text-sm text-steel-600 leading-relaxed">{note}</p>
    </div>
  )
}

const SecuringCompare: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <Panel
      variant="loose"
      title="Sabitlenmemiş yük"
      note="Yol ve deniz koşullarında yük konteyner içinde hareket eder. Sonuç: yükte hasar, dengesiz ağırlık dağılımı ve tahliye sırasında güvenlik riski."
    />
    <Panel
      variant="secured"
      title="Lashing uygulanmış yük"
      note="Hesaplanmış gerginlikte kayış ve zincirlerle bağlanan yük yerinde kalır. Teslimden önce her bağlantı noktası tek tek kontrol edilir."
    />
  </div>
)

export default SecuringCompare
