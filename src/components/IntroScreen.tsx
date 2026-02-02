import { useState } from 'react'

interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    setIsExiting(true)
    setTimeout(onStart, 1000)
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
          ~3 minutes · Best with sound
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
