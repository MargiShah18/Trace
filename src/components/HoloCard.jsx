import { useState, useRef, useCallback, forwardRef } from 'react'
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

const HoloCard = forwardRef(function HoloCard({ data, size = 'normal', interactive = true, flippable = false, className = '' }, externalRef) {
  const { ref: tiltRef, handlePointerMove, handlePointerLeave } = useTilt()
  const [isFlipped, setIsFlipped] = useState(false)

  const type = getType(data.type)
  const stars = RARITY_STARS[data.rarity] || 1
  const glowIntensity = RARITY_GLOW_INTENSITY[data.rarity] || 0.5

  const baseWidth = size === 'large' ? 420 : size === 'small' ? 280 : 350
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const width = Math.min(baseWidth, vw - 80)
  const scale = width / 350

  const setRefs = (node) => {
    if (!flippable) tiltRef.current = node
    if (typeof externalRef === 'function') externalRef(node)
    else if (externalRef) externalRef.current = node
  }

  // ── Front face content ──────────────────────────────────────────────────
  const frontFace = (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden"
      style={{
        background: '#0c0c0c',
        border: `1px solid ${type.color}22`,
        boxShadow: `0 0 40px ${type.color}18, 0 0 80px ${type.color}0c, inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      {/* Scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
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
              style={{ fontSize: `${13 * scale}px`, color: type.color }}
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
              background: `radial-gradient(circle, ${type.color}18 0%, transparent 70%)`,
              filter: `blur(${10 * scale}px)`,
            }}
          />
          <span className="relative" style={{ fontSize: `${48 * scale}px`, lineHeight: 1 }}>
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
                    style={{ fontSize: `${10 * scale}px`, color: '#aaa', width: `${72 * scale}px` }}
                  >
                    {trait.label}
                  </span>
                  <div
                    className="flex-1 rounded-full overflow-hidden"
                    style={{ height: `${6 * scale}px`, background: 'rgba(255,255,255,0.06)' }}
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
                    style={{ fontSize: `${10 * scale}px`, color: type.color, width: `${24 * scale}px` }}
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
            style={{ fontSize: `${10 * scale}px`, color: '#777', marginBottom: `${12 * scale}px` }}
          >
            "{data.flavor}"
          </p>
        )}

        <div className="flex-1" />

        {/* Footer */}
        <div
          className="flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: `${8 * scale}px` }}
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
              style={{ fontSize: `${7 * scale}px`, color: '#444', letterSpacing: '0.08em' }}
            >
              {data.rarity}
            </span>
          </div>
          <span
            className="font-mono"
            style={{ fontSize: `${8 * scale}px`, color: '#555', letterSpacing: '0.05em' }}
          >
            TRACE · IDENTITY ARTIFACT
          </span>
        </div>
      </div>
    </div>
  )

  // ── Back face content ───────────────────────────────────────────────────
  const backFace = (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 42%, ${type.color}38 0%, ${type.color}14 45%, #090909 72%)`,
        border: `1px solid ${type.color}30`,
        boxShadow: `0 0 ${25 * glowIntensity}px ${type.glow}, 0 0 ${50 * glowIntensity}px ${type.color}08`,
      }}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />

      {/* Outer ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: `${240 * scale}px`,
          height: `${240 * scale}px`,
          borderRadius: '50%',
          border: `1px solid ${type.color}22`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Inner ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: `${170 * scale}px`,
          height: `${170 * scale}px`,
          borderRadius: '50%',
          border: `1px solid ${type.color}18`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ gap: `${18 * scale}px` }}
      >
        {/* Big emoji with glow */}
        <span
          style={{
            fontSize: `${96 * scale}px`,
            lineHeight: 1,
            filter: `drop-shadow(0 0 ${22 * scale}px ${type.color}) drop-shadow(0 0 ${8 * scale}px ${type.color}aa)`,
          }}
        >
          {data.avatar || '🎭'}
        </span>

        {/* Type badge */}
        <div className="flex flex-col items-center" style={{ gap: `${5 * scale}px` }}>
          <span
            className="font-mono uppercase"
            style={{
              fontSize: `${13 * scale}px`,
              color: type.color,
              letterSpacing: '0.18em',
              fontWeight: 700,
            }}
          >
            {type.emoji} {type.label}
          </span>
          <span
            className="font-mono uppercase"
            style={{
              fontSize: `${8 * scale}px`,
              color: `${type.color}60`,
              letterSpacing: '0.12em',
            }}
          >
            Identity Artifact
          </span>
        </div>
      </div>
    </div>
  )

  // ── Flippable render (tilt on hover + flip on click) ───────────────────
  const flipperRef = useRef(null)
  const flipRafRef = useRef(null)
  const isFlippedRef = useRef(false)

  const handleFlippableTiltMove = useCallback((e) => {
    const el = flipperRef.current
    if (!el) return
    if (flipRafRef.current) cancelAnimationFrame(flipRafRef.current)
    flipRafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rotX = (0.5 - y) * 28
      const rotY = (x - 0.5) * 28
      const flipAngle = isFlippedRef.current ? 180 : 0
      el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY + flipAngle}deg) scale3d(1.02,1.02,1.02)`
      el.style.transition = 'transform 120ms ease-out'
      el.style.setProperty('--mouse-x', `${x * 100}%`)
      el.style.setProperty('--mouse-y', `${y * 100}%`)
    })
  }, [])

  const handleFlippableTiltLeave = useCallback(() => {
    const el = flipperRef.current
    if (!el) return
    if (flipRafRef.current) cancelAnimationFrame(flipRafRef.current)
    const flipAngle = isFlippedRef.current ? 180 : 0
    el.style.transform = `rotateX(0deg) rotateY(${flipAngle}deg) scale3d(1,1,1)`
    el.style.transition = 'transform 600ms ease-out'
    el.style.setProperty('--mouse-x', '50%')
    el.style.setProperty('--mouse-y', '50%')
  }, [])

  const handleFlipClick = useCallback(() => {
    const el = flipperRef.current
    if (!el) return
    isFlippedRef.current = !isFlippedRef.current
    setIsFlipped(isFlippedRef.current)
    const flipAngle = isFlippedRef.current ? 180 : 0
    el.style.transform = `rotateX(0deg) rotateY(${flipAngle}deg) scale3d(1,1,1)`
    el.style.transition = 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)'
  }, [])

  if (flippable) {
    return (
      <div
        className={`relative select-none ${className}`}
        style={{
          width: `${width}px`,
          aspectRatio: '2 / 3',
          perspective: '1200px',
          '--type-color': type.color,
          '--type-glow': type.glow,
        }}
        onPointerMove={handleFlippableTiltMove}
        onPointerLeave={handleFlippableTiltLeave}
        onClick={handleFlipClick}
      >
        <div
          ref={flipperRef}
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            transform: 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
            cursor: 'pointer',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              '--mouse-x': '50%',
              '--mouse-y': '50%',
            }}
          >
            {frontFace}
          </div>

          {/* Back */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {backFace}
          </div>
        </div>
      </div>
    )
  }

  // ── Default (tilt) render ───────────────────────────────────────────────
  return (
    <div
      ref={setRefs}
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
      {frontFace}
    </div>
  )
})

export default HoloCard
