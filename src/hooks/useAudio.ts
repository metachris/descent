import { useEffect, useRef, useCallback, useState } from 'react'

// Continuous evolving soundscape for the descent experience
// Sound morphs smoothly based on progress - no discrete phase transitions

interface AudioEngine {
  ctx: AudioContext
  masterGain: GainNode
  // Base drone
  drone: OscillatorNode
  droneGain: GainNode
  // Sub bass
  sub: OscillatorNode
  subGain: GainNode
  // Texture (filtered noise)
  noiseSource: AudioBufferSourceNode
  noiseFilter: BiquadFilterNode
  noiseGain: GainNode
  // Harmonics
  harmonic1: OscillatorNode
  harmonic1Gain: GainNode
  harmonic2: OscillatorNode
  harmonic2Gain: GainNode
}

// Singleton to survive React strict mode
let engine: AudioEngine | null = null
let isEngineRunning = false

// Create brown noise buffer (warmer than white/pink)
function createBrownNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 4 // 4 seconds, looped
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  let lastOut = 0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    data[i] = (lastOut + 0.02 * white) / 1.02
    lastOut = data[i]
    data[i] *= 3.5
  }

  return buffer
}

// Initialize the audio engine
function createEngine(ctx: AudioContext): AudioEngine {
  const masterGain = ctx.createGain()
  masterGain.gain.value = 0
  masterGain.connect(ctx.destination)

  // Base drone - warm sine wave
  const drone = ctx.createOscillator()
  drone.type = 'sine'
  drone.frequency.value = 80 // Will modulate based on progress
  const droneGain = ctx.createGain()
  droneGain.gain.value = 0.15
  drone.connect(droneGain)
  droneGain.connect(masterGain)

  // Sub bass - very low
  const sub = ctx.createOscillator()
  sub.type = 'sine'
  sub.frequency.value = 40
  const subGain = ctx.createGain()
  subGain.gain.value = 0.1
  sub.connect(subGain)
  subGain.connect(masterGain)

  // Noise texture layer
  const noiseBuffer = createBrownNoiseBuffer(ctx)
  const noiseSource = ctx.createBufferSource()
  noiseSource.buffer = noiseBuffer
  noiseSource.loop = true

  const noiseFilter = ctx.createBiquadFilter()
  noiseFilter.type = 'bandpass'
  noiseFilter.frequency.value = 200
  noiseFilter.Q.value = 0.5

  const noiseGain = ctx.createGain()
  noiseGain.gain.value = 0.08

  noiseSource.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(masterGain)

  // Harmonics - add warmth and movement
  const harmonic1 = ctx.createOscillator()
  harmonic1.type = 'sine'
  harmonic1.frequency.value = 160 // Octave above drone
  const harmonic1Gain = ctx.createGain()
  harmonic1Gain.gain.value = 0.04
  harmonic1.connect(harmonic1Gain)
  harmonic1Gain.connect(masterGain)

  const harmonic2 = ctx.createOscillator()
  harmonic2.type = 'sine'
  harmonic2.frequency.value = 120 // Fifth above drone
  const harmonic2Gain = ctx.createGain()
  harmonic2Gain.gain.value = 0.03
  harmonic2.connect(harmonic2Gain)
  harmonic2Gain.connect(masterGain)

  return {
    ctx,
    masterGain,
    drone,
    droneGain,
    sub,
    subGain,
    noiseSource,
    noiseFilter,
    noiseGain,
    harmonic1,
    harmonic1Gain,
    harmonic2,
    harmonic2Gain,
  }
}

// Start all oscillators
function startEngine(e: AudioEngine) {
  if (isEngineRunning) return
  e.drone.start()
  e.sub.start()
  e.noiseSource.start()
  e.harmonic1.start()
  e.harmonic2.start()
  isEngineRunning = true
}

