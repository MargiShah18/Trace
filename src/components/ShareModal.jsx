import { useState, useRef, useEffect } from 'react'
import { encodeCard } from '../utils/encode'
import { exportCardAsPng } from '../utils/export'
import { getType } from '../data/types'
import HoloCard from './HoloCard'

export default function ShareModal({ card, onClose }) {
  const [copied, setCopied] = useState(null)
  const previewRef = useRef(null)
  const type = getType(card.type)

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const encoded = encodeCard(card)
  const shareUrl = `${window.location.origin}${window.location.pathname}#/card/${encoded}`
  const embedCode = `<iframe src="${shareUrl}" width="420" height="630" style="border:none;border-radius:16px;" title="Identity Artifact"></iframe>`

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  const handleDownload = async () => {
    if (previewRef.current) await exportCardAsPng(previewRef.current)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeInUp 0.3s ease-out' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        style={{
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
        style={{
          background: '#0c0c0c',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: `0 0 60px ${type.glow}`,
          animation: 'fadeInUp 0.4s ease-out 0.1s both',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: '#666',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#666' }}
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-6" style={{ color: '#f0f0f0' }}>
          Share Your Artifact
        </h2>

        {/* Card Preview */}
        <div className="flex justify-center mb-6">
          <HoloCard ref={previewRef} data={card} size="small" interactive={false} />
        </div>

        {/* Copy Link */}
        <div className="mb-4">
          <label className="font-mono text-xs uppercase tracking-wider block mb-2" style={{ color: '#666' }}>
            Shareable Link
          </label>
          <div className="flex gap-2">
            <div
              className="flex-1 rounded-lg px-3 py-2.5 text-xs font-mono truncate"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#888',
              }}
            >
              {shareUrl}
            </div>
            <button
              onClick={() => copyToClipboard(shareUrl, 'link')}
              className="shrink-0 rounded-lg px-4 py-2.5 text-xs font-mono font-semibold cursor-pointer"
              style={{
                background: copied === 'link' ? `${type.color}25` : 'rgba(255,255,255,0.06)',
                color: copied === 'link' ? type.color : '#ccc',
                border: `1px solid ${copied === 'link' ? type.color + '44' : 'rgba(255,255,255,0.1)'}`,
                transition: 'all 0.3s',
                minWidth: '80px',
              }}
            >
              {copied === 'link' ? '✓ Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Embed Code */}
        <div className="mb-4">
          <label className="font-mono text-xs uppercase tracking-wider block mb-2" style={{ color: '#666' }}>
            Embed Code
          </label>
          <div
            className="rounded-lg px-3 py-2.5 text-xs font-mono mb-2 overflow-x-auto"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#888',
              whiteSpace: 'nowrap',
            }}
          >
            {embedCode}
          </div>
          <button
            onClick={() => copyToClipboard(embedCode, 'embed')}
            className="rounded-lg px-4 py-2 text-xs font-mono cursor-pointer"
            style={{
              background: copied === 'embed' ? `${type.color}25` : 'rgba(255,255,255,0.06)',
              color: copied === 'embed' ? type.color : '#ccc',
              border: `1px solid ${copied === 'embed' ? type.color + '44' : 'rgba(255,255,255,0.1)'}`,
              transition: 'all 0.3s',
            }}
          >
            {copied === 'embed' ? '✓ Copied!' : 'Copy Embed'}
          </button>
        </div>

        {/* Download PNG */}
        <div className="mb-4">
          <button
            onClick={handleDownload}
            className="w-full rounded-lg py-3 text-sm font-semibold cursor-pointer"
            style={{
              background: `${type.color}15`,
              color: type.color,
              border: `1px solid ${type.color}33`,
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${type.color}25`
              e.currentTarget.style.boxShadow = `0 0 20px ${type.glow}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${type.color}15`
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            ↓ Download as PNG
          </button>
        </div>

        <p className="text-center font-mono text-xs mt-4" style={{ color: '#444' }}>
          Anyone with this link sees your card exactly as it is now
        </p>
      </div>
    </div>
  )
}
