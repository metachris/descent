import { useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { useLanguage } from '../hooks/useLanguage'
import { useSpeech } from '../hooks/useSpeech'
import { NarrativeStyle, NarrativeEntry } from '../data/content'

const SPEECH_LANG_CODES: Record<string, string> = {
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
  zh: 'zh-CN',
  ja: 'ja-JP',
  pl: 'pl-PL',
}

export default function Narrative() {
  const { progress, duration } = useJourney()
  const { narrative, language, voiceEnabled } = useLanguage()
  const currentTime = progress * duration

  // Find current narrative block
  const currentNarrative = useMemo(() => {
    return narrative.find((n: NarrativeEntry) =>
      currentTime >= n.startTime && currentTime <= n.endTime
    )
  }, [currentTime, narrative])

  // Voice narration - hook must be called before early return
  useSpeech({
    text: currentNarrative?.text ?? null,
    enabled: voiceEnabled,
    lang: SPEECH_LANG_CODES[language] || 'en-US',
    style: currentNarrative?.style,
  })

  if (!currentNarrative) return null

  // Calculate fade with easing
  const fadeInDuration = 1.5
  const fadeOutDuration = 1.5
  const timeSinceStart = currentTime - currentNarrative.startTime
  const timeUntilEnd = currentNarrative.endTime - currentTime

  let opacity = 1
  if (timeSinceStart < fadeInDuration) {
    // Ease-out for fade in (starts fast, slows down)
    const t = timeSinceStart / fadeInDuration
    opacity = 1 - Math.pow(1 - t, 3)
  } else if (timeUntilEnd < fadeOutDuration) {
    // Ease-in for fade out (starts slow, speeds up)
    const t = timeUntilEnd / fadeOutDuration
    opacity = 1 - Math.pow(1 - t, 3)
  }

  const styleClasses: Record<NarrativeStyle, string> = {
    normal: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
    dramatic: 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold',
    whisper: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl italic',
    data: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-mono tracking-wider',
  }

  // Use darker text on bright backgrounds (Inner Core, Center)
  const isHotPhase = currentTime > 111 // Inner Core onwards
  const textColorClass = currentNarrative.style === 'data'
    ? (isHotPhase ? 'text-amber-900' : 'text-amber-200')
    : (isHotPhase ? 'text-stone-900' : 'text-white')

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8" style={{ zIndex: 10 }}>
      <p
        className={`text-center max-w-4xl leading-relaxed ${styleClasses[currentNarrative.style]} ${textColorClass}`}
        style={{
          opacity,
          transform: `translateY(${(1 - opacity) * 10}px)`,
          transition: 'transform 0.1s ease-out',
          textShadow: isHotPhase
            ? '0 2px 10px rgba(255,255,255,0.5)'
            : '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.5)',
        }}
      >
        {currentNarrative.text}
      </p>
    </div>
  )
}
