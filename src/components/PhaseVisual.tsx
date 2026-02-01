import { useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { getPhaseAtTime } from '../data/content'

// Phase visuals - gradient backgrounds that evoke each phase
const PHASE_VISUALS: Record<string, { gradient: string; overlay?: string }> = {
  'The Edge': {
    gradient: 'radial-gradient(ellipse at 50% 100%, #1a365d 0%, #0a1628 50%, #050507 100%)',
    overlay: 'radial-gradient(ellipse at 50% 120%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
  },
  'The Plunge': {
    gradient: 'linear-gradient(to bottom, #0a1628 0%, #1e3a5f 30%, #2d4a6f 100%)',
  },
  'Heat Death': {
    gradient: 'radial-gradient(ellipse at 50% 50%, #7f1d1d 0%, #450a0a 50%, #1c0505 100%)',
  },
  'Boiling': {
    gradient: 'radial-gradient(ellipse at 50% 50%, #991b1b 0%, #7f1d1d 30%, #450a0a 100%)',
  },
  'Crushing': {
    gradient: 'linear-gradient(to bottom, #44403c 0%, #292524 50%, #1c1917 100%)',
  },
  'Incineration': {
    gradient: 'radial-gradient(ellipse at 50% 50%, #ea580c 0%, #c2410c 20%, #7c2d12 50%, #1c0c05 100%)',
  },
  'The Long Fall': {
    gradient: 'linear-gradient(to bottom, #292524 0%, #1c1917 30%, #0c0a09 100%)',
  },
  'Outer Core': {
    gradient: 'radial-gradient(ellipse at 50% 50%, #f97316 0%, #ea580c 20%, #9a3412 50%, #431407 100%)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(251, 146, 60, 0.3) 0%, transparent 60%)',
  },
  'Inner Core': {
    gradient: 'radial-gradient(ellipse at 50% 50%, #fbbf24 0%, #f59e0b 20%, #d97706 40%, #92400e 70%, #451a03 100%)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(252, 211, 77, 0.4) 0%, transparent 50%)',
  },
  'The Center': {
    gradient: 'radial-gradient(ellipse at 50% 50%, #fef3c7 0%, #fcd34d 10%, #f59e0b 30%, #b45309 60%, #78350f 100%)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(254, 243, 199, 0.5) 0%, transparent 40%)',
  },
}

export default function PhaseVisual() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration

  const currentPhase = useMemo(() => getPhaseAtTime(currentTime), [currentTime])
  const phaseName = currentPhase?.name || 'The Edge'
  const visual = PHASE_VISUALS[phaseName] || PHASE_VISUALS['The Edge']

  // Calculate transition progress within phase for subtle animation
  const phaseProgress = currentPhase
    ? (currentTime - currentPhase.startTime) / (currentPhase.endTime - currentPhase.startTime)
    : 0

  return (
    <div className="absolute inset-0 transition-all duration-1000">
      {/* Base gradient */}
      <div
        className="absolute inset-0 transition-all duration-2000"
        style={{ background: visual.gradient }}
      />

      {/* Overlay glow */}
      {visual.overlay && (
        <div
          className="absolute inset-0 transition-all duration-2000"
          style={{
            background: visual.overlay,
            opacity: 0.5 + phaseProgress * 0.5,
          }}
        />
      )}

      {/* Animated particles/dust effect for certain phases */}
      {(phaseName === 'The Long Fall' || phaseName === 'Incineration') && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Core pulse effect */}
      {(phaseName === 'Outer Core' || phaseName === 'Inner Core' || phaseName === 'The Center') && (
        <div
          className="absolute inset-0 animate-pulse-slow"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)',
          }}
        />
      )}
    </div>
  )
}
