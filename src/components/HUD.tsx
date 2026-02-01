import { useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { getDepthAtTime, getLayerAtDepth, getElapsedHours } from '../data/content'

export default function HUD() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration

  const depth = useMemo(() => getDepthAtTime(currentTime), [currentTime])
  const layer = useMemo(() => getLayerAtDepth(depth), [depth])
  const elapsedHours = useMemo(() => getElapsedHours(currentTime), [currentTime])

  // Format depth - whole numbers only to prevent flickering
  const formatDepth = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)} m`
    return `${Math.round(km).toLocaleString('en-US')} km`
  }

  // Format elapsed time - hours until 72h, then days
  const formatElapsedTime = (hours: number) => {
    if (hours < 1) {
      const minutes = Math.round(hours * 60)
      return minutes === 0 ? '0 min' : `${minutes} min`
    }
    if (hours < 72) {
      return `${Math.round(hours)} hr`
    }
    const days = hours / 24
    return `${days.toFixed(1)} days`
  }

  return (
    <div className="absolute top-0 left-0 right-0 p-6 pointer-events-none">
      <div className="flex justify-center items-start gap-12">
        {/* Elapsed Time */}
        <div className="text-center">
          <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Elapsed</div>
          <div className="text-2xl md:text-3xl font-mono tabular-nums min-w-[100px]">
            {formatElapsedTime(elapsedHours)}
          </div>
        </div>

        {/* Depth */}
        <div className="text-center">
          <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Depth</div>
          <div className="text-2xl md:text-3xl font-mono tabular-nums min-w-[140px]">
            {formatDepth(depth)}
          </div>
        </div>

        {/* Layer */}
        <div className="text-center">
          <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Layer</div>
          <div
            className="text-lg md:text-xl min-w-[120px] transition-colors duration-500"
            style={{ color: layer?.color || '#fff' }}
          >
            {layer?.name || 'Surface'}
          </div>
        </div>
      </div>
    </div>
  )
}
