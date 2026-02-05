import type { NarrativeEntry } from '../content'

export const NARRATIVE_EN: NarrativeEntry[] = [
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
  { text: 'The heat takes you.', startTime: 26.5, endTime: 30, style: 'normal' },
  { text: 'You slip away.', startTime: 30.5, endTime: 33, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // CRUSHING (33-42s) — Body continues without you
  // ═══════════════════════════════════════════════════════════════
  { text: 'What remains of you continues down.', startTime: 34, endTime: 37.5, style: 'normal' },
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
  { text: 'And falls.', startTime: 68, endTime: 71, style: 'whisper' },
  { text: 'Days pass.', startTime: 74, endTime: 78, style: 'normal' },
  { text: 'The mantle surrounds you', startTime: 81, endTime: 85, style: 'normal' },
  { text: 'hot, solid rock flowing like honey over eons.', startTime: 85.5, endTime: 90, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // OUTER CORE (98-125s) — Wonder, tone shift
  // ═══════════════════════════════════════════════════════════════
  { text: 'The rock gives way.', startTime: 93, endTime: 97, style: 'dramatic' },
  { text: 'A sea of molten iron and nickel,', startTime: 98.5, endTime: 102.5, style: 'normal' },
  { text: 'as hot as the surface of the sun.', startTime: 103.5, endTime: 106.5, style: 'normal' },
  { text: '5,000°C', startTime: 107.5, endTime: 111.5, style: 'data' },
  { text: 'A liquid metal ocean', startTime: 112.5, endTime: 116.5, style: 'normal' },
  { text: 'generating Earth\'s magnetic field.', startTime: 117, endTime: 121, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INNER CORE (125-148s) — Slowing down
  // ═══════════════════════════════════════════════════════════════
  { text: 'The pressure is so immense...', startTime: 125, endTime: 129, style: 'normal' },
  { text: 'that iron becomes solid again.', startTime: 129.5, endTime: 134.5, style: 'normal' },
  { text: 'A crystal sphere, larger than the moon.', startTime: 136, endTime: 140, style: 'whisper' },
  { text: 'You\'re slowing down.', startTime: 141, endTime: 144, style: 'normal' },
  { text: 'Less mass below you now. Less pull.', startTime: 144.5, endTime: 148, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE CENTER (148-172s) — Climax
  // ═══════════════════════════════════════════════════════════════
  { text: 'You\'re almost there.', startTime: 149, endTime: 152.5, style: 'whisper' },
  { text: 'Gravity fades to nothing.', startTime: 154, endTime: 158, style: 'normal' },
  { text: 'The center of the world.', startTime: 160, endTime: 164, style: 'dramatic' },
  { text: 'Weightless.', startTime: 166, endTime: 170, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // THE YO-YO (172-210s) — Oscillation and resolution
  // ═══════════════════════════════════════════════════════════════
  { text: 'But you don\'t stop.', startTime: 172, endTime: 177, style: 'normal' },
  { text: 'Momentum carries you through.', startTime: 178, endTime: 182, style: 'whisper' },
  { text: 'Now "down" is the other way.', startTime: 184, endTime: 188, style: 'normal' },
  { text: 'You slow... and reverse.', startTime: 190, endTime: 194, style: 'whisper' },
  { text: 'Back and forth.', startTime: 196, endTime: 200, style: 'whisper' },
  { text: 'Until finally...', startTime: 203, endTime: 206, style: 'whisper' },
  { text: 'You rest.', startTime: 206.5, endTime: 210, style: 'dramatic' },
]
