import { useEffect, useRef, useCallback, useState } from 'react'

// Immersive evolving soundscape for the descent experience
// Features: heartbeat, breathing LFOs, random events, distinct sections

interface AudioEngine {
  ctx: AudioContext
  masterGain: GainNode

  // Heartbeat
  heartOsc: OscillatorNode
  heartGain: GainNode
  heartLFO: OscillatorNode
  heartLFOGain: GainNode

  // Breath/wind texture
  breathNoise: AudioBufferSourceNode
  breathFilter: BiquadFilterNode
  breathGain: GainNode

  // Main drone
  drone: OscillatorNode
  droneGain: GainNode
  droneLFO: OscillatorNode

  // Sub bass
  sub: OscillatorNode
  subGain: GainNode

  // Shimmer (for inner core/center)
  shimmerOsc1: OscillatorNode
  shimmerOsc2: OscillatorNode
  shimmerGain: GainNode

  // Rumble events
  rumbleGain: GainNode

  // Reverb
  convolver: ConvolverNode
  reverbGain: GainNode
  dryGain: GainNode
}

// Singleton
let engine: AudioEngine | null = null
let isEngineRunning = false
let rumbleInterval: number | null = null

// Create noise buffer
function createNoiseBuffer(ctx: AudioContext, type: 'brown' | 'pink' = 'brown'): AudioBuffer {
  const bufferSize = ctx.sampleRate * 4
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  if (type === 'brown') {
    let lastOut = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      data[i] = (lastOut + 0.02 * white) / 1.02
      lastOut = data[i]
      data[i] *= 3.5
    }
  } else {
    // Pink noise
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
      b6 = white * 0.115926
    }
  }

  return buffer
}

// Create simple reverb impulse
function createReverbImpulse(ctx: AudioContext, duration: number, decay: number): AudioBuffer {
  const length = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate)

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel)
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
    }
  }

  return buffer
}

function createEngine(ctx: AudioContext): AudioEngine {
  const masterGain = ctx.createGain()
  masterGain.gain.value = 0
  masterGain.connect(ctx.destination)

  // === DRY/WET MIX FOR REVERB ===
  const dryGain = ctx.createGain()
  dryGain.gain.value = 0.7
  dryGain.connect(masterGain)

  const convolver = ctx.createConvolver()
  convolver.buffer = createReverbImpulse(ctx, 3, 2)
  const reverbGain = ctx.createGain()
  reverbGain.gain.value = 0.3
  convolver.connect(reverbGain)
  reverbGain.connect(masterGain)

  // === HEARTBEAT ===
  // Low thump with LFO for rhythm
  const heartOsc = ctx.createOscillator()
  heartOsc.type = 'sine'
  heartOsc.frequency.value = 55

  const heartGain = ctx.createGain()
  heartGain.gain.value = 0

  // LFO to create heartbeat rhythm (~70 bpm = 1.17 Hz)
  const heartLFO = ctx.createOscillator()
  heartLFO.frequency.value = 1.17
  const heartLFOGain = ctx.createGain()
  heartLFOGain.gain.value = 0.15

  heartLFO.connect(heartLFOGain)
  heartLFOGain.connect(heartGain.gain)
  heartOsc.connect(heartGain)
  heartGain.connect(dryGain)

  // === BREATH/WIND ===
  const breathNoise = ctx.createBufferSource()
  breathNoise.buffer = createNoiseBuffer(ctx, 'pink')
  breathNoise.loop = true

  const breathFilter = ctx.createBiquadFilter()
  breathFilter.type = 'bandpass'
  breathFilter.frequency.value = 500
  breathFilter.Q.value = 0.8

  const breathGain = ctx.createGain()
  breathGain.gain.value = 0.1

  breathNoise.connect(breathFilter)
  breathFilter.connect(breathGain)
  breathGain.connect(dryGain)

  // === MAIN DRONE ===
  const drone = ctx.createOscillator()
  drone.type = 'sine'
  drone.frequency.value = 65

  const droneGain = ctx.createGain()
  droneGain.gain.value = 0.12

  // Slow LFO for drone "breathing"
  const droneLFO = ctx.createOscillator()
  droneLFO.frequency.value = 0.1 // Very slow
  const droneLFOGain = ctx.createGain()
  droneLFOGain.gain.value = 5 // Modulate frequency by ±5 Hz
  droneLFO.connect(droneLFOGain)
  droneLFOGain.connect(drone.frequency)

  drone.connect(droneGain)
  droneGain.connect(dryGain)
  droneGain.connect(convolver) // Also send to reverb

  // === SUB BASS ===
  const sub = ctx.createOscillator()
  sub.type = 'sine'
  sub.frequency.value = 35

  const subGain = ctx.createGain()
  subGain.gain.value = 0.08

  sub.connect(subGain)
  subGain.connect(dryGain)

  // === SHIMMER (crystalline for inner core) ===
  const shimmerOsc1 = ctx.createOscillator()
  shimmerOsc1.type = 'sine'
  shimmerOsc1.frequency.value = 880

  const shimmerOsc2 = ctx.createOscillator()
  shimmerOsc2.type = 'sine'
  shimmerOsc2.frequency.value = 1320 // Perfect fifth above

  const shimmerGain = ctx.createGain()
  shimmerGain.gain.value = 0

  shimmerOsc1.connect(shimmerGain)
  shimmerOsc2.connect(shimmerGain)
  shimmerGain.connect(convolver) // Shimmer goes through reverb
  shimmerGain.connect(dryGain)

  // === RUMBLE EVENTS ===
  const rumbleGain = ctx.createGain()
  rumbleGain.gain.value = 0
  rumbleGain.connect(dryGain)
  rumbleGain.connect(convolver)

  return {
    ctx,
    masterGain,
    heartOsc,
    heartGain,
    heartLFO,
    heartLFOGain,
    breathNoise,
    breathFilter,
    breathGain,
    drone,
    droneGain,
    droneLFO,
    sub,
    subGain,
    shimmerOsc1,
    shimmerOsc2,
    shimmerGain,
    rumbleGain,
    convolver,
    reverbGain,
    dryGain,
  }
}

