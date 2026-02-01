import { useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { LAYERS, getDepthAtTime } from '../data/content'

const EARTH_RADIUS = 6371

export default function VerticalMinimap() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration
  const depth = useMemo(() => getDepthAtTime(currentTime), [currentTime])

  // Calculate position percentage (0 = surface, 100 = center)
  const positionPercent = Math.min((depth / EARTH_RADIUS) * 100, 100)

  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
      {/* Vertical bar with layers */}
      <div className="relative w-3 h-64 rounded-full overflow-hidden bg-white/10">
        {/* Layer segments */}
        {LAYERS.map((layer) => {
          const topPercent = (layer.startDepth / EARTH_RADIUS) * 100
          const heightPercent = ((layer.endDepth - layer.startDepth) / EARTH_RADIUS) * 100

          return (
            <div
              key={layer.name}
              className="absolute left-0 right-0"
              style={{
                top: `${topPercent}%`,
                height: `${heightPercent}%`,
                backgroundColor: layer.color,
                opacity: 0.7,
              }}
            />
          )
        })}

        {/* Current position indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-5 h-5 -ml-1 transition-all duration-300 ease-out"
          style={{ top: `${positionPercent}%`, transform: `translate(-50%, -50%)` }}
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-50" />
          {/* Dot */}
          <div className="absolute inset-1 bg-white rounded-full" />
        </div>

        {/* Surface marker */}
        <div className="absolute top-0 left-full ml-2 text-[10px] text-white/40 whitespace-nowrap">
          Surface
        </div>

        {/* Center marker */}
        <div className="absolute bottom-0 left-full ml-2 text-[10px] text-white/40 whitespace-nowrap">
          Center
        </div>
      </div>

      {/* Layer labels */}
      <div className="relative h-64 flex flex-col text-[10px] text-white/60">
        {LAYERS.map((layer) => {
          const topPercent = (layer.startDepth / EARTH_RADIUS) * 100
          const heightPercent = ((layer.endDepth - layer.startDepth) / EARTH_RADIUS) * 100
          const centerPercent = topPercent + heightPercent / 2

          // Only show label if segment is big enough
          if (heightPercent < 5) return null

          // Highlight current layer
          const isCurrentLayer = depth >= layer.startDepth && depth <= layer.endDepth

          return (
            <div
              key={layer.name}
              className="absolute left-0 whitespace-nowrap transition-all duration-300"
              style={{
                top: `${centerPercent}%`,
                transform: 'translateY(-50%)',
                color: isCurrentLayer ? layer.color : undefined,
                opacity: isCurrentLayer ? 1 : 0.5,
                fontWeight: isCurrentLayer ? 600 : 400,
              }}
            >
              {layer.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}
