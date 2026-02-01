import { useJourney } from '../hooks/useJourney'
import { LAYERS, getDepthAtTime } from '../data/content'

export default function VerticalMinimap() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration
  const depth = getDepthAtTime(currentTime)

  // Current layer for highlighting
  const currentLayer = LAYERS.find(l => depth >= l.startDepth && depth <= l.endDepth)

  return (
    <div
      className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10"
      style={{ '--progress': progress } as React.CSSProperties}
    >
      {/* Vertical bar */}
      <div className="relative w-3 h-80 rounded-full overflow-hidden bg-white/10">
        {/* Gradient fill showing progress */}
        <div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-white/30 to-white/10"
          style={{ height: `calc(var(--progress) * 100%)` }}
        />

        {/* Current position marker */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: `calc(var(--progress) * 100%)` }}
        >
          {/* Line */}
          <div className="absolute -left-1 -right-1 h-0.5 bg-white -translate-y-1/2" />

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

      {/* Earth layer labels */}
      <div className="relative h-80 text-[10px] text-white/60">
        {/* Surface */}
        <div className="absolute top-0 left-0 text-white/40">
          Surface
        </div>

        {/* Layer names */}
        {LAYERS.map((layer) => {
          const layerMidDepth = (layer.startDepth + layer.endDepth) / 2
          const approxTimelinePosition = getTimelinePositionForDepth(layerMidDepth)
          const isActive = currentLayer?.name === layer.name

          return (
            <div
              key={layer.name}
              className="absolute left-0 whitespace-nowrap"
              style={{
                top: `${approxTimelinePosition}%`,
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
        <div className="absolute bottom-0 left-0 text-white/40">
          Center
        </div>
      </div>

      {/* Debug: show progress value */}
      <div className="absolute -bottom-6 left-0 text-[9px] text-white/30 font-mono">
        {(progress * 100).toFixed(1)}%
      </div>
    </div>
  )
}

function getTimelinePositionForDepth(depth: number): number {
  if (depth <= 400) {
    return (depth / 400) * 30
  } else if (depth <= 2900) {
    return 30 + ((depth - 400) / 2500) * 27
  } else if (depth <= 5150) {
    return 57 + ((depth - 2900) / 2250) * 16
  } else {
    return 73 + ((depth - 5150) / 1221) * 27
  }
}
