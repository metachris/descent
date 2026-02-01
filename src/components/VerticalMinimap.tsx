import { useJourney } from '../hooks/useJourney'
import { LAYERS, getDepthAtTime } from '../data/content'

const EARTH_RADIUS = 6371

export default function VerticalMinimap() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration
  const depth = getDepthAtTime(currentTime)

  // Position marker based on actual depth (proportional to Earth's radius)
  const depthPercent = Math.min((depth / EARTH_RADIUS) * 100, 100)

  // Current layer for highlighting
  const currentLayer = LAYERS.find(l => depth >= l.startDepth && depth <= l.endDepth)

  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10">
      {/* Vertical bar with real Earth layer proportions */}
      <div className="relative w-4 h-80 rounded-full overflow-hidden bg-white/5 shadow-lg">
        {/* Earth layers - sized by real proportions */}
        {LAYERS.map((layer) => {
          const topPercent = (layer.startDepth / EARTH_RADIUS) * 100
          const heightPercent = ((layer.endDepth - layer.startDepth) / EARTH_RADIUS) * 100

          const isActive = currentLayer?.name === layer.name

          return (
            <div
              key={layer.name}
              className="absolute left-0 right-0 transition-opacity duration-300"
              style={{
                top: `${topPercent}%`,
                height: `${Math.max(heightPercent, 0.5)}%`, // Min height for visibility
                backgroundColor: layer.color,
                opacity: isActive ? 1 : 0.6,
              }}
            />
          )
        })}

        {/* Current position marker */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: `${depthPercent}%` }}
        >
          {/* Line */}
          <div className="absolute -left-1 -right-1 h-0.5 bg-white -translate-y-1/2 shadow-lg" />

          {/* Arrow */}
          <div className="absolute -right-2.5 -translate-y-1/2">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
              <polygon points="0,5 10,0 10,10" />
            </svg>
          </div>

          {/* Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50" />
        </div>
      </div>

      {/* Layer labels - positioned by real depth */}
      <div className="relative h-80 text-[10px] text-white/60">
        {/* Surface */}
        <div className="absolute -top-1 left-0 text-white/50 font-medium">
          0 km
        </div>

        {/* Layer names */}
        {LAYERS.map((layer) => {
          const topPercent = (layer.startDepth / EARTH_RADIUS) * 100
          const heightPercent = ((layer.endDepth - layer.startDepth) / EARTH_RADIUS) * 100
          const centerPercent = topPercent + heightPercent / 2

          const isActive = currentLayer?.name === layer.name

          // Show all layers, but adjust position for thin ones
          const displayPercent = layer.name === 'Crust'
            ? 2 // Crust is too thin, show label slightly lower
            : centerPercent

          return (
            <div
              key={layer.name}
              className="absolute left-0 whitespace-nowrap transition-all duration-300"
              style={{
                top: `${displayPercent}%`,
                transform: 'translateY(-50%)',
                color: isActive ? layer.color : undefined,
                opacity: isActive ? 1 : 0.5,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {layer.name}
            </div>
          )
        })}

        {/* Center */}
        <div className="absolute -bottom-1 left-0 text-white/50 font-medium">
          6,371 km
        </div>
      </div>

      {/* Debug: show depth percentage */}
      <div className="absolute -bottom-6 left-0 text-[9px] text-white/30 font-mono">
        {depth.toFixed(0)} km
      </div>
    </div>
  )
}
