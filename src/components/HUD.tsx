import { useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { getDepthAtTime, getLayerAtDepth, getElapsedHours } from '../data/content'

export default function HUD() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration

  const depth = useMemo(() => getDepthAtTime(currentTime), [currentTime])
  const layer = useMemo(() => getLayerAtDepth(depth), [depth])
  const elapsedHours = useMemo(() => getElapsedHours(currentTime), [currentTime])

  // Use dark text on bright backgrounds (Inner Core onwards)
  const isHotPhase = currentTime > 111
  const textClass = isHotPhase ? 'text-stone-900' : 'text-white'
  const labelClass = isHotPhase ? 'text-stone-700' : 'text-white/40'

  // Format depth - whole numbers only to prevent flickering
  const formatDepth = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)} m`
    return `${Math.round(km).toLocaleString('en-US')} km`
  }

  // Format elapsed time
  // -1 = not started, show "--"
  // < 1 hour = show minutes
  // 1-24 hours = show hours
  // > 24 hours = show days (smoother transition)
  const formatElapsedTime = (hours: number): string => {
    if (hours < 0) return '--'
    if (hours < 1) {
      const minutes = Math.round(hours * 60)
      return `${minutes} min`
    }
    if (hours < 24) {
      return `${Math.round(hours)} hr`
    }
    // Show days with one decimal for smooth transition
    const days = hours / 24
    if (days < 1.05) return '1 day'
    return `${days.toFixed(1)} days`
  }

  return (
    <div className="absolute top-0 left-0 right-0 p-6 pointer-events-none">
      <div
        className="flex justify-center items-start gap-8 md:gap-12"
        style={{
          textShadow: isHotPhase
            ? '0 1px 8px rgba(255,255,255,0.5)'
            : '0 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        {/* Elapsed Time */}
        <div className="text-center">
          <div className={`text-xs uppercase tracking-widest mb-1 ${labelClass}`}>Elapsed</div>
          <div className={`text-2xl md:text-3xl font-mono tabular-nums min-w-[100px] ${textClass}`}>
            {formatElapsedTime(elapsedHours)}
          </div>
        </div>

        {/* Depth */}
        <div className="text-center">
          <div className={`text-xs uppercase tracking-widest mb-1 ${labelClass}`}>Depth</div>
          <div className={`text-2xl md:text-3xl font-mono tabular-nums min-w-[140px] ${textClass}`}>
            {formatDepth(depth)}
          </div>
        </div>

        {/* Layer */}
        <div className="text-center">
          <div className={`text-xs uppercase tracking-widest mb-1 ${labelClass}`}>Layer</div>
          <div
            className="text-xl md:text-2xl min-w-[120px] transition-colors duration-500 font-medium"
            style={{
              color: isHotPhase ? '#1c1917' : (layer?.color || '#fff'),
            }}
          >
            {layer?.name || 'Surface'}
          </div>
        </div>
      </div>
    </div>
  )
}
