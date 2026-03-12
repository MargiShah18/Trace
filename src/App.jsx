import { useState, useEffect, useCallback, useRef } from 'react'
import IntroScreen from './components/IntroScreen'
import ScenePlayer from './components/ScenePlayer'
import CardReveal from './components/CardReveal'
import ShareModal from './components/ShareModal'
import { generateScenes } from './utils/generateScenes'
import { deriveCard } from './utils/deriveCard'
import { decodeCard } from './utils/encode'

const INITIAL_SCORES = { ownership: 0, expression: 0, adaptability: 0, depth: 0 }

function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 30%, #0d0c0a 0%, #080706 50%, #050505 100%)',
      }}
    >
      <p
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: '17.5px',
          color: '#c8bdb0',
          letterSpacing: '0.02em',
          animation: 'loading-pulse 2.4s ease-in-out infinite',
        }}
      >
        Preparing your story...
      </p>
      <style>{`
        @keyframes loading-pulse {
          0%   { opacity: 0; }
          30%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [sceneIndex, setSceneIndex] = useState(0)
  const [scores, setScores] = useState({ ...INITIAL_SCORES })
  const [cardData, setCardData] = useState(null)
  const [showShare, setShowShare] = useState(false)
  const [fromUrl, setFromUrl] = useState(false)
  const [scenes, setScenes] = useState([])
  const prefetchRef = useRef(null)

  useEffect(() => {
    const hash = window.location.hash
    const cardMatch = hash.match(/#\/card\/(.+)/)
    if (cardMatch) {
      const decoded = decodeCard(cardMatch[1])
      if (decoded) {
        setCardData(decoded)
        setScreen('reveal')
        setFromUrl(true)
        return
      }
    }
    // Prefetch scenes immediately so they're ready when the user clicks Begin
    prefetchRef.current = generateScenes()
  }, [])

  const handleBegin = useCallback(async () => {
    setScreen('loading')
    setSceneIndex(0)
    setScores({ ...INITIAL_SCORES })
    setCardData(null)
    setFromUrl(false)
    window.history.replaceState(null, '', window.location.pathname)

    // Reuse the prefetched promise — if already resolved this is instant
    const loaded = await (prefetchRef.current ?? generateScenes())
    setScenes(loaded)
    setScreen('scene')
  }, [])

  const handleChoice = useCallback((choiceScores) => {
    setScores((prev) => {
      const next = { ...prev }
      for (const key in choiceScores) {
        next[key] = (next[key] || 0) + choiceScores[key]
      }
      return next
    })

    setSceneIndex((prev) => {
      const nextIndex = prev + 1
      setScenes((currentScenes) => {
        if (nextIndex >= currentScenes.length) {
          setTimeout(() => {
            setScores((finalScores) => {
              const card = deriveCard(finalScores)
              setCardData(card)
              setScreen('reveal')
              return finalScores
            })
          }, 50)
        }
        return currentScenes
      })
      return nextIndex
    })
  }, [])

  const handleShare = useCallback(() => {
    setShowShare(true)
  }, [])

  const handlePlayAgain = useCallback(() => {
    setScreen('intro')
    setSceneIndex(0)
    setScores({ ...INITIAL_SCORES })
    setCardData(null)
    setFromUrl(false)
    setScenes([])
    window.history.replaceState(null, '', window.location.pathname)
    // Prefetch fresh scenes for the next round
    prefetchRef.current = generateScenes()
  }, [])

  return (
    <>
      {screen === 'intro' && (
        <IntroScreen onBegin={handleBegin} />
      )}

      {screen === 'loading' && (
        <LoadingScreen />
      )}

      {screen === 'scene' && scenes.length > 0 && sceneIndex < scenes.length && (
        <ScenePlayer
          scene={scenes[sceneIndex]}
          scenes={scenes}
          onChoice={handleChoice}
        />
      )}

      {screen === 'reveal' && cardData && (
        <CardReveal
          cardData={cardData}
          onShare={handleShare}
          onPlayAgain={handlePlayAgain}
          skipIntro={fromUrl}
        />
      )}

      {showShare && cardData && (
        <ShareModal
          card={cardData}
          onClose={() => setShowShare(false)}
        />
      )}
    </>
  )
}
