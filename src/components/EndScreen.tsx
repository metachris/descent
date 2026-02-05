import { useState } from 'react'
import { LanguageSelector } from './LanguageSelector'

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

    // Only use native share on mobile (touch devices)
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isMobile && navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
        return
      } catch (e) {
        // User cancelled or error, fall through to copy
      }
    }

    // Desktop: copy to clipboard
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
      {/* Language selector - top right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSelector variant="full" />
      </div>

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
            className="px-8 py-4 text-lg border border-white/30 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <ReplayIcon />
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
              href="https://www.metachris.com"
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
          <p className="pt-2">
            <a
              href="https://github.com/metachris/descent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white/60"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Fork it on GitHub
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

function ReplayIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
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
