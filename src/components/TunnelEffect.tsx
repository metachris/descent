import { useEffect, useRef, useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { getPhaseAtTime } from '../data/content'

// Phase-specific tunnel configurations
const PHASE_TUNNEL: Record<string, {
  ringColor: string
  lineColor: string
  intensity: number  // 0-1 overall effect strength
  speed: number      // ring expansion speed multiplier
  lineCount: number  // number of radial speed lines
}> = {
  'The Edge':       { ringColor: '100,150,200', lineColor: '80,130,180',  intensity: 0.2, speed: 0.15, lineCount: 0 },
  'The Plunge':     { ringColor: '100,120,160', lineColor: '120,140,180', intensity: 0.5, speed: 0.6,  lineCount: 12 },
  'Heat Death':     { ringColor: '180,80,40',   lineColor: '200,100,50',  intensity: 0.6, speed: 0.9,  lineCount: 16 },
  'Boiling':        { ringColor: '220,100,30',  lineColor: '255,120,40',  intensity: 0.7, speed: 1.2,  lineCount: 20 },
  'Crushing':       { ringColor: '100,90,80',   lineColor: '80,70,60',    intensity: 0.4, speed: 0.5,  lineCount: 8 },
  'Incineration':   { ringColor: '240,130,40',  lineColor: '255,150,50',  intensity: 0.8, speed: 1.4,  lineCount: 22 },
  'The Long Fall':  { ringColor: '60,55,50',    lineColor: '70,65,58',    intensity: 0.25, speed: 0.25, lineCount: 4 },
  'Outer Core':     { ringColor: '230,120,30',  lineColor: '250,150,50',  intensity: 0.6, speed: 0.9,  lineCount: 14 },
  'Inner Core':     { ringColor: '250,200,60',  lineColor: '255,220,80',  intensity: 0.4, speed: 0.45, lineCount: 6 },
  'The Center':     { ringColor: '255,240,180', lineColor: '255,245,200', intensity: 0.2, speed: 0.12, lineCount: 2 },
  'The Yo-Yo':      { ringColor: '255,240,180', lineColor: '255,245,200', intensity: 0.12, speed: 0.08, lineCount: 0 },
}

// Plunge transition timing (seconds)
const PLUNGE_START = 10   // "You step forward"
const PLUNGE_EXPAND = 5   // seconds for the maw to fully open

export default function TunnelEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)
  const { progress, duration } = useJourney()

  const currentTime = progress * duration
  const currentPhase = useMemo(() => getPhaseAtTime(currentTime), [currentTime])
  const phaseName = currentPhase?.name || 'The Edge'

  // Fade out near journey end
  const fadeOutStart = 0.93
  const fadeOutEnd = 0.98

  let globalOpacity = 1
  if (progress > fadeOutStart) {
    globalOpacity = Math.max(0, 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart))
  }

  // Plunge transition: 0 = standing at edge, 1 = fully inside tunnel
  const plungeT = Math.max(0, Math.min(1, (currentTime - PLUNGE_START) / PLUNGE_EXPAND))
  // Ease-in-out for smooth acceleration
  const plungeEased = plungeT < 0.5
    ? 2 * plungeT * plungeT
    : 1 - Math.pow(-2 * plungeT + 2, 2) / 2

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

      const config = PHASE_TUNNEL[phaseName] || PHASE_TUNNEL['The Edge']
      const t = timeRef.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (globalOpacity <= 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const maxRadius = Math.sqrt(cx * cx + cy * cy)

      // === TUNNEL MAW (center void) ===
      // Before the plunge: small dark circle at center suggesting the hole
      // During plunge: expands rapidly to fill the screen (you're falling in)
      if (plungeEased < 1) {
        // Maw radius: starts small, expands to fill screen
        const mawRestRadius = 30 // small dark circle during The Edge
        const mawRadius = mawRestRadius + plungeEased * (maxRadius - mawRestRadius)

        // Dark void center with a subtle colored rim
        const rimWidth = 8 + plungeEased * 20

        // Rim glow - gets brighter as it expands
        const rimGrad = ctx.createRadialGradient(cx, cy, Math.max(0, mawRadius - rimWidth), cx, cy, mawRadius + 4)
        const rimOpacity = (0.15 + plungeEased * 0.4) * globalOpacity
        rimGrad.addColorStop(0, 'transparent')
        rimGrad.addColorStop(0.5, `rgba(${config.ringColor}, ${rimOpacity})`)
        rimGrad.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(cx, cy, mawRadius + 4, 0, Math.PI * 2)
        ctx.fillStyle = rimGrad
        ctx.fill()

        // Interior fill — deep indigo/violet void
        const voidOpacity = (0.7 - plungeEased * 0.7) * globalOpacity
        if (voidOpacity > 0.01) {
          const voidGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, mawRadius)
          voidGrad.addColorStop(0, `rgba(20, 10, 50, ${voidOpacity})`)
          voidGrad.addColorStop(0.4, `rgba(15, 15, 45, ${voidOpacity * 0.8})`)
          voidGrad.addColorStop(0.7, `rgba(10, 10, 30, ${voidOpacity * 0.4})`)
          voidGrad.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(cx, cy, mawRadius, 0, Math.PI * 2)
          ctx.fillStyle = voidGrad
          ctx.fill()
        }
      }

      // === CONCENTRIC RINGS ===
      // Speed ramps up smoothly with plunge transition
      const speedMult = config.speed * (0.3 + plungeEased * 0.7)
      const intensityMult = config.intensity * (0.4 + plungeEased * 0.6)
      const ringCount = 35
      const ringSpacing = maxRadius / ringCount

      for (let i = 0; i < ringCount; i++) {
        // Rings expand outward over time — slow, breathing pace
        const phase = ((t * speedMult * 12 + i * ringSpacing) % maxRadius)
        const radius = phase

        // Fade ring based on distance from center (inner = brighter)
        const distFactor = 1 - radius / maxRadius
        const ringOpacity = distFactor * distFactor * intensityMult * globalOpacity * 0.3

        if (ringOpacity < 0.005) continue

        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${config.ringColor}, ${ringOpacity})`
        ctx.lineWidth = 1 + distFactor * 2
        ctx.stroke()
      }

      // === RADIAL SPEED LINES ===
      // Only appear once we're falling (plunge started)
      if (config.lineCount > 0 && plungeEased > 0.3) {
        const lineFade = Math.min(1, (plungeEased - 0.3) / 0.4)
        const lineLength = 30 + config.speed * 40

        for (let i = 0; i < config.lineCount; i++) {
          const angle = (i / config.lineCount) * Math.PI * 2 + t * 0.1
          const startDist = 40 + Math.sin(t * 2 + i) * 20
          const endDist = startDist + lineLength

          const x1 = cx + Math.cos(angle) * startDist
          const y1 = cy + Math.sin(angle) * startDist
          const x2 = cx + Math.cos(angle) * endDist
          const y2 = cy + Math.sin(angle) * endDist

          const lineOpacity = intensityMult * lineFade * globalOpacity * 0.2 * (0.5 + Math.sin(t * 3 + i * 0.7) * 0.5)

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = `rgba(${config.lineColor}, ${lineOpacity})`
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
  }, [phaseName, globalOpacity, plungeEased])

  if (globalOpacity <= 0) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2, mixBlendMode: 'screen' }}
    />
  )
}
