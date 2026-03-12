import { useState, useEffect, useCallback } from 'react'
import IntroScreen from './components/IntroScreen'
import ScenePlayer from './components/ScenePlayer'
import CardReveal from './components/CardReveal'
import ShareModal from './components/ShareModal'
import { SCENES } from './data/scenes'
import { deriveCard } from './utils/deriveCard'
import { decodeCard } from './utils/encode'

const INITIAL_SCORES = { ownership: 0, expression: 0, adaptability: 0, depth: 0 }

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [sceneIndex, setSceneIndex] = useState(0)
  const [scores, setScores] = useState({ ...INITIAL_SCORES })
  const [cardData, setCardData] = useState(null)
  const [showShare, setShowShare] = useState(false)
  const [fromUrl, setFromUrl] = useState(false)

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
  }, [])

  const handleBegin = useCallback(() => {
    setScreen('scene')
    setSceneIndex(0)
    setScores({ ...INITIAL_SCORES })
    setCardData(null)
    setFromUrl(false)
    window.history.replaceState(null, '', window.location.pathname)
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
      if (nextIndex >= SCENES.length) {
        setTimeout(() => {
          setScores((finalScores) => {
            const card = deriveCard(finalScores)
            setCardData(card)
            setScreen('reveal')
            return finalScores
          })
        }, 50)
      }
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
    window.history.replaceState(null, '', window.location.pathname)
  }, [])

  return (
    <>
      {screen === 'intro' && (
        <IntroScreen onBegin={handleBegin} />
      )}

      {screen === 'scene' && sceneIndex < SCENES.length && (
        <ScenePlayer
          scene={SCENES[sceneIndex]}
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
