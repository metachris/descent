import PhaseVisual from './components/PhaseVisual'
import Timeline from './components/Timeline'
import Narrative from './components/Narrative'
import HUD from './components/HUD'
import VerticalMinimap from './components/VerticalMinimap'
import AudioController from './components/AudioController'
import { JourneyProvider } from './hooks/useJourney'

export default function App() {
  return (
    <JourneyProvider>
      <div className="w-full h-full relative overflow-hidden bg-void">
        {/* Phase-based visual background */}
        <PhaseVisual />

        {/* UI Overlays */}
        <Narrative />
        <HUD />
        <VerticalMinimap />
        <Timeline />
        <AudioController />
      </div>
    </JourneyProvider>
  )
}