function startEngine(e: AudioEngine) {
  if (isEngineRunning) return

  e.heartOsc.start()
  e.heartLFO.start()
  e.breathNoise.start()
  e.drone.start()
  e.droneLFO.start()
  e.sub.start()
  e.shimmerOsc1.start()
  e.shimmerOsc2.start()

  isEngineRunning = true
}

// Trigger a random rumble event
function triggerRumble(e: AudioEngine) {
  if (e.ctx.state === 'closed') return

  const ctx = e.ctx
  const now = ctx.currentTime

  // Create a one-shot rumble
  const rumbleOsc = ctx.createOscillator()
  rumbleOsc.type = 'sine'
  rumbleOsc.frequency.value = 20 + Math.random() * 20 // 20-40 Hz

  const rumbleEnv = ctx.createGain()
  rumbleEnv.gain.value = 0

  rumbleOsc.connect(rumbleEnv)
  rumbleEnv.connect(e.rumbleGain)

  // Envelope: fade in, sustain, fade out
  const duration = 2 + Math.random() * 3 // 2-5 seconds
  const attackTime = 0.5
  const releaseTime = 1

  rumbleEnv.gain.linearRampToValueAtTime(0.15 + Math.random() * 0.1, now + attackTime)
  rumbleEnv.gain.linearRampToValueAtTime(0.15 + Math.random() * 0.1, now + duration - releaseTime)
  rumbleEnv.gain.linearRampToValueAtTime(0, now + duration)

  rumbleOsc.start(now)
  rumbleOsc.stop(now + duration + 0.1)
}

