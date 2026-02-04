import { useState } from 'react'

interface EndScreenProps {
  onRestart: () => void
  isVisible: boolean
}

export default function EndScreen({ onRestart, isVisible }: EndScreenProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: 'Descent — A journey to the center of the Earth',
      text: 'Fall through a tunnel to the center of the Earth. An immersive 3.5-minute experience.',
      url: window.location.href,
    }

    // Try native share API first (mobile)
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
        return
      } catch (e) {
        // User cancelled or error, fall through to copy
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      // Last resort: prompt
      prompt('Copy this link:', window.location.href)
    }
  }
  if (!isVisible) return null

  return (
    <div
      className={`absolute inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-2000 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Warm glow background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-8 animate-fade-in">
        <p className="text-white/70 text-xl mb-8">You have reached</p>
        <h2 className="text-5xl md:text-7xl font-serif mb-6 text-white drop-shadow-lg">
          The Center of the Earth
        </h2>

        {/* Statistics */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 my-12">
          <Stat label="Distance" value="6,371 km" />
          <Stat label="Duration" value="~7 days" />
          <Stat label="Max Temp" value="6,700°C" />
          <Stat label="Max Pressure" value="3.6M atm" />
        </div>

        {/* Physics note */}
        <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-12 leading-relaxed">
          In a vacuum tunnel with no air resistance, the same journey would take just{' '}
          <span className="text-amber-300 font-medium">38 minutes and 11 seconds</span>,
          reaching speeds of 28,800 km/h.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-8 py-4 text-lg border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
          >
            Fall again
          </button>
          <button
            onClick={handleShare}
            className="px-8 py-4 text-lg bg-white/10 border border-white/30 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <CheckIcon />
                Link copied
              </>
            ) : (
              <>
                <ShareIcon />
                Share
              </>
            )}
          </button>
        </div>

        {/* Attribution */}
        <div className="text-sm text-white/40 mt-16 space-y-1">
          <p>
            Created by{' '}
            <a
              href="https://www.chrishager.at"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60"
            >
              Chris Hager
            </a>
            {' '}with{' '}
            <a
              href="https://claude.ai/code"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60"
            >
              Claude Code
            </a>
          </p>
          <p>
            Based on physics from{' '}
            <a
              href="https://www.wtamu.edu/~cbaird/sq/2013/10/04/what-would-happen-if-you-fell-into-a-hole-that-went-through-the-center-of-the-earth/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60"
            >
              Dr. Christopher S. Baird
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-mono text-amber-300 drop-shadow-md">{value}</div>
      <div className="text-sm text-white/50 uppercase tracking-widest mt-2">{label}</div>
    </div>
  )
}

function ShareIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}
