import { useState } from 'react'

interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    setIsExiting(true)
    setTimeout(onStart, 1000) // Wait for fade out
  }

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-void transition-opacity duration-1000 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
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

      {/* Earth glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-t-full opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, #1e3a5f 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        <h1 className="text-5xl md:text-7xl font-serif mb-4">Descent</h1>
        <p className="text-xl md:text-2xl text-white/60 mb-2">A Journey to the Center of the Earth</p>
        <p className="text-sm text-white/40 mb-12 max-w-md mx-auto">
          What happens if you jump into a hole that goes straight through the planet?
        </p>

        <button
          onClick={handleStart}
          className="group relative px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
        >
          {/* Button glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all" />

          {/* Button border */}
          <div className="absolute inset-0 border border-white/20 rounded-lg group-hover:border-white/40 transition-colors" />

          {/* Button text */}
          <span className="relative">Begin your descent</span>
        </button>

        <p className="text-xs text-white/30 mt-12">
          ~2.5 minutes · Best with sound
        </p>
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
