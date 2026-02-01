import { useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { NARRATIVE, NarrativeStyle } from '../data/content'

export default function Narrative() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration

  // Find current narrative block
  const currentNarrative = useMemo(() => {
    return NARRATIVE.find(n =>
      currentTime >= n.startTime && currentTime <= n.endTime
    )
  }, [currentTime])

  if (!currentNarrative) return null

  // Calculate fade
  const fadeInDuration = 1
  const fadeOutDuration = 1
  const timeSinceStart = currentTime - currentNarrative.startTime
  const timeUntilEnd = currentNarrative.endTime - currentTime

  let opacity = 1
  if (timeSinceStart < fadeInDuration) {
    opacity = timeSinceStart / fadeInDuration
  } else if (timeUntilEnd < fadeOutDuration) {
    opacity = timeUntilEnd / fadeOutDuration
  }

  const styleClasses: Record<NarrativeStyle, string> = {
    normal: 'text-2xl md:text-3xl',
    dramatic: 'text-3xl md:text-5xl font-semibold',
    whisper: 'text-xl md:text-2xl italic text-white/70',
    data: 'text-lg md:text-xl font-mono tracking-wider',
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
      <p
        className={`text-center max-w-3xl leading-relaxed transition-opacity duration-300 ${styleClasses[currentNarrative.style]}`}
        style={{ opacity }}
      >
        {currentNarrative.text}
      </p>
    </div>
  )
}
