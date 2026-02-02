// Total duration in seconds
export const TOTAL_DURATION = 177

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
  { name: 'The Edge', startTime: 0, endTime: 8, startDepth: 0, endDepth: 0 },
  { name: 'The Plunge', startTime: 8, endTime: 14, startDepth: 0, endDepth: 1.1 },
  { name: 'Heat Death', startTime: 14, endTime: 22, startDepth: 1.1, endDepth: 2.7 },
  { name: 'Boiling', startTime: 22, endTime: 28, startDepth: 2.7, endDepth: 25 },
  { name: 'Crushing', startTime: 28, endTime: 36, startDepth: 25, endDepth: 200 },
  { name: 'Incineration', startTime: 36, endTime: 46, startDepth: 200, endDepth: 400 },
  { name: 'The Long Fall', startTime: 46, endTime: 86, startDepth: 400, endDepth: 2900 },
  { name: 'Outer Core', startTime: 86, endTime: 111, startDepth: 2900, endDepth: 5150 },
  { name: 'Inner Core', startTime: 111, endTime: 131, startDepth: 5150, endDepth: 6300 },
  { name: 'The Center', startTime: 131, endTime: 151, startDepth: 6300, endDepth: 6371 },
  { name: 'The Yo-Yo', startTime: 151, endTime: 177, startDepth: 6371, endDepth: 6371 }, // Oscillating around center
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
  // The Edge
  { text: 'You stand at the edge.', startTime: 0, endTime: 3, style: 'normal' },
  { text: 'The tunnel yawns before you.', startTime: 3, endTime: 5.5, style: 'normal' },
  { text: '6,371 kilometers to the center.', startTime: 5.5, endTime: 8, style: 'data' },

  // The Plunge
  { text: 'You step forward.', startTime: 8, endTime: 10, style: 'dramatic' },
  { text: 'The fall begins.', startTime: 10, endTime: 12, style: 'normal' },
  { text: 'Gravity accelerates you.', startTime: 12, endTime: 14, style: 'whisper' },

  // Heat Death
  { text: '47°C', startTime: 14, endTime: 16, style: 'data' },
  { text: 'Your skin burns.', startTime: 16, endTime: 18, style: 'normal' },
  { text: 'Heat stroke takes you quickly.', startTime: 18, endTime: 20.5, style: 'normal' },
  { text: 'Your consciousness fades.', startTime: 20.5, endTime: 22, style: 'whisper' },

  // Boiling
  { text: '127°C', startTime: 22, endTime: 24, style: 'data' },
  { text: 'Your body, lifeless now, continues down.', startTime: 24, endTime: 26.5, style: 'normal' },
  { text: 'Your fluids begin to boil.', startTime: 26.5, endTime: 28, style: 'whisper' },

  // Crushing
  { text: 'Deeper than any human has ever been.', startTime: 28, endTime: 31, style: 'normal' },
  { text: '20 atmospheres of pressure.', startTime: 31, endTime: 33.5, style: 'data' },
  { text: 'Bones crack. Flesh compacts.', startTime: 33.5, endTime: 36, style: 'whisper' },

  // Incineration
  { text: 'Through the crust, into the mantle.', startTime: 36, endTime: 39, style: 'normal' },
  { text: '927°C', startTime: 39, endTime: 41, style: 'data' },
  { text: 'Bone becomes ash.', startTime: 41, endTime: 43, style: 'normal' },
  { text: 'Flesh becomes dust.', startTime: 43, endTime: 45, style: 'normal' },
  { text: 'You are no more.', startTime: 45, endTime: 46, style: 'dramatic' },

  // The Long Fall
  { text: 'Your dust falls.', startTime: 46, endTime: 49, style: 'whisper' },
  { text: 'And falls.', startTime: 49, endTime: 52, style: 'whisper' },
  { text: 'And falls.', startTime: 52, endTime: 55, style: 'whisper' },
  { text: 'Days pass.', startTime: 58, endTime: 62, style: 'normal' },
  { text: 'The mantle surrounds you—', startTime: 65, endTime: 68, style: 'normal' },
  { text: 'hot, solid rock flowing like honey over eons.', startTime: 68, endTime: 72, style: 'whisper' },
  { text: 'You are scattered atoms now,', startTime: 75, endTime: 78, style: 'normal' },
  { text: 'falling through an alien world.', startTime: 78, endTime: 82, style: 'whisper' },

  // Outer Core
  { text: 'Everything changes.', startTime: 86, endTime: 89, style: 'dramatic' },
  { text: 'A sea of molten iron and nickel,', startTime: 89, endTime: 93, style: 'normal' },
  { text: 'as hot as the surface of the sun.', startTime: 93, endTime: 97, style: 'normal' },
  { text: '4,000°C', startTime: 97, endTime: 99, style: 'data' },
  { text: 'A liquid metal ocean', startTime: 100, endTime: 103, style: 'normal' },
  { text: 'generating Earth\'s magnetic field.', startTime: 103, endTime: 107, style: 'whisper' },
  { text: 'This place is incomprehensible.', startTime: 107, endTime: 109, style: 'normal' },
  { text: 'This place is beautiful.', startTime: 109, endTime: 111, style: 'dramatic' },

  // Inner Core
  { text: 'The pressure is so immense', startTime: 111, endTime: 114, style: 'normal' },
  { text: 'that iron becomes solid again.', startTime: 114, endTime: 117, style: 'normal' },
  { text: 'A sphere of crystalline iron,', startTime: 118, endTime: 121, style: 'normal' },
  { text: 'larger than the moon.', startTime: 121, endTime: 123, style: 'whisper' },
  { text: '6,700°C', startTime: 123, endTime: 125, style: 'data' },
  { text: 'You\'re slowing down.', startTime: 126, endTime: 129, style: 'normal' },
  { text: 'Less mass below you now. Less pull.', startTime: 129, endTime: 133, style: 'whisper' },

  // The Center
  { text: 'You\'re almost there.', startTime: 134, endTime: 137, style: 'whisper' },
  { text: 'Gravity fades to nothing.', startTime: 138, endTime: 141, style: 'normal' },
  { text: 'Weightless.', startTime: 142, endTime: 145, style: 'dramatic' },
  { text: 'You reach the center.', startTime: 145, endTime: 148, style: 'normal' },

  // The Yo-Yo
  { text: 'But you don\'t stop.', startTime: 151, endTime: 154, style: 'normal' },
  { text: 'Momentum carries you through.', startTime: 154, endTime: 157, style: 'whisper' },
  { text: 'Now "down" is the other way.', startTime: 158, endTime: 161, style: 'normal' },
  { text: 'You slow... and reverse.', startTime: 162, endTime: 165, style: 'whisper' },
  { text: 'Back and forth.', startTime: 166, endTime: 168, style: 'normal' },
  { text: 'Like a yo-yo.', startTime: 168, endTime: 170, style: 'whisper' },
  { text: 'Until finally...', startTime: 170, endTime: 172, style: 'whisper' },
  { text: 'You have arrived.', startTime: 173, endTime: 177, style: 'dramatic' },
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
  // 0-8s (Edge): not started (-1)
  // 8-10s (Plunge start): 0 (just jumped)
  // 10-14s (Plunge): 0-0.5 hours (first 30 min of falling)
  // 14-46s (Deaths): 0.5-12 hours (first half day)
  // 46-86s (Long Fall): 12-132 hours (days 0.5-5.5)
  // 86-111s (Outer Core): 132-156 hours (day 5.5-6.5)
  // 111-131s (Inner Core): 156-164 hours (day 6.5-7)
  // 131-151s (Center): 164-168 hours (final hours)

  if (time <= 8) return -1  // Standing at edge, not started
  if (time <= 10) return 0  // Just jumped
  if (time <= 14) return ((time - 10) / 4) * 0.5  // First 30 min
  if (time <= 46) return 0.5 + ((time - 14) / 32) * 11.5
  if (time <= 86) return 12 + ((time - 46) / 40) * 120
  if (time <= 111) return 132 + ((time - 86) / 25) * 24
  if (time <= 131) return 156 + ((time - 111) / 20) * 8
  if (time <= 151) return 164 + ((time - 131) / 20) * 4
  // Yo-yo phase: just a bit more time passes as you oscillate
  return 168 + ((time - 151) / 26) * 2 // Final ~170 hours total
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
