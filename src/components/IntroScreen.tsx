import { useState } from 'react'
import { LanguageSelector } from './LanguageSelector'

interface IntroScreenProps {
  onStart: () => void
  onInteract?: () => void
}

export default function IntroScreen({ onStart, onInteract }: IntroScreenProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    // Fire immediately inside the user gesture — needed for mobile audio unlock
    onInteract?.()
    setIsExiting(true)
    setTimeout(onStart, 1000)
  }

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-void transition-opacity duration-1000 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Language selector - top right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSelector variant="full" />
      </div>

      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-serif mb-6">Descent</h1>
        <p className="text-2xl md:text-3xl text-white/70 mb-4">
          A Journey to the Center of the Earth
        </p>
        <p className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
          What happens if you jump into a hole that goes straight through the planet?
        </p>

        {/* Earth cross-section image */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <img
              src="https://wtamu.edu/~cbaird/sq/images/earth_core.png"
              alt="Earth's layers cross-section"
              className="w-48 md:w-64 h-auto rounded-full opacity-90"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.3))',
              }}
            />
            {/* Subtle glow behind */}
            <div
              className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-30"
              style={{
                background: 'radial-gradient(circle, #f97316 0%, transparent 70%)',
                transform: 'scale(1.2)',
              }}
            />
          </div>
        </div>

        <button
          onClick={handleStart}
          className="group relative px-10 py-5 text-xl font-medium transition-all duration-300 hover:scale-105"
        >
          {/* Button glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all" />

          {/* Button border */}
          <div className="absolute inset-0 border border-white/20 rounded-lg group-hover:border-white/40 transition-colors" />

          {/* Button text */}
          <span className="relative">Begin your descent</span>
        </button>

        <p className="text-sm md:text-base text-white/40 mt-10">
          ~3.5 minutes · Best with sound
        </p>

        <a
          href="https://github.com/metachris/descent"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/50 mt-4 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Open source
        </a>
      </div>

      {/* Down arrow hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}
