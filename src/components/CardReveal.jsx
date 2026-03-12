import { useState, useEffect, useRef, useMemo } from 'react'
import { getType } from '../data/types'
import HoloCard from './HoloCard'

export default function CardReveal({ cardData, onShare, onPlayAgain, skipIntro = false }) {
  const [step, setStep] = useState(skipIntro ? 2 : 0)
  const cardRef = useRef(null)
  const type = getType(cardData.type)

  useEffect(() => {
    if (skipIntro) {
      setStep(2)
      const t = setTimeout(() => setStep(3), 1500)
      return () => clearTimeout(t)
    }

    const t1 = setTimeout(() => setStep(1), 300)
    const t2 = setTimeout(() => setStep(2), 2500)
    const t3 = setTimeout(() => setStep(3), 4500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [skipIntro])

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      key: i,
      size: 1 + Math.random() * 2.5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.1 + Math.random() * 0.25,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * -12,
    }))
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #0f0d0a 0%, #080706 50%, #050505 100%)',
      }}
    >
      {/* Particles in type color */}
      {particles.map((p) => (
        <div
          key={p.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: type.color,
            opacity: step >= 2 ? p.opacity : 0,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            transition: 'opacity 2s ease',
            boxShadow: `0 0 ${p.size * 2}px ${type.color}`,
          }}
        />
      ))}

      {/* Ambient glow — type colored */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${type.glow} 0%, ${type.color}08 30%, transparent 65%)`,
          opacity: step >= 2 ? 0.5 : 0,
          transition: 'opacity 2s ease',
        }}
      />

      {/* Secondary ambient */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          top: '30%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 60%)',
          opacity: step >= 2 ? 1 : 0,
          transition: 'opacity 2s ease',
        }}
      />

      {/* Step 1: Intro text */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          opacity: step === 1 ? 1 : 0,
          transform: step === 1 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '30px',
            height: '1px',
            background: 'rgba(212,160,84,0.3)',
            marginBottom: '20px',
          }}
        />
        <p
          className="font-medium"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '20px',
            color: '#a09888',
            letterSpacing: '0.01em',
          }}
        >
          Here's what we noticed.
        </p>
      </div>

      {/* Step 2: Card */}
      <div
        ref={cardRef}
        className="relative z-10"
        style={{
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? 'translateY(0)' : 'translateY(60px)',
          transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <HoloCard data={cardData} size="large" />
      </div>

      {/* Step 3: Archetype details + buttons */}
      <div
        className="relative z-10 text-center mt-10 max-w-md"
        style={{
          opacity: step >= 3 ? 1 : 0,
          transform: step >= 3 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
        }}
      >
        {cardData.archetype && (
          <>
            <h2
              className="font-bold mb-3"
              style={{
                fontSize: '24px',
                color: type.color,
                fontFamily: 'Georgia, "Times New Roman", serif',
                textShadow: `0 0 30px ${type.glow}`,
              }}
            >
              {cardData.archetype.name}
            </h2>
            <p
              className="mb-3 leading-relaxed"
              style={{
                fontSize: '15px',
                color: '#a09888',
                lineHeight: 1.8,
              }}
            >
              {cardData.archetype.description}
            </p>
            <p
              className="italic mb-10"
              style={{
                fontSize: '13px',
                color: '#6a6358',
              }}
            >
              Shadow: {cardData.archetype.shadow}
            </p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onShare}
            className="px-8 py-3.5 rounded-full font-semibold text-sm cursor-pointer"
            style={{
              background: type.gradient,
              color: '#000',
              border: 'none',
              transition: 'all 0.3s',
              boxShadow: `0 0 25px ${type.glow}`,
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 45px ${type.glow}`
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 25px ${type.glow}`
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ✦ Share My Card
          </button>

          <button
            onClick={onPlayAgain}
            className="px-8 py-3.5 rounded-full font-mono text-sm cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.03)',
              color: '#8a8078',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(212,160,84,0.2)'
              e.currentTarget.style.color = '#c4b8a8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = '#8a8078'
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
}
