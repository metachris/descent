import { useState, useEffect } from 'react'
import PhaseVisual from './components/PhaseVisual'
import Timeline from './components/Timeline'
import Narrative from './components/Narrative'
import HUD from './components/HUD'
import VerticalMinimap from './components/VerticalMinimap'
import AudioController from './components/AudioController'
import IntroScreen from './components/IntroScreen'
import EndScreen from './components/EndScreen'
import { JourneyProvider, useJourney } from './hooks/useJourney'

function AppContent() {
  const [hasStarted, setHasStarted] = useState(false)
  const [showEnd, setShowEnd] = useState(false)
  const { progress, duration, isPlaying, play, pause, toggle, seek } = useJourney()

  // Keyboard shortcuts for playback control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const SKIP_SECONDS = 5
      const currentTime = progress * duration

      switch (e.code) {
        case 'Space':
          e.preventDefault()
          if (!hasStarted) {
            setHasStarted(true)
            seek(0)
            setTimeout(() => play(), 100)
          } else {
            toggle()
          }
          break
        case 'ArrowLeft':
          e.preventDefault()
          seek(Math.max(0, (currentTime - SKIP_SECONDS) / duration))
          break
        case 'ArrowRight':
          e.preventDefault()
          seek(Math.min(1, (currentTime + SKIP_SECONDS) / duration))
          break
        case 'KeyR':
        case 'Home':
          e.preventDefault()
          setShowEnd(false)
          seek(0)
          if (!isPlaying) play()
          break
        case 'End':
          e.preventDefault()
          seek(0.99)
          break
        case 'KeyF':
          // Shift+F for hard refresh (useful for dev)
          if (e.shiftKey) {
            e.preventDefault()
            window.location.reload()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasStarted, progress, duration, isPlaying, play, pause, toggle, seek])

  // Show end screen when journey completes (with delay for last text)
  useEffect(() => {
    if (progress >= 0.99 && hasStarted && !showEnd) {
      // Short delay after journey ends - text has already faded
      const timer = setTimeout(() => {
        setShowEnd(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [progress, hasStarted, showEnd])

  const handleStart = () => {
    setHasStarted(true)
    seek(0)
    setTimeout(() => play(), 100)
  }

  const handleRestart = () => {
    setShowEnd(false)
    seek(0)
    setTimeout(() => play(), 100)
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-void">
      {/* Phase-based visual background */}
      <PhaseVisual />

      {/* UI Overlays - only show after started */}
      {hasStarted && (
        <>
          <Narrative />
          <HUD />
          <VerticalMinimap />
          <Timeline />
          <AudioController />
        </>
      )}

      {/* Intro Screen */}
      {!hasStarted && <IntroScreen onStart={handleStart} />}

      {/* End Screen */}
      <EndScreen isVisible={showEnd} onRestart={handleRestart} />
    </div>
  )
}

export default function App() {
  return (
    <JourneyProvider>
      <AppContent />
    </JourneyProvider>
  )
}
