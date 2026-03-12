import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

const SCENE_VIBES = {
  1: { icon: '☕', accent: '#d4a054' },
  2: { icon: '💬', accent: '#c49060' },
  3: { icon: '🌅', accent: '#d4a054' },
  4: { icon: '🖥️', accent: '#a89080' },
  5: { icon: '👥', accent: '#c49060' },
  6: { icon: '🌙', accent: '#8a9aaa' },
}

function useTypewriter(text, speed = 22, startDelay = 400) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    let timeout

    const startTimeout = setTimeout(() => {
      const tick = () => {
        if (i < text.length) {
          const chunk = Math.random() > 0.85 ? 3 : Math.random() > 0.6 ? 2 : 1
          i = Math.min(i + chunk, text.length)
          setDisplayed(text.slice(0, i))
          const nextSpeed = text[i - 1] === '.' || text[i - 1] === '—' ? speed * 6 : 
                           text[i - 1] === ',' ? speed * 3 : speed
          timeout = setTimeout(tick, nextSpeed)
        } else {
          setDone(true)
        }
      }
      tick()
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
      clearTimeout(timeout)
    }
  }, [text, speed, startDelay])

  const skip = useCallback(() => {
    setDisplayed(text)
    setDone(true)
  }, [text])

  return { displayed, done, skip }
}

