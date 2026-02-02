// CONTENT: LATEST

// Total duration in seconds
export const TOTAL_DURATION = 210

// Narrative text styles
export type NarrativeStyle = 'normal' | 'dramatic' | 'whisper' | 'data'

// Phase definitions
export interface Phase {
  name: string
  startTime: number
  endTime: number
  startDepth: number
  endDepth: number
}

export const PHASES: Phase[] = [
  { name: 'The Edge', startTime: 0, endTime: 10, startDepth: 0, endDepth: 0 },
  { name: 'The Plunge', startTime: 10, endTime: 17, startDepth: 0, endDepth: 1.1 },
  { name: 'Heat Death', startTime: 17, endTime: 26, startDepth: 1.1, endDepth: 2.7 },
  { name: 'Boiling', startTime: 26, endTime: 33, startDepth: 2.7, endDepth: 25 },
  { name: 'Crushing', startTime: 33, endTime: 42, startDepth: 25, endDepth: 200 },
  { name: 'Incineration', startTime: 42, endTime: 54, startDepth: 200, endDepth: 400 },
  { name: 'The Long Fall', startTime: 54, endTime: 98, startDepth: 400, endDepth: 2900 },
  { name: 'Outer Core', startTime: 98, endTime: 125, startDepth: 2900, endDepth: 5150 },
  { name: 'Inner Core', startTime: 125, endTime: 148, startDepth: 5150, endDepth: 6300 },
  { name: 'The Center', startTime: 148, endTime: 172, startDepth: 6300, endDepth: 6371 },
  { name: 'The Yo-Yo', startTime: 172, endTime: 210, startDepth: 6371, endDepth: 6371 }, // Oscillating around center
]

// Earth layer definitions
export interface Layer {
  name: string
  startDepth: number
  endDepth: number
  color: string
  description: string
}

export const LAYERS: Layer[] = [
  {
    name: 'Crust',
    startDepth: 0,
    endDepth: 35,
    color: '#8B7355',
    description: 'Rock, familiar'
  },
  {
    name: 'Upper Mantle',
    startDepth: 35,
    endDepth: 660,
    color: '#CD853F',
    description: 'Hot solid rock'
  },
  {
    name: 'Lower Mantle',
    startDepth: 660,
    endDepth: 2900,
    color: '#B8860B',
    description: 'Denser, hotter, alien'
  },
  {
    name: 'Outer Core',
    startDepth: 2900,
    endDepth: 5150,
    color: '#FF8C00',
    description: 'Liquid iron ocean'
  },
  {
    name: 'Inner Core',
    startDepth: 5150,
    endDepth: 6371,
    color: '#FFD700',
    description: 'Solid crystalline iron'
  },
]

// Narrative text entries
export interface NarrativeEntry {
  text: string
  startTime: number
  endTime: number
  style: NarrativeStyle
}

