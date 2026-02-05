import { useEffect, useRef, useCallback, useState } from 'react'

// Atmospheric ambient soundscape for the descent experience
// Warm pads, gentle drones, evolving textures - not harsh oscillators

interface AudioEngine {
  ctx: AudioContext
  masterGain: GainNode

  // Warm pad (multiple detuned oscillators)
  padOscs: OscillatorNode[]
  padGain: GainNode
  padFilter: BiquadFilterNode

  // Deep sub-harmonic
  subOsc: OscillatorNode
  subGain: GainNode

  // Gentle wind texture (very filtered noise)
  windNoise: AudioBufferSourceNode
  windFilter: BiquadFilterNode
  windGain: GainNode

  // Harmonic drone (musical intervals)
  droneOscs: OscillatorNode[]
  droneGain: GainNode
  droneFilter: BiquadFilterNode

  // Shimmer (soft high harmonics for inner core)
  shimmerOscs: OscillatorNode[]
  shimmerGain: GainNode
  shimmerFilter: BiquadFilterNode

  // Reverb
  convolver: ConvolverNode
  reverbGain: GainNode
  dryGain: GainNode

  // Second reverb for extra depth
  convolver2: ConvolverNode
  reverb2Gain: GainNode

  // Drums/percussion
  drumGain: GainNode
  drumFilter: BiquadFilterNode
  noiseBuffer: AudioBuffer
}

let engine: AudioEngine | null = null
let isEngineRunning = false
let drumIntervalId: number | null = null
let currentDrumParams = { volume: 0, tempo: 0.5, intensity: 0 }

// Create smooth brown noise - very gentle, no harsh frequencies
function createSmoothNoise(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 8 // Longer buffer for smoother loop
  const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate) // Stereo

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel)
    let lastOut = 0

    // Extra-smooth brown noise with very gentle filtering
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      // Very low coefficient = very smooth/slow changes
      data[i] = (lastOut + 0.004 * white) / 1.004
      lastOut = data[i]
      data[i] *= 10 // Boost because it's very quiet
    }
  }

  return buffer
}

// Create lush reverb impulse response
function createLushReverb(ctx: AudioContext, duration: number, decay: number): AudioBuffer {
  const length = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate)

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel)
    for (let i = 0; i < length; i++) {
      // Early reflections + smooth tail
      const t = i / length
      const earlyReflections = t < 0.1 ? Math.sin(t * 100) * 0.3 : 0
      const tail = (Math.random() * 2 - 1) * Math.pow(1 - t, decay)
      // Add some modulation for richness
      const modulation = Math.sin(i / ctx.sampleRate * 0.5) * 0.1
      data[i] = (earlyReflections + tail) * (1 + modulation)

      // Slight stereo variation
      if (channel === 1) {
        data[i] *= 0.95 + Math.random() * 0.1
      }
    }
  }

  return buffer
}

// Create a warmer, longer reverb for space
function createSpaceReverb(ctx: AudioContext): AudioBuffer {
  const duration = 6 // 6 second tail
  const length = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate)

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel)
    for (let i = 0; i < length; i++) {
      const t = i / length
      // Very smooth exponential decay with modulation
      const envelope = Math.exp(-3 * t) * (1 - t)
      const noise = Math.random() * 2 - 1
      // Low-pass filter the noise in the reverb itself
      data[i] = noise * envelope * 0.5
    }

    // Simple low-pass on reverb buffer
    let prev = 0
    for (let i = 0; i < length; i++) {
      data[i] = prev * 0.85 + data[i] * 0.15
      prev = data[i]
    }
  }

  return buffer
}

// Play a soft kick/heartbeat sound
function playKick(e: AudioEngine, volume: number, pitch: number = 55) {
  if (volume <= 0) return

  const ctx = e.ctx
  const now = ctx.currentTime

  // Kick using sine wave with pitch envelope
  const kickOsc = ctx.createOscillator()
  const kickGain = ctx.createGain()

  kickOsc.type = 'sine'
  kickOsc.frequency.setValueAtTime(pitch * 2, now)
  kickOsc.frequency.exponentialRampToValueAtTime(pitch, now + 0.05)

  kickGain.gain.setValueAtTime(volume * 0.4, now)
  kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

  kickOsc.connect(kickGain)
  kickGain.connect(e.drumFilter)

  kickOsc.start(now)
  kickOsc.stop(now + 0.35)
}

