import { useEffect, useRef, useMemo } from 'react'
import { useJourney } from '../hooks/useJourney'
import { getPhaseAtTime, getTemperatureAtDepth, getDepthAtTime } from '../data/content'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  type: 'debris' | 'ember' | 'magma' | 'crystal' | 'dust' | 'sparkle'
  life: number
  maxLife: number
  rotation: number
  rotationSpeed: number
  // Sparkle-specific properties
  sparklePhase?: number
  sparkleSpeed?: number
  baseSize?: number
}

// Phase-specific particle configurations
const PHASE_PARTICLES: Record<string, {
  types: Particle['type'][]
  density: number
  baseSpeed: number
  colors: string[]
}> = {
  'The Edge': {
    types: ['dust'],
    density: 0,
    baseSpeed: 0,
    colors: []
  },
  'The Plunge': {
    types: ['debris', 'dust'],
    density: 0.4,
    baseSpeed: 0.8,
    colors: ['rgba(139, 115, 85, 0.6)', 'rgba(160, 140, 110, 0.4)', 'rgba(100, 80, 60, 0.5)']
  },
  'Heat Death': {
    types: ['debris', 'ember'],
    density: 0.5,
    baseSpeed: 1.2,
    colors: ['rgba(180, 80, 40, 0.7)', 'rgba(220, 100, 50, 0.6)', 'rgba(139, 69, 19, 0.5)']
  },
  'Boiling': {
    types: ['ember', 'debris'],
    density: 0.6,
    baseSpeed: 1.6,
    colors: ['rgba(255, 100, 50, 0.8)', 'rgba(255, 150, 50, 0.6)', 'rgba(200, 60, 30, 0.7)']
  },
  'Crushing': {
    types: ['dust', 'debris'],
    density: 0.2,
    baseSpeed: 0.6,
    colors: ['rgba(120, 110, 100, 0.4)', 'rgba(90, 80, 70, 0.5)', 'rgba(70, 60, 50, 0.3)']
  },
  'Incineration': {
    types: ['ember', 'magma'],
    density: 0.4,
    baseSpeed: 1.4,
    colors: ['rgba(255, 140, 50, 0.8)', 'rgba(255, 100, 30, 0.7)', 'rgba(220, 80, 20, 0.6)']
  },
  'The Long Fall': {
    types: ['dust'],
    density: 0.1,
    baseSpeed: 0.3,
    colors: ['rgba(80, 70, 60, 0.2)', 'rgba(100, 90, 80, 0.15)']
  },
  'Outer Core': {
    types: ['magma', 'ember'],
    density: 0.15,
    baseSpeed: 0.4,
    colors: ['rgba(255, 160, 60, 0.3)', 'rgba(240, 120, 40, 0.25)', 'rgba(200, 90, 30, 0.2)']
  },
  'Inner Core': {
    types: ['crystal', 'sparkle'],
    density: 0.2,
    baseSpeed: 0.15,
    colors: ['rgba(255, 215, 80, 0.3)', 'rgba(255, 200, 60, 0.25)', 'rgba(250, 230, 120, 0.2)']
  },
  'The Center': {
    types: ['sparkle'],
    density: 0.15,
    baseSpeed: 0.08,
    colors: ['rgba(255, 230, 130, 0.25)', 'rgba(255, 245, 180, 0.2)', 'rgba(255, 220, 100, 0.15)']
  },
  'The Yo-Yo': {
    types: ['sparkle'],
    density: 0.1,
    baseSpeed: 0.04,
    colors: ['rgba(255, 230, 150, 0.15)', 'rgba(255, 245, 200, 0.1)']
  }
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const lastPhaseRef = useRef<string>('')
  const { progress, duration } = useJourney()

  const currentTime = progress * duration
  const currentPhase = useMemo(() => getPhaseAtTime(currentTime), [currentTime])
  const phaseName = currentPhase?.name || 'The Edge'
  const depth = useMemo(() => getDepthAtTime(currentTime), [currentTime])
  const temperature = useMemo(() => getTemperatureAtDepth(depth), [depth])

  // Create a particle — spawns near center, flies radially outward
  const createParticle = (canvas: HTMLCanvasElement, config: typeof PHASE_PARTICLES[string]): Particle => {
    const type = config.types[Math.floor(Math.random() * config.types.length)]
    const color = config.colors[Math.floor(Math.random() * config.colors.length)]

    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const halfScreen = Math.min(cx, cy)

    // Random radial angle
    const angle = Math.random() * Math.PI * 2

    let size: number
    let speed: number
    let spawnRadius: number

    switch (type) {
      case 'debris':
        size = 2 + Math.random() * 3
        speed = config.baseSpeed + Math.random() * 1
        spawnRadius = halfScreen * (0.3 + Math.random() * 0.4)
        break
      case 'ember':
        size = 1 + Math.random() * 2
        speed = config.baseSpeed + Math.random() * 1.5
        spawnRadius = halfScreen * (0.25 + Math.random() * 0.4)
        break
      case 'magma':
        size = 2 + Math.random() * 4
        speed = config.baseSpeed * 0.7 + Math.random() * 1
        spawnRadius = halfScreen * (0.3 + Math.random() * 0.35)
        break
      case 'crystal':
        size = 1 + Math.random() * 1.5
        speed = config.baseSpeed * 0.3
        spawnRadius = halfScreen * (0.4 + Math.random() * 0.5)
        break
      case 'sparkle':
        size = 1 + Math.random() * 1.5
        speed = config.baseSpeed * 0.15
        spawnRadius = halfScreen * (0.35 + Math.random() * 0.5)
        break
      case 'dust':
      default:
        size = 0.5 + Math.random() * 1
        speed = config.baseSpeed * 0.5 + Math.random() * 0.5
        spawnRadius = halfScreen * (0.25 + Math.random() * 0.45)
        break
    }

    // Radial velocity: outward from center
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed

    const maxLife = type === 'crystal' || type === 'sparkle'
      ? 200 + Math.random() * 300
      : 100 + Math.random() * 150

    return {
      x: cx + Math.cos(angle) * spawnRadius,
      y: cy + Math.sin(angle) * spawnRadius,
      vx,
      vy,
      size,
      opacity: 0,
      color,
      type,
      life: 0,
      maxLife,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      sparklePhase: Math.random() * Math.PI * 2,
      sparkleSpeed: 0.05 + Math.random() * 0.15,
      baseSize: size,
    }
  }

  // Draw a single particle
  const drawParticle = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)
    ctx.globalAlpha = p.opacity

    switch (p.type) {
      case 'debris':
        // Irregular rock shape
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.moveTo(-p.size * 0.5, -p.size * 0.3)
        ctx.lineTo(p.size * 0.3, -p.size * 0.5)
        ctx.lineTo(p.size * 0.5, p.size * 0.2)
        ctx.lineTo(-p.size * 0.2, p.size * 0.5)
        ctx.closePath()
        ctx.fill()
        break

      case 'ember':
        // Glowing ember with gradient
        const emberGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
        emberGrad.addColorStop(0, p.color.replace(/[\d.]+\)$/, '1)'))
        emberGrad.addColorStop(0.5, p.color)
        emberGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = emberGrad
        ctx.beginPath()
        ctx.arc(0, 0, p.size, 0, Math.PI * 2)
        ctx.fill()
        break

      case 'magma':
        // Blob-like magma globule
        const magmaGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
        magmaGrad.addColorStop(0, 'rgba(255, 255, 200, 0.9)')
        magmaGrad.addColorStop(0.3, p.color.replace(/[\d.]+\)$/, '0.8)'))
        magmaGrad.addColorStop(0.7, p.color)
        magmaGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = magmaGrad
        ctx.beginPath()
        // Wobbly circle
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          const wobble = p.size * (0.8 + Math.sin(p.life * 0.1 + i) * 0.2)
          const px = Math.cos(angle) * wobble
          const py = Math.sin(angle) * wobble
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.fill()
        break

      case 'crystal':
        // Sparkling crystal
        ctx.fillStyle = p.color
        const crystalSparkle = 0.5 + Math.sin(p.life * 0.15) * 0.5
        ctx.globalAlpha = p.opacity * crystalSparkle
        // Diamond shape
        ctx.beginPath()
        ctx.moveTo(0, -p.size)
        ctx.lineTo(p.size * 0.6, 0)
        ctx.lineTo(0, p.size)
        ctx.lineTo(-p.size * 0.6, 0)
        ctx.closePath()
        ctx.fill()
        // Add glow
        ctx.shadowColor = p.color
        ctx.shadowBlur = p.size * 2
        ctx.fill()
        break

      case 'sparkle':
        // Subtle twinkling sparkle
        const phase = (p.sparklePhase || 0) + p.life * (p.sparkleSpeed || 0.05)
        // Gentle sine wave for smooth pulsing
        const twinkle = 0.4 + Math.sin(phase) * 0.6
        const currentSize = (p.baseSize || p.size) * (0.8 + twinkle * 0.4)

        // Soft glowing dot
        ctx.globalAlpha = p.opacity * twinkle * 0.7
        const sparkleGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize * 2)
        sparkleGrad.addColorStop(0, p.color)
        sparkleGrad.addColorStop(0.3, p.color)
        sparkleGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = sparkleGrad
        ctx.beginPath()
        ctx.arc(0, 0, currentSize * 2, 0, Math.PI * 2)
        ctx.fill()

        // Bright center core
        ctx.globalAlpha = p.opacity * twinkle
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(0, 0, currentSize * 0.4, 0, Math.PI * 2)
        ctx.fill()
        break

      case 'dust':
      default:
        // Simple circle
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(0, 0, p.size, 0, Math.PI * 2)
        ctx.fill()
        break
    }

    ctx.restore()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      const config = PHASE_PARTICLES[phaseName] || PHASE_PARTICLES['The Edge']

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Reset particles on phase change
      if (lastPhaseRef.current !== phaseName) {
        // Gradually fade out old particles rather than instant clear
        particlesRef.current = particlesRef.current.filter(p => p.opacity > 0.1)
        lastPhaseRef.current = phaseName
      }

      // Calculate target particle count based on density and temperature
      const tempMultiplier = Math.min(2, 1 + temperature / 3000)
      const targetCount = Math.floor(50 * config.density * tempMultiplier)

      // Add new particles
      while (particlesRef.current.length < targetCount) {
        particlesRef.current.push(createParticle(canvas, config))
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        // Update life
        p.life++

        // Fade in/out based on life
        const lifeProgress = p.life / p.maxLife
        if (lifeProgress < 0.1) {
          p.opacity = lifeProgress * 10
        } else if (lifeProgress > 0.8) {
          p.opacity = (1 - lifeProgress) * 5
        } else {
          p.opacity = 1
        }

        // Radial acceleration — particles speed up as they fly outward (perspective)
        const dx = p.x - canvas.width / 2
        const dy = p.y - canvas.height / 2
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (p.type === 'crystal' || p.type === 'sparkle') {
          // Gentle radial drift for sparkles/crystals
          if (dist > 1) {
            p.vx += (dx / dist) * 0.001
            p.vy += (dy / dist) * 0.001
          }
          p.vx += (Math.random() - 0.5) * 0.005
          p.vy += (Math.random() - 0.5) * 0.005
        } else if (dist > 1) {
          // Other types: very gentle outward acceleration
          p.vx += (dx / dist) * 0.008
          p.vy += (dy / dist) * 0.008
        }

        // Update position
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed

        // Draw
        drawParticle(ctx, p)

        // Remove if off-screen or life expired
        const offScreen = p.y > canvas.height + p.size * 2 ||
                          p.y < -p.size * 2 ||
                          p.x < -p.size * 2 ||
                          p.x > canvas.width + p.size * 2

        return !offScreen && p.life < p.maxLife
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [phaseName, temperature])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