export const NARRATIVE: NarrativeEntry[] = [
  // Setup
  { text: 'You stand at the edge.X5', startTime: 0, endTime: 3, style: 'normal' },
  { text: 'The tunnel yawns before you.', startTime: 3, endTime: 6, style: 'normal' },
  { text: '6,371 kilometers to the center.', startTime: 6, endTime: 9, style: 'data' },

  // The Plunge
  { text: 'You step forward.', startTime: 10, endTime: 13, style: 'dramatic' },
  { text: 'The long fall begins.', startTime: 13, endTime: 17, style: 'normal' },
  { text: 'Gravity accelerates you.', startTime: 17.5, endTime: 21, style: 'whisper' },

  // Heat Death
  { text: '47°C', startTime: 22.5, endTime: 25, style: 'data' },
  { text: 'Your skin burns.', startTime: 25.5, endTime: 28, style: 'normal' },
  { text: 'Heat stroke takes you quickly.', startTime: 28.5, endTime: 32, style: 'normal' },
  { text: 'Your consciousness fades.', startTime: 32.5, endTime: 36, style: 'whisper' },

  { text: 'Your body continues down.', startTime: 36.5, endTime: 40, style: 'normal' },
  { text: 'Through the crust, into the mantle.', startTime: 40.5, endTime: 44, style: 'normal' },
  { text: 'Deeper than any human has ever been.', startTime: 44.5, endTime: 48, style: 'normal' },

  // // Body continues
  { text: '127°C', startTime: 50, endTime: 54, style: 'data' },
  { text: 'Your fluids begin to boil.', startTime: 54, endTime: 60, style: 'whisper' },

  // Crushing
  // { text: '20 atmospheres of pressure.', startTime: 82, endTime: 84.5, style: 'data' },
  // { text: 'Bones crack. Flesh compacts.', startTime: 84.5, endTime: 87, style: 'whisper' },

  // // Incineration
  // { text: '927°C', startTime: 88, endTime: 91, style: 'data' },
  // { text: 'Bone becomes ash.', startTime: 92, endTime: 98, style: 'normal' },
  // { text: 'Flesh becomes dust.', startTime: 99, endTime: 105, style: 'normal' },

  // // The Long Fall
  // { text: 'Your dust falls.', startTime: 108, endTime: 114, style: 'whisper' },
  // { text: 'And falls.', startTime: 117, endTime: 123, style: 'whisper' },
  // { text: 'And falls.', startTime: 52, endTime: 55, style: 'whisper' },
  // { text: 'Days pass.', startTime: 127, endTime: 136, style: 'normal' },
  // { text: 'The mantle surrounds you—', startTime: 65, endTime: 68, style: 'normal' },
  // { text: 'hot, solid rock flowing like honey over eons.', startTime: 68, endTime: 72, style: 'whisper' },
  // { text: 'You are scattered atoms now,', startTime: 75, endTime: 78, style: 'normal' },
  // { text: 'falling through an alien world.', startTime: 78, endTime: 82, style: 'whisper' },

  // // Wonder
  // { text: 'Everything changes.', startTime: 140, endTime: 148, style: 'dramatic' },
  // { text: 'A sea of molten iron,', startTime: 150, endTime: 156, style: 'normal' },
  // { text: 'as hot as the surface of the sun.', startTime: 157, endTime: 164, style: 'normal' },
  // { text: '4,000°C', startTime: 97, endTime: 99, style: 'data' },
  // { text: 'A liquid metal ocean', startTime: 100, endTime: 103, style: 'normal' },
  // { text: 'generating Earth\'s magnetic field.', startTime: 103, endTime: 107, style: 'whisper' },
  // { text: 'This place is incomprehensible.', startTime: 107, endTime: 109, style: 'normal' },
  // { text: 'This place is magnificent.', startTime: 109, endTime: 111, style: 'dramatic' },

  // // Inner Core
  // { text: 'The pressure is so immense', startTime: 111, endTime: 114, style: 'normal' },
  // { text: 'that iron becomes solid again.', startTime: 114, endTime: 117, style: 'normal' },
  // { text: 'A sphere of crystalline iron,', startTime: 118, endTime: 121, style: 'normal' },
  // { text: 'larger than the moon.', startTime: 121, endTime: 123, style: 'whisper' },
  // { text: '6,700°C', startTime: 123, endTime: 125, style: 'data' },
  // { text: 'You\'re slowing down.', startTime: 126, endTime: 129, style: 'normal' },
  // { text: 'Less mass below you now. Less pull.', startTime: 129, endTime: 133, style: 'whisper' },

  // // The Center
  // { text: 'You\'re almost there.', startTime: 134, endTime: 137, style: 'whisper' },
  // { text: 'Gravity fades to nothing.', startTime: 138, endTime: 141, style: 'normal' },
  // { text: 'Weightless.', startTime: 142, endTime: 145, style: 'dramatic' },
  // { text: 'You reach the center.', startTime: 145, endTime: 148, style: 'normal' },

  // // The Yo-Yo
  // { text: 'But you don\'t stop.', startTime: 184, endTime: 189, style: 'normal' },
  // { text: 'Momentum carries you through.', startTime: 154, endTime: 157, style: 'whisper' },
  // { text: 'Now "down" is the other way.', startTime: 190, endTime: 195, style: 'normal' },
  // { text: 'Back and forth. Like a yo-yo.', startTime: 196, endTime: 201, style: 'whisper' },
  // { text: 'Until finally...', startTime: 202, endTime: 206, style: 'whisper' },

  // Arrival
  { text: 'You have arrived.', startTime: 207, endTime: 210, style: 'normal' },
]

// Death milestones
export interface DeathMilestone {
  name: string
  depth: number
  temperature: number
  description: string
}

