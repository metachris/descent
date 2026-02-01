interface EndScreenProps {
  onRestart: () => void
  isVisible: boolean
}

export default function EndScreen({ onRestart, isVisible }: EndScreenProps) {
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
        </div>

        {/* Attribution */}
        <p className="text-sm text-white/40 mt-16">
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