// Play a soft percussive hit (like a muted tom or hand drum)
function playPerc(e: AudioEngine, volume: number, pitch: number = 100) {
  if (volume <= 0) return

  const ctx = e.ctx
  const now = ctx.currentTime

  // Noise burst for attack
  const noiseSource = ctx.createBufferSource()
  noiseSource.buffer = e.noiseBuffer

  const noiseGain = ctx.createGain()
  const noiseFilter = ctx.createBiquadFilter()

  noiseFilter.type = 'bandpass'
  noiseFilter.frequency.value = pitch * 4
  noiseFilter.Q.value = 2

  noiseGain.gain.setValueAtTime(volume * 0.15, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

  noiseSource.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(e.drumFilter)

  noiseSource.start(now)
  noiseSource.stop(now + 0.15)

  // Tonal body
  const bodyOsc = ctx.createOscillator()
  const bodyGain = ctx.createGain()

  bodyOsc.type = 'triangle'
  bodyOsc.frequency.setValueAtTime(pitch, now)
  bodyOsc.frequency.exponentialRampToValueAtTime(pitch * 0.5, now + 0.15)

  bodyGain.gain.setValueAtTime(volume * 0.2, now)
  bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

  bodyOsc.connect(bodyGain)
  bodyGain.connect(e.drumFilter)

  bodyOsc.start(now)
  bodyOsc.stop(now + 0.25)
}

// Drum sequencer - plays rhythmic patterns
function startDrumLoop(e: AudioEngine) {
  if (drumIntervalId !== null) return

  let beat = 0
  const scheduleNext = () => {
    const { volume, tempo, intensity } = currentDrumParams

    if (volume > 0 && tempo > 0) {
      // Main heartbeat-like kick on beats 1 and 3
      if (beat % 4 === 0) {
        playKick(e, volume, 45 + intensity * 20)
      }
      // Softer kick on beat 3
      if (beat % 4 === 2 && intensity > 0.3) {
        playKick(e, volume * 0.5, 50 + intensity * 15)
      }
      // Light percussion on off-beats when intensity is higher
      if (beat % 2 === 1 && intensity > 0.5) {
        playPerc(e, volume * 0.3 * (intensity - 0.5) * 2, 80 + intensity * 40)
      }
      // Extra texture at high intensity
      if (intensity > 0.7 && beat % 4 === 3) {
        playPerc(e, volume * 0.2, 120)
      }
    }

    beat = (beat + 1) % 16

    // Schedule next beat - tempo controls speed (0.3 = slow, 1 = fast)
    const interval = 400 + (1 - tempo) * 600 // 400-1000ms between beats
    drumIntervalId = window.setTimeout(scheduleNext, interval)
  }

  scheduleNext()
}

function stopDrumLoop() {
  if (drumIntervalId !== null) {
    clearTimeout(drumIntervalId)
    drumIntervalId = null
  }
}

function createEngine(ctx: AudioContext): AudioEngine {
  const masterGain = ctx.createGain()
  masterGain.gain.value = 0
  masterGain.connect(ctx.destination)

  // === REVERB SETUP ===
  const dryGain = ctx.createGain()
  dryGain.gain.value = 0.5
  dryGain.connect(masterGain)

  // Primary reverb (lush, medium)
  const convolver = ctx.createConvolver()
  convolver.buffer = createLushReverb(ctx, 4, 2.5)
  const reverbGain = ctx.createGain()
  reverbGain.gain.value = 0.4
  convolver.connect(reverbGain)
  reverbGain.connect(masterGain)

  // Secondary reverb (vast space)
  const convolver2 = ctx.createConvolver()
  convolver2.buffer = createSpaceReverb(ctx)
  const reverb2Gain = ctx.createGain()
  reverb2Gain.gain.value = 0.25
  convolver2.connect(reverb2Gain)
  reverb2Gain.connect(masterGain)

  // === WARM PAD (the main atmospheric sound) ===
  // Multiple detuned triangle oscillators for warmth
  const padOscs: OscillatorNode[] = []
  const padGain = ctx.createGain()
  padGain.gain.value = 0

  const padFilter = ctx.createBiquadFilter()
  padFilter.type = 'lowpass'
  padFilter.frequency.value = 400
  padFilter.Q.value = 0.5

  // Create 4 detuned oscillators for rich pad sound
  const padFreqs = [55, 55.2, 54.8, 110] // Slightly detuned + octave
  padFreqs.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    osc.type = 'triangle' // Warmer than sine
    osc.frequency.value = freq

    // Individual gain for mixing
    const oscGain = ctx.createGain()
    oscGain.gain.value = i === 3 ? 0.15 : 0.25 // Octave quieter

    osc.connect(oscGain)
    oscGain.connect(padFilter)
    padOscs.push(osc)
  })

  padFilter.connect(padGain)
  padGain.connect(dryGain)
  padGain.connect(convolver)
  padGain.connect(convolver2)

  // === DEEP SUB ===
  const subOsc = ctx.createOscillator()
  subOsc.type = 'sine'
  subOsc.frequency.value = 27.5 // Very low A

  const subGain = ctx.createGain()
  subGain.gain.value = 0

  subOsc.connect(subGain)
  subGain.connect(dryGain)

  // === GENTLE WIND ===
  const windNoise = ctx.createBufferSource()
  windNoise.buffer = createSmoothNoise(ctx)
  windNoise.loop = true

  const windFilter = ctx.createBiquadFilter()
  windFilter.type = 'lowpass'
  windFilter.frequency.value = 200 // Very low - just a gentle presence
  windFilter.Q.value = 0.3

  const windGain = ctx.createGain()
  windGain.gain.value = 0

  windNoise.connect(windFilter)
  windFilter.connect(windGain)
  windGain.connect(dryGain)
  windGain.connect(convolver)

  // === HARMONIC DRONE (musical intervals for depth) ===
  const droneOscs: OscillatorNode[] = []
  const droneGain = ctx.createGain()
  droneGain.gain.value = 0

  const droneFilter = ctx.createBiquadFilter()
  droneFilter.type = 'lowpass'
  droneFilter.frequency.value = 600
  droneFilter.Q.value = 0.7

  // Perfect fifth and octave - naturally harmonious
  const droneFreqs = [82.4, 123.5, 164.8] // E2, B2, E3 - open fifth harmony
  droneFreqs.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    const oscGain = ctx.createGain()
    oscGain.gain.value = i === 0 ? 0.3 : 0.15 // Root louder

    osc.connect(oscGain)
    oscGain.connect(droneFilter)
    droneOscs.push(osc)
  })

  droneFilter.connect(droneGain)
  droneGain.connect(dryGain)
  droneGain.connect(convolver)
  droneGain.connect(convolver2)

  // === SHIMMER (crystalline for inner core) ===
  const shimmerOscs: OscillatorNode[] = []
  const shimmerGain = ctx.createGain()
  shimmerGain.gain.value = 0

  const shimmerFilter = ctx.createBiquadFilter()
  shimmerFilter.type = 'bandpass'
  shimmerFilter.frequency.value = 2000
  shimmerFilter.Q.value = 0.5

  // High harmonics with slight detuning
  const shimmerFreqs = [880, 1318.5, 1760, 2217.5] // A5, E6, A6, C#7 - A major spread
  shimmerFreqs.forEach((freq) => {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq + (Math.random() - 0.5) * 2 // Tiny detune

    const oscGain = ctx.createGain()
    oscGain.gain.value = 0.08

    osc.connect(oscGain)
    oscGain.connect(shimmerFilter)
    shimmerOscs.push(osc)
  })

  shimmerFilter.connect(shimmerGain)
  shimmerGain.connect(convolver) // Shimmer only through reverb
  shimmerGain.connect(convolver2)

  // === DRUMS/PERCUSSION ===
  const drumGain = ctx.createGain()
  drumGain.gain.value = 0.5

  const drumFilter = ctx.createBiquadFilter()
  drumFilter.type = 'lowpass'
  drumFilter.frequency.value = 800 // Keep drums warm
  drumFilter.Q.value = 0.5

  drumGain.connect(drumFilter)
  drumFilter.connect(dryGain)
  drumFilter.connect(convolver) // Some reverb on drums

  // Create noise buffer for percussion
  const noiseBuffer = createSmoothNoise(ctx)

  return {
    ctx,
    masterGain,
    padOscs,
    padGain,
    padFilter,
    subOsc,
    subGain,
    windNoise,
    windFilter,
    windGain,
    droneOscs,
    droneGain,
    droneFilter,
    shimmerOscs,
    shimmerGain,
    shimmerFilter,
    convolver,
    reverbGain,
    dryGain,
    convolver2,
    reverb2Gain,
    drumGain,
    drumFilter,
    noiseBuffer,
  }
}

