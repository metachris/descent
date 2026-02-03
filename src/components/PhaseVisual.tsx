import { useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { PHASES, getPhaseAtTime } from '../data/content'
import ParticleField from './ParticleField'
import HeatDistortion from './HeatDistortion'

// Phase visual configurations
const PHASE_VISUALS: Record<string, {
  gradient: string
  overlay?: string
}> = {
  'The Edge': {
    gradient: 'radial-gradient(ellipse at 50% 100%, #1a365d 0%, #0a1628 50%, #050507 100%)',
    overlay: 'radial-gradient(ellipse at 50% 120%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
  },
  'The Plunge': {
    gradient: 'linear-gradient(to bottom, #0a1628 0%, #1e3a5f 50%, #2d4a6f 100%)',
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
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(251, 146, 60, 0.2) 0%, transparent 60%)',
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
  'The Yo-Yo': {
    gradient: 'radial-gradient(ellipse at 50% 50%, #fef3c7 0%, #fcd34d 10%, #f59e0b 30%, #b45309 60%, #78350f 100%)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(254, 243, 199, 0.4) 0%, transparent 40%)',
  },
}

export default function PhaseVisual() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration

  const currentPhase = useMemo(() => getPhaseAtTime(currentTime), [currentTime])
  const phaseName = currentPhase?.name || 'The Edge'
  const visual = PHASE_VISUALS[phaseName] || PHASE_VISUALS['The Edge']

  // Find next phase for blending
  const phaseProgress = currentPhase
    ? (currentTime - currentPhase.startTime) / (currentPhase.endTime - currentPhase.startTime)
    : 0

  // Get next phase visual for transition
  const currentPhaseIndex = PHASES.findIndex(p => p.name === phaseName)
  const nextPhase = PHASES[currentPhaseIndex + 1]
  const nextVisual = nextPhase ? PHASE_VISUALS[nextPhase.name] : null

  // Blend opacity for smooth transition (last 20% of each phase)
  const transitionStart = 0.8
  const blendOpacity = phaseProgress > transitionStart
    ? (phaseProgress - transitionStart) / (1 - transitionStart)
    : 0

  return (
    <div className="absolute inset-0">
      {/* Current phase gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: visual.gradient }}
      />

      {/* Next phase gradient (fades in during transition) */}
      {nextVisual && blendOpacity > 0 && (
        <div
          className="absolute inset-0"
          style={{
            background: nextVisual.gradient,
            opacity: blendOpacity,
          }}
        />
      )}

      {/* Overlay glow */}
      {visual.overlay && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ background: visual.overlay }}
        />
      )}

      {/* Canvas-based particle field */}
      <ParticleField />

      {/* Heat distortion shader effect */}
      <HeatDistortion />

      {/* Core pulse effect for inner phases */}
      {(phaseName === 'Outer Core' || phaseName === 'Inner Core' || phaseName === 'The Center') && (
        <div
          className="absolute inset-0 animate-pulse-slow"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
          }}
        />
      )}
    </div>
  )
}