// Update sound based on progress
function updateSoundscape(e: AudioEngine, progress: number) {
  const ctx = e.ctx
  if (ctx.state === 'closed') return

  const now = ctx.currentTime
  const ramp = 0.3 // Smooth transitions

  // === PHASES ===
  // 0.00 - 0.05: Edge (standing, anticipation)
  // 0.05 - 0.08: Plunge (jumping)
  // 0.08 - 0.16: Death sequence (heat stroke, consciousness fading)
  // 0.16 - 0.26: Body continues (crushing, incineration)
  // 0.26 - 0.47: Long Fall (meditative, vast)
  // 0.47 - 0.60: Outer Core (liquid metal, alien)
  // 0.60 - 0.70: Inner Core (crystalline)
  // 0.70 - 0.82: Center approach (weightless)
  // 0.82 - 1.00: Yo-yo and arrival (resolution)

  // === HEARTBEAT ===
  // Strong at start, fades during death (0.08-0.16)
  let heartVol = 0
  if (progress < 0.08) {
    heartVol = 0.15 // Full heartbeat during edge and plunge
  } else if (progress < 0.16) {
    // Fade out during death - heartbeat slowing and stopping
    const deathProgress = (progress - 0.08) / 0.08
    heartVol = 0.15 * (1 - deathProgress)
    // Also slow the heartbeat
    const heartRate = 1.17 * (1 - deathProgress * 0.7) // Slows to 30% of normal
    e.heartLFO.frequency.linearRampToValueAtTime(heartRate, now + ramp)
  } else {
    heartVol = 0 // Dead, no heartbeat
  }
  e.heartGain.gain.linearRampToValueAtTime(heartVol, now + ramp)

  // === BREATH/WIND ===
  // Airy at surface, becomes rumble deeper
  let breathFreq = 800 - progress * 700 // 800 → 100 Hz
  let breathQ = 0.5 + progress * 1.5 // Gets more resonant
  let breathVol = 0.08

  if (progress < 0.08) {
    // Edge/Plunge: breathy, airy
    breathFreq = 600 + (1 - progress / 0.08) * 400 // Higher at very start
    breathVol = 0.12
  } else if (progress < 0.16) {
    // Death: breath fading, muffled
    const deathProgress = (progress - 0.08) / 0.08
    breathFreq = 400 - deathProgress * 200
    breathVol = 0.12 * (1 - deathProgress * 0.5)
    breathQ = 2 + deathProgress * 3 // More muffled
  } else if (progress > 0.26 && progress < 0.47) {
    // Long fall: occasional gusts (handled by base + random)
    breathVol = 0.06
  }

  e.breathFilter.frequency.linearRampToValueAtTime(breathFreq, now + ramp)
  e.breathFilter.Q.linearRampToValueAtTime(breathQ, now + ramp)
  e.breathGain.gain.linearRampToValueAtTime(breathVol, now + ramp)

  // === DRONE ===
  // Pitch drops as we descend
  let droneFreq = 80 - progress * 50 // 80 → 30 Hz
  let droneVol = 0.1

  if (progress < 0.05) {
    // Edge: quiet anticipation
    droneVol = 0.05
    droneFreq = 70
  } else if (progress < 0.16) {
    // Death: distorted, unstable
    droneVol = 0.12
  } else if (progress > 0.47 && progress < 0.60) {
    // Outer core: metallic character
    droneVol = 0.15
  } else if (progress > 0.70) {
    // Center: warm, peaceful
    droneFreq = 55 // Nice low A
    droneVol = 0.12
  }

  e.drone.frequency.linearRampToValueAtTime(droneFreq, now + ramp)
  e.droneGain.gain.linearRampToValueAtTime(droneVol, now + ramp)

  // Drone LFO speed: faster during tense moments
  let lfoSpeed = 0.08
  if (progress < 0.08) lfoSpeed = 0.15 // Tense at edge
  if (progress > 0.16 && progress < 0.26) lfoSpeed = 0.05 // Very slow during body falling
  if (progress > 0.70) lfoSpeed = 0.03 // Almost still at center
  e.droneLFO.frequency.linearRampToValueAtTime(lfoSpeed, now + ramp)

  // === SUB BASS ===
  // Grows stronger as we go deeper
  let subFreq = 40 - progress * 15 // 40 → 25 Hz
  let subVol = 0.05 + progress * 0.15 // Grows louder

  if (progress < 0.16) {
    subVol = 0.03 // Quiet during surface/death
  }

  e.sub.frequency.linearRampToValueAtTime(subFreq, now + ramp)
  e.subGain.gain.linearRampToValueAtTime(subVol, now + ramp)

  // === SHIMMER ===
  // Only in inner core and center (0.60 - 1.00)
  let shimmerVol = 0
  if (progress > 0.55 && progress < 0.82) {
    // Inner core: crystalline shimmer fades in and out
    const coreProgress = (progress - 0.55) / 0.27
    shimmerVol = Math.sin(coreProgress * Math.PI) * 0.04 // Peaks in middle

    // Shimmer frequencies based on depth
    const baseFreq = 440 + (1 - coreProgress) * 220
    e.shimmerOsc1.frequency.linearRampToValueAtTime(baseFreq, now + ramp)
    e.shimmerOsc2.frequency.linearRampToValueAtTime(baseFreq * 1.5, now + ramp)
  } else if (progress > 0.82) {
    // Center/Yo-yo: gentle sustained shimmer
    shimmerVol = 0.02
    e.shimmerOsc1.frequency.linearRampToValueAtTime(440, now + ramp)
    e.shimmerOsc2.frequency.linearRampToValueAtTime(660, now + ramp)
  }
  e.shimmerGain.gain.linearRampToValueAtTime(shimmerVol, now + ramp)

  // === REVERB MIX ===
  // More reverb as we go deeper (more cavernous)
  const reverbAmount = 0.2 + progress * 0.4 // 0.2 → 0.6
  e.reverbGain.gain.linearRampToValueAtTime(reverbAmount, now + ramp)
  e.dryGain.gain.linearRampToValueAtTime(1 - reverbAmount * 0.5, now + ramp)

  // === RUMBLE EVENTS ===
  // During long fall (0.26 - 0.47), trigger occasional rumbles
  e.rumbleGain.gain.linearRampToValueAtTime(
    (progress > 0.20 && progress < 0.55) ? 1 : 0,
    now + ramp
  )

  // === FINAL FADE OUT ===
  // Fade everything to silence at the very end (last 5%)
  if (progress > 0.95) {
    const fadeProgress = (progress - 0.95) / 0.05 // 0 → 1 over last 5%
    const fadeMultiplier = 1 - fadeProgress
    e.masterGain.gain.linearRampToValueAtTime(0.7 * fadeMultiplier, now + ramp)
  }
}

