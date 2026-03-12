import { forwardRef } from 'react'
import { getType } from '../data/types'
import { useTilt } from '../hooks/useTilt'

const RARITY_STARS = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  Epic: 4,
  Legendary: 5,
}

const RARITY_GLOW_INTENSITY = {
  Common: 0.5,
  Uncommon: 0.7,
  Rare: 1.0,
  Epic: 1.3,
  Legendary: 1.8,
}

const HoloCard = forwardRef(function HoloCard({ data, size = 'normal', interactive = true, className = '' }, externalRef) {
  const { ref: tiltRef, handlePointerMove, handlePointerLeave } = useTilt()
  const type = getType(data.type)
  const stars = RARITY_STARS[data.rarity] || 1
  const glowIntensity = RARITY_GLOW_INTENSITY[data.rarity] || 0.5

  const width = size === 'large' ? 420 : size === 'small' ? 280 : 350
  const scale = width / 350

  const cardRef = (node) => {
    tiltRef.current = node
    if (typeof externalRef === 'function') externalRef(node)
    else if (externalRef) externalRef.current = node
  }

  return (
    <div
      ref={cardRef}
      className={`relative select-none ${className}`}
      style={{
        width: `${width}px`,
        aspectRatio: '2 / 3',
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--type-color': type.color,
        '--type-glow': type.glow,
        willChange: 'transform',
      }}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerLeave={interactive ? handlePointerLeave : undefined}
    >
      {/* Card body */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: '#0c0c0c',
          border: `1px solid ${type.color}22`,
          boxShadow: `0 0 ${40 * glowIntensity}px ${type.glow}, 0 0 ${80 * glowIntensity}px ${type.color}10, inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}
      >
        {/* Scanline texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          }}
        />

        {/* Holographic foil overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-10"
          style={{
            background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 70%)`,
            mixBlendMode: 'color-dodge',
          }}
        />

        {/* Rainbow foil shimmer */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-10 opacity-20"
          style={{
            background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), 
              rgba(255,0,0,0.3) 0%, 
              rgba(255,127,0,0.2) 15%, 
              rgba(255,255,0,0.2) 30%, 
              rgba(0,255,0,0.2) 45%, 
              rgba(0,0,255,0.2) 60%, 
              rgba(139,0,255,0.2) 75%, 
              transparent 100%)`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Content container */}
        <div className="relative z-20 flex flex-col h-full" style={{ padding: `${20 * scale}px` }}>
          {/* Header */}
          <div className="flex items-start justify-between" style={{ marginBottom: `${16 * scale}px` }}>
            <div className="flex-1 min-w-0">
              <h2
                className="font-bold truncate leading-tight"
                style={{ fontSize: `${20 * scale}px`, color: '#f0f0f0' }}
              >
                {data.name || 'Anonymous'}
              </h2>
              <p
                className="truncate font-mono"
                style={{ fontSize: `${11 * scale}px`, color: '#888', marginTop: `${2 * scale}px` }}
              >
                {data.title || 'Identity Explorer'}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <span
                className="inline-flex items-center gap-1 rounded-full font-mono font-semibold"
                style={{
                  fontSize: `${10 * scale}px`,
                  padding: `${3 * scale}px ${10 * scale}px`,
                  background: `${type.color}18`,
                  color: type.color,
                  border: `1px solid ${type.color}33`,
                }}
              >
                {type.emoji} {type.label}
              </span>
              <span
                className="font-mono font-bold"
                style={{
                  fontSize: `${13 * scale}px`,
                  color: type.color,
                }}
              >
                Lv.{data.level || 1}
              </span>
            </div>
          </div>

          {/* Avatar zone */}
          <div
            className="relative flex items-center justify-center mx-auto"
            style={{
              width: `${100 * scale}px`,
              height: `${100 * scale}px`,
              marginBottom: `${16 * scale}px`,
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${type.glow} 0%, transparent 70%)`,
                filter: 'blur(12px)',
              }}
            />
            {/* Dot grid */}
            <div
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle, ${type.color} 1px, transparent 1px)`,
                backgroundSize: `${8 * scale}px ${8 * scale}px`,
              }}
            />
            <span
              className="relative"
              style={{ fontSize: `${48 * scale}px`, lineHeight: 1 }}
            >
              {data.avatar || '🎭'}
            </span>
          </div>

          {/* Core Traits */}
          {data.traits && data.traits.length > 0 && (
            <div style={{ marginBottom: `${14 * scale}px` }}>
              <h3
                className="font-mono uppercase tracking-wider"
                style={{
                  fontSize: `${9 * scale}px`,
                  color: '#666',
                  marginBottom: `${8 * scale}px`,
                  letterSpacing: '0.1em',
                }}
              >
                Core Traits
              </h3>
              <div className="space-y-1.5">
                {data.traits.map((trait, i) => (
                  <div key={i} className="flex items-center" style={{ gap: `${8 * scale}px` }}>
                    <span
                      className="font-mono shrink-0"
                      style={{
                        fontSize: `${10 * scale}px`,
                        color: '#aaa',
                        width: `${72 * scale}px`,
                      }}
                    >
                      {trait.label}
                    </span>
                    <div
                      className="flex-1 rounded-full overflow-hidden"
                      style={{
                        height: `${6 * scale}px`,
                        background: 'rgba(255,255,255,0.06)',
                      }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(100, Math.max(0, trait.value))}%`,
                          background: type.gradient,
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                    <span
                      className="font-mono font-semibold shrink-0 text-right"
                      style={{
                        fontSize: `${10 * scale}px`,
                        color: type.color,
                        width: `${24 * scale}px`,
                      }}
                    >
                      {trait.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Signature Moves */}
          {data.moves && data.moves.some((m) => m.trim()) && (
            <div style={{ marginBottom: `${12 * scale}px` }}>
              <h3
                className="font-mono uppercase tracking-wider"
                style={{
                  fontSize: `${9 * scale}px`,
                  color: '#666',
                  marginBottom: `${6 * scale}px`,
                  letterSpacing: '0.1em',
                }}
              >
                Signature Moves
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {data.moves.filter((m) => m.trim()).map((move, i) => (
                  <li
                    key={i}
                    className="flex items-start"
                    style={{
                      fontSize: `${11 * scale}px`,
                      color: '#ccc',
                      marginBottom: `${3 * scale}px`,
                      gap: `${6 * scale}px`,
                    }}
                  >
                    <span style={{ color: type.color, fontSize: `${9 * scale}px`, marginTop: `${2 * scale}px` }}>▸</span>
                    <span>{move}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Flavor text */}
          {data.flavor && (
            <p
              className="italic leading-snug"
              style={{
                fontSize: `${10 * scale}px`,
                color: '#777',
                marginBottom: `${12 * scale}px`,
              }}
            >
              "{data.flavor}"
            </p>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-2"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: `${8 * scale}px`,
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: `${12 * scale}px`,
                      opacity: i < stars ? 1 : 0.15,
                      filter: i < stars ? `drop-shadow(0 0 3px ${type.color})` : 'none',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: `${7 * scale}px`,
                  color: '#444',
                  letterSpacing: '0.08em',
                }}
              >
                {data.rarity}
              </span>
            </div>
            <span
              className="font-mono"
              style={{
                fontSize: `${8 * scale}px`,
                color: '#555',
                letterSpacing: '0.05em',
              }}
            >
              TROVE · IDENTITY ARTIFACT
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default HoloCard
