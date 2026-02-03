import { useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { getDepthAtTime, getTemperatureAtDepth, getPhaseAtTime } from '../data/content'

// Temperature thresholds for distortion effects
const DISTORTION_START_TEMP = 100 // Start subtle distortion
const DISTORTION_MAX_TEMP = 5000 // Maximum distortion intensity

export default function HeatDistortion() {
  const { progress, duration } = useJourney()
  const currentTime = progress * duration
  const depth = useMemo(() => getDepthAtTime(currentTime), [currentTime])
  const temperature = useMemo(() => getTemperatureAtDepth(depth), [depth])
  const currentPhase = useMemo(() => getPhaseAtTime(currentTime), [currentTime])
  const phaseName = currentPhase?.name || 'The Edge'

  // Calculate distortion intensity (0-1)
  const intensity = useMemo(() => {
    if (temperature < DISTORTION_START_TEMP) return 0
    const normalized = (temperature - DISTORTION_START_TEMP) / (DISTORTION_MAX_TEMP - DISTORTION_START_TEMP)
    return Math.min(1, Math.max(0, normalized))
  }, [temperature])

  // Phase-specific color tints for the heat (must be before early return to maintain hook order)
  const heatTint = useMemo(() => {
    switch (phaseName) {
      case 'Heat Death':
      case 'Boiling':
        return 'rgba(255, 100, 50, 0.05)'
      case 'Incineration':
        return 'rgba(255, 120, 30, 0.08)'
      case 'Outer Core':
        return 'rgba(255, 140, 50, 0.1)'
      case 'Inner Core':
      case 'The Center':
      case 'The Yo-Yo':
        return 'rgba(255, 200, 100, 0.12)'
      default:
        return 'rgba(255, 150, 50, 0.05)'
    }
  }, [phaseName])

  // No distortion needed
  if (intensity === 0) return null

  // Calculate effect parameters based on intensity
  const turbulenceFrequency = 0.01 + intensity * 0.02
  const turbulenceScale = 5 + intensity * 25
  const animationSpeed = 2 + intensity * 4 // seconds per cycle

  // SVG filter ID (unique per render to avoid conflicts)
  const filterId = 'heat-distortion-filter'

  return (
    <>
      {/* SVG Filters Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Heat distortion filter */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            {/* Turbulence for organic waviness */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency={turbulenceFrequency}
              numOctaves={3}
              seed={42}
              result="noise"
            >
              {/* Animate the turbulence */}
              <animate
                attributeName="baseFrequency"
                values={`${turbulenceFrequency} ${turbulenceFrequency * 1.5};${turbulenceFrequency * 1.2} ${turbulenceFrequency};${turbulenceFrequency} ${turbulenceFrequency * 1.5}`}
                dur={`${animationSpeed}s`}
                repeatCount="indefinite"
              />
            </feTurbulence>

            {/* Displacement map using the turbulence */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={turbulenceScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Chromatic aberration filter for extreme heat */}
          <filter id="chromatic-aberration" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset in="SourceGraphic" dx={intensity * 2} dy={0} result="red">
              <animate
                attributeName="dx"
                values={`${intensity * 2};${intensity * 3};${intensity * 2}`}
                dur="0.5s"
                repeatCount="indefinite"
              />
            </feOffset>
            <feOffset in="SourceGraphic" dx={-intensity * 2} dy={0} result="blue">
              <animate
                attributeName="dx"
                values={`${-intensity * 2};${-intensity * 3};${-intensity * 2}`}
                dur="0.5s"
                repeatCount="indefinite"
              />
            </feOffset>
            <feBlend in="red" in2="blue" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Heat shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          mixBlendMode: 'overlay',
        }}
      >
        {/* Animated heat lines */}
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent ${4 - intensity * 2}px,
              ${heatTint} ${4 - intensity * 2}px,
              ${heatTint} ${5 - intensity * 2}px
            )`,
            animation: `heatRise ${3 - intensity * 2}s linear infinite`,
            opacity: intensity * 0.5,
          }}
        />

        {/* Radial heat gradient from center */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse at 50% 50%,
              ${heatTint.replace(/[\d.]+\)$/, `${intensity * 0.15})`)} 0%,
              transparent 70%
            )`,
            animation: `heatPulse ${2 / (1 + intensity)}s ease-in-out infinite`,
          }}
        />
      </div>

      {/* Edge vignette that intensifies with heat */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: `radial-gradient(
            ellipse at 50% 50%,
            transparent 40%,
            rgba(0, 0, 0, ${intensity * 0.3}) 100%
          )`,
        }}
      />

      {/* Screen shake container - applied via CSS transform */}
      <style>{`
        @keyframes heatRise {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-20px);
          }
        }

        @keyframes heatPulse {
          0%, 100% {
            transform: scale(1);
            opacity: ${intensity * 0.3};
          }
          50% {
            transform: scale(1.05);
            opacity: ${intensity * 0.5};
          }
        }

        @keyframes heatShimmer {
          0%, 100% {
            filter: url(#${filterId}) brightness(1);
          }
          50% {
            filter: url(#${filterId}) brightness(${1 + intensity * 0.1});
          }
        }

        /* Apply distortion to the main content when heat is high */
        ${intensity > 0.3 ? `
          .heat-distort-target {
            filter: url(#${filterId});
          }
        ` : ''}
      `}</style>
    </>
  )
}
