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
  // ═══════════════════════════════════════════════════════════════
  // THE EDGE (0-10s) — Standing at the precipice
  // ═══════════════════════════════════════════════════════════════
  { text: 'You stand at the edge.', startTime: 0, endTime: 3.5, style: 'normal' },
  { text: 'The tunnel yawns before you.', startTime: 4, endTime: 7.5, style: 'normal' },
  { text: '6,371 kilometers to the center.', startTime: 7.5, endTime: 10, style: 'data' },

  // ═══════════════════════════════════════════════════════════════
  // THE PLUNGE (10-17s) — The jump
  // ═══════════════════════════════════════════════════════════════
  { text: 'You step forward.', startTime: 10, endTime: 13.5, style: 'dramatic' },
  { text: 'The fall begins.', startTime: 14, endTime: 17, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // HEAT DEATH (17-26s) — First death
  // ═══════════════════════════════════════════════════════════════
  { text: 'Gravity accelerates you.', startTime: 17.5, endTime: 20, style: 'whisper' },
  { text: '47°C', startTime: 20.5, endTime: 23, style: 'data' },
  { text: 'Your skin burns.', startTime: 23.5, endTime: 26, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // BOILING (26-33s) — Consciousness ends
  // ═══════════════════════════════════════════════════════════════
  { text: 'Heat stroke takes you quickly.', startTime: 26.5, endTime: 30, style: 'normal' },
  { text: 'Your consciousness fades.', startTime: 30.5, endTime: 33, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // CRUSHING (33-42s) — Body continues without you
  // ═══════════════════════════════════════════════════════════════
  { text: 'Your body continues down.', startTime: 34, endTime: 37.5, style: 'normal' },
  { text: 'Deeper than any human has ever been.', startTime: 38, endTime: 41.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INCINERATION (42-54s) — Reduced to dust
  // ═══════════════════════════════════════════════════════════════
  { text: '927°C', startTime: 42.5, endTime: 45, style: 'data' },
  { text: 'Bone becomes ash. Flesh becomes dust.', startTime: 45.5, endTime: 49, style: 'normal' },
  { text: 'Only scattered atoms remain.', startTime: 50, endTime: 53.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE LONG FALL (54-98s) — Let it breathe, sparse text
  // ═══════════════════════════════════════════════════════════════
  { text: 'Your dust falls.', startTime: 55, endTime: 58.5, style: 'whisper' },
  { text: 'And falls.', startTime: 62, endTime: 65, style: 'whisper' },
  { text: 'And falls.', startTime: 70, endTime: 73, style: 'whisper' },
  // — silence —
  { text: 'Days pass.', startTime: 78, endTime: 82, style: 'normal' },
  // — silence —
  { text: 'The mantle surrounds you', startTime: 86, endTime: 90, style: 'normal' },
  { text: 'hot, solid rock flowing like honey over eons.', startTime: 90.5, endTime: 95, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // OUTER CORE (98-125s) — Wonder, tone shift
  // ═══════════════════════════════════════════════════════════════
  { text: '4,000°C.', startTime: 98.5, endTime: 102.5, style: 'dramatic' },
  { text: 'A sea of molten iron and nickel,', startTime: 103.5, endTime: 106.5, style: 'data' },
  { text: 'as hot as the surface of the sun.', startTime: 107.5, endTime: 111.5, style: 'normal' },
  { text: 'A liquid metal ocean', startTime: 112.5, endTime: 116.5, style: 'normal' },
  { text: 'generating Earth\'s magnetic field.', startTime: 117, endTime: 121, style: 'whisper' },
  { text: 'This place is incomprehensible.', startTime: 122, endTime: 125, style: 'dramatic' }, // todo: better wording
  // { text: 'Everything changes.', startTime: 98.5, endTime: 102.5, style: 'dramatic' },
  // { text: '4,000°C', startTime: 103.5, endTime: 106.5, style: 'data' },
  // { text: 'A sea of molten iron and nickel,', startTime: 107.5, endTime: 111.5, style: 'normal' },
  // { text: 'as hot as the surface of the sun,', startTime: 112.5, endTime: 116.5, style: 'normal' },
  // { text: 'generating Earth\'s magnetic field.', startTime: 117, endTime: 121, style: 'whisper' },
  // { text: 'This place is magnificent.', startTime: 122, endTime: 125, style: 'dramatic' }, // todo: better wording

  // ═══════════════════════════════════════════════════════════════
  // INNER CORE (125-148s) — Slowing down
  // ═══════════════════════════════════════════════════════════════
  { text: 'The pressure is so immense...', startTime: 126, endTime: 130, style: 'normal' },
  { text: 'that iron becomes solid again.', startTime: 130.5, endTime: 134.5, style: 'normal' },
  { text: 'A crystal sphere, larger than the moon.', startTime: 136, endTime: 140, style: 'whisper' },
  { text: 'You\'re slowing down.', startTime: 141, endTime: 144, style: 'normal' },
  { text: 'Less mass below you now. Less pull.', startTime: 144.5, endTime: 148, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE CENTER (148-172s) — Climax
  // ═══════════════════════════════════════════════════════════════
  { text: 'You\'re almost there.', startTime: 149, endTime: 152.5, style: 'whisper' },
  { text: 'Gravity fades to nothing.', startTime: 154, endTime: 158, style: 'normal' },
  { text: 'Weightless.', startTime: 160, endTime: 164, style: 'dramatic' },
  { text: 'You reach the center of the Earth.', startTime: 166, endTime: 170, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // THE YO-YO (172-210s) — Oscillation and resolution
  // ═══════════════════════════════════════════════════════════════
  { text: 'But you don\'t stop.', startTime: 173, endTime: 177, style: 'normal' },
  { text: 'Momentum carries you through.', startTime: 178, endTime: 182, style: 'whisper' },
  { text: 'Now "down" is the other way.', startTime: 184, endTime: 188, style: 'normal' },
  { text: 'Back and forth.', startTime: 190, endTime: 194, style: 'whisper' },
  { text: 'Like a yo-yo.', startTime: 196, endTime: 200, style: 'whisper' },
  // — silence —
  { text: 'Until finally...', startTime: 203, endTime: 206, style: 'whisper' },
  { text: 'You have arrived.', startTime: 206.5, endTime: 210, style: 'dramatic' },
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
