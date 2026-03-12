import { useMemo, useState, useEffect } from 'react'

export default function IntroScreen({ onBegin }) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 200)
    return () => clearTimeout(t)
  }, [])

  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      key: i,
      size: 1 + Math.random() * 3,
      left: Math.random() * 100,
      top: Math.random() * 100,
      hue: 30 + Math.random() * 25,
      opacity: 0.15 + Math.random() * 0.35,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * -14,
    }))
  }, [])

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #100e0a 0%, #080706 50%, #050505 100%)',
      }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: `hsl(${p.hue}, 55%, 65%)`,
            opacity: entered ? p.opacity : 0,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 4}px hsl(${p.hue}, 50%, 45%)`,
            transition: 'opacity 2s ease',
          }}
        />
      ))}

      {/* Large warm ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '900px',
          height: '900px',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(212,160,84,0.07) 0%, rgba(180,120,60,0.02) 40%, transparent 65%)',
          opacity: entered ? 1 : 0,
          transition: 'opacity 2s ease 0.3s',
        }}
      />

      {/* Cool contrast glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          top: '65%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(100,140,160,0.04) 0%, transparent 60%)',
          opacity: entered ? 1 : 0,
          transition: 'opacity 2s ease 0.6s',
        }}
      />

      {/* Decorative card silhouette */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '260px',
          aspectRatio: '2 / 3',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(-3deg) scale(${entered ? 1 : 0.9})`,
          border: '1px solid rgba(212,160,84,0.06)',
          borderRadius: '18px',
          boxShadow: '0 0 80px rgba(212,160,84,0.03), inset 0 0 50px rgba(212,160,84,0.015)',
          animation: 'pulse-glow 5s ease-in-out infinite',
          opacity: entered ? 1 : 0,
          transition: 'opacity 1.5s ease 0.4s, transform 1.5s ease 0.4s',
        }}
      />

      {/* Breathing ring around card silhouette */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '320px',
          height: '320px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px solid rgba(212,160,84,0.04)',
          animation: 'pulse-glow 7s ease-in-out infinite',
          animationDelay: '-3s',
          opacity: entered ? 0.6 : 0,
          transition: 'opacity 2s ease 0.8s',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-xl">
        {/* Label */}
        <p
          className="font-mono uppercase tracking-widest mb-6"
          style={{
            fontSize: '10px',
            color: '#d4a054',
            letterSpacing: '0.3em',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.8s ease 0.3s',
          }}
        >
          Identity Artifact
        </p>

        {/* Heading */}
        <h1
          className="font-bold leading-tight mb-4"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: '#e8ddd0',
            lineHeight: 1.25,
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 0.8s ease 0.5s',
          }}
        >
          What does your identity look&nbsp;like when it's not a&nbsp;resume?
        </h1>

        {/* Accent line under heading */}
        <div
          className="mx-auto mb-8"
          style={{
            width: entered ? '60px' : '0px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #d4a054, transparent)',
            transition: 'width 0.8s ease 0.8s',
          }}
        />

        {/* Subtitle */}
        <p
          className="mb-12"
          style={{
            color: '#8a8078',
            fontSize: '16px',
            lineHeight: 1.8,
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.8s ease 0.9s',
          }}
        >
          Six moments. Your instincts. A card that reveals
          <br className="hidden sm:block" />
          what you didn't know about yourself.
        </p>

        {/* CTA */}
        <div
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.8s ease 1.1s',
          }}
        >
          <button
            onClick={onBegin}
            className="px-10 py-4 rounded-full font-medium cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(212,160,84,0.18) 0%, rgba(212,160,84,0.08) 100%)',
              color: '#d4a054',
              border: '1px solid rgba(212, 160, 84, 0.28)',
              fontSize: '15px',
              letterSpacing: '0.04em',
              transition: 'all 0.35s ease',
              boxShadow: '0 0 25px rgba(212,160,84,0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,160,84,0.3) 0%, rgba(212,160,84,0.18) 100%)'
              e.currentTarget.style.boxShadow = '0 0 50px rgba(212,160,84,0.18), 0 0 100px rgba(212,160,84,0.06)'
              e.currentTarget.style.borderColor = 'rgba(212, 160, 84, 0.5)'
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,160,84,0.18) 0%, rgba(212,160,84,0.08) 100%)'
              e.currentTarget.style.boxShadow = '0 0 25px rgba(212,160,84,0.08)'
              e.currentTarget.style.borderColor = 'rgba(212, 160, 84, 0.28)'
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
            }}
          >
            Begin →
          </button>
        </div>
      </div>

      {/* Bottom hint */}
      <p
        className="absolute bottom-8 font-mono text-xs tracking-wider"
        style={{
          color: '#3a3530',
          opacity: entered ? 1 : 0,
          transition: 'opacity 1s ease 1.5s',
        }}
      >
        ~ 3 minutes · no login · no data stored
      </p>
    </div>
  )
}