// Start/stop rumble events based on progress
function manageRumbleEvents(e: AudioEngine, progress: number, isPlaying: boolean) {
  const inLongFall = progress > 0.20 && progress < 0.55

  if (inLongFall && isPlaying && !rumbleInterval) {
    // Start random rumbles every 4-8 seconds
    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 4000
      rumbleInterval = window.setTimeout(() => {
        if (engine && isEngineRunning) {
          triggerRumble(e)
          scheduleNext()
        }
      }, delay)
    }
    triggerRumble(e) // Immediate first rumble
    scheduleNext()
  } else if ((!inLongFall || !isPlaying) && rumbleInterval) {
    clearTimeout(rumbleInterval)
    rumbleInterval = null
  }
}

export function useAudio(progress: number, _duration: number, isPlaying: boolean) {
  const [isInitialized, setIsInitialized] = useState(false)
  const engineRef = useRef<AudioEngine | null>(null)
  const enabledRef = useRef(true)
  const lastProgressRef = useRef(0)

  const initAudio = useCallback(() => {
    if (engine && engine.ctx.state !== 'closed') {
      engineRef.current = engine
      setIsInitialized(true)
      return
    }

    try {
      const ctx = new AudioContext()
      engine = createEngine(ctx)
      engineRef.current = engine
      setIsInitialized(true)
    } catch (e) {
      console.warn('Web Audio API not supported')
    }
  }, [])

  // Update soundscape
  useEffect(() => {
    const e = engineRef.current
    if (!e || !enabledRef.current) return
    if (e.ctx.state === 'closed') return

    updateSoundscape(e, progress)
    manageRumbleEvents(e, progress, isPlaying)
    lastProgressRef.current = progress
  }, [progress, isPlaying])

  // Handle play/pause
  useEffect(() => {
    const e = engineRef.current
    if (!e) return
    if (e.ctx.state === 'closed') return

    if (isPlaying && enabledRef.current) {
      if (e.ctx.state === 'suspended') {
        e.ctx.resume()
      }
      startEngine(e)
      e.masterGain.gain.linearRampToValueAtTime(0.7, e.ctx.currentTime + 1)
    } else {
      e.masterGain.gain.linearRampToValueAtTime(0, e.ctx.currentTime + 0.5)
      // Stop rumbles when paused
      if (rumbleInterval) {
        clearTimeout(rumbleInterval)
        rumbleInterval = null
      }
    }
  }, [isPlaying])

  const setEnabled = useCallback((enabled: boolean) => {
    enabledRef.current = enabled
    const e = engineRef.current
    if (!e) return

    if (enabled) {
      e.masterGain.gain.linearRampToValueAtTime(0.7, e.ctx.currentTime + 0.5)
    } else {
      e.masterGain.gain.linearRampToValueAtTime(0, e.ctx.currentTime + 0.3)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (rumbleInterval) {
        clearTimeout(rumbleInterval)
        rumbleInterval = null
      }
      engineRef.current = null
    }
  }, [])

  return {
    initAudio,
    isInitialized,
    setEnabled,
  }
}