export default function ScenePlayer({ scene, scenes, onChoice }) {
  const [phase, setPhase] = useState('entering')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [leaving, setLeaving] = useState(false)
  const [flashOpacity, setFlashOpacity] = useState(0.6)
  const containerRef = useRef(null)

  const sceneNumber = scenes.findIndex((s) => s.id === scene.id) + 1
  const totalScenes = scenes.length
  const vibe = SCENE_VIBES[scene.id] || SCENE_VIBES[1]

  const { displayed, done: narrativeDone, skip: skipTypewriter } = useTypewriter(
    scene.narrative,
    20,
    800
  )

  useEffect(() => {
    setPhase('entering')
    setSelectedIndex(null)
    setLeaving(false)
    setFlashOpacity(0.6)

    const t1 = setTimeout(() => setFlashOpacity(0), 600)
    const t2 = setTimeout(() => setPhase('visible'), 100)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [scene.id])

  const handleSelect = useCallback((choice, index) => {
    if (selectedIndex !== null) return
    setSelectedIndex(index)

    setTimeout(() => {
      setLeaving(true)
      setTimeout(() => {
        onChoice(choice.scores)
      }, 450)
    }, 500)
  }, [selectedIndex, onChoice])

  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      key: i,
      size: 1 + Math.random() * 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.08 + Math.random() * 0.15,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * -12,
    }))
  }, [])

  const isVisible = phase === 'visible' && !leaving

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #0d0c0a 0%, #080706 50%, #050505 100%)',
        cursor: narrativeDone ? 'default' : 'pointer',
      }}
      onClick={() => { if (!narrativeDone) skipTypewriter() }}
    >
      {/* Scene transition flash */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${vibe.accent} 0%, transparent 70%)`,
          opacity: flashOpacity,
          transition: 'opacity 0.6s ease-out',
        }}
      />

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
            background: vibe.accent,
            opacity: isVisible ? p.opacity : 0,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            transition: 'opacity 1s ease',
          }}
        />
      ))}

      {/* Breathing ambient orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${vibe.accent}0a 0%, transparent 60%)`,
          animation: 'pulse-glow 4s ease-in-out infinite',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />

      {/* Small accent ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '200px',
          height: '200px',
          top: '38%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: `1px solid ${vibe.accent}08`,
          animation: 'pulse-glow 6s ease-in-out infinite',
          animationDelay: '-2s',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }}
      />

      {/* Main content */}
      <div
        className="w-full relative z-10"
        style={{
          maxWidth: '620px',
          opacity: leaving ? 0 : isVisible ? 1 : 0,
          transform: leaving ? 'translateY(-12px) scale(0.99)' : isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 450ms ease, transform 450ms ease',
        }}
      >
        {/* Top bar: scene icon + time/location + progress */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span
              style={{
                fontSize: '20px',
                opacity: 0.7,
                filter: 'grayscale(30%)',
              }}
            >
              {vibe.icon}
            </span>
            <p
              className="font-mono"
              style={{
                fontSize: '12px',
                color: '#6a6358',
                letterSpacing: '0.04em',
              }}
            >
              {scene.time} · {scene.location}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalScenes }).map((_, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: i + 1 === sceneNumber ? '20px' : '5px',
                  height: '5px',
                  background: i + 1 < sceneNumber
                    ? vibe.accent
                    : i + 1 === sceneNumber
                    ? vibe.accent
                    : 'rgba(255,255,255,0.06)',
                  borderRadius: i + 1 === sceneNumber ? '3px' : '50%',
                  transition: 'all 0.5s ease',
                  boxShadow: i + 1 === sceneNumber ? `0 0 10px ${vibe.accent}44` : 'none',
                  opacity: i + 1 < sceneNumber ? 0.4 : 1,
                }}
              />
            ))}
          </div>
        </div>

        {/* Narrative with typewriter */}
        <div
          className="mb-10 relative"
          style={{ minHeight: '120px' }}
        >
          <p
            className="leading-relaxed"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '17.5px',
              lineHeight: 2,
              color: '#c8bdb0',
            }}
          >
            {displayed}
            {!narrativeDone && (
              <span
                className="inline-block"
                style={{
                  width: '2px',
                  height: '18px',
                  background: vibe.accent,
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  animation: 'pulse-glow 1s ease-in-out infinite',
                }}
              />
            )}
          </p>

          {!narrativeDone && (
            <p
              className="font-mono mt-4"
              style={{
                fontSize: '10px',
                color: '#3a3530',
                letterSpacing: '0.06em',
              }}
            >
              click anywhere to skip
            </p>
          )}
        </div>

        {/* Divider — appears after narrative */}
        <div
          style={{
            width: narrativeDone ? '50px' : '0px',
            height: '1px',
            background: `linear-gradient(90deg, ${vibe.accent}44, transparent)`,
            marginBottom: narrativeDone ? '32px' : '0px',
            transition: 'width 0.6s ease 0.1s, margin-bottom 0.4s ease',
          }}
        />

        {/* Choices — stagger in after narrative completes */}
        <div className="space-y-3">
          {scene.choices.map((choice, i) => {
            const isSelected = selectedIndex === i
            const isOther = selectedIndex !== null && selectedIndex !== i
            const staggerDelay = 0.1 + i * 0.1

            return (
              <button
                key={i}
                onClick={() => narrativeDone && handleSelect(choice, i)}
                disabled={selectedIndex !== null || !narrativeDone}
                className="w-full text-left rounded-xl"
                style={{
                  padding: '18px 24px',
                  background: isSelected
                    ? `${vibe.accent}12`
                    : 'rgba(255,255,255,0.015)',
                  border: `1px solid ${
                    isSelected ? `${vibe.accent}40` : 'rgba(255,255,255,0.05)'
                  }`,
                  color: isOther
                    ? '#2a2520'
                    : isSelected
                    ? '#e8ddd0'
                    : narrativeDone
                    ? '#a09888'
                    : '#3a3530',
                  fontSize: '14.5px',
                  lineHeight: 1.65,
                  transition: `all 0.3s ease, opacity 0.5s ease ${staggerDelay}s, transform 0.5s ease ${staggerDelay}s`,
                  opacity: !narrativeDone ? 0 : isOther ? 0.3 : 1,
                  transform: !narrativeDone
                    ? 'translateY(10px)'
                    : isSelected
                    ? 'scale(1.01)'
                    : 'translateY(0) scale(1)',
                  boxShadow: isSelected ? `0 0 30px ${vibe.accent}10` : 'none',
                  cursor: narrativeDone && selectedIndex === null ? 'pointer' : 'default',
                  pointerEvents: !narrativeDone || selectedIndex !== null ? 'none' : 'auto',
                }}
                onMouseEnter={(e) => {
                  if (selectedIndex !== null || !narrativeDone) return
                  e.currentTarget.style.borderColor = `${vibe.accent}28`
                  e.currentTarget.style.color = '#e8ddd0'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={(e) => {
                  if (selectedIndex !== null || !narrativeDone) return
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = '#a09888'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.015)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                {choice.text}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