function startEngine(e: AudioEngine) {
  if (isEngineRunning) return

  e.padOscs.forEach(osc => osc.start())
  startDrumLoop(e)
  e.subOsc.start()
  e.windNoise.start()
  e.droneOscs.forEach(osc => osc.start())
  e.shimmerOscs.forEach(osc => osc.start())

  isEngineRunning = true
}

// Update sound based on progress through the journey
function updateSoundscape(e: AudioEngine, progress: number) {
  const ctx = e.ctx
  if (ctx.state === 'closed') return

  const now = ctx.currentTime
  const ramp = 0.8 // Slow, smooth transitions

  // === JOURNEY PHASES ===
  // 0.00 - 0.05: Edge (anticipation, quiet)
  // 0.05 - 0.08: Plunge (falling begins)
  // 0.08 - 0.16: Death sequence (fading consciousness)
  // 0.16 - 0.26: Body continues (transition to vast)
  // 0.26 - 0.47: Long Fall (meditative, expansive)
  // 0.47 - 0.60: Outer Core (deeper, more resonant)
  // 0.60 - 0.70: Inner Core (crystalline shimmer)
  // 0.70 - 0.82: Center approach (weightless, transcendent)
  // 0.82 - 1.00: Arrival (resolution, warmth)

  // === WARM PAD ===
  // The main atmospheric foundation
  let padVol = 0
  let padFilterFreq = 400

  if (progress < 0.05) {
    // Edge: quiet anticipation, pad barely there
    padVol = 0.03
    padFilterFreq = 200
  } else if (progress < 0.08) {
    // Plunge: pad swells
    const t = (progress - 0.05) / 0.03
    padVol = 0.03 + t * 0.12
    padFilterFreq = 200 + t * 300
  } else if (progress < 0.16) {
    // Death: pad sustains then slowly fades
    const t = (progress - 0.08) / 0.08
    padVol = 0.15 * (1 - t * 0.3)
    padFilterFreq = 500 - t * 200
  } else if (progress < 0.26) {
    // Body continues: pad rebuilds
    const t = (progress - 0.16) / 0.10
    padVol = 0.10 + t * 0.08
    padFilterFreq = 300 + t * 200
  } else if (progress < 0.47) {
    // Long fall: full atmospheric pad
    padVol = 0.18
    padFilterFreq = 500
  } else if (progress < 0.60) {
    // Outer core: slightly brighter, more present
    padVol = 0.20
    padFilterFreq = 600
  } else if (progress < 0.82) {
    // Inner core to center: warm and full
    padVol = 0.22
    padFilterFreq = 700
  } else {
    // Arrival: gentle fade
    const t = (progress - 0.82) / 0.18
    padVol = 0.22 * (1 - t * 0.5)
    padFilterFreq = 700 - t * 200
  }

  e.padGain.gain.linearRampToValueAtTime(padVol, now + ramp)
  e.padFilter.frequency.linearRampToValueAtTime(padFilterFreq, now + ramp)

  // Slowly evolve pad frequencies for movement
  const padBaseFreq = 55 - progress * 15 // Gets slightly lower as we descend
  e.padOscs[0].frequency.linearRampToValueAtTime(padBaseFreq, now + ramp)
  e.padOscs[1].frequency.linearRampToValueAtTime(padBaseFreq * 1.003, now + ramp)
  e.padOscs[2].frequency.linearRampToValueAtTime(padBaseFreq * 0.997, now + ramp)
  e.padOscs[3].frequency.linearRampToValueAtTime(padBaseFreq * 2, now + ramp)

  // === DEEP SUB ===
  let subVol = 0
  let subFreq = 27.5

  if (progress > 0.16) {
    // Sub comes in after death, felt more than heard
    const t = Math.min(1, (progress - 0.16) / 0.10)
    subVol = 0.12 * t
  }
  if (progress > 0.47) {
    // Deeper in outer/inner core
    subVol = 0.15
    subFreq = 22 // Even lower
  }
  if (progress > 0.82) {
    // Fade out at end
    const t = (progress - 0.82) / 0.18
    subVol = 0.15 * (1 - t)
  }

  e.subGain.gain.linearRampToValueAtTime(subVol, now + ramp)
  e.subOsc.frequency.linearRampToValueAtTime(subFreq, now + ramp)

  // === GENTLE WIND ===
  let windVol = 0
  let windFilterFreq = 200

  if (progress < 0.08) {
    // Edge/plunge: slight breeze
    windVol = 0.02 + progress * 0.1
    windFilterFreq = 150 + progress * 500
  } else if (progress < 0.16) {
    // Death: wind fades
    const t = (progress - 0.08) / 0.08
    windVol = 0.03 * (1 - t)
  } else if (progress > 0.26 && progress < 0.47) {
    // Long fall: gentle presence
    windVol = 0.015
    windFilterFreq = 120
  }

  e.windGain.gain.linearRampToValueAtTime(windVol, now + ramp)
  e.windFilter.frequency.linearRampToValueAtTime(windFilterFreq, now + ramp)

  // === HARMONIC DRONE ===
  let droneVol = 0
  let droneFilterFreq = 500

  if (progress > 0.20 && progress < 0.82) {
    // Active during long fall through inner core
    const fadeIn = Math.min(1, (progress - 0.20) / 0.06)
    const fadeOut = progress > 0.75 ? (0.82 - progress) / 0.07 : 1
    droneVol = 0.08 * fadeIn * fadeOut

    // Filter opens up as we go deeper
    droneFilterFreq = 400 + (progress - 0.20) * 500
  }

  e.droneGain.gain.linearRampToValueAtTime(droneVol, now + ramp)
  e.droneFilter.frequency.linearRampToValueAtTime(droneFilterFreq, now + ramp)

  // Evolve drone pitches - descending as we fall
  const dronePitchMod = 1 - progress * 0.15
  e.droneOscs[0].frequency.linearRampToValueAtTime(82.4 * dronePitchMod, now + ramp * 2)
  e.droneOscs[1].frequency.linearRampToValueAtTime(123.5 * dronePitchMod, now + ramp * 2)
  e.droneOscs[2].frequency.linearRampToValueAtTime(164.8 * dronePitchMod, now + ramp * 2)

  // === SHIMMER ===
  let shimmerVol = 0

  if (progress > 0.55 && progress < 0.85) {
    // Inner core and center: crystalline shimmer
    const fadeIn = Math.min(1, (progress - 0.55) / 0.05)
    const fadeOut = progress > 0.78 ? (0.85 - progress) / 0.07 : 1
    shimmerVol = 0.03 * fadeIn * fadeOut
  }

  e.shimmerGain.gain.linearRampToValueAtTime(shimmerVol, now + ramp)

  // Shimmer frequency drift for sparkle effect
  const shimmerMod = 1 + Math.sin(now * 0.3) * 0.02
  e.shimmerOscs.forEach((osc, i) => {
    const baseFreqs = [880, 1318.5, 1760, 2217.5]
    osc.frequency.linearRampToValueAtTime(baseFreqs[i] * shimmerMod, now + 0.1)
  })

  // === DRUMS/PERCUSSION ===
  // Light rhythmic heartbeat that evolves with the journey
  let drumVol = 0
  let drumTempo = 0.4 // Slow
  let drumIntensity = 0

  if (progress < 0.05) {
    // Edge: silence, anticipation
    drumVol = 0
  } else if (progress < 0.08) {
    // Plunge: heartbeat begins
    const t = (progress - 0.05) / 0.03
    drumVol = t * 0.15
    drumTempo = 0.3
    drumIntensity = 0.2
  } else if (progress < 0.16) {
    // Death: heartbeat slows and fades
    const t = (progress - 0.08) / 0.08
    drumVol = 0.15 * (1 - t * 0.7)
    drumTempo = 0.3 - t * 0.15
    drumIntensity = 0.2 * (1 - t)
  } else if (progress < 0.26) {
    // Body continues: drums fade out completely
    const t = (progress - 0.16) / 0.10
    drumVol = 0.05 * (1 - t)
    drumTempo = 0.15
    drumIntensity = 0
  } else if (progress < 0.47) {
    // Long fall: gentle, meditative pulse
    drumVol = 0.08
    drumTempo = 0.35
    drumIntensity = 0.3
  } else if (progress < 0.60) {
    // Outer core: building intensity
    const t = (progress - 0.47) / 0.13
    drumVol = 0.08 + t * 0.07
    drumTempo = 0.35 + t * 0.2
    drumIntensity = 0.3 + t * 0.3
  } else if (progress < 0.75) {
    // Inner core: peak intensity
    drumVol = 0.15
    drumTempo = 0.55
    drumIntensity = 0.6
  } else if (progress < 0.85) {
    // Approaching center: slowing, fading
    const t = (progress - 0.75) / 0.10
    drumVol = 0.15 * (1 - t * 0.7)
    drumTempo = 0.55 - t * 0.25
    drumIntensity = 0.6 * (1 - t)
  } else {
    // Center: silence, weightlessness
    drumVol = 0
    drumTempo = 0
    drumIntensity = 0
  }

  // Update global drum parameters for the sequencer
  currentDrumParams = { volume: drumVol, tempo: drumTempo, intensity: drumIntensity }

  // Update drum filter - opens up with intensity
  e.drumFilter.frequency.linearRampToValueAtTime(600 + drumIntensity * 400, now + ramp)

  // === REVERB MIX ===
  // More cavernous as we descend
  let reverbAmount = 0.3 + progress * 0.4
  let spaceAmount = 0.15 + progress * 0.35

  if (progress > 0.82) {
    // At center: maximum space
    reverbAmount = 0.7
    spaceAmount = 0.5
  }

  e.reverbGain.gain.linearRampToValueAtTime(reverbAmount, now + ramp)
  e.reverb2Gain.gain.linearRampToValueAtTime(spaceAmount, now + ramp)
  e.dryGain.gain.linearRampToValueAtTime(0.6 - progress * 0.2, now + ramp)

  // === FINAL FADE ===
  // Note: This is handled relative to current master gain, not absolute 0.6
  // The actual volume level is controlled by the volume slider
}

