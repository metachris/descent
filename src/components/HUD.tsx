import { useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { getDepthAtTime, getLayerAtDepth, getDayAtTime } from '../data/content'

export default function HUD() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration

  const depth = useMemo(() => getDepthAtTime(currentTime), [currentTime])
  const layer = useMemo(() => getLayerAtDepth(depth), [depth])
  const day = useMemo(() => getDayAtTime(currentTime), [currentTime])

  // Format depth - whole numbers only to prevent flickering
  const formatDepth = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)} m`
    return `${Math.round(km).toLocaleString('en-US')} km`
  }

  return (
    <div className="absolute top-0 left-0 right-0 p-6 pointer-events-none">
      <div className="flex justify-center items-start gap-12">
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

        {/* Day counter (only during long fall and after) */}
        {day > 0 && (
          <div className="text-center">
            <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Day</div>
            <div className="text-2xl md:text-3xl font-mono min-w-[40px]">
              {day}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