export const DEATH_MILESTONES: DeathMilestone[] = [
  { name: 'Heat Stroke', depth: 1.1, temperature: 47, description: 'Your consciousness fades' },
  { name: 'Boiling', depth: 2.7, temperature: 127, description: 'Bodily fluids boil' },
  { name: 'Crushing', depth: 25, temperature: 250, description: 'Bones crack, flesh compacts' },
  { name: 'Incineration', depth: 200, temperature: 927, description: 'Reduced to ash and dust' },
]

// Helper functions
export function getPhaseAtTime(time: number): Phase | undefined {
  return PHASES.find(p => time >= p.startTime && time <= p.endTime)
}

export function getDepthAtTime(time: number): number {
  const phase = getPhaseAtTime(time)
  if (!phase) return 0

  // Special handling for yo-yo phase - oscillate around center
  if (phase.name === 'The Yo-Yo') {
    const yoyoProgress = (time - phase.startTime) / (phase.endTime - phase.startTime)
    // Damped oscillation: starts at 200km amplitude, decays to 0
    const amplitude = 200 * Math.exp(-yoyoProgress * 3) // Exponential decay
    const frequency = 3 // Number of oscillations
    const oscillation = amplitude * Math.sin(yoyoProgress * frequency * Math.PI * 2)
    // Return depth oscillating around center (6371)
    // Positive oscillation = past center (going toward other side)
    // We show this as still 6371 but could visualize differently
    return 6371 + oscillation
  }

  const phaseProgress = (time - phase.startTime) / (phase.endTime - phase.startTime)
  const depth = phase.startDepth + (phase.endDepth - phase.startDepth) * phaseProgress

  return Math.max(0, depth)
}

export function getLayerAtDepth(depth: number): Layer | undefined {
  return LAYERS.find(l => depth >= l.startDepth && depth <= l.endDepth)
}

export function getDayAtTime(time: number): number {
  // Days only count during "The Long Fall" phase (46-86s)
  // This represents about 5 days of falling
  const longFallStart = 46
  const longFallEnd = 86

  if (time < longFallStart) return 0
  if (time > longFallEnd) return 5

  const progress = (time - longFallStart) / (longFallEnd - longFallStart)
  return Math.floor(progress * 5) + 1
}

// Get elapsed in-story time in hours
// Returns -1 for "not started yet" (standing at edge)
// The journey takes ~7 days (168 hours) total
export function getElapsedHours(time: number): number {
  // Timeline mapping (animation seconds → story hours):
  // 0-10s (Edge): not started (-1)
  // 10-12s (Plunge start): 0 (just jumped)
  // 12-17s (Plunge): 0-0.5 hours (first 30 min of falling)
  // 17-54s (Deaths): 0.5-12 hours (first half day)
  // 54-98s (Long Fall): 12-132 hours (days 0.5-5.5)
  // 98-125s (Outer Core): 132-156 hours (day 5.5-6.5)
  // 125-148s (Inner Core): 156-164 hours (day 6.5-7)
  // 148-172s (Center): 164-168 hours (final hours)
  // 172-210s (Yo-Yo): oscillating around center

  if (time <= 10) return -1  // Standing at edge, not started
  if (time <= 12) return 0   // Just jumped
  if (time <= 17) return ((time - 12) / 5) * 0.5  // First 30 min
  if (time <= 54) return 0.5 + ((time - 17) / 37) * 11.5
  if (time <= 98) return 12 + ((time - 54) / 44) * 120
  if (time <= 125) return 132 + ((time - 98) / 27) * 24
  if (time <= 148) return 156 + ((time - 125) / 23) * 8
  if (time <= 172) return 164 + ((time - 148) / 24) * 4
  // Yo-yo phase: just a bit more time passes as you oscillate
  return 168 + ((time - 172) / 38) * 2 // Final ~170 hours total
}

export function getTemperatureAtDepth(depth: number): number {
  // Simplified temperature model
  // Surface: 15°C
  // Gradient: ~25°C per km in crust, varying deeper
  if (depth < 35) {
    return 15 + depth * 25
  } else if (depth < 660) {
    return 900 + (depth - 35) * 1.5
  } else if (depth < 2900) {
    return 1800 + (depth - 660) * 1
  } else if (depth < 5150) {
    return 4000 + (depth - 2900) * 0.5
  } else {
    return 5500 + (depth - 5150) * 1
  }
}
