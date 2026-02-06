import { useEffect, useRef, useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { PHASES, getPhaseAtTime } from '../data/content'

// Phase-specific tunnel configurations
interface TunnelConfig {
  ringColor: [number, number, number]
  lineColor: [number, number, number]
  intensity: number
  speed: number
  lineCount: number
}

const PHASE_TUNNEL: Record<string, TunnelConfig> = {
  'The Edge':       { ringColor: [100,150,200], lineColor: [80,130,180],  intensity: 0.2, speed: 0.15, lineCount: 0 },
  'The Plunge':     { ringColor: [100,120,160], lineColor: [120,140,180], intensity: 0.5, speed: 0.6,  lineCount: 12 },
  'Heat Death':     { ringColor: [180,80,40],   lineColor: [200,100,50],  intensity: 0.6, speed: 0.9,  lineCount: 16 },
  'Boiling':        { ringColor: [220,100,30],  lineColor: [255,120,40],  intensity: 0.7, speed: 1.2,  lineCount: 20 },
  'Crushing':       { ringColor: [100,90,80],   lineColor: [80,70,60],    intensity: 0.4, speed: 0.5,  lineCount: 8 },
  'Incineration':   { ringColor: [240,130,40],  lineColor: [255,150,50],  intensity: 0.8, speed: 1.4,  lineCount: 22 },
  'The Long Fall':  { ringColor: [60,55,50],    lineColor: [70,65,58],    intensity: 0.25, speed: 0.25, lineCount: 4 },
  'Outer Core':     { ringColor: [230,120,30],  lineColor: [250,150,50],  intensity: 0.6, speed: 0.9,  lineCount: 14 },
  'Inner Core':     { ringColor: [250,200,60],  lineColor: [255,220,80],  intensity: 0.4, speed: 0.45, lineCount: 6 },
  'The Center':     { ringColor: [255,240,180], lineColor: [255,245,200], intensity: 0.2, speed: 0.12, lineCount: 2 },
  'The Yo-Yo':      { ringColor: [255,240,180], lineColor: [255,245,200], intensity: 0.12, speed: 0.08, lineCount: 0 },
}

function lerpColor(a: [number,number,number], b: [number,number,number], t: number): [number,number,number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ]
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function colorStr(c: [number,number,number]): string {
  return `${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])}`
}

// Plunge transition timing (seconds)
const PLUNGE_START = 10
const PLUNGE_EXPAND = 5

export default function TunnelEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)
  const { progress, duration } = useJourney()

  const currentTime = progress * duration
  const currentPhase = useMemo(() => getPhaseAtTime(currentTime), [currentTime])
  const phaseName = currentPhase?.name || 'The Edge'

  // Compute blended config: interpolate between current and next phase
  const blended = useMemo(() => {
    const config = PHASE_TUNNEL[phaseName] || PHASE_TUNNEL['The Edge']
    if (!currentPhase) return config

    const phaseProgress = (currentTime - currentPhase.startTime) / (currentPhase.endTime - currentPhase.startTime)
    const phaseIndex = PHASES.findIndex(p => p.name === phaseName)
    const nextPhaseName = PHASES[phaseIndex + 1]?.name
    const nextConfig = nextPhaseName ? PHASE_TUNNEL[nextPhaseName] : null

    // Blend in the last 30% of each phase
    const blendStart = 0.7
    if (!nextConfig || phaseProgress < blendStart) return config

    const t = (phaseProgress - blendStart) / (1 - blendStart)
    return {
      ringColor: lerpColor(config.ringColor, nextConfig.ringColor, t),
      lineColor: lerpColor(config.lineColor, nextConfig.lineColor, t),
      intensity: lerp(config.intensity, nextConfig.intensity, t),
      speed: lerp(config.speed, nextConfig.speed, t),
      lineCount: Math.round(lerp(config.lineCount, nextConfig.lineCount, t)),
    }
  }, [currentTime, phaseName, currentPhase])

  // Store blended values in refs so the animation loop reads them without restarting
  const configRef = useRef(blended)
  configRef.current = blended

  // Fade out near journey end
  const fadeOutStart = 0.93
  const fadeOutEnd = 0.98
  let globalOpacity = 1
  if (progress > fadeOutStart) {
    globalOpacity = Math.max(0, 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart))
  }
  const globalOpacityRef = useRef(globalOpacity)
  globalOpacityRef.current = globalOpacity

  // Plunge transition
  const plungeT = Math.max(0, Math.min(1, (currentTime - PLUNGE_START) / PLUNGE_EXPAND))
  const plungeEased = plungeT < 0.5
    ? 2 * plungeT * plungeT
    : 1 - Math.pow(-2 * plungeT + 2, 2) / 2
  const plungeRef = useRef(plungeEased)
  plungeRef.current = plungeEased

  // Single stable animation loop — never restarts on phase change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let lastTimestamp = 0

    const animate = (timestamp: number) => {
      const delta = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0.016
      lastTimestamp = timestamp
      timeRef.current += delta

      const config = configRef.current
      const opacity = globalOpacityRef.current
      const plunge = plungeRef.current
      const t = timeRef.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (opacity <= 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const maxRadius = Math.sqrt(cx * cx + cy * cy)

      // === TUNNEL MAW (center void) — only during plunge ===
      if (plunge > 0 && plunge < 1) {
        const mawRadius = plunge * maxRadius

        // Rim glow
        const rimWidth = 8 + plunge * 20
        const rimGrad = ctx.createRadialGradient(cx, cy, Math.max(0, mawRadius - rimWidth), cx, cy, mawRadius + 4)
        const rimOpacity = (0.15 + plunge * 0.4) * opacity
        rimGrad.addColorStop(0, 'transparent')
        rimGrad.addColorStop(0.5, `rgba(${colorStr(config.ringColor)}, ${rimOpacity})`)
        rimGrad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(cx, cy, mawRadius + 4, 0, Math.PI * 2)
        ctx.fillStyle = rimGrad
        ctx.fill()

        // Interior fill — dark blue at rest, shifts to black during plunge
        const voidOpacity = (plunge < 0.8 ? 1.0 : 1.0 - (plunge - 0.8) / 0.2) * opacity
        if (voidOpacity > 0.01) {
          const r = Math.round(10 * (1 - plunge))
          const g = Math.round(15 * (1 - plunge))
          const b = Math.round(40 * (1 - plunge))
          const col = `rgba(${r}, ${g}, ${b}, ${voidOpacity})`

          const edgeSoftness = mawRadius * 0.08
          const voidGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, mawRadius)
          voidGrad.addColorStop(0, col)
          voidGrad.addColorStop(Math.max(0, 1 - edgeSoftness / mawRadius), col)
          voidGrad.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(cx, cy, mawRadius, 0, Math.PI * 2)
          ctx.fillStyle = voidGrad
          ctx.fill()
        }
      }

      // === CONCENTRIC RINGS ===
      const speedMult = config.speed * (0.3 + plunge * 0.7)
      const intensityMult = config.intensity * (0.4 + plunge * 0.6)
      const ringCount = 35
      const ringSpacing = maxRadius / ringCount
      const rc = colorStr(config.ringColor)

      for (let i = 0; i < ringCount; i++) {
        const phase = ((t * speedMult * 12 + i * ringSpacing) % maxRadius)
        const radius = phase
        const distFactor = 1 - radius / maxRadius
        const ringOpacity = distFactor * distFactor * intensityMult * opacity * 0.3

        if (ringOpacity < 0.005) continue

        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${rc}, ${ringOpacity})`
        ctx.lineWidth = 1 + distFactor * 2
        ctx.stroke()
      }

      // === RADIAL SPEED LINES ===
      if (config.lineCount > 0 && plunge > 0.3) {
        const lineFade = Math.min(1, (plunge - 0.3) / 0.4)
        const lineLength = 30 + config.speed * 40
        const lc = colorStr(config.lineColor)

        for (let i = 0; i < config.lineCount; i++) {
          const angle = (i / config.lineCount) * Math.PI * 2 + t * 0.1
          const startDist = 40 + Math.sin(t * 2 + i) * 20
          const endDist = startDist + lineLength

          const x1 = cx + Math.cos(angle) * startDist
          const y1 = cy + Math.sin(angle) * startDist
          const x2 = cx + Math.cos(angle) * endDist
          const y2 = cy + Math.sin(angle) * endDist

          const lineOpacity = intensityMult * lineFade * opacity * 0.2 * (0.5 + Math.sin(t * 3 + i * 0.7) * 0.5)

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = `rgba(${lc}, ${lineOpacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, []) // Stable — never restarts

  if (globalOpacity <= 0) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  )
}
