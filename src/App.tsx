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
  const { progress, play, seek } = useJourney()

  // Show end screen when journey completes
  useEffect(() => {
    if (progress >= 0.99 && hasStarted) {
      setShowEnd(true)
    }
  }, [progress, hasStarted])

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