// Get saved volume from localStorage
function getSavedVolume(): number {
  if (typeof window === 'undefined') return 0.8
  const saved = localStorage.getItem('descent-volume')
  return saved ? parseFloat(saved) : 0.8
}

export function useAudio(progress: number, _duration: number, isPlaying: boolean) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [volume, setVolumeState] = useState(getSavedVolume)
  const engineRef = useRef<AudioEngine | null>(null)
  const enabledRef = useRef(true)
  const volumeRef = useRef(volume)

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
      // Gentle fade in to current volume
      e.masterGain.gain.linearRampToValueAtTime(volumeRef.current, e.ctx.currentTime + 2)
    } else {
      // Gentle fade out
      e.masterGain.gain.linearRampToValueAtTime(0, e.ctx.currentTime + 1)
    }
  }, [isPlaying])

  const setEnabled = useCallback((enabled: boolean) => {
    enabledRef.current = enabled
    const e = engineRef.current
    if (!e) return

    if (enabled) {
      e.masterGain.gain.linearRampToValueAtTime(volumeRef.current, e.ctx.currentTime + 1)
    } else {
      e.masterGain.gain.linearRampToValueAtTime(0, e.ctx.currentTime + 0.5)
    }
  }, [])

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    volumeRef.current = clampedVolume
    setVolumeState(clampedVolume)
    localStorage.setItem('descent-volume', String(clampedVolume))

    const e = engineRef.current
    if (!e || !enabledRef.current) return

    e.masterGain.gain.linearRampToValueAtTime(clampedVolume, e.ctx.currentTime + 0.1)
  }, [])

  useEffect(() => {
    return () => {
      engineRef.current = null
    }
  }, [])

  return {
    initAudio,
    isInitialized,
    setEnabled,
    volume,
    setVolume,
  }
}