// Compute sound parameters based on progress (0-1)
// This is where the magic happens - smooth continuous evolution
function updateSoundscape(e: AudioEngine, progress: number) {
  const ctx = e.ctx
  const now = ctx.currentTime
  const rampTime = 0.1 // Smooth parameter changes

  // Progress curve - spend more time in interesting parts
  // Early journey (0-0.3): surface to death - faster changes
  // Mid journey (0.3-0.7): long fall - slower, meditative
  // Late journey (0.7-1.0): cores to center - building to climax

  // Base drone frequency: 80Hz at surface → 40Hz at center
  // Lower = deeper, more immersive
  const droneFreq = 80 - (progress * 45) // 80 → 35 Hz
  e.drone.frequency.linearRampToValueAtTime(droneFreq, now + rampTime)

  // Sub bass: grows stronger as we descend
  const subFreq = 40 - (progress * 15) // 40 → 25 Hz
  const subVol = 0.08 + (progress * 0.12) // 0.08 → 0.20
  e.sub.frequency.linearRampToValueAtTime(subFreq, now + rampTime)
  e.subGain.gain.linearRampToValueAtTime(subVol, now + rampTime)

  // Noise filter: high and airy at surface → low rumble at center
  // Creates the shift from "wind" to "deep earth rumble"
  const noiseFreq = 800 - (progress * 700) // 800 → 100 Hz
  const noiseQ = 0.3 + (progress * 0.4) // Narrower band as we descend
  const noiseVol = 0.06 + (Math.sin(progress * Math.PI) * 0.04) // Peaks in middle
  e.noiseFilter.frequency.linearRampToValueAtTime(noiseFreq, now + rampTime)
  e.noiseFilter.Q.linearRampToValueAtTime(noiseQ, now + rampTime)
  e.noiseGain.gain.linearRampToValueAtTime(noiseVol, now + rampTime)

  // Harmonics: create warmth, fade in toward center
  const h1Freq = droneFreq * 2 // Octave
  const h2Freq = droneFreq * 1.5 // Fifth
  const harmonicVol = 0.02 + (progress * 0.04) // Richer harmonics at center

  e.harmonic1.frequency.linearRampToValueAtTime(h1Freq, now + rampTime)
  e.harmonic2.frequency.linearRampToValueAtTime(h2Freq, now + rampTime)
  e.harmonic1Gain.gain.linearRampToValueAtTime(harmonicVol, now + rampTime)
  e.harmonic2Gain.gain.linearRampToValueAtTime(harmonicVol * 0.8, now + rampTime)

  // Drone volume: slight swell in the middle of journey
  const droneVol = 0.12 + (Math.sin(progress * Math.PI) * 0.06)
  e.droneGain.gain.linearRampToValueAtTime(droneVol, now + rampTime)
}

export function useAudio(progress: number, _duration: number, isPlaying: boolean) {
  const [isInitialized, setIsInitialized] = useState(false)
  const engineRef = useRef<AudioEngine | null>(null)
  const enabledRef = useRef(true)

  // Initialize audio context (must be triggered by user interaction)
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

  // Update soundscape based on progress
  useEffect(() => {
    const e = engineRef.current
    if (!e || !enabledRef.current) return
    if (e.ctx.state === 'closed') return

    updateSoundscape(e, progress)
  }, [progress])

  // Handle play/pause
  useEffect(() => {
    const e = engineRef.current
    if (!e) return
    if (e.ctx.state === 'closed') return

    if (isPlaying && enabledRef.current) {
      // Resume context if suspended
      if (e.ctx.state === 'suspended') {
        e.ctx.resume()
      }

      // Start oscillators if not running
      startEngine(e)

      // Fade in
      e.masterGain.gain.linearRampToValueAtTime(0.6, e.ctx.currentTime + 1)
    } else {
      // Fade out
      e.masterGain.gain.linearRampToValueAtTime(0, e.ctx.currentTime + 0.5)
    }
  }, [isPlaying])

  // Enable/disable
  const setEnabled = useCallback((enabled: boolean) => {
    enabledRef.current = enabled
    const e = engineRef.current
    if (!e) return

    if (enabled) {
      e.masterGain.gain.linearRampToValueAtTime(0.6, e.ctx.currentTime + 0.5)
    } else {
      e.masterGain.gain.linearRampToValueAtTime(0, e.ctx.currentTime + 0.3)
    }
  }, [])

  // Cleanup - just reset state, don't destroy singleton
  useEffect(() => {
    return () => {
      engineRef.current = null
    }
  }, [])

  return {
    initAudio,
    isInitialized,
    setEnabled,
  }
}
